'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';

export function AIChatTyping() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="flex justify-start">
        <div className="rounded-2xl border border-accent/10 bg-accent/5 px-4 py-3">
          <span className="text-sm text-primary/60">...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="rounded-2xl border border-accent/10 bg-accent/5 px-4 py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-accent/60"
              animate={{
                y: [0, -4, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
