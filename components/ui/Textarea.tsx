'use client';

import {
  forwardRef,
  type TextareaHTMLAttributes,
  useId,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, autoResize, onChange, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const internalRef = useRef<HTMLTextAreaElement>(null);

    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (textarea && autoResize) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoResize, textareaRef]);

    useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      adjustHeight();
    };

    return (
      <div className="w-full">
        {label && <TextareaLabel htmlFor={textareaId}>{label}</TextareaLabel>}
        <textarea
          id={textareaId}
          ref={textareaRef}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
          className={cn(
            'flex min-h-[120px] w-full rounded-lg border bg-white dark:bg-gray-900 px-4 py-3',
            'text-primary dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'transition-all duration-300 resize-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950',
            'focus-visible:shadow-lg focus-visible:shadow-accent/20',
            error
              ? 'border-red-500 focus-visible:ring-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-700 focus-visible:ring-accent focus-visible:border-accent',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {error && <TextareaError id={errorId}>{error}</TextareaError>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface TextareaLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

function TextareaLabel({ htmlFor, children }: TextareaLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-primary dark:text-gray-200"
    >
      {children}
    </label>
  );
}

interface TextareaErrorProps {
  id: string;
  children: React.ReactNode;
}

function TextareaError({ id, children }: TextareaErrorProps) {
  return (
    <p id={id} className="mt-1 text-sm text-red-500 dark:text-red-400" role="alert">
      {children}
    </p>
  );
}

export { Textarea };
