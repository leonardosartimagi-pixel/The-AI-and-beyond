'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const LOCALE_STORAGE_KEY = 'preferred-locale';

interface LanguageOption {
  code: 'it' | 'en';
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'icon' | 'full';
}

export function LanguageSwitcher({
  className = '',
  variant = 'icon'
}: LanguageSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleSelectLanguage = useCallback(
    (locale: 'it' | 'en') => {
      if (locale === currentLocale) {
        setIsOpen(false);
        return;
      }

      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      setIsOpen(false);

      const pathWithoutLocale = pathname.replace(/^\/(it|en)/, '') || '/';
      router.push(`/${locale}${pathWithoutLocale}`);
    },
    [pathname, router, currentLocale]
  );

  const currentLanguage = languages.find((l) => l.code === currentLocale) ?? languages[0]!;

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className={cn(
          'relative h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800',
          className
        )}
        aria-label="Select language"
        disabled
      />
    );
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative flex items-center justify-center rounded-full',
          'bg-white/90 backdrop-blur-sm border border-gray-200/50',
          'transition-colors hover:bg-gray-100 hover:border-gray-300',
          'dark:bg-gray-800/90 dark:border-gray-600/50 dark:hover:bg-gray-700 dark:hover:border-gray-500',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-accent focus-visible:ring-offset-2',
          'dark:focus-visible:ring-offset-gray-950',
          variant === 'icon' ? 'h-9 w-9' : 'h-9 gap-2 px-3'
        )}
        aria-label={`Current language: ${currentLanguage.label}. Click to change.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      >
        <span className="text-xs font-bold text-primary dark:text-gray-100 uppercase">
          {currentLanguage.code}
        </span>
        {variant === 'full' && (
          <span className="text-sm font-medium text-primary dark:text-gray-100">
            {currentLanguage.code.toUpperCase()}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'absolute right-0 top-full z-50 mt-2 min-w-[140px]',
              'overflow-hidden rounded-xl',
              'bg-white shadow-lg ring-1 ring-black/5',
              'dark:bg-gray-800 dark:ring-white/10'
            )}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="listbox"
            aria-label="Select language"
          >
            {languages.map((lang) => {
              const isSelected = lang.code === currentLocale;
              return (
                <motion.button
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3',
                    'text-left transition-colors',
                    isSelected
                      ? 'bg-accent/10 text-accent dark:bg-accent/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
                    'focus-visible:outline-none focus-visible:bg-gray-50',
                    'dark:focus-visible:bg-gray-700/50'
                  )}
                  role="option"
                  aria-selected={isSelected}
                  whileHover={prefersReducedMotion ? {} : { x: 2 }}
                >
                  <span className="text-xl" role="img" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      isSelected
                        ? 'text-accent dark:text-accent-light'
                        : 'text-gray-700 dark:text-gray-200'
                    )}
                  >
                    {lang.label}
                  </span>
                  {isSelected && (
                    <motion.svg
                      className="ml-auto h-4 w-4 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
