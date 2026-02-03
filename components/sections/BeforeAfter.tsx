'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';

interface Comparison {
  id: string;
  key: string;
  icon: React.ReactNode;
}

interface BeforeAfterProps {
  className?: string;
}

const COMPARISON_KEYS = ['reports', 'emails', 'data'] as const;

const comparisons: Comparison[] = [
  {
    id: 'report-generation',
    key: 'reports',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    id: 'email-followup',
    key: 'emails',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    id: 'data-analysis',
    key: 'data',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
  },
];

interface ComparisonSliderProps {
  comparison: Comparison;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'beforeAfter'>>;
}

function ComparisonSlider({
  comparison,
  index,
  isInView,
  prefersReducedMotion,
  t,
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.article
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
        {/* Header with icon and title */}
        <div className="flex items-center gap-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md">
            {comparison.icon}
          </div>
          <h3 className="font-heading text-lg font-bold text-primary lg:text-xl">
            {t(`items.${comparison.key}.title`)}
          </h3>
        </div>

        {/* Comparison slider area */}
        <div
          ref={sliderRef}
          className="relative h-[280px] cursor-ew-resize select-none overflow-hidden sm:h-[240px]"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          onClick={handleClick}
          role="slider"
          aria-label={`${t(`items.${comparison.key}.title`)}: ${t('dragHint')}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              setSliderPosition((prev) => Math.max(0, prev - 5));
            } else if (e.key === 'ArrowRight') {
              setSliderPosition((prev) => Math.min(100, prev + 5));
            }
          }}
        >
          {/* Before side (left) - Red/Orange tones */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="flex h-full flex-col justify-between p-5 sm:p-6">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden="true" />
                  {t('before')}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {t(`items.${comparison.key}.before.description`)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold text-red-600 sm:text-3xl">
                    {t(`items.${comparison.key}.before.time`)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* After side (right) - Green/Accent tones */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-accent/10 to-emerald-50"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <div className="flex h-full flex-col justify-between p-5 sm:p-6">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {t('after')}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {t(`items.${comparison.key}.after.description`)}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold text-accent-dark sm:text-3xl">
                    {t(`items.${comparison.key}.after.time`)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Slider handle */}
          <motion.div
            className="absolute top-0 z-10 flex h-full w-1 cursor-ew-resize items-center justify-center bg-primary shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            animate={{
              boxShadow: isDragging
                ? '0 0 20px rgba(26, 54, 93, 0.4)'
                : '0 4px 12px rgba(26, 54, 93, 0.2)',
            }}
          >
            {/* Handle grip */}
            <div className="flex h-12 w-8 items-center justify-center rounded-full bg-primary shadow-lg">
              <div className="flex gap-0.5">
                <div className="h-4 w-0.5 rounded-full bg-white/60" />
                <div className="h-4 w-0.5 rounded-full bg-white/60" />
                <div className="h-4 w-0.5 rounded-full bg-white/60" />
              </div>
            </div>
          </motion.div>

          {/* Drag hint - shows initially */}
          <motion.div
            className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: isDragging || sliderPosition !== 50 ? 0 : 1,
              y: isDragging || sliderPosition !== 50 ? 10 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              {t('dragHint')}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

export function BeforeAfter({ className = '' }: BeforeAfterProps) {
  const t = useTranslations('beforeAfter');
  const tNav = useTranslations('nav');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const headingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="trasformazioni"
      className={`relative overflow-hidden bg-white py-24 lg:py-32 ${className}`}
      aria-label={t('label')}
    >
      {/* Decorative gradient blur - top right */}
      <motion.div
        className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      {/* Decorative gradient blur - bottom left */}
      <motion.div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      {/* Decorative line pattern */}
      <div
        className="absolute right-20 top-32 hidden h-32 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 left-20 hidden h-32 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center lg:mb-20"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {t('label')}
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>

          <h2 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            {t('title')}{' '}
            <span className="relative inline-block">
              {t('titleAccent')}
              <span
                className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
                aria-hidden="true"
              />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {t('description')}
          </p>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison, index) => (
            <ComparisonSlider
              key={comparison.id}
              comparison={comparison}
              index={index}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
              t={t}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <a
            href="#contatti"
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
        </motion.div>
      </div>
    </section>
  );
}
