'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { IntensityConfig } from './useAICoreState';

interface AICoreParticlesProps {
  intensity: IntensityConfig;
  isHovered: boolean;
  size: number;
}

interface Particle {
  id: number;
  radius: number;
  angle: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = ['#ffffff', '#00aeef', '#1177bd', '#ffffff'];

export function AICoreParticles({
  intensity,
  isHovered,
  size,
}: AICoreParticlesProps) {
  const center = size / 2;

  // Generate random particles
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      radius: size * (0.25 + Math.random() * 0.2), // 25-45% of size
      angle: (360 / 8) * i + Math.random() * 30,
      size: 1.5 + Math.random() * 2, // 1.5-3.5px
      duration: 8 + Math.random() * 6, // 8-14s
      delay: Math.random() * 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#ffffff',
    }));
  }, [size]);

  return (
    <g>
      {particles.map((particle) => {
        const adjustedDuration =
          (particle.duration / 10) * intensity.particleSpeed;

        return (
          <motion.g
            key={particle.id}
            style={{ transformOrigin: `${center}px ${center}px` }}
            animate={{ rotate: 360 }}
            transition={{
              duration: isHovered ? adjustedDuration * 0.6 : adjustedDuration,
              repeat: Infinity,
              ease: 'linear',
              delay: particle.delay,
            }}
          >
            <motion.circle
              cx={
                center +
                particle.radius * Math.cos((particle.angle * Math.PI) / 180)
              }
              cy={
                center +
                particle.radius * Math.sin((particle.angle * Math.PI) / 180)
              }
              r={isHovered ? particle.size * 1.3 : particle.size}
              fill={particle.color}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: 'center' }}
            />
          </motion.g>
        );
      })}
    </g>
  );
}
