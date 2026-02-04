/**
 * Chat-Specific Rate Limiter
 *
 * More aggressive rate limiting for chat to prevent abuse
 * and control API costs.
 */

interface ChatRateLimitRecord {
  messageCount: number;
  firstMessageTime: number;
  lastMessageTime: number;
}

interface SessionRecord {
  totalMessages: number;
  createdAt: number;
  lastActivityAt: number;
  isBlocked: boolean;
}

// Configurazione rate limiting
const CONFIG = {
  // Messaggi per minuto per IP
  maxMessagesPerMinute: 10,
  // Messaggi totali per sessione
  maxMessagesPerSession: 50,
  // Lunghezza massima messaggio
  maxMessageLength: 500,
  // Timeout sessione (30 minuti)
  sessionTimeoutMs: 30 * 60 * 1000,
  // Finestra rate limit (1 minuto)
  rateLimitWindowMs: 60 * 1000,
  // Cleanup interval (5 minuti)
  cleanupIntervalMs: 5 * 60 * 1000,
};

// Store in-memory per rate limiting
const ipRateLimitStore = new Map<string, ChatRateLimitRecord>();
const sessionStore = new Map<string, SessionRecord>();

// Cleanup periodico
let cleanupInterval: NodeJS.Timeout | null = null;

function startCleanup() {
  if (cleanupInterval) return;

  cleanupInterval = setInterval(() => {
    cleanupExpiredRecords();
  }, CONFIG.cleanupIntervalMs);
}

/**
 * Pulisce record scaduti per prevenire memory leak
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now();

  // Cleanup IP rate limits
  Array.from(ipRateLimitStore.entries()).forEach(([ip, record]) => {
    if (now - record.lastMessageTime > CONFIG.rateLimitWindowMs) {
      ipRateLimitStore.delete(ip);
    }
  });

  // Cleanup sessioni scadute
  Array.from(sessionStore.entries()).forEach(([sessionId, session]) => {
    if (now - session.lastActivityAt > CONFIG.sessionTimeoutMs) {
      sessionStore.delete(sessionId);
    }
  });
}

/**
 * Verifica se IP o sessione sono rate limited
 */
export function isChatRateLimited(ip: string, sessionId: string): boolean {
  const now = Date.now();

  // Check blocco sessione
  const session = sessionStore.get(sessionId);
  if (session?.isBlocked) {
    return true;
  }

  // Check limite messaggi per sessione
  if (session && session.totalMessages >= CONFIG.maxMessagesPerSession) {
    // Blocca la sessione
    session.isBlocked = true;
    sessionStore.set(sessionId, session);
    return true;
  }

  // Check rate limit IP
  const ipRecord = ipRateLimitStore.get(ip);
  if (ipRecord) {
    const windowExpired = now - ipRecord.firstMessageTime > CONFIG.rateLimitWindowMs;

    if (windowExpired) {
      // Reset window
      ipRateLimitStore.delete(ip);
      return false;
    }

    if (ipRecord.messageCount >= CONFIG.maxMessagesPerMinute) {
      return true;
    }
  }

  return false;
}

/**
 * Registra un messaggio per rate limiting
 */
export function trackChatMessage(ip: string, sessionId: string): void {
  const now = Date.now();

  // Avvia cleanup se non attivo
  startCleanup();

  // Update IP record
  const ipRecord = ipRateLimitStore.get(ip);
  if (ipRecord) {
    const windowExpired = now - ipRecord.firstMessageTime > CONFIG.rateLimitWindowMs;

    if (windowExpired) {
      // Nuova finestra
      ipRateLimitStore.set(ip, {
        messageCount: 1,
        firstMessageTime: now,
        lastMessageTime: now,
      });
    } else {
      // Incrementa counter
      ipRecord.messageCount += 1;
      ipRecord.lastMessageTime = now;
      ipRateLimitStore.set(ip, ipRecord);
    }
  } else {
    // Primo messaggio da questo IP
    ipRateLimitStore.set(ip, {
      messageCount: 1,
      firstMessageTime: now,
      lastMessageTime: now,
    });
  }

  // Update session record
  const session = sessionStore.get(sessionId);
  if (session) {
    session.totalMessages += 1;
    session.lastActivityAt = now;
    sessionStore.set(sessionId, session);
  } else {
    // Nuova sessione
    sessionStore.set(sessionId, {
      totalMessages: 1,
      createdAt: now,
      lastActivityAt: now,
      isBlocked: false,
    });
  }
}

/**
 * Ottiene il conteggio messaggi per una sessione
 */
export function getSessionMessageCount(sessionId: string): number {
  const session = sessionStore.get(sessionId);
  return session?.totalMessages || 0;
}

/**
 * Ottiene messaggi rimanenti per una sessione
 */
export function getRemainingMessages(sessionId: string): number {
  const session = sessionStore.get(sessionId);
  if (!session) {
    return CONFIG.maxMessagesPerSession;
  }

  if (session.isBlocked) {
    return 0;
  }

  return Math.max(0, CONFIG.maxMessagesPerSession - session.totalMessages);
}

/**
 * Ottiene tempo di attesa se rate limited (in secondi)
 */
export function getWaitTimeSeconds(ip: string): number {
  const ipRecord = ipRateLimitStore.get(ip);
  if (!ipRecord) return 0;

  const elapsed = Date.now() - ipRecord.firstMessageTime;
  const remaining = CONFIG.rateLimitWindowMs - elapsed;

  return Math.max(0, Math.ceil(remaining / 1000));
}

/**
 * Verifica se la sessione ha raggiunto il limite totale
 */
export function isSessionLimitReached(sessionId: string): boolean {
  const session = sessionStore.get(sessionId);
  return session?.isBlocked || false;
}

/**
 * Reset manuale di una sessione (per testing)
 */
export function resetSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

/**
 * Ottiene configurazione rate limiting
 */
export function getRateLimitConfig() {
  return { ...CONFIG };
}
