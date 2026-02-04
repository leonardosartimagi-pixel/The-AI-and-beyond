'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import type { ChatMessage } from './chat-types';

interface AIChatMessageProps {
  message: ChatMessage;
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const prefersReducedMotion = useReducedMotion();

  const isUser = message.role === 'user';
  const isError = message.isError;

  const variants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate="visible"
      variants={variants}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-primary text-white'
            : isError
              ? 'border border-red-200 bg-red-50 text-red-700'
              : 'border border-accent/10 bg-accent/5 text-primary'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <time
          className={`mt-1 block text-[10px] ${
            isUser
              ? 'text-white/60'
              : isError
                ? 'text-red-400'
                : 'text-primary/40'
          }`}
          dateTime={message.timestamp.toISOString()}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
    </motion.div>
  );
}
