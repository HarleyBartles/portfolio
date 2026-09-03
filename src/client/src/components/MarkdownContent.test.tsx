import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'
import { MarkdownContent } from './MarkdownContent'

test('maps markdown to owned prose semantics and link/media contracts', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <MarkdownContent markdown={'## Heading\n\n### Subheading\n\nA paragraph with [an internal link](/about) and [an external link](https://example.com).\n\n![Ordinary image](/media/example.webp)\n\n![Fairytale page](/fairytales/goldilocks/page-1200.webp)\n\n<div>raw html skipped</div>'} />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 2, name: 'Heading' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 3, name: 'Subheading' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'an internal link' })).toHaveAttribute('href', '/about')
  expect(screen.getByRole('link', { name: /an external link/ })).toHaveAttribute('target', '_blank')
  expect(screen.getByRole('img', { name: 'Ordinary image' })).toHaveAttribute('loading', 'lazy')
  expect(screen.getByRole('img', { name: 'Fairytale page' }).closest('picture')).toHaveClass('fairytale-page')
  expect(screen.queryByText('raw html skipped')).toBeNull()
  expect(document.querySelector('[data-type-register="article-serif"]')).toBeInTheDocument()
})
