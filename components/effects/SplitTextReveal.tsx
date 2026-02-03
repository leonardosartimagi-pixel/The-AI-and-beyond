'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Time between each character (in seconds) */
  staggerDelay?: number;
  /** Whether to trigger animation only once */
  once?: boolean;
}

/**
 * Text that reveals character by character with staggered animation
 * Uses useInView to trigger when element enters viewport
 */
export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: SplitTextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  // If reduced motion, just show the text
  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const characters = text.split('');

  return (
    <span ref={ref} className={cn('inline-block', className)} aria-label={text}>
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.3,
            delay: delay + index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
