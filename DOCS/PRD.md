# Product Requirements Document (PRD)
# The AI and Beyond - Website

## Document Info
- **Version**: 1.2
- **Last Updated**: 2026-02-04
- **Author**: Leonardo Sarti Magi
- **Status**: Active

---

## 1. Project Overview

### 1.1 What
A modern, high-impact single-page website for "The AI and Beyond" - a professional AI consulting and development brand. The site showcases AI integration services, demonstrates expertise through an interactive portfolio, and converts visitors into leads through strategic CTAs and an optimized contact form.

### 1.2 Why
- Establish professional online presence for AI consulting services
- Generate qualified leads from Italian businesses and professionals
- Demonstrate technical expertise through interactive elements and modern design
- Differentiate from typical "boxy" consulting websites with powerful animations and interactivity

### 1.3 For Whom
**Primary Target**: Italian businesses and professionals seeking to integrate AI into their operations
- Decision makers in SMEs looking for AI solutions
- Professionals wanting to automate repetitive tasks
- Companies needing custom web applications with AI capabilities

---

## 2. Goals & Success Metrics

### 2.1 Business Goals
| Goal | Metric | Target |
|------|--------|--------|
| Lead Generation | Contact form submissions | 10+ qualified leads/month |
| Engagement | Average session duration | > 2 minutes |
| Conversion | Visitor to contact rate | > 3% |
| Performance | Lighthouse scores | 90+ all categories |

### 2.2 User Goals
- Quickly understand the value proposition
- Evaluate expertise and credibility
- Calculate potential ROI of AI integration
- Easily initiate contact

---

## 3. Functional Requirements

### 3.1 Navigation & Header
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | Sticky header with blur effect on scroll | HIGH |
| FR-002 | Logo click returns to hero section | HIGH |
| FR-003 | Navigation links: Chi Sono, Servizi, Portfolio, Come Lavoro, Contatti | HIGH |
| FR-004 | "Parliamone" CTA button scrolls to contact form | HIGH |
| FR-005 | Mobile hamburger menu with smooth animation | HIGH |
| FR-006 | Header transparency changes on scroll | MEDIUM |

### 3.2 Hero Section
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-010 | Animated wave logo (SVG draw animation on load) | HIGH |
| FR-011 | Headline with staggered text entrance animation | HIGH |
| FR-012 | Four keyword badges with hover micro-animations | HIGH |
| FR-013 | Primary CTA button with hover effects | HIGH |
| FR-014 | Gradient background (dark blue to cyan) | HIGH |
| FR-015 | Interactive particle system (neural network style, 80-100 particles) | HIGH |
| FR-016 | Decorative logo in background with animated glow effect | MEDIUM |
| FR-017 | Typography effects: animated gradient text on key phrases | MEDIUM |

### 3.3 About Section
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-020 | Professional bio text (competent but accessible tone) | HIGH |
| FR-021 | Photo placeholder with elegant frame/effect | HIGH |
| FR-022 | Credibility elements (approach, methodology) | MEDIUM |
| FR-023 | Scroll-triggered fade-in animation | HIGH |

### 3.4 Services Section
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-030 | 5 service cards with interactive design | HIGH |
| FR-031 | Card hover: scale + shadow + content expansion | HIGH |
| FR-032 | Service icons (custom or high-quality icons) | HIGH |
| FR-033 | Optional: click for modal with details | MEDIUM |
| FR-034 | Staggered entrance animation on scroll | HIGH |
| FR-035 | NON-STANDARD card layout (avoid typical grid boxes) | HIGH |

**Services to display:**
1. Consulenza AI - Strategy and analysis for AI integration
2. Sviluppo Web App - Modern, performant web applications
3. Agenti AI - Intelligent automations and virtual assistants
4. Prototipi Rapidi - MVPs and proof of concepts
5. Ottimizzazione PM - AI tools for project management

### 3.5 Portfolio Section
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-040 | 4-5 project showcases | HIGH |
| FR-041 | Responsive grid (2 cols desktop, 1 col mobile) | HIGH |
| FR-042 | Project cards with image/thumbnail + title + category | HIGH |
| FR-043 | Click expands to detailed view with: problem, solution, results | HIGH |
| FR-044 | Technology badges/chips for each project | HIGH |
| FR-045 | Smooth expand/modal animation | HIGH |
| FR-046 | Image placeholders (to be replaced with AI-generated) | HIGH |

**Projects to showcase:**
1. App ESWBS - Naval maintenance management system
2. Maintenance Data Analysis - IT/EN schedule comparison
3. Professional Web App - Booking site for healthcare
4. Email Automation - Coaching follow-up system
5. (Optional) AI Assistant with RAG prototype

### 3.6 Before/After Section
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-050 | 2-3 workflow transformation examples | HIGH |
| FR-051 | Interactive slider OR side-by-side comparison | HIGH |
| FR-052 | Visual contrast between manual and AI-powered | HIGH |
| FR-053 | Concrete numbers where possible | MEDIUM |

### 3.7 ROI Calculator
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-060 | Input: Hours/week on repetitive tasks (slider or input) | HIGH |
| FR-061 | Input: Optional team hourly cost | MEDIUM |
| FR-062 | Input: Task type dropdown | HIGH |
| FR-063 | Animated output showing potential savings | HIGH |
| FR-064 | Conservative but impressive calculations (60-70% efficiency gain) | HIGH |
| FR-065 | CTA linking to contact form | HIGH |
| FR-066 | Real-time calculation updates | HIGH |

**ROI Formula (Conservative):**
- Base efficiency gain: 60%
- Hours saved/month = (weekly_hours × 4) × 0.60
- Annual savings = hours_saved × 12 × hourly_rate (if provided)
- Adjusted by task type multiplier (data entry: 1.2, reporting: 1.0, communications: 0.8)

### 3.8 Process Timeline
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-070 | Visual timeline/stepper of work process | HIGH |
| FR-071 | 5 steps: Ascolto, Analizzo, Progetto, Sviluppo, Consegno | HIGH |
| FR-072 | Icons for each step | HIGH |
| FR-073 | Sequential scroll animation | HIGH |
| FR-074 | Brief description for each step | HIGH |

### 3.9 Contact Form
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-080 | Fields: Nome*, Email*, Azienda, Messaggio*, Privacy checkbox* | HIGH |
| FR-081 | Real-time validation (not just on submit) | HIGH |
| FR-082 | Loading state during submission | HIGH |
| FR-083 | Success message (no redirect) | HIGH |
| FR-084 | Error handling with clear messages | HIGH |
| FR-085 | Rate limiting: max 3 submissions per IP per 15 minutes | HIGH |
| FR-086 | Sticky mobile button to access form | HIGH |
| FR-087 | Accessible from header CTA and multiple CTAs | HIGH |

### 3.10 Footer
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-090 | Logo | HIGH |
| FR-091 | Quick navigation links | HIGH |
| FR-092 | Direct contact info (email, LinkedIn) | HIGH |
| FR-093 | Copyright notice | HIGH |
| FR-094 | Privacy Policy link | HIGH |

### 3.11 Cookie Consent
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-100 | Simple consent banner | HIGH |
| FR-101 | Accept/Decline options | HIGH |
| FR-102 | Preference persistence | HIGH |
| FR-103 | Link to privacy policy | HIGH |

### 3.12 Internationalization (i18n)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-110 | Support for Italian (default) and English locales | HIGH |
| FR-111 | URL-based routing (/it/, /en/) | HIGH |
| FR-112 | Language switcher in header | HIGH |
| FR-113 | Automatic locale detection from browser | MEDIUM |
| FR-114 | hreflang tags for SEO | HIGH |
| FR-115 | All content translated (~120 strings) | HIGH |
| FR-116 | Locale-aware metadata (title, description) | HIGH |

### 3.13 Floating Assistant
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-120 | Animated mascot/blob in bottom-right corner | MEDIUM |
| FR-121 | Appears after scroll (>300px from top) | MEDIUM |
| FR-122 | Speech bubbles with contextual messages | MEDIUM |
| FR-123 | Changes message near contact form section | MEDIUM |
| FR-124 | Click scrolls to contact form | MEDIUM |
| FR-125 | Dismissible (can be closed) | MEDIUM |
| FR-126 | Respects prefers-reduced-motion | HIGH |

### 3.14 Visual Effects & Typography
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-130 | AnimatedGradientText component for flowing gradient text | MEDIUM |
| FR-131 | SplitTextReveal for character-by-character animations | LOW |
| FR-132 | DynamicHighlight for animated keyword underlines | MEDIUM |
| FR-133 | DecorativeLogoBackground with glow animation | MEDIUM |
| FR-134 | ParticleBackground with interactive mouse effects | HIGH |

### 3.15 Language Selector Modal
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-140 | Modal appears on first visit (no locale preference saved) | HIGH |
| FR-141 | Centered modal with elegant backdrop blur | HIGH |
| FR-142 | IT/EN flag buttons for language selection | HIGH |
| FR-143 | Saves preference to localStorage | HIGH |
| FR-144 | Redirects to chosen locale after selection | HIGH |
| FR-145 | Stops smooth scroll while modal is open | HIGH |
| FR-146 | Fade + scale animation for modal entrance | MEDIUM |

### 3.16 Brand Showcase Section (Video)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-150 | Dedicated video section between Hero and About | HIGH |
| FR-151 | Full-screen height with dark gradient background | HIGH |
| FR-152 | Video plays in seamless loop at center | HIGH |
| FR-153 | Neural network particles in background | HIGH |
| FR-154 | Tagline text below video with animation | MEDIUM |
| FR-155 | Scroll progress indicator | LOW |
| FR-156 | Parallax effects on scroll | MEDIUM |

### 3.17 Floating Video
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-160 | Video appears in bottom-right corner after scrolling past BrandShowcase | HIGH |
| FR-161 | Video plays once from start, then fades out | HIGH |
| FR-162 | Video does not reappear after fading out | HIGH |
| FR-163 | Smooth entrance/exit animations | HIGH |
| FR-164 | Close button to dismiss manually | MEDIUM |
| FR-165 | Does not block interaction with page content | HIGH |

### 3.18 Portfolio Redesign
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-170 | Featured project card (full-width, more details) | HIGH |
| FR-171 | Grid layout (2x2) for other projects | HIGH |
| FR-172 | Animated swap: click grid card to make it featured | HIGH |
| FR-173 | LayoutGroup animation for smooth transitions | HIGH |
| FR-174 | Previous featured moves to freed grid position | HIGH |
| FR-175 | Hover effects on grid cards | HIGH |

### 3.19 WOW Effect Components
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-180 | MagneticButton: attracts cursor when nearby | MEDIUM |
| FR-181 | TiltCard: 3D rotation following mouse position | MEDIUM |
| FR-182 | CountUpNumber: animated counting on scroll | MEDIUM |
| FR-183 | All effects respect prefers-reduced-motion | HIGH |
| FR-184 | All effects disabled on touch devices | HIGH |
| FR-185 | Smooth scroll with Lenis library | HIGH |
| FR-186 | Custom animated cursor (desktop only) | LOW |

---

## 4. Non-Functional Requirements

### 4.1 Performance
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Lighthouse Performance Score | ≥ 90 |
| NFR-002 | Lighthouse Accessibility Score | ≥ 90 |
| NFR-003 | Lighthouse Best Practices Score | ≥ 90 |
| NFR-004 | Lighthouse SEO Score | ≥ 90 |
| NFR-005 | First Contentful Paint (FCP) | < 1.5s |
| NFR-006 | Largest Contentful Paint (LCP) | < 2.5s |
| NFR-007 | Cumulative Layout Shift (CLS) | < 0.1 |
| NFR-008 | Time to Interactive (TTI) | < 3.5s |
| NFR-009 | Animation frame rate | 60fps |

### 4.2 Security
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-010 | No secrets/API keys in code | CRITICAL |
| NFR-011 | Environment variables for all credentials | CRITICAL |
| NFR-012 | .env files in .gitignore | CRITICAL |
| NFR-013 | Server-side input validation | CRITICAL |
| NFR-014 | Input sanitization | CRITICAL |
| NFR-015 | Security headers (CSP, X-Frame-Options, etc.) | HIGH |
| NFR-016 | Rate limiting on API routes | HIGH |
| NFR-017 | HTTPS only (no mixed content) | HIGH |

### 4.3 Accessibility
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-020 | WCAG AA color contrast | HIGH |
| NFR-021 | Visible focus states | HIGH |
| NFR-022 | Skip to content link | HIGH |
| NFR-023 | ARIA labels where needed | HIGH |
| NFR-024 | Full keyboard navigation | HIGH |
| NFR-025 | Screen reader compatible | HIGH |
| NFR-026 | prefers-reduced-motion support | HIGH |

### 4.4 SEO
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-030 | Complete meta tags (title, description, og:image) | HIGH |
| NFR-031 | Structured data (JSON-LD) | HIGH |
| NFR-032 | sitemap.xml | HIGH |
| NFR-033 | robots.txt | HIGH |
| NFR-034 | Alt text on all images | HIGH |
| NFR-035 | Proper heading hierarchy (single H1) | HIGH |

### 4.5 Responsive Design
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-040 | Mobile-first approach | HIGH |
| NFR-041 | Breakpoints: sm, md, lg, xl (Tailwind standard) | HIGH |
| NFR-042 | Touch targets minimum 44x44px | HIGH |
| NFR-043 | Content readable without horizontal scroll | HIGH |

---

## 5. User Stories

### US-001: First-time Visitor
**As a** business owner visiting for the first time
**I want to** quickly understand what services are offered
**So that** I can determine if this is relevant to my needs

**Acceptance Criteria:**
- Hero section clearly communicates value proposition within 5 seconds
- Services are visible without scrolling more than once
- Navigation allows quick access to any section

### US-002: Evaluating Credibility
**As a** potential client
**I want to** see proof of expertise and past work
**So that** I can trust this provider with my project

**Acceptance Criteria:**
- Portfolio displays real project examples with details
- Process/methodology is clearly explained
- Professional design instills confidence

### US-003: Calculating ROI
**As a** decision maker
**I want to** estimate potential savings from AI integration
**So that** I can justify the investment to stakeholders

**Acceptance Criteria:**
- ROI calculator is intuitive to use
- Results are presented clearly and credibly
- Easy path from calculator to contact form

### US-004: Making Contact
**As a** interested prospect
**I want to** easily reach out for more information
**So that** I can start a conversation about my needs

**Acceptance Criteria:**
- Contact form is accessible from multiple points
- Form provides real-time validation feedback
- Submission confirmation is clear and immediate

### US-005: Mobile User
**As a** user on a mobile device
**I want to** have a fully functional experience
**So that** I can explore the site from anywhere

**Acceptance Criteria:**
- All features work on mobile
- Touch targets are appropriately sized
- Content is readable without zooming
- Animations perform at 60fps

---

## 6. Out of Scope

The following are explicitly **NOT** included in this project:

1. **Multi-page structure** - This is a single-page application
2. **Blog/Content management** - No CMS or blog functionality
3. **User authentication** - No login/registration system
4. **E-commerce** - No payment processing
5. **Backend database** - No persistent data storage (form sends to email only)
6. **Client portal** - No client dashboard or project tracking
7. **Chat widget** - No live chat integration (floating assistant is not live chat)
8. **Booking system** - No calendar/scheduling integration
9. **Social media feed integration** - No live social feeds

---

## 7. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Animation performance issues | HIGH | MEDIUM | Use GPU-accelerated transforms, test on low-end devices |
| Email delivery failures | HIGH | LOW | Use Resend with proper SPF/DKIM, implement error handling |
| Rate limiting bypass | MEDIUM | LOW | Server-side IP tracking, consider Vercel Edge middleware |
| Image optimization failures | MEDIUM | LOW | Use Next/Image with fallbacks, test various formats |
| SEO ranking challenges | MEDIUM | MEDIUM | Implement all technical SEO requirements, quality content |
| Accessibility violations | HIGH | MEDIUM | Test with screen readers, automated accessibility tests |
| Form spam | MEDIUM | HIGH | Rate limiting, honeypot field, potential reCAPTCHA |

---

## 8. Technical Constraints

1. **Hosting**: Vercel (free tier initially)
2. **Repository**: GitHub (private)
3. **Email Service**: Resend
4. **Analytics**: Vercel Analytics
5. **No external CMS**: Content managed via code
6. **No server-side database**: Stateless deployment

---

## 9. Design Principles

1. **Modern, not trendy** - Timeless professional design
2. **Animated, not busy** - Purposeful motion that enhances UX
3. **Interactive, not gimmicky** - Interactions that provide value
4. **Bold, not loud** - Strong visual presence without being overwhelming
5. **Professional, not corporate** - Approachable expertise

---

## 10. Brand Guidelines Summary

### Colors
- **Primary (Dark Blue)**: #1a365d
- **Accent (Cyan)**: #00bcd4
- **White**: #ffffff
- **Text (Dark Gray)**: #1a202c

### Typography (Recommended)
- **Headings**: Space Grotesk or Sora
- **Body**: Inter or Outfit
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Logo Assets
- `logo.png` - Full logo with text
- `onda_logo.png` - Wave icon only

### Animation Timings
- **Micro-interactions**: 200-400ms
- **Section transitions**: 600-800ms
- **Hero animations**: 800-1200ms
- **Easing**: ease-out for entrances, ease-in-out for hover states

---

## Appendix A: Content Strategy Notes

- **Tone**: Competent but accessible, confident but not arrogant
- **Focus**: Value delivered, not years of experience
- **Differentiation**: Technical depth with human understanding
- **Call-to-action**: Conversational ("Parliamone") not transactional
