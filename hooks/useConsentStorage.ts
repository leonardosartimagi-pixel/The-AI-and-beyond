'use client';

import { useState, useEffect, useCallback } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'declined';

export interface ConsentPreferences {
  analytics: boolean;
  timestamp: number;
}

const CONSENT_KEY = 'cookie-consent';

export function useConsentStorage() {
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isLoaded, setIsLoaded] = useState(false);

  // Read consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const preferences: ConsentPreferences = JSON.parse(stored);
        setStatus(preferences.analytics ? 'accepted' : 'declined');
      }
    } catch {
      // If parsing fails, treat as pending
      setStatus('pending');
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
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent(true);
  }, [saveConsent]);

  const declineAll = useCallback(() => {
    saveConsent(false);
  }, [saveConsent]);

  return {
    status,
    isLoaded,
    acceptAll,
    declineAll,
  };
}
