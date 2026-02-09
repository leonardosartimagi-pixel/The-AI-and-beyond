'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useConsentStorage } from '@/hooks/useConsentStorage';
import { loadAnalytics } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

export function CookieConsentBanner() {
  const t = useTranslations('cookieConsent');
  const locale = useLocale();
  const { status, isLoaded, acceptAll, declineAll } = useConsentStorage();
  const bannerRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  // Load analytics if user previously accepted
  useEffect(() => {
    if (status === 'accepted') {
      loadAnalytics();
    }
  }, [status]);

  // Focus management - focus the banner when it appears
  useEffect(() => {
    if (isLoaded && status === 'pending' && acceptButtonRef.current) {
      // Small delay to ensure animation has started
      const timer = setTimeout(() => {
        acceptButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, status]);

  const handleAccept = () => {
    acceptAll();
    loadAnalytics();
  };

  const handleDecline = () => {
    declineAll();
  };

  // Handle keyboard navigation within banner
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleDecline();
    }
  };

  // Don't render until we've checked localStorage
  if (!isLoaded) return null;

  const showBanner = status === 'pending';

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          ref={bannerRef}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-describedby="cookie-consent-description"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onKeyDown={handleKeyDown}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-xl border border-primary/10 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p
                  id="cookie-consent-description"
                  className="text-sm text-primary/80 sm:text-base"
                >
                  {t('message')}{' '}
                  <a
                    href={`/${locale}/cookie-policy`}
                    className="font-medium text-accent underline underline-offset-2 transition-colors hover:text-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {t('learnMore')}
                  </a>
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                  className="order-2 text-primary/70 hover:text-primary sm:order-1"
                  aria-label={t('decline')}
                >
                  {t('decline')}
                </Button>
                <Button
                  ref={acceptButtonRef}
                  variant="primary"
                  size="sm"
                  onClick={handleAccept}
                  className="order-1 sm:order-2"
                  aria-label={t('accept')}
                >
                  {t('accept')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
