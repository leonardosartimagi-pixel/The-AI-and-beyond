export interface ContactEmailData {
  /** Sanitized contact name */
  name: string;
  /** Validated email address */
  email: string;
  /** Sanitized company name or localized default */
  company: string;
  /** Sanitized message content */
  message: string;
  /** Locale used by the client when submitting */
  locale: 'it' | 'en';
  /** ISO 8601 timestamp of submission */
  submittedAt: string;
}
