'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium transition-colors duration-200',
    'rounded-full',
  ],
  {
    variants: {
      variant: {
        default: 'bg-accent/20 text-accent',
        primary: 'bg-primary/20 text-primary',
        secondary: 'bg-white/20 text-white',
        outline: 'border border-accent text-accent bg-transparent',
        solid: 'bg-accent text-primary-dark',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  animated?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, animated = true, ...props }, ref) => {
    if (animated) {
      return (
        <motion.span
          ref={ref}
          className={cn(badgeVariants({ variant, size, className }))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...(props as HTMLMotionProps<'span'>)}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
