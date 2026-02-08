# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** QuickDesign
**Generated:** 2026-02-02 01:48:11
**Category:** Service Landing Page

---

## Global Rules

### Color Palette (Dark Mode - Brand Aligned)

| Role       | Hex                           | CSS Variable           |
| ---------- | ----------------------------- | ---------------------- |
| Primary    | `#7C3AED`                   | `--color-primary`    |
| Secondary  | `#06B6D4`                   | `--color-brand-cyan` |
| CTA/Accent | `#F97316`                   | `--color-cta`        |
| Background | `#050510`                   | `--color-background` |
| Surface    | `#0A0A1F`                   | `--color-surface`    |
| Text       | `#F8FAFC`                   | `--color-text`       |
| Text Muted | `#94A3B8`                   | `--color-text-muted` |
| Border     | `rgba(255, 255, 255, 0.08)` | `--color-border`     |

**Color Notes:** Deep dark violet background with creative purple/cyan gradients.

### Typography

- **Heading Font:** Outfit
- **Body Font:** Work Sans
- **Mood:** geometric, modern, clean, balanced, contemporary, versatile
- **Google Fonts:** [Outfit + Work Sans](https://fonts.google.com/share?selection.family=Outfit:wght@300;400;500;600;700|Work+Sans:wght@300;400;500;600;700)

**CSS Import:**

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token           | Value                 | Usage                     |
| --------------- | --------------------- | ------------------------- |
| `--space-xs`  | `4px` / `0.25rem` | Tight gaps                |
| `--space-sm`  | `8px` / `0.5rem`  | Icon gaps, inline spacing |
| `--space-md`  | `16px` / `1rem`   | Standard padding          |
| `--space-lg`  | `24px` / `1.5rem` | Section padding           |
| `--space-xl`  | `32px` / `2rem`   | Large gaps                |
| `--space-2xl` | `48px` / `3rem`   | Section margins           |
| `--space-3xl` | `64px` / `4rem`   | Hero padding              |

### Shadow Depths (Glows)

| Level             | Value                                 | Usage             |
| ----------------- | ------------------------------------- | ----------------- |
| `--shadow-sm`   | `0 1px 2px rgba(0,0,0,0.5)`         | Subtle depth      |
| `--shadow-md`   | `0 4px 6px rgba(0,0,0,0.6)`         | Cards             |
| `--shadow-lg`   | `0 10px 15px rgba(0,0,0,0.7)`       | Floating elements |
| `--shadow-glow` | `0 0 20px rgba(14, 165, 233, 0.15)` | Primary accents   |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #F97316;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 0 15px rgba(249, 115, 22, 0.4);
}

/* Secondary Button */
.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

### Cards

```css
.card {
  background: #111111; /* or rgba(255,255,255,0.03) for glass */
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
```

### Inputs

```css
.input {
  background: rgba(255,255,255,0.03);
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 16px;
  color: white;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #0EA5E9;
  outline: none;
  box-shadow: 0 0 0 1px #0EA5E9;
}
```

---

## Style Guidelines

**Style:** AI-Driven Dynamic (Safe Dark Mode)

**Keywords:** Dark mode, neon accents, glassmorphism, smooth gradients, clean typography.

**Best For:** SaaS, AI Tools, Developer Tools, Modern Landing Pages.

### Page Pattern

**Pattern Name:** Modern SaaS Landing

- **Conversion Strategy:** "Show, don't tell". Immediate value demonstration.
- **Section Order:** 1. Hero (with interactive demo/visual), 2. Social Proof (Logos), 3. Benefits (Bento Grid), 4. Features (Deep Dive), 5. Pricing, 6. CTA, 7. Footer.
- **Interaction:** Scroll-triggered reveals, subtle hover glows, smooth application-like feel.

---

## Anti-Patterns (Do NOT Use)

- ❌ Complex navigation
- ❌ Hidden contact info

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
