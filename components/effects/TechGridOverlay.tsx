'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

interface TechGridOverlayProps {
  className?: string;
  opacity?: number;
  gridSize?: number;
  animate?: boolean;
  color?: string;
}

/**
 * Reusable tech grid overlay component
 * Creates a subtle grid pattern with optional animation
 * Used to maintain tech aesthetic across sections
 */
export function TechGridOverlay({
  className = '',
  opacity = 0.03,
  gridSize = 60,
  animate = false,
  color = 'rgba(19, 125, 197, 0.3)', // accent color
}: TechGridOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
      animate={
        shouldAnimate
          ? {
              backgroundPosition: ['0px 0px', `${gridSize}px ${gridSize}px`],
            }
          : undefined
      }
      transition={
        shouldAnimate
          ? {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }
          : undefined
      }
      aria-hidden="true"
    />
  );
}

interface GradientOrbProps {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

/**
 * Decorative gradient orb for depth effect
 * Used to add visual interest to sections
 */
export function GradientOrb({
  className = '',
  position = 'top-left',
  size = 'md',
  animate = false,
}: GradientOrbProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const positionClasses = {
    'top-left': '-left-32 -top-32',
    'top-right': '-right-32 -top-32',
    'bottom-left': '-left-32 -bottom-32',
    'bottom-right': '-right-32 -bottom-32',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const sizeClasses = {
    sm: 'h-64 w-64',
    md: 'h-96 w-96',
    lg: 'h-[500px] w-[500px]',
  };

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full bg-accent/10 blur-3xl ${positionClasses[position]} ${sizeClasses[size]} ${className}`}
      animate={
        shouldAnimate
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }
          : undefined
      }
      transition={
        shouldAnimate
          ? {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
      aria-hidden="true"
    />
  );
}
