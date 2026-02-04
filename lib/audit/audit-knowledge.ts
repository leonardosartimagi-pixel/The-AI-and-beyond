/**
 * Audit Knowledge Base - Configurazioni e opportunità per settore
 *
 * IMPORTANTE: Nessun riferimento a progetti/clienti specifici.
 * Solo opportunità generiche basate sul settore e la sfida.
 */

import type {
  AuditSector,
  AuditChallenge,
  SectorConfig,
  AuditOpportunity,
  AuditStep,
} from './audit-types';

/**
 * Configurazione per ogni settore
 * - defaultHourlyRate: media di mercato per calcoli ROI
 * - opportunities: opportunità generiche per il settore
 */
export const SECTOR_CONFIGS: Record<AuditSector, SectorConfig> = {
  tech: {
    id: 'tech',
    labelKey: 'audit.sectors.tech',
    defaultHourlyRate: 50,
    opportunities: [
      {
        id: 'tech-automation',
        titleKey: 'audit.opportunities.automation.title',
        descriptionKey: 'audit.opportunities.automation.description',
        relevance: 'high',
      },
      {
        id: 'tech-docs',
        titleKey: 'audit.opportunities.documentation.title',
        descriptionKey: 'audit.opportunities.documentation.description',
        relevance: 'medium',
      },
      {
        id: 'tech-workflow',
        titleKey: 'audit.opportunities.workflow.title',
        descriptionKey: 'audit.opportunities.workflow.description',
        relevance: 'high',
      },
    ],
  },
  healthcare: {
    id: 'healthcare',
    labelKey: 'audit.sectors.healthcare',
    defaultHourlyRate: 45,
    opportunities: [
      {
        id: 'health-scheduling',
        titleKey: 'audit.opportunities.scheduling.title',
        descriptionKey: 'audit.opportunities.scheduling.description',
        relevance: 'high',
      },
      {
        id: 'health-communication',
        titleKey: 'audit.opportunities.patientComm.title',
        descriptionKey: 'audit.opportunities.patientComm.description',
        relevance: 'high',
      },
      {
        id: 'health-records',
        titleKey: 'audit.opportunities.records.title',
        descriptionKey: 'audit.opportunities.records.description',
        relevance: 'medium',
      },
    ],
  },
  finance: {
    id: 'finance',
    labelKey: 'audit.sectors.finance',
    defaultHourlyRate: 60,
    opportunities: [
      {
        id: 'finance-reporting',
        titleKey: 'audit.opportunities.reporting.title',
        descriptionKey: 'audit.opportunities.reporting.description',
        relevance: 'high',
      },
      {
        id: 'finance-compliance',
        titleKey: 'audit.opportunities.compliance.title',
        descriptionKey: 'audit.opportunities.compliance.description',
        relevance: 'high',
      },
      {
        id: 'finance-data',
        titleKey: 'audit.opportunities.dataAnalysis.title',
        descriptionKey: 'audit.opportunities.dataAnalysis.description',
        relevance: 'medium',
      },
    ],
  },
  retail: {
    id: 'retail',
    labelKey: 'audit.sectors.retail',
    defaultHourlyRate: 35,
    opportunities: [
      {
        id: 'retail-inventory',
        titleKey: 'audit.opportunities.inventory.title',
        descriptionKey: 'audit.opportunities.inventory.description',
        relevance: 'high',
      },
      {
        id: 'retail-customer',
        titleKey: 'audit.opportunities.customerService.title',
        descriptionKey: 'audit.opportunities.customerService.description',
        relevance: 'high',
      },
      {
        id: 'retail-orders',
        titleKey: 'audit.opportunities.orderProcessing.title',
        descriptionKey: 'audit.opportunities.orderProcessing.description',
        relevance: 'medium',
      },
    ],
  },
  manufacturing: {
    id: 'manufacturing',
    labelKey: 'audit.sectors.manufacturing',
    defaultHourlyRate: 40,
    opportunities: [
      {
        id: 'mfg-quality',
        titleKey: 'audit.opportunities.qualityControl.title',
        descriptionKey: 'audit.opportunities.qualityControl.description',
        relevance: 'high',
      },
      {
        id: 'mfg-maintenance',
        titleKey: 'audit.opportunities.maintenance.title',
        descriptionKey: 'audit.opportunities.maintenance.description',
        relevance: 'high',
      },
      {
        id: 'mfg-supply',
        titleKey: 'audit.opportunities.supplyChain.title',
        descriptionKey: 'audit.opportunities.supplyChain.description',
        relevance: 'medium',
      },
    ],
  },
  other: {
    id: 'other',
    labelKey: 'audit.sectors.other',
    defaultHourlyRate: 40,
    opportunities: [
      {
        id: 'other-automation',
        titleKey: 'audit.opportunities.automation.title',
        descriptionKey: 'audit.opportunities.automation.description',
        relevance: 'high',
      },
      {
        id: 'other-workflow',
        titleKey: 'audit.opportunities.workflow.title',
        descriptionKey: 'audit.opportunities.workflow.description',
        relevance: 'medium',
      },
      {
        id: 'other-communication',
        titleKey: 'audit.opportunities.communication.title',
        descriptionKey: 'audit.opportunities.communication.description',
        relevance: 'medium',
      },
    ],
  },
};

/**
 * Opportunità aggiuntive basate sulla sfida selezionata
 * Vengono aggiunte alle opportunità del settore
 */
export const CHALLENGE_OPPORTUNITIES: Record<AuditChallenge, AuditOpportunity> = {
  manual: {
    id: 'challenge-manual',
    titleKey: 'audit.opportunities.taskAutomation.title',
    descriptionKey: 'audit.opportunities.taskAutomation.description',
    relevance: 'high',
  },
  reporting: {
    id: 'challenge-reporting',
    titleKey: 'audit.opportunities.autoReporting.title',
    descriptionKey: 'audit.opportunities.autoReporting.description',
    relevance: 'high',
  },
  data: {
    id: 'challenge-data',
    titleKey: 'audit.opportunities.dataQuality.title',
    descriptionKey: 'audit.opportunities.dataQuality.description',
    relevance: 'high',
  },
  communication: {
    id: 'challenge-communication',
    titleKey: 'audit.opportunities.autoComm.title',
    descriptionKey: 'audit.opportunities.autoComm.description',
    relevance: 'high',
  },
  other: {
    id: 'challenge-other',
    titleKey: 'audit.opportunities.processOptimization.title',
    descriptionKey: 'audit.opportunities.processOptimization.description',
    relevance: 'medium',
  },
};

/**
 * Step dell'audit con relative opzioni
 */
export const AUDIT_STEPS: AuditStep[] = [
  {
    key: 'sector',
    messageKey: 'audit.questions.sector',
    type: 'options',
    options: [
      { id: 'tech', labelKey: 'audit.sectors.tech', value: 'tech', icon: 'tech' },
      { id: 'healthcare', labelKey: 'audit.sectors.healthcare', value: 'healthcare', icon: 'healthcare' },
      { id: 'finance', labelKey: 'audit.sectors.finance', value: 'finance', icon: 'finance' },
      { id: 'retail', labelKey: 'audit.sectors.retail', value: 'retail', icon: 'retail' },
      { id: 'manufacturing', labelKey: 'audit.sectors.manufacturing', value: 'manufacturing', icon: 'manufacturing' },
      { id: 'other', labelKey: 'audit.sectors.other', value: 'other', icon: 'other' },
    ],
  },
  {
    key: 'teamSize',
    messageKey: 'audit.questions.teamSize',
    type: 'options',
    options: [
      { id: 'small', labelKey: 'audit.teamSizes.small', value: '1-5', icon: 'team' },
      { id: 'medium', labelKey: 'audit.teamSizes.medium', value: '6-20', icon: 'team' },
      { id: 'large', labelKey: 'audit.teamSizes.large', value: '21-50', icon: 'team' },
      { id: 'enterprise', labelKey: 'audit.teamSizes.enterprise', value: '50+', icon: 'team' },
    ],
  },
  {
    key: 'challenge',
    messageKey: 'audit.questions.challenge',
    type: 'options',
    options: [
      { id: 'manual', labelKey: 'audit.challenges.manual', value: 'manual', icon: 'challenge' },
      { id: 'reporting', labelKey: 'audit.challenges.reporting', value: 'reporting', icon: 'challenge' },
      { id: 'data', labelKey: 'audit.challenges.data', value: 'data', icon: 'challenge' },
      { id: 'communication', labelKey: 'audit.challenges.communication', value: 'communication', icon: 'challenge' },
      { id: 'other', labelKey: 'audit.challenges.other', value: 'other', icon: 'challenge' },
    ],
  },
  {
    key: 'hoursPerWeek',
    messageKey: 'audit.questions.hours',
    type: 'slider',
    sliderConfig: {
      min: 5,
      max: 40,
      step: 1,
      defaultValue: 15,
    },
  },
];

/**
 * Efficienza standard per calcoli (60% - stima conservativa)
 */
export const EFFICIENCY_RATE = 0.6;

/**
 * Settimane per mese (standard)
 */
export const WEEKS_PER_MONTH = 4;

/**
 * Mesi per anno
 */
export const MONTHS_PER_YEAR = 12;
