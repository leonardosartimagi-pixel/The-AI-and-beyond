import { SITE_URL, SITE_NAME } from '@/lib/constants';

export const BRAND = {
  primary: '#1b2f75',
  primaryDark: '#151f4f',
  primaryLight: '#2d388a',
  accent: '#137dc5',
  accentLight: '#00aeef',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray900: '#111827',
} as const;

export const LOGO_URL = `${SITE_URL}/images/logo-color.png`;
export const FROM_ADDRESS = `${SITE_NAME} <noreply@theaiandbeyond.com>`;

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/** Wraps email content in a full HTML document with email client resets */
export function buildEmailWrapper(content: string): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="it">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${SITE_NAME}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.gray100}; font-family: ${FONT_STACK}; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${BRAND.gray100};">
    <tr>
      <td align="center" style="padding-top: 32px; padding-bottom: 32px; padding-left: 16px; padding-right: 16px;">
        <!--[if mso]><table width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%;">
          ${content}
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Branded header with logo on dark blue background */
export function buildHeader(): string {
  return `<tr>
  <td align="center" style="background-color: ${BRAND.primary}; padding-top: 28px; padding-bottom: 28px; padding-left: 32px; padding-right: 32px; border-radius: 8px 8px 0 0;">
    <img src="${LOGO_URL}" alt="${SITE_NAME}" width="160" height="auto" style="display: block; border: 0; outline: none; text-decoration: none;" />
  </td>
</tr>`;
}

/** Localized footer with site link and disclaimer */
export function buildFooter(locale: 'it' | 'en'): string {
  const copy =
    locale === 'it'
      ? { sent: 'Inviata da', rights: 'Tutti i diritti riservati.' }
      : { sent: 'Sent by', rights: 'All rights reserved.' };

  const year = new Date().getFullYear();

  return `<tr>
  <td align="center" style="padding-top: 24px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
    <p style="margin: 0; font-size: 12px; line-height: 18px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
      ${copy.sent} <a href="${SITE_URL}" style="color: ${BRAND.accent}; text-decoration: none;">${SITE_NAME}</a>
    </p>
    <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 18px; color: ${BRAND.gray500}; font-family: ${FONT_STACK};">
      &copy; ${year} ${SITE_NAME}. ${copy.rights}
    </p>
  </td>
</tr>`;
}
