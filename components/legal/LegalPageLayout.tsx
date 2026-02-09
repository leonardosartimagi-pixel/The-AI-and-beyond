import Link from 'next/link';
import Image from 'next/image';

interface LegalPageLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export function LegalPageLayout({ children, locale }: LegalPageLayoutProps) {
  const backLabel = locale === 'it' ? 'Torna alla home' : 'Back to home';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Minimal header */}
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href={`/${locale}`} className="relative h-8 w-36">
            <Image
              src="/images/logo-full.svg"
              alt="The AI and Beyond"
              fill
              className="object-contain dark:hidden"
            />
            <Image
              src="/images/logo-full-white.svg"
              alt="The AI and Beyond"
              fill
              className="object-contain hidden dark:block"
            />
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 pb-24">
        {children}
      </article>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} The AI and Beyond di Leonardo Sarti Magi
            </p>
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href={`/${locale}/cookie-policy`}
                className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
              >
                {locale === 'it' ? 'Termini e Condizioni' : 'Terms & Conditions'}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
