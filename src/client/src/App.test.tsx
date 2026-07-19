import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { createMemoryRouter } from 'react-router-dom'
import { AppProviders } from './app/AppProviders'
import { createPortfolioQueryClient } from './app/queryClient'
import { appRoutes } from './app/router'

test('app renders the active route through the router shell', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <p>Route content</p>,
    },
  ])

  render(
    <AppProviders
      queryClient={createPortfolioQueryClient()}
      router={router}
    />,
  )

  expect(screen.getByText('Route content')).toBeInTheDocument()
})

test.each([
  ['/projects', 'Projects'],
  ['/experience', 'Experience'],
  ['/engineering-practice', 'Engineering Practice'],
  ['/ai-engineering', 'AI Engineering'],
  ['/writing', 'Writing and Notes'],
])('app renders the placeholder seam for %s', (initialEntry, heading) => {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [initialEntry],
  })

  render(
    <AppProviders
      queryClient={createPortfolioQueryClient()}
      router={router}
    />,
  )

  expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  expect(screen.getByText(/section is being prepared/i)).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /page not found/i })).not.toBeInTheDocument()
})
