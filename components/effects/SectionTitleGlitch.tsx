'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface SectionTitleGlitchProps {
  children: string;
  className?: string;
  /** Accent color for the glitch effect title accent part */
  accentClassName?: string;
  /** Delay before the glitch animation starts (in seconds) */
  delay?: number;
}

export function SectionTitleGlitch({
  children,
  className = '',
  accentClassName = '',
  delay = 0,
}: SectionTitleGlitchProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, delay]);

  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={cn('relative inline-block', className)}>
        {children}
      </span>
    );
  }

  const shouldAnimate = isInView && hasAnimated;

  return (
    <span
      ref={ref}
      className={cn('relative inline-block', className, accentClassName)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers - only animate once when in view */}
      {shouldAnimate && (
        <>
          {/* Cyan/accent layer - offset right */}
          <motion.span
            className="pointer-events-none absolute left-0 top-0 z-0 text-accent-light"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0, 0.9, 0, 0.6, 0.8, 0.4, 0],
              x: [0, 3, -1, 2, -0.5, 1, 0],
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>

          {/* Red/magenta layer - offset left */}
          <motion.span
            className="pointer-events-none absolute left-0 top-0 z-0 text-red-500/70"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: [0, 0.5, 0, 0.4, 0.3, 0.2, 0],
              x: [0, -2, 1.5, -1.5, 1, -0.5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
              delay: 0.03,
              times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1],
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  );
}
