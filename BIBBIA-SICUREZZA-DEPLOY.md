# BIBBIA SICUREZZA & DEPLOY — The AI and beyond

> **Versione**: 1.0.0
> **Data creazione**: 2026-02-06
> **Ultimo aggiornamento**: 2026-02-06
> **Autore**: Security-First Principal Engineer
> **Stato**: BOZZA INIZIALE — Post Fase 0 Reconnaissance

---

## INDICE

1. [Panoramica Progetto](#1-panoramica-progetto)
2. [Guardrails Non Negoziabili](#2-guardrails-non-negoziabili)
3. [Architettura e Superficie d'Attacco](#3-architettura-e-superficie-dattacco)
4. [Threat Model Sintetico](#4-threat-model-sintetico)
5. [Security Posture — Stato Attuale](#5-security-posture--stato-attuale)
6. [Rapporto Audit Iniziale](#6-rapporto-audit-iniziale)
7. [Policy Gestione Segreti](#7-policy-gestione-segreti)
8. [Workflow Git / PR / Review](#8-workflow-git--pr--review)
9. [CI/CD — Requisiti Minimi e Pipeline](#9-cicd--requisiti-minimi-e-pipeline)
10. [Hardening Applicativo](#10-hardening-applicativo)
11. [Hardening Infrastruttura](#11-hardening-infrastruttura)
12. [Logging, Monitoring, Alerting](#12-logging-monitoring-alerting)
13. [Checklist Release](#13-checklist-release)
14. [Never-Do List](#14-never-do-list)
15. [Decision Log](#15-decision-log)
16. [Piano Riduzione Debito di Sicurezza](#16-piano-riduzione-debito-di-sicurezza)
17. [Mappatura Controlli → Standard](#17-mappatura-controlli--standard)
18. [Glossario e Riferimenti](#18-glossario-e-riferimenti)

---

## 1. PANORAMICA PROGETTO

| Campo               | Valore                                                      |
| ------------------- | ----------------------------------------------------------- |
| **Nome**            | The AI and beyond                                           |
| **Tipo**            | Sito web / Landing page con funzionalità interattive        |
| **Stack**           | Next.js 14.2.35, React 18, TypeScript 5.x, Tailwind CSS 3.4 |
| **Hosting**         | Vercel (serverless)                                         |
| **Dominio**         | theaiandbeyond.it                                           |
| **Backend**         | Next.js API Routes (serverless functions)                   |
| **Database**        | Nessuno (stateless)                                         |
| **Servizi esterni** | OpenAI API (chat), Resend (email), Vercel Analytics         |
| **Auth utenti**     | Nessuna (sito pubblico)                                     |
| **i18n**            | Italiano (default), Inglese — next-intl                     |
| **CI/CD**           | GitHub Actions (E2E tests), deploy via Vercel               |
| **Dati sensibili**  | Email utenti (form contatto), IP per rate limiting          |

### Componenti funzionali

| Componente                      | Stato            | Rischio              |
| ------------------------------- | ---------------- | -------------------- |
| Landing page (sezioni statiche) | Attivo           | Basso                |
| Form contatto (Resend email)    | Attivo           | Medio                |
| AI Chatbot (OpenAI)             | **Disabilitato** | Alto (quando attivo) |
| ROI Calculator                  | Attivo           | Basso                |
| Cookie Consent Banner           | Attivo           | Basso                |
| Vercel Analytics                | Attivo           | Basso                |

---

## 2. GUARDRAILS NON NEGOZIABILI

Questi principi si applicano a OGNI modifica, PR, deploy e decisione architetturale.

| #   | Principio                          | Descrizione                                                                    |
| --- | ---------------------------------- | ------------------------------------------------------------------------------ |
| G1  | Deny-by-default                    | Permessi e feature esposti solo se esplicitamente necessari                    |
| G2  | Minimo privilegio                  | App, servizi, CI, segreti: accesso minimo necessario                           |
| G3  | Segreti protetti                   | MAI nel repo, MAI nel client, MAI nei log. Solo env protette / secrets manager |
| G4  | Produzione immutabile              | Deploy solo da artefatti CI. Niente modifiche dirette in prod                  |
| G5  | DB/Cache non esposti               | Non applicabile (stateless), ma vale per future evoluzioni                     |
| G6  | AuthN/AuthZ server-side            | Non applicabile (no auth), ma se aggiunta: sempre server-side                  |
| G7  | Input validation + output encoding | Obbligatori su ogni endpoint e rendering                                       |
| G8  | Security headers + TLS             | HSTS, CSP, X-Frame-Options, X-Content-Type-Options obbligatori                 |
| G9  | Observability                      | Log eventi critici, alert base, no PII nei log                                 |
| G10 | Supply chain sicura                | Lockfile, scans, aggiornamenti controllati                                     |
| G11 | PR con test/motivazione            | Ogni PR deve avere test o risk assessment esplicito                            |
| G12 | STOP su azioni rischiose           | Segreti, prod, distruttive: STOP e conferma umana                              |

---

## 3. ARCHITETTURA E SUPERFICIE D'ATTACCO

### Diagramma componenti

```
[Browser/Client]
    │
    ├── HTTPS ──► [Vercel CDN/Edge]
    │                   │
    │                   ├── Static Assets (immutable cache 1y)
    │                   │
    │                   ├── SSR/ISR Pages (Next.js)
    │                   │
    │                   ├── /api/contact (POST)
    │                   │       └── Resend API (email)
    │                   │
    │                   └── /api/chat (POST) [DISABILITATO]
    │                           └── OpenAI API (gpt-4o-mini)
    │
    └── Vercel Analytics (script client-side)
```

### Superficie d'attacco

| Punto di ingresso                     | Tipo                     | Protezione attuale                                   | Rischio            |
| ------------------------------------- | ------------------------ | ---------------------------------------------------- | ------------------ |
| `GET /*` (pagine)                     | SSR/Static               | Security headers, HSTS                               | Basso              |
| `POST /api/contact`                   | API Route                | Zod validation, rate limit, sanitization             | Medio              |
| `POST /api/chat`                      | API Route (disabilitato) | Validation, rate limit, prompt guard, content filter | Alto (se attivato) |
| Static assets (`/_next/`, `/images/`) | CDN                      | Immutable cache headers                              | Molto basso        |
| Client-side JS                        | Bundle                   | Console removal in prod                              | Basso              |
| Cookie consent                        | Client-side              | localStorage, no server data                         | Molto basso        |

### Flussi dati

| Flusso        | Dati                                    | Direzione                                            | Protezione                                           |
| ------------- | --------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Form contatto | nome, email, company, messaggio, locale | Client → Server → Resend (2 email: lead + thank-you) | Zod, sanitizeForHtml, rate limit                     |
| AI Chat       | messaggio utente, history               | Client → Server → OpenAI                             | Validation, prompt guard, rate limit, content filter |
| Analytics     | page views, web vitals                  | Client → Vercel                                      | Consent-gated                                        |
| i18n          | locale preference                       | Client localStorage                                  | Non sensibile                                        |

---

## 4. THREAT MODEL SINTETICO

### Asset da proteggere

| Asset                        | Valore      | Impatto compromissione                 |
| ---------------------------- | ----------- | -------------------------------------- |
| API keys (OpenAI, Resend)    | Alto        | Costo finanziario, abuso servizio      |
| Email utenti (form contatto) | Medio       | Privacy violation, spam                |
| Disponibilità sito           | Medio       | Reputazione, business loss             |
| Integrità contenuto          | Medio       | Defacement, reputazione                |
| Codice sorgente              | Basso-Medio | IP disclosure, vulnerability discovery |

### Attori di minaccia

| Attore                | Motivazione                   | Capacità                |
| --------------------- | ----------------------------- | ----------------------- |
| Script kiddie / bot   | Spray attacks, defacement     | Bassa — tool automatici |
| Attaccante mirato     | Furto API keys, abuso servizi | Media                   |
| Supply-chain attacker | Compromissione dipendenze     | Media-Alta              |
| Insider (accidentale) | Commit segreti, misconfig     | Media                   |

### Minacce principali e contromisure

| ID  | Minaccia                 | OWASP Top 10 | Probabilità | Impatto | Contromisura                                                      | Stato                  |
| --- | ------------------------ | ------------ | ----------- | ------- | ----------------------------------------------------------------- | ---------------------- |
| T1  | XSS via input utente     | A03:2021     | Bassa       | Medio   | React escaping, sanitization, CSP                                 | ✅ Implementato        |
| T2  | Prompt injection (chat)  | A03:2021     | Media       | Medio   | prompt-guard.ts, content-filter.ts                                | ✅ Implementato        |
| T3  | API key leak             | A02:2021     | Media       | Alto    | .gitignore, env vars                                              | ⚠️ Key da ruotare      |
| T4  | Rate limit bypass        | A04:2021     | Media       | Medio   | In-memory rate limiter                                            | ⚠️ Non distribuito     |
| T5  | Dependency vulnerability | A06:2021     | Media       | Medio   | lockfile presente                                                 | ⚠️ No scan automatico  |
| T6  | Email injection/spam     | A03:2021     | Bassa       | Basso   | Zod validation, rate limit, sanitizeForHtml, HTML email templates | ✅ Implementato        |
| T7  | Clickjacking             | A05:2021     | Bassa       | Basso   | X-Frame-Options: SAMEORIGIN                                       | ✅ Implementato        |
| T8  | MIME sniffing            | A05:2021     | Bassa       | Basso   | X-Content-Type-Options: nosniff                                   | ✅ Implementato        |
| T9  | Man-in-the-middle        | A02:2021     | Bassa       | Alto    | HSTS preload, Vercel TLS                                          | ✅ Implementato        |
| T10 | Supply chain attack      | A08:2021     | Bassa       | Alto    | lockfile                                                          | ⚠️ No SBOM, no signing |
| T11 | DDoS/abuse               | A04:2021     | Media       | Medio   | Rate limit, Vercel protection                                     | ⚠️ Parziale            |
| T12 | Secret in logs           | A09:2021     | Media       | Medio   | secureLog (chat), log generici (contact)                          | ✅ Implementato        |
| T13 | SSRF via chat            | A10:2021     | Bassa       | Medio   | OpenAI proxied, no direct fetch                                   | ✅ Non applicabile     |

---

## 5. SECURITY POSTURE — STATO ATTUALE

### Punteggio complessivo: B+ (Buono, con miglioramenti necessari)

| Area                        | Stato                                                     | Voto | Note                                |
| --------------------------- | --------------------------------------------------------- | ---- | ----------------------------------- |
| Input Validation            | Zod + sanitization su tutti gli endpoint                  | A    | Eccellente                          |
| Security Headers            | HSTS, X-Frame, X-Content-Type, Referrer, Permissions, CSP | A-   | CSP implementata con vercel.live    |
| Rate Limiting               | Implementato ma in-memory                                 | B-   | Non persiste tra istanze serverless |
| Gestione Segreti            | .gitignore ok, env vars, no hardcoding nel codice         | B    | Key da ruotare, no rotation policy  |
| CI/CD Security              | E2E tests, ma no SAST/SCA/secret scan                     | C+   | Pipeline da potenziare              |
| Prompt Injection Protection | 52+ pattern, risk scoring, content filter                 | A    | Eccellente                          |
| Logging                     | Presente ma con leak email in contact API                 | B-   | Da uniformare con secureLog         |
| Dependency Management       | lockfile presente, no scan automatico                     | C+   | Da aggiungere npm audit in CI       |
| Documentation               | RULES.md presente, no security doc formale                | C    | Questa Bibbia risolve               |
| Branch Protection           | **ASSUNZIONE**: non configurata                           | D    | Da verificare e configurare         |

### Rischi noti aperti

| ID  | Rischio                                                              | Severità        | Stato                                                                                       | Owner        |
| --- | -------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------- | ------------ |
| R1  | OpenAI API key esposta in .env.local (letta da terminale)            | CRITICO         | **DA RUOTARE**                                                                              | Proprietario |
| R2  | ~~Nessun CSP header configurato~~                                    | ~~MEDIO~~       | ✅ Implementato (PR #2, aggiornato 2026-02-09)                                              | Dev          |
| R3  | ~~Rate limiter in-memory (non persiste tra serverless invocations)~~ | ~~MEDIO~~       | ✅ Migrato a Upstash Redis (distribuito) + fallback in-memory per outage Redis (2026-02-11) | Dev          |
| R4  | Nessun SAST/SCA automatico in CI                                     | MEDIO           | Da aggiungere                                                                               | Dev          |
| R5  | Nessun secret scanning in CI                                         | MEDIO           | Da aggiungere                                                                               | Dev          |
| R6  | ~~Email utente loggata in contact API~~                              | ~~BASSO-MEDIO~~ | ✅ Risolto — sanitizeForHtml + nessun PII nei log                                           | Dev          |
| R7  | Branch protection non verificata                                     | MEDIO           | Da configurare                                                                              | Proprietario |
| R8  | Nessun CODEOWNERS configurato                                        | BASSO           | Da aggiungere                                                                               | Dev          |

### Debito di sicurezza

| Item                                      | Effort stimato        | Priorità | Ticket/PR                                                                        |
| ----------------------------------------- | --------------------- | -------- | -------------------------------------------------------------------------------- |
| ~~Ruotare API key OpenAI~~                | ~~Minimo~~            | ~~P0~~   | ✅ Revocata e rimossa (chatbot disabilitato)                                     |
| ~~Aggiungere CSP header~~                 | ~~Basso~~             | ~~P1~~   | ✅ Completato (PR #2, aggiornato 2026-02-09)                                     |
| ~~Migrare rate limiter a Vercel KV~~      | ~~Medio~~             | ~~P1~~   | ✅ Completato — `lib/rate-limiter.ts` usa `@upstash/redis` con `KV_REST_API_URL` |
| ~~Pipeline CI: SAST + SCA + secret scan~~ | ~~Medio~~             | ~~P1~~   | ✅ Completato (PR #3 — `security-ci.yml` + `dependabot.yml`)                     |
| ~~Uniformare logging (secureLog)~~        | ~~Basso~~             | ~~P2~~   | ✅ Completato — Contact API usa log generici senza PII                           |
| Branch protection + CODEOWNERS            | Basso (config GitHub) | P2       | Manuale                                                                          |
| PR template con security checklist        | Basso                 | P2       | PR #3                                                                            |
| Monitoraggio Vercel (alerts)              | Basso                 | P3       | Config                                                                           |

---

## 6. RAPPORTO AUDIT INIZIALE

### Metodologia

Audit basato su:

- Analisi statica manuale del codice sorgente
- Review configurazione (next.config, headers, env)
- Verifica dipendenze e lockfile
- Mappatura a OWASP Top 10 2021 e ASVS v4.0

### Risultati per area

#### 6.1 Autenticazione

| Controllo          | Stato                        | Note                   |
| ------------------ | ---------------------------- | ---------------------- |
| MFA admin          | N/A                          | No area admin          |
| Policy password    | N/A                          | No user accounts       |
| Session management | N/A (solo session chat UUID) | UUID v4, timeout 30min |
| Refresh token      | N/A                          | No auth                |
| Logout             | N/A                          | No auth                |
| Reset password     | N/A                          | No auth                |

**Verdetto**: Non applicabile. Il sito è completamente pubblico.

#### 6.2 Autorizzazione

| Controllo        | Stato | Note              |
| ---------------- | ----- | ----------------- |
| RBAC/ABAC        | N/A   | No ruoli utente   |
| Controllo owner  | N/A   | No risorse utente |
| Prevenzione IDOR | N/A   | No ID risorse     |

**Verdetto**: Non applicabile.

#### 6.3 Input/Output

| Controllo                  | Stato | File                                      | Note                               |
| -------------------------- | ----- | ----------------------------------------- | ---------------------------------- |
| XSS prevention             | ✅ OK | React default + sanitize                  | No dangerouslySetInnerHTML trovato |
| SQL injection              | N/A   | Nessun DB                                 | -                                  |
| NoSQL injection            | N/A   | Nessun DB                                 | -                                  |
| Command injection          | ✅ OK | No exec/spawn                             | -                                  |
| Template injection         | ✅ OK | React JSX, no template engine             | -                                  |
| Input validation (contact) | ✅ OK | `lib/validations.ts`                      | Zod schema, min/max length         |
| Input validation (chat)    | ✅ OK | `lib/validations.ts` + `lib/security/*`   | Multi-layer                        |
| Output encoding            | ✅ OK | React auto-escaping + `content-filter.ts` | -                                  |
| HTML sanitization          | ✅ OK | `app/api/contact/route.ts:36-43`          | Escape < > " ' ` \                 |

**Verdetto**: Eccellente. Nessuna vulnerabilità injection trovata.

#### 6.4 CORS / CSRF

| Controllo               | Stato | Note                                               |
| ----------------------- | ----- | -------------------------------------------------- |
| CORS policy             | ✅ OK | Default same-origin (nessun header CORS esplicito) |
| CSRF protection         | ✅ OK | Next.js SameSite cookie default + origin check     |
| HTTP method restriction | ✅ OK | Solo POST accettato su API routes                  |

**Verdetto**: Correttamente configurato.

#### 6.5 File Upload

| Controllo   | Stato | Note                           |
| ----------- | ----- | ------------------------------ |
| File upload | N/A   | Nessuna funzionalità di upload |

#### 6.6 SSRF

| Controllo         | Stato        | Note                                            |
| ----------------- | ------------ | ----------------------------------------------- |
| Blocco egress     | ✅ OK        | Solo chiamate a OpenAI e Resend API (hardcoded) |
| Allowlist         | ✅ Implicito | URL API hardcoded nel codice                    |
| Metadata IP block | N/A          | Vercel gestisce a livello infra                 |

**Verdetto**: Rischio minimo. Nessun URL user-controlled in fetch server-side.

#### 6.7 Security Headers

| Header                    | Valore                                         | Stato         | File                                                     |
| ------------------------- | ---------------------------------------------- | ------------- | -------------------------------------------------------- |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | ✅ Eccellente | `next.config.mjs:18`                                     |
| X-Frame-Options           | `SAMEORIGIN`                                   | ✅ OK         | `next.config.mjs:22`                                     |
| X-Content-Type-Options    | `nosniff`                                      | ✅ OK         | `next.config.mjs:26`                                     |
| Referrer-Policy           | `origin-when-cross-origin`                     | ✅ OK         | `next.config.mjs:30`                                     |
| Permissions-Policy        | `camera=(), microphone=(), geolocation=()`     | ✅ OK         | `next.config.mjs:34`                                     |
| Content-Security-Policy   | Dinamica (vedi §10.1)                          | ✅ Hardened   | `middleware.ts` (unsafe-eval solo dev, nonce su JSON-LD) |
| X-DNS-Prefetch-Control    | `on`                                           | ✅ OK         | `next.config.mjs:14`                                     |

**Verdetto**: Tutti gli header di sicurezza configurati, inclusa CSP (§10.1).

#### 6.8 Logging

| Controllo             | Stato | File                            | Note                                               |
| --------------------- | ----- | ------------------------------- | -------------------------------------------------- |
| Log eventi auth       | N/A   | -                               | No auth                                            |
| Log admin actions     | N/A   | -                               | No admin                                           |
| Log errori critici    | ✅ OK | API routes                      | try-catch con console.error                        |
| No PII nei log        | ✅ OK | `app/api/contact/route.ts`      | Nessun dato utente nei log, solo messaggi generici |
| Secure logging (chat) | ✅ OK | `app/api/chat/route.ts:207-239` | secureLog filtra dati sensibili                    |
| Rate limit logging    | ✅ OK | Entrambe le route               | IP loggato (accettabile)                           |

**Verdetto**: ✅ OK — Contact API non logga PII (solo messaggi generici). Chat API usa secureLog.

#### 6.9 Rate Limiting

| Endpoint       | Limite                     | Window          | Tipo                      | Note                                                        |
| -------------- | -------------------------- | --------------- | ------------------------- | ----------------------------------------------------------- |
| `/api/contact` | 3 req/IP                   | 15 min          | Upstash Redis (Vercel KV) | `lib/rate-limiter.ts` — fixed-window counter con TTL        |
| `/api/chat`    | 10 msg/IP/min + 50/session | 1 min / session | In-memory                 | `lib/security/rate-limiter-chat.ts` (endpoint disabilitato) |

**Verdetto**: ✅ Contact API usa Upstash Redis distribuito via `@upstash/redis`. Chat API è disabilitata (rate limiter in-memory non rilevante).

#### 6.10 Dipendenze

| Controllo                 | Stato            | Note                                                                      |
| ------------------------- | ---------------- | ------------------------------------------------------------------------- |
| Lockfile presente         | ✅ OK            | `package-lock.json` (12,543 righe)                                        |
| CVE scan automatico       | ✅ OK            | `npm audit --audit-level=critical` in `security-ci.yml`                   |
| Aggiornamenti controllati | ✅ OK            | Dependabot configurato (`.github/dependabot.yml`) — scansione settimanale |
| Dipendenze inutili        | ⚠️ Da verificare | `html2canvas`, `jspdf` — verificare se usati                              |
| SBOM                      | ❌ NO            | Non generato                                                              |

**Verdetto**: Lockfile presente (bene), ma nessun scan automatico.

#### 6.11 Build/Deploy

| Controllo                    | Stato       | Note                                    |
| ---------------------------- | ----------- | --------------------------------------- |
| Segreti in CI                | ✅ OK       | GitHub Secrets con fallback test values |
| Environment isolation        | ⚠️ Parziale | Solo production su Vercel               |
| Debug disabilitato in prod   | ✅ OK       | `removeConsole` in next.config.mjs      |
| Artefatti immutabili         | ✅ OK       | Vercel build + deploy atomico           |
| NEXT*PUBLIC* prefix corretto | ✅ OK       | Solo SITE_URL è public                  |

**Verdetto**: Buono. Vercel gestisce deploy atomici e immutabili.

#### 6.12 Infrastruttura

| Controllo      | Stato     | Note                                         |
| -------------- | --------- | -------------------------------------------- |
| Firewall       | ✅ Vercel | Gestito dal provider                         |
| SSH hardening  | N/A       | Serverless, no SSH                           |
| Patching       | ✅ Vercel | Runtime gestito                              |
| Backup/restore | ⚠️        | Solo git repo. No backup dati (stateless ok) |
| WAF/CDN        | ✅ Vercel | Edge network con protezione base             |

**Verdetto**: Buono per architettura serverless.

#### 6.13 Supply Chain

| Controllo           | Stato              | Note                        |
| ------------------- | ------------------ | --------------------------- |
| Provenance/signing  | ❌ NO              | npm packages non verificati |
| Branch protection   | **ASSUNZIONE: NO** | Da verificare su GitHub     |
| Review obbligatorie | **ASSUNZIONE: NO** | Da configurare              |
| CODEOWNERS          | ❌ NO              | Non presente                |

**Verdetto**: Da migliorare significativamente.

#### 6.14 Privacy

| Controllo           | Stato                                    | Note                |
| ------------------- | ---------------------------------------- | ------------------- |
| PII raccolti        | Email, nome, company (form contatto)     | Minimo necessario   |
| Retention           | Nessun storage (email via Resend, no DB) | ✅ OK               |
| Consenso            | Privacy checkbox obbligatorio            | ✅ OK               |
| Cookie consent      | Banner con opzioni granulari             | ✅ OK               |
| Minimizzazione dati | ✅ OK                                    | Solo dati necessari |

**Verdetto**: Buono. Dati minimi, nessun storage permanente.

---

## 7. POLICY GESTIONE SEGRETI

### Inventario segreti

| Segreto                | Tipo              | Dove vive                                                  | Chi lo usa       | Rotazione          |
| ---------------------- | ----------------- | ---------------------------------------------------------- | ---------------- | ------------------ |
| `OPENAI_API_KEY`       | API Key           | `.env.local` (dev), Vercel env (prod), GitHub Secrets (CI) | `/api/chat`      | **DA RUOTARE ORA** |
| `RESEND_API_KEY`       | API Key           | `.env.local` (dev), Vercel env (prod), GitHub Secrets (CI) | `/api/contact`   | Ogni 90 giorni     |
| `CONTACT_EMAIL`        | Config            | `.env.local` (dev), Vercel env (prod), GitHub Secrets (CI) | `/api/contact`   | N/A                |
| `NEXT_PUBLIC_SITE_URL` | Config (pubblico) | `.env.local` (dev), Vercel env (prod)                      | Layout, metadata | N/A                |

### Regole

1. **NESSUN segreto nel repository**. Mai. Neanche in branch temporanei.
2. **NESSUN segreto nei log**. La funzione `secureLog` filtra automaticamente. Usarla SEMPRE.
3. **NESSUN segreto nel client**. Solo variabili `NEXT_PUBLIC_*` possono essere esposte, e non devono MAI contenere segreti.
4. **`.env.local`** è SOLO per sviluppo locale. È in `.gitignore`.
5. **Produzione**: segreti in Vercel Environment Variables (encrypted at rest).
6. **CI**: segreti in GitHub Actions Secrets.

### Procedura rotazione

1. Generare nuovo segreto nel dashboard del provider (OpenAI, Resend)
2. Aggiornare in Vercel Environment Variables (Production + Preview)
3. Aggiornare in GitHub Actions Secrets
4. Aggiornare in `.env.local` locale
5. Verificare funzionamento su preview deployment
6. Deploy in produzione
7. Revocare il vecchio segreto nel dashboard del provider
8. Annotare nel Decision Log con data

### Procedura leak

Se un segreto viene compromesso:

1. **Revocare IMMEDIATAMENTE** il segreto nel dashboard del provider
2. Generare un nuovo segreto
3. Seguire procedura rotazione (punti 2-8)
4. Verificare log per uso non autorizzato
5. Se il leak è da git history: contattare GitHub support per purge
6. Annotare incidente nel Decision Log

---

## 8. WORKFLOW GIT / PR / REVIEW

### Branching strategy

```
main (protetto)
 └── feature/TASK-XXX-descrizione
 └── fix/TASK-XXX-descrizione
 └── security/TASK-XXX-descrizione
```

### Regole branch

- `main` è il branch di produzione
- Nessun push diretto su `main` — **ASSUNZIONE: da configurare branch protection**
- Ogni modifica passa per PR
- PR deve avere almeno 1 review (quando team > 1)
- CI deve passare prima del merge

### Convenzioni commit

Formato: `type(scope): description [TASK-XXX]`

Tipi: `feat`, `fix`, `refactor`, `test`, `docs`, `security`, `chore`, `perf`

### PR Template (da aggiungere)

```markdown
## Descrizione

<!-- Cosa cambia e perché -->

## Tipo di modifica

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Security fix
- [ ] Config/infra

## Security Checklist

- [ ] Nessun segreto aggiunto al codice
- [ ] Input validato (Zod o equivalente)
- [ ] Output correttamente escaped/sanitizzato
- [ ] Nessuna dipendenza nuova (o giustificata)
- [ ] Test aggiunti/aggiornati
- [ ] Nessun console.log con dati sensibili
- [ ] Security headers non modificati/rimossi
- [ ] Rate limiting non bypassato

## Test

<!-- Come verificare che funziona -->

## Risk Assessment

<!-- Impatto se qualcosa va storto -->

- Rischio: Basso / Medio / Alto
- Componenti impattati:
- Rollback plan:
```

### CODEOWNERS — ✅ IMPLEMENTATO (PR #1)

File: `.github/CODEOWNERS` — owner: `@leonardosartimagi-pixel`

Percorsi coperti: `/app/api/`, `/lib/security/`, `/lib/rate-limiter.ts`, `/lib/validations.ts`, `/next.config.mjs`, `/middleware.ts`, `/.github/`, `/.env.example`, `/BIBBIA-SICUREZZA-DEPLOY.md`

---

## 9. CI/CD — REQUISITI MINIMI E PIPELINE

### Pipeline — ✅ IMPLEMENTATA (PR #3)

**Workflow**: `.github/workflows/security-ci.yml` + `.github/workflows/e2e-tests.yml`

```
[Push/PR to main]
    │
    ├── Job 1: Lint + TypeCheck (ESLint + tsc --noEmit)
    │
    ├── Job 2: Unit & Component Tests (vitest)
    │
    ├── Job 3: Dependency Scan (npm audit --audit-level=high)
    │
    ├── Job 4: Secret Scanning (gitleaks)
    │
    ├── Job 5: E2E Tests (matrix: chromium, firefox, webkit)
    │
    └── Job 6: Production Build (dopo job 1, 3, 4)
          │
          └── [Merge to main] → Vercel Production Deploy (auto)
```

**Dependabot**: `.github/dependabot.yml` — scansione settimanale (npm + GitHub Actions)

| Job                  | Tool                           | Stato                   | Bloccante           |
| -------------------- | ------------------------------ | ----------------------- | ------------------- |
| Lint + TypeCheck     | `eslint` + `tsc --noEmit`      | ✅ Attivo               | Sì                  |
| Unit/Component Tests | `vitest`                       | ✅ Attivo               | Sì                  |
| Dependency Scan      | `npm audit --audit-level=high` | ✅ Attivo               | Sì (high/critical)  |
| Secret Scanning      | `gitleaks`                     | ✅ Attivo               | Sì                  |
| E2E Tests            | `playwright`                   | ✅ Attivo e funzionante | Sì                  |
| Production Build     | `next build`                   | ✅ Attivo               | Sì                  |
| Dependabot           | GitHub native                  | ✅ Configurato          | No (PR automatiche) |

### Branch Protection — ✅ CONFIGURATA

**Repository**: `github.com/leonardosartimagi-pixel/the-ai-and-beyond` (pubblico)

Regole attive su `main`:

- [x] Force push vietato
- [x] Deletion branch vietata
- [x] Enforce admins: sì (nessuna eccezione)
- [x] Secret scanning attivo con push protection
- [x] Auto-delete branch dopo merge PR
- [ ] Required status checks (da aggiungere con CI pipeline — PR #2)
- [ ] Required reviews (da attivare quando team > 1)

---

## 10. HARDENING APPLICATIVO

### 10.1 Content Security Policy — ✅ HARDENED (PR #32 + hotfix)

CSP generata dinamicamente in `middleware.ts`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://vercel.live;
style-src 'self' 'unsafe-inline';
font-src 'self';
img-src 'self' data: blob:;
media-src 'self';
connect-src 'self' https://vitals.vercel-insights.com https://vercel.live;
frame-src 'self' https://vercel.live;
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
object-src 'none';
upgrade-insecure-requests;
```

**Evoluzione da PR #2 → PR #32 → hotfix**:

- `unsafe-eval` rimosso in produzione (presente solo in dev per webpack HMR)
- `style-src 'unsafe-inline'` mantenuto (richiesto da Framer Motion, non rimovibile senza eliminare la libreria)
- `script-src 'unsafe-inline'` mantenuto — Next.js 14 hydration scripts sono inline senza attributo nonce; aggiungere un nonce alla direttiva CSP causa il browser (CSP Level 2+) a ignorare `unsafe-inline`, bloccando l'hydration. Nonce-based CSP per script-src richiede supporto framework (Next.js 15+)
- Nonce generato per-request e propagato via header `x-nonce` ai `<script type="application/ld+json">` (JsonLd, FAQ) come defense-in-depth (attributo HTML, non enforced da CSP)

**Nota**: `font-src 'self'` perché `next/font/google` self-hosta i font al build time. `object-src 'none'` blocca plugin/Flash. `upgrade-insecure-requests` forza HTTPS. `https://vercel.live` in `script-src`, `connect-src` e `frame-src` per toolbar preview deployment Vercel.

**Header aggiuntivo**: `X-Permitted-Cross-Domain-Policies: none` (PR #2).

### 10.2 Rate Limiting — ✅ DISTRIBUITO

**Stato attuale**: Upstash Redis via `@upstash/redis` (`lib/rate-limiter.ts`)

- Fixed-window counter con TTL (15 min, 3 req/IP)
- Fail-open: se Redis non è raggiungibile, la richiesta viene permessa
- Header `X-RateLimit-Remaining` nella risposta
- Chat API disabilitata (rate limiter in-memory non rilevante)

### 10.3 Logging sicuro

**Regola**: Usare SEMPRE `secureLog()` da `lib/security/` invece di `console.log` diretto nelle API routes.

**Fix applicato (PR #2)**: `app/api/contact/route.ts:135` — rimossa email dal log, ora logga solo `[Contact API] Email sent successfully`.

### 10.4 Error handling

**Regola**: MAI esporre stack trace o dettagli interni al client.

**Stato attuale**: ✅ OK — Gli errori API restituiscono messaggi generici localizzati.

---

## 11. HARDENING INFRASTRUTTURA

### Vercel (hosting)

| Controllo              | Stato                         | Note                                                    |
| ---------------------- | ----------------------------- | ------------------------------------------------------- |
| TLS/HTTPS              | ✅ Auto                       | Vercel gestisce certificati                             |
| DDoS protection        | ✅ Base                       | Vercel Edge Network                                     |
| Serverless isolation   | ✅ Auto                       | Ogni function in sandbox                                |
| Environment separation | ✅                            | Production + Preview (deploy automatico da GitHub)      |
| Auto-deploy da GitHub  | ✅                            | Collegato a `leonardosartimagi-pixel/The-AI-and-beyond` |
| URL produzione         | ✅                            | `https://the-ai-and-beyond.vercel.app`                  |
| Custom domain          | Da configurare                | `theaiandbeyond.it` — quando pronto                     |
| DNSSEC                 | **ASSUNZIONE: da verificare** | Dipende dal registrar                                   |

### GitHub — ✅ CONFIGURATO

| Controllo          | Stato                | Note                                          |
| ------------------ | -------------------- | --------------------------------------------- |
| 2FA                | ✅ Confermato attivo | Verificato dal proprietario                   |
| Repository         | ✅ Pubblico          | `leonardosartimagi-pixel/the-ai-and-beyond`   |
| Branch protection  | ✅ Attivo            | No force push, no delete, enforce admins      |
| Secret scanning    | ✅ Attivo            | Con push protection                           |
| PR template        | ✅ Attivo            | Security checklist obbligatoria               |
| CODEOWNERS         | ✅ Attivo            | Review richiesta su file critici              |
| Auto-delete branch | ✅ Attivo            | Branch eliminati dopo merge                   |
| Dependabot         | ✅ Attivo            | Scan settimanale npm + GitHub Actions (PR #3) |

---

## 12. LOGGING, MONITORING, ALERTING

### Stato attuale

| Tipo                   | Tool                                    | Stato              |
| ---------------------- | --------------------------------------- | ------------------ |
| Performance monitoring | Vercel Analytics + Speed Insights       | ✅ Attivo          |
| Error logging          | console.error in API routes             | ✅ Basico          |
| Security logging       | secureLog (chat), console.log (contact) | ⚠️ Parziale        |
| Alerting               | Nessuno                                 | ❌ Non configurato |
| Uptime monitoring      | Nessuno                                 | ❌ Non configurato |

### Target minimo

1. **Vercel Logs**: Già disponibili nella dashboard Vercel (serverless function logs)
2. **Alerting**: Configurare Vercel alerts per errori 5xx e latency
3. **Uptime**: Servizio esterno (es. Better Stack, Checkly) — **ASSUNZIONE: non necessario per MVP**
4. **Security events da loggare**:
   - Rate limit triggered
   - Prompt injection detected
   - Blocked content detected
   - API errors (senza dettagli sensibili)
   - Form submission failures

---

## 13. CHECKLIST RELEASE

### Pre-deploy

- [ ] Tutti i test CI passano (lint, typecheck, unit, e2e)
- [ ] `npm audit` non mostra vulnerabilità high/critical
- [ ] Nessun segreto nel codice (secret scan pulito)
- [ ] Security headers non rimossi o indeboliti
- [ ] `removeConsole` attivo in next.config.mjs per produzione
- [ ] Variabili d'ambiente corrette in Vercel (Production)
- [ ] Preview deployment testato manualmente
- [ ] PR approvata con security checklist compilata

### Post-deploy

- [ ] Sito raggiungibile su `https://theaiandbeyond.it`
- [ ] HSTS header presente (verificare con `curl -I`)
- [ ] Form contatto funzionante (test manuale)
- [ ] Nessun errore 5xx nei log Vercel
- [ ] Analytics funzionanti
- [ ] Performance accettabile (Core Web Vitals verdi)

### Rollback

- Vercel supporta rollback istantaneo a deployment precedente
- Procedura: Dashboard Vercel → Deployments → Promote precedente
- Nessun dato utente da ripristinare (stateless)

---

## 14. NEVER-DO LIST

Azioni **VIETATE** in qualsiasi circostanza:

| #   | Azione vietata                                                   | Motivazione                           |
| --- | ---------------------------------------------------------------- | ------------------------------------- |
| N1  | Committare segreti (API keys, password, token)                   | Esposizione permanente in git history |
| N2  | Disabilitare security headers                                    | Apre superficie d'attacco             |
| N3  | Usare `dangerouslySetInnerHTML` senza sanitizzazione rigorosa    | XSS diretto                           |
| N4  | Esporre variabili server-side con `NEXT_PUBLIC_`                 | Leak segreti al client                |
| N5  | Deploy manuale (ssh, git pull in prod)                           | Rompe immutabilità e auditabilità     |
| N6  | Usare `eval()`, `Function()`, template literals per query/codice | Code injection                        |
| N7  | Loggare PII (email, IP con contesto utente, messaggi chat)       | Privacy violation                     |
| N8  | Disabilitare rate limiting                                       | Apre a abuse e DDoS                   |
| N9  | Aggiungere dipendenze senza revisione                            | Supply chain risk                     |
| N10 | Bypassare CI checks per "fretta"                                 | Introduce regressioni                 |
| N11 | Usare HTTP invece di HTTPS                                       | MitM attack                           |
| N12 | Hardcodare URL/config di produzione nel codice                   | Config drift, leak                    |
| N13 | Force push su main                                               | Perdita history, audit trail          |

---

## 15. DECISION LOG

| Data       | Decisione                                                 | Motivazione                                                                                                                                                                                                                                                        | Impatto                                 | Rischio residuo                                                 |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | --------------------------------------------------------------- |
| 2026-02-06 | Adozione OWASP ASVS Level 1 come baseline                 | Sito pubblico senza auth utente. Level 1 copre i controlli essenziali. Level 2 da considerare se aggiunta auth.                                                                                                                                                    | Medio                                   | Alcune classi di vulnerability non coperte (Level 2/3)          |
| 2026-02-06 | Rate limiter in-memory accettato per MVP                  | Vercel KV richiede setup da parte del proprietario                                                                                                                                                                                                                 | Basso-Medio                             | Rate limit bypassabile tra invocazioni diverse                  |
| 2026-02-06 | CSP con unsafe-inline in script-src                       | Next.js 14 hydration scripts sono inline senza nonce. Nonce in script-src causa CSP2+ a ignorare unsafe-inline, bloccando hydration. Nonce-based CSP richiede Next.js 15+.                                                                                         | Medio                                   | CSP meno efficace contro XSS avanzato                           |
| 2026-02-06 | No WAF dedicato                                           | Vercel fornisce protezione DDoS base. WAF dedicato (Cloudflare) eccessivo per il traffico attuale.                                                                                                                                                                 | Basso                                   | Attacchi application-layer sofisticati non filtrati             |
| 2026-02-06 | AI Chatbot (AICore) mantenuto disabilitato                | Superficie d'attacco significativa. Da riabilitare solo dopo audit dedicato.                                                                                                                                                                                       | Positivo (riduce rischio)               | Nessuno                                                         |
| 2026-02-09 | npm audit: critical-only + omit dev                       | Vuln. high in next@14 (GHSA-9g9p-9gw9, GHSA-h25m-26qc) sono DoS per self-hosted, non applicabili su Vercel. Vuln. dev (esbuild, glob) non in produzione. Upgrade a Next.js 16 da pianificare come task separato.                                                   | Basso                                   | DoS non mitigato se si passa a self-hosted                      |
| 2026-02-06 | ASSUNZIONE: Branch protection non configurata             | Repository GitHub non ancora creato. Sarà configurata alla creazione.                                                                                                                                                                                              | Da creare                               | Push diretto su main possibile fino a configurazione            |
| 2026-02-06 | ~~ASSUNZIONE: 2FA GitHub non verificato~~                 | **CONFERMATO dal proprietario**: 2FA attivo.                                                                                                                                                                                                                       | Nessuno                                 | Nessuno                                                         |
| 2026-02-06 | Rimossa e revocata API key OpenAI                         | Key rimossa da .env.local e revocata su platform.openai.com. Chatbot disabilitato. API route /api/chat restituisce 503 se key mancante.                                                                                                                            | Positivo — superficie d'attacco ridotta | Nessuno — key revocata                                          |
| 2026-02-06 | Chatbot mantenuto disabilitato per decisione proprietario | Feature non necessaria in questa fase. Tutto il codice AICore resta ma non è istanziato.                                                                                                                                                                           | Positivo — riduce rischio               | Codice chat presente ma inerte                                  |
| 2026-02-06 | ~~Repository GitHub da creare ex-novo~~                   | ✅ Creato: `leonardosartimagi-pixel/the-ai-and-beyond` (pubblico). Branch protection, secret scanning, CODEOWNERS, PR template attivi.                                                                                                                             | Risolto                                 | Nessuno                                                         |
| 2026-02-11 | Rate limiter: fallback in-memory per outage Redis         | Se Upstash Redis è down, un fallback Map in-memory protegge la singola istanza serverless. Non distribuito, ma meglio di fail-open totale. Cleanup automatico ogni 5 min.                                                                                          | Positivo — resilienza migliorata        | Rate limit bypassabile tra istanze diverse durante outage Redis |
| 2026-02-11 | Consent logging server-side via /api/consent-log          | Art. 7.1 GDPR richiede prova del consenso. Record anonimizzato (SHA-256 troncato di IP) salvato in Upstash Redis con TTL 13 mesi. Fire-and-forget via sendBeacon, best-effort.                                                                                     | Positivo — compliance GDPR              | Se Redis down, consent non loggato (localStorage resta)         |
| 2026-02-11 | Rispetto segnali DNT/GPC del browser                      | Se browser invia DNT:1 o GPC, analytics auto-rifiutati senza banner. Scelta esplicita utente (banner) prevale su segnali browser. Conforme a best practice EDPB.                                                                                                   | Positivo — privacy-by-default           | Nessuno                                                         |
| 2026-02-11 | IP anonimizzato nei log contact API                       | console.log per rate limiting ora usa anonymizeIp() (ultimo ottetto mascherato: 192.168.1.x). Riduce PII nei log Vercel.                                                                                                                                           | Positivo — minimizzazione dati          | IP parziale ancora nei log, ma non completo                     |
| 2026-02-11 | vercel.live rimosso da CSP in produzione                  | https://vercel.live è tool di sviluppo. Ora permesso solo in dev/preview via VERCEL_ENV. Riduce superficie CSP in prod.                                                                                                                                            | Positivo — CSP più restrittiva          | Nessuno                                                         |
| 2026-02-06 | Repository reso pubblico                                  | Branch protection e secret scanning richiedono Pro per repo privati. Analisi: il codice non contiene segreti, il sito è già esposto. Security-through-obscurity non è sicurezza. Vantaggi tecnici (branch protection, secret scanning gratis) superano il rischio. | Positivo — più protezioni tecniche      | Codice visibile (rischio accettabile)                           |

---

## 16. PIANO RIDUZIONE DEBITO DI SICUREZZA

### Priorità P0 — Immediato (STOP richiesti)

| #   | Azione                                                       | Stato                                                                       | Owner              |
| --- | ------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------ |
| 1   | ~~Ruotare API key OpenAI~~                                   | ✅ Key rimossa da .env.local e revocata su platform.openai.com (2026-02-06) | Proprietario       |
| 2   | ~~Verificare/abilitare 2FA su GitHub~~                       | ✅ Confermato attivo                                                        | Proprietario       |
| 3   | ~~Creare repository GitHub + configurare branch protection~~ | ✅ Completato                                                               | Proprietario + Dev |

### Priorità P1 — PR critiche (prime 3)

| #   | PR                                          | Contenuto                                                                  | Rischio mitigato                               |
| --- | ------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | ~~Hardening headers + logging~~             | ✅ PR #2 mergiata. CSP, X-Permitted-Cross-Domain-Policies, PII log fix     | T1 (XSS), T12 (log leak)                       |
| 2   | ~~CI/CD pipeline security~~                 | ✅ PR #3 mergiata. Lint, typecheck, npm audit, gitleaks, build, Dependabot | T5 (CVE), T3 (secret leak), T10 (supply chain) |
| 3   | ~~Git workflow + PR template + CODEOWNERS~~ | ✅ PR #1 mergiata. Branch protection, PR template, CODEOWNERS              | T10 (supply chain), governance                 |

### Priorità P2 — Miglioramenti

| #   | Azione                           | Rischio mitigato   |
| --- | -------------------------------- | ------------------ |
| 4   | Migrare rate limiter a Vercel KV | T4, T11            |
| 5   | Aggiungere Dependabot            | T5, T10            |
| 6   | Uptime monitoring                | Disponibilità      |
| 7   | Vercel alerts (5xx, latency)     | Incident detection |

### Priorità P3 — Nice to have

| #   | Azione                       | Rischio mitigato             |
| --- | ---------------------------- | ---------------------------- |
| 8   | SBOM generation              | Supply chain transparency    |
| 9   | DAST baseline scan           | Deep vulnerability discovery |
| 10  | security.txt + /.well-known/ | Responsible disclosure       |

---

## 17. MAPPATURA CONTROLLI → STANDARD

### OWASP Top 10 (2021)

| OWASP ID | Categoria                 | Controllo implementato                                          | Stato | Gap                        |
| -------- | ------------------------- | --------------------------------------------------------------- | ----- | -------------------------- |
| A01:2021 | Broken Access Control     | N/A (no auth)                                                   | ✅    | Nessuno                    |
| A02:2021 | Cryptographic Failures    | TLS (Vercel), HSTS preload                                      | ✅    | Nessuno                    |
| A03:2021 | Injection                 | Zod validation, React escaping, sanitization, prompt guard, CSP | ✅    | Nessuno                    |
| A04:2021 | Insecure Design           | Rate limiting, input limits, session limits                     | ⚠️    | Rate limit non distribuito |
| A05:2021 | Security Misconfiguration | Headers configurati, CSP, debug off in prod                     | ✅    | Nessuno                    |
| A06:2021 | Vulnerable Components     | Lockfile presente                                               | ⚠️    | No scan automatico CI      |
| A07:2021 | Auth Failures             | N/A (no auth)                                                   | ✅    | Nessuno                    |
| A08:2021 | Software/Data Integrity   | Vercel deploy atomico                                           | ⚠️    | No SBOM, no signing        |
| A09:2021 | Security Logging          | secureLog (parziale)                                            | ⚠️    | Email in log contact       |
| A10:2021 | SSRF                      | No user-controlled URLs                                         | ✅    | Nessuno                    |

### OWASP ASVS v4.0 — Level 1 (selezionato)

| Area ASVS                   | Sezione   | Stato | Note                                      |
| --------------------------- | --------- | ----- | ----------------------------------------- |
| V1 - Architecture           | 1.1-1.14  | ⚠️    | Architettura documentata in questa Bibbia |
| V2 - Authentication         | 2.1-2.10  | N/A   | No user authentication                    |
| V3 - Session Management     | 3.1-3.7   | N/A   | Solo session ID chat (UUID, timeout)      |
| V4 - Access Control         | 4.1-4.3   | N/A   | No access control needed                  |
| V5 - Validation/Encoding    | 5.1-5.5   | ✅    | Zod, React escaping, sanitization         |
| V6 - Cryptography           | 6.1-6.4   | ✅    | TLS via Vercel, HSTS                      |
| V7 - Error Handling/Logging | 7.1-7.4   | ⚠️    | Log presenti, da uniformare               |
| V8 - Data Protection        | 8.1-8.3   | ✅    | Minima raccolta dati, no storage          |
| V9 - Communication          | 9.1-9.2   | ✅    | HTTPS enforced                            |
| V10 - Malicious Code        | 10.1-10.3 | ⚠️    | No dependency scan automatico             |
| V11 - Business Logic        | 11.1      | ✅    | Rate limiting, input limits               |
| V12 - Files/Resources       | 12.1-12.6 | N/A   | No file upload                            |
| V13 - API                   | 13.1-13.7 | ✅    | Input validation, method restriction      |
| V14 - Configuration         | 14.1-14.5 | ✅    | Headers ok, CSP implementata              |

### NIST SSDF (Secure Software Development Framework)

| Pratica | Descrizione                    | Stato                                       |
| ------- | ------------------------------ | ------------------------------------------- |
| PO.1    | Definire security requirements | ✅ Questa Bibbia                            |
| PS.1    | Proteggere il software         | ⚠️ Branch protection da configurare         |
| PS.2    | Proteggere gli ambienti        | ✅ Vercel env, GitHub Secrets               |
| PW.1    | Design sicuro                  | ✅ Threat model documentato                 |
| PW.4    | Review e analisi codice        | ⚠️ No SAST automatico                       |
| PW.5    | Test sicurezza                 | ⚠️ E2E presenti, no security-specific tests |
| PW.6    | Configurazione sicura          | ✅ Headers ok, CSP implementata             |
| PW.7    | Review codice terze parti      | ⚠️ No dependency scan                       |
| PW.8    | Test artefatti di build        | ✅ CI/CD presente                           |
| RV.1    | Identificare vulnerabilità     | ⚠️ Audit manuale, no automatico             |
| RV.2    | Analizzare vulnerabilità       | ✅ Questa Bibbia                            |
| RV.3    | Rimediare vulnerabilità        | In corso (piano P0-P3)                      |

---

## 18. GLOSSARIO E RIFERIMENTI

### Glossario

| Termine | Definizione                                                         |
| ------- | ------------------------------------------------------------------- |
| ASVS    | Application Security Verification Standard (OWASP)                  |
| CSP     | Content Security Policy — header HTTP che limita risorse caricabili |
| HSTS    | HTTP Strict Transport Security — forza HTTPS                        |
| SAST    | Static Application Security Testing                                 |
| SCA     | Software Composition Analysis (dependency scanning)                 |
| SBOM    | Software Bill of Materials                                          |
| SSDF    | Secure Software Development Framework (NIST)                        |
| SSRF    | Server-Side Request Forgery                                         |
| IDOR    | Insecure Direct Object Reference                                    |
| XSS     | Cross-Site Scripting                                                |
| CSRF    | Cross-Site Request Forgery                                          |

### Riferimenti

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [OWASP ASVS v4.0](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [NIST SSDF (SP 800-218)](https://csrc.nist.gov/publications/detail/sp/800-218/final)
- [Next.js Security Documentation](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Vercel Security](https://vercel.com/docs/security)

---

> **Prossimo aggiornamento previsto**: Dopo implementazione PR #1 (Hardening headers + logging)
>
> **Questo documento è la fonte di verità per tutte le decisioni di sicurezza del progetto.**
