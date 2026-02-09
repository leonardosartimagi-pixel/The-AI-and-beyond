import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/lib/theme-provider';
import { CookieConsentBanner } from '@/components/layout/CookieConsentBanner';
import { LanguageSelectorModal } from '@/components/layout/LanguageSelectorModal';
import { JsonLd } from '@/components/seo/JsonLd';
import { VercelAnalytics } from '@/components/analytics/VercelAnalytics';
import { GlobalParticles, SmoothScroll, CustomCursor, ScrollProgress } from '@/components/effects';
import { locales, type Locale } from '@/i18n/request';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteUrl = 'https://theaiandbeyond.it';
const siteName = 'The AI and Beyond';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Load messages for metadata
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const meta = messages.meta;

  const isItalian = locale === 'it';
  const localePath = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: `%s | ${siteName}`,
    },
    description: meta.description,
    keywords: isItalian
      ? [
          'consulenza AI',
          'sviluppo AI',
          'intelligenza artificiale',
          'automazione',
          'machine learning',
          'AI Italia',
          'trasformazione digitale',
        ]
      : [
          'AI consulting',
          'AI development',
          'artificial intelligence',
          'automation',
          'machine learning',
          'digital transformation',
        ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      url: `${siteUrl}${localePath}`,
      siteName: siteName,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    },
    manifest: '/site.webmanifest',
    alternates: {
      canonical: `${siteUrl}${localePath}`,
      languages: {
        it: `${siteUrl}/it`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/it`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LanguageSelectorModal />
            <SmoothScroll>
              <JsonLd />
              <ScrollProgress />
              <GlobalParticles />
              <CustomCursor />
              {children}
              <CookieConsentBanner />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
