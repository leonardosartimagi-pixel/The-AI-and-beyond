'use client';

import { useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

const HEADER_HEIGHT = 80;

export function useScrollTo() {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - HEADER_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion]
  );

  return scrollTo;
}
