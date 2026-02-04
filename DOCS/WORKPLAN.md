# Work Plan
# The AI and Beyond - Website

> Master document for project execution. Each task has a complete, self-contained prompt.

---

## Project Overview

**Project**: The AI and Beyond - Professional AI Consulting Website
**Client**: Leonardo Sarti Magi
**Goal**: Modern, animated single-page website to showcase AI services and generate leads
**Target**: Italian businesses and professionals

**Reference Documents**:
- [PRD.md](./PRD.md) - Complete requirements
- [STACK.md](./STACK.md) - Technology decisions
- [RULES.md](../RULES.md) - Project rules (READ FIRST)

---

## Task List

| ID | Task | Status | Priority | Effort | Dependencies |
|----|------|--------|----------|--------|--------------|
| TASK-000 | Project foundation (docs, structure) | [x] Completed | P0 | 2h | - |
| TASK-001 | Next.js project setup with security config | [x] Completed | P0 | 2h | TASK-000 |
| TASK-002 | Design system & base UI components | [x] Completed | P0 | 3h | TASK-001 |
| TASK-003 | Layout components (Header, Footer) | [x] Completed | P0 | 3h | TASK-002 |
| TASK-004 | Hero section with animations | [x] Completed | P0 | 4h | TASK-003 |
| TASK-005 | About section | [x] Completed | P1 | 2h | TASK-002 |
| TASK-006 | Services section with cards | [x] Completed | P1 | 3h | TASK-002 |
| TASK-007 | Portfolio section with modals | [x] Completed | P1 | 4h | TASK-002 |
| TASK-008 | Before/After comparison | [x] Completed | P1 | 3h | TASK-002 |
| TASK-009 | ROI Calculator | [x] Completed | P1 | 3h | TASK-002 |
| TASK-010 | Process timeline section | [x] Completed | P2 | 2h | TASK-002 |
| TASK-011 | Contact form with validation | [x] Completed | P0 | 4h | TASK-002 |
| TASK-012 | Contact API with rate limiting | [x] Completed | P0 | 3h | TASK-011 |
| TASK-013 | Cookie consent banner | [x] Completed | P1 | 2h | TASK-002 |
| TASK-014 | SEO & metadata | [x] Completed | P1 | 2h | TASK-001 |
| TASK-015 | Analytics integration | [x] Completed | P2 | 1h | TASK-001 |
| TASK-016 | Performance optimization | [x] Completed | P1 | 2h | All sections |
| TASK-017 | Accessibility audit & fixes | [x] Completed | P1 | 2h | All sections |
| TASK-018 | E2E tests for critical flows | [x] Completed | P1 | 3h | TASK-012 |
| TASK-019 | Final review & deployment | [x] Completed | P0 | 2h | All tasks |
| TASK-020 | Internationalization setup (next-intl) | [x] Completed | P0 | 4h | TASK-001 |
| TASK-021 | Particle system background | [x] Completed | P1 | 3h | TASK-020 |
| TASK-022 | Logo enhancements (favicon, header, bg) | [x] Completed | P1 | 3h | TASK-020 |
| TASK-023 | Typography effects (gradient, split, highlight) | [x] Completed | P1 | 4h | TASK-020 |
| TASK-024 | Floating assistant component | [x] Completed | P2 | 5h | TASK-020, TASK-021 |
| TASK-025 | AI image prompts for portfolio | [x] Completed | P2 | 1h | - |
| TASK-026 | Component i18n integration | [ ] Pending | P1 | 4h | TASK-020 |
| TASK-027 | Documentation update | [x] Completed | P1 | 2h | All previous |
| TASK-028 | Brand redesign (logos, colors, services layout) | [x] Completed | P0 | 4h | TASK-027 |
| TASK-029 | WOW effects (video logo, storytelling scroll, cursor, smooth scroll) | [x] Completed | P1 | 6h | TASK-028 |
| TASK-030 | UX enhancements (language selector, video section, portfolio redesign, effects) | [x] Completed | P0 | 8h | TASK-029 |
| TASK-031 | AI Core Avatar redesign (replaces FloatingAssistant) | [x] Completed | P1 | 5h | TASK-030 |

---

## Task Prompts

---

### TASK-001: Next.js Project Setup with Security Config

**Status**: [x] Completed
**Priority**: P0 - Critical
**Estimated Effort**: 2 hours
**Dependencies**: TASK-000

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-001.

**Completed so far:**
- TASK-000: Project foundation (documentation, structure, rules)

**Current state:**
- Documentation complete in /DOCS folder
- Directory structure created
- No actual code yet

---

#### REQUIRED READING (DO THIS FIRST)

Before ANY action, read these files in this order:
1. `RULES.md` - Follow ALL rules strictly
2. `DOCS/PRD.md` - Understand requirements (Section 4: Non-Functional Requirements)
3. `DOCS/STACK.md` - Understand technology choices

---

#### RULES REMINDER

- Priorities: Speed, Quality, Control, Security
- Functions: max 20 lines, max 3 params, single responsibility
- Test first, test after each change
- No hardcoded secrets, validate all input
- Commit format: `<type>(<scope>): <desc> [TASK-001]`
- Ask confirmation before committing

---

#### TASK OBJECTIVE

Set up a production-ready Next.js 14 project with:
1. TypeScript in strict mode
2. Tailwind CSS with custom theme
3. Framer Motion
4. ESLint + Prettier configured
5. Vitest for testing
6. Security headers configured
7. Environment variables structure

**Acceptance Criteria:**
- [ ] `npm run dev` starts development server
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] `npm run test` runs (even with no tests)
- [ ] TypeScript strict mode enabled
- [ ] Security headers in next.config.js
- [ ] `.env.example` documents required variables
- [ ] `.gitignore` includes all sensitive files

---

#### DETAILED INSTRUCTIONS

**Step 1: Initialize Next.js Project**
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

**Step 2: Install Additional Dependencies**
```bash
# Animation
npm install framer-motion

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Email
npm install resend

# Testing
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom

# Utilities
npm install clsx tailwind-merge class-variance-authority

# Development
npm install -D prettier prettier-plugin-tailwindcss
```

**Step 3: Configure TypeScript (tsconfig.json)**
Ensure strict mode is enabled:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Step 4: Configure Tailwind (tailwind.config.ts)**
Add custom theme:
```typescript
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          dark: '#0f2744',
          light: '#2c5282',
        },
        accent: {
          DEFAULT: '#00bcd4',
          dark: '#0097a7',
          light: '#4dd0e1',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

**Step 5: Configure Security Headers (next.config.js)**
```javascript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```

**Step 6: Create Environment Files**
- `.env.example` - Template with variable names (no values)
- `.env.local` - Actual values (gitignored)

**Step 7: Configure Vitest (vitest.config.ts)**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**Step 8: Update package.json Scripts**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

**Step 9: Create Prettier Config (.prettierrc)**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Step 10: Verify Setup**
- Run `npm run dev` - should start at localhost:3000
- Run `npm run build` - should complete without errors
- Run `npm run lint` - should pass
- Run `npm run test` - should run (with existing tests)

---

#### SECURITY CHECKLIST

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in code
- [ ] Security headers configured
- [ ] TypeScript strict mode enabled
- [ ] `.env.example` has no actual secrets

---

#### MANDATORY END-OF-TASK ACTIONS

1. Run all tests: `make test`
2. Run security check: `make security-check`
3. Run linter: `make lint`
4. Create `DOCS/reports/TASK-001-report.md` with:
   - What was done
   - Files created/modified
   - Tests added
   - Security considerations
   - Any issues and resolutions
5. Update this WORKPLAN.md: Change status to `[x] Completed`
6. **ASK FOR CONFIRMATION** before committing
7. Commit: `chore(setup): initialize Next.js project with security config [TASK-001]`

---

---

### TASK-002: Design System & Base UI Components

**Status**: [x] Completed
**Priority**: P0 - Critical
**Estimated Effort**: 3 hours
**Dependencies**: TASK-001

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-002.

**Completed so far:**
- TASK-000: Project foundation
- TASK-001: Next.js project setup with security config

**Current state:**
- Next.js project initialized and configured
- Dependencies installed
- Security headers configured

---

#### REQUIRED READING (DO THIS FIRST)

Before ANY action, read these files in this order:
1. `RULES.md` - Follow ALL rules strictly
2. `DOCS/PRD.md` - Section 10: Brand Guidelines
3. `DOCS/STACK.md` - Tailwind CSS and styling sections
4. `DOCS/reports/TASK-001-report.md` - Previous task completion

---

#### RULES REMINDER

- Priorities: Speed, Quality, Control, Security
- Functions: max 20 lines, max 3 params, single responsibility
- React: functional components only, TypeScript interfaces for props
- Tailwind: mobile-first, consistent spacing
- Commit format: `<type>(<scope>): <desc> [TASK-002]`
- Ask confirmation before committing

---

#### TASK OBJECTIVE

Create the design system and base UI components:
1. Typography system (headings, body text)
2. Color system in Tailwind config
3. Button component with variants
4. Card component
5. Input components (text, textarea, checkbox)
6. Badge/Chip component
7. Animation utilities

**Acceptance Criteria:**
- [ ] All components have TypeScript interfaces
- [ ] All components are accessible (ARIA, focus states)
- [ ] All components support responsive design
- [ ] Unit tests for component rendering
- [ ] Storybook-like preview page at `/preview` (dev only)

---

#### DETAILED INSTRUCTIONS

**File Structure to Create:**
```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Checkbox.tsx
│   ├── Badge.tsx
│   └── index.ts (barrel export)
lib/
├── utils.ts (cn function, etc.)
├── animations.ts (Framer Motion variants)
app/
├── globals.css (update with typography)
```

**Step 1: Create utility function (lib/utils.ts)**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Create animation variants (lib/animations.ts)**
```typescript
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
// Add more variants...
```

**Step 3: Create Button component with CVA**
- Variants: primary, secondary, outline, ghost
- Sizes: sm, md, lg
- States: loading, disabled
- Full keyboard and focus support

**Step 4: Create Card component**
- Variants: default, interactive (hover effects)
- Optional header, content, footer slots
- Smooth hover animations

**Step 5: Create Input components**
- Input: text, email types
- Textarea: with auto-resize option
- Checkbox: with custom styling
- All with error states and labels

**Step 6: Create Badge component**
- Keywords badge for hero section
- Hover micro-animations
- Color variants

**Step 7: Update globals.css**
- Typography scale
- Focus ring utilities
- Reduced motion support

**Step 8: Write Tests**
- Test each component renders
- Test button click handlers
- Test input change handlers
- Test accessibility attributes

---

#### SECURITY CHECKLIST

- [ ] No user input in component internals
- [ ] Proper sanitization if rendering HTML
- [ ] No dangerouslySetInnerHTML

---

#### MANDATORY END-OF-TASK ACTIONS

1. Run all tests: `make test`
2. Run security check: `make security-check`
3. Run linter: `make lint`
4. Create `DOCS/reports/TASK-002-report.md`
5. Update WORKPLAN.md status to `[x] Completed`
6. **ASK FOR CONFIRMATION** before committing
7. Commit: `feat(ui): add design system and base UI components [TASK-002]`

---

---

### TASK-003: Layout Components (Header, Footer)

**Status**: [x] Completed
**Priority**: P0 - Critical
**Estimated Effort**: 3 hours
**Dependencies**: TASK-002

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-003.

**Completed so far:**
- TASK-000: Project foundation
- TASK-001: Next.js project setup
- TASK-002: Design system & base UI components

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md` - Follow ALL rules strictly
2. `DOCS/PRD.md` - Section 3.1 (Header) and 3.10 (Footer)
3. `DOCS/reports/TASK-002-report.md` - Available components

---

#### RULES REMINDER

- Priorities: Speed, Quality, Control, Security
- Functions: max 20 lines, single responsibility
- Framer Motion: GPU-accelerated only, respect reduced motion
- Commit format: `<type>(<scope>): <desc> [TASK-003]`

---

#### TASK OBJECTIVE

Create layout components:
1. Header with sticky behavior and blur effect
2. Mobile navigation with hamburger menu
3. Footer with links and contact info
4. Smooth scroll functionality

**Acceptance Criteria:**
- [ ] Header is sticky with blur on scroll
- [ ] Mobile hamburger menu animates smoothly
- [ ] Navigation links scroll to sections
- [ ] "Parliamone" CTA scrolls to contact
- [ ] Footer has all required links
- [ ] All animations respect prefers-reduced-motion
- [ ] Keyboard navigation works completely

---

#### DETAILED INSTRUCTIONS

**File Structure:**
```
components/
├── layout/
│   ├── Header.tsx
│   ├── MobileMenu.tsx
│   ├── Footer.tsx
│   ├── ScrollToTop.tsx (optional)
│   └── index.ts
```

**Header Requirements:**
- Logo on left (use onda_logo.png on mobile, logo.png on desktop)
- Navigation: Chi Sono | Servizi | Portfolio | Come Lavoro | Contatti
- CTA button "Parliamone" on right
- Sticky positioning with backdrop blur
- Opacity/blur increases on scroll
- Hide/show on scroll direction (optional enhancement)

**Mobile Menu Requirements:**
- Hamburger icon with animation to X
- Full-screen or slide-in menu
- Staggered link animations
- Focus trap when open
- Close on link click
- Close on escape key

**Footer Requirements:**
- Logo
- Quick links to sections
- Contact: email, LinkedIn
- Copyright with current year
- Privacy Policy link

**Smooth Scroll:**
- Create custom hook `useScrollTo`
- Offset for sticky header height
- Smooth animation

---

#### SECURITY CHECKLIST

- [ ] External links have `rel="noopener noreferrer"`
- [ ] No user-generated content in navigation

---

#### MANDATORY END-OF-TASK ACTIONS

1. Run all tests: `make test`
2. Run security check: `make security-check`
3. Run linter: `make lint`
4. Create `DOCS/reports/TASK-003-report.md`
5. Update WORKPLAN.md status to `[x] Completed`
6. **ASK FOR CONFIRMATION** before committing
7. Commit: `feat(layout): add Header and Footer with mobile navigation [TASK-003]`

---

---

### TASK-004: Hero Section with Animations

**Status**: [x] Completed
**Priority**: P0 - Critical
**Estimated Effort**: 4 hours
**Dependencies**: TASK-003

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-004.

**Completed so far:**
- TASK-000: Project foundation
- TASK-001: Next.js project setup
- TASK-002: Design system & base UI components
- TASK-003: Layout components (Header, Footer)

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md` - Follow ALL rules strictly
2. `DOCS/PRD.md` - Section 3.2 (Hero Section)
3. `DOCS/STACK.md` - Framer Motion section
4. `DOCS/reports/TASK-003-report.md`

---

#### RULES REMINDER

- Priorities: Speed, Quality, Control, Security
- Animations: 60fps, GPU-accelerated only
- Framer Motion: respect prefers-reduced-motion
- Commit format: `<type>(<scope>): <desc> [TASK-004]`

---

#### TASK OBJECTIVE

Create the Hero section with:
1. Animated wave logo (SVG path animation)
2. Staggered text entrance animations
3. Four keyword badges with hover effects
4. Gradient background with subtle tech pattern
5. Primary CTA button

**Acceptance Criteria:**
- [ ] Wave logo animates on load (draws itself)
- [ ] Text enters with staggered fade + slide
- [ ] Badges have micro-hover animations
- [ ] Background gradient is smooth
- [ ] Tech pattern is subtle, not distracting
- [ ] All animations 60fps
- [ ] Reduced motion users see static version
- [ ] Mobile responsive

---

#### DETAILED INSTRUCTIONS

**File Structure:**
```
components/
├── sections/
│   ├── Hero.tsx
│   ├── AnimatedLogo.tsx
│   └── index.ts
public/
├── images/
│   ├── logo.png
│   └── onda_logo.png (convert to SVG for animation)
```

**Wave Logo Animation:**
- Convert wave to SVG with path
- Use Framer Motion `pathLength` animation
- Duration: 1.5-2 seconds
- Ease: ease-out

**Text Animation:**
- Headline: fade in + slide up
- Subtitle: delay 0.3s, fade in + slide up
- Use staggered children pattern

**Keyword Badges:**
- "Qualità", "Velocità", "Sicurezza", "Controllo"
- Stagger entrance after text
- Hover: slight scale + glow effect
- Use the Badge component from TASK-002

**Background:**
- Gradient: #1a365d (dark blue) → #00bcd4 (cyan)
- Consider: subtle grid pattern, geometric shapes
- Keep it elegant, NOT busy
- Performance: use CSS gradients, not images

**Copy (Italian, professional placeholder):**
```
Headline: "Trasformo idee in soluzioni AI che funzionano"
Subtitle: "Consulenza e sviluppo per aziende che vogliono crescere con l'intelligenza artificiale"
CTA: "Scopri come posso aiutarti"
```

---

#### SECURITY CHECKLIST

- [ ] No user input in hero section
- [ ] Images optimized and served via Next/Image

---

#### MANDATORY END-OF-TASK ACTIONS

1. Run all tests: `make test`
2. Run security check: `make security-check`
3. Run linter: `make lint`
4. Create `DOCS/reports/TASK-004-report.md`
5. Update WORKPLAN.md status to `[x] Completed`
6. **ASK FOR CONFIRMATION** before committing
7. Commit: `feat(hero): add Hero section with logo animation [TASK-004]`

---

---

### TASK-005: About Section

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 2 hours
**Dependencies**: TASK-002

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-005.

**Completed so far:**
- TASK-000 through TASK-004

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md` - Follow ALL rules strictly
2. `DOCS/PRD.md` - Section 3.3 (About Section)
3. Previous task reports

---

#### TASK OBJECTIVE

Create the About/Chi Sono section with:
1. Professional bio text
2. Photo placeholder with elegant styling
3. Scroll-triggered animations
4. Credibility elements (approach, methodology)

**Key Note from Client:**
> "Non voglio il solito sito con i riquadri" - Avoid typical boxy layouts
> Focus on value delivered, not years of experience

**Acceptance Criteria:**
- [ ] Unique, non-boxy layout
- [ ] Scroll-triggered fade-in animation
- [ ] Photo placeholder with frame/effect
- [ ] Professional but accessible tone
- [ ] Mobile responsive
- [ ] Reduced motion support

---

#### DETAILED INSTRUCTIONS

**Copy (Professional placeholder in Italian):**
```
"Mi chiamo Leonardo e aiuto aziende e professionisti a trasformare
le loro sfide in opportunità attraverso l'intelligenza artificiale.

Non vendo promesse irrealizzabili: analizzo il tuo contesto,
identifico dove l'AI può fare davvero la differenza,
e costruisco soluzioni che funzionano.

Ogni progetto parte dall'ascolto. Perché la tecnologia migliore
è quella che risolve problemi reali."
```

**Design Approach:**
- Consider asymmetric layout
- Text on one side, image offset
- Decorative elements (gradient blurs, lines)
- Avoid typical "photo + text side by side" box

---

#### MANDATORY END-OF-TASK ACTIONS

1. Run all tests: `make test`
2. Run security check: `make security-check`
3. Run linter: `make lint`
4. Create `DOCS/reports/TASK-005-report.md`
5. Update WORKPLAN.md status to `[x] Completed`
6. **ASK FOR CONFIRMATION** before committing
7. Commit: `feat(about): add About section with animations [TASK-005]`

---

---

### TASK-006: Services Section with Cards

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 3 hours
**Dependencies**: TASK-002

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-006.

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md` - Follow ALL rules strictly
2. `DOCS/PRD.md` - Section 3.4 (Services Section)
3. Previous task reports

---

#### TASK OBJECTIVE

Create the Services section with:
1. 5 interactive service cards
2. Unique, non-standard card layout
3. Hover animations and content expansion
4. Icons for each service
5. Staggered scroll animations

**Services:**
1. **Consulenza AI** - Analisi e strategia per integrare AI nel business
2. **Sviluppo Web App** - Applicazioni web moderne e performanti
3. **Agenti AI** - Automazioni intelligenti e assistenti virtuali
4. **Prototipi Rapidi** - MVP e proof of concept in tempi brevi
5. **Ottimizzazione PM** - Strumenti AI per project management efficiente

**Key Note from Client:**
> "Non voglio il solito sito con i riquadri" - Create a unique layout, not typical grid

**Acceptance Criteria:**
- [ ] Creative, non-standard card arrangement
- [ ] Each card has icon, title, description
- [ ] Hover: scale + shadow + detail expansion
- [ ] Staggered entrance animation
- [ ] Optional: click for modal with more details
- [ ] Mobile responsive (stack elegantly)

---

#### DESIGN SUGGESTIONS

Instead of typical 3x2 or 5-column grid, consider:
- Staggered/offset cards
- Cards at different sizes
- Floating/overlapping arrangement
- Bento-box inspired layout
- Cards that "fan out" on hover

---

#### MANDATORY END-OF-TASK ACTIONS

1-7: Same as previous tasks
Commit: `feat(services): add Services section with interactive cards [TASK-006]`

---

---

### TASK-007: Portfolio Section with Modals

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 4 hours
**Dependencies**: TASK-002

---

#### CONTEXT

You are continuing work on "The AI and Beyond" website. This is the chat for TASK-007.

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md`
2. `DOCS/PRD.md` - Section 3.5 (Portfolio Section)

---

#### TASK OBJECTIVE

Create the Portfolio section with:
1. 4-5 project showcases
2. Responsive grid (2 cols desktop, 1 mobile)
3. Click to expand with detailed modal
4. Project details: problem, solution, results
5. Technology badges

**Projects:**
1. App ESWBS - Sistema gestione manutenzione navale
2. Analisi dati manutenzione - Comparazione schedule IT/EN
3. Web app professionisti - Sito con booking
4. Automazione email coaching - Sistema follow-up automatico
5. (Optional) Prototipo assistente AI con RAG

**Acceptance Criteria:**
- [ ] Grid responsive layout
- [ ] Cards with placeholder images
- [ ] Click opens modal with AnimatePresence
- [ ] Modal has: images, problem, solution, results, tech badges
- [ ] Close on backdrop click or escape
- [ ] Focus trap in modal
- [ ] Keyboard accessible

---

#### MANDATORY END-OF-TASK ACTIONS

Commit: `feat(portfolio): add Portfolio section with project modals [TASK-007]`

---

---

### TASK-008: Before/After Comparison

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 3 hours
**Dependencies**: TASK-002

---

#### TASK OBJECTIVE

Create Before/After section showing workflow transformations:
1. 2-3 comparison examples
2. Interactive slider OR side-by-side
3. Visual contrast (manual vs AI-powered)
4. Numbers where possible

**Examples:**
1. Report generation: 4 hours → 15 minutes
2. Email follow-up: Manual tracking → Automated
3. Data analysis: Spreadsheets → Real-time dashboard

**Acceptance Criteria:**
- [ ] Interactive comparison (slider or toggle)
- [ ] Clear visual distinction before/after
- [ ] Credible, realistic improvements shown
- [ ] Scroll-triggered animation
- [ ] Mobile responsive

---

---

### TASK-009: ROI Calculator

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 3 hours
**Dependencies**: TASK-002

---

#### TASK OBJECTIVE

Create interactive ROI Calculator:
1. Input: Hours/week on repetitive tasks
2. Input: Optional hourly rate
3. Input: Task type dropdown
4. Animated output showing savings

**Formula (Conservative, 60% efficiency):**
```
hours_saved_monthly = hours_per_week × 4 × 0.60
annual_savings = hours_saved_monthly × 12 × hourly_rate

Task type multipliers:
- Data entry: ×1.2 (higher automation potential)
- Reporting: ×1.0 (standard)
- Communications: ×0.8 (lower automation potential)
- Other: ×0.9
```

**Acceptance Criteria:**
- [ ] Smooth slider or input for hours
- [ ] Real-time calculation updates
- [ ] Animated number counting
- [ ] Currency formatting (Italian: €)
- [ ] CTA linking to contact form
- [ ] Mobile responsive

---

---

### TASK-010: Process Timeline Section

**Status**: [ ] Pending
**Priority**: P2 - Medium
**Estimated Effort**: 2 hours
**Dependencies**: TASK-002

---

#### TASK OBJECTIVE

Create "Come Lavoro" timeline section:
1. Visual stepper/timeline
2. 5 steps with icons
3. Sequential scroll animation

**Steps:**
1. **Ascolto** - Capisco il tuo problema e i tuoi obiettivi
2. **Analizzo** - Studio la soluzione migliore per il tuo caso
3. **Progetto** - Definisco architettura e roadmap chiara
4. **Sviluppo** - Costruisco con metodologia agile e feedback continuo
5. **Consegno** - Testing, deployment e formazione del team

**Acceptance Criteria:**
- [ ] Vertical or horizontal timeline
- [ ] Icons for each step
- [ ] Sequential reveal on scroll
- [ ] Mobile: vertical always
- [ ] Connecting line/path between steps

---

---

### TASK-011: Contact Form with Validation

**Status**: [ ] Pending
**Priority**: P0 - Critical
**Estimated Effort**: 4 hours
**Dependencies**: TASK-002

---

#### CONTEXT

Contact form is critical for lead generation. Must be secure and user-friendly.

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md` - Especially Section 7 (Security)
2. `DOCS/PRD.md` - Section 3.9 (Contact Form)
3. `DOCS/STACK.md` - React Hook Form + Zod

---

#### TASK OBJECTIVE

Create contact form with:
1. Fields: Nome*, Email*, Azienda, Messaggio*, Privacy checkbox*
2. Real-time validation with clear error messages
3. Zod schema for validation
4. Loading and success states
5. Sticky mobile access button

**Acceptance Criteria:**
- [ ] All required fields validated
- [ ] Email format validated
- [ ] Real-time error display (not just on submit)
- [ ] Loading spinner during submission
- [ ] Success message (no redirect)
- [ ] Error handling for API failures
- [ ] Form disabled during submission
- [ ] Shake animation on error (subtle)
- [ ] Check animation on success
- [ ] Mobile: sticky button to open form
- [ ] ARIA labels and accessibility

---

#### DETAILED INSTRUCTIONS

**Zod Schema (lib/validations.ts):**
```typescript
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Il nome deve avere almeno 2 caratteri')
    .max(100, 'Il nome è troppo lungo'),
  email: z.string()
    .email('Inserisci un indirizzo email valido'),
  company: z.string().optional(),
  message: z.string()
    .min(10, 'Il messaggio deve avere almeno 10 caratteri')
    .max(1000, 'Il messaggio è troppo lungo'),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'Devi accettare la privacy policy' }),
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
```

**Security:**
- Client validation is for UX only
- Server MUST validate again (TASK-012)
- Sanitize all inputs before display

---

#### MANDATORY END-OF-TASK ACTIONS

Commit: `feat(contact): add contact form with validation [TASK-011]`

---

---

### TASK-012: Contact API with Rate Limiting

**Status**: [ ] Pending
**Priority**: P0 - Critical
**Estimated Effort**: 3 hours
**Dependencies**: TASK-011

---

#### CONTEXT

API endpoint for contact form. Security is CRITICAL.

---

#### REQUIRED READING (DO THIS FIRST)

1. `RULES.md` - Section 7 (Security Rules)
2. `DOCS/STACK.md` - Resend section
3. `DOCS/PRD.md` - NFR-010 through NFR-017 (Security requirements)

---

#### TASK OBJECTIVE

Create secure contact API endpoint:
1. POST /api/contact
2. Server-side validation (Zod)
3. Rate limiting (3 per IP per 15 min)
4. Email sending via Resend
5. Proper error responses

**Acceptance Criteria:**
- [ ] Validates all input server-side
- [ ] Rate limits by IP address
- [ ] Sends email via Resend
- [ ] Returns appropriate status codes
- [ ] Error messages don't expose internals
- [ ] Handles Resend API errors gracefully
- [ ] Logs errors (console, not to client)

---

#### DETAILED INSTRUCTIONS

**File: app/api/contact/route.ts**

**Rate Limiting Options:**
1. Simple in-memory (Map with timestamps) - for MVP
2. Vercel KV - for production scale
3. Upstash Redis - alternative

For MVP, use in-memory Map. Document that production should use Vercel KV.

**Email Template:**
```
Subject: Nuovo contatto dal sito - {name}

Nome: {name}
Email: {email}
Azienda: {company || 'Non specificata'}

Messaggio:
{message}

---
Inviato dal form di contatto di theaiandbeyond.com
```

**Security Checklist:**
- [ ] Input sanitization
- [ ] No SQL (but validate anyway)
- [ ] Rate limiting works
- [ ] API key in environment variable
- [ ] Error messages don't leak info
- [ ] Logs don't contain sensitive data

---

#### MANDATORY END-OF-TASK ACTIONS

Commit: `feat(api): add contact API with rate limiting [TASK-012]`

---

---

### TASK-013: Cookie Consent Banner

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 2 hours
**Dependencies**: TASK-002

---

#### TASK OBJECTIVE

Create simple GDPR-compliant cookie consent banner:
1. Banner appears on first visit
2. Accept/Decline options
3. Persist preference in localStorage
4. Link to privacy policy
5. Subtle, non-intrusive design

**Acceptance Criteria:**
- [ ] Shows on first visit only
- [ ] Accept loads analytics
- [ ] Decline skips analytics
- [ ] Preference persisted
- [ ] Privacy policy link
- [ ] Accessible (keyboard, screen reader)
- [ ] Doesn't block content entirely

---

---

### TASK-014: SEO & Metadata

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 2 hours
**Dependencies**: TASK-001

---

#### TASK OBJECTIVE

Configure SEO and metadata:
1. Complete meta tags
2. Open Graph tags
3. Structured data (JSON-LD)
4. sitemap.xml
5. robots.txt
6. Favicon and app icons

**Metadata:**
```
Title: The AI and Beyond | Consulenza e Sviluppo AI
Description: Trasformo idee in soluzioni AI che funzionano. Consulenza e sviluppo per aziende italiane che vogliono crescere con l'intelligenza artificiale.
```

**Acceptance Criteria:**
- [ ] Title and description configured
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter card tags
- [ ] JSON-LD for Organization
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] Favicon set

---

---

### TASK-015: Analytics Integration

**Status**: [ ] Pending
**Priority**: P2 - Medium
**Estimated Effort**: 1 hour
**Dependencies**: TASK-001

---

#### TASK OBJECTIVE

Integrate Vercel Analytics:
1. Install @vercel/analytics
2. Add Analytics component
3. Respect cookie consent

**Acceptance Criteria:**
- [ ] Analytics component added
- [ ] Only loads if consent given
- [ ] Works in production (Vercel)
- [ ] Web Vitals tracked

---

---

### TASK-016: Performance Optimization

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 2 hours
**Dependencies**: All sections complete

---

#### TASK OBJECTIVE

Optimize for Lighthouse 90+ scores:
1. Image optimization
2. Font loading optimization
3. Lazy loading for below-fold sections
4. Bundle analysis
5. Animation performance audit

**Acceptance Criteria:**
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] All animations 60fps

---

---

### TASK-017: Accessibility Audit & Fixes

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 2 hours
**Dependencies**: All sections complete

---

#### TASK OBJECTIVE

Complete accessibility audit:
1. Color contrast check
2. Keyboard navigation test
3. Screen reader test
4. Focus management
5. ARIA labels review

**Acceptance Criteria:**
- [ ] All text meets WCAG AA contrast
- [ ] Full keyboard navigation
- [ ] Screen reader announces correctly
- [ ] Focus visible on all elements
- [ ] Skip to content link works
- [ ] No keyboard traps
- [ ] prefers-reduced-motion respected

---

---

### TASK-018: E2E Tests for Critical Flows

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 3 hours
**Dependencies**: TASK-012

---

#### TASK OBJECTIVE

Write Playwright E2E tests for:
1. Navigation and smooth scroll
2. Mobile menu functionality
3. Contact form submission flow
4. ROI calculator interaction
5. Portfolio modal opening/closing

**Acceptance Criteria:**
- [ ] Tests run in CI
- [ ] Tests pass on Chrome, Firefox, Safari
- [ ] Critical paths covered
- [ ] Tests are stable (no flakiness)

---

---

### TASK-019: Final Review & Deployment

**Status**: [ ] Pending
**Priority**: P0 - Critical
**Estimated Effort**: 2 hours
**Dependencies**: All tasks

---

#### TASK OBJECTIVE

Final review and production deployment:
1. Security review
2. Performance final check
3. Cross-browser testing
4. Mobile testing
5. Vercel deployment
6. Domain configuration

**Acceptance Criteria:**
- [ ] All tests pass
- [ ] Security check passes
- [ ] Lighthouse 90+ on production
- [ ] Works on Chrome, Firefox, Safari
- [ ] Works on iOS Safari, Android Chrome
- [ ] No console errors
- [ ] Form sends emails in production
- [ ] Domain connected and HTTPS working

---

#### CHECKLIST

**Security:**
- [ ] No secrets in code
- [ ] .env not committed
- [ ] Security headers active
- [ ] Rate limiting working
- [ ] HTTPS only

**Performance:**
- [ ] All images optimized
- [ ] Fonts preloaded
- [ ] Bundle size reasonable
- [ ] Animations smooth

**Functionality:**
- [ ] All links work
- [ ] Form submits correctly
- [ ] Mobile menu works
- [ ] All sections display correctly

---

---

### TASK-020: Internationalization Setup (next-intl)

**Status**: [x] Completed
**Priority**: P0 - Critical
**Estimated Effort**: 4 hours
**Dependencies**: TASK-001

---

#### TASK OBJECTIVE

Configure next-intl for Italian + English support:
1. Install and configure next-intl
2. Restructure app to /app/[locale]
3. Create middleware for locale detection
4. Create translation files (it.json, en.json)
5. Configure hreflang tags for SEO

**Acceptance Criteria:**
- [ ] /it/ and /en/ routes work correctly
- [ ] Automatic locale detection from browser
- [ ] Language switcher in header
- [ ] All metadata locale-aware
- [ ] hreflang tags in <head>

---

#### FILES CREATED

- `i18n/request.ts` - Core i18n configuration
- `middleware.ts` - Locale routing middleware
- `messages/it.json` - Italian translations (~120 strings)
- `messages/en.json` - English translations (~120 strings)
- `app/[locale]/layout.tsx` - Locale-aware root layout
- `app/[locale]/page.tsx` - Locale-aware home page

---

---

### TASK-021: Particle System Background

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 3 hours
**Dependencies**: TASK-020

---

#### TASK OBJECTIVE

Create interactive particle system for Hero section:
1. Neural network style with connections
2. 80-100 particles with brand colors
3. Interactive mouse/touch effects
4. Respect prefers-reduced-motion
5. Dynamic import for performance

**Acceptance Criteria:**
- [ ] Particles render at 60fps
- [ ] Mouse interaction (grab mode) works
- [ ] Brand colors (cyan #00bcd4, blue #1a365d)
- [ ] Disabled for reduced motion users
- [ ] No impact on LCP (lazy loaded)

---

#### FILES CREATED

- `components/effects/ParticleBackground.tsx` - Main particle component
- `components/effects/ParticleConfig.ts` - Configuration options
- `components/effects/index.ts` - Barrel export

---

---

### TASK-022: Logo Enhancements

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 3 hours
**Dependencies**: TASK-020

---

#### TASK OBJECTIVE

Enhance logo usage across the site:
1. Favicon: wave icon only
2. Header: wave icon on all breakpoints
3. Hero background: full logo with animated glow

**Acceptance Criteria:**
- [ ] Favicon shows wave icon
- [ ] Header shows wave logo (mobile + desktop)
- [ ] Hero has decorative logo at 3% opacity
- [ ] Background logo has pulsing glow effect
- [ ] Glow respects reduced motion

---

#### FILES CREATED/MODIFIED

- `components/effects/DecorativeLogoBackground.tsx` - New animated background
- `components/layout/Header.tsx` - Updated to show wave only
- `components/sections/Hero.tsx` - Integrated decorative logo

---

---

### TASK-023: Typography Effects

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 4 hours
**Dependencies**: TASK-020

---

#### TASK OBJECTIVE

Create typography enhancement components:
1. AnimatedGradientText - Flowing gradient animation
2. SplitTextReveal - Character-by-character reveal
3. DynamicHighlight - Animated underline effect

**Acceptance Criteria:**
- [ ] Gradient flows smoothly on key text
- [ ] Split reveal triggers on scroll
- [ ] Highlight animates on intersection
- [ ] All effects respect reduced motion
- [ ] Mobile-friendly performance

---

#### FILES CREATED

- `components/effects/AnimatedGradientText.tsx`
- `components/effects/SplitTextReveal.tsx`
- `components/effects/DynamicHighlight.tsx`

---

---

### TASK-024: Floating Assistant Component

**Status**: [x] Completed
**Priority**: P2 - Medium
**Estimated Effort**: 5 hours
**Dependencies**: TASK-020, TASK-021

---

#### TASK OBJECTIVE

Create floating assistant mascot:
1. Animated blob/mascot in bottom-right
2. Appears after scroll (>300px)
3. Speech bubbles with contextual messages
4. Encourages contact form submission
5. Dismissible

**Messages:**
- After scroll: "Hai domande?" / "Have questions?"
- After 10s: "Posso aiutarti!" / "I can help!"
- Near form: "Compila il form, ti rispondo entro 24h"

**Acceptance Criteria:**
- [ ] Appears after scrolling past threshold
- [ ] Shows appropriate messages based on position
- [ ] Can be dismissed (hides for session)
- [ ] Click scrolls to contact section
- [ ] Reduced motion: static, no bounce

---

#### FILES CREATED

- `components/layout/FloatingAssistant.tsx` - Main assistant component
- `public/lottie/assistant-idle.json` - (Optional) Lottie animation

**Note:** Using SVG blob animation as fallback for Lottie.

---

---

### TASK-025: AI Image Prompts for Portfolio

**Status**: [x] Completed
**Priority**: P2 - Medium
**Estimated Effort**: 1 hour
**Dependencies**: None

---

#### TASK OBJECTIVE

Create documentation with AI prompts for generating portfolio images:
1. Detailed prompts for 5 portfolio projects
2. Thumbnail variants (1:1 format)
3. Brand color specifications
4. Tool recommendations

**Projects:**
1. App ESWBS - Naval maintenance dashboard
2. Data Analysis - Bilingual comparison tool
3. Healthcare Booking - Modern booking UI
4. Email Automation - Workflow visualization
5. AI Assistant RAG - Knowledge base chatbot

---

#### FILES CREATED

- `DOCS/AI-IMAGE-PROMPTS.md` - Complete prompt documentation

---

---

### TASK-026: Component i18n Integration

**Status**: [ ] Pending
**Priority**: P1 - High
**Estimated Effort**: 4 hours
**Dependencies**: TASK-020

---

#### TASK OBJECTIVE

Update all components to use useTranslations():
1. Replace hardcoded Italian text
2. Add translation keys to messages/*.json
3. Ensure all UI text is translated

**Components to update:**
- All sections in `/components/sections/`
- Layout components in `/components/layout/`
- Form validation messages

**Acceptance Criteria:**
- [ ] All visible text uses translations
- [ ] Form errors in both languages
- [ ] No hardcoded strings remain
- [ ] Both locales display correctly

---

---

### TASK-027: Documentation Update

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 2 hours
**Dependencies**: All previous tasks

---

#### TASK OBJECTIVE

Update all project documentation:
1. PRD.md - Add new requirements, remove i18n from out-of-scope
2. STACK.md - Add new dependencies
3. WORKPLAN.md - Add TASK-020 through TASK-027

**Acceptance Criteria:**
- [ ] PRD reflects current feature set
- [ ] STACK lists all technologies
- [ ] WORKPLAN has all tasks documented
- [ ] Version numbers updated

---

## Appendix: Report Template

Use this template for task reports in `DOCS/reports/`:

```markdown
# TASK-XXX Report
## [Task Title]

**Date**: YYYY-MM-DD
**Status**: Completed

## Summary
Brief description of what was accomplished.

## Files Created/Modified
- `path/to/file.ts` - Description
- `path/to/other.ts` - Description

## Tests Added
- `tests/unit/file.test.ts` - X tests added
- `tests/integration/api.test.ts` - X tests added

## Security Considerations
- Input validation implemented for X
- Rate limiting configured as Y
- No secrets in code (verified)

## Issues Encountered
1. **Issue**: Description
   **Resolution**: How it was solved

## Next Steps
- Recommendations for following tasks
- Any technical debt to address

## Commit
`type(scope): description [TASK-XXX]`
```

---

---

### TASK-029: WOW Effects (Video Logo, Storytelling Scroll, Cursor, Smooth Scroll)

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 6 hours
**Dependencies**: TASK-028

---

#### TASK OBJECTIVE

Add premium WOW effects to elevate the user experience:
1. Animated video logo in Hero section
2. Scroll-driven storytelling for BeforeAfter section
3. Custom animated cursor
4. Smooth scroll (Lenis)
5. Global particles on light backgrounds

---

#### FILES CREATED

- `public/videos/hero-logo.webm` - WebM video logo (4.3MB)
- `public/videos/hero-logo.mp4` - MP4 fallback (6.5MB)
- `components/effects/HeroVideoLogo.tsx` - Video logo with fallback
- `components/effects/SmoothScroll.tsx` - Lenis smooth scroll wrapper
- `components/effects/GlobalParticles.tsx` - Particles for light sections
- `components/effects/CustomCursor.tsx` - Animated dot+ring cursor
- `hooks/useScrollProgress.ts` - Scroll progress tracking hooks

#### FILES MODIFIED

- `components/sections/Hero.tsx` - Integrated HeroVideoLogo
- `components/sections/BeforeAfter.tsx` - Complete rewrite with 4-phase storytelling
- `components/sections/Process.tsx` - Scroll-driven active step + progress line
- `components/effects/ParticleConfig.ts` - Added light background configs
- `components/effects/index.ts` - Exported new components
- `hooks/index.ts` - Exported useScrollProgress
- `app/[locale]/layout.tsx` - Integrated SmoothScroll, GlobalParticles, CustomCursor
- `messages/it.json` - Added phase translations for BeforeAfter
- `messages/en.json` - Added phase translations for BeforeAfter

---

#### IMPLEMENTATION DETAILS

**1. Video Logo (HeroVideoLogo.tsx)**
- Client component with WebM priority, MP4 fallback
- SVG static fallback for reduced-motion or errors
- Autoplay, muted, playsInline for mobile
- Shows static logo after video ends

**2. Storytelling BeforeAfter (BeforeAfter.tsx)**
- 400vh sticky container with 4 phases
- Phase 1: Problem (red/orange bg)
- Phase 2: Transition question (blue gradient)
- Phase 3: Solution (green bg)
- Phase 4: Results with animated counters
- AnimatePresence for smooth phase transitions
- Scroll progress indicator

**3. Dynamic Process (Process.tsx)**
- useActiveStep hook tracks scroll position
- Active step highlights with accent color + pulse
- Progress line fills based on scroll
- GPU-accelerated animations

**4. Custom Cursor (CustomCursor.tsx)**
- Inner dot (8x8px) follows exactly
- Outer ring (40x40px) with spring delay
- Expands on hover over interactive elements
- Hidden on touch devices
- mix-blend-mode: difference

**5. Smooth Scroll (SmoothScroll.tsx)**
- Lenis with 1.2s duration
- Custom easing function
- Respects prefers-reduced-motion
- Exposed globally for component access

**6. Global Particles (GlobalParticles.tsx)**
- particleConfigLight: 30 blue particles, 0.12 link opacity
- Hidden in Hero section (has own particles)
- pointer-events: none for click-through

---

#### ACCESSIBILITY

- All components respect `prefers-reduced-motion`
- Video has static SVG fallback
- BeforeAfter shows all phases for reduced-motion
- Custom cursor hidden for touch/reduced-motion

---

#### DEPENDENCIES ADDED

- `lenis` - Smooth scroll library

---

#### TESTS

- Build passes without errors
- TypeScript compiles successfully
- ESLint passes with no warnings
- Dev server runs correctly

---

#### COMMIT

`feat(effects): add WOW effects - video logo, scroll storytelling, cursor, smooth scroll [TASK-029]`

---

---

### TASK-030: UX Enhancements (Language Selector, Video Section, Portfolio Redesign, Effects)

**Status**: [x] Completed
**Priority**: P0 - Critical
**Estimated Effort**: 8 hours
**Dependencies**: TASK-029

---

#### TASK OBJECTIVE

Major UX enhancements based on user feedback:
1. Fix modal scroll bug (Lenis not stopping when modal open)
2. Language selector modal on first visit
3. New dedicated video section between Hero and About
4. Floating corner video after scrolling past section
5. Blue particles on specific sections (Portfolio, Services, Contact)
6. Portfolio redesign with Featured + Grid swap animation
7. WOW effect components (MagneticButton, TiltCard, CountUpNumber)

---

#### FILES CREATED (12)

| File | Purpose |
|------|---------|
| `components/layout/LanguageSelectorModal.tsx` | First-visit language selection modal |
| `components/sections/BrandShowcase.tsx` | Dedicated video section between Hero and About |
| `components/sections/HomeContent.tsx` | Client wrapper managing scroll state |
| `components/effects/FloatingVideo.tsx` | Floating corner video after scroll |
| `components/ui/MagneticButton.tsx` | Button with magnetic cursor attraction |
| `components/effects/TiltCard.tsx` | 3D tilt effect wrapper component |
| `components/effects/CountUpNumber.tsx` | Animated number counter on scroll |
| `hooks/useScrollProgress.ts` | Scroll progress tracking hook |

#### FILES MODIFIED (15+)

| File | Changes |
|------|---------|
| `components/sections/Portfolio.tsx` | Complete redesign: Featured + Grid with animated swap |
| `components/sections/Services.tsx` | Added Lenis scroll lock fix for modal |
| `components/sections/Hero.tsx` | Removed video, using static logo |
| `components/effects/GlobalParticles.tsx` | Section-specific visibility (Portfolio, Services, Contact) |
| `components/effects/ParticleConfig.ts` | Enhanced blue particle config for light backgrounds |
| `app/[locale]/layout.tsx` | Added LanguageSelectorModal integration |
| `app/[locale]/page.tsx` | Using HomeContent client wrapper |
| `messages/it.json` | Added brandShowcase, languageSelector strings |
| `messages/en.json` | Added brandShowcase, languageSelector strings |
| `components/layout/index.ts` | Exported LanguageSelectorModal |
| `components/sections/index.ts` | Exported BrandShowcase, HomeContent |
| `components/effects/index.ts` | Exported FloatingVideo, TiltCard, CountUpNumber |
| `components/ui/index.ts` | Exported MagneticButton |
| `hooks/index.ts` | Exported useScrollProgress |

---

#### IMPLEMENTATION DETAILS

**1. Modal Scroll Fix**
- Added `window.lenis?.stop()` on modal open
- Added `window.lenis?.start()` on modal close
- Applied to Portfolio and Services modals

**2. Language Selector Modal (LanguageSelectorModal.tsx)**
- Checks `localStorage.getItem('preferred-locale')` on mount
- Shows elegant modal with IT/EN flags if no preference saved
- Backdrop blur with dark overlay
- Framer Motion animations (fade + scale)
- Saves preference and redirects to chosen locale
- Stops Lenis scroll when modal is open

**3. BrandShowcase Section (BrandShowcase.tsx)**
- Positioned between Hero and About
- Full-screen video loop at center
- Neural network particles in background
- Scroll progress tracking for parallax
- Callback `onScrollPastSection` triggers floating video

**4. FloatingVideo Component (FloatingVideo.tsx)**
- Fixed position bottom-right corner
- Appears when scrolled past BrandShowcase
- Video plays once, then fades out permanently
- Uses `hasPlayedRef` to prevent reappearance
- Smooth entrance/exit animations

**5. Section-Specific Particles (GlobalParticles.tsx)**
- Only visible on: Portfolio, Services, Contact sections
- Checks section visibility (20% threshold)
- Blue colors for contrast on white backgrounds
- Interactive grab mode on hover

**6. Portfolio Redesign (Portfolio.tsx)**
- FeaturedCard: Large full-width card with details
- GridCard: 2x2 grid of smaller cards
- Animated swap using LayoutGroup + layoutId
- Click grid card → swaps with featured
- Smooth Framer Motion transitions

**7. WOW Effect Components**
- **MagneticButton**: Attracts cursor when nearby, spring animation
- **TiltCard**: 3D rotation following mouse position
- **CountUpNumber**: Animated counting from 0 to value on scroll

---

#### ACCESSIBILITY

- All effects respect `prefers-reduced-motion`
- Modal focus trap and keyboard navigation
- ARIA labels on all interactive elements
- Touch device fallbacks (no cursor effects)
- Video has appropriate accessibility attributes

---

#### TESTS

- `npm run build` passes successfully
- TypeScript strict mode: no errors
- ESLint: no warnings
- Static pages generate correctly

---

#### COMMIT

`feat(ux): add language selector, video section, portfolio redesign, WOW effects [TASK-030]`

---

---

### TASK-031: AI Core Avatar Redesign

**Status**: [x] Completed
**Priority**: P1 - High
**Estimated Effort**: 5 hours
**Dependencies**: TASK-030

---

#### TASK OBJECTIVE

Replace the cartoonish FloatingAssistant blob with a professional, tech-focused "AI Core" design:
1. Animated nucleus with orbiting particles and glow effects
2. Contextual morphing based on current page section
3. Glitch reveal effect for speech bubbles
4. Mouse-reactive magnetic attraction
5. Brand-consistent color scheme with animated glow

---

#### FILES CREATED (8)

| File | Purpose |
|------|---------|
| `components/effects/AICore/AICore.tsx` | Main component orchestrating all sub-components |
| `components/effects/AICore/AICoreNucleus.tsx` | Central nucleus with pulse and glow animations |
| `components/effects/AICore/AICoreOrbits.tsx` | Elliptical orbits with rotating dots |
| `components/effects/AICore/AICoreParticles.tsx` | Orbiting particles with varying opacity |
| `components/effects/AICore/GlitchText.tsx` | Text with digital glitch reveal effect |
| `components/effects/AICore/useAICoreState.ts` | Hook for section detection and intensity config |
| `components/effects/AICore/index.ts` | Barrel exports |
| `DOCS/PLAN-AI-CORE-AVATAR.md` | Detailed implementation plan |

#### FILES MODIFIED (4)

| File | Changes |
|------|---------|
| `app/[locale]/page.tsx` | Replaced FloatingAssistant with AICore import |
| `components/effects/index.ts` | Added AICore export |
| `messages/it.json` | Updated assistant translations, added dismiss key |
| `messages/en.json` | Updated assistant translations, added dismiss key |

---

#### IMPLEMENTATION DETAILS

**1. AI Core Visual Design**
- Central nucleus (35% of total size) with radial gradient
- 2-3 elliptical orbits at different angles and speeds
- 6-8 orbiting particles with random timing
- Outer glow layer with variable opacity
- Size: 64px base, 72px on hover

**2. Morphing by Section**
```typescript
const INTENSITY_CONFIG = {
  hero: { orbitSpeed: 12, glowOpacity: 0.3, pulseScale: 1.03 },
  about: { orbitSpeed: 10, glowOpacity: 0.35, pulseScale: 1.04 },
  services: { orbitSpeed: 7, glowOpacity: 0.45, pulseScale: 1.05 },
  portfolio: { orbitSpeed: 5, glowOpacity: 0.55, pulseScale: 1.06 },
  contact: { orbitSpeed: 6, glowOpacity: 0.7, pulseScale: 1.08 },
};
```

**3. Glitch Text Effect**
- Initial burst of random characters (50ms × 3 iterations)
- Character-by-character reveal (30ms per char)
- Blinking cursor during reveal
- Occasional micro-glitch on stable text (30% chance every 2s)
- RGB color separation effect during glitch

**4. Mouse Interaction**
- Magnetic attraction within 150px range
- Maximum offset: 4px toward cursor
- Spring animation for smooth movement
- Throttled to 60fps for performance

**5. Color Palette**
- Nucleus: #137dc5 → #1b2f75 (radial gradient)
- Orbits: #00aeef with 0.3-0.6 opacity
- Particles: #ffffff, #00aeef, #137dc5
- Glow: rgba(0, 174, 239, 0.3-0.7)

---

#### ACCESSIBILITY

- `prefers-reduced-motion`: Shows static gradient circle only
- Focus visible ring for keyboard navigation
- ARIA labels for screen readers
- Touch devices: No mouse effects, click still works

---

#### PERFORMANCE

- All animations use GPU-accelerated transforms
- Mouse tracking throttled to 16ms (~60fps)
- Memoized particle generation
- RequestAnimationFrame for smooth updates
- IntersectionObserver for section detection

---

#### TESTS

- `npm run build` passes successfully
- TypeScript strict mode: no errors
- ESLint: no warnings
- Static pages generate correctly

---

#### COMMIT

`feat(avatar): replace FloatingAssistant with AI Core design [TASK-031]`
