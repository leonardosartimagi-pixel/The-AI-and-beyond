/**
 * Security Module - Barrel Export
 *
 * Centralizes all security utilities for the AI chat system.
 */

// Main orchestration
export {
  validateChatInput,
  getErrorMessage,
  generateSessionId,
  isValidSessionId,
  getSessionInfo,
  secureLog,
  type ChatSecurityResult,
  type SecurityBlockReason,
} from './chat-security';

// Prompt Guard
export {
  detectPromptInjection,
  containsBlockedContent,
  sanitizeUserInput,
  calculateRiskScore,
} from './prompt-guard';

// Content Filter
export {
  sanitizeAIResponse,
  validateResponse,
  processAIResponse,
  detectLanguage,
} from './content-filter';

// Rate Limiter
export {
  isChatRateLimited,
  trackChatMessage,
  getSessionMessageCount,
  getRemainingMessages,
  isSessionLimitReached,
  getWaitTimeSeconds,
  resetSession,
  getRateLimitConfig,
  cleanupExpiredRecords,
} from './rate-limiter-chat';
