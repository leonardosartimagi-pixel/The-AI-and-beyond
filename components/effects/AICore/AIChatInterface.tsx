'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion, useLenisControl } from '@/hooks';
import { EASING } from '@/lib/animation-variants';
import { AIChatMessage } from './AIChatMessage';
import { AIChatQuickReplies } from './AIChatQuickReplies';
import { AIChatInput } from './AIChatInput';
import { AIChatTyping } from './AIChatTyping';
import { AuditReportCard } from './AuditReportCard';
import type {
  ChatMessage,
  QuickReply,
  ChatFlow,
  AuditReport,
} from './chat-types';

interface AIChatInterfaceProps {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  remainingMessages: number;
  isLimitReached: boolean;
  currentFlow: ChatFlow;
  auditReport: AuditReport | null;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  onQuickReply: (reply: QuickReply) => void;
  onReset: () => void;
  onAuditHoursSubmit: (hours: number) => void;
}

export function AIChatInterface({
  isOpen,
  messages,
  isTyping,
  remainingMessages,
  isLimitReached,
  currentFlow,
  auditReport,
  onClose,
  onSendMessage,
  onQuickReply,
  onReset,
  onAuditHoursSubmit,
}: AIChatInterfaceProps) {
  const t = useTranslations('chat');
  const tAudit = useTranslations('audit');
  const prefersReducedMotion = useReducedMotion();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // State for hours slider
  const [hoursValue, setHoursValue] = useState(15);

  // Check if we're in hours step
  const isHoursStep = currentFlow === 'audit_hours';

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [messages, isTyping, prefersReducedMotion]);

  useLenisControl(isOpen);

  // Focus trap e keyboard handlers
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Ottieni ultimo messaggio con quick replies
  const lastMessage = messages[messages.length - 1];
  const showQuickReplies =
    lastMessage?.role === 'assistant' &&
    lastMessage?.quickReplies &&
    lastMessage.quickReplies.length > 0 &&
    !isTyping;

  const panelVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.25,
        ease: EASING,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          className="fixed bottom-24 right-4 z-50 flex w-[calc(100%-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:bottom-28 sm:right-6"
          style={{ maxHeight: 'min(500px, 70vh)' }}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label={t('title')}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-primary to-accent px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <span className="font-medium text-white">{t('title')}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Reset button */}
              <button
                onClick={onReset}
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={t('restart')}
                title={t('restart')}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={t('close')}
              >
                <svg
                  className="h-5 w-5"
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
            </div>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 space-y-3 overflow-y-auto p-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((message) => (
              <div key={message.id}>
                {message.isAuditReport && auditReport ? (
                  <AuditReportCard report={auditReport} onClose={onClose} />
                ) : (
                  <AIChatMessage message={message} />
                )}
              </div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>{isTyping && <AIChatTyping />}</AnimatePresence>

            {/* Quick replies */}
            {showQuickReplies && !isHoursStep && (
              <AIChatQuickReplies
                replies={lastMessage.quickReplies!}
                onSelect={onQuickReply}
                disabled={isTyping || isLimitReached}
              />
            )}

            {/* Hours slider for audit */}
            {isHoursStep && !isTyping && (
              <motion.div
                className="rounded-xl bg-gray-50 p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              >
                <label className="mb-3 flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>{tAudit('hoursSlider.label')}</span>
                  <span className="rounded-lg bg-accent/10 px-3 py-1 font-heading text-lg font-bold text-accent">
                    {hoursValue}h
                  </span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={hoursValue}
                  onChange={(e) => setHoursValue(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-accent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md"
                  aria-valuemin={5}
                  aria-valuemax={40}
                  aria-valuenow={hoursValue}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>5h</span>
                  <span>40h</span>
                </div>
                <button
                  onClick={() => onAuditHoursSubmit(hoursValue)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {tAudit('hoursSlider.submit')}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Remaining messages indicator */}
          {remainingMessages <= 10 && remainingMessages > 0 && (
            <div className="border-t border-gray-100 bg-amber-50 px-4 py-2 text-center text-xs text-amber-700">
              {remainingMessages}{' '}
              {t('messagesRemaining', { count: remainingMessages })}
            </div>
          )}

          {/* Input area */}
          <AIChatInput
            onSend={onSendMessage}
            disabled={isTyping || isLimitReached}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
