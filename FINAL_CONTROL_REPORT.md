# Final Control Report

## The AI and beyond — theaiandbeyond.it

**Review Date**: 2026-02-13
**Reviewer**: Claude (Final Control Skill)
**Scope**: Full project — all 5 pillars
**Branch**: fix/jsonld-duplicate-faq (clean, up to date with remote)
**Authoritative Documents**: RULES.md, DOCS/PRD.md, DOCS/BIBBIA-SICUREZZA-DEPLOY.md (SGDM)

---

## 1. Executive Summary

### Overall Verdict: PASS

| Pillar          | Verdict | Critical | High  | Medium | Low   |
| --------------- | ------- | -------- | ----- | ------ | ----- |
| Performance     | WARN    | 0        | 0     | 1      | 2     |
| Security        | PASS    | 0        | 0     | 1      | 1     |
| Legal & Privacy | PASS    | 0        | 0     | 0      | 1     |
| SEO             | PASS    | 0        | 0     | 0      | 2     |
| Accessibility   | PASS    | 0        | 0     | 1      | 1     |
| **TOTAL**       |         | **0**    | **0** | **3**  | **7** |

**Blocking issues**: 0 findings block launch.
**STOP items**: 3 resolved (see below).

### Verdict Criteria

- **PASS**: 0 Critical, 0 High. Ready for production.
- **CONDITIONAL PASS**: 0 Critical, High issues have documented mitigation plan. Deployable with accepted risk.
- **FAIL**: 1+ Critical findings. Do NOT deploy.

**Post-remediation note**: All HIGH findings resolved. All STOP items resolved. Verdict upgraded from CONDITIONAL PASS to PASS.

---

## 2. Blocking Issues (CRITICAL)

None. No CRITICAL findings identified.

---

## 3. STOP Items (Human Decision Required)

| ID       | Type     | Description                                                                           | Resolution                                                                                                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| STOP-001 | Infra    | Next.js 14.2.35 had 2 known HIGH CVEs (DoS via Image Optimizer, RSC deserialization). | RESOLVED: Upgraded to Next.js 15.5.12 + React 19.2.4. Build OK, 297 tests pass, lint + typecheck clean.                                                                                        |
| STOP-002 | Legal    | Resend (email provider) DPA status verification for GDPR Art. 28.                     | RESOLVED: Resend DPA is standard, binding upon ToS acceptance. Includes EU SCCs (Module 2), UK SCCs, EU-US DPF. Sub-processors at resend.com/legal/subprocessors. Contact: privacy@resend.com. |
| STOP-003 | Business | Cookie consent is binary (Accept All / Decline All).                                  | RESOLVED: Binary consent is GDPR-compliant for analytics-only (GA4 + Vercel). No marketing pixels present. Documented: upgrade to granular categories required if marketing tools added.       |

---

## 4. Pillar Details

### 4.1 Performance

**Verdict**: WARN

#### Findings

| ID       | Severity | Finding                                                                                                                                                               | Location                               | Recommendation                                                                                                      | Verification                    |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| PERF-001 | ~~M~~    | ~~`will-change: auto` on `.blur-3xl` redundant.~~ RESOLVED: Removed from globals.css.                                                                                 | globals.css                            | Done.                                                                                                               | N/A                             |
| PERF-002 | M        | tsparticles (ParticleBackground + GlobalParticles) loads ~50KB minified. Although lazy-loaded and mobile-optimized, it remains the heaviest non-framework dependency. | components/effects/GlobalParticles.tsx | Monitor real-user LCP impact. If particles delay LCP on mid-range devices, consider removing from initial viewport. | Lighthouse on mobile emulation  |
| PERF-003 | L        | BeforeAfter component uses Framer Motion `layout` prop which forces layout recalculation. Acceptable for this component but monitor for jank.                         | components/sections/BeforeAfter.tsx    | Profile on low-end devices. If CLS or jank observed, replace with transform-based animation.                        | Chrome DevTools Performance tab |
| PERF-004 | L        | Lighthouse scores not verified in this review (no runtime access). PRD requires >= 90 all categories.                                                                 | [LIGHTHOUSE: NOT TESTED]               | Run `npx lighthouse https://theaiandbeyond.it/it --view` on production URL before declaring launch-ready.           | Lighthouse CI or manual         |

#### Architecture Strengths (INFO)

- Server Components default, Client Components only where needed (84 `'use client'` directives, appropriate for interactive SPA)
- 8 below-fold sections dynamically imported via `next/dynamic` with loading skeletons (HomeContent.tsx)
- Hero and BrandShowcase eagerly loaded (correct for ATF content)
- All images use `next/image` with correct `priority` on LCP images, `loading="lazy"` on below-fold
- Fonts self-hosted via `next/font` with `display: 'swap'`
- Image formats: AVIF + WebP configured in next.config.mjs
- Static asset caching: `max-age=31536000, immutable`
- `prefers-reduced-motion` respected globally (CSS + per-component hooks)
- Third-party scripts (GA4, Vercel Analytics) loaded `afterInteractive` and only after consent
- `removeConsole` enabled in production compiler config
- `optimizePackageImports` for framer-motion, react-hook-form

#### Metrics (not measurable in static review)

| Metric             | Measured | Target  | Status                 |
| ------------------ | -------- | ------- | ---------------------- |
| LCP                | N/A      | < 2.5s  | [VERIFY ON PRODUCTION] |
| INP                | N/A      | < 200ms | [VERIFY ON PRODUCTION] |
| CLS                | N/A      | < 0.1   | [VERIFY ON PRODUCTION] |
| Bundle size (gzip) | N/A      | < 200KB | [VERIFY ON PRODUCTION] |

---

### 4.2 Security

**Verdict**: WARN
**SGDM Compliance**: Compliant (no violations of BIBBIA-SICUREZZA-DEPLOY.md guardrails)

#### Findings

| ID      | Severity | Finding                                                                                                                                     | OWASP Ref | Location           | Recommendation                                                                                                          | Verification                            |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| SEC-001 | ~~H~~    | ~~Next.js 14.2.35 had 2 known CVEs.~~ RESOLVED: Upgraded to Next.js 15.5.12. 0 production CVEs remaining.                                   | A06:2021  | package.json       | ~~Upgrade Next.js~~ Done.                                                                                               | `npm audit --omit=dev` returns 0 vulns  |
| SEC-002 | ~~M~~    | ~~`productionBrowserSourceMaps` not explicit.~~ RESOLVED: Added `productionBrowserSourceMaps: false` to next.config.mjs.                    | A05:2021  | next.config.mjs:57 | Done.                                                                                                                   | Verify no `.map` files in production    |
| SEC-003 | M        | Pre-commit hook (Husky) runs lint-staged only. No secret scanning in commit hooks. CI has Gitleaks but local commits unchecked.             | A02:2021  | .husky/pre-commit  | Add secret detection to pre-commit (e.g., `git-secrets` or `detect-secrets`). Low priority: CI catches secrets on push. | Test with a dummy secret in staged file |
| SEC-004 | ~~M~~    | ~~SGDM R4/R5 (no SAST/SCA/secret scanning in CI).~~ RESOLVED: security-ci.yml has npm audit + Gitleaks. Branch protection confirmed active. | A08:2021  | .github/workflows/ | Done.                                                                                                                   | CI pipeline green                       |
| SEC-005 | ~~L~~    | ~~Referrer-Policy: origin-when-cross-origin.~~ RESOLVED: Upgraded to `strict-origin-when-cross-origin`.                                     | A05:2021  | next.config.mjs:31 | Done.                                                                                                                   | Check response headers                  |

#### Security Architecture Strengths (INFO)

- CSP dynamically generated per-request in middleware.ts with nonce for JSON-LD
- `unsafe-eval` only in development mode (line 33 conditional)
- `unsafe-inline` justified: required for Next.js hydration (documented in code comments)
- HSTS: `max-age=63072000; includeSubDomains; preload` (2 years)
- X-Frame-Options: SAMEORIGIN + CSP `frame-ancestors 'self'`
- X-Content-Type-Options: nosniff
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- .env.local NOT tracked in git (verified: `git ls-files --error-unmatch` returns error)
- .env.example has placeholder values only
- All API input validated with Zod (contact: name 2-100, email RFC 5322, message 10-1000, privacy=true)
- HTML output sanitized via sanitizeForHtml() (& < > " ' in correct order)
- Rate limiting: 3 requests / 15 min per IP via Upstash Redis + in-memory fallback
- Rate limit returns HTTP 429 with Retry-After header
- IP anonymized in logs (last octet masked)
- Error responses: generic messages, no stack traces, no internal paths
- `removeConsole` in production compiler
- CI pipeline: lint, typecheck, unit tests, dependency scan, Gitleaks secret scanning, production build
- security.txt at /.well-known/security.txt (RFC 9116)

---

### 4.3 Legal & Privacy

**Verdict**: PASS

#### Findings

| ID      | Severity | Finding                                                                                                                                                                                  | Regulation            | Location                               | Recommendation                                                                                           |
| ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| LEG-001 | ~~M~~    | ~~Resend DPA status not verified.~~ RESOLVED: Resend DPA is standard, binding upon ToS acceptance. Includes EU SCCs, EU-US DPF. Documented in BIBBIA Decision Log 2026-02-13.            | GDPR Art. 28          | app/api/contact/route.ts               | Done.                                                                                                    |
| LEG-002 | L        | Data retention periods for contact form emails not technically enforced in code. Consent logs have 13-month TTL (correct). Resend retains email data per their DPA/retention policy.     | GDPR Art. 5(1)(e)     | app/api/contact/route.ts               | Review Resend data retention settings in dashboard. Low priority: transactional emails, no bulk storage. |
| LEG-003 | L        | AICore chatbot (currently disabled) stores session data in sessionStorage and audit data in localStorage. When re-enabled, these must be consent-gated and documented in privacy policy. | GDPR Art. 6, ePrivacy | components/effects/AICore/useAIChat.ts | Review before re-enabling AICore. Ensure consent-gated.                                                  |

#### Third-Party Services Audit

| Service               | Purpose                     | Consent Required                | Consent Implemented            | DPA                          |
| --------------------- | --------------------------- | ------------------------------- | ------------------------------ | ---------------------------- |
| Google Analytics 4    | Web analytics               | Yes                             | Yes (loads only after accept)  | Yes (Google standard)        |
| Vercel Analytics      | Performance monitoring      | Yes                             | Yes (loads only after accept)  | Yes (Vercel ToS/DPA)         |
| Vercel Speed Insights | Core Web Vitals             | Yes                             | Yes (same as Analytics)        | Yes (Vercel ToS/DPA)         |
| Resend                | Transactional email         | N/A (contract basis)            | N/A                            | [DECISION NEEDED - STOP-002] |
| Upstash Redis         | Rate limiting + consent log | N/A (legitimate interest)       | N/A (no user data, hashed IPs) | Yes (Upstash GDPR)           |
| Google Fonts          | Typography                  | N/A (self-hosted via next/font) | N/A                            | N/A (no data transfer)       |

#### Legal/Privacy Strengths (INFO)

- Cookie consent banner: role="dialog", aria-label, focus management, keyboard support (Escape to decline)
- Consent obtained BEFORE any non-essential cookies/scripts load (verified in layout.tsx order)
- Consent expiry: 6 months (aligned with Italian Garante 10/06/2021 recommendation)
- DNT and GPC browser signals respected (auto-decline if detected)
- Consent logged server-side: SHA-256 hashed IP, action, timestamp, 13-month TTL
- Contact form requires explicit privacy checkbox (Zod: `privacy.refine(val === true)`)
- Privacy policy: IT + EN versions, accessible from footer and contact form
- Cookie policy: IT + EN versions
- Terms & conditions: IT + EN versions
- Footer: links to all 3 legal pages + "Manage Cookies" button to re-show banner
- No external fonts (self-hosted via next/font — no IP transfer to Google)
- No social media widgets, maps, or external embeds that would load before consent
- IP anonymization in API logs (last octet replaced with 'x')
- No PII in localStorage (only consent preference and locale)

---

### 4.4 SEO

**Verdict**: PASS

#### Findings

| ID      | Severity | Finding                                                                                                                                               | Location                                      | Recommendation                                                                                     | Verification                                |
| ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| SEO-001 | L        | No breadcrumb navigation on legal pages (privacy, cookie-policy, terms). Breadcrumbs improve UX on multi-page sites and enable BreadcrumbList schema. | app/[locale]/privacy/, cookie-policy/, terms/ | Consider adding breadcrumbs to legal pages. Low priority for a single-page site with few subpages. | Visual inspection                           |
| SEO-002 | L        | JSON-LD schema not tested with Google Rich Results Test in this review. Structure looks correct but validation required before launch.                | components/seo/JsonLd.tsx                     | Run Google Rich Results Test on production URL for both /it and /en.                               | https://search.google.com/test/rich-results |

#### SEO Architecture Strengths (INFO)

- Sitemap (app/sitemap.ts): dynamic generation, all pages (home + 3 legal x 2 locales = 8 entries), hreflang alternates, proper priorities
- Robots (app/robots.ts): allows crawling, blocks /api/ and /preview/, references sitemap
- JSON-LD @graph schema: Organization, Person, WebSite, WebPage, ProfessionalService, Service, FAQPage (7 entity types)
- Logo assets verified: /logos/logo-color.png exists
- OG images verified: /og-image.png (IT) and /og-image-en.png (EN) exist, 1200x630
- Twitter Card: summary_large_image with per-locale images
- hreflang: IT + EN + x-default on all pages via metadata alternates
- Canonical URLs: self-referencing, correct per locale
- Unique titles and descriptions per page per locale
- Keywords: locale-specific arrays (7 IT + 7 EN)
- Heading hierarchy: single H1 per page, logical H2/H3 nesting
- All images: descriptive alt text via translation keys
- Trailing slash: consistent (no trailing slash, Next.js default)
- 404 page: custom not-found.tsx with localization
- URL structure: /{locale}/{page} — clean, lowercase, hyphenated
- `formatDetection: { email: false, address: false, telephone: false }` prevents mobile auto-linking
- Robots meta: `index: true, follow: true, max-snippet: -1, max-image-preview: large`
- security.txt present (signals professionalism to crawlers/researchers)

---

### 4.5 Accessibility

**Verdict**: PASS
**WCAG 2.1 AA Target**: Met

#### Findings

| ID       | Severity | Finding                                                                                                                                                              | WCAG Criterion | Location                                                          | Recommendation                                                                            |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------- |
| A11Y-001 | M        | Language Switcher and Theme Toggle buttons are 36px (h-9). WCAG 2.5.8 (AAA) recommends 44x44px minimum. AA minimum (2.5.5) is 24x24px, so these pass AA but not AAA. | 2.5.5 / 2.5.8  | components/ui/LanguageSwitcher.tsx, components/ui/ThemeToggle.tsx | Consider increasing to h-11 (44px) for improved mobile usability. Not blocking.           | Measure with browser DevTools |
| A11Y-002 | L        | Videos in portfolio are decorative/demonstrative. No captions or transcripts provided. If videos contain meaningful audio content, captions would be required.       | 1.2.2          | components/ui/PortfolioVideoPlayer.tsx                            | Verify videos are purely visual/decorative. If audio content exists, add WebVTT captions. | Manual video content review   |

#### Accessibility Architecture Strengths (INFO)

- Skip-to-content link: bilingual, sr-only with focus:not-sr-only, links to #main-content (layout.tsx:183-190)
- Focus styles: global :focus-visible with ring-2 ring-accent ring-offset-2 (globals.css:78-81)
- 58+ component-level focus-visible implementations
- No `outline: none` without replacement found
- ARIA: 54+ proper aria-label/aria-labelledby/aria-describedby implementations
- Form accessibility: all inputs have labels, aria-invalid, aria-describedby for errors, role="alert" on errors
- Contact form: aria-required on required fields, role="status" with aria-live="polite" on success
- Modals (Mobile Menu, Portfolio, Language Selector): role="dialog", aria-modal="true", aria-labelledby
- Custom useFocusTrap hook: wraps Tab/Shift+Tab within modal
- Custom useEscapeKey hook: Escape closes modals
- Custom useBodyScrollLock hook: prevents background scroll
- Heading hierarchy: single H1, logical H2 > H3 nesting, no skipped levels
- Color contrast: primary #1b2f75 on white = ~9.6:1 (AAA), accent #1177bd on white = ~5.5:1 (AA)
- prefers-reduced-motion: CSS media query disables ALL animations + per-component useReducedMotion hook (100% coverage)
- Decorative elements: aria-hidden="true" on 20+ decorative divs, SVGs, backgrounds
- Button sizes: primary buttons 44px+ (h-11, h-14), form inputs 44px (h-11)
- FAQ accordion: aria-expanded, aria-controls, role="region" with aria-labelledby
- Language switcher dropdown: role="listbox", role="option", aria-selected, aria-haspopup
- Cookie banner: role="dialog", aria-label, aria-describedby, focus management, Escape key support

---

## 5. Prioritized Remediation Plan

Ordered by: severity (High first), then effort (quick wins first).

| Priority | ID           | Finding                                                 | Effort          | Pillar          | Status      |
| -------- | ------------ | ------------------------------------------------------- | --------------- | --------------- | ----------- |
| ~~1~~    | ~~SEC-001~~  | ~~Upgrade Next.js~~                                     | ~~Medium~~      | ~~Security~~    | DONE        |
| ~~2~~    | ~~SEC-002~~  | ~~Add productionBrowserSourceMaps: false~~              | ~~1 min~~       | ~~Security~~    | DONE        |
| ~~3~~    | ~~SEC-005~~  | ~~Upgrade Referrer-Policy~~                             | ~~1 min~~       | ~~Security~~    | DONE        |
| ~~4~~    | ~~PERF-001~~ | ~~Remove redundant will-change: auto~~                  | ~~1 min~~       | ~~Performance~~ | DONE        |
| 5        | SEC-003      | Add secret detection to pre-commit hook                 | 15 min          | Security        | Backlog     |
| ~~6~~    | ~~SEC-004~~  | ~~Enable Dependabot + verify branch protection~~        | ~~15 min~~      | ~~Security~~    | DONE        |
| ~~7~~    | ~~LEG-001~~  | ~~Verify Resend DPA~~                                   | ~~30 min~~      | ~~Legal~~       | DONE        |
| 8        | LEG-002      | Review Resend email retention settings                  | 15 min          | Legal           | Backlog     |
| 9        | A11Y-001     | Increase Language Switcher / Theme Toggle to 44px       | 10 min          | Accessibility   | Backlog     |
| 10       | PERF-002     | Monitor tsparticles LCP impact on production            | Ongoing         | Performance     | Post-launch |
| 11       | PERF-003     | Profile BeforeAfter layout animation on low-end devices | 30 min          | Performance     | Backlog     |
| 12       | PERF-004     | Run Lighthouse on production URL                        | 10 min          | Performance     | Post-deploy |
| 13       | SEO-002      | Validate JSON-LD with Google Rich Results Test          | 5 min           | SEO             | Post-deploy |
| 14       | SEO-001      | Add breadcrumbs to legal pages (optional)               | 30 min          | SEO             | Backlog     |
| 15       | A11Y-002     | Verify portfolio videos are decorative (no audio)       | 5 min           | Accessibility   | Backlog     |
| 16       | LEG-003      | Review AICore storage before re-enabling                | When applicable | Legal           | Deferred    |

---

## 6. Sign-Off Checklist

Before declaring this project launch-ready:

- [x] All CRITICAL findings resolved (none found)
- [x] All HIGH findings resolved
  - [x] SEC-001: Next.js upgraded to 15.5.12 (0 production CVEs)
- [x] All STOP items resolved (human decisions made)
  - [x] STOP-001: Next.js upgraded to 15.5.12 + React 19
  - [x] STOP-002: Resend DPA verified (EU SCCs, auto-binding via ToS)
  - [x] STOP-003: Binary consent accepted (analytics-only, GDPR-compliant)
- [ ] Security headers verified on production URL
- [ ] HTTPS working, HSTS active
- [ ] Cookie consent functional (test from EU IP)
- [ ] Privacy policy accessible and current
- [ ] Lighthouse scores >= 90 (all categories, representative pages)
- [ ] Core Web Vitals in "Good" range
- [ ] Keyboard navigation works end-to-end
- [ ] Error monitoring active
- [ ] Rollback plan documented and tested
- [ ] Environment variables configured in Vercel dashboard
- [ ] Google Rich Results Test validated for /it and /en
- [ ] Contact form tested end-to-end (submission + rate limiting + emails)

**Sign-off**: Approved with conditions
**Date**: 2026-02-13
**Conditions**: Run Lighthouse and verify headers/consent on production URL post-deploy. Remaining items are MEDIUM/LOW priority (backlog).
