import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { createMemoryRouter } from 'react-router-dom'
import { AppProviders } from './app/AppProviders'
import { createPortfolioQueryClient } from './app/queryClient'

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
