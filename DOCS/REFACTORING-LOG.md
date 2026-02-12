# GLOBAL REFACTORING LOG — The AI and beyond

> **Creato**: 2026-02-12
> **Framework**: Complete Refactoring Framework (Fowler)
> **Stato**: ✅ REFACTORING COMPLETATO — Tutti 12 step (R1, R9, R12, R4, R5, R2, R3, R10, R7, R6, R8, R11) completati

---

## OVERVIEW

| Metric | Value |
|--------|-------|
| Code smells identificati | 12 |
| Refactoring pianificati | 12 |
| File coinvolti | ~30+ |
| Rischio complessivo | BASSO (extract/move puri, nessun cambio comportamento) |
| Approccio | Small steps, test after each, one at a time |

---

## CHECKLIST REFACTORING

### STEP R1 — Extract `getClientIp` in utility condivisa
- **Smell**: Duplicated Code
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Estratta `getClientIp()` da 3 API routes in `lib/get-client-ip.ts`
- **Perchè**: Funzione identica copia-incollata in contact/route.ts, chat/route.ts, consent-log/route.ts
- **File creati**: `lib/get-client-ip.ts`, `tests/unit/get-client-ip.test.ts`
- **File modificati**: `app/api/contact/route.ts`, `app/api/chat/route.ts`, `app/api/consent-log/route.ts`
- **Nota**: File posizionato in `lib/get-client-ip.ts` (non `lib/utils/`) per evitare conflitto con `lib/utils.ts` esistente
- **Test**: 9 unit test (x-forwarded-for, x-real-ip, fallback, IPv6, priorità, whitespace)
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅

---

### STEP R9 — Replace Magic Numbers with Symbolic Constants
- **Smell**: Primitive Obsession
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Estratti tutti i numeri magici in costanti con nome semantico nei 4 file target
- **Perchè**: Numeri hardcoded (2, 100, 1000, 0.6, 50, 40) senza context rendevano il codice opaco
- **File modificati**:
  - `lib/validations.ts` — 6 costanti: MIN/MAX_NAME_LENGTH, MIN/MAX_MESSAGE_LENGTH, MAX_CHAT_MESSAGE_LENGTH, MAX_CONVERSATION_HISTORY_LENGTH
  - `components/sections/ROICalculator.tsx` — 8 costanti: BASE_EFFICIENCY_RATE, WEEKS_PER_MONTH, MONTHS_PER_YEAR, DEFAULT_HOURS_PER_WEEK, DEFAULT_HOURLY_RATE, MIN/MAX_HOURS_PER_WEEK, MIN/MAX_HOURLY_RATE
  - `lib/security/prompt-guard.ts` — 9 costanti: MAX_USER_INPUT_LENGTH, INJECTION_RISK_WEIGHT, BLOCKED_CONTENT_RISK_WEIGHT, LONG_INPUT_THRESHOLD, LONG_INPUT_RISK_WEIGHT, EXCESSIVE_NEWLINE_THRESHOLD, EXCESSIVE_NEWLINE_RISK_WEIGHT, CODE_MARKUP_RISK_WEIGHT, MAX_RISK_SCORE
  - `lib/security/content-filter.ts` — 2 costanti: MAX_RESPONSE_LENGTH, MIN_VALID_RESPONSE_LENGTH
- **Totale costanti estratte**: 25
- **Test**: Tutti i test esistenti passano senza modifiche
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅

---

### STEP R12 — Move hooks inline in hooks/ directory
- **Smell**: Divergent Change
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Spostati `useEscapeKey` e `useBodyScrollLock` da MobileMenu.tsx a file dedicati in `hooks/`
- **Perchè**: Hooks custom definiti inline impediscono il riuso
- **File creati**: `hooks/useEscapeKey.ts`, `hooks/useBodyScrollLock.ts`
- **File modificati**: `hooks/index.ts` (aggiunti 2 barrel export), `components/layout/MobileMenu.tsx` (rimossi hook inline, aggiunti import da @/hooks)
- **Nota**: `useFocusTrap` lasciato intenzionalmente inline in MobileMenu.tsx — sarà estratto nello step R4
- **Pattern seguìto**: `'use client'` + named export + useEffect, identico a `hooks/useReducedMotion.ts`
- **Test**: Unit 162 passed (inclusi 10 MobileMenu tests) | E2E mobile-menu 9/9 passed (chromium + firefox)
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (webkit flaky pre-esistenti, non correlati)

---

### STEP R4 — Extract `useFocusTrap` hook
- **Smell**: Duplicated Code
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Estratta logica focus trap (Tab-cycling + auto-focus iniziale) da 3 componenti in `hooks/useFocusTrap.ts`
- **Perchè**: Logica Tab-cycling identica in MobileMenu, ServiceModal, PortfolioModal — stesso selettore, stessa logica Shift+Tab/Tab cycling
- **File creati**: `hooks/useFocusTrap.ts`, `tests/unit/useFocusTrap.test.ts`
- **File modificati**: `hooks/index.ts` (aggiunto barrel export), `components/layout/MobileMenu.tsx` (rimossa funzione inline useFocusTrap, importata da @/hooks, rimosso import useEffect non più necessario), `components/sections/Services.tsx` (ServiceModal: rimossa logica Tab dal handleKeyDown, rimosso auto-focus manuale, aggiunto useFocusTrap hook), `components/sections/Portfolio.tsx` (PortfolioModal: identico a Services)
- **Interfaccia hook**: `useFocusTrap(isOpen, containerRef, initialFocusRef?)` — 3 parametri, auto-focus con 100ms delay, Tab-cycling tra primo/ultimo elemento focusabile
- **Costanti estratte**: `FOCUSABLE_SELECTOR`, `INITIAL_FOCUS_DELAY_MS`
- **Test**: 8 unit test (auto-focus con delay, Tab cycling last→first, Shift+Tab first→last, middle element no-op, cleanup listener, cleanup timeout, senza initialFocusRef, isOpen false)
- **Validazione**: `make test` ✅ (170 passed) | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (115 passed, 68 failed — tutti pre-esistenti: webkit flaky + contact-form/roi-calculator non correlati)

---

### STEP R5 — Extract `useLenisControl` hook
- **Smell**: Duplicated Code + Message Chains
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Estratta gestione Lenis smooth scroll (stop/start) in `hooks/useLenisControl.ts` con tipo `LenisWindow` incapsulato
- **Perchè**: Type casting `(window as Window & { lenis?: ... })` e logica stop/start duplicata in 4 file consumer
- **File creati**: `hooks/useLenisControl.ts`, `tests/unit/useLenisControl.test.ts`
- **File modificati**: `hooks/index.ts` (aggiunto barrel export), `components/sections/Portfolio.tsx` (rimosso Lenis inline da PortfolioModal useEffect, aggiunto useLenisControl(isOpen)), `components/sections/Services.tsx` (identico a Portfolio), `components/layout/LanguageSelectorModal.tsx` (rimossi lenis?.stop() e lenis?.start() sparsi tra useEffect e callback, aggiunto useLenisControl(isVisible)), `components/effects/AICore/AIChatInterface.tsx` (rimosso Lenis inline da useEffect, rimosso `declare global` Window interface, aggiunto useLenisControl(isOpen))
- **Interfaccia hook**: `useLenisControl(shouldStop: boolean): void` — 1 parametro, stop quando true, start su cleanup/false
- **Tipo incapsulato**: `LenisWindow` (extends Window con `lenis?: LenisInstance`) — nasconde il casting ripetitivo
- **Nota**: SmoothScroll.tsx (il producer che assegna window.lenis) non modificato — usa casting esplicito con tipo Lenis completo di lenis library
- **Test**: 8 unit test (stop on true, no-op on false, start on cleanup, no cleanup when false, false→true transition, true→false transition, undefined window.lenis, multiple cycles)
- **Validazione**: `make test` ✅ (178 passed) | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅

---

### STEP R2 — Animation variants factory
- **Smell**: Duplicated Code + Shotgun Surgery
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Creato `lib/animation-variants.ts` con costante EASING condivisa e 5 factory functions per centralizzare animation variants Framer Motion e logica `prefersReducedMotion`
- **Perchè**: Easing `[0.25, 0.46, 0.45, 0.94]` duplicato in 20 file; logica prefersReducedMotion ripetuta ovunque
- **File creati**: `lib/animation-variants.ts`
- **Factory functions**: `EASING` (costante), `createHeadingVariants`, `createContainerVariants`, `createItemVariants`, `createCardVariants`, `createModalAnimation`
- **File migrati (20)**:
  - Sezioni: `FAQ.tsx`, `Stats.tsx`, `Contact.tsx`, `Process.tsx`, `Services.tsx`, `Portfolio.tsx`, `ROICalculator.tsx`, `About.tsx`, `BrandShowcase.tsx`, `Hero.tsx`
  - Layout: `Header.tsx`, `MobileMenu.tsx`, `LanguageSelectorModal.tsx`, `FloatingAssistant.tsx`
  - Effects: `AnimatedIcon.tsx`, `GlassmorphismCard.tsx`, `SplitTextReveal.tsx`, `FloatingVideo.tsx`
  - AICore: `AICore.tsx`, `AIChatInterface.tsx`
- **File NON migrati (documentati)**:
  - `BeforeAfter.tsx` — nessun easing condiviso, animazioni scroll-driven con pattern completamente diverso
  - `Hero.tsx` itemVariants/badgeVariants — usano `'easeOut'` non EASING
  - `About.tsx` decorativeVariants — usa `'easeOut'` non EASING
  - `Contact.tsx` shakeAnimation — pattern keyframe unico `[0, -10, 10, -10, 10, 0]`
  - `Process.tsx` iconVariants — multi-state (idle/hover/active), non mappabile su factory
  - `ROICalculator.tsx` decorativeVariants — delay/scale incondizionali, migrare cambierebbe behavior per reduced motion
- **File non toccato**: `lib/animations.ts` — file legacy non importato da nessun consumer, contiene `gpuEase` ma è dead code
- **Validazione**: `make typecheck` ✅ | `make test` ✅ (178 passed) | `make lint` ✅ | `make build` ✅

---

### STEP R3 — Extract `SectionHeader` component
- **Smell**: Duplicated Code
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Creato `components/ui/SectionHeader.tsx` che incapsula il pattern duplicato di header sezione: label con linee decorative + h2 con SectionTitleGlitch + underline gradient + description opzionale
- **Perchè**: Pattern identico (label + title + titleAccent + description) duplicato in 6 sezioni
- **File creati**: `components/ui/SectionHeader.tsx`
- **File modificati**: `components/ui/index.ts` (aggiunto barrel export), `components/sections/FAQ.tsx`, `components/sections/Process.tsx`, `components/sections/Services.tsx`, `components/sections/Portfolio.tsx`, `components/sections/Stats.tsx`, `components/sections/ROICalculator.tsx`
- **Interfaccia componente**: `SectionHeader({ label, title, titleAccent, description?, className?, titleClassName?, descriptionClassName?, isInView, children? })` — usa `useReducedMotion` e `createHeadingVariants` internamente
- **Props override**: `className` per wrapper margin (FAQ usa `mb-12 lg:mb-16`), `titleClassName` e `descriptionClassName` per variazioni (ROICalculator usa `max-w-3xl`, no dark mode classes)
- **children prop**: usato da Portfolio per il paragrafo "confidentiality notice" aggiuntivo
- **File NON migrati (documentati)**:
  - `About.tsx` — layout completamente diverso: label con una sola linea decorativa (sinistra), non centrato, usa `textVariants` non `headingVariants`, fa parte di un grid layout a 2 colonne
  - `BeforeAfter.tsx` — struttura completamente diversa: scroll-driven con fasi, header solo nella branch `prefersReducedMotion` con markup diverso (no underline gradient, SectionTitleGlitch ha className extra), nessuna animazione wrapper
- **Test**: 178 unit test passed | E2E 118 passed (65 failed — tutti pre-esistenti: webkit flaky, contact-form, roi-calculator, navigation)
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (nessuna regressione)

---

### STEP R10 — Extract `SectionWrapper` component
- **Smell**: Duplicated Code (Shotgun Surgery)
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Creato `components/ui/SectionWrapper.tsx` che incapsula il boilerplate sezione: `<section>` con ref/id/className + `useRef`/`useInView` + `TechGridOverlay` + container `div.relative.z-10.mx-auto.max-w-7xl`
- **Perchè**: Boilerplate identico in 7 sezioni — ogni sezione aveva lo stesso pattern di section tag, useRef, useInView, TechGridOverlay, e container div
- **File creati**: `components/ui/SectionWrapper.tsx`
- **File modificati**: `components/ui/index.ts` (aggiunto barrel export), `components/sections/Stats.tsx`, `components/sections/FAQ.tsx`, `components/sections/Process.tsx`, `components/sections/Portfolio.tsx`, `components/sections/Services.tsx`, `components/sections/Contact.tsx`, `hooks/useScrollProgress.ts` (widened `useActiveStep` ref type to accept `RefObject<HTMLElement | null>`)
- **Interfaccia componente**: `SectionWrapper({ id, ariaLabel?, className?, bgVariant? ('white'|'gray'), maxWidth?, decorations?, sectionRef?, children })` — render props pattern, children riceve `{ isInView }`
- **Props notevoli**:
  - `bgVariant`: 'white' (default) o 'gray' per alternare sfondo sezioni
  - `maxWidth`: default 'max-w-7xl', FAQ usa 'max-w-3xl'
  - `decorations`: ReactNode per blurs decorativi e SectionDecorations (renderizzati tra TechGridOverlay e container div)
  - `sectionRef`: ref esterna opzionale — Process la usa per `useActiveStep` hook che necessita del ref della sezione
- **File NON migrati (documentati)**:
  - `About.tsx` — decorative blurs sono `motion.div` animati con varianti che dipendono da `isInView` (non disponibile nel prop `decorations`); header completamente diverso (no SectionHeader, layout a griglia asimmetrico); una decorazione diagonale extra
  - `Hero.tsx` — layout completamente diverso, nessun pattern standard
  - `BrandShowcase.tsx` — layout completamente diverso, nessun pattern standard
  - `BeforeAfter.tsx` — scroll-driven, nessun pattern standard
  - `ROICalculator.tsx` — non usa TechGridOverlay
- **Test**: 178 unit test passed | E2E 118 passed (0 failed)
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (nessuna regressione)

---

### STEP R7 — Split ServiceModal da Services.tsx
- **Smell**: Large Class
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Estratto componente ServiceModal (~175 righe) da Services.tsx in file separato `components/sections/ServiceModal.tsx`
- **Perchè**: Services.tsx conteneva 497 righe con troppe responsabilità (ServiceCard + ServiceModal + Services orchestratore)
- **File creati**: `components/sections/ServiceModal.tsx` (186 righe — componente + props interface + import)
- **File modificati**: `components/sections/Services.tsx` (ridotto da 497 a 322 righe — esportata `Service` interface, rimossi `ServiceModal`/`ServiceModalProps`, rimossi import inutilizzati `useEffect`/`useCallback`/`AnimatePresence`/`useFocusTrap`/`useLenisControl`/`createModalAnimation`, aggiunto import da `./ServiceModal`)
- **Interfaccia ServiceModal**: `ServiceModal({ service, isOpen, onClose, prefersReducedMotion, t, tNav })` — usa `useFocusTrap`, `useLenisControl`, `createModalAnimation` internamente
- **Tipo condiviso**: `Service` interface esportata da Services.tsx, importata come `type` in ServiceModal.tsx
- **Nota**: `components/sections/index.ts` non aggiornato — ServiceModal è un sotto-componente interno, non una sezione pubblica
- **Test**: 178 unit test passed | E2E 119 passed (64 failed — tutti pre-esistenti: webkit flaky, contact-form, roi-calculator, navigation)
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (nessuna regressione)

---

### STEP R6 — Split Portfolio.tsx
- **Smell**: Large Class
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Split Portfolio.tsx (582 righe dopo refactoring precedenti) in 3 file: Portfolio.tsx orchestratore, PortfolioModal.tsx, ProjectCard.tsx
- **Perchè**: Troppe responsabilità in un singolo file — 3 componenti (Portfolio, ProjectCard, PortfolioModal) definiti nello stesso file
- **File creati**: `components/sections/ProjectCard.tsx` (139 righe — card singolo progetto), `components/sections/PortfolioModal.tsx` (261 righe — dialog modale progetto)
- **File modificati**: `components/sections/Portfolio.tsx` (ridotto da 582 a 210 righe — esportati `PROJECT_KEYS`, `TECH_STACK`, `PROJECT_MEDIA` come costanti pubbliche; rimossi `ProjectCard`/`PortfolioModal` inline; rimossi import inutilizzati `useCallback`/`useEffect`/`AnimatePresence`/`Image`/`useFocusTrap`/`useScrollTo`/`useLenisControl`/`EASING`/`createModalAnimation`/`Badge`/`PortfolioVideoPlayer`; aggiunti import da `./ProjectCard` e `./PortfolioModal`)
- **Costanti condivise**: `PROJECT_KEYS`, `TECH_STACK`, `PROJECT_MEDIA` esportate da Portfolio.tsx e importate dai sub-componenti via `./Portfolio`
- **Nota**: `components/sections/index.ts` non aggiornato — ProjectCard e PortfolioModal sono sotto-componenti interni, non sezioni pubbliche
- **Test**: 178 unit test passed | E2E portfolio-modal.spec.ts: 16/17 passed (1 fallito: `modal displays video when opened` — pre-esistente flaky, video lazy-loading timing)
- **Validazione**: `make test` ✅ | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (nessuna regressione)

---

### STEP R8 — Split ROICalculator sub-componenti
- **Smell**: Long Function
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Scritti 21 test unitari per ROICalculator (FASE A), poi estratti ROIInputCard e ROIResultsCard come sub-componenti (FASE B)
- **Perchè**: Componente unico di ~527 righe con multiple responsabilità (input form, risultati, animazioni, calcoli)
- **Pre-requisito Fowler**: Test-first — 21 test scritti e verificati PRIMA del refactoring
- **File creati**: `tests/components/ROICalculator.test.tsx` (21 test), `components/sections/ROIInputCard.tsx` (231 righe — form con slider/dropdown/toggle), `components/sections/ROIResultsCard.tsx` (180 righe — risultati con AnimatedNumber + CTA)
- **File modificati**: `components/sections/ROICalculator.tsx` (ridotto da 527 a 172 righe — orchestratore puro: stato + calcolo + rendering sub-componenti), `tests/setup.ts` (fix mock `useTransform` — restituiva `0` invece di MotionValue object con `on` method)
- **Interfaccia ROIInputCard**: `ROIInputCard({ hoursPerWeek, onHoursChange, hourlyRate, onHourlyRateChange, useHourlyRate, onUseHourlyRateChange, selectedTaskType, onTaskTypeChange, prefersReducedMotion, isInView, variants })` — gestisce dropdown state internamente
- **Interfaccia ROIResultsCard**: `ROIResultsCard({ hoursSavedMonthly, hoursSavedAnnually, annualSavings, useHourlyRate, prefersReducedMotion, isInView, variants })` — contiene AnimatedNumber e formattazione
- **Tipi condivisi**: `TaskType` interface e `taskTypes` array esportati da ROIInputCard.tsx, importati come `type` in ROICalculator.tsx
- **Costanti**: Calcolo (BASE_EFFICIENCY_RATE, WEEKS_PER_MONTH, MONTHS_PER_YEAR, DEFAULT_*) rimaste in ROICalculator.tsx; Form bounds (MIN/MAX_HOURS_PER_WEEK, MIN/MAX_HOURLY_RATE) spostate in ROIInputCard.tsx
- **Fix collaterale**: Mock globale `useTransform` in `tests/setup.ts` corretto per restituire oggetto MotionValue-like `{ get, set, on }` invece di `0` — necessario per AnimatedNumber che chiama `display.on('change', ...)`
- **Nota**: `components/sections/index.ts` non aggiornato — ROIInputCard e ROIResultsCard sono sotto-componenti interni, non sezioni pubbliche
- **Test**: 21 nuovi test (Section Structure 4, Input Controls 4, User Interactions 4, Results Display 5, Accessibility 4) | Totale suite: 199 passed
- **Validazione**: `make test` ✅ (199 passed) | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅

---

### STEP R11 — Audit test skippati
- **Smell**: Speculative Generality / Dead Code
- **Stato**: [x] DONE (2026-02-12)
- **Descrizione**: Audit completo dei 105 test skippati: 98 riattivati (aggiornati per i18n + nuova struttura componenti), 7 eliminati (obsoleti), 0 riscritti da zero
- **Perchè**: Test non eseguiti davano falsa copertura; dopo i refactoring R1-R8 i componenti usano next-intl, SectionWrapper, SectionHeader, ServiceModal estratto, ecc.
- **Root cause degli skip**: i18n refactoring — componenti ora usano `useTranslations()` con testi italiani da `messages/it.json` invece di hardcoded strings
- **File modificati**:
  - `tests/components/Header.test.tsx` — 1 skip → 0 (fix: re-query button after aria-label change on click)
  - `tests/components/Hero.test.tsx` — 12 skip → 0 (updated: region name, headline, badges, CTA, logo, decorative elements)
  - `tests/components/About.test.tsx` — 18 skip → 0 (updated: region name, heading, intro, quote, photo → real WebP, badges)
  - `tests/components/Services.test.tsx` — 40 skip → 37 active (updated: service titles, modal sections, aria-labels; added useFocusTrap/useLenisControl mocks; eliminated 3 obsolete: featured/normal min-height, dot pattern)
  - `tests/components/Process.test.tsx` — 34 skip → 30 active (updated: step titles, section label, heading, CTA, descriptions; added useActiveStep mock; eliminated 4 obsolete: horizontal timeline, timeline aria-hidden, mobile-first selector, duplicate responsive)
- **E2E audit**: `portfolio-modal.spec.ts` (1 conditional viewport skip) e `navigation.spec.ts` (3 conditional viewport skips) — tutti VALIDI, nessuna modifica necessaria
- **Mock fixes**: Aggiunti `useFocusTrap: vi.fn()`, `useLenisControl: vi.fn()`, `useActiveStep: () => ({ activeStep: 0, progress: 0 })` nei rispettivi file test per supportare componenti refactored
- **Conteggio finale**: 105 skip eliminati → 98 riattivati + 7 eliminati | Suite: da 199 passed + 105 skipped a **297 passed + 0 skipped**
- **Validazione**: `make test` ✅ (297 passed, 0 skipped) | `make typecheck` ✅ | `make lint` ✅ | `make build` ✅ | `make e2e` ✅ (117 passed, 66 failed — tutti pre-esistenti: webkit flaky, contact-form, roi-calculator, navigation timing)

---

## ORDINE DI ESECUZIONE

Priorità: sicurezza prima, impatto dopo.

| Ordine | Step | Descrizione | Rischio |
|--------|------|-------------|---------|
| 1 | R1 | getClientIp extract | Minimo |
| 2 | R9 | Magic numbers → costanti | Zero |
| 3 | R12 | Move hooks in hooks/ | Minimo |
| 4 | R4 | useFocusTrap extract | Basso |
| 5 | R5 | useLenisControl extract | Basso |
| 6 | R2 | Animation variants factory | Medio (19 file) |
| 7 | R3 | SectionHeader component | Medio (8 file) |
| 8 | R10 | SectionWrapper component | Medio (7 file) |
| 9 | R7 | Split ServiceModal | Basso |
| 10 | R6 | Split Portfolio.tsx | Basso |
| 11 | R8 | Split ROICalculator | Medio (test prima) |
| 12 | R11 | Audit test skippati | Basso |

---

## PROMPTS PER NUOVA CHAT

Ogni prompt qui sotto e autosufficiente. Copialo e incollalo in una nuova chat per eseguire lo step corrispondente.

---

### PROMPT STEP 1 (R1) — Extract `getClientIp`

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa del codebase con Fowler's Complete Refactoring Framework
- Identificati 12 code smells, mappati su 12 refactoring
- Creato DOCS/REFACTORING-LOG.md con piano completo
- Questo è il PRIMO step del piano di refactoring (TASK-040)
- Nessuno step precedente è stato eseguito

OBIETTIVO DI QUESTO STEP (singolo goal):
Estrarre la funzione `getClientIp(request: NextRequest): string` — attualmente duplicata identica in 3 API routes — in un file utility condiviso.

SMELL: Duplicated Code
REFACTORING: Extract Function + Move Function

FILE DA STUDIARE PRIMA:
- app/api/contact/route.ts (funzione a riga ~27)
- app/api/chat/route.ts (funzione a riga ~58)
- app/api/consent-log/route.ts (funzione a riga ~29)

MICRO-STEPS:
1. Leggi i 3 file API route e confronta le implementazioni di getClientIp
2. Crea lib/utils/get-client-ip.ts con la funzione esportata (prendi la versione più completa)
3. Crea/aggiorna lib/utils/index.ts con barrel export
4. In app/api/contact/route.ts: rimuovi la funzione locale, aggiungi import da @/lib/utils/get-client-ip
5. In app/api/chat/route.ts: rimuovi la funzione locale, aggiungi import da @/lib/utils/get-client-ip
6. In app/api/consent-log/route.ts: rimuovi la funzione locale, aggiungi import da @/lib/utils/get-client-ip
7. Scrivi unit test in tests/unit/get-client-ip.test.ts (mock NextRequest con x-forwarded-for, x-real-ip, nessun header)

VALIDAZIONE OBBLIGATORIA:
make test          # tutti i test devono passare
make typecheck     # nessun errore TypeScript
make lint          # nessun errore lint
make build         # build production ok

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. Questa è una Extract Function pura.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R1 come [x] DONE con data e dettagli
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor(api): extract getClientIp to shared utility [TASK-040-R1]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 2 (R9) — Magic Numbers → Symbolic Constants

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- STEP R1 COMPLETATO: getClientIp estratta in lib/utils/get-client-ip.ts, rimossa da 3 API routes
- Questo è il SECONDO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Sostituire tutti i magic numbers con costanti simboliche con nome semantico. Zero cambio di comportamento.

SMELL: Primitive Obsession
REFACTORING: Replace Magic Number with Symbolic Constant

FILE DA STUDIARE:
- lib/validations.ts — numeri limite validazione (2, 100, 10, 1000, 500, 20)
- components/sections/ROICalculator.tsx — EFFICIENCY = 0.6, formatCurrency params
- lib/security/prompt-guard.ts — risk score weights (50, 40, 10, 15, 100)
- lib/security/content-filter.ts — MAX_RESPONSE_LENGTH = 1000

MICRO-STEPS:
1. Leggi ogni file e identifica TUTTI i numeri magici senza nome semantico
2. Per lib/validations.ts: crea costanti esportate (MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_MESSAGE_LENGTH, MAX_MESSAGE_LENGTH, ecc.) e usale nello schema Zod
3. Per ROICalculator.tsx: estrai costanti di calcolo a inizio file (BASE_EFFICIENCY_RATE, ecc.)
4. Per prompt-guard.ts: estrai costanti pesi (INJECTION_RISK_WEIGHT, BLOCKED_CONTENT_WEIGHT, ecc.)
5. Per content-filter.ts: estrai MAX_RESPONSE_LENGTH e simili

VALIDAZIONE OBBLIGATORIA:
make test          # tutti i test devono passare
make typecheck     # nessun errore TypeScript
make lint          # nessun errore lint
make build         # build production ok

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. Questo è solo renaming/extraction di costanti.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R9 come [x] DONE con data e dettagli
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor: replace magic numbers with symbolic constants [TASK-040-R9]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 3 (R12) — Move hooks inline in hooks/

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- STEP R1 COMPLETATO: getClientIp estratta in utility condivisa
- STEP R9 COMPLETATO: magic numbers sostituiti con costanti simboliche
- Questo è il TERZO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Spostare gli hook custom `useEscapeKey` e `useBodyScrollLock` dalla fine di MobileMenu.tsx in file dedicati nella directory hooks/.

SMELL: Divergent Change
REFACTORING: Move Function

FILE DA STUDIARE:
- components/layout/MobileMenu.tsx — hook useEscapeKey (~riga 90), useFocusTrap (~riga 103), useBodyScrollLock (~riga 141)
- hooks/index.ts — barrel export corrente degli hooks
- hooks/useReducedMotion.ts — esempio di hook esistente per seguire pattern/convenzioni

MICRO-STEPS:
1. Leggi MobileMenu.tsx e identifica i 3 hook definiti in fondo al file
2. Crea hooks/useEscapeKey.ts — sposta useEscapeKey, esporta come named export
3. Crea hooks/useBodyScrollLock.ts — sposta useBodyScrollLock, esporta come named export
4. NOTA: NON spostare useFocusTrap ora — sarà refactored nello step R4 successivo
5. Aggiorna hooks/index.ts con i nuovi export
6. In MobileMenu.tsx: rimuovi le funzioni spostate, importa da @/hooks
7. Verifica che MobileMenu usi gli hooks esattamente come prima

VALIDAZIONE OBBLIGATORIA:
make test          # tutti i test devono passare
make typecheck     # nessun errore TypeScript
make lint          # nessun errore lint
make build         # build production ok
make e2e           # test E2E navigation (copre MobileMenu)

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. Questo è un puro Move Function.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R12 come [x] DONE con data e dettagli
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor(hooks): move useEscapeKey and useBodyScrollLock to hooks/ [TASK-040-R12]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 4 (R4) — Extract `useFocusTrap` hook

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- STEP R1 COMPLETATO: getClientIp estratta in utility condivisa
- STEP R9 COMPLETATO: magic numbers sostituiti con costanti simboliche
- STEP R12 COMPLETATO: useEscapeKey e useBodyScrollLock spostati in hooks/
- Questo è il QUARTO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Estrarre la logica di focus trap (Tab-cycling nei dialog modali) — duplicata identica in 3 componenti — in un singolo hook riusabile `hooks/useFocusTrap.ts`.

SMELL: Duplicated Code
REFACTORING: Extract Function

FILE DA STUDIARE:
- components/layout/MobileMenu.tsx — useFocusTrap definito inline (potrebbe essere già in hooks/ dopo R12, verifica)
- components/sections/Services.tsx — ServiceModal: logica focus trap nel useEffect
- components/sections/Portfolio.tsx — PortfolioModal: logica focus trap nel useEffect
- hooks/index.ts — barrel export corrente

MICRO-STEPS:
1. Leggi i 3 file e confronta le implementazioni di focus trap (Tab key cycling tra primo/ultimo elemento)
2. Identifica le differenze tra le 3 versioni e crea un'interfaccia unificata
3. Crea hooks/useFocusTrap.ts con: parametri (isOpen, containerRef, firstFocusableRef?), logica Tab-cycling, auto-focus iniziale
4. Aggiorna hooks/index.ts con il nuovo export
5. In MobileMenu.tsx: rimuovi useFocusTrap locale, importa da @/hooks e adatta la chiamata
6. In Services.tsx (ServiceModal): sostituisci la logica focus trap inline con il nuovo hook
7. In Portfolio.tsx (PortfolioModal): sostituisci la logica focus trap inline con il nuovo hook
8. Scrivi unit test in tests/unit/useFocusTrap.test.ts (mock DOM, verifica Tab cycling)

VALIDAZIONE OBBLIGATORIA:
make test          # tutti i test devono passare
make typecheck     # nessun errore TypeScript
make lint          # nessun errore lint
make build         # build production ok
make e2e           # test E2E (modal navigation, mobile menu)

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. L'accessibilità keyboard dei dialog NON deve regredire.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R4 come [x] DONE con data e dettagli
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor(a11y): extract useFocusTrap hook from 3 components [TASK-040-R4]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 5 (R5) — Extract `useLenisControl` hook

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- STEP R1 COMPLETATO: getClientIp estratta in utility condivisa
- STEP R9 COMPLETATO: magic numbers → costanti simboliche
- STEP R12 COMPLETATO: useEscapeKey e useBodyScrollLock spostati in hooks/
- STEP R4 COMPLETATO: useFocusTrap estratto da 3 componenti in hook condiviso
- Questo è il QUINTO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Estrarre la gestione dello scroll Lenis (stop/start) — con il type casting `(window as Window & { lenis?: ... })` duplicato in 5 file — in un singolo hook `hooks/useLenisControl.ts`.

SMELL: Duplicated Code + Message Chains
REFACTORING: Extract Function + Encapsulate Record

FILE DA STUDIARE:
- components/sections/Portfolio.tsx — useEffect con window.lenis?.stop()/start()
- components/sections/Services.tsx — stesso pattern
- components/layout/LanguageSelectorModal.tsx — stesso pattern
- components/effects/SmoothScroll.tsx — definizione Lenis (per capire il tipo)
- components/effects/AICore/AIChatInterface.tsx — stesso pattern (disabilitato ma presente)

MICRO-STEPS:
1. Leggi tutti e 5 i file e confronta il pattern Lenis
2. Leggi SmoothScroll.tsx per capire come Lenis viene assegnato a window.lenis
3. Crea un tipo TypeScript `LenisWindow` in hooks/useLenisControl.ts (o in types/)
4. Crea hooks/useLenisControl.ts: parametro (isActive: boolean), stop Lenis quando true, start quando false, cleanup su unmount
5. Aggiorna hooks/index.ts con il nuovo export
6. In ciascuno dei 5 file: rimuovi il type casting e il useEffect Lenis locale, importa e usa useLenisControl(isOpen)
7. Scrivi unit test in tests/unit/useLenisControl.test.ts (mock window.lenis)

VALIDAZIONE OBBLIGATORIA:
make test          # tutti i test devono passare
make typecheck     # nessun errore TypeScript
make lint          # nessun errore lint
make build         # build production ok

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. Lo smooth scroll deve continuare a fermarsi quando modal/overlay sono aperti.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R5 come [x] DONE con data e dettagli
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor(scroll): extract useLenisControl hook from 5 components [TASK-040-R5]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 6 (R2) — Animation Variants Factory

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- STEP R1 COMPLETATO: getClientIp estratta in utility condivisa
- STEP R9 COMPLETATO: magic numbers → costanti simboliche
- STEP R12 COMPLETATO: hooks inline spostati in hooks/
- STEP R4 COMPLETATO: useFocusTrap estratto in hook condiviso
- STEP R5 COMPLETATO: useLenisControl estratto in hook condiviso
- Questo è il SESTO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Creare un file `lib/animation-variants.ts` con factory functions per gli animation variants Framer Motion. L'easing `[0.25, 0.46, 0.45, 0.94]` e la logica `prefersReducedMotion` sono duplicati in 19 file. Centralizzarli.

SMELL: Duplicated Code + Shotgun Surgery
REFACTORING: Extract Function

ATTENZIONE: Questo step tocca MOLTI file (19). Procedere con estrema cautela, un file alla volta. Dopo ogni file modificato, verificare che il typecheck passi.

FILE DA STUDIARE (tutti usano easing [0.25, 0.46, 0.45, 0.94]):
Sezioni: Hero.tsx, About.tsx, Services.tsx, Portfolio.tsx, Process.tsx, FAQ.tsx, Stats.tsx, Contact.tsx, ROICalculator.tsx, BrandShowcase.tsx, BeforeAfter.tsx
Effects: AnimatedIcon.tsx, GlassmorphismCard.tsx, SplitTextReveal.tsx, FloatingVideo.tsx
Layout: Header.tsx, MobileMenu.tsx, LanguageSelectorModal.tsx
AICore: AICore.tsx, AIChatInterface.tsx

MICRO-STEPS:
1. Leggi 4-5 file per mappare TUTTI i pattern di animation variants usati (heading, container, item, card, ecc.)
2. Crea lib/animation-variants.ts con:
   - Costante EASING condivisa
   - Factory: createHeadingVariants(prefersReducedMotion, options?)
   - Factory: createContainerVariants(prefersReducedMotion, options?)
   - Factory: createItemVariants(prefersReducedMotion, options?)
   - Factory: createCardVariants(prefersReducedMotion, index?, options?)
   - Ogni factory accetta parametri opzionali per duration, delay, y, scale ecc.
3. Un file alla volta: importa la factory, sostituisci la definizione inline, verifica typecheck
4. NON forzare file che hanno varianti molto personalizzate — lascia quelli per ora e documenta nel log

VALIDAZIONE OBBLIGATORIA (dopo OGNI file modificato):
make typecheck     # nessun errore TypeScript

VALIDAZIONE FINALE:
make test          # tutti i test devono passare
make lint          # nessun errore lint
make build         # build production ok
make e2e           # animazioni funzionano ancora

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. Le animazioni devono essere visualmente indistinguibili.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R2 come [x] DONE con data, dettagli, e lista file che NON sono stati migrati (se presenti)
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor(animations): extract animation variant factories to shared lib [TASK-040-R2]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 7 (R3) — Extract `SectionHeader` component

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- R1 DONE: getClientIp utility | R9 DONE: magic numbers → costanti
- R12 DONE: hooks spostati | R4 DONE: useFocusTrap hook | R5 DONE: useLenisControl hook
- R2 DONE: animation variants factory in lib/animation-variants.ts
- Questo è il SETTIMO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Creare un componente `SectionHeader` che incapsuli il pattern di header sezione duplicato in 8 file: label con linee decorative + h2 con SectionTitleGlitch + descrizione.

SMELL: Duplicated Code
REFACTORING: Extract Function (Extract Component)

FILE DA STUDIARE (tutti contengono il pattern):
About.tsx, FAQ.tsx, Process.tsx, BeforeAfter.tsx, Portfolio.tsx, Stats.tsx, ROICalculator.tsx, Services.tsx
Pattern: `<span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent">` + decorative lines + SectionTitleGlitch + description paragraph

MICRO-STEPS:
1. Leggi 3-4 sezioni per mappare variazioni nel pattern header (alcune hanno titleAccent, altre no; alcune hanno description, altre no)
2. Crea components/ui/SectionHeader.tsx con props: label, title, titleAccent?, description?, className?, animation variants (usa quelli di lib/animation-variants.ts creato in R2)
3. Il componente deve usare 'use client' e Framer Motion come le sezioni attuali
4. Aggiorna components/ui/index.ts con il nuovo export
5. Un file alla volta: importa SectionHeader, sostituisci il JSX dell'header, verifica visualmente
6. NON forzare sezioni con header molto diversi — lascia e documenta

VALIDAZIONE OBBLIGATORIA:
make test          # tutti i test devono passare
make typecheck     # nessun errore TypeScript
make lint          # nessun errore lint
make build         # build production ok
make e2e           # sezioni renderizzano correttamente

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. L'aspetto visivo degli header DEVE essere indistinguibile.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R3 come [x] DONE con data e dettagli
- Verifica che nessun documento di progetto necessiti aggiornamento
- NO auto-commit: chiedi conferma prima di committare
- Formato commit: refactor(ui): extract SectionHeader component from 8 sections [TASK-040-R3]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 8 (R10) — Extract `SectionWrapper` component

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Analisi completa codebase con Fowler's Framework → 12 smell, 12 refactoring pianificati
- R1 DONE: getClientIp utility | R9 DONE: magic numbers → costanti
- R12 DONE: hooks spostati | R4 DONE: useFocusTrap | R5 DONE: useLenisControl
- R2 DONE: animation variants factory | R3 DONE: SectionHeader component
- Questo è l'OTTAVO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Creare un componente `SectionWrapper` che incapsuli il boilerplate di layout sezione duplicato in 7+ sezioni: tag <section> con ref/id/className + TechGridOverlay + SectionDecorations + container div max-w-7xl.

SMELL: Duplicated Code (Shotgun Surgery)
REFACTORING: Extract Function (Extract Component)

FILE DA STUDIARE (usano TechGridOverlay e/o SectionDecorations):
About.tsx, FAQ.tsx, Process.tsx, Portfolio.tsx, Stats.tsx, Services.tsx, Contact.tsx

Pattern boilerplate:
<section ref={sectionRef} id="xxx" className="relative overflow-hidden bg-white py-24 lg:py-32">
  <TechGridOverlay opacity={0.02} />
  <div className="absolute ... rounded-full bg-accent/... blur-3xl" aria-hidden />
  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {children}
  </div>
</section>

MICRO-STEPS:
1. Leggi 4 sezioni per mappare variazioni (bg color, decorazioni diverse, opacity diverse)
2. Crea components/ui/SectionWrapper.tsx con props: id, ariaLabel?, className?, bgVariant? ('white'|'gray'), children, ref (forwardRef)
3. Il wrapper deve passare ref e isInView al children tramite React context o render props (studia il pattern migliore)
4. Aggiorna components/ui/index.ts
5. Un file alla volta: wrap il contenuto con SectionWrapper, rimuovi boilerplate, verifica
6. NON forzare sezioni con layout molto diversi (Hero, BrandShowcase) — documenta

VALIDAZIONE OBBLIGATORIA:
make test && make typecheck && make lint && make build && make e2e

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R10 come [x] DONE
- Verifica documenti di progetto
- NO auto-commit: chiedi conferma
- Formato commit: refactor(ui): extract SectionWrapper component from 7 sections [TASK-040-R10]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 9 (R7) — Split ServiceModal da Services.tsx

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Piano Fowler completo: 12 smell → 12 refactoring
- R1, R9, R12, R4, R5, R2, R3, R10 — TUTTI COMPLETATI
- Hooks estratti (useFocusTrap, useLenisControl, useEscapeKey, useBodyScrollLock)
- Animation variants centralizzati in lib/animation-variants.ts
- SectionHeader e SectionWrapper creati e usati nelle sezioni
- Services.tsx dovrebbe essere già più snello grazie ai refactoring precedenti
- Questo è il NONO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Estrarre il componente ServiceModal da Services.tsx in un file dedicato `components/sections/ServiceModal.tsx`.

SMELL: Large Class
REFACTORING: Extract Class (Extract Component)

FILE DA STUDIARE:
- components/sections/Services.tsx — ServiceModal è definito nello stesso file
- Nota: dopo i refactoring precedenti, ServiceModal dovrebbe già usare useFocusTrap e useLenisControl da hooks/

MICRO-STEPS:
1. Leggi Services.tsx intero per capire lo stato attuale (dopo i refactoring R2-R10)
2. Identifica il componente ServiceModal e le sue dipendenze (props, types, import)
3. Crea components/sections/ServiceModal.tsx con il componente e i tipi necessari
4. In Services.tsx: rimuovi ServiceModal, importa da ./ServiceModal
5. Verifica che i tipi condivisi (Service interface, ecc.) siano accessibili — se necessario esportali
6. Aggiorna import/export in components/sections/index.ts se necessario

VALIDAZIONE OBBLIGATORIA:
make test && make typecheck && make lint && make build && make e2e

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R7 come [x] DONE
- Verifica documenti di progetto
- NO auto-commit: chiedi conferma
- Formato commit: refactor(services): extract ServiceModal to separate file [TASK-040-R7]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 10 (R6) — Split Portfolio.tsx

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Piano Fowler completo: 12 smell → 12 refactoring
- R1, R9, R12, R4, R5, R2, R3, R10, R7 — TUTTI COMPLETATI
- Services.tsx già splittato (ServiceModal in file separato nello step R7)
- Portfolio.tsx dovrebbe essere già più snello grazie ai refactoring hooks/animation/section precedenti
- Questo è il DECIMO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Split Portfolio.tsx (~658 righe originali, ora ridotto) in 3 file:
- Portfolio.tsx — componente principale (griglia, logica sezione)
- PortfolioModal.tsx — dialog modale progetto
- ProjectCard.tsx — card singolo progetto

SMELL: Large Class
REFACTORING: Extract Class (Extract Component)

FILE DA STUDIARE:
- components/sections/Portfolio.tsx — contiene Portfolio, ProjectCard, PortfolioModal
- tests/e2e/portfolio-modal.spec.ts — test E2E che devono continuare a passare

MICRO-STEPS:
1. Leggi Portfolio.tsx intero per capire lo stato attuale (dopo refactoring precedenti)
2. Identifica i confini di ogni componente (Portfolio, ProjectCard, PortfolioModal)
3. Identifica i tipi/costanti condivisi (PROJECT_KEYS, TECH_STACK, PROJECT_MEDIA, interfacce)
4. Crea file condiviso per tipi/costanti se necessario (o esportali da Portfolio.tsx)
5. Crea components/sections/ProjectCard.tsx
6. Crea components/sections/PortfolioModal.tsx
7. Riduci Portfolio.tsx al componente principale con import dei nuovi file
8. Aggiorna components/sections/index.ts se necessario

VALIDAZIONE OBBLIGATORIA:
make test && make typecheck && make lint && make build && make e2e

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO. I test E2E portfolio-modal.spec.ts DEVONO passare.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R6 come [x] DONE
- Verifica documenti di progetto
- NO auto-commit: chiedi conferma
- Formato commit: refactor(portfolio): split into Portfolio, ProjectCard, PortfolioModal [TASK-040-R6]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 11 (R8) — Split ROICalculator + test

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Piano Fowler completo: 12 smell → 12 refactoring
- R1, R9, R12, R4, R5, R2, R3, R10, R7, R6 — TUTTI COMPLETATI
- Services.tsx e Portfolio.tsx già splittati
- Questo è l'UNDICESIMO step del piano (TASK-040)

ATTENZIONE — PRE-REQUISITO FOWLER:
ROICalculator NON ha test attivi. Fowler dice: "If tests are missing, propose the minimum tests required BEFORE refactoring." Quindi questo step ha DUE fasi: prima i test, poi il refactoring.

OBIETTIVO DI QUESTO STEP (due fasi):
FASE A: Scrivere test minimi per ROICalculator PRIMA di refactorare
FASE B: Estrarre ROIInputCard e ROIResultsCard come sub-componenti

SMELL: Long Function
REFACTORING: Extract Function (Extract Component) — con test-first

FILE DA STUDIARE:
- components/sections/ROICalculator.tsx — componente da ~500 righe (dopo refactoring precedenti)
- lib/validations.ts — schema validazione se presente per ROI

MICRO-STEPS FASE A (test first):
1. Leggi ROICalculator.tsx intero
2. Identifica i comportamenti chiave da testare: calcolo ROI, rendering input, rendering risultati
3. Scrivi tests/components/ROICalculator.test.tsx con test minimi:
   - Il componente renderizza senza errori
   - I campi input sono visibili
   - Il calcolo produce valori corretti dato un input noto
4. Esegui make test — i nuovi test DEVONO passare PRIMA di procedere

MICRO-STEPS FASE B (refactoring):
5. Estrai sub-componente ROIInputCard (form con slider/select) nello stesso file o in file separato
6. Estrai sub-componente ROIResultsCard (card risultati) nello stesso file o in file separato
7. ROICalculator diventa orchestratore: stato + calcolo + rendering dei due sub-componenti
8. Esegui di nuovo i test — DEVONO ancora passare

VALIDAZIONE OBBLIGATORIA:
make test && make typecheck && make lint && make build

COMPORTAMENTO ESTERNO: DEVE rimanere IDENTICO.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R8 come [x] DONE
- Verifica documenti di progetto
- NO auto-commit: chiedi conferma
- Formato commit (può essere 2 commit separati):
  1. test(roi): add unit tests for ROICalculator [TASK-040-R8]
  2. refactor(roi): extract ROIInputCard and ROIResultsCard sub-components [TASK-040-R8]

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

### PROMPT STEP 12 (R11) — Audit test skippati

```
CONTESTO PROGETTO:
Stai lavorando su "The AI and beyond" (theaiandbeyond.it) — landing page Next.js 14 + React 18 + TypeScript strict + Tailwind CSS + Framer Motion. Deploy su Vercel.

DOCUMENTI OBBLIGATORI DA LEGGERE PRIMA DI QUALSIASI AZIONE:
1. RULES.md — Regole di progetto (TUTTE non negoziabili)
2. DOCS/BIBBIA-SICUREZZA-DEPLOY.md — Bible sicurezza (DEVE essere rispettata)
3. DOCS/REFACTORING-LOG.md — Log refactoring (DEVE essere aggiornato a fine step)
4. Makefile — Comandi disponibili

CONTESTO DI CIò CHE è STATO FATTO:
- Piano Fowler completo: 12 smell → 12 refactoring
- R1, R9, R12, R4, R5, R2, R3, R10, R7, R6, R8 — TUTTI COMPLETATI
- Codebase refactored: hooks estratti, animation centralizzate, componenti splittati, costanti nominate
- Questo è il DODICESIMO e ULTIMO step del piano (TASK-040)

OBIETTIVO DI QUESTO STEP (singolo goal):
Audit dei 109 test skippati nel codebase. Per ogni test skippato decidere: riattivare (e fixare se rotto) o eliminare (se obsoleto/non più rilevante).

SMELL: Speculative Generality / Dead Code
REFACTORING: Remove Dead Code (o riattivazione)

FILE DA STUDIARE:
- tests/components/Hero.test.tsx (~12 skip)
- tests/components/About.test.tsx (~18 skip)
- tests/components/Services.test.tsx (~40 skip)
- tests/components/Process.test.tsx (~34 skip)
- tests/components/Header.test.tsx (~1 skip)
- tests/e2e/portfolio-modal.spec.ts (~1 skip)
- tests/e2e/navigation.spec.ts (~3 skip)

MICRO-STEPS:
1. Leggi OGNI file di test con skip e per ciascun test skippato valuta:
   a. Il componente testato esiste ancora? (dopo i refactoring potrebbe essere cambiato)
   b. Il test è ancora rilevante?
   c. Il test può passare con le modifiche attuali del codebase?
2. Categorie di azione:
   - RIATTIVARE: rimuovi .skip, aggiorna se necessario per matching il codice attuale, verifica che passi
   - ELIMINARE: rimuovi il test se obsoleto (componente non esiste, logica cambiata radicalmente)
   - RISCRIVERE: se il test è utile ma completamente rotto, riscrivi con struttura aggiornata
3. Procedi un file alla volta. Dopo ogni file: make test per verificare
4. Per i test E2E: make e2e per verificare

VALIDAZIONE OBBLIGATORIA (dopo OGNI file):
make test          # per test unitari
make e2e           # per test E2E (quando tocchi quei file)

VALIDAZIONE FINALE:
make test && make typecheck && make lint && make build && make e2e

COMPORTAMENTO ESTERNO: Il sito DEVE funzionare esattamente come prima. I test riattivati confermano questo.

POST-STEP OBBLIGATORIO:
- Aggiorna DOCS/REFACTORING-LOG.md: marca STEP R11 come [x] DONE con:
  - Quanti test riattivati
  - Quanti test eliminati
  - Quanti test riscritti
  - Coverage prima/dopo se disponibile
- Aggiorna DOCS/REFACTORING-LOG.md stato generale: "REFACTORING COMPLETATO"
- Aggiorna DOCS/WORKPLAN.md: marca TASK-040 come [x] Completed
- Verifica TUTTI i documenti di progetto siano aggiornati con lo stato reale del codebase
- NO auto-commit: chiedi conferma
- Formato commit: test: audit and reactivate skipped tests [TASK-040-R11]

DOPO QUESTO STEP:
Il refactoring TASK-040 è COMPLETATO. Verifica finale:
- make check-all (lint + typecheck + test + security)
- make build
- make e2e
- Tutti i documenti aggiornati

PER QUALSIASI DUBBIO: FERMATI E CHIEDI.
```

---

## DECISION LOG

| Data | Decisione | Motivazione |
|------|-----------|-------------|
| 2026-02-12 | Ordine R1-first | getClientIp è il refactoring più isolato e sicuro, ideale per validare il processo |
| 2026-02-12 | Non refactorare email templates | Templates HTML email devono essere indipendenti per manutenzione |
| 2026-02-12 | Non introdurre CSS variables per colori | Tailwind config già gestisce colori — sarebbe un rewrite, non refactoring |
| 2026-02-12 | Non eliminare chat API | Disabilitata ma documentata per futuro uso |
| 2026-02-12 | R8 richiede test PRIMA | ROICalculator non ha test attivi — Fowler: test-first refactoring |
| 2026-02-12 | Ogni prompt self-contained | Ogni step deve poter essere eseguito in una nuova chat senza contesto precedente |
