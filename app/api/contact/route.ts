import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations';
import { isRateLimited, getRemainingRequests } from '@/lib/rate-limiter';
import { sanitizeForHtml } from '@/lib/email/sanitize';
import { FROM_ADDRESS } from '@/lib/email/shared-styles';
import type { ContactEmailData } from '@/lib/email/types';
import {
  buildLeadNotificationHtml,
  buildLeadNotificationSubject,
} from '@/lib/email/lead-notification';
import { buildThankYouHtml, buildThankYouSubject } from '@/lib/email/thank-you';

// Lazy initialization to avoid build-time errors when API key is not set
let resend: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0];
    return firstIp ? firstIp.trim() : 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

const DEFAULT_COMPANY = {
  it: 'Non specificata',
  en: 'Not specified',
} as const;

const ERROR_MESSAGES = {
  it: 'Si \u00e8 verificato un errore. Riprova pi\u00f9 tardi.',
  en: 'An error occurred. Please try again later.',
} as const;

const SUCCESS_MESSAGES = {
  it: 'Messaggio inviato con successo!',
  en: 'Message sent successfully!',
} as const;

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (await isRateLimited(clientIp)) {
    console.log(`[Contact API] Rate limited: ${clientIp}`);

    return NextResponse.json(
      { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'Retry-After': '900',
        },
      }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Richiesta non valida.' },
      { status: 400 }
    );
  }

  const validation = contactFormSchema.safeParse(body);

  if (!validation.success) {
    const firstError = validation.error.errors[0]?.message || 'Dati non validi';

    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { name, email, company, message } = validation.data;
  const locale = validation.data.locale ?? 'it';

  const sanitizedName = sanitizeForHtml(name);
  const sanitizedCompany = company
    ? sanitizeForHtml(company)
    : DEFAULT_COMPANY[locale];
  const sanitizedMessage = sanitizeForHtml(message);

  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    console.error('[Contact API] CONTACT_EMAIL not configured');

    return NextResponse.json(
      { error: ERROR_MESSAGES[locale] },
      { status: 500 }
    );
  }

  const resendClient = getResendClient();
  if (!resendClient) {
    console.error('[Contact API] RESEND_API_KEY not configured');

    return NextResponse.json(
      { error: ERROR_MESSAGES[locale] },
      { status: 500 }
    );
  }

  const emailData: ContactEmailData = {
    name: sanitizedName,
    email,
    company: sanitizedCompany,
    message: sanitizedMessage,
    locale,
    submittedAt: new Date().toISOString(),
  };

  try {
    // CRITICAL: Send lead notification to owner
    const leadError = await sendLeadNotification(
      resendClient,
      contactEmail,
      emailData
    );

    if (leadError) {
      console.error('[Contact API] Lead notification failed:', leadError);

      return NextResponse.json(
        { error: ERROR_MESSAGES[locale] },
        { status: 500 }
      );
    }

    // BEST-EFFORT: Send thank-you email to client
    const thankYouError = await sendThankYouEmail(
      resendClient,
      email,
      emailData
    );

    if (thankYouError) {
      console.error('[Contact API] Thank-you email failed:', thankYouError);
    }

    console.log('[Contact API] Emails sent successfully');

    return NextResponse.json(
      { success: true, message: SUCCESS_MESSAGES[locale] },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(await getRemainingRequests(clientIp)),
        },
      }
    );
  } catch (error) {
    console.error(
      '[Contact API] Unexpected error:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: ERROR_MESSAGES[locale] },
      { status: 500 }
    );
  }
}

async function sendLeadNotification(
  client: Resend,
  to: string,
  data: ContactEmailData
): Promise<string | null> {
  const { error } = await client.emails.send({
    from: FROM_ADDRESS,
    to,
    reply_to: data.email,
    subject: buildLeadNotificationSubject(data.name),
    html: buildLeadNotificationHtml(data),
  });

  return error ? error.message : null;
}

async function sendThankYouEmail(
  client: Resend,
  to: string,
  data: ContactEmailData
): Promise<string | null> {
  const { error } = await client.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: buildThankYouSubject(data.locale),
    html: buildThankYouHtml(data),
  });

  return error ? error.message : null;
}
