'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion, useActiveStep } from '@/hooks';
import { AnimatedIcon, ProcessIcons } from '@/components/effects';
import { SectionHeader, SectionWrapper } from '@/components/ui';
import {
  EASING,
  createHeadingVariants,
  createCardVariants,
} from '@/lib/animation-variants';

interface ProcessStep {
  id: string;
  key: string;
  number: number;
  icon: React.ReactNode;
}

interface ProcessProps {
  className?: string;
}

const STEP_KEYS = [
  'listen',
  'analyze',
  'design',
  'develop',
  'deliver',
] as const;

const steps: ProcessStep[] = [
  {
    id: 'ascoltiamo',
    key: 'listen',
    number: 1,
    icon: <div className="h-6 w-6">{ProcessIcons.listen}</div>,
  },
  {
    id: 'analizziamo',
    key: 'analyze',
    number: 2,
    icon: <div className="h-6 w-6">{ProcessIcons.analyze}</div>,
  },
  {
    id: 'progettiamo',
    key: 'design',
    number: 3,
    icon: <div className="h-6 w-6">{ProcessIcons.design}</div>,
  },
  {
    id: 'sviluppiamo',
    key: 'develop',
    number: 4,
    icon: <div className="h-6 w-6">{ProcessIcons.develop}</div>,
  },
  {
    id: 'consegniamo',
    key: 'deliver',
    number: 5,
    icon: <div className="h-6 w-6">{ProcessIcons.deliver}</div>,
  },
];

interface StepCardProps {
  step: ProcessStep;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  isLast: boolean;
  isActive: boolean;
  isPassed: boolean;
  t: ReturnType<typeof useTranslations<'process'>>;
}

function StepCard({
  step,
  index,
  isInView,
  prefersReducedMotion,
  isLast,
  isActive,
  isPassed,
  t,
}: StepCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = createCardVariants(prefersReducedMotion, index, {
    delayMultiplier: 0.15,
  });

  const lineVariants = {
    hidden: { scaleY: 0, scaleX: 0 },
    visible: {
      scaleY: 1,
      scaleX: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.15 + 0.3,
        ease: EASING,
      },
    },
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
    active: { scale: 1.15 },
  };

  // Determine icon state
  const getIconState = () => {
    if (isHovered && !prefersReducedMotion) return 'hover';
    if (isActive && !prefersReducedMotion) return 'active';
    return 'idle';
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile: Vertical layout with connector */}
      <div className="flex w-full items-start gap-4 lg:hidden">
        {/* Left side: Icon and line */}
        <div className="flex flex-col items-center">
          {/* Icon circle with dynamic state */}
          <motion.div
            className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors duration-300 ${
              isActive || isPassed
                ? 'bg-gradient-to-br from-accent to-accent-light text-white'
                : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600 dark:from-gray-600 dark:to-gray-700 dark:text-gray-300'
            }`}
            variants={prefersReducedMotion ? {} : iconVariants}
            animate={getIconState()}
            transition={{ duration: 0.3 }}
          >
            <AnimatedIcon delay={index * 0.2} duration={0.6}>
              {step.icon}
            </AnimatedIcon>
            <span
              className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white transition-colors duration-300 ${
                isActive || isPassed ? 'bg-primary' : 'bg-gray-500'
              }`}
            >
              {step.number}
            </span>

            {/* Pulse effect when active */}
            {isActive && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full bg-accent"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                aria-hidden="true"
              />
            )}
          </motion.div>

          {/* Vertical connector line (not on last item) */}
          {!isLast && (
            <motion.div
              className={`mt-2 h-16 w-0.5 origin-top transition-colors duration-300 ${
                isPassed
                  ? 'bg-gradient-to-b from-accent to-accent-light'
                  : 'bg-gradient-to-b from-gray-300 to-gray-300/30'
              }`}
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Right side: Content */}
        <div className="flex-1 pb-8">
          <h3
            className={`mb-1 font-heading text-lg font-bold transition-colors duration-300 ${
              isActive || isPassed
                ? 'text-primary dark:text-accent-light'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {t(`steps.${step.key}.title`)}
          </h3>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {t(`steps.${step.key}.description`)}
          </p>
        </div>
      </div>

      {/* Desktop: Card layout */}
      <div className="hidden lg:block">
        {/* Icon circle with dynamic state */}
        <motion.div
          className={`relative z-10 mx-auto mb-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            isActive || isPassed
              ? 'bg-gradient-to-br from-accent to-accent-light text-white shadow-accent/30'
              : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600 dark:from-gray-600 dark:to-gray-700 dark:text-gray-300'
          }`}
          variants={prefersReducedMotion ? {} : iconVariants}
          animate={getIconState()}
          transition={{ duration: 0.3 }}
        >
          <AnimatedIcon delay={index * 0.2} duration={0.6}>
            {step.icon}
          </AnimatedIcon>
          <span
            className={`absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white transition-colors duration-300 ${
              isActive || isPassed ? 'bg-primary' : 'bg-gray-500'
            }`}
          >
            {step.number}
          </span>

          {/* Pulse effect when active */}
          {isActive && !prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full bg-accent"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* Content card with active state */}
        <motion.div
          className={`rounded-xl p-5 transition-all duration-300 ${
            isActive
              ? 'bg-white shadow-lg ring-2 ring-accent/20 dark:bg-gray-800'
              : isPassed
                ? 'bg-white shadow-md dark:bg-gray-800/80'
                : 'bg-white/80 shadow-sm dark:bg-gray-800/50'
          }`}
          animate={{
            y: isActive && !prefersReducedMotion ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className={`mb-2 text-center font-heading text-lg font-bold transition-colors duration-300 ${
              isActive || isPassed
                ? 'text-primary dark:text-accent-light'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {t(`steps.${step.key}.title`)}
          </h3>
          <p className="text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {t(`steps.${step.key}.description`)}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Process({ className = '' }: ProcessProps) {
  const t = useTranslations('process');
  const tNav = useTranslations('nav');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // useActiveStep needs the section ref for scroll-based progress
  const { activeStep, progress } = useActiveStep(sectionRef, steps.length);

  const headingVariants = createHeadingVariants(prefersReducedMotion);

  return (
    <SectionWrapper
      id="come-lavoriamo"
      ariaLabel={t('label')}
      bgVariant="gray"
      className={className}
      sectionRef={sectionRef}
      decorations={
        <>
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />
        </>
      }
    >
      {({ isInView }) => (
        <>
          {/* Section header */}
          <SectionHeader
            label={t('label')}
            title={t('title')}
            titleAccent={t('titleAccent')}
            description={t('description')}
            isInView={isInView}
          />

          {/* Timeline container */}
          <div className="relative">
            {/* Desktop horizontal connecting line - animated with scroll progress */}
            <div
              className="absolute left-0 right-0 top-8 hidden h-0.5 lg:block"
              aria-hidden="true"
            >
              {/* Background line */}
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />

              {/* Animated progress line */}
              <motion.div
                className="absolute left-0 top-0 h-full origin-left bg-gradient-to-r from-accent via-accent-light to-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isInView ? progress : 0 }}
                transition={{ duration: 0.1 }}
              />
            </div>

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
                  isActive={index === activeStep}
                  isPassed={index < activeStep}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* Closing note */}
          <motion.p
            className="mx-auto mt-16 max-w-2xl text-center text-lg italic text-gray-500 dark:text-gray-400"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {t('closingNote')}
          </motion.p>

          {/* Bottom CTA */}
          <motion.div
            className="mt-8 text-center"
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
        </>
      )}
    </SectionWrapper>
  );
}
