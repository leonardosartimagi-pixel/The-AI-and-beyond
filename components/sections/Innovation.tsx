'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { TechGridOverlay, SectionTitleGlitch } from '@/components/effects';
import {
  createContainerVariants,
  createItemVariants,
} from '@/lib/animation-variants';

interface InnovationProps {
  className?: string;
}

export function Innovation({ className = '' }: InnovationProps) {
  const t = useTranslations('innovation');
  const tNav = useTranslations('nav');
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
      className={`relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900/50 lg:py-32 ${className}`}
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
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
        >
          <motion.div
            variants={textVariants}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <span className="text-xl" aria-hidden="true">
              ✨
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t('label')}
            </span>
          </motion.div>

          <motion.h2
            variants={textVariants}
            className="mb-6 font-heading text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            {t('title')} <span className="text-accent">{t('titleAccent')}</span>
          </motion.h2>

          <motion.p
            variants={textVariants}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Featured project card */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-900 lg:grid lg:grid-cols-2 lg:gap-8">
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

            {/* Content section */}
            <motion.div
              variants={textVariants}
              className="flex flex-col justify-between p-8 lg:p-12"
            >
              <div>
                <h3 className="mb-3 font-heading text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                  {t('featured.title')}
                </h3>
                <p className="mb-6 text-lg font-medium text-accent">
                  {t('featured.subtitle')}
                </p>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  {t('featured.description')}
                </p>
                <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
                  {t('featured.context')}
                </p>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="mb-4 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
                    <span className="text-base text-accent" aria-hidden="true">
                      ⚙️
                    </span>
                    {t('featured.technologies')}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {techItems.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
                      >
                        <span
                          className="mt-0.5 flex-shrink-0 text-base"
                          aria-hidden="true"
                        >
                          {tech.emoji}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {tech.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-8 rounded-lg border-l-4 border-accent bg-accent/5 p-4 dark:bg-accent/10">
                  <h4 className="mb-2 font-heading text-sm font-semibold text-gray-900 dark:text-white">
                    {t('featured.impact')}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {t('featured.impactText')}
                  </p>
                </div>

                {/* External links */}
                <div className="mb-6 flex flex-wrap gap-3">
                  <a
                    href="https://www.lanazione.it/viareggio/cronaca/il-futuro-bussa-a-yachting-7a25f42c"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    📰 {t('featured.links.article')}
                  </a>
                  <a
                    href="https://roboticafestival.it/partecipanti/sarti-magi-leonardo/"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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

        {/* CTA section */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto mt-16 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:mt-20 lg:p-12"
        >
          <h3 className="mb-4 font-heading text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
            {t('cta.title')}
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {t('cta.description')}
          </p>
          <Link
            href="#contatti"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-accent/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {t('cta.button')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
