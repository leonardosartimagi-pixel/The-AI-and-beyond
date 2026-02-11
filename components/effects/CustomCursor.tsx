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

  // Handle hover states via event delegation (single listener, no memory leaks)
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])';

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(interactiveSelector)) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(interactiveSelector)) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);

    return () => {
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
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
          'radial-gradient(circle, rgba(17,119,189,0.18) 0%, rgba(27,47,117,0.08) 40%, transparent 70%)',
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        opacity: isVisible ? 1 : 0,
        boxShadow: isHovering
          ? '0 0 16px rgba(17,119,189,0.35), 0 0 32px rgba(27,47,117,0.15)'
          : '0 0 10px rgba(17,119,189,0.2), 0 0 20px rgba(27,47,117,0.08)',
      }}
      transition={{ duration: 0.2 }}
    />
  );
}
