'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

interface AnimatedLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function AnimatedLogo({
  className = '',
  width = 200,
  height = 80,
}: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: prefersReducedMotion ? 0 : 1.5,
          ease: 'easeOut',
        },
        opacity: {
          duration: prefersReducedMotion ? 0 : 0.3,
        },
      },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : 1.2,
        duration: prefersReducedMotion ? 0 : 0.5,
      },
    },
  };

  return (
    <motion.svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      aria-label="Logo The AI and beyond - Onda stilizzata"
      role="img"
    >
      <title>The AI and beyond Logo</title>
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1177bd" />
          <stop offset="50%" stopColor="#00aeef" />
          <stop offset="100%" stopColor="#1177bd" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow effect layer */}
      <motion.path
        d="M10 50 C 30 20, 50 20, 70 50 S 110 80, 130 50 S 170 20, 190 50"
        stroke="url(#waveGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
        variants={glowVariants}
        style={{ opacity: 0.5 }}
      />

      {/* Main wave path */}
      <motion.path
        d="M10 50 C 30 20, 50 20, 70 50 S 110 80, 130 50 S 170 20, 190 50"
        stroke="url(#waveGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        variants={pathVariants}
      />

      {/* Secondary smaller wave */}
      <motion.path
        d="M25 55 C 40 35, 55 35, 70 55 S 100 75, 115 55 S 145 35, 160 55"
        stroke="url(#waveGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ opacity: 0.6 }}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 0.6,
            transition: {
              pathLength: {
                duration: prefersReducedMotion ? 0 : 1.2,
                ease: 'easeOut',
                delay: prefersReducedMotion ? 0 : 0.3,
              },
              opacity: {
                duration: prefersReducedMotion ? 0 : 0.3,
                delay: prefersReducedMotion ? 0 : 0.3,
              },
            },
          },
        }}
      />
    </motion.svg>
  );
}
