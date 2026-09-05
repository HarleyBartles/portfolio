import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { EditorialFootnote } from './EditorialFootnote'

test('renders the reusable article-serif footnote treatment', () => {
  render(
    <PortfolioThemeProvider>
      <EditorialFootnote>*clownshoes, n.: a definition.</EditorialFootnote>
    </PortfolioThemeProvider>,
  )

  const footnote = screen.getByText('*clownshoes, n.: a definition.')

  expect(footnote).toHaveAttribute('data-editorial-footnote')
  expect(footnote).toHaveAttribute('data-type-register', 'article-serif')
  expect(footnote.tagName).toBe('P')

  const styles = Array.from(document.head.querySelectorAll('style[data-styled]'))
    .map((style) => style.textContent)
    .join('\n')

  expect(styles).toContain('font-family:var(--font-article-serif)')
  expect(styles).toContain('font-size:0.93em')
  expect(styles).toContain('font-style:italic')
  expect(styles).toContain('color:var(--color-ink-secondary)')
})
