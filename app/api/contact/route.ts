import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations';
import { isRateLimited, getRemainingRequests } from '@/lib/rate-limiter';

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

function sanitizeString(value: string): string {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
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

  const sanitizedName = sanitizeString(name);
  const sanitizedCompany = company ? sanitizeString(company) : 'Non specificata';
  const sanitizedMessage = sanitizeString(message);

  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    console.error('[Contact API] CONTACT_EMAIL not configured');

    return NextResponse.json(
      { error: 'Si è verificato un errore. Riprova più tardi.' },
      { status: 500 }
    );
  }

  const resendClient = getResendClient();
  if (!resendClient) {
    console.error('[Contact API] RESEND_API_KEY not configured');

    return NextResponse.json(
      { error: 'Si è verificato un errore. Riprova più tardi.' },
      { status: 500 }
    );
  }

  try {
    const { error } = await resendClient.emails.send({
      from: 'The AI and Beyond <noreply@theaiandbeyond.com>',
      to: contactEmail,
      reply_to: email,
      subject: `Nuovo contatto dal sito - ${sanitizedName}`,
      text: `Nome: ${sanitizedName}
Email: ${email}
Azienda: ${sanitizedCompany}

Messaggio:
${sanitizedMessage}

---
Inviato dal form di contatto di theaiandbeyond.com`,
    });

    if (error) {
      console.error('[Contact API] Resend error:', error.message);

      return NextResponse.json(
        { error: 'Si è verificato un errore. Riprova più tardi.' },
        { status: 500 }
      );
    }

    console.log(`[Contact API] Email sent successfully from: ${email}`);

    return NextResponse.json(
      { success: true, message: 'Messaggio inviato con successo!' },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(getRemainingRequests(clientIp)),
        },
      }
    );
  } catch (error) {
    console.error(
      '[Contact API] Unexpected error:',
      error instanceof Error ? error.message : 'Unknown error'
    );

    return NextResponse.json(
      { error: 'Si è verificato un errore. Riprova più tardi.' },
      { status: 500 }
    );
  }
}
