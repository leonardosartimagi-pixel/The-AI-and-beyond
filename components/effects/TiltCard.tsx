'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  transitionDuration?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  transitionDuration = 0.3,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate rotation based on mouse position
      const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

      setTilt({ rotateX, rotateY });
    },
    [prefersReducedMotion, maxTilt]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovered && !prefersReducedMotion ? scale : 1,
      }}
      transition={{
        duration: transitionDuration,
        ease: 'easeOut',
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: `${perspective}px`,
      }}
    >
      {children}
    </motion.div>
  );
}
