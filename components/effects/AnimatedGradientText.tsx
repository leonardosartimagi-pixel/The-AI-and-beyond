'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
}

/**
 * Text with animated flowing gradient effect
 * Gradient colors flow from left to right continuously
 */
export function AnimatedGradientText({
  children,
  className = '',
  duration = 5,
}: AnimatedGradientTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent',
        'bg-[length:200%_auto]',
        className
      )}
      animate={
        prefersReducedMotion
          ? {}
          : {
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
