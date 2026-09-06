import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import { appRoutes } from '../app/router'
import { createPortfolioQueryClient } from '../app/queryClient'
import { PortfolioThemeProvider } from '../components'

const routers: ReturnType<typeof createMemoryRouter>[] = []

afterEach(() => {
  routers.splice(0).forEach((router) => router.dispose())
})

describe('Project route visuals', () => {
  test('separates eager Wild Bunch concept art from lower-hierarchy playable-build proof', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/wild-bunch'],
    })
    routers.push(router)

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const title = await screen.findByRole('heading', { level: 1, name: 'Wild Bunch' }, { timeout: 5_000 })
    const article = title.closest('article')
    const header = article?.querySelector('header')

    expect(article).toHaveAttribute('data-visual-language', 'project')
    expect(article).toHaveAttribute('data-type-register', 'site-sans')
    expect(header).not.toBeNull()
    expect(header).toHaveAttribute('data-visual-contract', 'wild-bunch-case-study-hero')
    const visual = await within(header as HTMLElement).findByLabelText('Wild Bunch early-alpha town-arrival concept art', {}, { timeout: 5_000 })
    const image = within(visual).getByRole('img')

    expect(visual).toBeVisible()
    expect(visual).toHaveAttribute('data-visual-contract', 'wild-bunch-concept-art')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(await screen.findByRole('figure', { name: 'Dustwell town-hub development-build evidence' })).toBeVisible()
    expect(article?.querySelectorAll('[data-visual-contract="wild-bunch-development-build-preview"]')).toHaveLength(1)
  })

  test('renders the Learning Lab specialist route with its semantic loop', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/agentic-learning-lab'],
    })
    routers.push(router)

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const title = await screen.findByRole('heading', { level: 1, name: 'Agentic Learning Lab' })
    const article = title.closest('article')
    expect(article).toHaveAttribute('data-visual-language', 'project')
    expect(article?.querySelector('header')).toHaveAttribute('data-visual-contract', 'learning-lab-case-study-hero')
    await waitFor(() => expect(article?.querySelectorAll('[data-visual-contract="learning-lab-loop"]')).toHaveLength(1))
    expect(await screen.findByRole('heading', { level: 2, name: 'Experience made transferable' }, { timeout: 5_000 })).toBeVisible()
    expect(screen.queryByRole('img', { name: /venue floor plan/i })).not.toBeInTheDocument()
  })
})
