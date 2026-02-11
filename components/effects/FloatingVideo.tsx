'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

interface FloatingVideoProps {
  isVisible: boolean;
  className?: string;
}

export function FloatingVideo({
  isVisible,
  className = '',
}: FloatingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Track if video was already shown and ended
  const hasPlayedRef = useRef(false);

  const handleCanPlay = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasVideoError(true);
  }, []);

  const handleEnded = useCallback(() => {
    setHasVideoEnded(true);
    hasPlayedRef.current = true;
  }, []);

  // Control video visibility based on isVisible prop
  useEffect(() => {
    // Don't show if already played and ended
    if (hasPlayedRef.current) {
      setShowVideo(false);
      return;
    }

    if (isVisible && !prefersReducedMotion && !hasVideoError) {
      setShowVideo(true);
      // Start video when becoming visible
      const video = videoRef.current;
      if (video && video.paused) {
        video.currentTime = 0;
        video.play().catch(() => {
          setHasVideoError(true);
        });
      }
    } else if (!isVisible) {
      // Pause when not visible (scrolled back up)
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
      }
      setShowVideo(false);
    }
  }, [isVisible, prefersReducedMotion, hasVideoError]);

  // Initialize video event listeners
  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [prefersReducedMotion, handleCanPlay, handleError, handleEnded]);

  // Don't render anything if reduced motion, error, or already ended
  if (prefersReducedMotion || hasVideoError || hasVideoEnded) {
    return null;
  }

  return (
    <AnimatePresence>
      {showVideo && (
        <motion.div
          className={`fixed bottom-6 right-6 z-40 ${className}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Container with glow effect */}
          <div className="relative">
            {/* Glow background */}
            <div
              className="absolute inset-0 -z-10 scale-125 rounded-2xl bg-gradient-radial from-accent/30 via-accent/10 to-transparent blur-xl"
              aria-hidden="true"
            />

            {/* Video container */}
            <div className="relative overflow-hidden rounded-2xl bg-primary/90 p-2 shadow-2xl backdrop-blur-sm">
              <motion.video
                ref={videoRef}
                className="h-16 w-auto rounded-xl sm:h-20 md:h-24"
                muted
                playsInline
                preload="auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                aria-label="Logo animato The AI and beyond"
              >
                <source src="/videos/hero-logo.webm" type="video/webm" />
                <source src="/videos/hero-logo.mp4" type="video/mp4" />
              </motion.video>

              {/* Subtle border accent */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/20"
                aria-hidden="true"
              />
            </div>

            {/* Decorative pulse ring */}
            <motion.div
              className="absolute inset-0 -z-20 rounded-2xl border-2 border-accent/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
