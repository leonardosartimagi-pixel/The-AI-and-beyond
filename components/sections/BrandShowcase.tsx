'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { DecorativeConnections } from '@/components/effects';
import Image from 'next/image';

interface BrandShowcaseProps {
  className?: string;
  onScrollPastSection?: (isPast: boolean) => void;
}

export function BrandShowcase({
  className = '',
  onScrollPastSection,
}: BrandShowcaseProps) {
  const t = useTranslations('brandShowcase');
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { margin: '200% 0px', once: true });

  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 30]);

  // Track when scrolled past section
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isPast = rect.bottom < 0;
        onScrollPastSection?.(isPast);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollPastSection]);

  // Video event handlers
  const handleCanPlay = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasVideoError(true);
  }, []);

  // Initialize video
  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    video.play().catch(() => {
      setHasVideoError(true);
    });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [prefersReducedMotion, handleCanPlay, handleError]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="brand-showcase"
      className={`relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-white py-16 dark:bg-gray-950 md:py-24 ${className}`}
      aria-label={t('label')}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, #137dc5 1px, transparent 1px),
            linear-gradient(to bottom, #137dc5 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Neural connections behind video */}
      <DecorativeConnections variant="horizontal" opacity={0.35} />

      {/* Content container */}
      <motion.div
        className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Tagline - Above Video */}
        <motion.div
          className="mb-8 md:mb-12"
          variants={itemVariants}
          style={{ y: prefersReducedMotion ? 0 : textY }}
        >
          <h2 className="mb-4 font-heading text-2xl font-bold text-primary sm:text-3xl md:text-4xl lg:text-5xl">
            {t('tagline')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Video/Logo - Large and prominent */}
        <motion.div
          className="relative w-full max-w-4xl"
          variants={itemVariants}
          style={{
            scale: prefersReducedMotion ? 1 : videoScale,
          }}
        >
          {/* Video container with shadow */}
          <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-2xl bg-primary/5 shadow-2xl shadow-primary/10">
            {!prefersReducedMotion && !hasVideoError ? (
              <>
                <motion.video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Video presentazione The AI and beyond"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <source src="/videos/hero-logo.webm" type="video/webm" />
                  <source src="/videos/hero-logo.mp4" type="video/mp4" />
                </motion.video>

                {/* Loading placeholder */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="h-16 w-16 animate-pulse rounded-full bg-primary/20" />
                  </div>
                )}
              </>
            ) : (
              /* Static logo fallback */
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-dark p-12">
                <Image
                  src="/logos/logo-white.png"
                  alt="The AI and beyond"
                  width={500}
                  height={180}
                  className="h-auto max-h-32 w-auto max-w-full object-contain md:max-h-48"
                  priority
                />
              </div>
            )}

            {/* Decorative border glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10"
              aria-hidden="true"
            />
          </div>

          {/* Floating accent elements */}
          <div
            className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-accent/10 blur-3xl md:-left-8 md:-top-8 md:h-32 md:w-32"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl md:-bottom-8 md:-right-8 md:h-32 md:w-32"
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
