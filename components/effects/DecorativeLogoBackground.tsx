'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks';

interface DecorativeLogoBackgroundProps {
  className?: string;
}

export function DecorativeLogoBackground({ className = '' }: DecorativeLogoBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        right: '-5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50%',
        height: '50%',
        opacity: 0.03,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              scale: [1, 1.05, 1],
              filter: [
                'drop-shadow(0 0 30px rgba(0, 188, 212, 0.3))',
                'drop-shadow(0 0 60px rgba(0, 188, 212, 0.6))',
                'drop-shadow(0 0 30px rgba(0, 188, 212, 0.3))',
              ],
            }
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden="true"
    >
      <Image
        src="/images/logo.png"
        alt=""
        fill
        className="object-contain"
        priority={false}
        sizes="50vw"
      />
    </motion.div>
  );
}
