'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { SectionTitleGlitch } from '@/components/effects';

interface ROICalculatorProps {
  className?: string;
}

interface TaskType {
  id: string;
  key: string;
  multiplier: number;
}

const taskTypes: TaskType[] = [
  {
    id: 'data-entry',
    key: 'dataEntry',
    multiplier: 1.2,
  },
  {
    id: 'reporting',
    key: 'reporting',
    multiplier: 1.0,
  },
  {
    id: 'communications',
    key: 'communication',
    multiplier: 0.8,
  },
  {
    id: 'other',
    key: 'other',
    multiplier: 0.9,
  },
];

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
  const display = useTransform(spring, (current) => formatFn(Math.round(current)));
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

export function ROICalculator({ className = '' }: ROICalculatorProps) {
  const t = useTranslations('roiCalculator');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // Form state
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [useHourlyRate, setUseHourlyRate] = useState(true);
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType>(taskTypes[1] as TaskType);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculations (Conservative 60% efficiency)
  const EFFICIENCY = 0.6;
  const hoursSavedMonthly = hoursPerWeek * 4 * EFFICIENCY * selectedTaskType.multiplier;
  const hoursSavedAnnually = hoursSavedMonthly * 12;
  const annualSavings = hoursSavedAnnually * hourlyRate;

  // Formatting functions
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

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.4,
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
      id="roi-calculator"
      className={`relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-24 lg:py-32 ${className}`}
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
              <SectionTitleGlitch>{t('titleAccent')}</SectionTitleGlitch>
              <span
                className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
                aria-hidden="true"
              />
            </span>
            ?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Input Card */}
          <motion.div
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="mb-6 flex items-center gap-3 font-heading text-xl font-bold text-primary">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white">
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </span>
              Inserisci i tuoi dati
            </h3>

            <div className="space-y-6">
              {/* Hours per week slider */}
              <div>
                <label
                  htmlFor="hours-slider"
                  className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700"
                >
                  <span>{t('hoursLabel')}</span>
                  <span className="rounded-lg bg-primary/10 px-3 py-1 font-heading text-lg font-bold text-primary">
                    {hoursPerWeek}h
                  </span>
                </label>
                <input
                  id="hours-slider"
                  type="range"
                  min="1"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-accent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                  aria-valuemin={1}
                  aria-valuemax={40}
                  aria-valuenow={hoursPerWeek}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>1h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* Task type dropdown */}
              <div ref={dropdownRef} className="relative">
                <label
                  htmlFor="task-type"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {t('taskTypeLabel')}
                </label>
                <button
                  id="task-type"
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-all hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <div>
                    <span className="block font-medium text-gray-900">
                      {t(`taskTypes.${selectedTaskType.key}`)}
                    </span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <ul
                    className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"
                    role="listbox"
                    aria-label={t('taskTypeLabel')}
                  >
                    {taskTypes.map((type) => (
                      <li key={type.id}>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                            selectedTaskType.id === type.id ? 'bg-accent/5' : ''
                          }`}
                          onClick={() => {
                            setSelectedTaskType(type);
                            setIsDropdownOpen(false);
                          }}
                          role="option"
                          aria-selected={selectedTaskType.id === type.id}
                        >
                          <div>
                            <span className="block font-medium text-gray-900">
                              {t(`taskTypes.${type.key}`)}
                            </span>
                          </div>
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            ×{type.multiplier}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Hourly rate toggle and input */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="hourly-rate-toggle"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t('hourlyRateLabel')}
                  </label>
                  <button
                    id="hourly-rate-toggle"
                    type="button"
                    onClick={() => setUseHourlyRate(!useHourlyRate)}
                    className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                      useHourlyRate ? 'bg-accent' : 'bg-gray-200'
                    }`}
                    role="switch"
                    aria-checked={useHourlyRate}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        useHourlyRate ? 'translate-x-5' : 'translate-x-0'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {useHourlyRate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                  >
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        €
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={hourlyRate}
                        onChange={(e) =>
                          setHourlyRate(Math.max(1, Math.min(500, Number(e.target.value))))
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-16 text-lg font-medium text-gray-900 transition-all hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        aria-label="Costo orario in euro"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        /ora
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          <motion.div
            className="flex flex-col rounded-2xl border border-accent/20 bg-gradient-to-br from-white to-accent/5 p-6 shadow-sm sm:p-8"
            variants={resultVariants}
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
              <p className="text-xs text-gray-400">
                {t('results.disclaimer')}
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-6 border-t border-gray-100">
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
              <strong className="text-primary">Sapevi che</strong> il 40% del tempo lavorativo
              viene speso in attività che possono essere automatizzate?
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
