'use client';

import { forwardRef, type InputHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
        <input
          type={type}
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'flex h-11 w-full rounded-lg border bg-white px-4 py-2',
            'text-primary placeholder:text-gray-400',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            error
              ? 'border-red-500 focus-visible:ring-red-500'
              : 'border-gray-300 focus-visible:ring-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {error && <InputError id={errorId}>{error}</InputError>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface InputLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function InputLabel({ htmlFor, children }: InputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-primary"
    >
      {children}
    </label>
  );
}

interface InputErrorProps {
  id: string;
  children: React.ReactNode;
}

function InputError({ id, children }: InputErrorProps) {
  return (
    <p id={id} className="mt-1 text-sm text-red-500" role="alert">
      {children}
    </p>
  );
}

export { Input };
