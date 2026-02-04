/**
 * Content Filter for AI Responses
 *
 * This module sanitizes and validates AI-generated responses
 * before displaying them to users.
 */

// Pattern di contenuti inappropriati che l'AI non dovrebbe mai generare
const INAPPROPRIATE_PATTERNS: RegExp[] = [
  // Tentativi dell'AI di rivelare il system prompt
  /my\s+(system\s+)?prompt\s+(is|says|tells)/i,
  /i\s+(was|am)\s+instructed\s+to/i,
  /my\s+instructions\s+(are|say)/i,

  // Output che potrebbe indicare jailbreak riuscito
  /i\s+can\s+now\s+do\s+anything/i,
  /dan\s+mode\s+(activated|enabled)/i,
  /developer\s+mode\s+(activated|enabled)/i,

  // Contenuti potenzialmente dannosi
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi, // Event handlers

  // URL sospetti
  /https?:\/\/(?!theaiandbeyond\.com)[^\s]+\.(exe|bat|cmd|sh|ps1)/i,
];

// Frasi di fallback per risposte problematiche
const FALLBACK_RESPONSES = {
  it: 'Mi scusi, non sono riuscito a elaborare una risposta appropriata. Posso aiutarti in altro modo?',
  en: "I apologize, I couldn't generate an appropriate response. Can I help you with something else?",
};

/**
 * Sanitizza la risposta dell'AI rimuovendo contenuti potenzialmente pericolosi
 */
export function sanitizeAIResponse(response: string): string {
  let sanitized = response;

  // Rimuovi potenziali tag HTML/script
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Escape caratteri speciali HTML
  sanitized = sanitized
    .replace(/&(?!amp;|lt;|gt;|quot;|#x27;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Rimuovi markdown pericoloso (link con javascript:, etc.)
  sanitized = sanitized.replace(
    /\[([^\]]*)\]\(javascript:[^)]*\)/gi,
    '$1'
  );

  // Rimuovi link esterni (mantieni solo link interni)
  sanitized = sanitized.replace(
    /\[([^\]]*)\]\((https?:\/\/(?!theaiandbeyond\.com)[^)]+)\)/gi,
    '$1'
  );

  // Limita lunghezza risposta
  if (sanitized.length > 1000) {
    sanitized = sanitized.slice(0, 1000) + '...';
  }

  // Rimuovi sequenze di spazi/newline eccessive
  sanitized = sanitized
    .replace(/\n{3,}/g, '\n\n')
    .replace(/ {3,}/g, '  ')
    .trim();

  return sanitized;
}

/**
 * Valida che la risposta sia appropriata e non contenga contenuti problematici
 */
export function validateResponse(response: string): boolean {
  // Risposta vuota non è valida
  if (!response || response.trim().length === 0) {
    return false;
  }

  // Risposta troppo corta potrebbe indicare un problema
  if (response.trim().length < 10) {
    return false;
  }

  // Check per pattern inappropriati
  for (const pattern of INAPPROPRIATE_PATTERNS) {
    if (pattern.test(response)) {
      return false;
    }
  }

  return true;
}

/**
 * Ottiene una risposta di fallback nella lingua appropriata
 */
export function getFallbackResponse(locale: 'it' | 'en' = 'it'): string {
  return FALLBACK_RESPONSES[locale];
}

/**
 * Processa completamente la risposta dell'AI
 */
export function processAIResponse(
  response: string,
  locale: 'it' | 'en' = 'it'
): string {
  // Sanitizza prima
  const sanitized = sanitizeAIResponse(response);

  // Valida dopo sanitizzazione
  if (!validateResponse(sanitized)) {
    return getFallbackResponse(locale);
  }

  return sanitized;
}

/**
 * Rileva la lingua della risposta
 */
export function detectLanguage(text: string): 'it' | 'en' {
  // Pattern comuni italiano
  const italianPatterns = /\b(ciao|grazie|posso|aiutarti|servizi|consulenza|progetto|contatto|per|del|della|che|non|sono|come)\b/gi;

  // Pattern comuni inglese
  const englishPatterns = /\b(hello|thanks|can|help|services|consulting|project|contact|for|the|that|not|am|how|what|your)\b/gi;

  const italianMatches = (text.match(italianPatterns) || []).length;
  const englishMatches = (text.match(englishPatterns) || []).length;

  return italianMatches >= englishMatches ? 'it' : 'en';
}

/**
 * Verifica che la risposta sia in tema con i servizi offerti
 */
export function isOnTopic(response: string): boolean {
  const onTopicKeywords = [
    // Italiano
    'ai', 'intelligenza artificiale', 'consulenza', 'sviluppo',
    'web', 'app', 'automazione', 'agenti', 'prototipo', 'mvp',
    'progetto', 'servizi', 'leonardo', 'contatto', 'form',
    // Inglese
    'artificial intelligence', 'consulting', 'development',
    'automation', 'agents', 'prototype', 'project', 'services',
    'contact',
  ];

  const lowerResponse = response.toLowerCase();

  return onTopicKeywords.some(keyword =>
    lowerResponse.includes(keyword)
  );
}
