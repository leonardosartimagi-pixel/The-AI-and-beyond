# AI Image Prompts for Portfolio
## The AI and Beyond - Website

> Prompt dettagliati per generare immagini professionali per il portfolio e altre sezioni del sito.

---

## Strumenti Consigliati

| Tool | Tipo | Costo | Note |
|------|------|-------|------|
| **Midjourney v6** | Immagini artistiche | $10-30/mese | Migliore qualità per mockup UI |
| **DALL-E 3** | Immagini versatili | Pay-per-use | Integrato con ChatGPT Plus |
| **Stable Diffusion XL** | Open source | Gratuito | Richiede hardware/cloud |
| **Leonardo.ai** | UI/UX mockup | Freemium | Ottimo per dashboard |

---

## Portfolio Images

### 1. App ESWBS - Sistema Gestione Manutenzione Navale

```
Professional UI dashboard mockup for naval maintenance management system,
showing ship components database with ESWBS categorization hierarchy.
Color scheme: dark blue (#1a365d) and cyan accent (#00bcd4).
Modern flat design aesthetic, clean data tables with status indicators.
High-quality typography, subtle grid background pattern.
Enterprise software look, professional and technical.
16:9 aspect ratio, 1920x1080 resolution.
No visible text or labels - visual elements only.
Style: Photorealistic 3D render of a monitor displaying the app.
```

**Variante per card thumbnail:**
```
Isometric illustration of a naval maintenance dashboard interface,
floating UI cards showing ship component hierarchies and status badges.
Navy blue to cyan gradient background (#1a365d to #00bcd4).
Clean vector style, professional tech aesthetic.
Square format 1:1, 800x800 resolution.
```

---

### 2. Analisi Dati Manutenzione - Comparazione IT/EN

```
Data visualization dashboard showing bilingual data comparison,
split-screen layout with Italian and English schedule alignment.
Sankey diagram or parallel coordinates style connections between datasets.
Highlighted differences in orange, matched records in green.
Clean white background with cyan accent lines (#00bcd4).
Professional analytics tool aesthetic, modern and minimal.
16:9 aspect ratio, high resolution.
```

**Variante per card thumbnail:**
```
Abstract data flow visualization, two data streams merging and connecting,
representing data matching and comparison analysis.
Color palette: white, navy blue (#1a365d), cyan (#00bcd4), soft orange.
Clean vector illustration style, corporate tech aesthetic.
Square format 1:1, 800x800 resolution.
```

---

### 3. Web App Professionisti - Booking Sanitario

```
Modern healthcare booking website interface design,
showing clean calendar widget with available appointment slots.
Professional doctor profile section with ratings.
Color scheme: white background with cyan (#00bcd4) accents.
Mobile-responsive preview shown alongside desktop version.
Subtle healthcare iconography (stethoscope, calendar, checkmarks).
Trustworthy and welcoming feel, modern minimal design.
16:9 aspect ratio, high resolution.
```

**Variante per card thumbnail:**
```
Isometric illustration of a healthcare booking app interface,
floating calendar cards, doctor profile bubbles, and checkmark icons.
White and soft teal/cyan color palette (#00bcd4).
Clean vector style, friendly and professional.
Square format 1:1, 800x800 resolution.
```

---

### 4. Automazione Email Coaching - Sistema Follow-up

```
Email marketing automation workflow visualization,
showing sequence of personalized emails with branching logic paths.
Abstract representation of AI-powered personalization.
Gmail-style interface elements with automation flow indicators.
Dark blue (#1a365d) to cyan (#00bcd4) gradient accents.
Clean lines connecting email touchpoints in a flowchart style.
Professional coaching/business context aesthetic.
16:9 aspect ratio, high resolution.
```

**Variante per card thumbnail:**
```
Abstract illustration of automated email sequence,
floating email envelopes connected by glowing lines forming a network.
AI brain icon in the center orchestrating the flow.
Navy blue and cyan color palette (#1a365d, #00bcd4).
Clean vector style, modern tech aesthetic.
Square format 1:1, 800x800 resolution.
```

---

### 5. Assistente AI con RAG - Knowledge Base Chatbot

```
AI chatbot interface showing conversational UI with document retrieval,
chat bubbles with source citations and confidence indicators.
Sidebar panel showing referenced PDF documents and knowledge base.
Knowledge graph visualization with connected semantic nodes.
Enterprise internal tool aesthetic, professional and technical.
Cyan accent color (#00bcd4) on light gray/white background.
Subtle AI visual effects (gentle glow, neural network hints).
16:9 aspect ratio, high resolution.
```

**Variante per card thumbnail:**
```
Isometric illustration of an AI chatbot with connected documents,
chat bubble interface with floating document icons and link connections.
Central AI brain/circuit icon connecting to knowledge nodes.
White, navy blue (#1a365d), and cyan (#00bcd4) color palette.
Clean vector style, futuristic tech aesthetic.
Square format 1:1, 800x800 resolution.
```

---

## Additional Visual Elements

### Hero Background Pattern (Optional - oltre alle particelle)

```
Abstract neural network visualization with interconnected nodes,
glowing connections between data points in a cosmic space.
Deep navy blue (#1a365d) to cyan (#00bcd4) gradient.
Subtle geometric patterns, high-tech AI aesthetic.
Seamless tileable pattern, high resolution.
Very low opacity overlay suitable for background use.
```

---

### About Section - Avatar/Illustrazione Professionale

```
Professional portrait illustration of a male AI consultant,
modern low-poly or geometric style, abstract but recognizable.
Color palette: navy blue (#1a365d), cyan (#00bcd4), white.
Confident and approachable expression.
Tech industry professional aesthetic.
Circular crop-ready, centered composition.
Clean background, suitable for website hero section.
```

**Variante 3D stylized:**
```
3D stylized avatar of a professional male consultant,
friendly cartoon style but not childish, tech industry aesthetic.
Wearing smart casual (polo or shirt), glasses optional.
Navy blue and cyan color accents (#1a365d, #00bcd4).
Clean solid background, portrait orientation.
Suitable for corporate/tech website about section.
```

---

## Image Specifications

### Formato e Ottimizzazione

| Uso | Formato | Dimensione | Ottimizzazione |
|-----|---------|------------|----------------|
| Portfolio cards | WebP | 800x600 | 80% quality |
| Portfolio modal | WebP | 1920x1080 | 85% quality |
| OG Image | PNG | 1200x630 | Lossless |
| About photo | WebP | 600x800 | 85% quality |
| Background patterns | WebP | 1920x1080 | 70% quality |

### Next.js Image Integration

```tsx
// Esempio utilizzo ottimizzato
<Image
  src="/images/portfolio/eswbs-dashboard.webp"
  alt="ESWBS Dashboard Interface"
  width={800}
  height={600}
  className="rounded-xl"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

## Note Importanti

1. **Coerenza Cromatica**: Mantenere sempre la palette brand (#1a365d, #00bcd4, bianco)
2. **No Testo**: Le immagini non devono contenere testo leggibile (verrà aggiunto nel codice)
3. **Accessibilità**: Prevedere sempre alt text descrittivi per screen reader
4. **Placeholder**: Prima di avere le immagini finali, usare gradient placeholder con colori brand
5. **Compressione**: Usare sempre WebP con `next/image` per ottimizzazione automatica

---

## Workflow Consigliato

1. Generare immagini con Midjourney o DALL-E usando i prompt sopra
2. Post-processare in Photoshop/Figma per uniformare colori se necessario
3. Esportare in WebP con compressione 80-85%
4. Creare versioni blur per placeholder (base64)
5. Aggiungere a `/public/images/portfolio/`
6. Aggiornare componente Portfolio con i nuovi path

---

*Documento creato per TASK-025 - AI Image Prompts*
*Data: 2026-02-03*
