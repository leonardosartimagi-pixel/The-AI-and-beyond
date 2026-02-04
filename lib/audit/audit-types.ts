/**
 * Audit Types - Tipi per il sistema AI Audit Express
 */

// Settori supportati
export type AuditSector = 'tech' | 'healthcare' | 'finance' | 'retail' | 'manufacturing' | 'other';

// Dimensioni team
export type AuditTeamSize = '1-5' | '6-20' | '21-50' | '50+';

// Sfide principali
export type AuditChallenge = 'manual' | 'reporting' | 'data' | 'communication' | 'other';

/**
 * Dati raccolti durante l'audit
 */
export interface AuditData {
  sector?: AuditSector;
  teamSize?: AuditTeamSize;
  challenge?: AuditChallenge;
  hoursPerWeek?: number;
}

/**
 * Opportunità AI suggerita
 */
export interface AuditOpportunity {
  id: string;
  titleKey: string; // Chiave i18n
  descriptionKey: string; // Chiave i18n
  relevance: 'high' | 'medium' | 'low';
}

/**
 * Calcolo ROI trasparente
 */
export interface AuditROICalculation {
  hoursPerWeek: number;
  hoursPerMonth: number;
  efficiencyRate: number; // 0.6 = 60%
  hoursSavedPerMonth: number;
  hoursSavedPerYear: number;
  hourlyRate: number;
  monthlySavings: number;
  annualSavings: number;
}

/**
 * Report audit completo
 */
export interface AuditReport {
  // Identificativo
  auditCode: string;
  generatedAt: Date;
  locale: 'it' | 'en';

  // Dati utente (riepilogo)
  userData: Required<AuditData>;

  // Calcoli trasparenti
  roiCalculation: AuditROICalculation;

  // Opportunità suggerite (generiche, no progetti specifici)
  opportunities: AuditOpportunity[];

  // Messaggio finale
  nextStepKey: string; // Chiave i18n
}

/**
 * Configurazione per settore
 */
export interface SectorConfig {
  id: AuditSector;
  labelKey: string;
  defaultHourlyRate: number; // Media settore per calcoli
  opportunities: AuditOpportunity[];
}

/**
 * Step dell'audit
 */
export interface AuditStep {
  key: 'sector' | 'teamSize' | 'challenge' | 'hoursPerWeek';
  messageKey: string;
  type: 'options' | 'slider';
  options?: AuditStepOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
  };
}

/**
 * Opzione per step audit
 */
export interface AuditStepOption {
  id: string;
  labelKey: string;
  value: string;
  icon?: string;
}
