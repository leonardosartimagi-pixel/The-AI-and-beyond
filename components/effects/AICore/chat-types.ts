/**
 * TypeScript interfaces for AI Chat system
 */

/**
 * Singolo messaggio nella chat
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
  isError?: boolean;
  isLoading?: boolean;
}

/**
 * Quick reply button
 */
export interface QuickReply {
  id: string;
  label: string;
  value: string;
  icon?: QuickReplyIcon;
  action: QuickReplyAction;
}

/**
 * Icone disponibili per quick replies
 */
export type QuickReplyIcon =
  | 'services'
  | 'project'
  | 'question'
  | 'consulting'
  | 'webdev'
  | 'agents'
  | 'prototypes'
  | 'pm'
  | 'sector'
  | 'team'
  | 'budget'
  | 'goal'
  | 'check'
  | 'arrow';

/**
 * Azioni possibili per quick replies
 */
export type QuickReplyAction =
  | 'send_message'    // Invia come messaggio utente
  | 'start_qualify'   // Avvia flusso pre-qualifica
  | 'navigate'        // Naviga a sezione
  | 'show_services'   // Mostra lista servizi
  | 'next_step';      // Prossimo step qualifica

/**
 * Flussi conversazionali disponibili
 */
export type ChatFlow =
  | 'welcome'
  | 'services'
  | 'qualify_sector'
  | 'qualify_team'
  | 'qualify_budget'
  | 'qualify_goal'
  | 'qualify_complete'
  | 'faq'
  | 'freeform';

/**
 * Dati raccolti durante pre-qualifica
 */
export interface QualifyData {
  sector?: string;
  teamSize?: string;
  budget?: string;
  goal?: string;
}

/**
 * Stato completo della chat
 */
export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  currentFlow: ChatFlow;
  qualifyData: QualifyData;
  sessionId: string;
  messageCount: number;
  remainingMessages: number;
  isLimitReached: boolean;
}

/**
 * Azioni per il reducer della chat
 */
export type ChatAction =
  | { type: 'OPEN_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<ChatMessage> } }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_FLOW'; payload: ChatFlow }
  | { type: 'UPDATE_QUALIFY_DATA'; payload: Partial<QualifyData> }
  | { type: 'SET_REMAINING_MESSAGES'; payload: number }
  | { type: 'SET_LIMIT_REACHED'; payload: boolean }
  | { type: 'RESET_CHAT' };

/**
 * Risposta dall'API chat
 */
export interface ChatApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  code?: string;
  remaining?: number;
}

/**
 * Configurazione per chiamata API
 */
export interface ChatApiRequest {
  message: string;
  sessionId: string;
  conversationHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  locale: 'it' | 'en';
}
