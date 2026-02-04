/**
 * Chat Security - Main Orchestration Module
 *
 * This module orchestrates all security checks for the AI chat,
 * combining prompt guard, content filter, and rate limiting.
 */

import {
  detectPromptInjection,
  containsBlockedContent,
  sanitizeUserInput,
  calculateRiskScore,
} from './prompt-guard';

import {
  sanitizeAIResponse,
  validateResponse,
  processAIResponse,
  detectLanguage,
} from './content-filter';

import {
  isChatRateLimited,
  trackChatMessage,
  getSessionMessageCount,
  getRemainingMessages,
  isSessionLimitReached,
  getWaitTimeSeconds,
} from './rate-limiter-chat';

// Re-export per comodità
export {
  // Prompt Guard
  detectPromptInjection,
  containsBlockedContent,
  sanitizeUserInput,
  calculateRiskScore,
  // Content Filter
  sanitizeAIResponse,
  validateResponse,
  processAIResponse,
  detectLanguage,
  // Rate Limiter
  isChatRateLimited,
  trackChatMessage,
  getSessionMessageCount,
  getRemainingMessages,
  isSessionLimitReached,
  getWaitTimeSeconds,
};

/**
 * Risultato della validazione sicurezza
 */
export interface ChatSecurityResult {
  isAllowed: boolean;
  reason?: SecurityBlockReason;
  sanitizedInput?: string;
  riskScore?: number;
}

/**
 * Motivi di blocco
 */
export type SecurityBlockReason =
  | 'rate_limited'
  | 'session_limit'
  | 'too_long'
  | 'injection_detected'
  | 'blocked_content'
  | 'empty_input'
  | 'high_risk';

/**
 * Messaggi di errore localizzati
 */
const ERROR_MESSAGES: Record<SecurityBlockReason, { it: string; en: string }> = {
  rate_limited: {
    it: 'Hai inviato troppi messaggi. Attendi qualche secondo.',
    en: 'Too many messages. Please wait a moment.',
  },
  session_limit: {
    it: 'Hai raggiunto il limite di messaggi. Per continuare, compila il form di contatto.',
    en: 'Message limit reached. Please use the contact form to continue.',
  },
  too_long: {
    it: 'Il messaggio è troppo lungo. Prova con un messaggio più breve.',
    en: 'Message is too long. Please try a shorter message.',
  },
  injection_detected: {
    it: 'Non ho capito la domanda. Puoi riformularla?',
    en: "I didn't understand the question. Could you rephrase it?",
  },
  blocked_content: {
    it: 'Non posso rispondere a questa domanda. Posso aiutarti con altro?',
    en: "I can't answer this question. Can I help you with something else?",
  },
  empty_input: {
    it: 'Per favore, scrivi un messaggio.',
    en: 'Please enter a message.',
  },
  high_risk: {
    it: 'La tua richiesta non può essere elaborata. Prova a riformularla.',
    en: 'Your request cannot be processed. Please try rephrasing.',
  },
};

/**
 * Valida l'input utente con tutti i controlli di sicurezza
 */
export function validateChatInput(
  input: string,
  ip: string,
  sessionId: string
): ChatSecurityResult {
  // 1. Check input vuoto
  if (!input || input.trim().length === 0) {
    return { isAllowed: false, reason: 'empty_input' };
  }

  // 2. Check limite sessione (prima del rate limiting per minuto)
  if (isSessionLimitReached(sessionId)) {
    return { isAllowed: false, reason: 'session_limit' };
  }

  // 3. Check rate limiting
  if (isChatRateLimited(ip, sessionId)) {
    return { isAllowed: false, reason: 'rate_limited' };
  }

  // 4. Check lunghezza
  if (input.length > 500) {
    return { isAllowed: false, reason: 'too_long' };
  }

  // 5. Check prompt injection
  if (detectPromptInjection(input)) {
    return { isAllowed: false, reason: 'injection_detected' };
  }

  // 6. Check contenuti bloccati
  if (containsBlockedContent(input)) {
    return { isAllowed: false, reason: 'blocked_content' };
  }

  // 7. Calcola risk score
  const riskScore = calculateRiskScore(input);
  if (riskScore >= 70) {
    return { isAllowed: false, reason: 'high_risk', riskScore };
  }

  // 8. Sanitizza input
  const sanitizedInput = sanitizeUserInput(input);

  return {
    isAllowed: true,
    sanitizedInput,
    riskScore,
  };
}

/**
 * Ottiene il messaggio di errore localizzato
 */
export function getErrorMessage(
  reason: SecurityBlockReason,
  locale: 'it' | 'en' = 'it'
): string {
  return ERROR_MESSAGES[reason]?.[locale] || ERROR_MESSAGES.blocked_content[locale];
}

/**
 * Crea un ID sessione sicuro
 */
export function generateSessionId(): string {
  // Genera UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Valida formato session ID
 */
export function isValidSessionId(sessionId: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(sessionId);
}

/**
 * Ottiene info sessione per UI
 */
export function getSessionInfo(sessionId: string) {
  return {
    messageCount: getSessionMessageCount(sessionId),
    remaining: getRemainingMessages(sessionId),
    isLimitReached: isSessionLimitReached(sessionId),
  };
}

/**
 * Log sicuro (senza dati sensibili)
 */
export function secureLog(
  level: 'info' | 'warn' | 'error',
  event: string,
  data?: Record<string, unknown>
): void {
  // Rimuovi dati sensibili prima di loggare
  const safeData = data
    ? Object.fromEntries(
        Object.entries(data).filter(
          ([key]) =>
            !['message', 'content', 'input', 'email', 'ip'].includes(key)
        )
      )
    : {};

  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ...safeData,
  };

  switch (level) {
    case 'info':
      console.log('[Chat Security]', JSON.stringify(logEntry));
      break;
    case 'warn':
      console.warn('[Chat Security]', JSON.stringify(logEntry));
      break;
    case 'error':
      console.error('[Chat Security]', JSON.stringify(logEntry));
      break;
  }
}
