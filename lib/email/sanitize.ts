/**
 * Sanitizes a string for safe inclusion in HTML email content.
 * Prevents XSS by escaping HTML special characters.
 * The & replacement MUST be first to avoid double-encoding.
 */
export function sanitizeForHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}
