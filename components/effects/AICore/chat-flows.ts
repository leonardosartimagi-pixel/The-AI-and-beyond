/**
 * Chat Flows - Configurazione flussi conversazionali
 */

import type { QuickReply, ChatFlow } from './chat-types';
import type { AuditSector, AuditTeamSize, AuditChallenge } from '@/lib/audit';

/**
 * Quick replies per il messaggio di benvenuto
 * Aggiornato con: Audit AI, Progetto (vai al form), Domanda
 */
export const WELCOME_QUICK_REPLIES: QuickReply[] = [
  {
    id: 'audit',
    label: 'chat.quickReplies.audit',
    value: 'audit',
    icon: 'audit',
    action: 'start_audit',
  },
  {
    id: 'project',
    label: 'chat.quickReplies.project',
    value: 'project',
    icon: 'project',
    action: 'go_to_contact',
  },
  {
    id: 'question',
    label: 'chat.quickReplies.question',
    value: 'question',
    icon: 'question',
    action: 'send_message',
  },
];

/**
 * Quick replies per la lista servizi
 */
export const SERVICES_QUICK_REPLIES: QuickReply[] = [
  {
    id: 'consulting',
    label: 'services.items.consulting.title',
    value: 'Vorrei saperne di più sulla Consulenza AI',
    icon: 'consulting',
    action: 'send_message',
  },
  {
    id: 'webdev',
    label: 'services.items.webdev.title',
    value: 'Mi interessa lo Sviluppo Web App',
    icon: 'webdev',
    action: 'send_message',
  },
  {
    id: 'agents',
    label: 'services.items.agents.title',
    value: 'Vorrei informazioni sugli Agenti AI',
    icon: 'agents',
    action: 'send_message',
  },
  {
    id: 'prototypes',
    label: 'services.items.prototypes.title',
    value: 'Mi interessano i Prototipi Rapidi',
    icon: 'prototypes',
    action: 'send_message',
  },
];

/**
 * Configurazione step pre-qualifica
 */
export interface QualifyStep {
  key: 'sector' | 'teamSize' | 'budget' | 'goal';
  messageKey: string;
  options: QuickReply[];
  nextFlow: ChatFlow;
}

export const QUALIFY_STEPS: QualifyStep[] = [
  {
    key: 'sector',
    messageKey: 'chat.qualify.sector',
    nextFlow: 'qualify_team',
    options: [
      { id: 'tech', label: 'chat.qualify.sectorOptions.tech', value: 'Tech/Software', icon: 'sector', action: 'next_step' },
      { id: 'healthcare', label: 'chat.qualify.sectorOptions.healthcare', value: 'Healthcare', icon: 'sector', action: 'next_step' },
      { id: 'finance', label: 'chat.qualify.sectorOptions.finance', value: 'Finance', icon: 'sector', action: 'next_step' },
      { id: 'retail', label: 'chat.qualify.sectorOptions.retail', value: 'Retail', icon: 'sector', action: 'next_step' },
    ],
  },
  {
    key: 'teamSize',
    messageKey: 'chat.qualify.teamSize',
    nextFlow: 'qualify_budget',
    options: [
      { id: 'small', label: 'chat.qualify.teamSizeOptions.small', value: '1-5', icon: 'team', action: 'next_step' },
      { id: 'medium', label: 'chat.qualify.teamSizeOptions.medium', value: '6-20', icon: 'team', action: 'next_step' },
      { id: 'large', label: 'chat.qualify.teamSizeOptions.large', value: '21-50', icon: 'team', action: 'next_step' },
      { id: 'enterprise', label: 'chat.qualify.teamSizeOptions.enterprise', value: '50+', icon: 'team', action: 'next_step' },
    ],
  },
  {
    key: 'budget',
    messageKey: 'chat.qualify.budget',
    nextFlow: 'qualify_goal',
    options: [
      { id: 'low', label: 'chat.qualify.budgetOptions.low', value: '< €5k', icon: 'budget', action: 'next_step' },
      { id: 'medium', label: 'chat.qualify.budgetOptions.medium', value: '€5k-15k', icon: 'budget', action: 'next_step' },
      { id: 'high', label: 'chat.qualify.budgetOptions.high', value: '€15k-50k', icon: 'budget', action: 'next_step' },
      { id: 'tbd', label: 'chat.qualify.budgetOptions.tbd', value: 'Da definire', icon: 'budget', action: 'next_step' },
    ],
  },
  {
    key: 'goal',
    messageKey: 'chat.qualify.goal',
    nextFlow: 'qualify_complete',
    options: [
      { id: 'automate', label: 'chat.qualify.goalOptions.automate', value: 'Automatizzare processi', icon: 'goal', action: 'next_step' },
      { id: 'newProduct', label: 'chat.qualify.goalOptions.newProduct', value: 'Nuovo prodotto AI', icon: 'goal', action: 'next_step' },
      { id: 'improve', label: 'chat.qualify.goalOptions.improve', value: 'Migliorare esistente', icon: 'goal', action: 'next_step' },
      { id: 'other', label: 'chat.qualify.goalOptions.other', value: 'Altro', icon: 'goal', action: 'next_step' },
    ],
  },
];

/**
 * Ottiene lo step di qualifica corrente
 */
export function getQualifyStep(flow: ChatFlow): QualifyStep | undefined {
  const flowToStepMap: Record<string, number> = {
    qualify_sector: 0,
    qualify_team: 1,
    qualify_budget: 2,
    qualify_goal: 3,
  };

  const index = flowToStepMap[flow];
  return index !== undefined ? QUALIFY_STEPS[index] : undefined;
}

/**
 * FAQ predefinite per quick answers
 */
export const FAQ_QUICK_REPLIES: QuickReply[] = [
  {
    id: 'pricing',
    label: 'chat.faq.pricing',
    value: 'Quanto costano i servizi?',
    icon: 'question',
    action: 'send_message',
  },
  {
    id: 'timeline',
    label: 'chat.faq.timeline',
    value: 'Quanto tempo ci vuole per un progetto?',
    icon: 'question',
    action: 'send_message',
  },
  {
    id: 'process',
    label: 'chat.faq.process',
    value: 'Come funziona il processo di lavoro?',
    icon: 'question',
    action: 'send_message',
  },
];

/**
 * Genera ID univoco per messaggi
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// =============================================================================
// AUDIT FLOWS
// =============================================================================

/**
 * Step dell'audit con relative opzioni
 */
export interface AuditStep {
  key: 'sector' | 'teamSize' | 'challenge' | 'hoursPerWeek';
  messageKey: string;
  type: 'options' | 'slider';
  options?: QuickReply[];
  nextFlow: ChatFlow;
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
}

/**
 * Configurazione step audit
 */
export const AUDIT_STEPS: AuditStep[] = [
  {
    key: 'sector',
    messageKey: 'audit.questions.sector',
    type: 'options',
    nextFlow: 'audit_team',
    options: [
      { id: 'tech', label: 'audit.sectors.tech', value: 'tech', icon: 'tech', action: 'audit_next_step' },
      { id: 'healthcare', label: 'audit.sectors.healthcare', value: 'healthcare', icon: 'healthcare', action: 'audit_next_step' },
      { id: 'finance', label: 'audit.sectors.finance', value: 'finance', icon: 'finance', action: 'audit_next_step' },
      { id: 'retail', label: 'audit.sectors.retail', value: 'retail', icon: 'retail', action: 'audit_next_step' },
      { id: 'manufacturing', label: 'audit.sectors.manufacturing', value: 'manufacturing', icon: 'manufacturing', action: 'audit_next_step' },
      { id: 'other', label: 'audit.sectors.other', value: 'other', icon: 'other', action: 'audit_next_step' },
    ],
  },
  {
    key: 'teamSize',
    messageKey: 'audit.questions.teamSize',
    type: 'options',
    nextFlow: 'audit_challenge',
    options: [
      { id: 'small', label: 'audit.teamSizes.small', value: '1-5', icon: 'team', action: 'audit_next_step' },
      { id: 'medium', label: 'audit.teamSizes.medium', value: '6-20', icon: 'team', action: 'audit_next_step' },
      { id: 'large', label: 'audit.teamSizes.large', value: '21-50', icon: 'team', action: 'audit_next_step' },
      { id: 'enterprise', label: 'audit.teamSizes.enterprise', value: '50+', icon: 'team', action: 'audit_next_step' },
    ],
  },
  {
    key: 'challenge',
    messageKey: 'audit.questions.challenge',
    type: 'options',
    nextFlow: 'audit_hours',
    options: [
      { id: 'manual', label: 'audit.challenges.manual', value: 'manual', icon: 'challenge', action: 'audit_next_step' },
      { id: 'reporting', label: 'audit.challenges.reporting', value: 'reporting', icon: 'challenge', action: 'audit_next_step' },
      { id: 'data', label: 'audit.challenges.data', value: 'data', icon: 'challenge', action: 'audit_next_step' },
      { id: 'communication', label: 'audit.challenges.communication', value: 'communication', icon: 'challenge', action: 'audit_next_step' },
      { id: 'other', label: 'audit.challenges.other', value: 'other', icon: 'challenge', action: 'audit_next_step' },
    ],
  },
  {
    key: 'hoursPerWeek',
    messageKey: 'audit.questions.hours',
    type: 'slider',
    nextFlow: 'audit_generating',
    sliderConfig: {
      min: 5,
      max: 40,
      step: 1,
      defaultValue: 15,
    },
  },
];

/**
 * Ottiene lo step audit corrente
 */
export function getAuditStep(flow: ChatFlow): AuditStep | undefined {
  const flowToStepMap: Record<string, number> = {
    audit_sector: 0,
    audit_team: 1,
    audit_challenge: 2,
    audit_hours: 3,
  };

  const index = flowToStepMap[flow];
  return index !== undefined ? AUDIT_STEPS[index] : undefined;
}

/**
 * Mappa per ottenere la chiave dati dal flusso
 */
export function getAuditDataKeyFromFlow(flow: ChatFlow): keyof {
  sector: AuditSector;
  teamSize: AuditTeamSize;
  challenge: AuditChallenge;
  hoursPerWeek: number;
} | undefined {
  const map: Record<string, 'sector' | 'teamSize' | 'challenge' | 'hoursPerWeek'> = {
    audit_sector: 'sector',
    audit_team: 'teamSize',
    audit_challenge: 'challenge',
    audit_hours: 'hoursPerWeek',
  };
  return map[flow];
}
