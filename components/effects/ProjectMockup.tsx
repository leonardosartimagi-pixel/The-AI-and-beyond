'use client';

import { motion } from 'framer-motion';

interface ProjectMockupProps {
  category: string;
  projectKey: string;
  isFeatured?: boolean;
  className?: string;
}

// Category-specific gradients and icons
const CATEGORY_STYLES: Record<string, { gradient: string; icon: JSX.Element }> = {
  'Web Application': {
    gradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="7" x2="22" y2="7" />
        <circle cx="5" cy="5" r="0.5" fill="currentColor" />
        <circle cx="7.5" cy="5" r="0.5" fill="currentColor" />
        <circle cx="10" cy="5" r="0.5" fill="currentColor" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  'Data Analysis': {
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M7 12l4-4 4 4 5-5" />
        <circle cx="7" cy="12" r="1.5" fill="currentColor" />
        <circle cx="11" cy="8" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <circle cx="20" cy="7" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  Automation: {
    gradient: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  'AI Development': {
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" />
        <path d="M8 11v1a4 4 0 008 0v-1" />
        <path d="M12 16v6" />
        <path d="M8 22h8" />
        <circle cx="9" cy="6" r="0.5" fill="currentColor" />
        <circle cx="15" cy="6" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  Healthcare: {
    gradient: 'from-rose-500/20 via-pink-500/10 to-red-500/20',
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
};

const DEFAULT_STYLE = {
  gradient: 'from-primary/20 via-primary/10 to-accent/20',
  icon: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
};

export function ProjectMockup({
  category,
  projectKey,
  isFeatured = false,
  className = '',
}: ProjectMockupProps) {
  const style = CATEGORY_STYLES[category] || DEFAULT_STYLE;
  const iconSize = isFeatured ? 'w-24 h-24 lg:w-32 lg:h-32' : 'w-16 h-16';

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(19, 125, 197, 0.3) 0%, transparent 50%),
                       radial-gradient(circle at 70% 70%, rgba(0, 174, 239, 0.2) 0%, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Browser frame for featured */}
      {isFeatured && (
        <div className="absolute inset-4 lg:inset-8 rounded-lg border border-white/20 dark:border-gray-700/50 bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm overflow-hidden">
          {/* Browser bar */}
          <div className="h-8 bg-white/20 dark:bg-gray-800/50 flex items-center px-3 gap-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-4 bg-white/10 dark:bg-gray-700/30 rounded-full max-w-xs" />
            </div>
          </div>

          {/* Content area */}
          <div className="p-4 lg:p-6 flex flex-col gap-3">
            {/* Skeleton lines */}
            <div className="h-4 bg-white/20 dark:bg-gray-700/30 rounded w-3/4" />
            <div className="h-3 bg-white/15 dark:bg-gray-700/20 rounded w-full" />
            <div className="h-3 bg-white/15 dark:bg-gray-700/20 rounded w-5/6" />
            <div className="h-3 bg-white/15 dark:bg-gray-700/20 rounded w-2/3" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-16 bg-white/10 dark:bg-gray-700/20 rounded" />
              <div className="h-16 bg-white/10 dark:bg-gray-700/20 rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
          backgroundSize: isFeatured ? '32px 32px' : '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${iconSize} text-primary/30 dark:text-white/20`}>
          {style.icon}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent" />
    </div>
  );
}
