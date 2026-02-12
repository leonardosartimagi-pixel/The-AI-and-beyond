'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { SectionHeader } from '@/components/ui';
import {
  EASING,
  createHeadingVariants,
  createItemVariants,
} from '@/lib/animation-variants';
import { ROIInputCard, taskTypes } from './ROIInputCard';
import type { TaskType } from './ROIInputCard';
import { ROIResultsCard } from './ROIResultsCard';

// ROI calculation constants
const BASE_EFFICIENCY_RATE = 0.6;
const WEEKS_PER_MONTH = 4;
const MONTHS_PER_YEAR = 12;

// Form defaults
const DEFAULT_HOURS_PER_WEEK = 10;
const DEFAULT_HOURLY_RATE = 50;

interface ROICalculatorProps {
  className?: string;
}

export function ROICalculator({ className = '' }: ROICalculatorProps) {
  const t = useTranslations('roiCalculator');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // Form state
  const [hoursPerWeek, setHoursPerWeek] = useState(DEFAULT_HOURS_PER_WEEK);
  const [hourlyRate, setHourlyRate] = useState(DEFAULT_HOURLY_RATE);
  const [useHourlyRate, setUseHourlyRate] = useState(true);
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType>(
    taskTypes[1] as TaskType
  );

  // Calculations
  const hoursSavedMonthly =
    hoursPerWeek *
    WEEKS_PER_MONTH *
    BASE_EFFICIENCY_RATE *
    selectedTaskType.multiplier;
  const hoursSavedAnnually = hoursSavedMonthly * MONTHS_PER_YEAR;
  const annualSavings = hoursSavedAnnually * hourlyRate;

  // Animation variants
  const headingVariants = createHeadingVariants(prefersReducedMotion);
  const cardVariants = createItemVariants(prefersReducedMotion, {
    y: 40,
    delay: 0.2,
  });
  const resultVariants = createItemVariants(prefersReducedMotion, {
    scale: 0.95,
    delay: 0.4,
  });

  // Decorative: unconditional scale/delay (not conditional on prefersReducedMotion)
  const decorativeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        delay: 0.3,
        ease: EASING,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="roi-calculator"
      className={`relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900 lg:py-32 ${className}`}
      aria-label={t('label')}
    >
      {/* Decorative gradient blur - top left */}
      <motion.div
        className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      {/* Decorative gradient blur - bottom right */}
      <motion.div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      {/* Decorative line patterns */}
      <div
        className="absolute left-20 top-32 hidden h-32 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 right-20 hidden h-32 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionHeader
          label={t('label')}
          title={t('title')}
          titleAccent={t('titleAccent')}
          description={t('description')}
          titleClassName="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl"
          descriptionClassName="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
          isInView={isInView}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ROIInputCard
            hoursPerWeek={hoursPerWeek}
            onHoursChange={setHoursPerWeek}
            hourlyRate={hourlyRate}
            onHourlyRateChange={setHourlyRate}
            useHourlyRate={useHourlyRate}
            onUseHourlyRateChange={setUseHourlyRate}
            selectedTaskType={selectedTaskType}
            onTaskTypeChange={setSelectedTaskType}
            prefersReducedMotion={prefersReducedMotion}
            isInView={isInView}
            variants={cardVariants}
          />

          <ROIResultsCard
            hoursSavedMonthly={hoursSavedMonthly}
            hoursSavedAnnually={hoursSavedAnnually}
            annualSavings={annualSavings}
            useHourlyRate={useHourlyRate}
            prefersReducedMotion={prefersReducedMotion}
            isInView={isInView}
            variants={resultVariants}
          />
        </div>

        {/* Bottom insight */}
        <motion.div
          className="mt-12 text-center"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-4 w-4 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </span>
            <span className="text-sm text-gray-600">
              <strong className="text-primary">{t('insightPrefix')}</strong>{' '}
              {t('insight')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
