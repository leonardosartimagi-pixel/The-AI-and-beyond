'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { SectionHeader, SectionWrapper } from '@/components/ui';
import { EASING } from '@/lib/animation-variants';

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
        id={`faq-question-${faqKey}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faqKey}`}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faqKey}`}
            role="region"
            aria-labelledby={`faq-question-${faqKey}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: EASING,
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 leading-relaxed text-gray-600 dark:text-gray-400">
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
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SectionWrapper
        id="faq"
        ariaLabel={t('label')}
        bgVariant="gray"
        maxWidth="max-w-3xl"
        className={className}
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
              className="mb-12 text-center lg:mb-16"
              isInView={isInView}
            />

            {/* FAQ Accordion */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 lg:p-8">
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
                className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-dark"
              >
                {t('ctaLink')}
              </a>
            </motion.p>
          </>
        )}
      </SectionWrapper>
    </>
  );
}
