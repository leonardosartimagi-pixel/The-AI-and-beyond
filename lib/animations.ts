import type { Variants, Transition } from 'framer-motion';

// GPU-optimized easing curve for smooth 60fps animations
const gpuEase = [0.25, 0.46, 0.45, 0.94];

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// GPU-optimized default transition
export const defaultTransition: Transition = {
  duration: 0.4,
  ease: gpuEase,
};

// GPU-optimized spring transition for interactive elements
export const springTransition: Transition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

// Fast transition for micro-interactions (hover states, etc.)
export const fastTransition: Transition = {
  duration: 0.2,
  ease: gpuEase,
};

// Reduced motion transition (instant)
export const reducedMotionTransition: Transition = {
  duration: 0,
};

// Helper to get appropriate transition based on reduced motion preference
export const getTransition = (prefersReducedMotion: boolean): Transition =>
  prefersReducedMotion ? reducedMotionTransition : defaultTransition;
