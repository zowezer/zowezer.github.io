# Design System Master - Aleppo Soap

## Brand Vision
**Authentic, Traditional, Purity.**
The interface should feel like an ancient market stall transformed into a luxury digital experience. It emphasizes the raw, natural ingredients (Olive and Laurel oil) and the 2000-year-old tradition.

## Color Palette (OkLCH)
We use OkLCH for perceptual uniformity and organic color transitions.

| Token | OkLCH Value | HEX (Approx) | Usage |
|-------|-------------|--------------|-------|
| `primary` | `oklch(45% 0.08 110)` | `#5a6333` | Olive - Brand identity, primary buttons |
| `secondary` | `oklch(92% 0.04 85)` | `#f2edda` | Sand - Background surfaces, card backgrounds |
| `accent` | `oklch(55% 0.12 45)` | `#a35c45` | Clay - CTAs, highlight elements, alerts |
| `neutral-900` | `oklch(25% 0.01 110)` | `#30322a` | Deep Earth - Headings, primary text |
| `neutral-600` | `oklch(50% 0.01 110)` | `#70726a` | Muted Earth - Body text, secondary info |
| `surface` | `oklch(98% 0.01 110)` | `#fafaf9` | Pure - Main background |

## Typography
Avoiding AI defaults (Inter/Roboto/Fraunces).

- **Display/Headings**: `Marcellus` (Serif)
  - *Vibe*: Stone-carved, ancient, authoritative.
  - *Scaling*: Fluid `clamp()` for marketing sections.
- **Body**: `Figtree` (Sans-serif)
  - *Vibe*: Clean, organic, approachable.
  - *Weight*: 400 (Regular), 600 (Semibold).

## Layout & Spatial
- **Grid**: 12-column system with 24px/32px gutters.
- **Spacing**: 4pt modular scale (4, 8, 12, 16, 24, 32, 48, 64, 96).
- **Radius**: Subtle 4px for a "hand-cut soap" feel. Avoid large bubbles.

## Interaction & Motion
- **Entrance**: Staggered fade-up with a slight scale (`duration: 400ms`, `ease: ease-out-quart`).
- **Hover**: Subtle border-bottom or brightness shift. No aggressive scaling.

## Absolute Bans (AI Slop Checklist)
- [ ] NO gradient text.
- [ ] NO side-stripe borders on cards.
- [ ] NO large rounded corners (>12px).
- [ ] NO Inter or Roboto fonts.
