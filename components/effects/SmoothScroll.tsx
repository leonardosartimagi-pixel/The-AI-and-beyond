'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Non applicare smooth scroll se l'utente preferisce movimento ridotto
    if (prefersReducedMotion) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Esponi Lenis globalmente per permettere ad altri componenti di controllarlo
    if (typeof window !== 'undefined') {
      (window as Window & { lenis?: Lenis }).lenis = lenisRef.current;
    }

    return () => {
      lenisRef.current?.destroy();
      if (typeof window !== 'undefined') {
        delete (window as Window & { lenis?: Lenis }).lenis;
      }
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
