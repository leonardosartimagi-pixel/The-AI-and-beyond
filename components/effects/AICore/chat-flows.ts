/**
 * Chat Flows - Configurazione flussi conversazionali
 */

import type { QuickReply, ChatFlow } from './chat-types';

/**
 * Quick replies per il messaggio di benvenuto
 */
export const WELCOME_QUICK_REPLIES: QuickReply[] = [
  {
    id: 'services',
    label: 'chat.quickReplies.services',
    value: 'services',
    icon: 'services',
    action: 'show_services',
  },
  {
    id: 'project',
    label: 'chat.quickReplies.project',
    value: 'project',
    icon: 'project',
    action: 'start_qualify',
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
