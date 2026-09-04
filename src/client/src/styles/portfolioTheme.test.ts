import { render } from '@testing-library/react'
import { createElement } from 'react'
import styled from 'styled-components'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../components'
import { portfolioTheme } from './portfolioTheme'

const ThemeProbe = styled.div`
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.siteSans};
`

test('portfolio theme exposes only canonical CSS token references', () => {
  expect(portfolioTheme.color.ink).toBe('var(--color-ink)')
  expect(portfolioTheme.color.tealDeep).toBe('var(--color-teal-deep)')
  expect(portfolioTheme.space.xl).toBe('var(--space-8)')
  expect(portfolioTheme.font.display).toBe('var(--font-display)')
  expect(portfolioTheme.color.interiorCanvas).toBe('var(--color-interior-canvas)')
  expect(portfolioTheme.font.siteSans).toBe('var(--font-site-sans)')
  expect(portfolioTheme.font.articleSerif).toBe('var(--font-article-serif)')
  expect(portfolioTheme.font.technical).toBe('var(--font-technical)')
  expect(portfolioTheme.type.metadataSize).toBe('var(--type-metadata-size)')
  expect(portfolioTheme.motion.fast).toBe('var(--duration-fast)')
})

test('portfolio theme provider makes typed theme values available to styled components', () => {
  const { container } = render(
    createElement(
      PortfolioThemeProvider,
      null,
      createElement(ThemeProbe),
    ),
  )

  expect(container.firstElementChild).toHaveStyle({
    color: 'var(--color-ink)',
    fontFamily: 'var(--font-site-sans)',
  })
})
