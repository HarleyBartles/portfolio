import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import { appRoutes } from '../app/router'

const routers: ReturnType<typeof createMemoryRouter>[] = []

afterEach(() => {
  routers.splice(0).forEach((router) => router.dispose())
})

function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, {
    basename: '/portfolio',
    initialEntries: [`/portfolio${path}`],
  })
  routers.push(router)

  render(
    <QueryClientProvider client={createPortfolioQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}

describe('Writing discovery surfaces', () => {
  test('presents peer articles newest first without a permanent featured essay', async () => {
    renderRoute('/writing')

    const list = await screen.findByRole('region', { name: 'Writing, newest first' }, { timeout: 5_000 })
    const articles = within(list).getAllByRole('article')

    expect(within(articles[0]).getByRole('heading', { name: '"I just write the code" is not a full sentence' })).toBeVisible()
    expect(within(articles[1]).getByRole('heading', { name: "The right test isn't your favourite test" })).toBeVisible()
    expect(list).not.toHaveTextContent('Archive')
    expect(list.querySelector('[data-visual-contract="writing-editorial-lead"]')).toBeNull()
  })

  test('marks an authored article as longform and keeps reading time in metadata', async () => {
    renderRoute('/writing/why-adrs')

    const title = await screen.findByRole('heading', { level: 1, name: 'Why ADRs?' })
    const article = title.closest('article')

    expect(article).toHaveAttribute('data-visual-language', 'authored-longform')
    expect(article).toHaveAttribute('data-type-register', 'article-serif')
    expect(screen.getByText(/min read/).closest('.editorial-meta')).toBeInTheDocument()
  })

  test('uses the selected Writing edition on the homepage without restoring a featured deck', async () => {
    renderRoute('/')

    const heading = await screen.findByRole('heading', { level: 2, name: 'I made agentic engineering harder than it needed to be' })
    const section = heading.closest('section')

    expect(section).not.toBeNull()
    expect(within(section as HTMLElement).getByRole('link', { name: 'Read the article →' })).toHaveAttribute('href', '/portfolio/writing/i-made-agentic-engineering-harder-than-it-needed-to-be')
    expect(within(section as HTMLElement).getByRole('link', { name: 'Meet The Usual Specialists ↓' })).toHaveAttribute('href', '#patch')
    expect(within(section as HTMLElement).queryByText(/Featured essay/i)).not.toBeInTheDocument()
  })
})
