import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/lib/theme-provider';
import { CookieConsentBanner } from '@/components/layout/CookieConsentBanner';
import { LanguageSelectorModal } from '@/components/layout/LanguageSelectorModal';
import { JsonLd } from '@/components/seo/JsonLd';
import { VercelAnalytics } from '@/components/analytics/VercelAnalytics';
import {
  GlobalParticles,
  SmoothScroll,
  CustomCursor,
  ScrollProgress,
} from '@/components/effects';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
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

const siteUrl = SITE_URL;
const siteName = SITE_NAME;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1b2f75' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
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
  const ogImage = isItalian ? '/og-image.png' : '/og-image-en.png';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: `%s | ${siteName}`,
    },
    description: meta.description,
    keywords: isItalian
      ? [
          'consulenza AI Italia',
          'automazione processi aziendali AI',
          'sviluppo software AI',
          'agenti AI per aziende',
          'ottimizzazione business intelligenza artificiale',
          'sviluppo web app',
          'trasformazione digitale',
        ]
      : [
          'AI consulting',
          'AI business automation',
          'AI software development',
          'AI agents for business',
          'business optimization artificial intelligence',
          'web app development',
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
          url: `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [`${siteUrl}${ogImage}`],
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
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link
          rel="preconnect"
          href="https://vitals.vercel-insights.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="bg-white font-sans text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <LanguageSelectorModal />
            <SmoothScroll>
              <JsonLd locale={locale} />
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
