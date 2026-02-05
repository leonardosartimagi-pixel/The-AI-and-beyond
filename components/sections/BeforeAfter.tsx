'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion, useScrollProgress } from '@/hooks';
import { Button } from '@/components/ui';

interface BeforeAfterProps {
  className?: string;
}

// Problem icons for Phase 1
const ProblemIcons = {
  time: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  email: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  error: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

// Solution icons for Phase 3
const SolutionIcons = {
  automation: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  speed: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  check: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// Animated counter component
function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  isInView
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  isInView: boolean;
}) {
  return (
    <motion.span
      className="font-heading text-5xl font-bold md:text-6xl"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

// Phase 1: The Problem
function ProblemPhase({ t, isActive }: { t: ReturnType<typeof useTranslations<'beforeAfter'>>; isActive: boolean }) {
  const problems = [
    { icon: ProblemIcons.time, key: 'reports' },
    { icon: ProblemIcons.email, key: 'emails' },
    { icon: ProblemIcons.error, key: 'data' },
  ];

  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="mb-4 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-red-700"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('phase1.label')}
      </motion.span>

      <h3 className="mb-8 font-heading text-3xl font-bold text-red-800 md:text-4xl lg:text-5xl">
        {t('phase1.title')}
      </h3>

      <div className="grid max-w-4xl gap-6 md:grid-cols-3">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.key}
            className="rounded-2xl border-2 border-red-200 bg-red-50/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
          >
            <div className="mb-4 inline-flex rounded-xl bg-red-200 p-3 text-red-700">
              {problem.icon}
            </div>
            <p className="text-lg font-semibold text-red-900">
              {t(`items.${problem.key}.before.time`)}
            </p>
            <p className="mt-2 text-sm text-red-700">
              {t(`items.${problem.key}.before.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Phase 2: The Transition
function TransitionPhase({ t, isActive }: { t: ReturnType<typeof useTranslations<'beforeAfter'>>; isActive: boolean }) {
  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg className="h-20 w-20 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </motion.div>

      <h3 className="mb-4 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
        {t('phase2.title')}
      </h3>

      <p className="max-w-xl text-lg text-gray-600 md:text-xl">
        {t('phase2.description')}
      </p>

      <motion.div
        className="mt-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="h-px w-12 bg-accent/50" />
        <span className="text-sm font-medium uppercase tracking-widest text-accent">
          {t('phase2.hint')}
        </span>
        <span className="h-px w-12 bg-accent/50" />
      </motion.div>
    </motion.div>
  );
}

// Phase 3: The Solution
function SolutionPhase({ t, isActive }: { t: ReturnType<typeof useTranslations<'beforeAfter'>>; isActive: boolean }) {
  const solutions = [
    { icon: SolutionIcons.speed, key: 'reports' },
    { icon: SolutionIcons.automation, key: 'emails' },
    { icon: SolutionIcons.check, key: 'data' },
  ];

  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-emerald-700"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('phase3.label')}
      </motion.span>

      <h3 className="mb-8 font-heading text-3xl font-bold text-emerald-800 md:text-4xl lg:text-5xl">
        {t('phase3.title')}
      </h3>

      <div className="grid max-w-4xl gap-6 md:grid-cols-3">
        {solutions.map((solution, index) => (
          <motion.div
            key={solution.key}
            className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
          >
            <div className="mb-4 inline-flex rounded-xl bg-emerald-200 p-3 text-emerald-700">
              {solution.icon}
            </div>
            <p className="text-lg font-semibold text-emerald-900">
              {t(`items.${solution.key}.after.time`)}
            </p>
            <p className="mt-2 text-sm text-emerald-700">
              {t(`items.${solution.key}.after.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Phase 4: The Results
function ResultsPhase({ t, isActive }: { t: ReturnType<typeof useTranslations<'beforeAfter'>>; isActive: boolean }) {
  const metrics = [
    { value: 95, suffix: '%', label: t('phase4.metric1') },
    { value: 100, suffix: '%', label: t('phase4.metric2') },
    { value: 24, suffix: '/7', label: t('phase4.metric3') },
  ];

  return (
    <motion.div
      className="flex h-full flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-accent"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('phase4.label')}
      </motion.span>

      <h3 className="mb-12 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
        {t('phase4.title')}
      </h3>

      <div className="mb-12 grid max-w-4xl gap-8 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className="rounded-2xl bg-white dark:bg-gray-950 p-8 shadow-xl dark:shadow-black/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
          >
            <AnimatedCounter
              value={metric.value}
              suffix={metric.suffix}
              isInView={isActive}
            />
            <p className="mt-4 text-sm font-medium text-gray-600">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
          className="shadow-lg shadow-accent/30"
        >
          {t('phase4.cta')}
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Progress indicator dots
function ProgressIndicator({ phase, totalPhases }: { phase: number; totalPhases: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
      {Array.from({ length: totalPhases }).map((_, index) => (
        <motion.div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index + 1 === phase
              ? 'w-8 bg-accent'
              : index + 1 < phase
                ? 'w-2 bg-accent/60'
                : 'w-2 bg-gray-300'
          }`}
          layout
        />
      ))}
    </div>
  );
}

export function BeforeAfter({ className = '' }: BeforeAfterProps) {
  const t = useTranslations('beforeAfter');
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track scroll progress through the section
  const { phase, isInView } = useScrollProgress(sectionRef, 4);

  // Background colors for each phase
  const bgColors = {
    1: 'from-red-50 via-orange-50 to-red-50',
    2: 'from-blue-50 via-accent/5 to-blue-50',
    3: 'from-emerald-50 via-green-50 to-emerald-50',
    4: 'from-accent/5 via-primary/5 to-accent/5',
  };

  // For reduced motion, show all content without scroll effects
  if (prefersReducedMotion) {
    return (
      <section
        id="trasformazione"
        className={`relative bg-gray-50 py-24 lg:py-32 ${className}`}
        aria-label={t('label')}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
              <span className="h-px w-8 bg-accent" />
              {t('label')}
              <span className="h-px w-8 bg-accent" />
            </span>
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              {t('title')} <span className="text-accent">{t('titleAccent')}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">{t('description')}</p>
          </div>

          {/* Static content for reduced motion */}
          <div className="space-y-16">
            <ProblemPhase t={t} isActive={true} />
            <SolutionPhase t={t} isActive={true} />
            <ResultsPhase t={t} isActive={true} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="trasformazione"
      className={`relative ${className}`}
      aria-label={t('label')}
      style={{ height: '400vh' }} // 4x viewport height for scroll-driven animation
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 ${bgColors[phase as keyof typeof bgColors]}`}
          aria-hidden="true"
        />

        {/* Content phases */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 1 && (
              <motion.div key="phase1" className="absolute inset-0">
                <ProblemPhase t={t} isActive={phase === 1} />
              </motion.div>
            )}
            {phase === 2 && (
              <motion.div key="phase2" className="absolute inset-0">
                <TransitionPhase t={t} isActive={phase === 2} />
              </motion.div>
            )}
            {phase === 3 && (
              <motion.div key="phase3" className="absolute inset-0">
                <SolutionPhase t={t} isActive={phase === 3} />
              </motion.div>
            )}
            {phase === 4 && (
              <motion.div key="phase4" className="absolute inset-0">
                <ResultsPhase t={t} isActive={phase === 4} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <ProgressIndicator phase={phase} totalPhases={4} />

        {/* Scroll hint (only on phase 1) */}
        {phase === 1 && isInView && (
          <motion.div
            className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1 },
              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <span className="text-sm text-gray-500">{t('scrollHint')}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
