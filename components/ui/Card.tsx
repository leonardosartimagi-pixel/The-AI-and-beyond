'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  ['rounded-2xl', 'transition-all duration-300'],
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-900/20',
        interactive: [
          'bg-white dark:bg-gray-950 shadow-md dark:shadow-gray-900/20 cursor-pointer',
          'hover:shadow-xl hover:shadow-accent/10 dark:hover:shadow-accent/5',
        ],
        glass: [
          'glass',
          'hover:shadow-xl hover:shadow-accent/10',
        ],
        glassSubtle: 'glass-subtle',
        glassStrong: 'glass-strong',
        glassGradient: 'glass-gradient-border',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

type BaseCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onAnimationStart'
  | 'onAnimationEnd'
>;

export interface CardProps
  extends BaseCardProps,
    VariantProps<typeof cardVariants> {
  as?: 'div' | 'article' | 'section';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, as: Component = 'div', children, ...props }, ref) => {
    const classes = cn(cardVariants({ variant, padding, className }));

    if (variant === 'interactive') {
      return (
        <motion.div
          ref={ref}
          className={classes}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 border-b border-gray-100 dark:border-gray-800 pb-4', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 border-t border-gray-100 dark:border-gray-800 pt-4', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter, cardVariants };
