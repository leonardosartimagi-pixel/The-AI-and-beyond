'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

interface CountUpNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

export function CountUpNumber({
  value,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  onComplete,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    duration: prefersReducedMotion ? 0 : duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals);
    }
    return Math.round(latest).toString();
  });

  const [displayText, setDisplayText] = useState(
    prefersReducedMotion ? value.toFixed(decimals) : '0'
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      if (prefersReducedMotion) {
        setDisplayText(decimals > 0 ? value.toFixed(decimals) : value.toString());
        onComplete?.();
        return;
      }

      const timeout = setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, hasAnimated, value, delay, springValue, prefersReducedMotion, decimals, onComplete]);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplayText(latest);

      // Check if animation completed
      if (parseFloat(latest) >= value - 0.1) {
        onComplete?.();
      }
    });

    return () => unsubscribe();
  }, [displayValue, value, onComplete]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay }}
    >
      {prefix}
      {displayText}
      {suffix}
    </motion.span>
  );
}
