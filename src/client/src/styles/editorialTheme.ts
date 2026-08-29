export const editorialTheme = {
  color: {
    canvas: 'var(--color-canvas)',
    surface: 'var(--color-surface)',
    ink: 'var(--color-ink)',
    muted: 'var(--color-muted)',
    accent: 'var(--color-accent)',
    accentSoft: 'var(--color-accent-soft)',
    tealDeep: 'var(--color-teal-deep)',
    border: 'var(--color-border)',
  },
  space: {
    xs: 'var(--space-2)',
    sm: 'var(--space-3)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
    xxl: 'var(--space-12)',
  },
  font: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    code: 'var(--font-code)',
  },
} as const

export type EditorialTheme = typeof editorialTheme
