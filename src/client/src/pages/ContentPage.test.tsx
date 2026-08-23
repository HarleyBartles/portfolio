import type { ReactElement } from 'react'
import { act, render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import { appRoutes } from '../app/router'

vi.mock('../features/case-study/projectPresentations', async () => {
  const React = await import('react')
  let resolvePresentation: ((value: { default: () => ReactElement }) => void) | undefined
  const DeferredWildBunch = React.lazy(() => new Promise<{ default: () => ReactElement }>((resolve) => {
    resolvePresentation = resolve
  }))

  return {
    getProjectPresentation: (presentation: string) => presentation === 'wild-bunch-case-study' ? DeferredWildBunch : undefined,
    resolveWildBunchPresentation: () => resolvePresentation?.({
      default: () => React.createElement('h2', undefined, 'Specialist body ready'),
    }),
  }
})

import * as presentations from '../features/case-study/projectPresentations'

describe('ContentPage specialist presentation boundary', () => {
  test('announces a stable loading state until the specialist body is ready', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/wild-bunch'],
    })

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    const fallback = await screen.findByRole('status', { name: 'Loading case study presentation' }, { timeout: 5_000 })
    expect(fallback).toHaveAttribute('data-loading', 'specialist-presentation')

    await act(async () => {
      const resolve = (presentations as Record<string, unknown>).resolveWildBunchPresentation
      expect(resolve).toEqual(expect.any(Function))
      if (typeof resolve === 'function') resolve()
    })

    expect(await screen.findByRole('heading', { level: 2, name: 'Specialist body ready' }, { timeout: 5_000 })).toBeVisible()
    expect(screen.queryByRole('status', { name: 'Loading case study presentation' })).not.toBeInTheDocument()
  })
})
