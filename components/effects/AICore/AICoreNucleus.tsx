'use client';

import { motion } from 'framer-motion';
import type { IntensityConfig } from './useAICoreState';

interface AICoreNucleusProps {
  intensity: IntensityConfig;
  isHovered: boolean;
  size: number;
}

export function AICoreNucleus({ intensity, isHovered, size }: AICoreNucleusProps) {
  const nucleusSize = size * 0.35; // 35% of total size
  const glowSize = size * 0.5;

  return (
    <g>
      {/* Outer glow */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={glowSize / 2}
        fill="url(#nucleusGlow)"
        animate={{
          opacity: isHovered ? intensity.glowOpacity + 0.2 : intensity.glowOpacity,
          scale: isHovered ? 1.15 : [1, 1.08, 1],
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: isHovered
            ? { duration: 0.3 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Middle glow layer */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={nucleusSize * 0.8}
        fill="url(#nucleusGlowInner)"
        animate={{
          scale: [1, intensity.pulseScale, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Core nucleus */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={nucleusSize / 2}
        fill="url(#nucleusCore)"
        animate={{
          scale: isHovered ? 1.1 : [1, intensity.pulseScale, 1],
        }}
        transition={{
          scale: isHovered
            ? { duration: 0.2 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Inner bright spot */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={nucleusSize * 0.15}
        fill="#ffffff"
        opacity={0.9}
        animate={{
          opacity: [0.7, 0.95, 0.7],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: 'center' }}
      />
    </g>
  );
}
