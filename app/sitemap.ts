import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://theaiandbeyond.it';

  // Generate entries for each locale
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: locale === 'it' ? 1 : 0.9,
      alternates: {
        languages: {
          it: `${baseUrl}/it`,
          en: `${baseUrl}/en`,
        },
      },
    });
  }

  return entries;
}
