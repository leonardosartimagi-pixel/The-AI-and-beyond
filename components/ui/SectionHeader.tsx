'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { SectionTitleGlitch } from '@/components/effects';
import { createHeadingVariants } from '@/lib/animation-variants';

const DEFAULT_TITLE_CLASS_NAME =
  'mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight text-primary dark:text-gray-100 sm:text-4xl lg:text-5xl';

const DEFAULT_DESCRIPTION_CLASS_NAME =
  'mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400';

export interface SectionHeaderProps {
  label: string;
  title: string;
  titleAccent: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  isInView: boolean;
  children?: React.ReactNode;
}

export function SectionHeader({
  label,
  title,
  titleAccent,
  description,
  className = 'mb-16 text-center lg:mb-20',
  titleClassName = DEFAULT_TITLE_CLASS_NAME,
  descriptionClassName = DEFAULT_DESCRIPTION_CLASS_NAME,
  isInView,
  children,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingVariants = createHeadingVariants(prefersReducedMotion);

  return (
    <motion.div
      className={className}
      variants={headingVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {label}
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
      </span>

      <h2 className={titleClassName}>
        {title}{' '}
        <span className="relative inline-block">
          <SectionTitleGlitch>{titleAccent}</SectionTitleGlitch>
          <span
            className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
            aria-hidden="true"
          />
        </span>
      </h2>

      {description && <p className={descriptionClassName}>{description}</p>}

      {children}
    </motion.div>
  );
}
