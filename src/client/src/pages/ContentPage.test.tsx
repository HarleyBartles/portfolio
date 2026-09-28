import type { ReactElement } from 'react'
import { act, render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, expect, test, vi } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import { appRoutes } from '../app/router'
import { PortfolioThemeProvider } from '../components'

vi.mock('../features/case-study/projectPresentations', async () => {
  const React = await import('react')
  let resolvePresentation: ((value: { default: () => ReactElement }) => void) | undefined
  const DeferredWildBunch = React.lazy(() => new Promise<{ default: () => ReactElement }>((resolve) => {
    resolvePresentation = resolve
  }))

  return {
    getProjectPresentation: (slug: string) => slug === 'wild-bunch' ? DeferredWildBunch : undefined,
    resolveWildBunchPresentation: () => resolvePresentation?.({
      default: () => React.createElement('h2', undefined, 'Specialist body ready'),
    }),
  }
})

import * as presentations from '../features/case-study/projectPresentations'

const routers: ReturnType<typeof createMemoryRouter>[] = []

afterEach(() => {
  routers.splice(0).forEach((router) => router.dispose())
})

const renderRoute = (path: string) => {
  const router = createMemoryRouter(appRoutes, {
    basename: '/portfolio',
    initialEntries: [`/portfolio${path}`],
  })
  routers.push(router)
  const initialized = router.state.initialized
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
      const unsubscribe = router.subscribe((state) => {
        if (!state.initialized) return
        unsubscribe()
        resolve()
      })
    })
  return initialized.then(() => render(
    <QueryClientProvider client={createPortfolioQueryClient()}>
      <PortfolioThemeProvider>
        <RouterProvider router={router} />
      </PortfolioThemeProvider>
    </QueryClientProvider>,
  ))
}

test('an article without authored choices has no invented continuation navigation', async () => {
  await renderRoute('/writing/the-right-test-isnt-your-favourite-test')

  await screen.findByRole('heading', { level: 1, name: "The right test isn't your favourite test" })
  expect(screen.queryByRole('navigation', { name: 'Continue reading' })).not.toBeInTheDocument()
})

test('the project page announces its pending specialist body and replaces it when ready', async () => {
  await renderRoute('/projects/wild-bunch')

  const fallback = await screen.findByRole('status', { name: 'Loading case study presentation' })
  expect(fallback).toHaveAttribute('data-loading', 'specialist-presentation')

  await act(async () => {
    const resolve = (presentations as Record<string, unknown>).resolveWildBunchPresentation
    expect(resolve).toEqual(expect.any(Function))
    if (typeof resolve === 'function') resolve()
  })

  expect(await screen.findByRole('heading', { level: 2, name: 'Specialist body ready' })).toBeVisible()
  expect(screen.queryByRole('status', { name: 'Loading case study presentation' })).not.toBeInTheDocument()
})
