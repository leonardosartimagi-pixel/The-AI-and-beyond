'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { Badge } from '@/components/ui';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: string[];
  imageUrl: string;
}

interface PortfolioProps {
  className?: string;
}

const projects: Project[] = [
  {
    id: 'app-eswbs',
    title: 'App ESWBS',
    category: 'Gestione Industriale',
    description: 'Sistema di gestione manutenzione navale',
    problem:
      'La gestione della manutenzione navale richiedeva processi manuali complessi, con difficoltà nel tracciare lo stato dei componenti e pianificare gli interventi secondo lo standard ESWBS (Expanded Ship Work Breakdown Structure).',
    solution:
      'Ho sviluppato un\'applicazione web che digitalizza l\'intero processo di gestione manutenzione, permettendo di catalogare componenti, pianificare interventi e generare report automatici secondo gli standard navali.',
    results: [
      'Riduzione del 70% nei tempi di pianificazione',
      'Tracciabilità completa degli interventi',
      'Report automatici conformi agli standard',
      'Interfaccia intuitiva per gli operatori',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
    imageUrl: '/images/portfolio/eswbs-placeholder.jpg',
  },
  {
    id: 'analisi-manutenzione',
    title: 'Analisi Dati Manutenzione',
    category: 'Data Analysis',
    description: 'Comparazione schedule di manutenzione IT/EN',
    problem:
      'Due team internazionali (italiano e inglese) utilizzavano schedule di manutenzione con formati e terminologie differenti, rendendo impossibile un confronto efficace e l\'identificazione di discrepanze.',
    solution:
      'Ho creato un sistema di analisi dati che normalizza gli schedule da entrambe le fonti, esegue matching intelligente delle attività e genera report comparativi evidenziando differenze e sovrapposizioni.',
    results: [
      'Identificate 150+ discrepanze nascoste',
      'Processo di riconciliazione automatizzato',
      'Dashboard interattiva per confronti',
      'Export in formati standard condivisibili',
    ],
    technologies: ['Python', 'Pandas', 'Streamlit', 'Excel Integration', 'AI Matching'],
    imageUrl: '/images/portfolio/analysis-placeholder.jpg',
  },
  {
    id: 'web-app-professionisti',
    title: 'Web App Professionisti',
    category: 'Web Development',
    description: 'Sito con sistema di booking integrato',
    problem:
      'Un professionista sanitario gestiva appuntamenti tramite telefonate e messaggi, perdendo tempo prezioso e rischiando doppie prenotazioni o dimenticanze.',
    solution:
      'Ho realizzato un sito web professionale con sistema di booking integrato: i pazienti possono visualizzare disponibilità in tempo reale, prenotare autonomamente e ricevere reminder automatici.',
    results: [
      'Recuperate 5+ ore settimanali',
      'Zero doppie prenotazioni',
      'Reminder automatici via email/SMS',
      'Aumento del 40% nelle prenotazioni online',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Supabase', 'Cal.com', 'Vercel'],
    imageUrl: '/images/portfolio/booking-placeholder.jpg',
  },
  {
    id: 'automazione-email-coaching',
    title: 'Automazione Email Coaching',
    category: 'Automation',
    description: 'Sistema di follow-up automatico per coach',
    problem:
      'Un business coach dedicava ore ogni settimana a inviare email di follow-up personalizzate ai clienti, con il rischio di dimenticare qualcuno o inviare contenuti non pertinenti al loro percorso.',
    solution:
      'Ho implementato un sistema di automazione email che traccia il percorso di ogni cliente, genera contenuti personalizzati con AI e invia follow-up al momento giusto, mantenendo un tono umano e personale.',
    results: [
      'Risparmio di 8 ore settimanali',
      'Tasso di apertura email +35%',
      'Engagement clienti aumentato del 50%',
      'Nessun cliente "dimenticato"',
    ],
    technologies: ['Make.com', 'OpenAI API', 'Notion', 'Gmail API', 'Zapier'],
    imageUrl: '/images/portfolio/automation-placeholder.jpg',
  },
  {
    id: 'assistente-ai-rag',
    title: 'Assistente AI con RAG',
    category: 'AI Development',
    description: 'Prototipo di assistente intelligente aziendale',
    problem:
      'Un\'azienda aveva documentazione tecnica dispersa in centinaia di file, rendendo difficile per il team trovare rapidamente le informazioni necessarie e causando risposte inconsistenti ai clienti.',
    solution:
      'Ho sviluppato un prototipo di assistente AI basato su RAG (Retrieval-Augmented Generation) che indicizza la documentazione aziendale e risponde alle domande in linguaggio naturale, citando le fonti.',
    results: [
      'Risposte in secondi invece che minuti',
      'Accuratezza delle risposte al 95%',
      'Citazioni alle fonti per verificabilità',
      'Riduzione ticket supporto interno del 60%',
    ],
    technologies: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
    imageUrl: '/images/portfolio/rag-placeholder.jpg',
  },
];

interface PortfolioCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
  onOpenModal: (project: Project) => void;
}

function PortfolioCard({
  project,
  index,
  isInView,
  prefersReducedMotion,
  onOpenModal,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 40,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.article
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={() => onOpenModal(project)}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        whileHover={
          prefersReducedMotion
            ? {}
            : {
                scale: 1.02,
                boxShadow:
                  '0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 4px 20px -4px rgba(0, 188, 212, 0.15)',
              }
        }
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        aria-label={`Vedi dettagli progetto: ${project.title}`}
      >
        {/* Image placeholder */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
          {/* Placeholder pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          {/* Category badge overlay */}
          <div className="absolute left-4 top-4">
            <Badge variant="solid" size="sm" animated={false}>
              {project.category}
            </Badge>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-primary/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            <motion.div
              className="flex items-center gap-2 text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="text-sm font-medium">Vedi dettagli</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title */}
          <h3 className="mb-2 font-heading text-xl font-bold text-primary">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
            {project.description}
          </p>

          {/* Technology badges preview */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge
                key={tech}
                variant="default"
                size="sm"
                animated={false}
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline" size="sm" animated={false}>
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent to-accent-light"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          aria-hidden="true"
        />
      </motion.button>
    </motion.article>
  );
}

interface PortfolioModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  prefersReducedMotion: boolean;
}

function PortfolioModal({
  project,
  isOpen,
  onClose,
  prefersReducedMotion,
}: PortfolioModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white shadow-2xl"
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.9,
                y: prefersReducedMotion ? 0 : 20,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.9,
                y: prefersReducedMotion ? 0 : 20,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Chiudi"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image header */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute left-6 top-6">
                  <Badge variant="solid" size="md" animated={false}>
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title */}
                <h2
                  id="modal-title"
                  className="mb-2 font-heading text-2xl font-bold text-primary sm:text-3xl"
                >
                  {project.title}
                </h2>

                {/* Short description */}
                <p className="mb-6 text-lg text-gray-600">
                  {project.description}
                </p>

                {/* Problem section */}
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                    Il Problema
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {project.problem}
                  </p>
                </div>

                {/* Solution section */}
                <div className="mb-6">
                  <h3 className="mb-2 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                      />
                    </svg>
                    La Soluzione
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {project.solution}
                  </p>
                </div>

                {/* Results section */}
                <div className="mb-8">
                  <h3 className="mb-3 flex items-center gap-2 font-heading text-lg font-semibold text-primary">
                    <svg
                      className="h-5 w-5 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                    Risultati
                  </h3>
                  <ul className="space-y-2">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Tecnologie utilizzate
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="primary" size="md" animated={false}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contatti"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-light px-6 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>Parliamo del tuo progetto</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Portfolio({ className = '' }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const headingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        className={`relative overflow-hidden bg-white py-24 lg:py-32 ${className}`}
        aria-label="Portfolio"
      >
        {/* Decorative gradient blur - top right */}
        <div
          className="absolute -right-48 -top-48 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
          aria-hidden="true"
        />

        {/* Decorative gradient blur - bottom left */}
        <div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center lg:mb-20"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Portfolio
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
            </span>

            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Progetti{' '}
              <span className="relative inline-block">
                realizzati
                <span
                  className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-accent to-accent-light"
                  aria-hidden="true"
                />
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
              Ogni progetto è una storia di trasformazione. Scopri come ho
              aiutato aziende e professionisti a ottimizzare i loro processi.
            </p>
          </motion.div>

          {/* Responsive grid - 2 cols desktop, 1 mobile */}
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {projects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio detail modal */}
      <PortfolioModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        prefersReducedMotion={prefersReducedMotion}
      />
    </>
  );
}
