'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface NavGlitchProps {
  children: string;
  className?: string;
}

export function NavGlitch({ children, className = '' }: NavGlitchProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main text - always visible */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers - only on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Cyan/accent layer - offset right */}
            <motion.span
              className="pointer-events-none absolute left-0 top-0 z-0 text-accent-light"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.8, 0, 0.5, 0.7, 0],
                x: [0, 2, -1, 1.5, -0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              {children}
            </motion.span>

            {/* Red/magenta layer - offset left */}
            <motion.span
              className="pointer-events-none absolute left-0 top-0 z-0 text-red-500/70"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.4, 0, 0.3, 0.2, 0],
                x: [0, -1.5, 1, -1, 0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.02 }}
              aria-hidden="true"
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}
