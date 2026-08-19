# Tailwind v4 @theme contract

## Shape

The portfolio uses one `@theme` block inside `@layer theme`. Every token in the design system is declared in this block. When the pipeline is installed, place the `@theme` block in a dedicated file such as `src/client/src/styles/theme.css`.

```css
@import "tailwindcss";

@layer theme {
  @theme {
    /* color */
    --color-surface-page: #ffffff;
    --color-surface-primary: #f8fafc;
    --color-surface-secondary: #f1f5f9;
    --color-surface-overlay: rgba(0, 0, 0, 0.5);

    --color-text-primary: #0f172a;
    --color-text-secondary: #475569;
    --color-text-muted: #64748b;
    --color-text-inverted: #ffffff;

    --color-border-subtle: #e2e8f0;
    --color-border-strong: #94a3b8;

    --color-accent-primary: #3b82f6;
    --color-accent-primary-hover: #2563eb;
    --color-accent-primary-active: #1d4ed8;

    --color-focus-ring: #3b82f6;

    /* font */
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, monospace;

    /* text */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;

    /* leading */
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;

    /* tracking */
    --tracking-tight: -0.025em;
    --tracking-normal: 0em;
    --tracking-wide: 0.025em;

    /* weight */
    --weight-normal: 400;
    --weight-medium: 500;
    --weight-semibold: 600;
    --weight-bold: 700;

    /* space */
    --space-0: 0px;
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;

    /* size */
    --size-px: 1px;
    --size-1: 0.25rem;
    --size-2: 0.5rem;
    --size-3: 0.75rem;
    --size-4: 1rem;
    --size-5: 1.25rem;
    --size-6: 1.5rem;
    --size-8: 2rem;
    --size-10: 2.5rem;
    --size-12: 3rem;
    --size-16: 4rem;
    --size-button: 2.5rem;

    /* radius */
    --radius-none: 0px;
    --radius-sm: 0.125rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;

    /* shadow */
    --shadow-none: none;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-overlay: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

    /* z-index */
    --z-base: 0;
    --z-sticky: 10;
    --z-dropdown: 20;
    --z-overlay: 30;
    --z-modal: 40;

    /* breakpoint */
    --breakpoint-sm: 40rem;
    --breakpoint-md: 48rem;
    --breakpoint-lg: 64rem;
    --breakpoint-xl: 80rem;

    /* motion */
    --duration-0: 0ms;
    --duration-75: 75ms;
    --duration-100: 100ms;
    --duration-150: 150ms;
    --duration-200: 200ms;
    --duration-300: 300ms;
    --duration-500: 500ms;

    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

    --delay-0: 0ms;
    --delay-75: 75ms;
    --delay-100: 100ms;
    --delay-150: 150ms;
    --delay-200: 200ms;
  }
}
```

## Rules

- Declare every token in the `@theme` block. Do not create additional `@theme` blocks or split tokens into per-component files.
- Each token becomes a CSS custom property named `--<token>` and a value in the `theme(--<token>)` namespace.
- Order tokens by type: color, font, text, leading, tracking, weight, space, size, radius, shadow, z, breakpoint, duration, ease, delay.
- Do not use `@apply` inside the `@theme` block.
- All values must be literal. Do not compute values from other tokens in this block.
