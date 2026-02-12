'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Animated counter component
function AnimatedNumber({
  value,
  formatFn,
  prefersReducedMotion,
}: {
  value: number;
  formatFn: (n: number) => string;
  prefersReducedMotion: boolean;
}) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: prefersReducedMotion ? 0 : undefined,
  });
  const display = useTransform(spring, (current) =>
    formatFn(Math.round(current))
  );
  const [displayValue, setDisplayValue] = useState(formatFn(0));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return unsubscribe;
  }, [display]);

  return <span>{displayValue}</span>;
}

interface ROIResultsCardProps {
  hoursSavedMonthly: number;
  hoursSavedAnnually: number;
  annualSavings: number;
  useHourlyRate: boolean;
  prefersReducedMotion: boolean;
  isInView: boolean;
  variants: Variants;
}

export function ROIResultsCard({
  hoursSavedMonthly,
  hoursSavedAnnually,
  annualSavings,
  useHourlyRate,
  prefersReducedMotion,
  isInView,
  variants,
}: ROIResultsCardProps) {
  const t = useTranslations('roiCalculator');

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const formatHours = useCallback((value: number) => {
    return Math.round(value).toLocaleString('it-IT');
  }, []);

  return (
    <motion.div
      className="flex flex-col rounded-2xl border border-accent/20 bg-gradient-to-br from-white to-accent/5 p-6 shadow-sm sm:p-8"
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <h3 className="mb-6 flex items-center gap-3 font-heading text-xl font-bold text-primary">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light text-white">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </span>
        {t('results.title')}
      </h3>

      <div className="flex-1 space-y-6">
        {/* Hours saved monthly */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-1 text-sm font-medium text-gray-500">
            {t('results.monthlyHours')}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-bold text-primary">
              <AnimatedNumber
                value={hoursSavedMonthly}
                formatFn={formatHours}
                prefersReducedMotion={prefersReducedMotion}
              />
            </span>
          </div>
        </div>

        {/* Hours saved annually */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-1 text-sm font-medium text-gray-500">
            {t('results.annualHours')}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-bold text-primary">
              <AnimatedNumber
                value={hoursSavedAnnually}
                formatFn={formatHours}
                prefersReducedMotion={prefersReducedMotion}
              />
            </span>
          </div>
        </div>

        {/* Annual monetary savings */}
        {useHourlyRate && (
          <motion.div
            className="rounded-xl bg-gradient-to-r from-accent/10 to-emerald-50 p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          >
            <div className="mb-1 text-sm font-medium text-accent-dark">
              {t('results.annualSavings')}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl font-bold text-accent-dark sm:text-5xl">
                <AnimatedNumber
                  value={annualSavings}
                  formatFn={formatCurrency}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </span>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-gray-400">{t('results.disclaimer')}</p>
      </div>

      {/* CTA Button */}
      <div className="mt-6 border-t border-gray-100 pt-6">
        <a
          href="#contatti"
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-4 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <span>{t('cta')}</span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
      </div>
    </motion.div>
  );
}
