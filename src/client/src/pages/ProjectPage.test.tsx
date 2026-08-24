import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import { appRoutes } from '../app/router'
import { createPortfolioQueryClient } from '../app/queryClient'

const routers: ReturnType<typeof createMemoryRouter>[] = []

afterEach(() => {
  routers.splice(0).forEach((router) => router.dispose())
})

describe('Project route visuals', () => {
  test('keeps one eager Dustwell preview in the route header under its visual contract', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/wild-bunch'],
    })
    routers.push(router)

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    const title = await screen.findByRole('heading', { level: 1, name: 'Wild Bunch' }, { timeout: 5_000 })
    const article = title.closest('article')
    const header = article?.querySelector('header')

    expect(header).not.toBeNull()
    expect(header).toHaveAttribute('data-visual-contract', 'wild-bunch-case-study-hero')
    const visual = within(header as HTMLElement).getByLabelText('Wild Bunch generated-town development-build preview')
    const image = within(visual).getByRole('img')

    expect(visual).toBeVisible()
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(article?.querySelectorAll('[data-visual-contract="wild-bunch-development-build-preview"]')).toHaveLength(1)
  })

  test('leaves an ordinary project route visual lazy', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/agentic-learning-lab'],
    })
    routers.push(router)

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    await screen.findByRole('heading', { level: 1, name: 'Agentic Learning Lab' })
    const image = screen.getByRole('img', {
      name: /venue floor plan used as the bounded project artifact/i,
    })

    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).not.toHaveAttribute('fetchpriority', 'high')
  })
})
