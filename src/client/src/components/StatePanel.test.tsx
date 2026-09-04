import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'
import { StatePanel } from './StatePanel'

test('owns the full-page state hierarchy and recovery actions', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <StatePanel
          id="error-title"
          title="Portfolio content unavailable"
          messages={['The first explanation.', 'A second useful detail.']}
          announcement="alert"
          actions={[{ label: 'Go home', to: '/' }, { label: 'Browse projects', to: '/projects' }]}
        />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Portfolio content unavailable' })).toHaveAttribute('id', 'error-title')
  expect(screen.getByRole('alert')).toHaveTextContent('The first explanation.')
  expect(screen.getByText('A second useful detail.')).toBeInTheDocument()
  const recovery = screen.getByRole('navigation', { name: 'Recovery navigation' })
  expect(within(recovery).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual(['/', '/projects'])
  expect(document.querySelector('.state-actions')).not.toBeInTheDocument()
})

test('supports a compact secondary heading without a live announcement', () => {
  render(
    <PortfolioThemeProvider>
      <MemoryRouter>
        <StatePanel id="placeholder-title" title="Projects" messages={['Coming soon.']} headingLevel={2} announcement="none" routeLoading />
      </MemoryRouter>
    </PortfolioThemeProvider>,
  )

  expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
  expect(screen.queryByRole('status')).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 2 }).closest('section')).toHaveAttribute('data-route-loading')
  expect(screen.queryByRole('navigation', { name: 'Recovery navigation' })).not.toBeInTheDocument()
})
