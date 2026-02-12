/**
 * Prompt Injection Detection and Prevention
 *
 * This module detects and blocks prompt injection attempts
 * to protect the AI chatbot from malicious inputs.
 */

// Pattern che indicano tentativi di prompt injection
const INJECTION_PATTERNS: RegExp[] = [
  // Tentativi di ignorare istruzioni
  /ignore\s+(previous|all|above|prior|earlier)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+(all|your|the|any)\s+(instructions?|prompts?|rules?|guidelines?)/i,
  /forget\s+(everything|all|your|the)\s+(instructions?|prompts?|training)/i,
  /override\s+(your|the|all)\s+(instructions?|rules?|guidelines?)/i,
  /bypass\s+(your|the|all)\s+(instructions?|rules?|filters?|safety)/i,

  // Tentativi di role-play / identity change
  /you\s+are\s+now\s+(a|an|the)/i,
  /pretend\s+(you\s+are|to\s+be|you're)/i,
  /act\s+(as\s+(if|a|an)|like\s+(you|a))/i,
  /roleplay\s+as/i,
  /impersonate/i,
  /assume\s+the\s+(role|identity|persona)/i,

  // Tentativi di accedere al system prompt
  /what\s+(is|are)\s+your\s+(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?prompt/i,
  /reveal\s+(your\s+)?(system\s+)?instructions/i,
  /print\s+(your\s+)?(system\s+)?prompt/i,
  /output\s+(your\s+)?(initial|system)\s+instructions/i,

  // Delimitatori di prompt comuni usati in attacchi
  /\[INST\]/i,
  /\[\/INST\]/i,
  /<<SYS>>/i,
  /<\|im_start\|>/i,
  /<\|im_end\|>/i,
  /\[SYSTEM\]/i,
  /```\s*(system|assistant|user)\s*\n/i,

  // Tentativi di injection con markup
  /system\s*:\s*\n/i,
  /assistant\s*:\s*\n/i,
  /human\s*:\s*\n/i,

  // Tentativi di jailbreak comuni
  /DAN\s*mode/i,
  /developer\s+mode/i,
  /do\s+anything\s+now/i,
  /evil\s+(mode|assistant|ai)/i,
  /unlock\s+(your\s+)?full\s+potential/i,
];

// Contenuti bloccati per policy di sicurezza
const BLOCKED_CONTENT_PATTERNS: RegExp[] = [
  // Richieste di hacking/exploit
  /how\s+to\s+hack/i,
  /exploit\s+(vulnerability|code|system)/i,
  /create\s+(malware|virus|trojan)/i,
  /sql\s+injection/i,
  /xss\s+attack/i,

  // Informazioni personali sensibili
  /credit\s*card\s*(number|info)/i,
  /social\s*security\s*(number|#)/i,
  /bank\s*account\s*(number|details)/i,
  /passport\s*(number|info)/i,

  // Richieste di generazione password/credenziali
  /generate\s+(a\s+)?(fake|real)\s+(credit\s*card|ssn|passport)/i,

  // Richieste di attività illegali
  /how\s+to\s+(steal|hack|break\s+into)/i,
];

// Input sanitization limits
const MAX_USER_INPUT_LENGTH = 500;

// Risk score weights for calculateRiskScore
const INJECTION_RISK_WEIGHT = 50;
const BLOCKED_CONTENT_RISK_WEIGHT = 40;
const LONG_INPUT_THRESHOLD = 400;
const LONG_INPUT_RISK_WEIGHT = 10;
const EXCESSIVE_NEWLINE_THRESHOLD = 5;
const EXCESSIVE_NEWLINE_RISK_WEIGHT = 10;
const CODE_MARKUP_RISK_WEIGHT = 15;
const MAX_RISK_SCORE = 100;

// Caratteri potenzialmente pericolosi da sanitizzare
const DANGEROUS_CHARS: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '\\': '&#x5C;',
};

/**
 * Rileva tentativi di prompt injection nell'input
 */
export function detectPromptInjection(input: string): boolean {
  const normalizedInput = input.toLowerCase().trim();

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(normalizedInput)) {
      return true;
    }
  }

  return false;
}

/**
 * Verifica se l'input contiene contenuti bloccati
 */
export function containsBlockedContent(input: string): boolean {
  const normalizedInput = input.toLowerCase().trim();

  for (const pattern of BLOCKED_CONTENT_PATTERNS) {
    if (pattern.test(normalizedInput)) {
      return true;
    }
  }

  return false;
}

/**
 * Sanitizza l'input utente rimuovendo caratteri pericolosi
 */
export function sanitizeUserInput(input: string): string {
  let sanitized = input.trim();

  // Limita lunghezza
  if (sanitized.length > MAX_USER_INPUT_LENGTH) {
    sanitized = sanitized.slice(0, MAX_USER_INPUT_LENGTH);
  }

  // Escape caratteri pericolosi
  for (const [char, replacement] of Object.entries(DANGEROUS_CHARS)) {
    sanitized = sanitized.split(char).join(replacement);
  }

  // Rimuovi sequenze di newline multiple
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n');

  // Rimuovi caratteri di controllo (eccetto newline e tab)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return sanitized;
}

/**
 * Calcola un punteggio di rischio per l'input (0-100)
 * Usato per logging e monitoring
 */
export function calculateRiskScore(input: string): number {
  let score = 0;

  // Check injection patterns (alto rischio)
  if (detectPromptInjection(input)) {
    score += INJECTION_RISK_WEIGHT;
  }

  // Check blocked content (alto rischio)
  if (containsBlockedContent(input)) {
    score += BLOCKED_CONTENT_RISK_WEIGHT;
  }

  // Input molto lungo (rischio medio)
  if (input.length > LONG_INPUT_THRESHOLD) {
    score += LONG_INPUT_RISK_WEIGHT;
  }

  // Molti newline (potenziale tentativo di confusione)
  const newlineCount = (input.match(/\n/g) || []).length;
  if (newlineCount > EXCESSIVE_NEWLINE_THRESHOLD) {
    score += EXCESSIVE_NEWLINE_RISK_WEIGHT;
  }

  // Presenza di codice/markup
  if (/```|<\/?[a-z][\s\S]*>/i.test(input)) {
    score += CODE_MARKUP_RISK_WEIGHT;
  }

  return Math.min(MAX_RISK_SCORE, score);
}
