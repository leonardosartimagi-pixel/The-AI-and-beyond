/**
 * Audit Module - Barrel exports
 */

// Types
export type {
  AuditSector,
  AuditTeamSize,
  AuditChallenge,
  AuditData,
  AuditOpportunity,
  AuditROICalculation,
  AuditReport,
  SectorConfig,
  AuditStep,
  AuditStepOption,
} from './audit-types';

// Knowledge base
export {
  SECTOR_CONFIGS,
  CHALLENGE_OPPORTUNITIES,
  AUDIT_STEPS,
  EFFICIENCY_RATE,
  WEEKS_PER_MONTH,
  MONTHS_PER_YEAR,
} from './audit-knowledge';

// Generator functions
export {
  generateAuditCode,
  calculateROI,
  selectOpportunities,
  generateAuditReport,
  formatCurrency,
  formatHours,
  formatPercentage,
  generateReportText,
} from './audit-generator';
