'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { CountUpNumber } from '@/components/effects';
import { SectionHeader, SectionWrapper } from '@/components/ui';
import { createCardVariants } from '@/lib/animation-variants';

interface StatsProps {
  className?: string;
}

interface StatItem {
  key: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    key: 'projects',
    value: 15,
    suffix: '+',
    icon: (
      <svg
        className="h-full w-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    key: 'hours',
    value: 500,
    suffix: '+',
    icon: (
      <svg
        className="h-full w-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: 'satisfaction',
    value: 100,
    suffix: '%',
    icon: (
      <svg
        className="h-full w-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      </svg>
    ),
  },
  {
    key: 'technologies',
    value: 20,
    suffix: '+',
    icon: (
      <svg
        className="h-full w-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
];

function StatCard({
  stat,
  index,
  isInView,
  prefersReducedMotion,
  t,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'stats'>>;
}) {
  const cardVariants = createCardVariants(prefersReducedMotion, index, {
    scale: 0.95,
  });

  // Determine card size based on index for bento effect
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      className={`group relative ${isLarge ? 'sm:col-span-2 lg:col-span-1' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-accent/10 dark:border-gray-800 dark:bg-gray-950 lg:p-8">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Icon */}
        <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent">
          <div className="h-6 w-6">{stat.icon}</div>
        </div>

        {/* Number */}
        <div className="relative mb-2">
          <CountUpNumber
            value={stat.value}
            suffix={stat.suffix}
            duration={2}
            delay={index * 0.2}
            className="text-4xl font-bold text-primary dark:text-gray-100 lg:text-5xl"
          />
        </div>

        {/* Label */}
        <p className="relative text-base font-medium text-gray-600 dark:text-gray-400">
          {t(`items.${stat.key}.label`)}
        </p>

        {/* Description */}
        <p className="relative mt-1 text-sm text-gray-500 dark:text-gray-500">
          {t(`items.${stat.key}.description`)}
        </p>

        {/* Decorative corner */}
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-all group-hover:bg-accent/10" />
      </div>
    </motion.div>
  );
}

export function Stats({ className = '' }: StatsProps) {
  const t = useTranslations('stats');
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper
      id="stats"
      ariaLabel={t('label')}
      className={className}
      decorations={
        <>
          <div
            className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />
        </>
      }
    >
      {({ isInView }) => (
        <>
          {/* Section header */}
          <SectionHeader
            label={t('label')}
            title={t('title')}
            titleAccent={t('titleAccent')}
            description={t('description')}
            isInView={isInView}
          />

          {/* Stats grid - Bento-style */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.key}
                stat={stat}
                index={index}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                t={t}
              />
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
