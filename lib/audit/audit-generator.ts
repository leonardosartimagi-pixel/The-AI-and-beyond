/**
 * Audit Generator - Genera report personalizzati client-side
 *
 * PRINCIPI:
 * - Tutti i numeri derivano dagli input dell'utente
 * - Calcoli trasparenti e verificabili
 * - Nessun riferimento a progetti/clienti specifici
 * - Tutto etichettato come "ipotesi"
 */

import type {
  AuditData,
  AuditReport,
  AuditROICalculation,
  AuditOpportunity,
  AuditSector,
  AuditChallenge,
  AuditTeamSize,
} from './audit-types';

import {
  SECTOR_CONFIGS,
  CHALLENGE_OPPORTUNITIES,
  EFFICIENCY_RATE,
  WEEKS_PER_MONTH,
  MONTHS_PER_YEAR,
} from './audit-knowledge';

/**
 * Genera un codice audit univoco
 * Formato: XX-YYYY-ZZZ (settore-timestamp-random)
 */
export function generateAuditCode(sector: AuditSector): string {
  const sectorPrefix = sector.slice(0, 2).toUpperCase();
  const timestamp = Date.now().toString(36).slice(-4).toUpperCase();
  const random = Math.random().toString(36).slice(-3).toUpperCase();
  return `${sectorPrefix}-${timestamp}-${random}`;
}

/**
 * Calcola il ROI in modo trasparente
 * Formula visibile all'utente nel report
 */
export function calculateROI(
  hoursPerWeek: number,
  sector: AuditSector
): AuditROICalculation {
  const sectorConfig = SECTOR_CONFIGS[sector];
  const hourlyRate = sectorConfig.defaultHourlyRate;

  // Calcoli step-by-step (mostrati all'utente)
  const hoursPerMonth = hoursPerWeek * WEEKS_PER_MONTH;
  const hoursSavedPerMonth = Math.round(hoursPerMonth * EFFICIENCY_RATE);
  const hoursSavedPerYear = hoursSavedPerMonth * MONTHS_PER_YEAR;

  const monthlySavings = hoursSavedPerMonth * hourlyRate;
  const annualSavings = hoursSavedPerYear * hourlyRate;

  return {
    hoursPerWeek,
    hoursPerMonth,
    efficiencyRate: EFFICIENCY_RATE,
    hoursSavedPerMonth,
    hoursSavedPerYear,
    hourlyRate,
    monthlySavings,
    annualSavings,
  };
}

/**
 * Seleziona le opportunità rilevanti
 * Combina: opportunità settore + opportunità sfida
 * Max 3 opportunità per non sovraccaricare
 */
export function selectOpportunities(
  sector: AuditSector,
  challenge: AuditChallenge
): AuditOpportunity[] {
  const sectorConfig = SECTOR_CONFIGS[sector];
  const challengeOpportunity = CHALLENGE_OPPORTUNITIES[challenge];

  // Prendi le prime 2 opportunità del settore (alta rilevanza prima)
  const sectorOpportunities = [...sectorConfig.opportunities]
    .sort((a, b) => {
      const relevanceOrder = { high: 0, medium: 1, low: 2 };
      return relevanceOrder[a.relevance] - relevanceOrder[b.relevance];
    })
    .slice(0, 2);

  // Aggiungi l'opportunità basata sulla sfida
  const opportunities: AuditOpportunity[] = [
    challengeOpportunity, // Prima la sfida specifica (più rilevante)
    ...sectorOpportunities,
  ];

  // Rimuovi duplicati per ID (mantieni il primo)
  const uniqueOpportunities = opportunities.filter(
    (opp, index, self) => self.findIndex((o) => o.id === opp.id) === index
  );

  return uniqueOpportunities.slice(0, 3);
}

/**
 * Genera il report audit completo
 */
export function generateAuditReport(
  data: AuditData,
  locale: 'it' | 'en' = 'it'
): AuditReport {
  // Valori di default per dati mancanti
  const sector: AuditSector = data.sector || 'other';
  const teamSize: AuditTeamSize = data.teamSize || '6-20';
  const challenge: AuditChallenge = data.challenge || 'manual';
  const hoursPerWeek = data.hoursPerWeek || 15;

  // Genera codice univoco
  const auditCode = generateAuditCode(sector);

  // Calcola ROI
  const roiCalculation = calculateROI(hoursPerWeek, sector);

  // Seleziona opportunità
  const opportunities = selectOpportunities(sector, challenge);

  // Determina il messaggio finale basato sulla dimensione del team
  const nextStepKey = getNextStepKey(teamSize);

  return {
    auditCode,
    generatedAt: new Date(),
    locale,
    userData: {
      sector,
      teamSize,
      challenge,
      hoursPerWeek,
    },
    roiCalculation,
    opportunities,
    nextStepKey,
  };
}

/**
 * Determina il messaggio finale basato sul contesto
 */
function getNextStepKey(teamSize: AuditTeamSize): string {
  // Per team piccoli: approccio più personale
  if (teamSize === '1-5') {
    return 'audit.nextStep.small';
  }
  // Per team medi: focus su scalabilità
  if (teamSize === '6-20' || teamSize === '21-50') {
    return 'audit.nextStep.medium';
  }
  // Per enterprise: focus su ROI e integrazione
  return 'audit.nextStep.enterprise';
}

/**
 * Formatta valuta per display
 */
export function formatCurrency(value: number, locale: 'it' | 'en' = 'it'): string {
  return new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formatta ore per display
 */
export function formatHours(value: number, locale: 'it' | 'en' = 'it'): string {
  return Math.round(value).toLocaleString(locale === 'it' ? 'it-IT' : 'en-US');
}

/**
 * Formatta percentuale per display
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/**
 * Genera testo report per copia/PDF
 */
export function generateReportText(
  report: AuditReport,
  t: (key: string, values?: Record<string, string | number>) => string
): string {
  const { userData, roiCalculation, opportunities, auditCode } = report;
  const locale = report.locale;

  const lines = [
    '═══════════════════════════════════════════════',
    t('audit.report.header'),
    `${t('audit.report.code')}: ${auditCode}`,
    '═══════════════════════════════════════════════',
    '',
    `▸ ${t('audit.report.yourData')}`,
    `  ${t('audit.report.sector')}: ${t(`audit.sectors.${userData.sector}`)}`,
    `  ${t('audit.report.teamSize')}: ${userData.teamSize} ${t('audit.report.people')}`,
    `  ${t('audit.report.challenge')}: ${t(`audit.challenges.${userData.challenge}`)}`,
    `  ${t('audit.report.hoursWeek')}: ${userData.hoursPerWeek}h`,
    '',
    '───────────────────────────────────────────────',
    '',
    `▸ ${t('audit.report.calculation')}`,
    '',
    `  ${userData.hoursPerWeek}h/sett × ${WEEKS_PER_MONTH} sett = ${roiCalculation.hoursPerMonth}h/mese`,
    `  ${roiCalculation.hoursPerMonth}h × ${formatPercentage(EFFICIENCY_RATE)} = ${roiCalculation.hoursSavedPerMonth}h ${t('audit.report.saved')}/mese`,
    `  ${roiCalculation.hoursSavedPerMonth}h × 12 mesi = ${roiCalculation.hoursSavedPerYear}h/anno`,
    '',
    `  * ${t('audit.report.efficiencyNote')}`,
    '',
    '───────────────────────────────────────────────',
    '',
    `▸ ${t('audit.report.hypotheticalSavings')}`,
    '',
    `  ${t('audit.report.atRate', { rate: roiCalculation.hourlyRate, sector: t(`audit.sectors.${userData.sector}`) })}:`,
    `  ~${formatCurrency(roiCalculation.monthlySavings, locale)}/mese | ~${formatCurrency(roiCalculation.annualSavings, locale)}/anno`,
    '',
    `  ⚠️ ${t('audit.report.hypotheticalWarning')}`,
    '',
    '───────────────────────────────────────────────',
    '',
    `▸ ${t('audit.report.opportunities')}`,
    '',
    ...opportunities.map(
      (opp) => `  • ${t(opp.titleKey)}`
    ),
    '',
    '───────────────────────────────────────────────',
    '',
    `▸ ${t('audit.report.nextStep')}`,
    '',
    `  "${t(report.nextStepKey)}"`,
    '',
    '═══════════════════════════════════════════════',
    '',
    t('audit.report.disclaimer'),
    '',
    '═══════════════════════════════════════════════',
  ];

  return lines.join('\n');
}
