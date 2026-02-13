import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('notFound');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-gray-950">
      <h1 className="font-heading text-8xl font-bold text-primary dark:text-gray-100">
        {t('heading')}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        {t('description')}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 rounded-lg bg-accent px-6 py-3 font-medium text-white transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
