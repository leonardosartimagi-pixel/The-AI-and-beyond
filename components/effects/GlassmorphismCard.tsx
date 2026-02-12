'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASING } from '@/lib/animation-variants';

interface GlassmorphismCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'subtle' | 'strong';
  gradientBorder?: boolean;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export function GlassmorphismCard({
  variant = 'default',
  gradientBorder = false,
  hoverEffect = true,
  children,
  className,
  ...props
}: GlassmorphismCardProps) {
  const baseStyles = 'rounded-2xl overflow-hidden';

  const variantStyles = {
    default: 'glass',
    subtle: 'glass-subtle',
    strong: 'glass-strong',
  };

  const gradientBorderStyles = gradientBorder ? 'glass-gradient-border' : '';

  return (
    <motion.div
      className={cn(
        baseStyles,
        variantStyles[variant],
        gradientBorderStyles,
        className
      )}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              boxShadow:
                '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(17, 119, 189, 0.15)',
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: EASING }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
