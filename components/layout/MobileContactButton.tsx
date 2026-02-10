'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollTo, useReducedMotion } from '@/hooks';

export function MobileContactButton() {
  const t = useTranslations('mobileContact');
  const [isVisible, setIsVisible] = useState(false);
  const [isNearContact, setIsNearContact] = useState(false);
  const scrollTo = useScrollTo();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const contactSection = document.getElementById('contatti');

      // Show button after scrolling past hero section (300px)
      setIsVisible(scrollY > 300);

      // Hide button when near the contact section
      if (contactSection) {
        const contactTop = contactSection.offsetTop;
        const contactBottom = contactTop + contactSection.offsetHeight;
        const viewportBottom = scrollY + windowHeight;

        // Hide when contact section is 200px or less from viewport bottom
        // or when we're inside the contact section
        const isNear =
          viewportBottom >= contactTop - 200 && scrollY <= contactBottom;
        setIsNearContact(isNear);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    scrollTo('contatti');
  };

  const shouldShow = isVisible && !isNearContact;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: 0.9 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
          onClick={handleClick}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,1.5rem))] right-6 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-primary-dark shadow-lg transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden"
          aria-label={t('label')}
        >
          <MessageIcon className="h-5 w-5" />
          <span>{t('label')}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
