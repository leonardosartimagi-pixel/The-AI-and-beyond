'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  isVisible: boolean;
  className?: string;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01';

export function GlitchText({ text, isVisible, className = '' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const getRandomChar = useCallback(() => {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }, []);

  // Glitch reveal effect
  useEffect(() => {
    if (!isVisible || !text) {
      setDisplayText('');
      return;
    }

    setIsGlitching(true);
    let currentIndex = 0;
    let glitchIterations = 0;
    const maxGlitchIterations = 3;

    // Initial glitch phase - show random characters
    const glitchInterval = setInterval(() => {
      if (glitchIterations < maxGlitchIterations) {
        // Show random glitch characters
        const glitchedText = text
          .split('')
          .map(() => getRandomChar())
          .join('');
        setDisplayText(glitchedText);
        glitchIterations++;
      } else {
        clearInterval(glitchInterval);

        // Reveal phase - character by character
        const revealInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            const revealed = text.slice(0, currentIndex);
            const remaining = text.slice(currentIndex);
            const glitched = remaining
              .split('')
              .map(() => (Math.random() > 0.5 ? getRandomChar() : ' '))
              .join('');

            setDisplayText(revealed + glitched);
            currentIndex++;
          } else {
            clearInterval(revealInterval);
            setDisplayText(text);
            setIsGlitching(false);
          }
        }, 30); // Speed of character reveal

        return () => clearInterval(revealInterval);
      }
    }, 50); // Speed of initial glitch

    return () => clearInterval(glitchInterval);
  }, [isVisible, text, getRandomChar]);

  // Cursor blink effect
  useEffect(() => {
    if (!isGlitching) {
      setShowCursor(false);
      return;
    }

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);

    return () => clearInterval(cursorInterval);
  }, [isGlitching]);

  // Occasional random glitch on stable text
  useEffect(() => {
    if (isGlitching || !isVisible || !text) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of micro-glitch
        const charIndex = Math.floor(Math.random() * text.length);
        const glitchedText =
          text.slice(0, charIndex) + getRandomChar() + text.slice(charIndex + 1);

        setDisplayText(glitchedText);

        // Restore after brief moment
        setTimeout(() => {
          setDisplayText(text);
        }, 50);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [isGlitching, isVisible, text, getRandomChar]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`relative ${className}`}
        >
          {/* Glitch shadow layers */}
          {isGlitching && (
            <>
              <span
                className="pointer-events-none absolute left-[1px] top-0 text-[#00aeef] opacity-50"
                aria-hidden="true"
              >
                {displayText}
              </span>
              <span
                className="pointer-events-none absolute left-[-1px] top-0 text-[#ff0040] opacity-30"
                aria-hidden="true"
              >
                {displayText}
              </span>
            </>
          )}

          {/* Main text */}
          <span className="relative">
            {displayText}
            {isGlitching && showCursor && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] bg-[#00aeef]" />
            )}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
