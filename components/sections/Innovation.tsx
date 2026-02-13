'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { TechGridOverlay } from '@/components/effects';
import {
  createContainerVariants,
  createItemVariants,
} from '@/lib/animation-variants';

interface InnovationProps {
  className?: string;
}

export function Innovation({ className = '' }: InnovationProps) {
  const t = useTranslations('innovation');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = createContainerVariants(prefersReducedMotion, {
    delayChildren: 0.1,
  });
  const textVariants = createItemVariants(prefersReducedMotion, { y: 30 });
  const imageVariants = createItemVariants(prefersReducedMotion, {
    y: 40,
    scale: 0.95,
    duration: 0.8,
  });

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

  const techItems = [
    { emoji: '🧠', label: t('featured.techList.ai') },
    { emoji: '👁️', label: t('featured.techList.vision') },
    { emoji: '🧭', label: t('featured.techList.navigation') },
    { emoji: '🛡️', label: t('featured.techList.safety') },
  ];

  return (
    <section
      ref={sectionRef}
      id="innovazione"
      className={`relative overflow-hidden bg-gray-50 py-16 dark:bg-gray-900/50 lg:py-20 ${className}`}
      aria-label={t('label')}
    >
      {/* Tech grid overlay */}
      <TechGridOverlay opacity={0.03} />

      {/* Decorative gradient blurs */}
      <motion.div
        className="absolute -left-64 -top-64 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -bottom-64 -right-64 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
        variants={decorativeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Section header - style consistente con altre sezioni */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-12 text-center lg:mb-16"
        >
          {/* Label con linee decorative */}
          <motion.p
            variants={textVariants}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent"
          >
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {t('label')}
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </motion.p>

          <motion.h2
            variants={textVariants}
            className="mx-auto mb-6 max-w-2xl font-heading text-3xl font-bold leading-tight tracking-tight text-primary dark:text-gray-100 sm:text-4xl lg:text-5xl"
          >
            <span className="block">{t('title')}</span>
            <span className="text-accent">{t('titleAccent')}</span>
          </motion.h2>
        </motion.div>

        {/* Featured project card - ridimensionato e centrato */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-900 lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Image section */}
            <motion.div
              variants={imageVariants}
              className="relative aspect-[4/3] lg:aspect-auto"
            >
              <Image
                src="/images/innovation/vmove-robot-hero.png"
                alt="V-Move CareBot autonomous robot for accessibility in marinas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />

              {/* Featured tag */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-lg">
                <span aria-hidden="true">✨</span>
                {t('featured.tag')}
              </div>
            </motion.div>

            {/* Content section - compatta */}
            <motion.div
              variants={textVariants}
              className="flex flex-col justify-between p-6 lg:p-8"
            >
              <div>
                <h3 className="mb-2 font-heading text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                  {t('featured.title')}
                </h3>
                <p className="mb-4 text-base font-medium text-accent">
                  {t('featured.subtitle')}
                </p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {t('featured.description')}
                </p>
                <p className="mb-6 text-xs text-gray-600 dark:text-gray-400">
                  {t('featured.context')}
                </p>

                {/* Technologies - compatte */}
                <div className="mb-6">
                  <h4 className="mb-3 flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                    <span className="text-sm text-accent" aria-hidden="true">
                      ⚙️
                    </span>
                    {t('featured.technologies')}
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {techItems.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/50"
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 text-sm"
                          aria-hidden="true"
                        >
                          {tech.emoji}
                        </span>
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {tech.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External links */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <a
                    href="https://www.lanazione.it/viareggio/cronaca/il-futuro-bussa-a-yachting-7a25f42c"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    📰 {t('featured.links.article')}
                  </a>
                  <a
                    href="https://roboticafestival.it/partecipanti/sarti-magi-leonardo/"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    🤖 {t('featured.links.festival')}
                  </a>
                </div>

                {/* Credits */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('featured.credits')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
