'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Form input bounds (re-exported for tests/consumers)
export const MIN_HOURS_PER_WEEK = 1;
export const MAX_HOURS_PER_WEEK = 40;
export const MIN_HOURLY_RATE = 1;
export const MAX_HOURLY_RATE = 500;

export interface TaskType {
  id: string;
  key: string;
  multiplier: number;
}

export const taskTypes: TaskType[] = [
  { id: 'data-entry', key: 'dataEntry', multiplier: 1.2 },
  { id: 'reporting', key: 'reporting', multiplier: 1.0 },
  { id: 'communications', key: 'communication', multiplier: 0.8 },
  { id: 'document-management', key: 'documentManagement', multiplier: 1.1 },
  { id: 'coordination', key: 'coordination', multiplier: 0.7 },
  { id: 'other', key: 'other', multiplier: 0.9 },
];

interface ROIInputCardProps {
  hoursPerWeek: number;
  onHoursChange: (hours: number) => void;
  hourlyRate: number;
  onHourlyRateChange: (rate: number) => void;
  useHourlyRate: boolean;
  onUseHourlyRateChange: (use: boolean) => void;
  selectedTaskType: TaskType;
  onTaskTypeChange: (taskType: TaskType) => void;
  prefersReducedMotion: boolean;
  isInView: boolean;
  variants: Variants;
}

export function ROIInputCard({
  hoursPerWeek,
  onHoursChange,
  hourlyRate,
  onHourlyRateChange,
  useHourlyRate,
  onUseHourlyRateChange,
  selectedTaskType,
  onTaskTypeChange,
  prefersReducedMotion,
  isInView,
  variants,
}: ROIInputCardProps) {
  const t = useTranslations('roiCalculator');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <h3 className="mb-6 flex items-center gap-3 font-heading text-xl font-bold text-primary">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </span>
        {t('inputTitle')}
      </h3>

      <div className="space-y-6">
        {/* Hours per week slider */}
        <div>
          <label
            htmlFor="hours-slider"
            className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700"
          >
            <span>{t('hoursLabel')}</span>
            <span className="rounded-lg bg-primary/10 px-3 py-1 font-heading text-lg font-bold text-primary">
              {hoursPerWeek}h
            </span>
          </label>
          <input
            id="hours-slider"
            type="range"
            min={MIN_HOURS_PER_WEEK}
            max={MAX_HOURS_PER_WEEK}
            value={hoursPerWeek}
            onChange={(e) => onHoursChange(Number(e.target.value))}
            className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-accent [&::-moz-range-thumb]:h-[44px] [&::-moz-range-thumb]:w-[44px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-[44px] [&::-webkit-slider-thumb]:w-[44px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            aria-valuemin={MIN_HOURS_PER_WEEK}
            aria-valuemax={MAX_HOURS_PER_WEEK}
            aria-valuenow={hoursPerWeek}
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>{MIN_HOURS_PER_WEEK}h</span>
            <span>{MAX_HOURS_PER_WEEK}h</span>
          </div>
        </div>

        {/* Task type dropdown */}
        <div ref={dropdownRef} className="relative">
          <label
            htmlFor="task-type"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {t('taskTypeLabel')}
          </label>
          <button
            id="task-type"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-all hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          >
            <div>
              <span className="block font-medium text-gray-900">
                {t(`taskTypes.${selectedTaskType.key}`)}
              </span>
            </div>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul
              className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"
              role="listbox"
              aria-label={t('taskTypeLabel')}
            >
              {taskTypes.map((type) => (
                <li key={type.id}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                      selectedTaskType.id === type.id ? 'bg-accent/5' : ''
                    }`}
                    onClick={() => {
                      onTaskTypeChange(type);
                      setIsDropdownOpen(false);
                    }}
                    role="option"
                    aria-selected={selectedTaskType.id === type.id}
                  >
                    <div>
                      <span className="block font-medium text-gray-900">
                        {t(`taskTypes.${type.key}`)}
                      </span>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      ×{type.multiplier}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hourly rate toggle and input */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="hourly-rate-toggle"
              className="text-sm font-medium text-gray-700"
            >
              {t('hourlyRateLabel')}
            </label>
            <button
              id="hourly-rate-toggle"
              type="button"
              onClick={() => onUseHourlyRateChange(!useHourlyRate)}
              className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                useHourlyRate ? 'bg-accent' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={useHourlyRate}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  useHourlyRate ? 'translate-x-5' : 'translate-x-0'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
          {useHourlyRate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  €
                </span>
                <input
                  type="number"
                  min={MIN_HOURLY_RATE}
                  max={MAX_HOURLY_RATE}
                  value={hourlyRate}
                  onChange={(e) =>
                    onHourlyRateChange(
                      Math.max(
                        MIN_HOURLY_RATE,
                        Math.min(MAX_HOURLY_RATE, Number(e.target.value))
                      )
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-16 text-lg font-medium text-gray-900 transition-all hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  aria-label={t('hourlyRateAriaLabel')}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {t('hourlyRateUnit')}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
