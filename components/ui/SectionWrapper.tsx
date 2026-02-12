'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { TechGridOverlay } from '@/components/effects';

const BG_CLASSES = {
  white: 'bg-white dark:bg-gray-950',
  gray: 'bg-gray-50 dark:bg-gray-900',
} as const;

export interface SectionWrapperRenderProps {
  isInView: boolean;
}

export interface SectionWrapperProps {
  id: string;
  ariaLabel?: string;
  className?: string;
  bgVariant?: keyof typeof BG_CLASSES;
  maxWidth?: string;
  decorations?: React.ReactNode;
  /** Optional external ref — when provided, SectionWrapper uses it instead of creating its own */
  sectionRef?: React.RefObject<HTMLElement | null>;
  children: (props: SectionWrapperRenderProps) => React.ReactNode;
}

export function SectionWrapper({
  id,
  ariaLabel,
  className = '',
  bgVariant = 'white',
  maxWidth = 'max-w-7xl',
  decorations,
  sectionRef: externalRef,
  children,
}: SectionWrapperProps) {
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = externalRef ?? internalRef;
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id={id}
      className={`relative overflow-hidden ${BG_CLASSES[bgVariant]} py-24 lg:py-32 ${className}`}
      aria-label={ariaLabel}
    >
      <TechGridOverlay opacity={0.02} />
      {decorations}
      <div className={`relative z-10 mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8`}>
        {children({ isInView })}
      </div>
    </section>
  );
}
