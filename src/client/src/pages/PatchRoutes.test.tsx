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
  return router
}

describe('Adventures of Patch routes', () => {
  test('groups one-page fairytales and larger adventures without fake detail links', async () => {
    renderRoute('/patch')

    expect(await screen.findByRole('heading', { level: 1, name: 'Adventures of Patch' })).toBeVisible()
    const fairytales = await screen.findByRole('region', { name: 'One-page fairytales' })
    expect(within(fairytales).getAllByRole('link', { name: /Goldilocks/i })[0]).toHaveAttribute('href', '/portfolio/patch/goldilocks')
    expect(within(fairytales).getAllByRole('link', { name: /Sorcerer.s Apprentice/i })[0]).toHaveAttribute('href', '/portfolio/patch/sorcerers-apprentice')

    const adventures = screen.getByRole('region', { name: 'Larger adventures' })
    expect(within(adventures).getByRole('link', { name: /Identity Emporium/i })).toHaveAttribute('href', '/portfolio/patch/identity-emporium')
    const tournament = within(adventures).getByRole('article', { name: 'Tournament of Reasonable Defaults' })
    const heist = within(adventures).getByRole('article', { name: 'Lawful Heist' })
    expect(within(tournament).getByRole('link', { name: /Tournament of Reasonable Defaults/i })).toHaveAttribute('href', '/portfolio/patch/tournament-of-reasonable-defaults')
    expect(within(heist).queryByRole('link')).not.toBeInTheDocument()
    expect(tournament).toHaveTextContent(/visual development/i)
    expect(heist).toHaveTextContent(/advanced visual pre-production/i)
  })

  test('publishes the Tournament progression on its own route', async () => {
    renderRoute('/patch/tournament-of-reasonable-defaults')

    expect(await screen.findByRole('heading', { level: 1, name: 'Tournament of Reasonable Defaults' })).toBeVisible()
    expect(await screen.findByRole('heading', { level: 2, name: 'The Seven-Day Sprint' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'The Long Course' })).toBeVisible()
  })

  test('publishes the reviewed Identity Emporium argument on its own route', async () => {
    renderRoute('/patch/identity-emporium')

    expect(await screen.findByRole('heading', { level: 1, name: 'Identity Emporium' })).toBeVisible()
    expect(await screen.findByText('Visual development')).toBeVisible()
    expect(screen.getByText(/Preparation should guide judgement without becoming a script/i)).toBeVisible()
    const evidence = await screen.findByRole('figure', { name: /Identity Emporium compares three approaches to preparation/i })
    expect(evidence).toHaveTextContent(/Preparation mistaken for a script/i)
    expect(evidence).toHaveTextContent(/Straight to work, underprepared/i)
    expect(evidence).toHaveTextContent(/Preparation shaped by the task/i)
    expect(within(evidence).getAllByRole('img')).toHaveLength(7)
    expect(screen.getByRole('link', { name: /engineering case study/i })).toHaveAttribute('href', '/portfolio/projects/adventures-of-patch')
  })

  test.each([
    ['/fairytales', '/patch'],
    ['/fairytales/goldilocks', '/patch/goldilocks'],
    ['/fairytales/sorcerers-apprentice', '/patch/sorcerers-apprentice'],
  ])('redirects %s to its Patch canonical route', async (legacyPath, canonicalPath) => {
    const router = renderRoute(legacyPath)

    await screen.findByRole('heading', { level: 1 })
    expect(router.state.location.pathname).toBe(`/portfolio${canonicalPath}`)
  })
})
