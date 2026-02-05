'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { TechGridOverlay, SectionDecorations, AnimatedIcon, ServiceIcons, SectionTitleGlitch } from '@/components/effects';

interface Service {
  id: string;
  key: string;
  icon: React.ReactNode;
}

interface ServicesProps {
  className?: string;
}

const services: Service[] = [
  {
    id: 'consulenza-ai',
    key: 'consulting',
    icon: <div className="h-7 w-7">{ServiceIcons.consulting}</div>,
  },
  {
    id: 'sviluppo-web',
    key: 'webdev',
    icon: <div className="h-7 w-7">{ServiceIcons.webdev}</div>,
  },
  {
    id: 'agenti-ai',
    key: 'agents',
    icon: <div className="h-7 w-7">{ServiceIcons.agents}</div>,
  },
  {
    id: 'prototipi-rapidi',
    key: 'prototypes',
    icon: <div className="h-7 w-7">{ServiceIcons.prototypes}</div>,
  },
  {
    id: 'ottimizzazione-pm',
    key: 'pm',
    icon: <div className="h-7 w-7">{ServiceIcons.pm}</div>,
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  onOpenModal: (service: Service) => void;
  t: ReturnType<typeof useTranslations<'services'>>;
}

function ServiceCard({
  service,
  index,
  isInView,
  prefersReducedMotion,
  onOpenModal,
  t,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!cardRef.current || prefersReducedMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [prefersReducedMotion]
  );

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.article
      className="group relative h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        ref={cardRef}
        type="button"
        onClick={() => onOpenModal(service)}
        onMouseMove={handleMouseMove}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 text-left shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 lg:p-8"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                scale: 1.02,
                boxShadow:
                  '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(19, 125, 197, 0.15)',
              }
        }
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        aria-label={`${t('learnMore')} - ${t(`items.${service.key}.title`)}`}
      >
        {/* Mouse-following glow effect */}
        {!prefersReducedMotion && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 174, 239, 0.12), transparent 40%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Decorative gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* Decorative corner accent */}
        <motion.div
          className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          aria-hidden="true"
        />

        {/* Icon container with gradient matching brand */}
        <motion.div
          className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light text-white shadow-lg"
          animate={{
            y: isHovered && !prefersReducedMotion ? -4 : 0,
            scale: isHovered && !prefersReducedMotion ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedIcon delay={index * 0.15} duration={0.8}>
            {service.icon}
          </AnimatedIcon>
        </motion.div>

        {/* Title */}
        <h3 className="relative mb-3 font-heading text-xl font-bold text-primary dark:text-gray-100 lg:text-2xl">
          {t(`items.${service.key}.title`)}
        </h3>

        {/* Description */}
        <p className="relative mb-4 flex-grow text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {t(`items.${service.key}.description`)}
        </p>

        {/* CTA arrow */}
        <motion.div
          className="relative mt-auto flex items-center gap-2 pt-4 text-sm font-medium text-accent"
          animate={{
            x: isHovered && !prefersReducedMotion ? 4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <span>{t('learnMore')}</span>
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

        {/* Bottom gradient line accent */}
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

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'services'>>;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
}

function ServiceModal({
  service,
  isOpen,
  onClose,
  prefersReducedMotion,
  t,
  tNav,
}: ServiceModalProps) {
  const modalRef = useRef<HTMLElement>(null);
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
      // Stop Lenis smooth scroll to prevent background scrolling
      if (typeof window !== 'undefined') {
        (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis?.stop();
      }
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Restart Lenis smooth scroll
      if (typeof window !== 'undefined') {
        (window as Window & { lenis?: { stop: () => void; start: () => void } }).lenis?.start();
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!service) return null;

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
            <motion.article
              ref={modalRef}
              data-lenis-prevent
              className="relative max-h-[90vh] w-full max-w-lg overflow-auto overscroll-contain rounded-3xl bg-white dark:bg-gray-950 p-8 shadow-2xl dark:shadow-black/30"
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
              aria-labelledby="service-modal-title"
            >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-light text-white shadow-lg">
                {service.icon}
              </div>

              {/* Title */}
              <h2
                id="service-modal-title"
                className="mb-4 font-heading text-2xl font-bold text-primary dark:text-gray-100"
              >
                {t(`items.${service.key}.title`)}
              </h2>

              {/* Short description */}
              <p className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                {t(`items.${service.key}.description`)}
              </p>

              {/* Expanded description */}
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
                {t(`items.${service.key}.expanded`)}
              </p>

              {/* CTA button */}
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
            </motion.article>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Services({ className = '' }: ServicesProps) {
  const t = useTranslations('services');
  const tNav = useTranslations('nav');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
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

  const handleOpenModal = (service: Service) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="servizi"
        className={`relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-24 lg:py-32 ${className}`}
        aria-label={t('label')}
      >
        {/* Tech grid overlay for consistency */}
        <TechGridOverlay opacity={0.02} />

        {/* Decorative neural connections */}
        <SectionDecorations decorations={['flowing1']} opacity={0.4} />

        {/* Decorative gradient blur - top left */}
        <div
          className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl"
          aria-hidden="true"
        />

        {/* Decorative gradient blur - bottom right */}
        <div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
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

          {/* Uniform grid layout - 3 cols on large, 2 on medium, 1 on mobile */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* First row: 3 services */}
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                onOpenModal={handleOpenModal}
                t={t}
              />
            ))}
          </div>

          {/* Second row: 2 services centered */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-2 lg:gap-8 lg:px-[16.666%]">
            {services.slice(3).map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index + 3}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                onOpenModal={handleOpenModal}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service detail modal */}
      <ServiceModal
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={handleCloseModal}
        prefersReducedMotion={prefersReducedMotion}
        t={t}
        tNav={tNav}
      />
    </>
  );
}
