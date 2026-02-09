'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { TechGridOverlay, SectionTitleGlitch } from '@/components/effects';

interface FAQProps {
  className?: string;
}

const FAQ_KEYS = ['ai-fit', 'timeline', 'cost', 'process'] as const;

interface FAQItemProps {
  faqKey: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'faq'>>;
}

function FAQItem({
  faqKey,
  index,
  isOpen,
  onToggle,
  prefersReducedMotion,
  t,
}: FAQItemProps) {
  return (
    <motion.div
      className="border-b border-gray-200 dark:border-gray-800"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-lg font-medium text-primary dark:text-gray-100">
          {t(`items.${faqKey}.question`)}
        </span>
        <motion.span
          className="flex-shrink-0 text-accent"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-gray-600 dark:text-gray-400 leading-relaxed">
              {t(`items.${faqKey}.answer`)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ({ className = '' }: FAQProps) {
  const t = useTranslations('faq');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema.org JSON-LD
  const faqSchemaItems = FAQ_KEYS.map((key) => ({
    '@type': 'Question',
    name: t(`items.${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`items.${key}.answer`),
    },
  }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSchemaItems,
  };

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
        ref={sectionRef}
        id="faq"
        className={`relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-24 lg:py-32 ${className}`}
        aria-label={t('label')}
      >
        <TechGridOverlay opacity={0.02} />

        {/* Decorative blurs */}
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="mb-12 text-center lg:mb-16"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {t('label')}
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
            </span>

            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight text-primary dark:text-gray-100 sm:text-4xl lg:text-5xl">
              {t('title')}{' '}
              <span className="relative inline-block">
                <SectionTitleGlitch>{t('titleAccent')}</SectionTitleGlitch>
                <span
                  className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
              {t('description')}
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 lg:p-8 shadow-sm">
            {FAQ_KEYS.map((key, index) => (
              <FAQItem
                key={key}
                faqKey={key}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                prefersReducedMotion={prefersReducedMotion}
                t={t}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.p
            className="mt-8 text-center text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            {t('cta')}{' '}
            <a
              href="#contatti"
              className="font-medium text-accent hover:text-accent-dark transition-colors underline underline-offset-4"
            >
              {t('ctaLink')}
            </a>
          </motion.p>
        </div>
      </section>
    </>
  );
}
