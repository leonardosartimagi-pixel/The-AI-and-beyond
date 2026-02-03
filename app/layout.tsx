import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { CookieConsentBanner } from '@/components/layout/CookieConsentBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The AI and Beyond | Consulenza e Sviluppo AI',
    template: '%s | The AI and Beyond',
  },
  description:
    "Trasformo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende italiane che vogliono crescere con l'intelligenza artificiale.",
  keywords: [
    'consulenza AI',
    'sviluppo AI',
    'intelligenza artificiale',
    'automazione',
    'machine learning',
    'AI Italia',
    'trasformazione digitale',
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
    locale: 'it_IT',
    url: siteUrl,
    siteName: siteName,
    title: 'The AI and Beyond | Consulenza e Sviluppo AI',
    description:
      "Trasformo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende italiane che vogliono crescere con l'intelligenza artificiale.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The AI and Beyond - Consulenza e Sviluppo AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI and Beyond | Consulenza e Sviluppo AI',
    description:
      "Trasformo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende italiane che vogliono crescere con l'intelligenza artificiale.",
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
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
