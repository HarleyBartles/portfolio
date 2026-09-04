import type { ReactElement } from 'react'
import { act, render, screen, within } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
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
  test('composes PORT-10 through the complete shared writing article shell', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const title = await screen.findByRole('heading', {
      level: 1,
      name: 'How The Invisibles’ logo designer influenced The Usual Specialists',
    }, { timeout: 5_000 })
    const article = title.closest('article') as HTMLElement
    expect(article).not.toHaveAttribute('data-publication-state')
    const precis = within(article).getByText('Chassis was already winning when I noticed Rian Hughes had designed it. His name sent me back to 1992, then into the word itself, where The Usual Specialists suddenly had somewhere to work.')
    const metadata = article.querySelector('[data-metadata-row]') as HTMLElement
    const firstParagraph = article.querySelector('.content-page-body p') as HTMLElement
    expect(within(article).queryByText('Chassis was already winning.', { exact: true })).not.toBeInTheDocument()
    expect(firstParagraph).toHaveTextContent('I was looking for a face for The Usual Specialists.')
    expect(precis).toHaveClass('content-summary')
    expect(title.compareDocumentPosition(metadata) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(metadata.compareDocumentPosition(precis) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(precis.compareDocumentPosition(firstParagraph) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index')
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://harleybartles.com/writing/how-the-invisibles-logo-designer-influenced-the-usual-specialists',
    )
    expect(within(article).getByText('4 min read')).toBeVisible()
    expect(within(article).getByText('3 September 2026')).toBeVisible()
    const related = within(article).getByRole('navigation', { name: 'Continue reading' })
    expect(within(related).getByRole('link', { name: /The Lawful Heist Crew/ })).toHaveAttribute(
      'href',
      '/portfolio/patch/lawful-heist',
    )
    expect(within(related).getByRole('link', { name: /Adventures of Patch/ })).toHaveAttribute(
      'href',
      '/portfolio/projects/adventures-of-patch',
    )
    expect(within(related).getByText('Patch story', { selector: '[data-eyebrow]' })).toBeVisible()
    expect(within(related).getByText('Project story', { selector: '[data-eyebrow]' })).toBeVisible()
    expect(within(article).getByRole('heading', { level: 2, name: 'Keep the receipt' })).toBeVisible()
    expect(within(article).getByRole('button', { name: 'Copy article link' })).toBeVisible()
    expect(within(article).getByRole('link', { name: /harleybartles.com\/writing\/how-the-invisibles/ })).toBeVisible()
    expect(article.querySelector('.content-navigation')).toBeNull()
    expect(container.querySelectorAll('[data-metadata-row]')).toHaveLength(1)
  })

  test('does not invent continuation links for a writing article without authored choices', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/the-right-test-isnt-your-favourite-test'],
    })

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    await screen.findByRole('heading', {
      level: 1,
      name: "The right test isn't your favourite test",
    }, { timeout: 5_000 })
    expect(screen.queryByRole('navigation', { name: 'Continue reading' })).not.toBeInTheDocument()
  })

  test('announces a stable loading state until the specialist body is ready', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/projects/wild-bunch'],
    })

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
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
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
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
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    await screen.findByRole('heading', { level: 1, name: 'Agentic Learning Lab' }, { timeout: 5_000 })
    const header = container.querySelector('[data-visual-contract="learning-lab-case-study-hero"]') as HTMLElement
    expect(within(header).getByText('Direct')).toBeVisible()
    expect(within(header).getByText('Redirect')).toBeVisible()
    const image = within(header).getByRole('img', { name: /hands inspect measured components and test evidence/i })
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(await screen.findByText('Learning Lab specialist body')).toBeVisible()
  })

  test('gives Vibe its authored header figure and continuation navigation without chronological links', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/agentic-engineering-vs-vibe-coding'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const header = await screen.findByRole('region', { name: 'Vibe article introduction' }, { timeout: 5_000 })
    expect(header).toHaveAttribute('data-visual-contract', 'vibe-coding-door-road')
    expect(header).toHaveClass('content-page-header--visual')
    await within(header).findByText('The door opens', undefined, { timeout: 5_000 })
    expect(header.querySelector('figure')).toHaveAccessibleDescription('Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.')

    const continuations = await screen.findByRole('navigation', { name: 'Continue reading' }, { timeout: 5_000 })
    const links = within(continuations).getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/portfolio/writing/graph-iterative-review')
    expect(links[0]).toHaveTextContent('Follow the review machinery')
    expect(links[0]).toHaveTextContent("If you write a loop, don't be surprised when your agent starts looping")
    expect(links[1]).toHaveAttribute('href', '/portfolio/writing/provisioning-is-not-accumulation')
    expect(links[1]).toHaveTextContent('Follow the environment boundary')
    expect(links[1]).toHaveTextContent('Provisioning is not accumulation')
    expect(container.querySelector('.content-navigation')).toBeNull()
  })

  test('gives Why ADRs its decision-memory figure and authored reading route', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/why-adrs'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const header = await screen.findByRole('region', { name: 'Why ADRs? article introduction' }, { timeout: 5_000 })
    expect(header).toHaveAttribute('data-visual-contract', 'decision-memory')
    await within(header).findByRole('heading', { level: 2, name: 'Decision record' }, { timeout: 5_000 })
    expect(header.querySelector('figure')).toHaveAccessibleDescription('A decision record carries context, rejected alternatives, evidence, consequences and reconsideration triggers forward to the next engineer.')

    expect(await screen.findByText('Everybody thinks CQRS and event sourcing are theatre until somebody asks for a full audit history.')).toBeVisible()
    expect(screen.getByText("You know DDD, right? It's textbook DDD.")).toBeVisible()
    expect(container.querySelectorAll('.content-prose blockquote')).toHaveLength(3)
    const continuations = await screen.findByRole('navigation', { name: 'Continue reading' }, { timeout: 5_000 })
    const links = within(continuations).getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/portfolio/projects/wild-bunch')
    expect(links[0]).toHaveTextContent('See the decision under pressure')
    expect(links[0]).toHaveTextContent('Wild Bunch')
    expect(links[1]).toHaveAttribute('href', '/portfolio/writing/i-made-agentic-engineering-harder-than-it-needed-to-be')
    expect(container.querySelector('.content-navigation')).toBeNull()
  })

  test('gives Provisioning its capability path and an authored route into the wider argument', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/provisioning-is-not-accumulation'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const header = await screen.findByRole('region', { name: 'Provisioning article introduction' }, { timeout: 5_000 })
    expect(header).toHaveAttribute('data-visual-contract', 'capability-read-path')
    const figure = await within(header).findByRole('figure', undefined, { timeout: 5_000 })
    expect(figure).toHaveAccessibleDescription('A deep capability store feeds only the relevant guidance into a narrow active path for the current agent.')
    expect(within(figure).getByRole('heading', { level: 2, name: 'Capability store' })).toBeVisible()
    expect(within(figure).getByRole('heading', { level: 2, name: 'This task’s read path' })).toBeVisible()
    expect(within(figure).getByRole('heading', { level: 2, name: 'Current agent' })).toBeVisible()

    const continuations = await screen.findByRole('navigation', { name: 'Continue reading' }, { timeout: 5_000 })
    const links = within(continuations).getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/portfolio/patch/goldilocks')
    expect(links[0]).toHaveTextContent('See the argument in one page')
    expect(links[1]).toHaveAttribute('href', '/portfolio/writing/i-made-agentic-engineering-harder-than-it-needed-to-be')
    expect(links[1]).toHaveTextContent('Separate context from durable state')
    expect(container.querySelector('.content-navigation')).toBeNull()
  })

  test('gives the review-graph article its full-width captured graph and authored continuations', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/graph-iterative-review'],
    })

    const { container } = render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const header = await screen.findByRole('region', { name: 'Review graph article introduction' }, { timeout: 5_000 })
    expect(header).toHaveAttribute('data-visual-contract', 'review-graph-authority')
    const figure = await within(header).findByRole('figure', undefined, { timeout: 5_000 })
    expect(figure).toHaveAccessibleDescription('A trustworthy review graph turns recorded state into one lawful next action or an honest blocked exit.')
    expect(within(header).getByRole('img', { name: /version-one iterative-review graph/i })).toBeVisible()

    const continuations = await screen.findByRole('navigation', { name: 'Continue reading' }, { timeout: 5_000 })
    const links = within(continuations).getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/portfolio/writing/provisioning-is-not-accumulation')
    expect(links[0]).toHaveTextContent('See the environment boundary')
    expect(links[1]).toHaveAttribute('href', '/portfolio/writing/i-made-agentic-engineering-harder-than-it-needed-to-be')
    expect(links[1]).toHaveTextContent('Keep the evidence durable')
    expect(container.querySelector('.content-navigation')).toBeNull()
  })

  test('gives the context article its organisation figure and authored continuations', async () => {
    const router = createMemoryRouter(appRoutes, {
      basename: '/portfolio',
      initialEntries: ['/portfolio/writing/i-made-agentic-engineering-harder-than-it-needed-to-be'],
    })

    render(
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <PortfolioThemeProvider>
          <RouterProvider router={router} />
        </PortfolioThemeProvider>
      </QueryClientProvider>,
    )

    const header = await screen.findByRole('region', { name: 'Agent organisation article introduction' }, { timeout: 5_000 })
    expect(header).toHaveAttribute('data-visual-contract', 'agent-organisation-overhead')
    expect(await within(header).findByRole('figure', undefined, { timeout: 5_000 })).toBeVisible()

    const continuations = await screen.findByRole('navigation', { name: 'Continue reading' }, { timeout: 5_000 })
    expect(within(continuations).getByRole('link', { name: /provision only what the work needs/i })).toHaveAttribute(
      'href',
      '/portfolio/writing/provisioning-is-not-accumulation',
    )
    expect(within(continuations).getByRole('link', { name: /engineer the route, not the theatre/i })).toHaveAttribute(
      'href',
      '/portfolio/writing/graph-iterative-review',
    )
    expect(screen.queryByRole('navigation', { name: 'Article navigation' })).not.toBeInTheDocument()
  }, 10_000)
})
