import { expect, test } from 'vitest'
import { editorialTheme } from './editorialTheme'

test('editorial theme exposes only canonical CSS token references', () => {
  expect(editorialTheme.color.ink).toBe('var(--color-ink)')
  expect(editorialTheme.color.tealDeep).toBe('var(--color-teal-deep)')
  expect(editorialTheme.space.xl).toBe('var(--space-8)')
  expect(editorialTheme.font.display).toBe('var(--font-display)')
  expect(editorialTheme.color.interiorCanvas).toBe('var(--color-interior-canvas)')
  expect(editorialTheme.font.siteSans).toBe('var(--font-site-sans)')
  expect(editorialTheme.font.articleSerif).toBe('var(--font-article-serif)')
  expect(editorialTheme.font.technical).toBe('var(--font-technical)')
})
