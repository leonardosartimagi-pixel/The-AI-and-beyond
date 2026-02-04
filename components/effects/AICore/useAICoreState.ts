'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export type SectionType = 'hero' | 'about' | 'services' | 'portfolio' | 'contact' | 'other';

export interface IntensityConfig {
  orbitSpeed: number;
  glowOpacity: number;
  pulseScale: number;
  particleSpeed: number;
}

export interface AICoreState {
  currentSection: SectionType;
  intensity: IntensityConfig;
  isHovered: boolean;
  isNearCursor: boolean;
  mousePosition: { x: number; y: number };
}

const INTENSITY_CONFIG: Record<SectionType, IntensityConfig> = {
  hero: { orbitSpeed: 12, glowOpacity: 0.3, pulseScale: 1.03, particleSpeed: 15 },
  about: { orbitSpeed: 10, glowOpacity: 0.35, pulseScale: 1.04, particleSpeed: 12 },
  services: { orbitSpeed: 7, glowOpacity: 0.45, pulseScale: 1.05, particleSpeed: 10 },
  portfolio: { orbitSpeed: 5, glowOpacity: 0.55, pulseScale: 1.06, particleSpeed: 8 },
  contact: { orbitSpeed: 6, glowOpacity: 0.7, pulseScale: 1.08, particleSpeed: 7 },
  other: { orbitSpeed: 10, glowOpacity: 0.35, pulseScale: 1.04, particleSpeed: 12 },
};

const SECTION_IDS: SectionType[] = ['hero', 'about', 'services', 'portfolio', 'contact'];

export function useAICoreState() {
  const [currentSection, setCurrentSection] = useState<SectionType>('hero');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Detect current section based on scroll position
  useEffect(() => {
    const detectSection = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      for (const sectionId of SECTION_IDS) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;
          const sectionBottom = sectionTop + rect.height;

          // Check if section is in the middle of viewport
          const viewportMiddle = scrollY + viewportHeight / 2;
          if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
            setCurrentSection(sectionId);
            return;
          }
        }
      }
      setCurrentSection('other');
    };

    detectSection();
    window.addEventListener('scroll', detectSection, { passive: true });
    return () => window.removeEventListener('scroll', detectSection);
  }, []);

  // Track mouse position (throttled)
  useEffect(() => {
    let frameId: number;
    let lastUpdate = 0;
    const THROTTLE_MS = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < THROTTLE_MS) return;

      lastUpdate = now;
      frameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const intensity = useMemo(
    () => INTENSITY_CONFIG[currentSection],
    [currentSection]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    currentSection,
    intensity,
    isHovered,
    mousePosition,
    handleMouseEnter,
    handleMouseLeave,
  };
}
