'use client';

import { motion } from 'framer-motion';
import type { IntensityConfig } from './useAICoreState';

interface AICoreOrbitsProps {
  intensity: IntensityConfig;
  isHovered: boolean;
  size: number;
}

interface OrbitConfig {
  radiusX: number;
  radiusY: number;
  rotation: number;
  speedMultiplier: number;
  opacity: number;
  strokeWidth: number;
  dotCount: number;
}

const ORBITS: OrbitConfig[] = [
  { radiusX: 0.38, radiusY: 0.25, rotation: -15, speedMultiplier: 1, opacity: 0.4, strokeWidth: 1, dotCount: 2 },
  { radiusX: 0.45, radiusY: 0.32, rotation: 45, speedMultiplier: 0.7, opacity: 0.3, strokeWidth: 0.8, dotCount: 3 },
  { radiusX: 0.42, radiusY: 0.28, rotation: -60, speedMultiplier: 1.3, opacity: 0.25, strokeWidth: 0.6, dotCount: 2 },
];

export function AICoreOrbits({ intensity, isHovered, size }: AICoreOrbitsProps) {
  const center = size / 2;

  return (
    <g>
      {ORBITS.map((orbit, index) => {
        const rx = size * orbit.radiusX;
        const ry = size * orbit.radiusY;
        const duration = intensity.orbitSpeed * orbit.speedMultiplier;

        return (
          <motion.g
            key={index}
            style={{ transformOrigin: 'center' }}
            animate={{ rotate: 360 }}
            transition={{
              duration: isHovered ? duration * 0.7 : duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Orbit path (ellipse) */}
            <ellipse
              cx={center}
              cy={center}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="url(#orbitGradient)"
              strokeWidth={orbit.strokeWidth}
              opacity={isHovered ? orbit.opacity + 0.15 : orbit.opacity}
              transform={`rotate(${orbit.rotation} ${center} ${center})`}
              strokeDasharray="4 8"
            />

            {/* Orbit dots */}
            {Array.from({ length: orbit.dotCount }).map((_, dotIndex) => {
              const angle = (360 / orbit.dotCount) * dotIndex;
              const rad = (angle * Math.PI) / 180;
              const rotRad = (orbit.rotation * Math.PI) / 180;

              // Calculate position on rotated ellipse
              const x = rx * Math.cos(rad);
              const y = ry * Math.sin(rad);
              const rotatedX = x * Math.cos(rotRad) - y * Math.sin(rotRad);
              const rotatedY = x * Math.sin(rotRad) + y * Math.cos(rotRad);

              return (
                <motion.circle
                  key={dotIndex}
                  cx={center + rotatedX}
                  cy={center + rotatedY}
                  r={isHovered ? 2.5 : 2}
                  fill="#00aeef"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: dotIndex * 0.3,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: 'center' }}
                />
              );
            })}
          </motion.g>
        );
      })}
    </g>
  );
}
