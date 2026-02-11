'use client';

import { motion } from 'framer-motion';

interface ProjectMockupProps {
  category: string;
  projectKey: string;
  className?: string;
}

// Project-specific gradients and icons (keyed by projectKey for locale independence)
const PROJECT_STYLES: Record<string, { gradient: string; icon: JSX.Element }> =
  {
    consulting: {
      gradient: 'from-orange-500/20 via-amber-500/10 to-yellow-500/20',
      icon: (
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
    },
    aiStrategy: {
      gradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20',
      icon: (
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3v18h18" />
          <path d="M7 12l4-4 4 4 5-5" />
          <circle cx="7" cy="12" r="1.5" fill="currentColor" />
          <circle cx="11" cy="8" r="1.5" fill="currentColor" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" />
          <circle cx="20" cy="7" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    webdev: {
      gradient: 'from-blue-500/20 via-cyan-500/10 to-teal-500/20',
      icon: (
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
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
    aiAgents: {
      gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
      icon: (
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" />
          <path d="M8 11v1a4 4 0 008 0v-1" />
          <path d="M12 16v6" />
          <path d="M8 22h8" />
          <circle cx="9" cy="6" r="0.5" fill="currentColor" />
          <circle cx="15" cy="6" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    prototyping: {
      gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
      icon: (
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
          <path d="M13 13h4M13 17h4" />
        </svg>
      ),
    },
    pmLogistics: {
      gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
      icon: (
        <svg
          className="h-full w-full"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  };

const DEFAULT_STYLE = {
  gradient: 'from-primary/20 via-primary/10 to-accent/20',
  icon: (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
};

export function ProjectMockup({
  projectKey,
  className = '',
}: ProjectMockupProps) {
  const style = PROJECT_STYLES[projectKey] || DEFAULT_STYLE;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(17, 119, 189, 0.3) 0%, transparent 50%),
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

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Central icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 text-primary/30 dark:text-white/20">
          {style.icon}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-accent/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-primary/10 to-transparent" />
    </div>
  );
}
