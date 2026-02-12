'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useFocusTrap, useLenisControl } from '@/hooks';
import { createModalAnimation } from '@/lib/animation-variants';
import type { Service } from './Services';

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'services'>>;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
}

export function ServiceModal({
  service,
  isOpen,
  onClose,
  prefersReducedMotion,
  t,
  tNav,
}: ServiceModalProps) {
  const modalRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useFocusTrap(isOpen, modalRef, closeButtonRef);
  useLenisControl(isOpen);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.article
              ref={modalRef}
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-lg overflow-auto overscroll-contain rounded-3xl bg-white p-8 shadow-2xl dark:bg-gray-950 dark:shadow-black/30"
              {...createModalAnimation(prefersReducedMotion)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
            >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label={t('close')}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-light text-white shadow-lg">
                {service.icon}
              </div>

              {/* Title */}
              <h2
                id="service-modal-title"
                className="mb-4 font-heading text-2xl font-bold text-primary dark:text-gray-100"
              >
                {t(`items.${service.key}.title`)}
              </h2>

              {/* Problem section */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500/80 dark:text-red-400/80">
                  {t('problemLabel')}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {t(`items.${service.key}.problem`)}
                </p>
              </div>

              {/* Outcome section */}
              <div className="mb-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80">
                  {t('outcomeLabel')}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {t(`items.${service.key}.outcome`)}
                </p>
              </div>

              {/* Why different section */}
              <div className="mb-8">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                  {t('differentLabel')}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                  {t(`items.${service.key}.different`)}
                </p>
              </div>

              {/* CTA button */}
              <a
                href="#contatti"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span>{tNav('cta')}</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </motion.article>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
