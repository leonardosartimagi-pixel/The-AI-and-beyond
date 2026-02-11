import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { MarkdownContent } from '@/components/legal/MarkdownContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: 'Cookie Policy',
    description: isIT
      ? 'Informativa sui cookie e altri strumenti di tracciamento utilizzati da The AI and beyond.'
      : 'Cookie and tracking technology policy for The AI and beyond.',
    alternates: {
      canonical: `https://theaiandbeyond.it/${locale}/cookie-policy`,
      languages: {
        it: 'https://theaiandbeyond.it/it/cookie-policy',
        en: 'https://theaiandbeyond.it/en/cookie-policy',
      },
    },
  };
}

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  const filePath = path.join(
    process.cwd(),
    'LEGAL',
    `cookie-policy-${locale}.md`
  );
  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <LegalPageLayout locale={locale}>
      <MarkdownContent content={content} />
    </LegalPageLayout>
  );
}
