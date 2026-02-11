import { describe, it, expect } from 'vitest';
import { sanitizeForHtml } from '@/lib/email/sanitize';
import {
  buildLeadNotificationHtml,
  buildLeadNotificationSubject,
} from '@/lib/email/lead-notification';
import { buildThankYouHtml, buildThankYouSubject } from '@/lib/email/thank-you';
import {
  buildEmailWrapper,
  buildHeader,
  buildFooter,
} from '@/lib/email/shared-styles';
import type { ContactEmailData } from '@/lib/email/types';

const mockData: ContactEmailData = {
  name: 'Mario Rossi',
  email: 'mario@example.com',
  company: 'Acme S.r.l.',
  message: 'Vorrei sapere di pi\u00f9 sui vostri servizi AI.',
  locale: 'it',
  submittedAt: '2026-02-11T10:30:00.000Z',
};

// ============================================================
// sanitizeForHtml
// ============================================================
describe('sanitizeForHtml', () => {
  it('escapes HTML tags', () => {
    expect(sanitizeForHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('escapes ampersands first to avoid double-encoding', () => {
    expect(sanitizeForHtml('foo & bar')).toBe('foo &amp; bar');
    expect(sanitizeForHtml('&lt;')).toBe('&amp;lt;');
  });

  it('escapes single and double quotes', () => {
    expect(sanitizeForHtml('it\'s a "test"')).toBe(
      'it&#x27;s a &quot;test&quot;'
    );
  });

  it('trims whitespace', () => {
    expect(sanitizeForHtml('  hello  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(sanitizeForHtml('')).toBe('');
  });
});

// ============================================================
// Lead Notification
// ============================================================
describe('buildLeadNotificationHtml', () => {
  it('returns valid HTML document', () => {
    const html = buildLeadNotificationHtml(mockData);
    expect(html).toContain('<!DOCTYPE html');
    expect(html).toContain('</html>');
  });

  it('contains all contact data fields', () => {
    const html = buildLeadNotificationHtml(mockData);
    expect(html).toContain('Mario Rossi');
    expect(html).toContain('mario@example.com');
    expect(html).toContain('Acme S.r.l.');
    expect(html).toContain('servizi AI');
  });

  it('includes mailto link for email', () => {
    const html = buildLeadNotificationHtml(mockData);
    expect(html).toContain('mailto:mario@example.com');
  });

  it('includes submission metadata', () => {
    const html = buildLeadNotificationHtml(mockData);
    expect(html).toContain('Italiano');
  });

  it('includes brand colors', () => {
    const html = buildLeadNotificationHtml(mockData);
    expect(html).toContain('#1b2f75');
    expect(html).toContain('#1177bd');
  });
});

describe('buildLeadNotificationSubject', () => {
  it('includes contact name', () => {
    expect(buildLeadNotificationSubject('Mario Rossi')).toBe(
      'Nuovo contatto dal sito - Mario Rossi'
    );
  });
});

// ============================================================
// Thank You Email
// ============================================================
describe('buildThankYouHtml', () => {
  it('returns valid HTML document', () => {
    const html = buildThankYouHtml(mockData);
    expect(html).toContain('<!DOCTYPE html');
    expect(html).toContain('</html>');
  });

  it('renders Italian copy when locale is it', () => {
    const html = buildThankYouHtml({ ...mockData, locale: 'it' });
    expect(html).toContain('Ciao Mario Rossi,');
    expect(html).toContain('Cosa succede ora:');
    expect(html).toContain('24 ore lavorative');
    expect(html).toContain('A presto,');
  });

  it('renders English copy when locale is en', () => {
    const html = buildThankYouHtml({ ...mockData, locale: 'en' });
    expect(html).toContain('Hi Mario Rossi,');
    expect(html).toContain('What happens next:');
    expect(html).toContain('24 business hours');
    expect(html).toContain('Best regards,');
  });

  it('includes brand elements', () => {
    const html = buildThankYouHtml(mockData);
    expect(html).toContain('#1b2f75');
    expect(html).toContain('logo-color.png');
    expect(html).toContain('theaiandbeyond.it');
  });

  it('includes numbered steps', () => {
    const html = buildThankYouHtml(mockData);
    expect(html).toContain('>1<');
    expect(html).toContain('>2<');
    expect(html).toContain('>3<');
  });
});

describe('buildThankYouSubject', () => {
  it('returns Italian subject for it locale', () => {
    expect(buildThankYouSubject('it')).toContain('Abbiamo ricevuto');
  });

  it('returns English subject for en locale', () => {
    expect(buildThankYouSubject('en')).toContain('We received');
  });
});

// ============================================================
// Shared Styles
// ============================================================
describe('buildEmailWrapper', () => {
  it('returns complete HTML document structure', () => {
    const html = buildEmailWrapper('<tr><td>Test</td></tr>');
    expect(html).toContain('<!DOCTYPE html');
    expect(html).toContain('<meta');
    expect(html).toContain('Test');
    expect(html).toContain('</html>');
  });

  it('includes Outlook conditional comments', () => {
    const html = buildEmailWrapper('');
    expect(html).toContain('<!--[if mso]>');
  });

  it('sets max width to 600px', () => {
    const html = buildEmailWrapper('');
    expect(html).toContain('max-width: 600px');
  });
});

describe('buildHeader', () => {
  it('includes logo image', () => {
    const header = buildHeader();
    expect(header).toContain('logo-color.png');
    expect(header).toContain('alt=');
  });

  it('uses white background for logo visibility', () => {
    const header = buildHeader();
    expect(header).toContain('#ffffff');
  });
});

describe('buildFooter', () => {
  it('localizes footer for Italian', () => {
    const footer = buildFooter('it');
    expect(footer).toContain('Inviata da');
    expect(footer).toContain('Tutti i diritti riservati');
  });

  it('localizes footer for English', () => {
    const footer = buildFooter('en');
    expect(footer).toContain('Sent by');
    expect(footer).toContain('All rights reserved');
  });

  it('includes site link', () => {
    const footer = buildFooter('it');
    expect(footer).toContain('theaiandbeyond.it');
  });
});
