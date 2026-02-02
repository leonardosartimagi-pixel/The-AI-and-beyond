import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'The AI and Beyond - Consulenza AI e Sviluppo Web',
  description:
    'Consulenza AI e sviluppo web per aziende italiane. Integrazione intelligente, automazioni e applicazioni moderne.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
