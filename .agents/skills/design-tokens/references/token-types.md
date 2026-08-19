# Token types

These tables show a representative subset; the authoritative full list is in [references/tailwind-v4-theme.md](./tailwind-v4-theme.md).

## color

Visual colour used for surfaces, text, borders, accents, and states. Values are hex, `rgb()`, `hsl()`, or `rgba()` / `hsla()`.

| Token | Example value | Usage |
|---|---|---|
| `color-surface-page` | `#ffffff` | Page background |
| `color-surface-primary` | `#f8fafc` | Primary card or section background |
| `color-text-primary` | `#0f172a` | Main body text |
| `color-text-muted` | `#64748b` | Secondary or helper text |
| `color-border-subtle` | `#e2e8f0` | Subtle borders and dividers |
| `color-accent-primary` | `#3b82f6` | Primary buttons and links |
| `color-focus-ring` | `#3b82f6` | Focus outline |

## typography

Type treatment tokens: family, size, line height, letter spacing, and weight. Typography tokens are split into five prefixes.

### font

| Token | Example value | Usage |
|---|---|---|
| `font-sans` | `"Inter", ui-sans-serif, system-ui, sans-serif` | Body and headings |
| `font-mono` | `"JetBrains Mono", ui-monospace, monospace` | Code and technical labels |

### text

| Token | Example value | Usage |
|---|---|---|
| `text-xs` | `0.75rem` | Captions and metadata |
| `text-sm` | `0.875rem` | Small body, labels |
| `text-base` | `1rem` | Default body |
| `text-lg` | `1.125rem` | Lead paragraph |
| `text-xl` | `1.25rem` | Sub-headings |
| `text-2xl` | `1.5rem` | Section headings |

### leading

| Token | Example value | Usage |
|---|---|---|
| `leading-tight` | `1.25` | Headings |
| `leading-normal` | `1.5` | Body text |
| `leading-relaxed` | `1.625` | Long reading passages |

### tracking

| Token | Example value | Usage |
|---|---|---|
| `tracking-tight` | `-0.025em` | Large headings |
| `tracking-normal` | `0em` | Body text |
| `tracking-wide` | `0.025em` | Labels and small caps |

### weight

| Token | Example value | Usage |
|---|---|---|
| `weight-normal` | `400` | Body |
| `weight-medium` | `500` | Emphasis |
| `weight-semibold` | `600` | Sub-headings |
| `weight-bold` | `700` | Headings |

## space

Spacing between or inside elements. The scale is in `rem` and grows by a 4-point grid.

| Token | Example value | Usage |
|---|---|---|
| `space-0` | `0px` | No spacing |
| `space-1` | `0.25rem` | Tight gaps |
| `space-2` | `0.5rem` | Default small spacing |
| `space-3` | `0.75rem` | Tight section gaps |
| `space-4` | `1rem` | Default medium spacing |
| `space-5` | `1.25rem` | Medium component gaps |
| `space-6` | `1.5rem` | Section internal gaps |
| `space-8` | `2rem` | Larger component gaps |
| `space-10` | `2.5rem` | Major section padding |
| `space-12` | `3rem` | Section separation |
| `space-16` | `4rem` | Major section breaks |

## size

Width and height of elements. Uses the same numeric scale as space but may also hold component-specific names.

| Token | Example value | Usage |
|---|---|---|
| `size-px` | `1px` | Hairline borders |
| `size-4` | `1rem` | Small icon boxes |
| `size-8` | `2rem` | Medium icon boxes |
| `size-12` | `3rem` | Large touch targets |
| `size-button` | `2.5rem` | Standard button height |

## radius

Corner rounding. Use `full` for pill or circle shapes.

| Token | Example value | Usage |
|---|---|---|
| `radius-none` | `0px` | Sharp corners |
| `radius-sm` | `0.125rem` | Subtle rounding |
| `radius-md` | `0.375rem` | Default rounding |
| `radius-lg` | `0.5rem` | Cards and panels |
| `radius-xl` | `1rem` | Large cards |
| `radius-full` | `9999px` | Pills and circles |

## shadow

Box and drop shadows. Layered shadows use a comma-separated list.

| Token | Example value | Usage |
|---|---|---|
| `shadow-none` | `none` | Flat elements |
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle lift |
| `shadow-card` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Cards |
| `shadow-overlay` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modals and popovers |

## z-index

Stacking order. Keep the range small and intentional.

| Token | Example value | Usage |
|---|---|---|
| `z-base` | `0` | Default layer |
| `z-sticky` | `10` | Sticky headers |
| `z-dropdown` | `20` | Dropdowns |
| `z-overlay` | `30` | Backdrops and overlays |
| `z-modal` | `40` | Modals and dialogs |

## breakpoint

Responsive width thresholds in `rem`. The values match the Tailwind v4 defaults unless a project override exists.

| Token | Example value | Usage |
|---|---|---|
| `breakpoint-sm` | `40rem` | Small screens |
| `breakpoint-md` | `48rem` | Tablets |
| `breakpoint-lg` | `64rem` | Small desktops |
| `breakpoint-xl` | `80rem` | Large screens |

## motion

Animation timing. Split into duration, easing, and delay.

### duration

| Token | Example value | Usage |
|---|---|---|
| `duration-0` | `0ms` | Immediate |
| `duration-75` | `75ms` | Micro feedback |
| `duration-150` | `150ms` | Hover and small transitions |
| `duration-300` | `300ms` | Reveals and larger transitions |
| `duration-500` | `500ms` | Page-level motion |

### ease

| Token | Example value | Usage |
|---|---|---|
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entrances and hover |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric transitions |

### delay

| Token | Example value | Usage |
|---|---|---|
| `delay-0` | `0ms` | No delay |
| `delay-75` | `75ms` | Stagger step 1 |
| `delay-100` | `100ms` | Stagger step 2 |
| `delay-150` | `150ms` | Stagger step 3 |
