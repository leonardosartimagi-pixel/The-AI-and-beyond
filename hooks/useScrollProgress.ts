'use client';

import { useState, useEffect, RefObject, useCallback } from 'react';

interface ScrollProgressResult {
  progress: number; // 0-1 based on scroll position within element
  phase: number; // 1-4 for storytelling phases
  isInView: boolean;
}

/**
 * Hook to track scroll progress within a sticky section.
 * Useful for scroll-driven animations and storytelling sections.
 *
 * @param ref - Reference to the section element
 * @param phases - Number of phases to divide the scroll into (default: 4)
 * @returns Object with progress (0-1), phase (1-phases), and isInView
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  phases: number = 4
): ScrollProgressResult {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(1);
  const [isInView, setIsInView] = useState(false);

  const calculateProgress = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;

    // Calculate how much of the element has been scrolled through
    // When element top is at window bottom: progress = 0
    // When element bottom is at window top: progress = 1
    const scrollableHeight = elementHeight - windowHeight;
    const scrolled = windowHeight - rect.top;

    // Clamp progress between 0 and 1
    const newProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    // Check if element is in view
    const inView = rect.top < windowHeight && rect.bottom > 0;

    // Calculate phase (1 to phases)
    // Ensure we have distinct phases with proper thresholds
    const phaseIndex = Math.min(phases - 1, Math.floor(newProgress * phases));
    const newPhase = phaseIndex + 1;

    setProgress(newProgress);
    setPhase(newPhase);
    setIsInView(inView);
  }, [ref, phases]);

  useEffect(() => {
    calculateProgress(); // Initial calculation

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [calculateProgress]);

  return { progress, phase, isInView };
}

/**
 * Hook to track active step in a process/timeline based on scroll position.
 * Optimized for sections with multiple steps.
 *
 * @param ref - Reference to the section element
 * @param totalSteps - Number of steps in the timeline
 * @returns Object with activeStep (0-indexed), progress (0-1), and isInView
 */
export function useActiveStep(
  ref: RefObject<HTMLElement | null>,
  totalSteps: number
): { activeStep: number; progress: number; isInView: boolean } {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const calculateActiveStep = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;

    // Start tracking when section enters viewport (from top 70% of screen)
    const triggerPoint = windowHeight * 0.7;

    // Calculate progress through the section
    // Use elementHeight * 0.5 so all steps illuminate within the first half of the scroll,
    // giving the last step time to stay visible before the section scrolls out
    const sectionProgress = Math.max(
      0,
      Math.min(1, (triggerPoint - rect.top) / (elementHeight * 0.5))
    );

    // Calculate active step (0-indexed)
    const step = Math.min(
      totalSteps - 1,
      Math.floor(sectionProgress * totalSteps)
    );

    // Check if element is in view
    const inView = rect.top < windowHeight && rect.bottom > 0;

    setActiveStep(Math.max(0, step));
    setProgress(sectionProgress);
    setIsInView(inView);
  }, [ref, totalSteps]);

  useEffect(() => {
    calculateActiveStep(); // Initial calculation

    window.addEventListener('scroll', calculateActiveStep, { passive: true });
    window.addEventListener('resize', calculateActiveStep, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateActiveStep);
      window.removeEventListener('resize', calculateActiveStep);
    };
  }, [calculateActiveStep]);

  return { activeStep, progress, isInView };
}
