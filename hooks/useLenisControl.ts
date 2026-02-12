'use client';

import { useEffect } from 'react';

interface LenisInstance {
  stop: () => void;
  start: () => void;
}

interface LenisWindow extends Window {
  lenis?: LenisInstance;
}

/**
 * Controls Lenis smooth scroll based on a boolean flag.
 * Stops Lenis when shouldStop is true (e.g. modal open),
 * restarts it when shouldStop becomes false or on unmount.
 */
export function useLenisControl(shouldStop: boolean): void {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!shouldStop) return;

    const lenisWindow = window as LenisWindow;
    lenisWindow.lenis?.stop();

    return () => {
      lenisWindow.lenis?.start();
    };
  }, [shouldStop]);
}
