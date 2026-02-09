import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { MarkdownContent } from '@/components/legal/MarkdownContent';

type Props = {
  params: Promise<{ locale: string }>;
};

const FILE_MAP: Record<string, string> = {
  it: 'termini-condizioni-it.md',
  en: 'terms-conditions-en.md',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIT = locale === 'it';

  return {
    title: isIT ? 'Termini e Condizioni' : 'Terms and Conditions',
    description: isIT
      ? 'Termini e condizioni di utilizzo del sito web The AI and Beyond.'
      : 'Terms and conditions for using The AI and Beyond website.',
    alternates: {
      canonical: `https://theaiandbeyond.it/${locale}/terms`,
      languages: {
        it: 'https://theaiandbeyond.it/it/terms',
        en: 'https://theaiandbeyond.it/en/terms',
      },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const fileName = FILE_MAP[locale] ?? FILE_MAP.it;
  const filePath = path.join(process.cwd(), 'LEGAL', fileName as string);
  const content = fs.readFileSync(filePath, 'utf-8');

  return (
    <LegalPageLayout locale={locale}>
      <MarkdownContent content={content} />
    </LegalPageLayout>
  );
}
