# PROJECT RULES

# The AI and Beyond - Website

> **CRITICAL**: Read this file COMPLETELY before making ANY changes to the codebase.
> These rules are NON-NEGOTIABLE.

---

## 1. CORE PRIORITIES (NON-NEGOTIABLE)

Priority order - when in conflict, higher priority wins:

1. **SPEED**
   - Minimize unnecessary complexity
   - Use efficient patterns and established solutions
   - No premature optimization - optimize only measured bottlenecks
   - Ship working features, iterate based on feedback

2. **QUALITY**
   - Clean Code principles (see Section 2)
   - Meaningful, intention-revealing names
   - Small functions with single responsibility
   - Code that reads like well-written prose

3. **CONTROL**
   - Every change tracked in git
   - Every decision documented
   - Reproducible builds
   - No "magic" - explicit over implicit

4. **SECURITY**
   - Input validation on ALL external data
   - No hardcoded secrets EVER
   - Principle of least privilege
   - Defense in depth

---

## 2. CLEAN CODE STANDARDS (Robert C. Martin)

### 2.1 Functions

- **Maximum 20 lines** - if longer, extract into smaller functions
- **Single responsibility** - do ONE thing and do it well
- **Maximum 3 arguments** - use objects for more
- **No side effects** - avoid modifying external state
- **Command-Query Separation** - either change state OR return data, never both

### 2.2 Naming

- **Intention-revealing** - name should explain what and why
- **No abbreviations** - `calculateTotalPrice()` not `calcTotPrc()`
- **Searchable** - avoid single-letter names except loop counters
- **Pronounceable** - you should be able to discuss the code verbally
- **Consistent** - use same name for same concept throughout

### 2.3 Comments

- **Only for "WHY"** - never for "WHAT" (code should be self-documenting)
- **Keep updated** - outdated comments are worse than no comments
- **Avoid commented-out code** - delete it, git remembers
- **TODO format** - `// TODO: [TASK-XXX] Description`

### 2.4 Error Handling

- **Exceptions over return codes** - throw meaningful errors
- **Never return null** - use undefined, empty arrays, or Optional patterns
- **Never pass null** - avoid null parameters
- **Provide context** - error messages should explain what went wrong
- **Fail fast** - validate early, fail with clear message

### 2.5 Core Principles

- **DRY** - Don't Repeat Yourself. Every piece of knowledge has single representation
- **YAGNI** - You Aren't Gonna Need It. Don't build features "just in case"
- **Boy Scout Rule** - Leave code cleaner than you found it
- **KISS** - Keep It Simple, Stupid. Simple solutions over clever ones

---

## 3. TESTING RULES (TDD)

### 3.1 Test-First Approach

1. Write a failing test
2. Write minimum code to pass
3. Refactor while keeping tests green
4. Repeat

### 3.2 F.I.R.S.T. Principles

- **Fast** - Tests run in milliseconds
- **Independent** - Tests don't depend on each other
- **Repeatable** - Same result every time, in any environment
- **Self-validating** - Pass or fail, no manual interpretation
- **Timely** - Written before or with the code, not after

### 3.3 Test Structure

- **One concept per test** - test ONE thing only
- **Naming convention**: `test_[function]_[scenario]_[expected]`
- **Arrange-Act-Assert** pattern (Given-When-Then)
- **Test happy paths AND error paths AND edge cases**

### 3.4 Coverage Requirements

- Unit tests for all utility functions
- Integration tests for API routes
- Component tests for interactive elements
- E2E tests for critical user flows

---

## 4. REFACTORING RULES (Martin Fowler)

### 4.1 Definition

Refactoring = change structure WITHOUT changing behavior

### 4.2 Process

1. **Small steps** - one refactoring at a time
2. **Test after each step** - run tests after every change
3. **Commit frequently** - small, atomic commits

### 4.3 Two Hats Rule

**NEVER** refactor AND add features simultaneously:

- **Feature hat**: Add functionality, tests may fail temporarily
- **Refactoring hat**: Change structure, ALL tests must pass

### 4.4 When to Refactor

- Rule of Three: First time, do it. Second time, wince. Third time, refactor.
- Before adding new feature to messy code
- During code review when issues spotted
- **NOT** for hypothetical future needs

---

## 5. STACK-SPECIFIC RULES

### 5.1 TypeScript

- **Strict mode ALWAYS** - no `any` type except when absolutely necessary
- **Interfaces over types** for objects that can be extended
- **Type exports** - export types from dedicated files
- **Null checks** - use strict null checks, optional chaining
- **No implicit any** - every variable must have a type

### 5.2 React / Next.js

- **Functional components ONLY** - no class components
- **Custom hooks for logic** - extract reusable logic into hooks
- **Props interfaces** - define TypeScript interfaces for all props
- **No inline styles** - use Tailwind CSS classes
- **Server Components by default** - use 'use client' only when necessary
- **Proper key props** - unique, stable keys for lists

### 5.3 Next.js App Router Specific

- **Route groups** for organization `(group)/page.tsx`
- **loading.tsx** for loading states
- **error.tsx** for error boundaries
- **API routes** in `/app/api/` with `route.ts`
- **Metadata exports** for SEO
- **Dynamic imports** for code splitting

### 5.4 Tailwind CSS

- **Mobile-first** - base styles for mobile, then `sm:`, `md:`, etc.
- **Consistent spacing** - use Tailwind's spacing scale
- **Custom classes in globals.css** only for truly reusable patterns
- **No arbitrary values** unless absolutely necessary
- **Component variants** via CVA or similar pattern

### 5.5 Framer Motion

- **GPU-accelerated properties** - transform, opacity only
- **Exit animations** - always use AnimatePresence for unmount
- **Reduced motion** - respect `prefers-reduced-motion`
- **Stagger children** - use parent orchestration
- **Layout animations** - use `layout` prop for smooth resizes

### 5.6 Forms (React Hook Form + Zod)

- **Schema-first** - define Zod schema before form
- **Server validation** - NEVER trust client validation alone
- **Error messages** - clear, user-friendly, in Italian
- **Loading states** - disable form during submission

---

## 6. GIT & COMMITS

### 6.1 Commit Message Format

```
<type>(<scope>): <description> [TASK-XXX]

[optional body]

[optional footer]
```

### 6.2 Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `refactor` - Code change that neither fixes bug nor adds feature
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, tooling
- `security` - Security-related changes
- `perf` - Performance improvements
- `style` - Code style (formatting, missing semicolons)

### 6.3 Rules

- **Always reference task ID** from WORKPLAN.md
- **Commit after EVERY completed mini-task**
- **ALWAYS ask for confirmation** before committing
- **Atomic commits** - one logical change per commit
- **Present tense** - "Add feature" not "Added feature"

### 6.4 NEVER Commit

- `.env` files or any environment files
- Secrets, API keys, credentials
- `node_modules/`
- Build outputs (`.next/`, `out/`)
- IDE settings unless shared
- OS files (`.DS_Store`, `Thumbs.db`)

---

## 7. SECURITY RULES (MANDATORY)

### 7.1 Input Validation

- **ALL external input is suspect** - form data, URL params, headers
- **Validate type, length, format, range** - use Zod schemas
- **Sanitize for output context** - HTML, SQL, etc.
- **Whitelist over blacklist** - allow known good, reject everything else

### 7.2 Secrets Management

- **NEVER hardcode** - use environment variables
- **Different secrets per environment** - dev, staging, prod
- **Rotate regularly** - especially after exposure
- **`.env.example`** - document required variables (without values)
- **Verify `.gitignore`** - before EVERY commit

### 7.3 API Security

- **Rate limiting** - prevent abuse (3 requests per 15 min for contact form)
- **Input validation** - validate AND sanitize all inputs
- **Error messages** - don't expose internal details
- **CORS** - configure appropriately
- **HTTPS only** - no mixed content

### 7.4 Headers (Next.js Config)

Required security headers:

- `X-DNS-Prefetch-Control`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Content-Security-Policy`

### 7.5 Dependencies

- **Audit regularly** - `npm audit` on every install
- **Review before adding** - check downloads, maintenance, issues
- **Lock versions** - use `package-lock.json`
- **Update promptly** - especially security patches

### 7.6 Error Handling

- **Never expose stack traces** in production
- **Don't reveal system info** - database type, file paths, etc.
- **Fail securely** - deny access by default on errors
- **Log appropriately** - enough to debug, not enough to leak

---

## 8. DOCUMENTATION RULES

### 8.1 Required Updates

- **After EVERY task**: Update `DOCS/reports/TASK-XXX-report.md`
- **New commands**: Update Makefile with documentation
- **Progress**: Keep WORKPLAN.md current
- **Architecture decisions**: Document in PRD.md or dedicated ADR

### 8.2 README Requirements

- Working Quick Start (copy-paste to run)
- Prerequisites listed
- Environment setup instructions
- Available commands
- Project structure overview

### 8.3 Code Documentation

- JSDoc for exported functions
- README in complex directories
- Type definitions are documentation
- Examples for non-obvious usage

---

## 9. CHAT/SESSION RULES

### 9.1 Start of Chat

1. Read RULES.md completely
2. Read current task from WORKPLAN.md
3. Read relevant previous reports
4. Understand full context before coding

### 9.2 During Work

- Follow task instructions precisely
- Ask if anything is unclear
- Update todos as you progress
- Test frequently

### 9.3 End of Chat

1. Run all tests - ensure they pass
2. Run `make lint` - fix any issues
3. Run `make security-check` - verify no vulnerabilities
4. Create/update `DOCS/reports/TASK-XXX-report.md`
5. Update WORKPLAN.md task status
6. **ASK FOR CONFIRMATION** before committing
7. Commit with proper message format

### 9.4 If Uncertain

- **ASK before implementing** - wrong assumptions waste time
- **Document the question** - helps future sessions
- **Provide options** - suggest alternatives when asking

---

## 10. PERFORMANCE RULES

### 10.1 Images

- Use `next/image` for automatic optimization
- Provide width/height to prevent layout shift
- Use appropriate formats (WebP with fallbacks)
- Lazy load below-the-fold images

### 10.2 Fonts

- Preload critical fonts
- Use `display: swap` for fallback
- Subset fonts if possible
- Limit font weights/variants

### 10.3 JavaScript

- Code split by route (automatic with Next.js)
- Dynamic imports for heavy components
- Avoid large dependencies when smaller alternatives exist
- Tree-shaking friendly imports

### 10.4 CSS

- Purge unused styles (Tailwind does this)
- Avoid deep nesting
- Use CSS containment where appropriate
- Critical CSS inline (Next.js handles)

### 10.5 Animations

- **GPU-accelerated only**: transform, opacity
- **60fps target** - test on low-end devices
- **Will-change sparingly** - only when needed
- **Reduce motion** - honor user preference

---

## 11. ACCESSIBILITY RULES

### 11.1 Semantic HTML

- Use appropriate elements (nav, main, article, etc.)
- One H1 per page, proper heading hierarchy
- Lists for lists, tables for tabular data
- Buttons for actions, links for navigation

### 11.2 Interactive Elements

- Focus visible on ALL interactive elements
- Touch targets minimum 44x44px
- Keyboard navigation complete
- No keyboard traps

### 11.3 Content

- Alt text on all images (descriptive, not "image of")
- Labels on all form inputs
- Error messages associated with fields
- Skip to content link

### 11.4 Visual

- Color contrast WCAG AA (4.5:1 for text)
- Don't rely on color alone for meaning
- Respect `prefers-reduced-motion`
- Respect `prefers-color-scheme` if implementing dark mode

---

## 12. FILE ORGANIZATION

```
/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections
│   └── layout/            # Layout components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
├── public/
│   ├── images/            # Static images
│   └── videos/            # Static videos
├── types/
│   └── index.ts           # TypeScript types
├── tests/                 # Test files
├── DOCS/                  # Documentation
│   ├── reports/           # Task reports
│   ├── PRD.md            # Requirements
│   ├── STACK.md          # Stack rationale
│   └── WORKPLAN.md       # Task plan
├── RULES.md              # This file
├── Makefile              # Commands
└── README.md             # Project overview
```

---

## QUICK REFERENCE

### Before Every Change

- [ ] Read current task from WORKPLAN.md
- [ ] Understand requirements from PRD.md
- [ ] Check relevant rules above

### After Every Change

- [ ] Run tests
- [ ] Run linter
- [ ] Update documentation

### Before Every Commit

- [ ] All tests pass
- [ ] No lint errors
- [ ] No security issues
- [ ] `.env` not included
- [ ] Task report updated
- [ ] **ASK FOR CONFIRMATION**

---

**Remember: When in doubt, ASK. It's faster to clarify than to fix.**
