import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { EditorialPullQuote } from './EditorialPullQuote'

test('renders the canonical pull quote with an optional attribution', () => {
  render(
    <PortfolioThemeProvider>
      <EditorialPullQuote attribution="Production invariant">No source capture, no success.</EditorialPullQuote>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('blockquote')).toHaveTextContent('No source capture, no success.')
  expect(screen.getByText('Production invariant')).toBeVisible()

  const styles = Array.from(document.head.querySelectorAll('style[data-styled]'))
    .map((style) => style.textContent)
    .join('\n')

  expect(styles).toContain('font-size:clamp(1.65rem, 3.2vw, 2.7rem)')
  expect(styles).toContain('font-weight:600')
  expect(styles).toContain('background:color-mix(in srgb, var(--color-accent-soft) 36%, transparent)')
})
