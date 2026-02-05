'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion, useScrollTo } from '@/hooks';
import { Badge, Button } from '@/components/ui';
import { ParticleBackground, GradientMesh } from '@/components/effects';
import Image from 'next/image';


const KEYWORD_KEYS = ['quality', 'speed', 'security', 'control'] as const;

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
  const t = useTranslations('hero');
  const prefersReducedMotion = useReducedMotion();
  const scrollTo = useScrollTo();

  const handleCtaClick = () => {
    scrollTo('contatti');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut',
      },
    },
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.8,
      },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="hero"
      className={`relative min-h-screen overflow-hidden ${className}`}
      aria-label={t('headline')}
    >
      {/* Animated gradient mesh background */}
      <GradientMesh />

      {/* Interactive particle system */}
      <ParticleBackground />

      {/* Tech pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(19, 125, 197, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(19, 125, 197, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />


      {/* Gradient orbs for depth */}
      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Static Logo */}
          <motion.div
            className="mb-10 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative h-20 w-80 sm:h-24 sm:w-96 md:h-28 md:w-[30rem] lg:h-32 lg:w-[34rem]">
              <Image
                src="/logos/logo-white.png"
                alt="The AI and Beyond"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              {/* Subtle glow effect */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 scale-125 bg-gradient-radial from-accent/20 via-transparent to-transparent blur-xl"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            {t('headline')}{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              {t('headlineAccent')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>

          {/* Keyword Badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            variants={badgeContainerVariants}
            initial="hidden"
            animate="visible"
            aria-label={t('keywords.quality')}
          >
            {KEYWORD_KEYS.map((key) => (
              <motion.div key={key} variants={badgeVariants}>
                <Badge
                  variant="secondary"
                  size="lg"
                  className="cursor-default border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-white/30 hover:shadow-lg hover:shadow-accent/20"
                  animated={!prefersReducedMotion}
                >
                  {t(`keywords.${key}`)}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div className="mt-12" variants={itemVariants}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCtaClick}
              className="shadow-lg shadow-accent/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-accent/40"
            >
              {t('cta')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: prefersReducedMotion ? 0 : [0, 8, 0],
          }}
          transition={{
            opacity: { delay: 2, duration: 0.5 },
            y: {
              delay: 2.5,
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          aria-hidden="true"
        >
          <svg
            className="h-8 w-8 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>

      {/* Avatar GIF - bottom right, feet on edge */}
      <img
        src="/images/avatar-hero.gif"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-4 z-20 h-[120px] w-[80px] sm:right-6 sm:h-[160px] sm:w-[107px] md:right-8 md:h-[200px] md:w-[133px] lg:right-12 lg:h-[280px] lg:w-[187px]"
      />
    </section>
  );
}
