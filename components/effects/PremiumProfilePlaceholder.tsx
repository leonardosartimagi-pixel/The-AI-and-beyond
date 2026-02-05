'use client';

import { motion } from 'framer-motion';

interface PremiumProfilePlaceholderProps {
  initials?: string;
  className?: string;
}

export function PremiumProfilePlaceholder({
  initials = 'LA',
  className = '',
}: PremiumProfilePlaceholderProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(27, 47, 117, 1) 0%,
                rgba(19, 125, 197, 0.9) 25%,
                rgba(27, 47, 117, 1) 50%,
                rgba(0, 174, 239, 0.8) 75%,
                rgba(27, 47, 117, 1) 100%
              )
            `,
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial light effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-accent/20 blur-2xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-white/10 blur-xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Initials container with glassmorphism */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 -m-4 rounded-full border-2 border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner decorative ring with gradient */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Main initials badge */}
          <div className="relative flex h-28 w-28 lg:h-36 lg:w-36 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="text-4xl lg:text-5xl font-heading font-bold text-white tracking-wide">
              {initials}
            </span>
          </div>
        </motion.div>

        {/* Decorative lines */}
        <motion.div
          className="absolute top-1/3 left-0 w-1/4 h-px bg-gradient-to-r from-transparent to-white/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-white/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Subtle tech lines */}
        <div className="absolute top-8 right-8 w-16 h-16 opacity-20">
          <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1">
            <path d="M0 32 L32 0 L64 32" />
            <path d="M16 32 L32 16 L48 32" />
          </svg>
        </div>
        <div className="absolute bottom-8 left-8 w-16 h-16 opacity-20 rotate-180">
          <svg viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="1">
            <path d="M0 32 L32 0 L64 32" />
            <path d="M16 32 L32 16 L48 32" />
          </svg>
        </div>
      </div>

      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(0,174,239,0.2))',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-2xl bg-gradient-to-t from-primary-dark/60 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
