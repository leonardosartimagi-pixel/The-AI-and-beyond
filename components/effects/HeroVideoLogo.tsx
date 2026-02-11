'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks';

interface HeroVideoLogoProps {
  className?: string;
  onVideoEnd?: () => void;
}

export function HeroVideoLogo({
  className = '',
  onVideoEnd,
}: HeroVideoLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [showStaticLogo, setShowStaticLogo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCanPlay = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasVideoError(true);
    setShowStaticLogo(true);
  }, []);

  const handleEnded = useCallback(() => {
    setShowStaticLogo(true);
    setIsVideoPlaying(false);
    onVideoEnd?.();
  }, [onVideoEnd]);

  const handlePlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  useEffect(() => {
    // Se reduced motion, mostra subito il fallback statico
    if (prefersReducedMotion) {
      setShowStaticLogo(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);

    // Tenta di riprodurre il video
    video.play().catch(() => {
      // Se autoplay fallisce (es. policy browser), mostra logo statico
      setHasVideoError(true);
      setShowStaticLogo(true);
    });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
    };
  }, [
    prefersReducedMotion,
    handleCanPlay,
    handleError,
    handleEnded,
    handlePlay,
  ]);

  // Dimensioni responsive del logo
  const logoSizeClasses =
    'h-20 w-80 sm:h-24 sm:w-96 md:h-28 md:w-[30rem] lg:h-32 lg:w-[34rem]';

  // Fallback statico per reduced motion, errori, o dopo che il video finisce
  if (prefersReducedMotion || hasVideoError) {
    return (
      <motion.div
        className={`relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={`relative ${logoSizeClasses}`}>
          <Image
            src="/images/logo-full-white.svg"
            alt="The AI and beyond"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Video animato */}
      <AnimatePresence mode="wait">
        {!showStaticLogo && (
          <motion.div
            key="video"
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isVideoLoaded ? 1 : 0,
              scale: isVideoLoaded ? 1 : 0.9,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <video
              ref={videoRef}
              className={`${logoSizeClasses} object-contain drop-shadow-2xl`}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="Logo animato The AI and beyond"
            >
              <source src="/videos/hero-logo.webm" type="video/webm" />
              <source src="/videos/hero-logo.mp4" type="video/mp4" />
            </video>

            {/* Glow effect durante la riproduzione */}
            {isVideoPlaying && (
              <motion.div
                className="pointer-events-none absolute inset-0 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 scale-150 bg-gradient-radial from-accent/30 via-accent/10 to-transparent blur-2xl" />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Logo statico dopo il video */}
        {showStaticLogo && (
          <motion.div
            key="static"
            className="relative"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={`relative ${logoSizeClasses}`}>
              <Image
                src="/images/logo-full-white.svg"
                alt="The AI and beyond"
                fill
                className="object-contain drop-shadow-lg"
                sizes="(min-width: 1024px) 34rem, (min-width: 768px) 30rem, (min-width: 640px) 24rem, 20rem"
                priority
              />
            </div>

            {/* Subtle glow persistente */}
            <div
              className="pointer-events-none absolute inset-0 -z-10 scale-125 bg-gradient-radial from-accent/15 via-transparent to-transparent blur-xl"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
