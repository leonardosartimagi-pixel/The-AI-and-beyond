'use client';

import { memo } from 'react';

interface DecorativeConnectionsProps {
  /** Preset pattern variant */
  variant?: 'flowing1' | 'flowing2' | 'flowing3' | 'rightSide' | 'horizontal';
  /** Base opacity (0-1) */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
}

// Flowing patterns that cross the page - all different
const patterns: Record<
  string,
  {
    points: { x: number; y: number; size?: number }[];
    lines: { from: { x: number; y: number }; to: { x: number; y: number } }[];
  }
> = {
  // Flows from top-left to bottom-right across page
  flowing1: {
    points: [
      { x: -2, y: 15, size: 3 },
      { x: 18, y: 22, size: 4 },
      { x: 45, y: 18, size: 3.5 },
      { x: 72, y: 35, size: 4 },
      { x: 102, y: 28, size: 3 },
    ],
    lines: [
      { from: { x: -2, y: 15 }, to: { x: 18, y: 22 } },
      { from: { x: 18, y: 22 }, to: { x: 45, y: 18 } },
      { from: { x: 45, y: 18 }, to: { x: 72, y: 35 } },
      { from: { x: 72, y: 35 }, to: { x: 102, y: 28 } },
    ],
  },
  // Flows from bottom-left to top-right
  flowing2: {
    points: [
      { x: -3, y: 78, size: 3.5 },
      { x: 25, y: 65, size: 3 },
      { x: 55, y: 72, size: 4.5 },
      { x: 85, y: 58, size: 3 },
      { x: 103, y: 68, size: 3.5 },
    ],
    lines: [
      { from: { x: -3, y: 78 }, to: { x: 25, y: 65 } },
      { from: { x: 25, y: 65 }, to: { x: 55, y: 72 } },
      { from: { x: 55, y: 72 }, to: { x: 85, y: 58 } },
      { from: { x: 85, y: 58 }, to: { x: 103, y: 68 } },
    ],
  },
  // Diagonal from mid-left to top-right
  flowing3: {
    points: [
      { x: -2, y: 55, size: 4 },
      { x: 30, y: 42, size: 3 },
      { x: 62, y: 48, size: 3.5 },
      { x: 102, y: 35, size: 3 },
    ],
    lines: [
      { from: { x: -2, y: 55 }, to: { x: 30, y: 42 } },
      { from: { x: 30, y: 42 }, to: { x: 62, y: 48 } },
      { from: { x: 62, y: 48 }, to: { x: 102, y: 35 } },
    ],
  },
  // Right side vertical flow with branches
  rightSide: {
    points: [
      { x: 75, y: 8, size: 3 },
      { x: 88, y: 20, size: 4 },
      { x: 82, y: 45, size: 3.5 },
      { x: 92, y: 65, size: 4 },
      { x: 78, y: 85, size: 3 },
      { x: 95, y: 95, size: 3.5 },
    ],
    lines: [
      { from: { x: 75, y: 8 }, to: { x: 88, y: 20 } },
      { from: { x: 88, y: 20 }, to: { x: 82, y: 45 } },
      { from: { x: 82, y: 45 }, to: { x: 92, y: 65 } },
      { from: { x: 92, y: 65 }, to: { x: 78, y: 85 } },
      { from: { x: 78, y: 85 }, to: { x: 95, y: 95 } },
    ],
  },
  // Horizontal flow from left to right - for crossing behind video
  horizontal: {
    points: [
      { x: -3, y: 48, size: 4 },
      { x: 18, y: 52, size: 3 },
      { x: 38, y: 46, size: 3.5 },
      { x: 58, y: 54, size: 4 },
      { x: 78, y: 50, size: 3 },
      { x: 103, y: 52, size: 3.5 },
    ],
    lines: [
      { from: { x: -3, y: 48 }, to: { x: 18, y: 52 } },
      { from: { x: 18, y: 52 }, to: { x: 38, y: 46 } },
      { from: { x: 38, y: 46 }, to: { x: 58, y: 54 } },
      { from: { x: 58, y: 54 }, to: { x: 78, y: 50 } },
      { from: { x: 78, y: 50 }, to: { x: 103, y: 52 } },
    ],
  },
};

export const DecorativeConnections = memo(function DecorativeConnections({
  variant = 'flowing1',
  opacity = 0.25,
  className = '',
}: DecorativeConnectionsProps) {
  const pattern = patterns[variant];

  if (!pattern) return null;

  // Brand blue colors
  const primaryBlue = '#1177bd';
  const lightBlue = '#00aeef';

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <defs>
          <linearGradient
            id={`line-grad-${variant}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={lightBlue} stopOpacity="0.3" />
            <stop offset="50%" stopColor={primaryBlue} stopOpacity="0.9" />
            <stop offset="100%" stopColor={lightBlue} stopOpacity="0.3" />
          </linearGradient>

          <filter
            id={`glow-${variant}`}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {pattern.lines.map((line, index) => (
          <line
            key={`line-${index}`}
            x1={`${line.from.x}%`}
            y1={`${line.from.y}%`}
            x2={`${line.to.x}%`}
            y2={`${line.to.y}%`}
            stroke={`url(#line-grad-${variant})`}
            strokeWidth="0.08"
            strokeLinecap="round"
          />
        ))}

        {/* Nodes with glow */}
        {pattern.points.map((point, index) => (
          <g key={`point-${index}`} filter={`url(#glow-${variant})`}>
            <circle
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r={(point.size || 3) * 0.12}
              fill="none"
              stroke={lightBlue}
              strokeWidth="0.03"
              strokeOpacity="0.7"
            />
            <circle
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r={(point.size || 3) * 0.06}
              fill={primaryBlue}
            />
          </g>
        ))}
      </svg>
    </div>
  );
});

// For sections - combines multiple flowing patterns
interface SectionDecorationsProps {
  decorations?: Array<
    'flowing1' | 'flowing2' | 'flowing3' | 'rightSide' | 'horizontal'
  >;
  opacity?: number;
}

export const SectionDecorations = memo(function SectionDecorations({
  decorations = ['flowing1'],
  opacity = 0.35,
}: SectionDecorationsProps) {
  return (
    <>
      {decorations.map((variant) => (
        <DecorativeConnections
          key={variant}
          variant={variant}
          opacity={opacity}
        />
      ))}
    </>
  );
});
