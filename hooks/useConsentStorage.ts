'use client';

import { useState, useEffect, useCallback } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

export interface ConsentPreferences {
  analytics: boolean;
  timestamp: number;
}

const CONSENT_KEY = 'cookie-consent';

// Consent expires after 6 months (Provvedimento Garante 10/06/2021 recommendation)
const CONSENT_MAX_AGE_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

/** Fire-and-forget: log consent choice server-side for GDPR proof (art. 7.1) */
function logConsentServerSide(action: 'accepted' | 'declined') {
  try {
    const body = JSON.stringify({ action });
    const hasSendBeacon =
      typeof navigator !== 'undefined' && navigator.sendBeacon;

    if (hasSendBeacon) {
      navigator.sendBeacon('/api/consent-log', body);
    } else {
      fetch('/api/consent-log', {
        method: 'POST',
        body,
        keepalive: true,
      }).catch(() => {
        // Best-effort — silently ignore failures
      });
    }
  } catch {
    // Best-effort — never block UI
  }
}

/** Check if browser signals Do Not Track or Global Privacy Control */
function browserSignalsPrivacy(): boolean {
  if (typeof navigator === 'undefined') return false;
  const dnt = navigator.doNotTrack === '1';
  const gpc =
    (navigator as unknown as Record<string, unknown>).globalPrivacyControl ===
    true;
  return dnt || gpc;
}

export function useConsentStorage() {
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isLoaded, setIsLoaded] = useState(false);

  // Read consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const preferences: ConsentPreferences = JSON.parse(stored);
        // Check if consent has expired (6 months)
        if (Date.now() - preferences.timestamp > CONSENT_MAX_AGE_MS) {
          localStorage.removeItem(CONSENT_KEY);
          setStatus('pending');
        } else {
          setStatus(preferences.analytics ? 'accepted' : 'declined');
          setIsLoaded(true);
          return;
        }
      }
    } catch {
      // If parsing fails, treat as pending
      setStatus('pending');
    }

    // If no valid stored consent, respect DNT/GPC browser signals
    if (browserSignalsPrivacy()) {
      setStatus('declined');
    }

    setIsLoaded(true);
  }, []);

  const saveConsent = useCallback((accepted: boolean) => {
    const preferences: ConsentPreferences = {
      analytics: accepted,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
      setStatus(accepted ? 'accepted' : 'declined');
    } catch {
      // localStorage might be unavailable (private browsing, etc.)
      // Still update the state for this session
      setStatus(accepted ? 'accepted' : 'declined');
    }

    // Log consent server-side for GDPR proof
    logConsentServerSide(accepted ? 'accepted' : 'declined');
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent(true);
  }, [saveConsent]);

  const declineAll = useCallback(() => {
    saveConsent(false);
  }, [saveConsent]);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // localStorage might be unavailable
    }
    setStatus('pending');
    // Notify other hook instances (e.g. CookieConsentBanner) to re-show
    window.dispatchEvent(new Event('consent-reset'));
  }, []);

  // Listen for reset events from other hook instances
  useEffect(() => {
    const handleReset = () => setStatus('pending');
    window.addEventListener('consent-reset', handleReset);
    return () => window.removeEventListener('consent-reset', handleReset);
  }, []);

  return {
    status,
    isLoaded,
    acceptAll,
    declineAll,
    resetConsent,
  };
}
