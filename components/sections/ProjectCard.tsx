'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { useTranslations } from 'next-intl';
import { EASING } from '@/lib/animation-variants';
import { Badge } from '@/components/ui';
import { PROJECT_MEDIA } from './Portfolio';

interface ProjectCardProps {
  projectKey: string;
  isInView: boolean;
  prefersReducedMotion: boolean;
  onOpenModal: (projectKey: string) => void;
  t: ReturnType<typeof useTranslations<'portfolio'>>;
}

export function ProjectCard({
  projectKey,
  isInView,
  prefersReducedMotion,
  onOpenModal,
  t,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={() => onOpenModal(projectKey)}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-950 dark:focus-visible:ring-offset-gray-900"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                boxShadow:
                  '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(17, 119, 189, 0.2)',
              }
        }
        transition={{ duration: 0.3, ease: EASING }}
        aria-label={`${t('viewDetails')}: ${t(`items.${projectKey}.title`)}`}
      >
        {/* Project Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={PROJECT_MEDIA[projectKey]?.image ?? ''}
            alt={t(`items.${projectKey}.title`)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            quality={80}
          />

          {/* Category badge */}
          <div className="absolute left-4 top-4 z-10">
            <Badge variant="solid" size="sm" animated={false}>
              {t(`items.${projectKey}.category`)}
            </Badge>
          </div>

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
              <span className="text-base font-medium">{t('viewDetails')}</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 font-heading text-base font-bold text-primary dark:text-gray-100">
            {t(`items.${projectKey}.title`)}
          </h3>

          <p className="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {t(`items.${projectKey}.problem`)}
          </p>
        </div>

        {/* Gradient border on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(17,119,189,0.5), rgba(0,174,239,0.3), rgba(17,119,189,0.5))',
            padding: '2px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
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
