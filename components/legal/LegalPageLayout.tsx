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
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="relative h-8 w-36">
            <Image
              src="/logos/logo-color.png"
              alt="The AI and beyond"
              fill
              className="object-contain dark:hidden"
            />
            <Image
              src="/logos/logo-white.png"
              alt="The AI and beyond"
              fill
              className="hidden object-contain dark:block"
            />
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-dark"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {backLabel}
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 pb-24 sm:px-6 lg:px-8">
        {children}
      </article>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} The AI and beyond di Leonardo
              Sarti Magi
            </p>
            <nav className="flex flex-wrap items-center gap-4 text-sm">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-500 transition-colors hover:text-accent dark:text-gray-400"
              >
                Privacy Policy
              </Link>
              <Link
                href={`/${locale}/cookie-policy`}
                className="text-gray-500 transition-colors hover:text-accent dark:text-gray-400"
              >
                Cookie Policy
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-500 transition-colors hover:text-accent dark:text-gray-400"
              >
                {locale === 'it'
                  ? 'Termini e Condizioni'
                  : 'Terms & Conditions'}
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
