import type { ContactEmailData } from './types';
import {
  BRAND,
  buildEmailWrapper,
  buildHeader,
  buildFooter,
} from './shared-styles';

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export function buildLeadNotificationSubject(name: string): string {
  return `Nuovo contatto dal sito - ${name}`;
}

export function buildLeadNotificationHtml(data: ContactEmailData): string {
  const localeLabel = data.locale === 'it' ? 'Italiano' : 'English';
  const timestamp = formatTimestamp(data.submittedAt);

  const content = `
    ${buildHeader()}
    ${buildTitleBar()}
    ${buildCardBody(data)}
    ${buildMetaFooter(timestamp, localeLabel)}
    ${buildFooter('it')}
  `;

  return buildEmailWrapper(content);
}

function buildTitleBar(): string {
  return `<tr>
  <td style="background-color: ${BRAND.white}; padding-top: 24px; padding-bottom: 0; padding-left: 32px; padding-right: 32px; border-left: 1px solid ${BRAND.gray200}; border-right: 1px solid ${BRAND.gray200};">
    <h1 style="margin: 0; font-size: 20px; line-height: 28px; font-weight: 700; color: ${BRAND.primary}; font-family: ${FONT_STACK};">
      Nuovo Lead dal Sito
    </h1>
    <hr style="margin-top: 16px; margin-bottom: 0; border: none; border-top: 2px solid ${BRAND.accent}; width: 48px;" align="left" />
  </td>
</tr>`;
}

function buildCardBody(data: ContactEmailData): string {
  return `<tr>
  <td style="background-color: ${BRAND.white}; padding-top: 24px; padding-bottom: 32px; padding-left: 32px; padding-right: 32px; border-left: 1px solid ${BRAND.gray200}; border-right: 1px solid ${BRAND.gray200}; border-bottom: 1px solid ${BRAND.gray200};">
    ${buildField('Nome', data.name)}
    ${buildEmailField('Email', data.email)}
    ${buildField('Azienda', data.company)}
    ${buildMessageField(data.message)}
  </td>
</tr>`;
}

function buildField(label: string, value: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
  <tr>
    <td style="padding-bottom: 4px;">
      <p style="margin: 0; font-size: 11px; line-height: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
        ${label}
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin: 0; font-size: 15px; line-height: 22px; color: ${BRAND.gray900}; font-family: ${FONT_STACK};">
        ${value}
      </p>
    </td>
  </tr>
</table>`;
}

function buildEmailField(label: string, email: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
  <tr>
    <td style="padding-bottom: 4px;">
      <p style="margin: 0; font-size: 11px; line-height: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
        ${label}
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <a href="mailto:${email}" style="font-size: 15px; line-height: 22px; color: ${BRAND.accent}; text-decoration: none; font-family: ${FONT_STACK};">
        ${email}
      </a>
    </td>
  </tr>
</table>`;
}

function buildMessageField(message: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 8px;">
  <tr>
    <td style="padding-bottom: 8px;">
      <p style="margin: 0; font-size: 11px; line-height: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
        Messaggio
      </p>
    </td>
  </tr>
  <tr>
    <td style="background-color: ${BRAND.gray50}; padding-top: 16px; padding-bottom: 16px; padding-left: 16px; padding-right: 16px; border-radius: 6px; border: 1px solid ${BRAND.gray200};">
      <p style="margin: 0; font-size: 14px; line-height: 22px; color: ${BRAND.gray900}; white-space: pre-wrap; word-wrap: break-word; font-family: ${FONT_STACK};">
${message}</p>
    </td>
  </tr>
</table>`;
}

function buildMetaFooter(timestamp: string, localeLabel: string): string {
  return `<tr>
  <td align="center" style="padding-top: 16px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
    <p style="margin: 0; font-size: 12px; line-height: 18px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
      Inviato il ${timestamp} &middot; Lingua: ${localeLabel}
    </p>
  </td>
</tr>`;
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} alle ${hours}:${minutes}`;
}
