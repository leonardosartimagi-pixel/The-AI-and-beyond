'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useReducedMotion, useLenisControl } from '@/hooks';
import { createModalAnimation } from '@/lib/animation-variants';
import Image from 'next/image';

const LOCALE_STORAGE_KEY = 'preferred-locale';

interface LanguageOption {
  code: 'it' | 'en';
  label: string;
  nativeLabel: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: 'it',
    label: 'Italian',
    nativeLabel: 'Italiano',
    flag: '🇮🇹',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇬🇧',
  },
];

export function LanguageSelectorModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  useLenisControl(isVisible);

  // Check localStorage on mount (client-side only)
  useEffect(() => {
    // Small delay to ensure we're fully client-side
    const timer = setTimeout(() => {
      setIsMounted(true);

      // Check if user has already selected a language
      const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

      if (!storedLocale) {
        // No preference stored, show modal
        setIsVisible(true);
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectLanguage = useCallback(
    (locale: 'it' | 'en') => {
      // Store preference
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);

      // Re-enable scroll
      document.body.style.overflow = '';

      // Hide modal
      setIsVisible(false);

      // Navigate to selected locale
      // Get the current path without locale prefix
      const pathWithoutLocale = pathname.replace(/^\/(it|en)/, '') || '/';
      router.push(`/${locale}${pathWithoutLocale}`);
    },
    [pathname, router]
  );

  // Close on backdrop click — default to the current URL locale
  const handleBackdropClick = useCallback(() => {
    const currentLocale =
      (pathname.match(/^\/(it|en)/)?.[1] as 'it' | 'en') || 'it';
    handleSelectLanguage(currentLocale);
  }, [pathname, handleSelectLanguage]);

  // Don't render anything during SSR or if preference exists
  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-primary/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-selector-title"
          >
            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl sm:p-10"
              onClick={(e) => e.stopPropagation()}
              {...createModalAnimation(prefersReducedMotion, {
                scale: 0.95,
                duration: 0.5,
              })}
            >
              {/* Decorative gradient background */}
              <div
                className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-accent/20 to-accent-light/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-primary/10 to-accent/5 blur-3xl"
                aria-hidden="true"
              />

              {/* Logo */}
              <motion.div
                className="relative mb-8 flex justify-center"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              >
                <Image
                  src="/logos/logo-color.png"
                  alt="The AI and beyond"
                  width={200}
                  height={67}
                  className="h-auto w-48"
                  priority
                />
              </motion.div>

              {/* Title */}
              <motion.div
                className="relative mb-8 text-center"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
              >
                <h2
                  id="language-selector-title"
                  className="mb-2 font-heading text-2xl font-bold text-primary sm:text-3xl"
                >
                  Benvenuto / Welcome
                </h2>
                <p className="text-gray-600">
                  Scegli la tua lingua / Choose your language
                </p>
              </motion.div>

              {/* Language Options */}
              <motion.div
                className="relative grid gap-4 sm:grid-cols-2"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
              >
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className="group relative flex flex-col items-center gap-3 rounded-2xl border-2 border-gray-100 bg-white p-6 transition-all hover:border-accent hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  >
                    {/* Flag */}
                    <span
                      className="text-5xl transition-transform group-hover:scale-110"
                      role="img"
                      aria-label={lang.label}
                    >
                      {lang.flag}
                    </span>

                    {/* Language Name */}
                    <div className="text-center">
                      <span className="block font-heading text-lg font-semibold text-primary">
                        {lang.nativeLabel}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {lang.label}
                      </span>
                    </div>

                    {/* Hover accent line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 rounded-b-2xl bg-gradient-to-r from-accent to-accent-light"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                    />
                  </motion.button>
                ))}
              </motion.div>

              {/* Subtle hint */}
              <motion.p
                className="relative mt-6 text-center text-xs text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.6 }}
              >
                La tua preferenza verrà salvata / Your preference will be saved
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
