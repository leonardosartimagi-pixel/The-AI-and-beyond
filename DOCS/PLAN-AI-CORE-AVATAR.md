# Piano Implementazione: AI Core Avatar

## Obiettivo
Sostituire il FloatingAssistant (blob cartoonesco) con un **AI Core** futuristico che comunichi tech, professionalità e faccia dire "WOW".

---

## Specifiche Design

### Concept Visivo: "AI Core"
Un nucleo energetico centrale con orbite/particelle animate, simile a un processore AI o un atomo digitale.

```
        ·  ·
      ·      ·
     ·   ◉    ·    ← Nucleo centrale con glow
      ·      ·
        ·  ·        ← Orbite rotanti con particelle
```

### Dimensioni
- **Dimensione base**: 64px (medium)
- **Hover/Active**: 72px (espansione fluida)
- **Mobile**: 56px

### Palette Colori (Brand + Glow)
- **Nucleo**: `#1b2f75` (primary) con inner glow
- **Orbite**: `#137dc5` (accent) → `#00aeef` (accent-light)
- **Glow**: `rgba(0, 174, 239, 0.4)` (cyan glow)
- **Particelle**: bianco/cyan con opacità variabile

---

## Comportamenti

### 1. Idle Animation (Continua)
- Nucleo: pulse lento (scale 1 → 1.05, 3s)
- Orbite: rotazione continua (velocità diverse per ogni orbita)
- Particelle: movimento orbitale smooth

### 2. Morphing Contestuale per Sezione

| Sezione | Comportamento | Intensità |
|---------|---------------|-----------|
| Hero | Calmo, pulse lento | ★☆☆☆☆ |
| About | Leggermente più attivo | ★★☆☆☆ |
| Services | Pulsante, orbite più veloci | ★★★☆☆ |
| Portfolio | Rotazione decisa | ★★★★☆ |
| Contact | Glow intenso, invitante | ★★★★★ |

**Nota**: L'intensità massima sarà comunque "invitante", mai ansiogena.

### 3. Interazione Mouse
- **Hover**: Espansione smooth + glow più intenso
- **Near cursor** (entro 150px): Leggera attrazione magnetica
- **Click**: Pulse rapido + navigazione a contatti

### 4. Effetto Glitch per Messaggi
```
Testo che appare con:
- Distorsione iniziale (0.1s)
- Caratteri random che si stabilizzano
- Colore cyan che lampeggia
- Effetto "digital reveal"
```

---

## Struttura Componenti

```
components/
├── effects/
│   └── AICore/
│       ├── AICore.tsx           # Componente principale
│       ├── AICoreNucleus.tsx    # Nucleo centrale SVG
│       ├── AICoreOrbits.tsx     # Orbite rotanti
│       ├── AICoreParticles.tsx  # Particelle orbitanti
│       ├── AICoreGlow.tsx       # Effetto glow/bloom
│       ├── GlitchText.tsx       # Testo con effetto glitch
│       ├── useAICoreState.ts    # Hook per stato/sezione
│       └── index.ts             # Barrel export
```

---

## Implementazione Tecnica

### 1. AICore.tsx (Componente Principale)
```typescript
interface AICoreProps {
  className?: string;
}

// Rileva sezione corrente tramite IntersectionObserver
// Gestisce stato hover/click
// Compone tutti i sotto-componenti
```

### 2. AICoreNucleus.tsx
- SVG con cerchio centrale
- Filtro blur per glow interno
- Animazione pulse con Framer Motion
- Gradiente radiale brand colors

### 3. AICoreOrbits.tsx
- 2-3 orbite ellittiche SVG
- Rotazione CSS transform (GPU accelerated)
- Velocità: orbita interna veloce, esterna lenta
- Opacità variabile per profondità

### 4. AICoreParticles.tsx
- 6-8 particelle piccole (2-4px)
- Movimento orbitale con timing functions
- Fade in/out casuale
- Colori: bianco e cyan

### 5. GlitchText.tsx
```typescript
interface GlitchTextProps {
  text: string;
  isVisible: boolean;
}

// Effetto:
// 1. Caratteri random per 100ms
// 2. Graduale rivelazione del testo reale
// 3. Occasional "glitch" flicker
```

### 6. useAICoreState.ts
```typescript
interface AICoreState {
  currentSection: 'hero' | 'about' | 'services' | 'portfolio' | 'contact';
  intensity: number; // 0.2 - 1.0
  isHovered: boolean;
  isNearCursor: boolean;
}
```

---

## Animazioni (Framer Motion)

### Idle Animation
```typescript
const nucleusVariants = {
  idle: {
    scale: [1, 1.05, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

const orbitVariants = {
  rotate: {
    rotate: 360,
    transition: { duration: 8, repeat: Infinity, ease: "linear" }
  }
};
```

### Morphing Intensità
```typescript
const intensityConfig = {
  hero: { orbitSpeed: 12, glowOpacity: 0.3, pulseScale: 1.03 },
  about: { orbitSpeed: 10, glowOpacity: 0.4, pulseScale: 1.04 },
  services: { orbitSpeed: 7, glowOpacity: 0.5, pulseScale: 1.05 },
  portfolio: { orbitSpeed: 5, glowOpacity: 0.6, pulseScale: 1.06 },
  contact: { orbitSpeed: 6, glowOpacity: 0.8, pulseScale: 1.08 }
};
```

### Mouse Tracking
```typescript
// Effetto magnetico leggero
const magneticOffset = useMemo(() => {
  const dx = mouseX - coreX;
  const dy = mouseY - coreY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 150) {
    const strength = (150 - distance) / 150 * 3; // max 3px
    return { x: dx * strength / distance, y: dy * strength / distance };
  }
  return { x: 0, y: 0 };
}, [mouseX, mouseY]);
```

---

## Accessibility

- `prefers-reduced-motion`: disabilita rotazioni, mantiene solo glow statico
- `aria-label`: "AI Assistant - Click to contact"
- Focus visible ring per navigazione keyboard
- Touch devices: disabilita effetti mouse, mantiene click

---

## Performance

- Tutte le animazioni usano `transform` e `opacity` (GPU accelerated)
- `will-change: transform` su elementi animati
- Lazy rendering delle particelle
- Throttle su mouse tracking (16ms)
- Cleanup degli IntersectionObserver

---

## File da Modificare

### Nuovi File
1. `components/effects/AICore/AICore.tsx`
2. `components/effects/AICore/AICoreNucleus.tsx`
3. `components/effects/AICore/AICoreOrbits.tsx`
4. `components/effects/AICore/AICoreParticles.tsx`
5. `components/effects/AICore/AICoreGlow.tsx`
6. `components/effects/AICore/GlitchText.tsx`
7. `components/effects/AICore/useAICoreState.ts`
8. `components/effects/AICore/index.ts`

### File da Modificare
1. `app/[locale]/page.tsx` - Sostituire FloatingAssistant con AICore
2. `components/effects/index.ts` - Export AICore
3. `messages/it.json` - Aggiornare testi assistant
4. `messages/en.json` - Aggiornare testi assistant

### Documentazione da Aggiornare
1. `DOCS/PRD.md` - Aggiornare sezione 3.13 (Floating Assistant → AI Core)
2. `DOCS/WORKPLAN.md` - Aggiungere TASK-031 con dettagli

---

## Fasi di Implementazione

### Fase 1: Struttura Base (1h)
- Creare cartella AICore
- Implementare AICore.tsx con struttura base
- Implementare AICoreNucleus.tsx

### Fase 2: Animazioni (1.5h)
- Implementare AICoreOrbits.tsx
- Implementare AICoreParticles.tsx
- Implementare AICoreGlow.tsx

### Fase 3: Interazioni (1h)
- Implementare useAICoreState.ts
- Aggiungere mouse tracking
- Aggiungere morphing contestuale

### Fase 4: Messaggi Glitch (1h)
- Implementare GlitchText.tsx
- Integrare con speech bubble

### Fase 5: Integration & Polish (1h)
- Sostituire FloatingAssistant
- Test cross-browser
- Test mobile
- Test reduced-motion

### Fase 6: Documentazione (0.5h)
- Aggiornare PRD.md
- Aggiornare WORKPLAN.md
- Commit finale

---

## Risultato Atteso

Un AI Core che:
- ✅ Comunica tecnologia e innovazione
- ✅ È professionale senza essere freddo
- ✅ Attira l'attenzione senza essere invasivo
- ✅ Si adatta al contesto della pagina
- ✅ Invita all'interazione in modo elegante
- ✅ Fa dire "WOW" per la cura dei dettagli

---

## Commit Message
```
feat(avatar): replace FloatingAssistant with AI Core design [TASK-031]
```
