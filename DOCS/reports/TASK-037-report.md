# TASK-037: Language Selector Fix & Section Glitch Effects

**Status**: COMPLETED
**Date**: 2026-02-05
**Priority**: P1 - High

---

## Executive Summary

Fixed the language selector modal behavior and added a persistent language switcher in the header/mobile menu. Extended the glitch effect to all section titles with a scroll-triggered one-time animation. Added CTA button pulse animation support.

---

## Changes Implemented

### 1. Language Switcher Component

**Action**: Created a new LanguageSwitcher component for persistent language selection.

**Files Created**:
- `components/ui/LanguageSwitcher.tsx` - Dropdown language selector

**Features**:
- Circular button (36x36px) matching ThemeToggle style
- Shows current language flag
- Dropdown with AnimatePresence animation
- Two variants: `icon` (compact) and `full` (with label)
- Saves preference to localStorage
- Uses next-intl `useLocale()` and `useRouter()` for navigation
- Click outside to close
- Escape key to close
- Full keyboard navigation support
- Dark mode support
- Respects `prefers-reduced-motion`

---

### 2. Header Integration

**Action**: Added LanguageSwitcher to both desktop and mobile header.

**Files Modified**:
- `components/layout/Header.tsx` - Added LanguageSwitcher import and placement
- `components/layout/MobileMenu.tsx` - Added language section with full variant

**Placement**:
- Desktop: Next to ThemeToggle, before CTA button
- Mobile: In mobile menu, above CTA button with label

---

### 3. Translation Updates

**Action**: Added translation keys for language selector.

**Files Modified**:
- `messages/en.json` - Added `"language": "Language"` in nav section
- `messages/it.json` - Added `"language": "Lingua"` in nav section

---

### 4. Section Title Glitch Effect

**Action**: Created SectionTitleGlitch component and applied to all section titles.

**Files Created**:
- `components/effects/SectionTitleGlitch.tsx` - Scroll-triggered glitch effect

**Features**:
- Triggers when title enters viewport (useInView with margin)
- One-time animation (doesn't repeat on re-scroll)
- Same visual effect as NavGlitch (cyan + red layers)
- Configurable delay prop
- Respects `prefers-reduced-motion`
- Optional accentClassName for color inheritance

**Files Modified**:
- `components/effects/index.ts` - Added SectionTitleGlitch export
- `components/sections/About.tsx` - Applied to titleAccent
- `components/sections/Services.tsx` - Applied to titleAccent
- `components/sections/Portfolio.tsx` - Applied to titleAccent
- `components/sections/Process.tsx` - Applied to titleAccent
- `components/sections/Stats.tsx` - Applied to titleAccent
- `components/sections/FAQ.tsx` - Applied to titleAccent
- `components/sections/Contact.tsx` - Applied to titleAccent
- `components/sections/BeforeAfter.tsx` - Applied to titleAccent
- `components/sections/ROICalculator.tsx` - Applied to titleAccent

---

### 5. CTA Button Pulse Animation

**Action**: Added `animated` prop to Button component for CTA emphasis.

**Files Modified**:
- `components/ui/Button.tsx` - Added `animated` prop and `animate-cta-pulse` class
- `app/globals.css` - Added `@keyframes cta-pulse` and `.animate-cta-pulse` class

**Usage**:
```tsx
<Button animated>Call to Action</Button>
```

**Features**:
- Subtle shadow pulse animation (2s infinite)
- Uses accent color (#137dc5) with 40% opacity
- Respects `prefers-reduced-motion`
- Disabled when button is disabled or loading

---

### 6. UI Index Updates

**Action**: Updated barrel exports for new components.

**Files Modified**:
- `components/ui/index.ts` - Added LanguageSwitcher export

---

## Testing Results

| Test Type | Result | Notes |
|-----------|--------|-------|
| TypeScript | PASS | All types correct |
| ESLint | PASS | Only pre-existing warnings in AICore |
| Build | PASS | Production build succeeds |

**Build Output**:
```
Route (app)                Size      First Load JS
/[locale]                  45.6 kB   280 kB
```

---

## Files Summary

### Created
| File | Purpose |
|------|---------|
| `components/ui/LanguageSwitcher.tsx` | Dropdown language selector |
| `components/effects/SectionTitleGlitch.tsx` | Scroll-triggered glitch for titles |

### Modified
| File | Changes |
|------|---------|
| `components/ui/index.ts` | Added LanguageSwitcher export |
| `components/effects/index.ts` | Added SectionTitleGlitch export |
| `components/layout/Header.tsx` | Integrated LanguageSwitcher |
| `components/layout/MobileMenu.tsx` | Added language section |
| `components/ui/Button.tsx` | Added animated prop |
| `app/globals.css` | Added CTA pulse animation |
| `messages/en.json` | Added language translation |
| `messages/it.json` | Added language translation |
| `components/sections/About.tsx` | Applied SectionTitleGlitch |
| `components/sections/Services.tsx` | Applied SectionTitleGlitch |
| `components/sections/Portfolio.tsx` | Applied SectionTitleGlitch |
| `components/sections/Process.tsx` | Applied SectionTitleGlitch |
| `components/sections/Stats.tsx` | Applied SectionTitleGlitch |
| `components/sections/FAQ.tsx` | Applied SectionTitleGlitch |
| `components/sections/Contact.tsx` | Applied SectionTitleGlitch |
| `components/sections/BeforeAfter.tsx` | Applied SectionTitleGlitch |
| `components/sections/ROICalculator.tsx` | Applied SectionTitleGlitch |

---

## Design System Consistency

All changes maintain consistency with:
- Brand colors (primary: #1b2f75, accent: #137dc5, accent-light: #00aeef)
- Button/Toggle sizing patterns (36x36px rounded)
- Framer Motion animation patterns
- Dark mode support
- Accessibility (WCAG AA, reduced motion)

---

## Accessibility Compliance

- LanguageSwitcher has full ARIA support (`aria-label`, `aria-expanded`, `aria-haspopup`, `role="listbox"`)
- SectionTitleGlitch uses `aria-hidden="true"` on decorative layers
- All animations respect `prefers-reduced-motion`
- Focus states maintained on all interactive elements
- Keyboard navigation (Tab, Enter, Escape) fully supported

---

## Performance Notes

- LanguageSwitcher uses lazy state updates
- SectionTitleGlitch uses `useInView` with `once: true` to prevent re-renders
- CTA pulse uses CSS animation (GPU accelerated)
- No additional JS bundle impact from new dependencies

---

## Conclusion

All requested improvements have been successfully implemented:

1. **Language Selector Fixed**: Modal still shows on first visit, and users can now change language anytime via header/mobile menu
2. **Section Glitch Effect**: All section titles now have a one-time glitch effect when scrolling into view
3. **CTA Animation Support**: Buttons can now have a pulse animation for emphasis

The website maintains its professional appearance while adding cohesive, branded interactive elements.
