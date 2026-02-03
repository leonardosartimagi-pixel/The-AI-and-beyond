'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { Badge } from '@/components/ui';
import { TechGridOverlay } from '@/components/effects';

interface Project {
  id: string;
  key: string;
  imageUrl: string;
}

interface PortfolioProps {
  className?: string;
}

const PROJECT_KEYS = ['eswbs', 'maintenance', 'healthcare', 'email', 'rag'] as const;

interface PortfolioCardProps {
  projectKey: string;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  onOpenModal: (projectKey: string) => void;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
}

function PortfolioCard({
  projectKey,
  index,
  isInView,
  prefersReducedMotion,
  onOpenModal,
  t,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const technologies = t.raw(`items.${projectKey}.technologies`) as string[];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.article
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={() => onOpenModal(projectKey)}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                scale: 1.02,
                boxShadow:
                  '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(0, 188, 212, 0.15)',
              }
        }
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        aria-label={`${t('viewDetails')}: ${t(`items.${projectKey}.title`)}`}
      >
        {/* Image placeholder */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
          {/* Placeholder pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          {/* Category badge overlay */}
          <div className="absolute left-4 top-4">
            <Badge variant="solid" size="sm" animated={false}>
              {t(`items.${projectKey}.category`)}
            </Badge>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-primary/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <motion.div
              className="flex items-center gap-2 text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="text-sm font-medium">{t('viewDetails')}</span>
              <svg
                className="h-4 w-4"
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
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3 className="mb-2 font-heading text-xl font-bold text-primary">
            {t(`items.${projectKey}.title`)}
          </h3>

          {/* Description */}
          <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
            {t(`items.${projectKey}.problem`)}
          </p>

          {/* Technology badges preview */}
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="default"
                size="sm"
                animated={false}
              >
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="outline" size="sm" animated={false}>
                +{technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent-light"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          aria-hidden="true"
        />
      </motion.button>
    </motion.article>
  );
}

interface PortfolioModalProps {
  projectKey: string | null;
  isOpen: boolean;
  onClose: () => void;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
}

function PortfolioModal({
  projectKey,
  isOpen,
  onClose,
  prefersReducedMotion,
  t,
  tNav,
}: PortfolioModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!projectKey) return null;

  const technologies = t.raw(`items.${projectKey}.technologies`) as string[];
  const results = t.raw(`items.${projectKey}.results`) as string[];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white shadow-2xl"
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.9,
                y: prefersReducedMotion ? 0 : 20,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.9,
                y: prefersReducedMotion ? 0 : 20,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={t('close')}
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image header */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute left-6 top-6">
                  <Badge variant="solid" size="md" animated={false}>
                    {t(`items.${projectKey}.category`)}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title */}
                <h2
                  id="modal-title"
                  className="mb-2 font-heading text-2xl font-bold text-primary sm:text-3xl"
                >
                  {t(`items.${projectKey}.title`)}
                </h2>

                {/* Problem section */}
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
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
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                    {t('problem')}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {t(`items.${projectKey}.problem`)}
                  </p>
                </div>

                {/* Solution section */}
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
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
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                      />
                    </svg>
                    {t('solution')}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {t(`items.${projectKey}.solution`)}
                  </p>
                </div>

                {/* Results section */}
                <div className="mb-8">
                  <h3 className="mb-3 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
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
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                    {t('results')}
                  </h3>
                  <ul className="space-y-2">
                    {results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-gray-500">
                    {t('technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Badge key={tech} variant="primary" size="md" animated={false}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contatti"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>{tNav('cta')}</span>
                  <svg
                    className="h-4 w-4"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Portfolio({ className = '' }: PortfolioProps) {
  const t = useTranslations('portfolio');
  const tNav = useTranslations('nav');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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

  const handleOpenModal = (projectKey: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelectedProjectKey(projectKey);
  };

  const handleCloseModal = () => {
    setSelectedProjectKey(null);
    // Restore focus to trigger element
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className={`relative overflow-hidden bg-white py-24 lg:py-32 ${className}`}
        aria-label={t('label')}
      >
        {/* Tech grid overlay for consistency */}
        <TechGridOverlay opacity={0.02} />

        {/* Decorative gradient blur - top right */}
        <div
          className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />

        {/* Decorative gradient blur - bottom left */}
        <div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
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

          {/* Responsive grid - 2 cols desktop, 1 mobile */}
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {PROJECT_KEYS.map((key, index) => (
              <PortfolioCard
                key={key}
                projectKey={key}
                index={index}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                onOpenModal={handleOpenModal}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio detail modal */}
      <PortfolioModal
        projectKey={selectedProjectKey}
        isOpen={selectedProjectKey !== null}
        onClose={handleCloseModal}
        prefersReducedMotion={prefersReducedMotion}
        t={t}
        tNav={tNav}
      />
    </>
  );
}
