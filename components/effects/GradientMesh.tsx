'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className = '' }: GradientMeshProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // If user prefers reduced motion, show static gradient
  if (prefersReducedMotion) {
    return (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(19, 125, 197, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0, 174, 239, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(27, 47, 117, 0.5) 0%, transparent 70%),
            linear-gradient(135deg, rgba(27, 47, 117, 1) 0%, rgba(21, 31, 79, 1) 100%)
          `,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(27, 47, 117, 1) 0%, rgba(21, 31, 79, 1) 100%)',
        }}
      />

      {/* Animated mesh gradient orbs — on mobile only 2 primary orbs with reduced blur */}
      <motion.div
        className="absolute h-[800px] w-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(19, 125, 197, 0.5) 0%, transparent 70%)',
          filter: isMobile ? 'blur(40px)' : 'blur(60px)',
          left: '-10%',
          top: '-20%',
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 174, 239, 0.4) 0%, transparent 70%)',
          filter: isMobile ? 'blur(40px)' : 'blur(50px)',
          right: '-5%',
          bottom: '-15%',
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, -60, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Secondary orbs — hidden on mobile to reduce GPU load */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute h-[500px] w-[500px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(19, 125, 197, 0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
              right: '20%',
              top: '10%',
            }}
            animate={{
              x: [0, -50, 30, 0],
              y: [0, 80, 40, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
          />

          <motion.div
            className="absolute h-[400px] w-[400px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0, 174, 239, 0.25) 0%, transparent 70%)',
              filter: 'blur(30px)',
              left: '30%',
              bottom: '5%',
            }}
            animate={{
              x: [0, 60, -30, 0],
              y: [0, -50, 20, 0],
              scale: [1, 0.85, 1.1, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
