'use client';

import { forwardRef, type InputHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const errorId = `${checkboxId}-error`;

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'h-5 w-5 shrink-0 cursor-pointer appearance-none rounded',
              'border-2 bg-white transition-colors duration-200',
              'checked:bg-accent checked:border-accent',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-accent focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'relative',
              error ? 'border-red-500' : 'border-gray-300',
              className
            )}
            {...props}
          />
          {label && <CheckboxLabel htmlFor={checkboxId}>{label}</CheckboxLabel>}
        </div>
        {error && <CheckboxError id={errorId}>{error}</CheckboxError>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

interface CheckboxLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function CheckboxLabel({ htmlFor, children }: CheckboxLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm text-primary cursor-pointer">
      {children}
    </label>
  );
}

interface CheckboxErrorProps {
  id: string;
  children: React.ReactNode;
}

function CheckboxError({ id, children }: CheckboxErrorProps) {
  return (
    <p id={id} className="mt-1 text-sm text-red-500" role="alert">
      {children}
    </p>
  );
}

export { Checkbox };
