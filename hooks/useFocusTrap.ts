'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const INITIAL_FOCUS_DELAY_MS = 100;

export function useFocusTrap(
  isOpen: boolean,
  containerRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(
      () => initialFocusRef?.current?.focus(),
      INITIAL_FOCUS_DELAY_MS
    );
    return () => clearTimeout(timer);
  }, [isOpen, initialFocusRef]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusableElements =
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, containerRef]);
}
