'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { Badge } from '@/components/ui';
import { TechGridOverlay, SectionDecorations, ProjectMockup, SectionTitleGlitch } from '@/components/effects';

interface PortfolioProps {
  className?: string;
}

const PROJECT_KEYS = ['eswbs', 'maintenance', 'healthcare', 'email', 'rag'] as const;
type ProjectKey = (typeof PROJECT_KEYS)[number];

// Bento grid position configurations
const BENTO_POSITIONS = {
  featured: 'col-span-2 row-span-2',
  tall: 'col-span-1 row-span-2',
  wide: 'col-span-2 row-span-1',
  standard: 'col-span-1 row-span-1',
} as const;

// Bento Project Card Component
interface BentoCardProps {
  projectKey: ProjectKey;
  isFeatured: boolean;
  isInView: boolean;
  prefersReducedMotion: boolean;
  onOpenModal: (projectKey: string) => void;
  onSetFeatured: (projectKey: ProjectKey) => void;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
}

function BentoCard({
  projectKey,
  isFeatured,
  isInView,
  prefersReducedMotion,
  onOpenModal,
  onSetFeatured,
  t,
}: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const technologies = t.raw(`items.${projectKey}.technologies`) as string[];

  const handleClick = () => {
    if (isFeatured) {
      onOpenModal(projectKey);
    } else {
      onSetFeatured(projectKey);
    }
  };

  return (
    <motion.article
      layout
      layoutId={`bento-card-${projectKey}`}
      className={`group relative ${isFeatured ? BENTO_POSITIONS.featured : BENTO_POSITIONS.standard}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        layout: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 text-left shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                boxShadow:
                  '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(19, 125, 197, 0.2)',
              }
        }
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-label={isFeatured ? `${t('viewDetails')}: ${t(`items.${projectKey}.title`)}` : `${t(`items.${projectKey}.title`)} - Click to expand`}
      >
        {/* Project Mockup */}
        <div className={`relative w-full overflow-hidden ${isFeatured ? 'aspect-[16/9] lg:aspect-[2/1]' : 'aspect-video'}`}>
          <ProjectMockup
            category={t(`items.${projectKey}.category`)}
            projectKey={projectKey}
            isFeatured={isFeatured}
          />

          {/* Category badge */}
          <div className="absolute left-4 top-4 z-10">
            <Badge variant="solid" size={isFeatured ? 'md' : 'sm'} animated={false}>
              {t(`items.${projectKey}.category`)}
            </Badge>
          </div>

          {/* Featured indicator */}
          {isFeatured && (
            <div className="absolute right-4 top-4 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-primary/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className={`font-medium ${isFeatured ? 'text-xl' : 'text-base'}`}>
                {isFeatured ? t('viewDetails') : 'Click to expand'}
              </span>
              <svg className={`${isFeatured ? 'h-6 w-6' : 'h-5 w-5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isFeatured ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                )}
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className={`flex flex-1 flex-col ${isFeatured ? 'p-6 lg:p-8' : 'p-4'}`}>
          <h3 className={`mb-2 font-heading font-bold text-primary dark:text-gray-100 ${isFeatured ? 'text-xl lg:text-2xl' : 'text-base'}`}>
            {t(`items.${projectKey}.title`)}
          </h3>

          <p className={`mb-4 flex-grow leading-relaxed text-gray-600 dark:text-gray-400 ${isFeatured ? 'text-base lg:text-lg line-clamp-3' : 'text-sm line-clamp-2'}`}>
            {t(`items.${projectKey}.problem`)}
          </p>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, isFeatured ? 5 : 2).map((tech) => (
              <Badge key={tech} variant="default" size="sm" animated={false}>
                {tech}
              </Badge>
            ))}
            {technologies.length > (isFeatured ? 5 : 2) && (
              <Badge variant="outline" size="sm" animated={false}>
                +{technologies.length - (isFeatured ? 5 : 2)}
              </Badge>
            )}
          </div>
        </div>

        {/* Gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(19,125,197,0.5), rgba(0,174,239,0.3), rgba(19,125,197,0.5))',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      </motion.button>
    </motion.article>
  );
}

// Modal Component
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
      if (typeof window !== 'undefined') {
        (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis?.stop();
      }
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis?.start();
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!projectKey) return null;

  const technologies = t.raw(`items.${projectKey}.technologies`) as string[];
  const results = t.raw(`items.${projectKey}.results`) as string[];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              data-lenis-prevent
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto overscroll-contain rounded-3xl bg-white dark:bg-gray-950 shadow-2xl dark:shadow-black/30"
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
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-500 dark:text-gray-400 shadow-md backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={t('close')}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
                <ProjectMockup
                  category={t(`items.${projectKey}.category`)}
                  projectKey={projectKey}
                  isFeatured={true}
                />
                <div className="absolute left-6 top-6 z-10">
                  <Badge variant="solid" size="md" animated={false}>
                    {t(`items.${projectKey}.category`)}
                  </Badge>
                </div>
              </div>

              <div className="p-8">
                <h2 id="modal-title" className="mb-2 font-heading text-2xl font-bold text-primary sm:text-3xl">
                  {t(`items.${projectKey}.title`)}
                </h2>

                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    {t('problem')}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{t(`items.${projectKey}.problem`)}</p>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    {t('solution')}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{t(`items.${projectKey}.solution`)}</p>
                </div>

                <div className="mb-8">
                  <h3 className="mb-3 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    {t('results')}
                  </h3>
                  <ul className="space-y-2">
                    {results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

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

                <a
                  href="#contatti"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>{tNav('cta')}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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

// Main Portfolio Component with Bento Grid Layout
export function Portfolio({ className = '' }: PortfolioProps) {
  const t = useTranslations('portfolio');
  const tNav = useTranslations('nav');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(null);
  const [featuredProject, setFeaturedProject] = useState<ProjectKey>(PROJECT_KEYS[0]);
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
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  };

  const handleSetFeatured = (projectKey: ProjectKey) => {
    setFeaturedProject(projectKey);
  };

  // Reorder projects: featured first, then others
  const orderedProjects = [
    featuredProject,
    ...PROJECT_KEYS.filter((key) => key !== featuredProject),
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className={`relative overflow-hidden bg-white dark:bg-gray-950 py-24 lg:py-32 ${className}`}
        aria-label={t('label')}
      >
        <TechGridOverlay opacity={0.02} />

        {/* Decorative neural connections */}
        <SectionDecorations decorations={['rightSide']} opacity={0.4} />

        <div
          className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />
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

          {/* Bento Grid Layout */}
          <LayoutGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6">
              {orderedProjects.map((key) => (
                <BentoCard
                  key={key}
                  projectKey={key}
                  isFeatured={key === featuredProject}
                  isInView={isInView}
                  prefersReducedMotion={prefersReducedMotion}
                  onOpenModal={handleOpenModal}
                  onSetFeatured={handleSetFeatured}
                  t={t}
                />
              ))}
            </div>
          </LayoutGroup>

          {/* Interaction hint */}
          <motion.p
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            {t('hint') || 'Click on a project to expand it'}
          </motion.p>
        </div>
      </section>

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
