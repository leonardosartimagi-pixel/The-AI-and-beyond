'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { useAICoreState } from './useAICoreState';
import { useAIChat } from './useAIChat';
import { AICoreNucleus } from './AICoreNucleus';
import { AICoreOrbits } from './AICoreOrbits';
import { AICoreParticles } from './AICoreParticles';
import { GlitchText } from './GlitchText';
import { AIChatInterface } from './AIChatInterface';

interface Message {
  key: string;
  delay: number;
}

const MESSAGES: Message[] = [
  { key: 'greeting', delay: 8000 },
  { key: 'help', delay: 18000 },
];

const SIZE = 64;
const HOVER_SIZE = 72;
const MAGNETIC_RANGE = 150;
const MAGNETIC_STRENGTH = 4;

export function AICore() {
  const t = useTranslations('assistant');
  const prefersReducedMotion = useReducedMotion();

  const {
    intensity,
    isHovered,
    mousePosition,
    handleMouseEnter,
    handleMouseLeave,
  } = useAICoreState();

  // Chat hook
  const {
    isOpen: isChatOpen,
    messages: chatMessages,
    isTyping,
    currentFlow,
    remainingMessages,
    isLimitReached,
    auditReport,
    openChat,
    closeChat,
    sendMessage,
    handleQuickReply,
    resetChat,
    handleAuditHoursSubmit,
  } = useAIChat();

  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isNearForm, setIsNearForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Show after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isVisible && !isDismissed) {
        setIsVisible(true);
      }

      // Detect proximity to contact form
      const contactSection = document.getElementById('contatti');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isNear = rect.top < window.innerHeight && rect.bottom > 0;
        setIsNearForm(isNear);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isDismissed]);

  // Message cycling (only when chat is closed)
  useEffect(() => {
    if (!isVisible || isDismissed || isChatOpen) return;

    const timers: NodeJS.Timeout[] = [];

    MESSAGES.forEach(({ key, delay }) => {
      const timer = setTimeout(() => {
        if (!isNearForm && !isChatOpen) {
          setCurrentMessage(t(key));
        }
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [isVisible, isNearForm, isDismissed, isChatOpen, t]);

  // Near form special message (only when chat is closed)
  useEffect(() => {
    if (isNearForm && isVisible && !isDismissed && !isChatOpen) {
      setCurrentMessage(t('nearForm'));
    }
  }, [isNearForm, isVisible, isDismissed, isChatOpen, t]);

  // Hide speech bubble when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setCurrentMessage(null);
    }
  }, [isChatOpen]);

  // Click opens chat
  const handleClick = useCallback(() => {
    openChat();
  }, [openChat]);

  const handleDismiss = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeChat();
      setIsDismissed(true);
      setIsVisible(false);
    },
    [closeChat]
  );

  // Calculate magnetic offset
  const magneticOffset = useMemo(() => {
    if (!containerRef.current || prefersReducedMotion || isChatOpen) {
      return { x: 0, y: 0 };
    }

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mousePosition.x - centerX;
    const dy = mousePosition.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < MAGNETIC_RANGE && distance > 0) {
      const strength =
        ((MAGNETIC_RANGE - distance) / MAGNETIC_RANGE) * MAGNETIC_STRENGTH;
      return {
        x: (dx / distance) * strength,
        y: (dy / distance) * strength,
      };
    }

    return { x: 0, y: 0 };
  }, [mousePosition, prefersReducedMotion, isChatOpen]);

  // Don't render if dismissed
  if (isDismissed) return null;

  const currentSize = isHovered ? HOVER_SIZE : SIZE;

  return (
    <>
      {/* Chat Interface */}
      <AIChatInterface
        isOpen={isChatOpen}
        messages={chatMessages}
        isTyping={isTyping}
        currentFlow={currentFlow}
        remainingMessages={remainingMessages}
        isLimitReached={isLimitReached}
        auditReport={auditReport}
        onClose={closeChat}
        onSendMessage={sendMessage}
        onQuickReply={handleQuickReply}
        onReset={resetChat}
        onAuditHoursSubmit={handleAuditHoursSubmit}
      />

      {/* AI Core Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={containerRef}
            className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: magneticOffset.x,
            }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Speech bubble with glitch effect (hidden when chat is open) */}
            <AnimatePresence mode="wait">
              {currentMessage && !isChatOpen && (
                <motion.div
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[220px] rounded-xl border p-3 shadow-lg backdrop-blur-sm ${
                    isNearForm
                      ? 'border-accent/30 bg-accent/90 text-white'
                      : 'border-accent/20 bg-white/95 text-primary'
                  }`}
                  style={{
                    boxShadow: isNearForm
                      ? '0 0 20px rgba(0, 174, 239, 0.3)'
                      : '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <GlitchText
                    text={currentMessage}
                    isVisible={!!currentMessage}
                    className="text-sm font-medium"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Core button */}
            <div className="relative">
              {/* Dismiss button */}
              <motion.button
                onClick={handleDismiss}
                className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={t('dismiss')}
              >
                <svg
                  className="h-3 w-3"
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
              </motion.button>

              {/* AI Core SVG */}
              <motion.button
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`relative flex items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  isChatOpen ? 'ring-2 ring-accent ring-offset-2' : ''
                }`}
                style={{
                  width: currentSize + 16,
                  height: currentSize + 16,
                  boxShadow:
                    isHovered || isChatOpen
                      ? `0 0 30px rgba(0, 174, 239, ${intensity.glowOpacity})`
                      : `0 4px 20px rgba(0, 0, 0, 0.1)`,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: magneticOffset.y,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                aria-label={isChatOpen ? t('closeChat') : t('ariaLabel')}
                aria-expanded={isChatOpen}
              >
                {prefersReducedMotion ? (
                  // Static version for reduced motion
                  <div
                    className="rounded-full bg-gradient-to-br from-primary to-accent"
                    style={{ width: SIZE * 0.5, height: SIZE * 0.5 }}
                  />
                ) : (
                  <svg
                    width={currentSize}
                    height={currentSize}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="overflow-visible"
                  >
                    <defs>
                      {/* Core gradient */}
                      <radialGradient
                        id="nucleusCore"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop offset="0%" stopColor="#1177bd" />
                        <stop offset="70%" stopColor="#1b2f75" />
                        <stop offset="100%" stopColor="#0f1d4a" />
                      </radialGradient>

                      {/* Inner glow gradient */}
                      <radialGradient
                        id="nucleusGlowInner"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#00aeef"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#1177bd"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      {/* Outer glow gradient */}
                      <radialGradient
                        id="nucleusGlow"
                        cx="50%"
                        cy="50%"
                        r="50%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#00aeef"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="50%"
                          stopColor="#1177bd"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#1b2f75"
                          stopOpacity="0"
                        />
                      </radialGradient>

                      {/* Orbit gradient */}
                      <linearGradient
                        id="orbitGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#00aeef"
                          stopOpacity="0.6"
                        />
                        <stop
                          offset="50%"
                          stopColor="#1177bd"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#00aeef"
                          stopOpacity="0.6"
                        />
                      </linearGradient>
                    </defs>

                    {/* Particles (behind) */}
                    <AICoreParticles
                      intensity={intensity}
                      isHovered={isHovered}
                      size={SIZE}
                    />

                    {/* Orbits */}
                    <AICoreOrbits
                      intensity={intensity}
                      isHovered={isHovered}
                      size={SIZE}
                    />

                    {/* Nucleus (front) */}
                    <AICoreNucleus
                      intensity={intensity}
                      isHovered={isHovered}
                      size={SIZE}
                    />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
