'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion, useScrollProgress } from '@/hooks';
import { Button } from '@/components/ui';
import { SectionTitleGlitch } from '@/components/effects';

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
  speed: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  automation: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.15-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12" />
    </svg>
  ),
  check: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

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
        className="mb-4 inline-block rounded-full bg-slate-200 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-slate-700"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('phase1.label')}
      </motion.span>

      <h3 className="mb-8 font-heading text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl">
        {t('phase1.title')}
      </h3>

      <div className="grid max-w-4xl gap-6 md:grid-cols-3">
        {problems.map((problem, index) => (
          <motion.div
            key={problem.key}
            className="rounded-2xl border-2 border-slate-200 bg-slate-50/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15 }}
          >
            <div className="mb-4 inline-flex rounded-xl bg-slate-200 p-3 text-slate-700">
              {problem.icon}
            </div>
            <p className="text-lg font-semibold text-slate-900">
              {t(`items.${problem.key}.before.time`)}
            </p>
            <p className="mt-2 text-sm text-slate-600">
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
      <motion.span
        className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-primary"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t('phase2.label')}
      </motion.span>

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

// Phase 4: The Result
function ResultsPhase({ t, isActive }: { t: ReturnType<typeof useTranslations<'beforeAfter'>>; isActive: boolean }) {
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

      <h3 className="mb-6 font-heading text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
        {t('phase4.title')}
      </h3>

      <motion.p
        className="mx-auto mb-12 max-w-xl text-lg text-gray-600 md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {t('phase4.description')}
      </motion.p>

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

  // Background colors for each phase — professional palette
  const bgColors = {
    1: 'from-slate-100 via-slate-50 to-slate-100',
    2: 'from-blue-50 via-accent/5 to-blue-50',
    3: 'from-emerald-50 via-emerald-50/80 to-emerald-50',
    4: 'from-primary/5 via-accent/5 to-primary/5',
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
              {t('title')} <SectionTitleGlitch className="text-accent">{t('titleAccent')}</SectionTitleGlitch>
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
