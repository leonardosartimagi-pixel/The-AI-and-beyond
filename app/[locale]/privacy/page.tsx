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
    title: isIT ? 'Informativa Privacy' : 'Privacy Policy',
    description: isIT
      ? 'Informativa sulla privacy e il trattamento dei dati personali di The AI and beyond.'
      : 'Privacy policy and personal data processing information for The AI and beyond.',
    alternates: {
      canonical: `https://theaiandbeyond.it/${locale}/privacy`,
      languages: {
        it: 'https://theaiandbeyond.it/it/privacy',
        en: 'https://theaiandbeyond.it/en/privacy',
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const filePath = path.join(
    process.cwd(),
    'LEGAL',
    `privacy-policy-${locale}.md`
  );
  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <LegalPageLayout locale={locale}>
      <MarkdownContent content={content} />
    </LegalPageLayout>
  );
}
