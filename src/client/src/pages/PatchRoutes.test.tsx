import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import { appRoutes } from '../app/router'
import { createPortfolioQueryClient } from '../app/queryClient'
import { PortfolioThemeProvider } from '../components'

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
  render(
    <QueryClientProvider client={createPortfolioQueryClient()}>
      <PortfolioThemeProvider>
        <RouterProvider router={router} />
      </PortfolioThemeProvider>
    </QueryClientProvider>,
  )
  return router
}

describe('Adventures of Patch routes', () => {
  test('introduces Patch before offering adventures and fairytales', async () => {
    renderRoute('/patch')

    expect(await screen.findByRole('heading', { level: 1, name: 'Adventures of Patch' }, { timeout: 10_000 })).toBeVisible()
    const patchIndex = screen.getByTestId('patch-index')
    const introduction = await screen.findByRole('region', { name: 'Introducing Patch' })
    expect(within(introduction).getByRole('img', { name: /Patch carries an index card and folded map/i })).toHaveAttribute('src', '/media/patch/patch-hero-500.webp')
    expect(within(introduction).queryByText(/Meet Patch first\. Pick an adventure when you.re ready\./i)).not.toBeInTheDocument()
    expect(window.getComputedStyle(patchIndex).getPropertyValue('--patch-paper').trim()).toBe('#f7f4ec')

    const adventures = await screen.findByRole('region', { name: 'Adventures' })
    const fairytales = await screen.findByRole('region', { name: 'Patch fairytales' })
    expect(introduction.compareDocumentPosition(adventures) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(adventures.compareDocumentPosition(fairytales) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()

    expect(within(fairytales).getAllByRole('link', { name: /Goldilocks/i })[0]).toHaveAttribute('href', '/portfolio/patch/goldilocks')
    expect(within(fairytales).getAllByRole('link', { name: /Sorcerer.s Apprentice/i })[0]).toHaveAttribute('href', '/portfolio/patch/sorcerers-apprentice')

    expect(within(adventures).getByRole('link', { name: 'Identity Emporium' })).toHaveAttribute('href', '/portfolio/patch/identity-emporium')
    const tournament = within(adventures).getByRole('article', { name: 'Tournament of Reasonable Defaults' })
    const heist = within(adventures).getByRole('article', { name: 'The Usual Specialists' })
    const goldilocks = within(fairytales).getByRole('article', { name: /Goldilocks/i })
    const tournamentCopy = tournament.querySelector('.patch-index__adventure-copy')
    expect(within(tournament).getByRole('link', { name: 'Tournament of Reasonable Defaults' })).toHaveAttribute('href', '/portfolio/patch/tournament-of-reasonable-defaults')
    expect(within(heist).getByRole('link', { name: 'View The Usual Specialists' })).toHaveAttribute('href', '/portfolio/patch/the-usual-specialists')
    expect(within(heist).getByRole('img', { name: /completed Usual Specialists recruitment folder/i })).toHaveAttribute('loading', 'lazy')
    expect(within(tournament).getByRole('img', { name: /consulting tournament officials/i })).toHaveAttribute('loading', 'lazy')
    expect(within(adventures).getByRole('img', { name: /choosing task-specific preparation/i })).toHaveAttribute('loading', 'lazy')
    expect(window.getComputedStyle(tournament).alignContent).toBe('start')
    expect(tournamentCopy).not.toBeNull()
    expect(window.getComputedStyle(tournamentCopy as HTMLElement).alignContent).toBe('start')
    expect(goldilocks).toHaveClass('editorial-card--patch')
    expect(within(adventures).queryByText(/visual development/i)).not.toBeInTheDocument()
    expect(within(adventures).queryByText(/advanced visual pre-production/i)).not.toBeInTheDocument()
    expect(within(tournament).queryByText(/Four event environments/i)).not.toBeInTheDocument()
    expect(within(adventures).queryByText(/The cowboy assets make the distinction visible/i)).not.toBeInTheDocument()
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

  test('does not preserve the obsolete lawful-heist redirect', async () => {
    const router = renderRoute('/patch/lawful-heist')

    expect(await screen.findByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible()
    expect(router.state.location.pathname).toBe('/portfolio/patch/lawful-heist')
  })

  test('publishes the route-owned Usual Specialists blank slate on its canonical route', async () => {
    const router = renderRoute('/patch/the-usual-specialists')

    expect(router.state.location.pathname).toBe('/portfolio/patch/the-usual-specialists')
    expect(await screen.findByRole('heading', { level: 1, name: 'The Usual Specialists' }, { timeout: 10_000 })).toBeVisible()
    expect(document.querySelector('.content-page-header')).toBeNull()
    expect(document.querySelector('.content-page-body')).toBeNull()
    const story = await screen.findByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index-draft')
    expect(story.querySelectorAll('[data-specialist]')).toHaveLength(0)
    expect(screen.queryByRole('navigation', { name: 'Related content' })).not.toBeInTheDocument()
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
