'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface DynamicHighlightProps {
  children: React.ReactNode;
  className?: string;
  /** Color of the highlight (Tailwind class without 'bg-') */
  color?: string;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Height of the highlight line */
  height?: string;
  /** Whether to trigger animation only once */
  once?: boolean;
}

/**
 * Text with animated underline/highlight that draws when entering viewport
 * Creates a marker/highlighter effect on keywords
 */
export function DynamicHighlight({
  children,
  className = '',
  color = 'accent',
  delay = 0.3,
  height = '0.2em',
  once = true,
}: DynamicHighlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      {children}
      <motion.span
        className={cn('absolute bottom-0 left-0 rounded-full', `bg-${color}`)}
        style={{ height }}
        initial={{ width: 0 }}
        animate={{
          width: isInView && !prefersReducedMotion ? '100%' : 0,
        }}
        transition={{
          duration: 0.6,
          delay: prefersReducedMotion ? 0 : delay,
          ease: 'easeOut',
        }}
        aria-hidden="true"
      />
    </span>
  );
}
