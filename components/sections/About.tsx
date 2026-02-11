'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { TechGridOverlay, SectionTitleGlitch } from '@/components/effects';

interface AboutProps {
  className?: string;
}

export function About({ className = '' }: AboutProps) {
  const t = useTranslations('about');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
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
        duration: prefersReducedMotion ? 0 : 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="chi-siamo"
      className={`relative overflow-hidden bg-white py-24 dark:bg-gray-950 lg:py-32 ${className}`}
      aria-label={t('label')}
    >
      {/* Tech grid overlay for consistency */}
      <TechGridOverlay opacity={0.02} />

      {/* Decorative gradient blur - top right */}
      <motion.div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      {/* Decorative gradient blur - bottom left */}
      <motion.div
        className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      {/* Decorative diagonal line */}
      <motion.div
        className="absolute left-0 top-1/3 hidden h-px w-1/4 bg-gradient-to-r from-transparent via-accent/20 to-transparent lg:block"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Text content - takes 7 columns on desktop, offset from left */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-7 lg:col-start-1"
            variants={textVariants}
          >
            {/* Section label */}
            <motion.span
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent"
              variants={textVariants}
            >
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {t('label')}
            </motion.span>

            {/* Main heading */}
            <motion.h2
              className="mb-8 font-heading text-3xl font-bold leading-tight text-primary dark:text-gray-100 sm:text-4xl lg:text-5xl"
              variants={textVariants}
            >
              {t('title')}{' '}
              <span className="relative inline-block">
                <SectionTitleGlitch>{t('titleAccent')}</SectionTitleGlitch>
                <span
                  className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
                  aria-hidden="true"
                />
              </span>
            </motion.h2>

            {/* Bio text - five paragraphs */}
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <motion.p variants={textVariants}>{t('intro')}</motion.p>

              <motion.p
                className="border-l-2 border-accent/30 pl-6 italic text-gray-600 dark:text-gray-400"
                variants={textVariants}
              >
                {t('paragraph1')}
              </motion.p>

              <motion.p variants={textVariants}>{t('paragraph2')}</motion.p>

              <motion.p variants={textVariants}>{t('paragraph3')}</motion.p>

              <motion.p variants={textVariants}>{t('paragraph4')}</motion.p>
            </div>

            {/* Credibility elements - methodology badges */}
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={textVariants}
            >
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary dark:text-gray-100">
                    {t('credentials.practical.title')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('credentials.practical.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary dark:text-gray-100">
                    {t('credentials.fast.title')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('credentials.fast.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    className="h-5 w-5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary dark:text-gray-100">
                    {t('credentials.custom.title')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t('credentials.custom.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo placeholder - asymmetric positioning */}
          <motion.div
            className="relative lg:col-span-5 lg:col-start-8"
            variants={imageVariants}
          >
            {/* Decorative frame elements */}
            <div
              className="absolute -right-4 -top-4 h-full w-full rounded-2xl border-2 border-accent/20"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5"
              aria-hidden="true"
            />

            {/* Main photo container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/about/profile.webp"
                alt={t('photoAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                quality={85}
                loading="lazy"
              />
            </div>

            {/* Floating accent element */}
            <motion.div
              className="absolute -bottom-8 -left-8 hidden rounded-xl bg-white p-3 shadow-lg lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.8,
              }}
            >
              <Image
                src="/images/logo-symbol.png"
                alt="The AI and Beyond"
                width={48}
                height={48}
                className="h-12 w-12"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
