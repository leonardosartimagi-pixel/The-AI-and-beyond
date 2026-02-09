'use client';

import { useReducer, useCallback, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type {
  ChatState,
  ChatAction,
  ChatMessage,
  ChatFlow,
  QualifyData,
  ChatApiResponse,
  QuickReply,
  AuditData,
} from './chat-types';
import {
  WELCOME_QUICK_REPLIES,
  SERVICES_QUICK_REPLIES,
  FAQ_QUICK_REPLIES,
  getQualifyStep,
  generateMessageId,
  getAuditStep,
  AUDIT_STEPS,
} from './chat-flows';
import { generateSessionId } from '@/lib/security';
import { generateAuditReport } from '@/lib/audit';
import type { AuditSector, AuditTeamSize, AuditChallenge } from '@/lib/audit';

// Costanti
const MAX_MESSAGES = 50;
const SESSION_STORAGE_KEY = 'ai_chat_session';
const AUDIT_STORAGE_KEY = 'ai_audit_report';

/**
 * Stato iniziale della chat
 */
function createInitialState(): ChatState {
  return {
    isOpen: false,
    messages: [],
    isTyping: false,
    currentFlow: 'welcome',
    qualifyData: {},
    sessionId: generateSessionId(),
    messageCount: 0,
    remainingMessages: MAX_MESSAGES,
    isLimitReached: false,
    // Audit state
    auditData: {},
    auditReport: null,
  };
}

/**
 * Reducer per gestione stato chat
 */
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'OPEN_CHAT':
      return { ...state, isOpen: true };

    case 'CLOSE_CHAT':
      return { ...state, isOpen: false };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        messageCount: state.messageCount + 1,
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id
            ? { ...msg, ...action.payload.updates }
            : msg
        ),
      };

    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };

    case 'SET_FLOW':
      return { ...state, currentFlow: action.payload };

    case 'UPDATE_QUALIFY_DATA':
      return {
        ...state,
        qualifyData: { ...state.qualifyData, ...action.payload },
      };

    case 'SET_REMAINING_MESSAGES':
      return { ...state, remainingMessages: action.payload };

    case 'SET_LIMIT_REACHED':
      return { ...state, isLimitReached: action.payload };

    case 'RESET_CHAT':
      return {
        ...createInitialState(),
        isOpen: state.isOpen,
      };

    // Audit actions
    case 'UPDATE_AUDIT_DATA':
      return {
        ...state,
        auditData: { ...state.auditData, ...action.payload },
      };

    case 'SET_AUDIT_REPORT':
      return {
        ...state,
        auditReport: action.payload,
      };

    case 'CLEAR_AUDIT':
      return {
        ...state,
        auditData: {},
        auditReport: null,
      };

    default:
      return state;
  }
}

/**
 * Hook principale per gestione chat AI
 */
export function useAIChat() {
  const t = useTranslations();
  const locale = useLocale() as 'it' | 'en';

  const [state, dispatch] = useReducer(chatReducer, null, createInitialState);
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasShownWelcomeRef = useRef(false);
  const hasCheckedSavedAuditRef = useRef(false);

  // Recupera sessione da sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.sessionId && parsed.messageCount !== undefined) {
          // Ripristina solo sessionId e messageCount
          dispatch({ type: 'SET_REMAINING_MESSAGES', payload: MAX_MESSAGES - parsed.messageCount });
        }
      }
    } catch {
      // Ignora errori sessionStorage
    }
  }, []);

  // Salva sessione in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          sessionId: state.sessionId,
          messageCount: state.messageCount,
        })
      );
    } catch {
      // Ignora errori sessionStorage
    }
  }, [state.sessionId, state.messageCount]);

  /**
   * Traduce chiave i18n
   */
  const translate = useCallback(
    (key: string): string => {
      try {
        return t(key);
      } catch {
        return key;
      }
    },
    [t]
  );

  /**
   * Traduce quick replies
   */
  const translateQuickReplies = useCallback(
    (replies: QuickReply[]): QuickReply[] => {
      return replies.map((reply) => ({
        ...reply,
        label: translate(reply.label),
      }));
    },
    [translate]
  );

  /**
   * Aggiunge messaggio assistente
   */
  const addAssistantMessage = useCallback(
    (content: string, quickReplies?: QuickReply[]) => {
      const message: ChatMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        quickReplies: quickReplies
          ? translateQuickReplies(quickReplies)
          : undefined,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    },
    [translateQuickReplies]
  );

  /**
   * Aggiunge messaggio utente
   */
  const addUserMessage = useCallback((content: string) => {
    const message: ChatMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    return message.id;
  }, []);

  /**
   * Apre la chat e mostra messaggio di benvenuto
   */
  const openChat = useCallback(() => {
    dispatch({ type: 'OPEN_CHAT' });

    // Mostra welcome solo la prima volta
    if (!hasShownWelcomeRef.current && state.messages.length === 0) {
      hasShownWelcomeRef.current = true;

      // Controlla se esiste un audit salvato (remarketing non invasivo)
      let savedAudit: { auditCode: string; sector: string; timestamp: string } | null = null;
      if (!hasCheckedSavedAuditRef.current) {
        hasCheckedSavedAuditRef.current = true;
        try {
          const saved = localStorage.getItem(AUDIT_STORAGE_KEY);
          if (saved) {
            savedAudit = JSON.parse(saved);
          }
        } catch {
          // Ignora errori
        }
      }

      setTimeout(() => {
        if (savedAudit) {
          // Messaggio personalizzato per utenti di ritorno
          // La traduzione con parametri viene gestita direttamente qui
          const welcomeBackMessage = translate('chat.welcomeBack').replace(
            '{code}',
            savedAudit.auditCode
          );
          addAssistantMessage(welcomeBackMessage, WELCOME_QUICK_REPLIES);
        } else {
          // Messaggio di benvenuto standard
          addAssistantMessage(
            translate('chat.welcome'),
            WELCOME_QUICK_REPLIES
          );
        }
      }, 300);
    }
  }, [state.messages.length, addAssistantMessage, translate]);

  /**
   * Chiude la chat
   */
  const closeChat = useCallback(() => {
    dispatch({ type: 'CLOSE_CHAT' });
    // Annulla richieste pendenti
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  /**
   * Chiama API chat
   */
  const callChatApi = useCallback(
    async (userMessage: string): Promise<ChatApiResponse> => {
      // Prepara history (solo ultimi 10 messaggi per limitare token)
      const history = state.messages.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            sessionId: state.sessionId,
            conversationHistory: history,
            locale,
          }),
          signal: abortControllerRef.current.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: data.error || translate('chat.error'),
            code: data.code,
          };
        }

        return {
          success: true,
          message: data.message,
          remaining: data.remaining,
        };
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return { success: false, error: 'Request cancelled' };
        }
        return {
          success: false,
          error: translate('chat.error'),
        };
      }
    },
    [state.messages, state.sessionId, locale, translate]
  );

  /**
   * Invia messaggio all'AI
   */
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || state.isLimitReached) return;

      // Aggiungi messaggio utente
      addUserMessage(content);

      // Mostra typing
      dispatch({ type: 'SET_TYPING', payload: true });
      dispatch({ type: 'SET_FLOW', payload: 'freeform' });

      // Chiama API
      const response = await callChatApi(content);

      // Nascondi typing
      dispatch({ type: 'SET_TYPING', payload: false });

      if (response.success && response.message) {
        addAssistantMessage(response.message);

        if (response.remaining !== undefined) {
          dispatch({
            type: 'SET_REMAINING_MESSAGES',
            payload: response.remaining,
          });

          if (response.remaining <= 0) {
            dispatch({ type: 'SET_LIMIT_REACHED', payload: true });
            setTimeout(() => {
              addAssistantMessage(translate('chat.limitReached'));
            }, 500);
          }
        }
      } else {
        // Messaggio errore
        const errorMessage: ChatMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: response.error || translate('chat.error'),
          timestamp: new Date(),
          isError: true,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });

        // Check se limite raggiunto
        if (response.code === 'session_limit') {
          dispatch({ type: 'SET_LIMIT_REACHED', payload: true });
        }
      }
    },
    [
      state.isLimitReached,
      addUserMessage,
      callChatApi,
      addAssistantMessage,
      translate,
    ]
  );

  /**
   * Genera e mostra il report audit
   */
  const handleGenerateAuditReport = useCallback(
    (hoursOverride?: number) => {
      dispatch({ type: 'SET_TYPING', payload: true });

      // Simula generazione con messaggi di loading
      const loadingMessages = [
        'audit.loading.analyzing',
        'audit.loading.calculating',
        'audit.loading.generating',
      ];

      let messageIndex = 0;
      const loadingInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
          // Aggiorna messaggio di loading (opzionale, per ora solo typing)
          messageIndex++;
        }
      }, 800);

      // Genera report dopo animazione
      setTimeout(() => {
        clearInterval(loadingInterval);
        dispatch({ type: 'SET_TYPING', payload: false });

        const finalAuditData: AuditData = {
          ...state.auditData,
          hoursPerWeek: hoursOverride ?? state.auditData.hoursPerWeek ?? 15,
        };

        const report = generateAuditReport(finalAuditData, locale);
        dispatch({ type: 'SET_AUDIT_REPORT', payload: report });
        dispatch({ type: 'SET_FLOW', payload: 'audit_complete' });

        // Salva audit in localStorage per remarketing
        try {
          localStorage.setItem(
            AUDIT_STORAGE_KEY,
            JSON.stringify({
              auditCode: report.auditCode,
              sector: report.userData.sector,
              timestamp: report.generatedAt.toISOString(),
            })
          );
        } catch {
          // Ignora errori localStorage
        }

        // Aggiungi messaggio speciale per il report
        const reportMessage: ChatMessage = {
          id: generateMessageId(),
          role: 'assistant',
          content: '', // Il contenuto è il report stesso
          timestamp: new Date(),
          isAuditReport: true,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: reportMessage });
      }, 2500);
    },
    [state.auditData, locale]
  );

  /**
   * Gestisce click su quick reply
   */
  const handleQuickReply = useCallback(
    (reply: QuickReply) => {
      switch (reply.action) {
        case 'send_message':
          sendMessage(reply.value);
          break;

        case 'show_services':
          addUserMessage(translate('chat.quickReplies.services'));
          setTimeout(() => {
            addAssistantMessage(
              translate('chat.servicesIntro'),
              SERVICES_QUICK_REPLIES
            );
            dispatch({ type: 'SET_FLOW', payload: 'services' });
          }, 300);
          break;

        case 'start_qualify':
          addUserMessage(translate('chat.quickReplies.project'));
          dispatch({ type: 'SET_FLOW', payload: 'qualify_sector' });
          setTimeout(() => {
            const step = getQualifyStep('qualify_sector');
            if (step) {
              addAssistantMessage(
                translate(step.messageKey),
                step.options
              );
            }
          }, 300);
          break;

        case 'next_step':
          // Salva risposta qualifica
          const currentStep = getQualifyStep(state.currentFlow);
          if (currentStep) {
            dispatch({
              type: 'UPDATE_QUALIFY_DATA',
              payload: { [currentStep.key]: reply.value },
            });
            addUserMessage(reply.value);

            // Passa al prossimo step
            const nextFlow = currentStep.nextFlow;
            dispatch({ type: 'SET_FLOW', payload: nextFlow });

            setTimeout(() => {
              if (nextFlow === 'qualify_complete') {
                // Qualifica completata
                addAssistantMessage(translate('chat.qualify.complete'));
              } else {
                const nextStep = getQualifyStep(nextFlow);
                if (nextStep) {
                  addAssistantMessage(
                    translate(nextStep.messageKey),
                    nextStep.options
                  );
                }
              }
            }, 300);
          }
          break;

        case 'navigate':
          // Chiudi chat e naviga
          closeChat();
          const element = document.getElementById(reply.value);
          element?.scrollIntoView({ behavior: 'smooth' });
          break;

        // ===== AUDIT ACTIONS =====
        case 'start_audit':
          // Avvia flusso audit
          addUserMessage(translate('chat.quickReplies.audit'));
          dispatch({ type: 'CLEAR_AUDIT' });
          dispatch({ type: 'SET_FLOW', payload: 'audit_sector' });
          setTimeout(() => {
            const step = getAuditStep('audit_sector');
            if (step) {
              addAssistantMessage(
                translate(step.messageKey),
                step.options
              );
            }
          }, 300);
          break;

        case 'audit_next_step':
          // Salva risposta audit e passa al prossimo step
          const currentAuditStep = getAuditStep(state.currentFlow);
          if (currentAuditStep) {
            // Salva il dato
            const dataUpdate: Partial<AuditData> = {};
            if (currentAuditStep.key === 'sector') {
              dataUpdate.sector = reply.value as AuditSector;
            } else if (currentAuditStep.key === 'teamSize') {
              dataUpdate.teamSize = reply.value as AuditTeamSize;
            } else if (currentAuditStep.key === 'challenge') {
              dataUpdate.challenge = reply.value as AuditChallenge;
            }
            dispatch({ type: 'UPDATE_AUDIT_DATA', payload: dataUpdate });
            addUserMessage(translate(reply.label) || reply.value);

            // Passa al prossimo step
            const nextFlow = currentAuditStep.nextFlow;
            dispatch({ type: 'SET_FLOW', payload: nextFlow });

            setTimeout(() => {
              if (nextFlow === 'audit_generating') {
                // Genera il report
                handleGenerateAuditReport();
              } else {
                const nextStep = getAuditStep(nextFlow);
                if (nextStep) {
                  if (nextStep.type === 'slider') {
                    // Per lo slider, mostra messaggio con istruzioni
                    addAssistantMessage(translate(nextStep.messageKey));
                    // Il componente slider verrà mostrato dall'interfaccia
                  } else {
                    addAssistantMessage(
                      translate(nextStep.messageKey),
                      nextStep.options
                    );
                  }
                }
              }
            }, 300);
          }
          break;

        case 'go_to_contact':
          // Mostra messaggio cordiale e vai al form contatti
          addUserMessage(translate('chat.quickReplies.project'));
          setTimeout(() => {
            addAssistantMessage(translate('chat.goToContact'));
            setTimeout(() => {
              closeChat();
              const contactSection = document.getElementById('contatti');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
          }, 300);
          break;
      }
    },
    [
      sendMessage,
      addUserMessage,
      addAssistantMessage,
      translate,
      state.currentFlow,
      closeChat,
      handleGenerateAuditReport,
    ]
  );

  /**
   * Gestisce invio ore dallo slider audit
   */
  const handleAuditHoursSubmit = useCallback(
    (hours: number) => {
      dispatch({ type: 'UPDATE_AUDIT_DATA', payload: { hoursPerWeek: hours } });
      addUserMessage(`${hours}h/${translate('audit.perWeek')}`);
      dispatch({ type: 'SET_FLOW', payload: 'audit_generating' });

      setTimeout(() => {
        handleGenerateAuditReport(hours);
      }, 300);
    },
    [addUserMessage, translate, handleGenerateAuditReport]
  );

  /**
   * Reset chat
   */
  const resetChat = useCallback(() => {
    dispatch({ type: 'RESET_CHAT' });
    hasShownWelcomeRef.current = false;

    // Rimuovi da sessionStorage
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignora
    }

    // Mostra nuovo welcome
    setTimeout(() => {
      hasShownWelcomeRef.current = true;
      addAssistantMessage(translate('chat.welcome'), WELCOME_QUICK_REPLIES);
    }, 300);
  }, [addAssistantMessage, translate]);

  return {
    // State
    isOpen: state.isOpen,
    messages: state.messages,
    isTyping: state.isTyping,
    currentFlow: state.currentFlow,
    qualifyData: state.qualifyData,
    remainingMessages: state.remainingMessages,
    isLimitReached: state.isLimitReached,
    // Audit state
    auditData: state.auditData,
    auditReport: state.auditReport,

    // Actions
    openChat,
    closeChat,
    sendMessage,
    handleQuickReply,
    resetChat,
    // Audit actions
    handleAuditHoursSubmit,
  };
}
