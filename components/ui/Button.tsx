'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-accent text-primary-dark',
          'hover:bg-accent-dark',
          'focus-visible:ring-accent',
        ],
        secondary: [
          'bg-primary text-white',
          'hover:bg-primary-dark',
          'focus-visible:ring-primary',
        ],
        outline: [
          'border-2 border-accent text-accent bg-transparent',
          'hover:bg-accent hover:text-primary-dark',
          'focus-visible:ring-accent',
        ],
        ghost: [
          'text-primary bg-transparent',
          'hover:bg-primary/10',
          'focus-visible:ring-primary',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-md',
        md: 'h-11 px-6 text-base rounded-lg',
        lg: 'h-14 px-8 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        aria-busy={isLoading}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </motion.button>
    );
  }
);

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

Button.displayName = 'Button';

export { Button, buttonVariants };
