# The AI and beyond

### Website by Leonardo Sarti Magi

A modern, animated single-page website for AI consulting and development services.

---

## Quick Start

```bash
# 1. Install dependencies
make install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Add your API keys to .env.local
# (see Environment Variables section)

# 4. Start development server
make dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Overview

**The AI and beyond** is a professional website showcasing AI consulting services, featuring:

- Modern design with powerful animations
- Interactive ROI calculator
- Portfolio with project showcases
- Secure contact form with rate limiting
- GDPR-compliant analytics and cookie consent

### Key Features

- **Animated Hero** - SVG wave logo animation, staggered text entrance
- **Interactive Services** - Non-standard card layout with hover effects
- **ROI Calculator** - Real-time savings estimation
- **Portfolio Modals** - Detailed project case studies
- **Before/After** - Workflow transformation comparisons
- **Contact Form** - Validated, rate-limited, email integration

---

## Tech Stack

| Category  | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | Next.js 14 (App Router)                     |
| Language  | TypeScript (strict mode)                    |
| Styling   | Tailwind CSS                                |
| Animation | Framer Motion                               |
| Forms     | React Hook Form + Zod                       |
| Email     | Resend                                      |
| Analytics | Vercel Analytics                            |
| Hosting   | Vercel                                      |
| Testing   | Vitest + React Testing Library + Playwright |

See [DOCS/STACK.md](DOCS/STACK.md) for detailed rationale.

---

## Available Commands

Run `make help` to see all commands.

| Command               | Description               |
| --------------------- | ------------------------- |
| `make install`        | Install dependencies      |
| `make dev`            | Start development server  |
| `make build`          | Build for production      |
| `make test`           | Run all tests             |
| `make test-coverage`  | Run tests with coverage   |
| `make lint`           | Run ESLint                |
| `make format`         | Format code with Prettier |
| `make security-check` | Run security audit        |
| `make check-all`      | Run all checks            |
| `make deploy`         | Deploy to Vercel          |

---

## Environment Variables

Create a `.env.local` file (never commit this file):

```env
# Email (Resend) - Required for contact form
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Contact form recipient
CONTACT_EMAIL=your@email.com

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

See `.env.example` for full template.

---

## Project Structure

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
│   ├── sections/          # Page sections (Hero, Services, etc.)
│   └── layout/            # Header, Footer, etc.
├── lib/
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
├── public/
│   └── images/            # Static images
├── tests/
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # End-to-end tests
├── DOCS/
│   ├── PRD.md             # Requirements
│   ├── STACK.md           # Technology rationale
│   ├── WORKPLAN.md        # Tasks and prompts
│   └── reports/           # Task completion reports
├── RULES.md               # Project rules (READ THIS)
├── Makefile               # Command shortcuts
└── README.md              # This file
```

---

## Documentation

| Document                             | Description                        |
| ------------------------------------ | ---------------------------------- |
| [RULES.md](RULES.md)                 | **READ FIRST** - All project rules |
| [DOCS/PRD.md](DOCS/PRD.md)           | Product Requirements Document      |
| [DOCS/STACK.md](DOCS/STACK.md)       | Technology stack rationale         |
| [DOCS/WORKPLAN.md](DOCS/WORKPLAN.md) | Work plan and task prompts         |

---

## Development Workflow

1. **Read RULES.md** before starting any task
2. **Check WORKPLAN.md** for current task
3. **Follow task prompt** instructions exactly
4. **Run checks** before committing:
   ```bash
   make check-all
   ```
5. **Create report** in `DOCS/reports/`
6. **Ask for confirmation** before committing

### Commit Format

```
<type>(<scope>): <description> [TASK-XXX]
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `security`

---

## Security

This project follows strict security practices:

- No secrets in code (environment variables only)
- Server-side input validation
- Rate limiting on API routes
- Security headers configured
- Regular dependency audits

Run security check:

```bash
make security-check
```

---

## Testing

```bash
# Run all tests
make test

# Watch mode
make test-watch

# With coverage
make test-coverage

# E2E tests
make e2e
```

---

## Deployment

The project is configured for Vercel deployment.

```bash
# Preview deployment
make preview

# Production deployment
make deploy
```

### Pre-deployment Checklist

- [ ] All tests pass
- [ ] Security check passes
- [ ] Lighthouse scores 90+
- [ ] Environment variables set in Vercel
- [ ] Domain configured

---

## License

Private project. All rights reserved.

---

## Contact

**Leonardo Sarti Magi**

- Website: [theaiandbeyond.com](https://theaiandbeyond.com)
- Email: [contact info]

---

Built with Next.js, deployed on Vercel.
