# Clean Shopper — Design System Specification
**Version:** 1.0
**Date:** 2026-04-06
**Typeface:** Poppins (Google Fonts)

> **Critical principle:** Never hardcode a hex value. Use the token name from `tailwind.config.js`.

---

## Color Tokens

### Primary — Forest Green
Communicates safety, transparency, and trust.

| Token | Value | Usage |
|---|---|---|
| `color-primary-50` | #f0f9f4 | Page backgrounds, subtle tints |
| `color-primary-100` | #d9f0e5 | Hover states on light surfaces |
| `color-primary-200` | #b3e0cb | Borders, dividers |
| `color-primary-300` | #7fc9a7 | Disabled primary elements |
| `color-primary-400` | #4aad82 | Secondary buttons, tags |
| `color-primary-500` | #2D6A4F | Primary buttons, key UI actions, active nav |
| `color-primary-600` | #245a42 | Button hover state |
| `color-primary-700` | #1c4835 | Button pressed state |
| `color-primary-800` | #133628 | Dark text on light green surfaces |
| `color-primary-900` | #0a2419 | High-contrast text, headings on light backgrounds |

### Secondary — Electric Tangerine
Communicates warmth, energy, and approachability.

| Token | Value | Usage |
|---|---|---|
| `color-secondary-50` | #fff4ef | Warm surface tints |
| `color-secondary-100` | #ffe5d6 | Alert backgrounds, warm cards |
| `color-secondary-200` | #ffcbac | Illustration accents |
| `color-secondary-300` | #ffa878 | Badges, highlights |
| `color-secondary-400` | #ff8550 | Supporting CTAs |
| `color-secondary-500` | #FF6B35 | Secondary buttons, badges, callouts |
| `color-secondary-600` | #e55520 | Hover state for secondary actions |
| `color-secondary-700` | #c0421a | Pressed state |
| `color-secondary-800` | #8f3013 | Text on light orange surfaces |
| `color-secondary-900` | #5c1e0b | High-contrast text on warm surfaces |

### Accent — Soft Lilac
Adds softness and playfulness without competing with primary or secondary.

| Token | Value | Usage |
|---|---|---|
| `color-accent-50` | #f7f3fe | Subtle background tints |
| `color-accent-100` | #ede5fc | Card backgrounds, tag fills |
| `color-accent-200` | #d9c9f9 | Borders on accent surfaces |
| `color-accent-300` | #c0a8f4 | Decorative elements |
| `color-accent-400` | #a882ee | Supporting labels |
| `color-accent-500` | #9063E8 | Accent highlights, category tags, pills |
| `color-accent-600` | #7548cc | Hover on accent elements |
| `color-accent-700` | #5a35a8 | Pressed state |
| `color-accent-800` | #3f247a | Text on light accent surfaces |
| `color-accent-900` | #25144d | High-contrast on accent backgrounds |

### Semantic Colors
Standard meaning — users must not need to learn new associations.

| Token | Value | Usage |
|---|---|---|
| `color-success-500` | #22C55E | Success states, "clean" assessments, confirmations |
| `color-success-100` | #DCFCE7 | Success backgrounds |
| `color-warning-500` | #F59E0B | Caution states, mixed ingredient assessments |
| `color-warning-100` | #FEF3C7 | Warning backgrounds |
| `color-error-500` | #EF4444 | Error states, "not clean" assessments |
| `color-error-100` | #FEE2E2 | Error backgrounds |
| `color-info-500` | #3B82F6 | Informational states, loading, neutral notices |
| `color-info-100` | #DBEAFE | Info backgrounds |

### Neutral
| Token | Value | Usage |
|---|---|---|
| `color-neutral-0` | #FFFFFF | Page background, card surfaces |
| `color-neutral-50` | #F9FAFB | Subtle off-white backgrounds |
| `color-neutral-100` | #F3F4F6 | Section backgrounds, input fills |
| `color-neutral-200` | #E5E7EB | Dividers, borders |
| `color-neutral-300` | #D1D5DB | Disabled borders |
| `color-neutral-400` | #9CA3AF | Placeholder text |
| `color-neutral-500` | #6B7280 | Secondary/supporting text |
| `color-neutral-600` | #4B5563 | Body text |
| `color-neutral-700` | #374151 | Strong body text |
| `color-neutral-800` | #1F2937 | Headings |
| `color-neutral-900` | #111827 | High-contrast headings, primary text |

---

## Typography

**Typeface:** Poppins (Google Fonts) — single typeface across all sizes and weights.
**Import:** `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');`

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12px | 16px | 400 | Labels, fine print, badges |
| `text-sm` | 14px | 20px | 400 | Supporting text, captions, helper text |
| `text-base` | 16px | 22px | 400 | Body copy, default UI text |
| `text-lg` | 18px | 28px | 500 | Lead paragraphs, card titles |
| `text-xl` | 20px | 26px | 600 | Section subheadings |
| `text-2xl` | 24px | 32px | 600 | Page subheadings |
| `text-3xl` | 30px | 36px | 700 | Section headings |
| `text-4xl` | 36px | 40px | 700 | Page headings |
| `text-5xl` | 48px | 52px | 700 | Hero/display headings |

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `font-light` | 300 | Decorative large text, display callouts |
| `font-normal` | 400 | Body copy, supporting text |
| `font-medium` | 500 | Emphasized body, card titles |
| `font-semibold` | 600 | Subheadings, button labels |
| `font-bold` | 700 | Headings, CTAs |

### Letter Spacing

| Token | Value | Tailwind class | Usage |
|---|---|---|---|
| `tracking-normal` | 0 | `tracking-normal` | Headings, feature titles |
| `tracking-body` | 0.0125em | `tracking-body` | Body copy (≈0.2px at 16px) |

---

## Spacing Scale
Open and airy. Default to generous padding and margins. Tighter spacing only for compact components like badges or inline labels.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps, icon-to-label spacing |
| `space-2` | 8px | Tight inline spacing |
| `space-3` | 12px | Small internal padding |
| `space-4` | 16px | Default internal padding (inputs, small cards) |
| `space-5` | 20px | Comfortable internal padding |
| `space-6` | 24px | Section padding, card padding |
| `space-8` | 32px | Large card padding, section gaps |
| `space-10` | 40px | Component vertical rhythm |
| `space-12` | 48px | Section-level vertical spacing |
| `space-16` | 64px | Major section separators |
| `space-20` | 80px | Hero/feature area padding |
| `space-24` | 96px | Page-level vertical rhythm |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 4px | Inputs, inline tags |
| `radius-md` | 8px | Buttons, small cards |
| `radius-lg` | 12px | Standard cards |
| `radius-xl` | 16px | Large cards, modals |
| `radius-2xl` | 24px | Featured cards, hero elements |
| `radius-full` | 9999px | Pills, badges, avatar circles |

---

## Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle card lift on flat surfaces |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)` | Modals, overlays, floating elements |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04)` | Drawers, command palettes |

---

## Tailwind Config Reference

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4', 100: '#d9f0e5', 200: '#b3e0cb', 300: '#7fc9a7',
          400: '#4aad82', 500: '#2D6A4F', 600: '#245a42', 700: '#1c4835',
          800: '#133628', 900: '#0a2419',
        },
        secondary: {
          50: '#fff4ef', 100: '#ffe5d6', 200: '#ffcbac', 300: '#ffa878',
          400: '#ff8550', 500: '#FF6B35', 600: '#e55520', 700: '#c0421a',
          800: '#8f3013', 900: '#5c1e0b',
        },
        accent: {
          50: '#f7f3fe', 100: '#ede5fc', 200: '#d9c9f9', 300: '#c0a8f4',
          400: '#a882ee', 500: '#9063E8', 600: '#7548cc', 700: '#5a35a8',
          800: '#3f247a', 900: '#25144d',
        },
        success: { 100: '#DCFCE7', 500: '#22C55E' },
        warning: { 100: '#FEF3C7', 500: '#F59E0B' },
        error:   { 100: '#FEE2E2', 500: '#EF4444' },
        info:    { 100: '#DBEAFE', 500: '#3B82F6' },
        neutral: {
          0: '#FFFFFF', 50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
          300: '#D1D5DB', 400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563',
          700: '#374151', 800: '#1F2937', 900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      letterSpacing: {
        body: '0.0125em',
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px',
      },
      boxShadow: {
        sm:  '0 1px 2px rgba(0,0,0,0.05)',
        md:  '0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06)',
        lg:  '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
        xl:  '0 20px 25px rgba(0,0,0,0.10), 0 8px 10px rgba(0,0,0,0.04)',
      },
    },
  },
}
```
