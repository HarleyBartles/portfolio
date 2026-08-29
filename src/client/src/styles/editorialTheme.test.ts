import { expect, test } from 'vitest'
import { editorialTheme } from './editorialTheme'

test('editorial theme exposes only canonical CSS token references', () => {
  expect(editorialTheme.color.ink).toBe('var(--color-ink)')
  expect(editorialTheme.space.xl).toBe('var(--space-8)')
  expect(editorialTheme.font.display).toBe('var(--font-display)')
})
