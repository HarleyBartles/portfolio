import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { EditorialHeading } from './EditorialHeading'

test('owns its typed line-wrap contract', () => {
  render(
    <PortfolioThemeProvider>
      <EditorialHeading as="h1" id="display-title" wrap="display">A display title</EditorialHeading>
      <EditorialHeading id="balanced-title" wrap="balanced">A balanced title</EditorialHeading>
      <EditorialHeading id="single-title" wrap="single-line">A single line title</EditorialHeading>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'A display title' })).toHaveAttribute('data-text-wrap', 'display')
  expect(screen.getByRole('heading', { level: 2, name: 'A balanced title' })).toHaveAttribute('data-text-wrap', 'balanced')
  expect(screen.getByRole('heading', { level: 2, name: 'A single line title' })).toHaveAttribute('data-text-wrap', 'single-line')
  expect(document.querySelector('[wrap]')).not.toBeInTheDocument()
})
