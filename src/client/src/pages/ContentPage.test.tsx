import type { ReactElement } from 'react'
import { act, render, screen, within } from '@testing-library/react'
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
    getProjectPresentation: (presentation: string) => presentation === 'wild-bunch-case-study'
      ? DeferredWildBunch
      : presentation === 'patch-pipeline-case-study'
        ? () => React.createElement('p', undefined, 'Patch specialist body')
        : presentation === 'learning-lab-case-study'
          ? () => React.createElement('p', undefined, 'Learning Lab specialist body')
        : undefined,
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

  test('art directs the Patch header while keeping route copy as selectable HTML', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/adventures-of-patch'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    await screen.findByRole('heading', { level: 1, name: 'Adventures of Patch' }, { timeout: 5_000 })
    const header = container.querySelector('[data-visual-contract="patch-case-study-hero"]') as HTMLElement
    expect(header).toHaveAttribute('data-visual-contract', 'patch-case-study-hero')
    expect(within(header).getByRole('heading', { level: 1, name: 'Adventures of Patch' })).toBeVisible()
    expect(within(header).getByText(/controlled creative pipeline/i)).toBeVisible()
    expect(within(header).getByText('active project')).toBeVisible()
    const image = within(header).getByRole('img', { name: /Patch carries an index card and folded map/i })
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(container.querySelector('[data-visual-contract="patch-case-study-hero"] picture source[media="(min-width: 45rem)"]')).not.toBeNull()
  })

  test('assigns the Learning Lab field-manual hero contract', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/agentic-learning-lab'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    await screen.findByRole('heading', { level: 1, name: 'Agentic Learning Lab' }, { timeout: 5_000 })
    const header = container.querySelector('[data-visual-contract="learning-lab-case-study-hero"]') as HTMLElement
    expect(within(header).getByText('Direct')).toBeVisible()
    expect(within(header).getByText('Redirect')).toBeVisible()
    expect(await screen.findByText('Learning Lab specialist body')).toBeVisible()
  })
})
