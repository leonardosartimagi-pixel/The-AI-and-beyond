import type { Variants } from 'framer-motion';

/**
 * Shared easing curve used across all animations.
 * Custom cubic-bezier providing smooth deceleration.
 */
export const EASING: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

/**
 * Standard section heading animation: fade up from y offset.
 * Identical pattern used in 7+ section components.
 */
export function createHeadingVariants(prefersReducedMotion: boolean): Variants {
  return {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: EASING,
      },
    },
  };
}

interface ContainerVariantsOptions {
  staggerChildren?: number;
  delayChildren?: number;
  duration?: number;
}

/**
 * Container with stagger children orchestration.
 * Parent controls timing; children animate via their own variants.
 */
export function createContainerVariants(
  prefersReducedMotion: boolean,
  options?: ContainerVariantsOptions
): Variants {
  const { staggerChildren = 0.15, delayChildren, duration } = options ?? {};

  const transition: Record<string, number> = {
    staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
  };
  if (delayChildren !== undefined) {
    transition.delayChildren = prefersReducedMotion ? 0 : delayChildren;
  }
  if (duration !== undefined) {
    transition.duration = prefersReducedMotion ? 0 : duration;
  }

  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition },
  };
}

interface ItemVariantsOptions {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
}

/**
 * Generic item animation: fade in with optional translate/scale.
 * Used for items within stagger containers and standalone elements.
 */
export function createItemVariants(
  prefersReducedMotion: boolean,
  options?: ItemVariantsOptions
): Variants {
  const { y, x, scale, duration = 0.6, delay } = options ?? {};

  return {
    hidden: {
      opacity: 0,
      ...(y !== undefined ? { y: prefersReducedMotion ? 0 : y } : {}),
      ...(x !== undefined ? { x: prefersReducedMotion ? 0 : x } : {}),
      ...(scale !== undefined
        ? { scale: prefersReducedMotion ? 1 : scale }
        : {}),
    },
    visible: {
      opacity: 1,
      ...(y !== undefined ? { y: 0 } : {}),
      ...(x !== undefined ? { x: 0 } : {}),
      ...(scale !== undefined ? { scale: 1 } : {}),
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        ease: EASING,
        ...(delay !== undefined
          ? { delay: prefersReducedMotion ? 0 : delay }
          : {}),
      },
    },
  };
}

interface CardVariantsOptions {
  y?: number;
  scale?: number;
  duration?: number;
  delayMultiplier?: number;
}

/**
 * Card animation with index-based stagger delay.
 * Used for grid items that appear one after another.
 */
export function createCardVariants(
  prefersReducedMotion: boolean,
  index: number,
  options?: CardVariantsOptions
): Variants {
  const {
    y = 30,
    scale,
    duration = 0.5,
    delayMultiplier = 0.1,
  } = options ?? {};

  return {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : y,
      ...(scale !== undefined
        ? { scale: prefersReducedMotion ? 1 : scale }
        : {}),
    },
    visible: {
      opacity: 1,
      y: 0,
      ...(scale !== undefined ? { scale: 1 } : {}),
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : index * delayMultiplier,
        ease: EASING,
      },
    },
  };
}

interface ModalAnimationOptions {
  scale?: number;
  y?: number;
  duration?: number;
}

/**
 * Modal enter/exit animation props.
 * Returns initial/animate/exit/transition for spread onto motion components.
 */
export function createModalAnimation(
  prefersReducedMotion: boolean,
  options?: ModalAnimationOptions
) {
  const { scale = 0.9, y = 20, duration = 0.4 } = options ?? {};

  return {
    initial: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : scale,
      y: prefersReducedMotion ? 0 : y,
    },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : scale,
      y: prefersReducedMotion ? 0 : y,
    },
    transition: {
      duration: prefersReducedMotion ? 0 : duration,
      ease: EASING,
    },
  };
}
