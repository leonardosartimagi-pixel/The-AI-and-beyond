'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';

export function FloatingAICTA() {
  const t = useTranslations('innovation.cta');
  const [isVisible, setIsVisible] = useState(false);
  const portfolioRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Trova la sezione Portfolio
    portfolioRef.current = document.getElementById('portfolio');

    const handleScroll = () => {
      if (!portfolioRef.current) return;

      const portfolioRect = portfolioRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Mostra il CTA quando l'utente entra nella sezione Portfolio
      const inPortfolio =
        portfolioRect.top < windowHeight && portfolioRect.bottom > 0;

      setIsVisible(inPortfolio);
    };

    handleScroll(); // Check iniziale
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="p-6">
              <h3 className="mb-3 font-heading text-lg font-bold text-gray-900 dark:text-white">
                {t('title')}
              </h3>
              <Link
                href="#contatti"
                className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                {t('button')}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
