'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Direct motion values — no spring, moves in sync with cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Mark as mounted and detect touch device
  useEffect(() => {
    setIsMounted(true);

    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches
      );
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Handle hover states for interactive elements
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isTouchDevice, prefersReducedMotion]);

  // Main mouse event listeners
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [
    isTouchDevice,
    prefersReducedMotion,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  ]);

  // Add observer for dynamically added elements
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

      interactiveElements.forEach((el) => {
        // Remove existing listeners to prevent duplicates
        el.removeEventListener('mouseenter', () => setIsHovering(true));
        el.removeEventListener('mouseleave', () => setIsHovering(false));
        // Add fresh listeners
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isTouchDevice, prefersReducedMotion]);

  // Don't render until mounted, on touch devices, or if reduced motion is preferred
  if (!isMounted || isTouchDevice || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] h-6 w-6 rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(19,125,197,0.18) 0%, rgba(27,47,117,0.08) 40%, transparent 70%)',
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        opacity: isVisible ? 1 : 0,
        boxShadow: isHovering
          ? '0 0 16px rgba(19,125,197,0.35), 0 0 32px rgba(27,47,117,0.15)'
          : '0 0 10px rgba(19,125,197,0.2), 0 0 20px rgba(27,47,117,0.08)',
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
