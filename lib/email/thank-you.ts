import type { ContactEmailData } from './types';
import {
  BRAND,
  LOGO_URL,
  buildEmailWrapper,
  buildFooter,
} from './shared-styles';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const COPY = {
  it: {
    subject: `Abbiamo ricevuto il tuo messaggio - ${SITE_NAME}`,
    greeting: (name: string) => `Ciao ${name},`,
    body: 'Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e lo stiamo gi\u00e0 esaminando.',
    nextTitle: 'Cosa succede ora:',
    steps: [
      'Analizziamo la tua richiesta nel dettaglio',
      'Ti rispondiamo entro 24 ore lavorative con un\u2019analisi personalizzata',
      'Se utile, organizziamo una call conoscitiva gratuita',
    ],
    cta: 'Per qualsiasi necessit\u00e0 o informazione aggiuntiva, scrivici a <a href="mailto:info@theaiandbeyond.it" style="color: #137dc5; text-decoration: none; font-weight: 600;">info@theaiandbeyond.it</a>',
    noReply:
      'Questa email \u00e8 stata generata automaticamente, ti preghiamo di non rispondere a questo indirizzo.',
    closing: 'A presto,',
    signature: `Leonardo Sarti Magi \u2014 ${SITE_NAME}`,
  },
  en: {
    subject: `We received your message - ${SITE_NAME}`,
    greeting: (name: string) => `Hi ${name},`,
    body: "Thank you for reaching out. We've received your message and are already looking into it.",
    nextTitle: 'What happens next:',
    steps: [
      'We analyze your request in detail',
      "We'll get back to you within 24 business hours with a personalized assessment",
      "If helpful, we'll set up a free introductory call",
    ],
    cta: 'For any questions or additional information, write to us at <a href="mailto:info@theaiandbeyond.it" style="color: #137dc5; text-decoration: none; font-weight: 600;">info@theaiandbeyond.it</a>',
    noReply:
      'This email was generated automatically, please do not reply to this address.',
    closing: 'Best regards,',
    signature: `Leonardo Sarti Magi \u2014 ${SITE_NAME}`,
  },
} as const;

export function buildThankYouSubject(locale: 'it' | 'en'): string {
  return COPY[locale].subject;
}

export function buildThankYouHtml(data: ContactEmailData): string {
  const c = COPY[data.locale];

  const content = `
    ${buildThankYouHeader()}
    ${buildBody(c, data.name)}
    ${buildFooter(data.locale)}
  `;

  return buildEmailWrapper(content);
}

function buildThankYouHeader(): string {
  return `<tr>
  <td align="center" style="background-color: ${BRAND.white}; padding-top: 32px; padding-bottom: 32px; padding-left: 32px; padding-right: 32px; border-radius: 8px 8px 0 0; border-bottom: 2px solid ${BRAND.gray200};">
    <img src="${LOGO_URL}" alt="${SITE_NAME}" width="140" height="auto" style="display: block; border: 0; outline: none; text-decoration: none;" />
  </td>
</tr>`;
}

function buildBody(
  c: (typeof COPY)['it'] | (typeof COPY)['en'],
  name: string
): string {
  return `<tr>
  <td style="background-color: ${BRAND.white}; padding-top: 32px; padding-bottom: 32px; padding-left: 32px; padding-right: 32px; border-left: 1px solid ${BRAND.gray200}; border-right: 1px solid ${BRAND.gray200}; border-bottom: 1px solid ${BRAND.gray200};">
    ${buildGreeting(c.greeting(name))}
    ${buildParagraph(c.body)}
    ${buildStepsSection(c.nextTitle, c.steps)}
    ${buildCtaBox(c.cta)}
    ${buildNoReply(c.noReply)}
    ${buildClosing(c.closing, c.signature)}
  </td>
</tr>`;
}

function buildGreeting(text: string): string {
  return `<p style="margin: 0 0 20px 0; font-size: 17px; line-height: 26px; font-weight: 600; color: ${BRAND.gray900}; font-family: ${FONT_STACK};">
  ${text}
</p>`;
}

function buildParagraph(text: string): string {
  return `<p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: ${BRAND.gray600}; font-family: ${FONT_STACK};">
  ${text}
</p>`;
}

function buildStepsSection(title: string, steps: readonly string[]): string {
  const stepsHtml = steps.map((step, i) => buildStep(i + 1, step)).join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
  <tr>
    <td>
      <p style="margin: 0 0 12px 0; font-size: 15px; line-height: 24px; font-weight: 600; color: ${BRAND.gray900}; font-family: ${FONT_STACK};">
        ${title}
      </p>
    </td>
  </tr>
  ${stepsHtml}
</table>`;
}

function buildStep(num: number, text: string): string {
  return `<tr>
  <td style="padding-bottom: 12px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="top" width="28" style="padding-right: 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="width: 28px; height: 28px; background-color: ${BRAND.accent}; border-radius: 14px;">
                <span style="font-size: 13px; font-weight: 700; color: ${BRAND.white}; font-family: ${FONT_STACK};">${num}</span>
              </td>
            </tr>
          </table>
        </td>
        <td valign="middle">
          <p style="margin: 0; font-size: 14px; line-height: 22px; color: ${BRAND.gray600}; font-family: ${FONT_STACK};">
            ${text}
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;
}

function buildCtaBox(text: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
  <tr>
    <td style="background-color: ${BRAND.gray50}; padding-top: 16px; padding-bottom: 16px; padding-left: 20px; padding-right: 20px; border-radius: 6px; border-left: 3px solid ${BRAND.accent};">
      <p style="margin: 0; font-size: 14px; line-height: 22px; color: ${BRAND.gray600}; font-family: ${FONT_STACK};">
        ${text}
      </p>
    </td>
  </tr>
</table>`;
}

function buildNoReply(text: string): string {
  return `<p style="margin: 0 0 24px 0; font-size: 12px; line-height: 18px; color: ${BRAND.gray500}; font-style: italic; font-family: ${FONT_STACK};">
  ${text}
</p>`;
}

function buildClosing(closing: string, signature: string): string {
  return `<p style="margin: 0 0 4px 0; font-size: 15px; line-height: 24px; color: ${BRAND.gray600}; font-family: ${FONT_STACK};">
  ${closing}
</p>
<p style="margin: 0; font-size: 15px; line-height: 24px; font-weight: 600; color: ${BRAND.primary}; font-family: ${FONT_STACK};">
  ${signature}
</p>
<p style="margin: 4px 0 0 0; font-size: 13px; line-height: 20px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
  <a href="${SITE_URL}" style="color: ${BRAND.accent}; text-decoration: none;">${SITE_URL.replace('https://', '')}</a>
</p>`;
}
