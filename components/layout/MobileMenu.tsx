'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { useReducedMotion } from '@/hooks';
import { NAV_ITEMS } from './Header';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (href: string) => void;
}

export function MobileMenu({ isOpen, onClose, onNavClick }: MobileMenuProps) {
  const t = useTranslations('nav');
  const prefersReducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEscapeKey(isOpen, onClose);
  useFocusTrap(isOpen, menuRef, firstFocusableRef);
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col bg-white pt-24 px-6 lg:hidden"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          <nav aria-label="Mobile menu">
            <ul className="flex flex-col gap-4" role="list">
              {NAV_ITEMS.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    ref={index === 0 ? firstFocusableRef : undefined}
                    onClick={() => onNavClick(item.href)}
                    className="block w-full py-3 text-left text-2xl font-heading font-semibold text-primary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                  >
                    {t(item.key)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="mt-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button onClick={() => onNavClick('contatti')} size="lg" className="w-full">
              {t('cta')}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useEscapeKey(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
}

function useFocusTrap(
  isOpen: boolean,
  menuRef: React.RefObject<HTMLDivElement | null>,
  firstFocusableRef: React.RefObject<HTMLButtonElement | null>
) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => firstFocusableRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, [isOpen, firstFocusableRef]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !menuRef.current) return;

      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
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
  }, [isOpen, menuRef]);
}

function useBodyScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
}
