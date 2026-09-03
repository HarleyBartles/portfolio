import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../PortfolioThemeProvider'
import { IndexHeader } from './IndexHeader'

test.each(['single', 'split'] as const)('renders the %s index hierarchy without caller recipes', (layout) => {
  render(
    <PortfolioThemeProvider>
      <IndexHeader
        eyebrow="Writing / field notes"
        title="Writing and Notes"
        summary="Notes from building systems in public."
        layout={layout}
      />
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Writing and Notes' })).toBeInTheDocument()
  expect(screen.getByText('Writing / field notes')).toBeInTheDocument()
  expect(screen.getByText('Notes from building systems in public.')).toBeInTheDocument()
  expect(screen.getByRole('heading').parentElement?.parentElement).toHaveAttribute('data-index-layout', layout)
})
