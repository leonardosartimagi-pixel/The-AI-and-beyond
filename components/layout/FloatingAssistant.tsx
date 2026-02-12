'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion, useScrollTo } from '@/hooks';
import { EASING } from '@/lib/animation-variants';

interface Message {
  key: string;
  delay: number;
}

const MESSAGES: Message[] = [
  { key: 'greeting', delay: 8000 },
  { key: 'help', delay: 18000 },
];

export function FloatingAssistant() {
  const t = useTranslations('assistant');
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isNearForm, setIsNearForm] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const scrollTo = useScrollTo();

  // Show assistant after initial scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Show after scrolling past hero (roughly 400px)
      if (scrollY > 400 && !isVisible && !isDismissed) {
        setIsVisible(true);
      }

      // Detect proximity to contact form
      const contactSection = document.getElementById('contatti');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isNear = rect.top < window.innerHeight && rect.bottom > 0;
        setIsNearForm(isNear);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isDismissed]);

  // Cycle through messages when visible and not near form
  useEffect(() => {
    if (!isVisible || isDismissed) return;

    const timers: NodeJS.Timeout[] = [];

    MESSAGES.forEach(({ key, delay }) => {
      const timer = setTimeout(() => {
        if (!isNearForm) {
          setCurrentMessage(t(key));
        }
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isVisible, isNearForm, isDismissed, t]);

  // Show special message when near form
  useEffect(() => {
    if (isNearForm && isVisible && !isDismissed) {
      setCurrentMessage(t('nearForm'));
    }
  }, [isNearForm, isVisible, isDismissed, t]);

  const handleClick = useCallback(() => {
    scrollTo('contatti');
  }, [scrollTo]);

  const handleDismiss = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  }, []);

  // Don't render if reduced motion or dismissed
  if (prefersReducedMotion || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.4, ease: EASING }}
        >
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {currentMessage && (
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[200px] rounded-2xl p-3 shadow-lg ${
                  isNearForm ? 'bg-accent text-white' : 'bg-white text-primary'
                }`}
              >
                <p className="text-sm font-medium">{currentMessage}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated mascot button */}
          <div className="relative">
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Chiudi assistente"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <motion.button
              onClick={handleClick}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-2 shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={t('ariaLabel')}
            >
              {/* Animated blob mascot using CSS/SVG */}
              <AnimatedBlob />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated blob mascot - simple, professional, lightweight
 * Uses SVG with CSS animations for smooth movement
 */
function AnimatedBlob() {
  return (
    <motion.svg
      viewBox="0 0 50 50"
      className="h-full w-full"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1177bd" />
          <stop offset="100%" stopColor="#00aeef" />
        </linearGradient>
      </defs>
      {/* Main blob shape */}
      <motion.path
        d="M25 5C35 5 45 15 45 25C45 35 35 45 25 45C15 45 5 35 5 25C5 15 15 5 25 5Z"
        fill="url(#blobGradient)"
        animate={{
          d: [
            'M25 5C35 5 45 15 45 25C45 35 35 45 25 45C15 45 5 35 5 25C5 15 15 5 25 5Z',
            'M25 7C37 7 43 17 43 25C43 33 37 43 25 43C13 43 7 33 7 25C7 17 13 7 25 7Z',
            'M25 5C35 5 45 15 45 25C45 35 35 45 25 45C15 45 5 35 5 25C5 15 15 5 25 5Z',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Eyes */}
      <circle cx="18" cy="22" r="3" fill="white" />
      <circle cx="32" cy="22" r="3" fill="white" />
      <motion.circle
        cx="18"
        cy="22"
        r="1.5"
        fill="#1b2f75"
        animate={{ y: [0, -0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="32"
        cy="22"
        r="1.5"
        fill="#1b2f75"
        animate={{ y: [0, -0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Smile */}
      <motion.path
        d="M18 32 Q25 38 32 32"
        fill="none"
        stroke="#1b2f75"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{
          d: [
            'M18 32 Q25 38 32 32',
            'M18 32 Q25 36 32 32',
            'M18 32 Q25 38 32 32',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}
