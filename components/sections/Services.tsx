'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import {
  SectionDecorations,
  AnimatedIcon,
  ServiceIcons,
} from '@/components/effects';
import { SectionHeader, SectionWrapper } from '@/components/ui';
import {
  EASING,
  createHeadingVariants,
  createCardVariants,
} from '@/lib/animation-variants';
import { ServiceModal } from './ServiceModal';

export interface Service {
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

  const cardVariants = createCardVariants(prefersReducedMotion, index, {
    scale: 0.95,
  });

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
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-offset-gray-900 lg:p-8"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                scale: 1.02,
                boxShadow:
                  '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(17, 119, 189, 0.15)',
              }
        }
        transition={{
          duration: 0.3,
          ease: EASING,
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

export function Services({ className = '' }: ServicesProps) {
  const t = useTranslations('services');
  const tNav = useTranslations('nav');
  const prefersReducedMotion = useReducedMotion();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const headingVariants = createHeadingVariants(prefersReducedMotion);

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
      <SectionWrapper
        id="servizi"
        ariaLabel={t('label')}
        bgVariant="gray"
        className={className}
        decorations={
          <>
            <SectionDecorations decorations={['flowing1']} opacity={0.4} />
            <div
              className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
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

            {/* Bridge narrative */}
            <motion.p
              className="mx-auto mt-16 max-w-2xl text-center text-lg italic text-gray-500 dark:text-gray-400"
              variants={headingVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {t('bridge')}
            </motion.p>
          </>
        )}
      </SectionWrapper>

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
