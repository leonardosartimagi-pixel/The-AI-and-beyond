'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { SectionHeader, SectionWrapper } from '@/components/ui';
import { SectionDecorations } from '@/components/effects';
import { ProjectCard } from './ProjectCard';
import { PortfolioModal } from './PortfolioModal';

interface PortfolioProps {
  className?: string;
}

export const PROJECT_KEYS = [
  'consulting',
  'aiStrategy',
  'webdev',
  'aiAgents',
  'prototyping',
  'pmLogistics',
] as const;

export const TECH_STACK = [
  'Python',
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'OpenAI API',
  'LangChain',
  'RAG',
  'Document AI',
  'n8n',
  'API Integration',
  'PostgreSQL',
  'MongoDB',
  'Prisma',
  'Tailwind CSS',
  'Chart.js',
  'Docker',
  'Vercel',
  'AWS',
  'CI/CD',
];

export const PROJECT_MEDIA: Record<
  string,
  { image: string; video: string; videoWebm: string }
> = {
  consulting: {
    image: '/images/portfolio/consulting.webp',
    video: '/videos/portfolio/consulting.mp4',
    videoWebm: '/videos/portfolio/consulting.webm',
  },
  aiStrategy: {
    image: '/images/portfolio/ai-strategy.webp',
    video: '/videos/portfolio/ai-strategy.mp4',
    videoWebm: '/videos/portfolio/ai-strategy.webm',
  },
  webdev: {
    image: '/images/portfolio/webdev.webp',
    video: '/videos/portfolio/webdev.mp4',
    videoWebm: '/videos/portfolio/webdev.webm',
  },
  aiAgents: {
    image: '/images/portfolio/ai-agents.webp',
    video: '/videos/portfolio/ai-agents.mp4',
    videoWebm: '/videos/portfolio/ai-agents.webm',
  },
  prototyping: {
    image: '/images/portfolio/prototyping.webp',
    video: '/videos/portfolio/prototyping.mp4',
    videoWebm: '/videos/portfolio/prototyping.webm',
  },
  pmLogistics: {
    image: '/images/portfolio/pm-logistics.webp',
    video: '/videos/portfolio/pm-logistics.mp4',
    videoWebm: '/videos/portfolio/pm-logistics.webm',
  },
};

export function Portfolio({ className = '' }: PortfolioProps) {
  const t = useTranslations('portfolio');
  const tNav = useTranslations('nav');
  const prefersReducedMotion = useReducedMotion();
  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(
    null
  );
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpenModal = (projectKey: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setSelectedProjectKey(projectKey);
  };

  const handleCloseModal = () => {
    setSelectedProjectKey(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <SectionWrapper
        id="portfolio"
        ariaLabel={t('label')}
        className={className}
        decorations={
          <>
            <SectionDecorations decorations={['rightSide']} opacity={0.4} />
            <div
              className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
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
            >
              {/* Confidentiality notice */}
              <p className="mx-auto mt-4 max-w-2xl text-sm italic text-gray-500 dark:text-gray-500">
                {t('confidentiality')}
              </p>
            </SectionHeader>

            {/* Uniform Grid Layout */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECT_KEYS.map((key) => (
                <ProjectCard
                  key={key}
                  projectKey={key}
                  isInView={isInView}
                  prefersReducedMotion={prefersReducedMotion}
                  onOpenModal={handleOpenModal}
                  t={t}
                />
              ))}
            </div>

            {/* Interaction hint */}
            <motion.p
              className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.8 }}
            >
              {t('hint')}
            </motion.p>

            {/* Technology Stack Showcase */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : prefersReducedMotion ? 0 : 20,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : 0.4,
              }}
            >
              <h3 className="mb-4 font-heading text-xl font-bold text-primary dark:text-gray-100 sm:text-2xl">
                {t('techStack.title')}
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                {t('techStack.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-accent/30 hover:bg-accent/5 hover:text-accent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-accent/40 dark:hover:bg-accent/10 dark:hover:text-accent-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </SectionWrapper>

      <PortfolioModal
        projectKey={selectedProjectKey}
        isOpen={selectedProjectKey !== null}
        onClose={handleCloseModal}
        prefersReducedMotion={prefersReducedMotion}
        t={t}
        tNav={tNav}
      />
    </>
  );
}
