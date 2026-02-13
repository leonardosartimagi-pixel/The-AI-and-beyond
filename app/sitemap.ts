import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';
import { SITE_URL } from '@/lib/constants';

// Real last-modified dates for accurate sitemap signals.
// Update these when page content actually changes.
const PAGE_DATES = {
  home: '2026-02-12',
  privacy: '2025-12-01',
  'cookie-policy': '2025-12-01',
  terms: '2025-12-01',
} as const;

const LEGAL_PAGES = ['privacy', 'cookie-policy', 'terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Home page
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(PAGE_DATES.home),
      changeFrequency: 'weekly',
      priority: locale === 'it' ? 1 : 0.9,
      alternates: {
        languages: {
          it: `${baseUrl}/it`,
          en: `${baseUrl}/en`,
        },
      },
    });

    // Legal pages
    for (const page of LEGAL_PAGES) {
      entries.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(PAGE_DATES[page]),
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: {
          languages: {
            it: `${baseUrl}/it/${page}`,
            en: `${baseUrl}/en/${page}`,
          },
        },
      });
    }
  }

  return entries;
}
