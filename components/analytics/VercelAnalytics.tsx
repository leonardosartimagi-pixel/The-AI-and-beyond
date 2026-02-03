'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useConsentStorage } from '@/hooks/useConsentStorage';

export function VercelAnalytics() {
  const { status, isLoaded } = useConsentStorage();

  // Don't render anything until consent status is loaded
  if (!isLoaded) {
    return null;
  }

  // Only load analytics if user has accepted cookies
  if (status !== 'accepted') {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
