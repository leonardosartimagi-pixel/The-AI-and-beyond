'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import type { AuditReport } from '@/lib/audit';
import {
  formatCurrency,
  formatHours,
  formatPercentage,
  generateReportText,
  WEEKS_PER_MONTH,
} from '@/lib/audit';

interface AuditReportCardProps {
  report: AuditReport;
  onClose?: () => void;
  onContact?: () => void;
}

/**
 * AuditReportCard - Mostra il report audit brandizzato
 *
 * Features:
 * - Design brandizzato con colori The AI and Beyond
 * - Calcolo trasparente step-by-step
 * - Disclaimer sempre visibili
 * - Copia testo report
 * - Download PDF brandizzato
 * - CTA per contatto
 */
export function AuditReportCard({
  report,
  onClose,
  onContact,
}: AuditReportCardProps) {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const reportRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const { userData, roiCalculation, opportunities, auditCode } = report;
  const locale = report.locale;

  /**
   * Copia report come testo
   */
  const handleCopyReport = useCallback(async () => {
    try {
      const text = generateReportText(report, (key, values) => {
        try {
          return t(key, values);
        } catch {
          return key;
        }
      });
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy report:', error);
    }
  }, [report, t]);

  /**
   * Scarica report come PDF
   */
  const handleDownloadPDF = useCallback(async () => {
    if (!reportRef.current) return;

    setDownloading(true);

    try {
      // Dynamic import per ridurre bundle size
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        // @ts-expect-error - html2canvas removed while AICore is disabled
        import('html2canvas'),
        // @ts-expect-error - jspdf removed while AICore is disabled
        import('jspdf'),
      ]);

      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      // Cattura il report come immagine
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });

      // Crea PDF A4
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');

      // Header brandizzato
      pdf.setFillColor(27, 47, 117); // primary color
      pdf.rect(0, 0, 210, 25, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('THE AI AND BEYOND', 15, 15);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(t('audit.report.header'), 15, 21);

      // Aggiungi immagine del report
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 30, imgWidth - 20, imgHeight - 20);

      // Footer con disclaimer
      const footerY = Math.min(imgHeight + 35, pageHeight - 20);
      pdf.setFillColor(245, 245, 245);
      pdf.rect(0, footerY, 210, 25, 'F');
      pdf.setTextColor(100, 100, 100);
      pdf.setFontSize(8);
      const disclaimer = t('audit.report.disclaimer');
      const splitDisclaimer = pdf.splitTextToSize(disclaimer, 180);
      pdf.text(splitDisclaimer, 15, footerY + 8);

      // Codice audit e data
      pdf.setFontSize(9);
      pdf.setTextColor(27, 47, 117);
      pdf.text(`${t('audit.report.code')}: ${auditCode}`, 15, footerY + 20);
      pdf.text(
        new Date().toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-US'),
        180,
        footerY + 20
      );

      // Salva
      pdf.save(`AI-Audit-${auditCode}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setDownloading(false);
    }
  }, [auditCode, locale, t]);

  /**
   * Scroll al form contatti
   */
  const handleContact = useCallback(() => {
    if (onContact) {
      onContact();
    } else {
      const contactSection = document.getElementById('contatti');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose?.();
  }, [onContact, onClose]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
  };

  return (
    <motion.div
      ref={reportRef}
      className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header brandizzato */}
      <motion.div
        className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4 text-white"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold">
              {t('audit.report.header')}
            </h3>
            <p className="text-sm text-white/80">
              {t('audit.report.code')}: {auditCode}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contenuto */}
      <div className="space-y-4 p-6">
        {/* I tuoi dati */}
        <motion.div
          className="rounded-xl bg-gray-50 p-4"
          variants={itemVariants}
        >
          <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-primary">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs">
              1
            </span>
            {t('audit.report.yourData')}
          </h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>
              <span className="font-medium">{t('audit.report.sector')}:</span>{' '}
              {t(`audit.sectors.${userData.sector}`)}
            </li>
            <li>
              <span className="font-medium">{t('audit.report.teamSize')}:</span>{' '}
              {userData.teamSize} {t('audit.report.people')}
            </li>
            <li>
              <span className="font-medium">
                {t('audit.report.challenge')}:
              </span>{' '}
              {t(`audit.challenges.${userData.challenge}`)}
            </li>
            <li>
              <span className="font-medium">
                {t('audit.report.hoursWeek')}:
              </span>{' '}
              {userData.hoursPerWeek}h
            </li>
          </ul>
        </motion.div>

        {/* Calcolo trasparente */}
        <motion.div
          className="rounded-xl border border-accent/20 bg-accent/5 p-4"
          variants={itemVariants}
        >
          <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-primary">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs text-accent-dark">
              2
            </span>
            {t('audit.report.calculation')}
          </h4>
          <div className="space-y-2 font-mono text-xs text-gray-700">
            <p>
              {userData.hoursPerWeek}h/sett × {WEEKS_PER_MONTH} sett ={' '}
              <span className="font-semibold">
                {roiCalculation.hoursPerMonth}h/mese
              </span>
            </p>
            <p>
              {roiCalculation.hoursPerMonth}h ×{' '}
              {formatPercentage(roiCalculation.efficiencyRate)} ={' '}
              <span className="font-semibold text-accent-dark">
                {roiCalculation.hoursSavedPerMonth}h {t('audit.report.saved')}
                /mese
              </span>
            </p>
            <p>
              {roiCalculation.hoursSavedPerMonth}h × 12 ={' '}
              <span className="font-semibold text-accent-dark">
                {formatHours(roiCalculation.hoursSavedPerYear, locale)}h/anno
              </span>
            </p>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            * {t('audit.report.efficiencyNote')}
          </p>
        </motion.div>

        {/* Risparmio ipotetico */}
        <motion.div
          className="rounded-xl bg-gradient-to-br from-accent/10 to-emerald-50 p-4"
          variants={itemVariants}
        >
          <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-primary">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
              3
            </span>
            {t('audit.report.hypotheticalSavings')}
          </h4>
          <p className="mb-2 text-xs text-gray-600">
            {t('audit.report.atRate', {
              rate: roiCalculation.hourlyRate,
              sector: t(`audit.sectors.${userData.sector}`),
            })}
            :
          </p>
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-2xl font-bold text-emerald-700">
              ~{formatCurrency(roiCalculation.monthlySavings, locale)}/mese
            </span>
            <span className="text-sm text-gray-500">|</span>
            <span className="font-heading text-lg font-semibold text-emerald-600">
              ~{formatCurrency(roiCalculation.annualSavings, locale)}/anno
            </span>
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-2">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-xs text-amber-800">
              {t('audit.report.hypotheticalWarning')}
            </p>
          </div>
        </motion.div>

        {/* Opportunità */}
        <motion.div
          className="rounded-xl bg-gray-50 p-4"
          variants={itemVariants}
        >
          <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-primary">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs">
              4
            </span>
            {t('audit.report.opportunities')}
          </h4>
          <ul className="space-y-2">
            {opportunities.map((opp, index) => (
              <li key={opp.id} className="flex items-start gap-2">
                <span
                  className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                    opp.relevance === 'high'
                      ? 'bg-emerald-500'
                      : opp.relevance === 'medium'
                        ? 'bg-amber-500'
                        : 'bg-gray-400'
                  }`}
                />
                <span className="text-sm text-gray-700">{t(opp.titleKey)}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Prossimo passo */}
        <motion.div
          className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4"
          variants={itemVariants}
        >
          <h4 className="mb-2 font-heading text-sm font-semibold text-primary">
            {t('audit.report.nextStepTitle')}
          </h4>
          <p className="text-sm italic text-gray-700">
            "{t(report.nextStepKey)}"
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="text-center text-xs text-gray-400"
          variants={itemVariants}
        >
          {t('audit.report.disclaimerShort')}
        </motion.p>
      </div>

      {/* Azioni */}
      <motion.div
        className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 p-4"
        variants={itemVariants}
      >
        <div className="flex gap-2">
          <button
            onClick={handleCopyReport}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copied ? (
              <>
                <svg
                  className="h-4 w-4 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t('audit.actions.copied')}
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
                {t('audit.actions.copy')}
              </>
            )}
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            {downloading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t('audit.actions.generating')}
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                {t('audit.actions.downloadPDF')}
              </>
            )}
          </button>
        </div>
        <button
          onClick={handleContact}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <span>{t('audit.actions.contact')}</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
