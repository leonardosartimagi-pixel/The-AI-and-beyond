'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';

interface ProcessStep {
  id: string;
  key: string;
  number: number;
  icon: React.ReactNode;
}

interface ProcessProps {
  className?: string;
}

const STEP_KEYS = ['listen', 'analyze', 'design', 'develop', 'deliver'] as const;

const steps: ProcessStep[] = [
  {
    id: 'ascolto',
    key: 'listen',
    number: 1,
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
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
        />
      </svg>
    ),
  },
  {
    id: 'analizzo',
    key: 'analyze',
    number: 2,
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    ),
  },
  {
    id: 'progetto',
    key: 'design',
    number: 3,
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
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
    ),
  },
  {
    id: 'sviluppo',
    key: 'develop',
    number: 4,
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
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    id: 'consegno',
    key: 'deliver',
    number: 5,
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
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
    ),
  },
];

interface StepCardProps {
  step: ProcessStep;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  isLast: boolean;
  t: ReturnType<typeof useTranslations<'process'>>;
}

function StepCard({
  step,
  index,
  isInView,
  prefersReducedMotion,
  isLast,
  t,
}: StepCardProps) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0, scaleX: 0 },
    visible: {
      scaleY: 1,
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.2 + 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Mobile: Vertical layout with connector */}
      <div className="flex w-full items-start gap-4 lg:hidden">
        {/* Left side: Icon and line */}
        <div className="flex flex-col items-center">
          {/* Icon circle */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-white shadow-lg">
            {step.icon}
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {step.number}
            </span>
          </div>
          {/* Vertical connector line (not on last item) */}
          {!isLast && (
            <motion.div
              className="mt-2 h-16 w-0.5 origin-top bg-gradient-to-b from-accent to-accent-light/30"
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Right side: Content */}
        <div className="flex-1 pb-8">
          <h3 className="mb-1 font-heading text-lg font-bold text-primary">
            {t(`steps.${step.key}.title`)}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600">
            {t(`steps.${step.key}.description`)}
          </p>
        </div>
      </div>

      {/* Desktop: Card layout */}
      <div className="hidden lg:block">
        {/* Icon circle */}
        <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light text-white shadow-lg">
          {step.icon}
          <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {step.number}
          </span>
        </div>

        {/* Content card */}
        <div className="rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <h3 className="mb-2 text-center font-heading text-lg font-bold text-primary">
            {t(`steps.${step.key}.title`)}
          </h3>
          <p className="text-center text-sm leading-relaxed text-gray-600">
            {t(`steps.${step.key}.description`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Process({ className = '' }: ProcessProps) {
  const t = useTranslations('process');
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

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 1.2,
        delay: prefersReducedMotion ? 0 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="come-lavoro"
      className={`relative overflow-hidden bg-gray-50 py-24 lg:py-32 ${className}`}
      aria-label={t('label')}
    >
      {/* Decorative gradient blur - top right */}
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Decorative gradient blur - bottom left */}
      <div
        className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
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

          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
            {t('title')}{' '}
            <span className="relative inline-block">
              {t('titleAccent')}
              <span
                className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
                aria-hidden="true"
              />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
            {t('description')}
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Desktop horizontal connecting line */}
          <motion.div
            className="absolute left-0 right-0 top-8 hidden h-0.5 origin-left bg-gradient-to-r from-accent/20 via-accent to-accent/20 lg:block"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            aria-hidden="true"
          />

          {/* Steps grid */}
          <div className="grid gap-0 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isLast={index === steps.length - 1}
                t={t}
              />
            ))}
          </div>
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-8 py-4 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>{tNav('cta')}</span>
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
