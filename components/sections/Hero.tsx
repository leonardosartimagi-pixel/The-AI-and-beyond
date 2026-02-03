'use client';

import { motion } from 'framer-motion';
import { useReducedMotion, useScrollTo } from '@/hooks';
import { Badge, Button } from '@/components/ui';
import { AnimatedLogo } from './AnimatedLogo';

const KEYWORDS = ['Qualità', 'Velocità', 'Sicurezza', 'Controllo'] as const;

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
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
      aria-label="Sezione principale"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary"
        aria-hidden="true"
      />

      {/* Tech pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 188, 212, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 188, 212, 0.3) 1px, transparent 1px)
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
          {/* Animated Logo */}
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <AnimatedLogo
              width={240}
              height={96}
              className="h-auto w-48 sm:w-60"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            Trasformo idee in soluzioni AI{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              che funzionano
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
            variants={itemVariants}
          >
            Consulenza e sviluppo per aziende che vogliono crescere con
            l&apos;intelligenza artificiale
          </motion.p>

          {/* Keyword Badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            variants={badgeContainerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Valori principali"
          >
            {KEYWORDS.map((keyword) => (
              <motion.div key={keyword} variants={badgeVariants}>
                <Badge
                  variant="secondary"
                  size="lg"
                  className="cursor-default border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-white/30 hover:shadow-lg hover:shadow-accent/20"
                  animated={!prefersReducedMotion}
                >
                  {keyword}
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
              Scopri come posso aiutarti
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
    </section>
  );
}
