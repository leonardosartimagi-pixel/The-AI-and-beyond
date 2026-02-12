'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button, LanguageSwitcher } from '@/components/ui';
import {
  useReducedMotion,
  useEscapeKey,
  useFocusTrap,
  useBodyScrollLock,
} from '@/hooks';
import { EASING } from '@/lib/animation-variants';
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
          className="fixed inset-0 z-40 flex flex-col bg-white px-6 pt-24 lg:hidden"
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: '100%' }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }
          }
          transition={{ duration: 0.3, ease: EASING }}
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
                    className="block w-full rounded py-3 text-left font-heading text-2xl font-semibold text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {t(item.key)}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          {/* Language selector */}
          <motion.div
            className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-sm font-medium text-gray-500">
              {t('language')}
            </span>
            <LanguageSwitcher variant="full" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-6"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => onNavClick('contatti')}
              size="lg"
              className="w-full"
            >
              {t('cta')}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
