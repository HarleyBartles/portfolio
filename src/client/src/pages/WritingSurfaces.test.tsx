import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import { appRoutes } from '../app/router'
import { PortfolioThemeProvider } from '../components'
import { getHomepageEdition } from '../features/home/homepageEdition'

const routers: ReturnType<typeof createMemoryRouter>[] = []

afterEach(() => {
  routers.splice(0).forEach((router) => router.dispose())
})

async function waitForRouterInitialization(router: ReturnType<typeof createMemoryRouter>): Promise<void> {
  if (router.state.initialized) return

  await new Promise<void>((resolve) => {
    const unsubscribe = router.subscribe((state) => {
      if (!state.initialized) return
      unsubscribe()
      resolve()
    })
  })
}

async function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, {
    basename: '/portfolio',
    initialEntries: [`/portfolio${path}`],
  })
  routers.push(router)

  await waitForRouterInitialization(router)

  render(
    <QueryClientProvider client={createPortfolioQueryClient()}>
      <PortfolioThemeProvider>
        <RouterProvider router={router} />
      </PortfolioThemeProvider>
    </QueryClientProvider>,
  )
}

describe('Writing discovery surfaces', () => {
  test('presents every writing entry as a navigable article card', async () => {
    await renderRoute('/writing')

    const list = await screen.findByRole('region', { name: 'Writing, newest first' }, { timeout: 5_000 })
    const articles = within(list).getAllByRole('article')

    expect(articles.length).toBeGreaterThan(0)
    for (const article of articles) {
      const title = within(article).getByRole('heading', { level: 2 })
      expect(title).toBeVisible()
      expect(within(article).getByRole('link', { name: title.textContent ?? '' }).getAttribute('href')).toMatch(/^\/portfolio\/writing\//)
    }
  })

  test('marks an authored article as longform and keeps reading time in metadata', async () => {
    await renderRoute('/writing/why-adrs')

    const title = await screen.findByRole('heading', { level: 1, name: 'Why ADRs?' })
    const article = title.closest('article')

    expect(article).toHaveAttribute('data-visual-language', 'authored-longform')
    expect(article).toHaveAttribute('data-type-register', 'article-serif')
    expect(screen.getByText(/min read/).closest('[data-metadata-row]')).toBeInTheDocument()
  })

  test('links the selected homepage writing story to its authored route', async () => {
    const edition = getHomepageEdition()
    await renderRoute('/')

    const heading = await screen.findByRole('heading', { level: 2, name: edition.writing.title }, { timeout: 15_000 })
    const section = heading.closest('section')

    expect(section).not.toBeNull()
    expect(within(section as HTMLElement).getByRole('link', { name: `${edition.writing.inwardLabel} →` })).toHaveAttribute('href', `/portfolio${edition.writing.to}`)
  }, 30_000)
})
