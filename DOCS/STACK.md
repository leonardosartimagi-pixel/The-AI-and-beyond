# Technology Stack
# The AI and beyond - Website

> Rationale and documentation for every technology choice.

---

## Core Framework

### Next.js 14+ (App Router)
**Version**: 14.x (latest stable)

**Why this choice:**
1. **Server Components by default** - Better performance, smaller client bundles
2. **Built-in optimization** - Image, font, and script optimization out of the box
3. **App Router** - Modern routing with layouts, loading states, error boundaries
4. **Vercel integration** - Seamless deployment to target hosting platform
5. **SEO-friendly** - Server-side rendering, metadata API, sitemap generation

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| Remix | Smaller ecosystem, less Vercel optimization |
| Gatsby | Overkill for single-page, slower builds |
| Astro | Good option but less React ecosystem support |
| Vite + React | No SSR by default, requires more setup |

**Integration points:**
- Tailwind CSS (PostCSS integration)
- Framer Motion (client components)
- Vercel Analytics (native integration)
- Resend (API routes)

**Known limitations:**
- App Router still maturing (some edge cases)
- Server Components require careful "use client" boundaries

**Mitigation:**
- Follow official documentation patterns
- Test thoroughly on each Next.js update

---

## Language

### TypeScript (Strict Mode)
**Version**: 5.x

**Why this choice:**
1. **Type safety** - Catch errors at compile time, not runtime
2. **Better DX** - Autocomplete, refactoring support, documentation
3. **Self-documenting** - Types serve as inline documentation
4. **Industry standard** - Expected in professional React projects
5. **Zod integration** - Runtime validation that matches compile-time types

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| JavaScript | No type safety, harder maintenance |
| Flow | Less ecosystem support, declining usage |

**Configuration highlights:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Known limitations:**
- Slight learning curve for team members new to TS
- Some library types may be incomplete

**Mitigation:**
- Strict mode from start (no gradual adoption)
- Create custom types where library types insufficient

---

## Styling

### Tailwind CSS
**Version**: 3.x

**Why this choice:**
1. **Rapid development** - No context switching to CSS files
2. **Consistent design** - Built-in design system (spacing, colors)
3. **Production optimization** - Automatic purging of unused styles
4. **Responsive utilities** - Mobile-first responsive design built-in
5. **Dark mode support** - Easy to add if needed later

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| CSS Modules | More boilerplate, no design system |
| Styled Components | Runtime cost, larger bundle |
| Emotion | Same issues as Styled Components |
| Sass/SCSS | More setup, less integrated |

**Integration points:**
- Next.js (PostCSS)
- CVA (class-variance-authority) for component variants
- tailwind-merge for conditional classes

**Configuration:**
- Custom color palette (brand colors)
- Custom font families
- Extended animations
- Custom spacing if needed

**Known limitations:**
- Long class strings can be hard to read
- Custom designs may require arbitrary values

**Mitigation:**
- Use CVA for component variants
- Extract common patterns to CSS classes in globals.css
- Minimize arbitrary values

---

## Animation

### Framer Motion
**Version**: 11.x (or latest stable)

**Why this choice:**
1. **Declarative animations** - Easy to read and maintain
2. **Exit animations** - AnimatePresence for unmount animations
3. **Layout animations** - Smooth resize/reorder animations
4. **Gesture support** - Drag, tap, hover built-in
5. **Performance** - GPU-accelerated, optimized transforms

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| CSS animations | Limited orchestration, no exit animations |
| React Spring | Steeper learning curve, less features |
| GSAP | Larger bundle, licensing considerations |
| Anime.js | Less React integration |

**Integration points:**
- React (motion components)
- Next.js (client components with 'use client')
- Tailwind (can combine with motion)

**Usage patterns:**
- `motion.div` for animated elements
- `AnimatePresence` for exit animations
- `useInView` for scroll-triggered animations
- `useReducedMotion` for accessibility

**Known limitations:**
- Requires 'use client' directive
- Can impact bundle size

**Mitigation:**
- Dynamic imports for heavy animations
- Lazy load animation-heavy sections
- Respect prefers-reduced-motion

---

## Form Handling

### React Hook Form
**Version**: 7.x

**Why this choice:**
1. **Performance** - Uncontrolled components, minimal re-renders
2. **Small bundle** - ~8kb gzipped
3. **TypeScript support** - Excellent type inference
4. **Validation integration** - Native Zod resolver
5. **DX** - Simple API, great documentation

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| Formik | More re-renders, larger bundle |
| Native forms | No validation helpers, more boilerplate |
| React Final Form | Similar but less ecosystem support |

**Integration points:**
- Zod (validation resolver)
- TypeScript (type inference from schema)

---

### Zod
**Version**: 3.x

**Why this choice:**
1. **TypeScript-first** - Infer types from schemas
2. **Runtime validation** - Validate at runtime (API routes)
3. **Composable** - Build complex schemas from simple ones
4. **Error messages** - Customizable, translatable
5. **Small bundle** - ~12kb gzipped

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| Yup | Less TypeScript integration |
| Joi | Node-focused, larger bundle |
| io-ts | Steeper learning curve |

**Usage:**
- Form validation (client + server)
- API request validation
- Environment variable validation

---

## Email Service

### Resend
**Version**: API v1

**Why this choice:**
1. **Developer experience** - Simple API, React Email support
2. **Generous free tier** - 3000 emails/month
3. **Deliverability** - Good reputation, proper SPF/DKIM
4. **Modern** - Built for developers, not enterprise
5. **Vercel integration** - Works well with serverless

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| SendGrid | More complex setup, enterprise-focused |
| Mailgun | Similar complexity to SendGrid |
| Nodemailer | Requires SMTP server management |
| AWS SES | Overkill, more configuration |

**Integration points:**
- Next.js API routes
- Environment variables for API key

**Known limitations:**
- Newer service (less track record)
- Rate limits on free tier

**Mitigation:**
- Implement proper error handling
- Monitor delivery rates
- Ready to switch if needed (simple API)

---

## Internationalization

### next-intl
**Version**: 3.x

**Why this choice:**
1. **App Router native** - Designed for Next.js 14+ App Router
2. **Simple API** - useTranslations hook is intuitive
3. **Type safety** - TypeScript support with type-checked keys
4. **SSR support** - Server-side rendering for SEO
5. **Middleware** - Built-in locale detection and routing

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| next-i18next | Pages Router focused, complex setup |
| react-intl | Less Next.js integration |
| Custom solution | More maintenance overhead |

**Integration points:**
- Next.js middleware for locale routing
- Server Components with getRequestConfig
- Client Components with NextIntlClientProvider

**Configuration:**
- `/i18n/request.ts` - Core configuration
- `/messages/it.json` - Italian translations
- `/messages/en.json` - English translations
- `/middleware.ts` - Locale detection

---

## Particle System

### @tsparticles/react + @tsparticles/slim
**Version**: 3.x

**Why this choice:**
1. **Lightweight** - Slim bundle (~15kb gzipped)
2. **Interactive** - Mouse/touch interactions built-in
3. **Performance** - GPU-accelerated, 60fps
4. **Customizable** - Neural network style connections
5. **React native** - Proper React component integration

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| particles.js | Outdated, no React support |
| react-particles-js | Deprecated |
| Three.js | Overkill for particles |
| CSS animations | Limited interactivity |

**Configuration:**
- Brand colors: primary blue (#1b2f75), accent blue (#137dc5), accent light (#00aeef)
- 80-100 particles with connections
- Interactive "grab" mode on hover
- Disabled when prefers-reduced-motion

**Known limitations:**
- Requires dynamic import for SSR
- Can impact LCP if not lazy loaded

**Mitigation:**
- Use `dynamic()` with `ssr: false`
- Only render after engine initialization

---

## Smooth Scroll

### Lenis
**Version**: 1.x

**Why this choice:**
1. **Smooth scrolling** - Native-like smooth scrolling
2. **Performance** - GPU-accelerated, 60fps
3. **Customizable** - Duration, easing, and more
4. **Framework agnostic** - Works with React/Next.js
5. **Lightweight** - Minimal bundle impact

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| Locomotive Scroll | Heavier, more complex |
| GSAP ScrollSmoother | Premium feature, larger bundle |
| Native scroll-behavior | Less control, browser inconsistencies |

**Configuration:**
- Duration: 1.2s
- Custom easing function
- Respects prefers-reduced-motion
- Exposed globally via `window.lenis` for modal control

**Usage:**
- Wraps entire app in SmoothScroll component
- `window.lenis.stop()` / `window.lenis.start()` for modal control

---

## Animation (Lottie)

### @lottiefiles/react-lottie-player
**Version**: 3.x

**Why this choice:**
1. **Lightweight** - Smaller than alternatives
2. **React hooks** - useLottie for control
3. **LottieFiles integration** - Easy asset import
4. **Performance** - Optimized playback

**Usage:**
- Floating assistant mascot
- Micro-interactions

**Note:** Currently using SVG blob animation as fallback since external Lottie files cannot be downloaded during development.

---

## Analytics

### Vercel Analytics
**Version**: Included with Vercel

**Why this choice:**
1. **Zero configuration** - Just install and deploy
2. **Privacy-friendly** - No cookies for basic analytics
3. **Web Vitals** - Built-in performance monitoring
4. **Free tier** - Included with Vercel hosting
5. **Real-time** - Live visitor data

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| Google Analytics | Privacy concerns, GDPR complexity |
| Plausible | Additional cost ($9/month) |
| Fathom | Similar cost to Plausible |
| None | Need basic traffic insights |

**Integration:**
```bash
npm install @vercel/analytics
```

```tsx
import { Analytics } from '@vercel/analytics/react'
```

---

## Hosting & Deployment

### Vercel
**Version**: Free tier

**Why this choice:**
1. **Next.js creators** - Best optimization for Next.js
2. **Git integration** - Automatic deployments on push
3. **Edge functions** - For rate limiting, middleware
4. **Free tier** - Sufficient for launch
5. **Preview deployments** - PR previews automatic

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| Netlify | Less Next.js optimization |
| AWS Amplify | More complex, overkill |
| Railway | Less static optimization |
| Self-hosted | Management overhead |

**Configuration:**
- Environment variables in dashboard
- Custom domain connection
- Automatic HTTPS

---

## Development Tools

### ESLint
**Version**: 8.x

**Purpose:** Code quality and consistency

**Configuration:**
- Next.js default rules
- TypeScript rules
- React Hooks rules
- Accessibility rules (jsx-a11y)

### Prettier
**Version**: 3.x

**Purpose:** Code formatting

**Configuration:**
- Tailwind plugin (class sorting)
- Consistent formatting across team

### Husky + lint-staged
**Purpose:** Pre-commit hooks

**Actions:**
- Lint staged files
- Format with Prettier
- Type check

---

## Testing

### Vitest
**Version**: 1.x

**Why this choice:**
1. **Fast** - Vite-powered, instant HMR
2. **Jest-compatible** - Familiar API
3. **TypeScript native** - No configuration needed
4. **ESM support** - Modern module support

### React Testing Library
**Version**: 14.x

**Purpose:** Component testing

**Philosophy:** Test behavior, not implementation

### Playwright (E2E)
**Version**: 1.x

**Purpose:** End-to-end testing

**Why:** Cross-browser, reliable, good Next.js support

---

## Package Manager

### npm
**Version**: 10.x

**Why this choice:**
1. **Standard** - Comes with Node.js
2. **Stable** - Well-tested, reliable
3. **Lock file** - Reproducible installs

**Alternatives considered:**
| Alternative | Why Rejected |
|-------------|--------------|
| pnpm | Good but less universal |
| yarn | No significant advantages for this project |
| bun | Still maturing |

---

## Node.js

### Version: 20.x LTS

**Why:**
- Latest LTS (Long Term Support)
- Required for Next.js 14
- Native fetch support
- Good performance

---

## Summary Table

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Animation | Framer Motion | 11.x |
| Smooth Scroll | Lenis | 1.x |
| Particles | @tsparticles/react + slim | 3.x |
| Lottie | @lottiefiles/react-lottie-player | 3.x |
| i18n | next-intl | 3.x |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 3.x |
| Email | Resend | API v1 |
| Analytics | Vercel Analytics | - |
| Hosting | Vercel | Free |
| Testing | Vitest + RTL + Playwright | - |
| Linting | ESLint + Prettier | 8.x / 3.x |
| Node.js | Node.js | 20.x LTS |
| Package Manager | npm | 10.x |

---

## Environment Variables

Required variables (documented in `.env.example`):

```env
# Email (Resend)
RESEND_API_KEY=re_xxxxx

# Contact form recipient
CONTACT_EMAIL=your@email.com

# Rate limiting (optional, for Vercel KV)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Upgrade Strategy

1. **Minor versions**: Update regularly (weekly)
2. **Major versions**: Test in branch, review changelog
3. **Security patches**: Apply immediately
4. **Breaking changes**: Document migration steps

---

## Dependencies Audit

Run before each release:
```bash
npm audit
npm audit fix
```

For vulnerabilities that can't be auto-fixed:
1. Document in KNOWN_ISSUES.md
2. Create task to address
3. Monitor for patches
