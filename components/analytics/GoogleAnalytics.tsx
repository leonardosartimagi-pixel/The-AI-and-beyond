'use client';

import Script from 'next/script';
import { useConsentStorage } from '@/hooks/useConsentStorage';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  const { status, isLoaded } = useConsentStorage();

  // Don't render if no GA ID configured or consent not yet loaded
  if (!GA_ID || !isLoaded) {
    return null;
  }

  // Only load GA after user has accepted cookies (GDPR compliance)
  if (status !== 'accepted') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=Lax;Secure'
          });
        `}
      </Script>
    </>
  );
}
