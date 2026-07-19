import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { HttpResponse, delay, http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { appRoutes } from '../app/router'
import { createPortfolioQueryClient } from '../app/queryClient'
import { server } from '../test/server'
import type { ContentDocument, ContentSummary } from '../types/content'

const navigationSummaries = [
  {
    slug: 'experience',
    kind: 'experience',
    title: 'Experience',
    status: 'current',
    summary: 'Professional full-stack work framed around scope and responsibility.',
    tags: ['capability', 'experience'],
    relatedSlugs: ['ai-engineering', 'engineering-practice'],
  },
  {
    slug: 'engineering-practice',
    kind: 'practice',
    title: 'Engineering Practice',
    status: 'current',
    summary: 'How requirements, architecture, tests, reviews, and repository design shape the work.',
    tags: ['capability', 'practice'],
    relatedSlugs: ['agent-ready-repositories', 'wild-bunch'],
  },
  {
    slug: 'ai-engineering',
    kind: 'ai-engineering',
    title: 'AI Engineering',
    status: 'current',
    summary: 'Practical AI-first engineering with deliberate constraints and review.',
    tags: ['capability', 'ai-engineering'],
    relatedSlugs: ['model-selection-is-engineering', 'experience'],
  },
  {
    slug: 'learning-and-development',
    kind: 'learning',
    title: 'Learning and Development',
    status: 'current study',
    summary: 'Structured development toward deeper AI engineering capability.',
    tags: ['learning', 'ai-engineering'],
    relatedSlugs: ['ai-engineering'],
  },
  {
    slug: 'agent-ready-repositories',
    kind: 'writing',
    title: 'Agent-Ready Repositories',
    status: 'published',
    summary: 'A note on progressive discovery and repository surfaces that help agents work safely.',
    tags: ['writing', 'agents', 'repositories'],
    relatedSlugs: ['engineering-practice'],
  },
  {
    slug: 'wild-bunch',
    kind: 'project',
    title: 'Wild Bunch',
    status: 'pre-alpha',
    summary: 'A work-in-progress project demonstrating deliberate complex architecture.',
    tags: ['project', 'architecture'],
    relatedSlugs: ['engineering-practice'],
  },
] satisfies ContentSummary[]

const documentsBySlug: Record<string, ContentDocument> = {
  experience: {
    summary: navigationSummaries[0],
    markdown: 'The work includes senior-level responsibility and public-safe lessons.',
  },
  'engineering-practice': {
    summary: navigationSummaries[1],
    markdown: 'Repository design is part of the practice.',
  },
  'ai-engineering': {
    summary: navigationSummaries[2],
    markdown: 'AI-first work is most valuable when it is bounded by clear contracts.',
  },
  'learning-and-development': {
    summary: navigationSummaries[3],
    markdown: 'The learning narrative stays grounded in current practice.',
  },
} satisfies Record<string, ContentDocument>

function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [path] })

  render(
    <QueryClientProvider client={createPortfolioQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}

function useSuccessfulContentHandlers() {
  server.use(
    http.get('/api/content/navigation', () => HttpResponse.json(navigationSummaries)),
    http.get('/api/content/:slug', ({ params }) => {
      const slug = String(params.slug)
      const document = documentsBySlug[slug]

      if (!document) {
        return HttpResponse.text('Missing content', { status: 404 })
      }

      return HttpResponse.json(document)
    }),
  )
}

describe('ContentPage routes', () => {
  test('maps capability routes to their exact content slugs', async () => {
    useSuccessfulContentHandlers()

    renderRoute('/engineering-practice')

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Engineering Practice',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/repository design is part of the practice/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Agent-Ready Repositories' })).toHaveAttribute(
      'href',
      '/writing/agent-ready-repositories',
    )
    expect(screen.getByRole('link', { name: 'Wild Bunch' })).toHaveAttribute(
      'href',
      '/projects/wild-bunch',
    )
  })

  test.each([
    ['/experience', 'Experience', /senior-level responsibility/i],
    ['/ai-engineering', 'AI Engineering', /bounded by clear contracts/i],
    ['/learning-and-development', 'Learning and Development', /grounded in current practice/i],
  ])('renders %s through the single content boundary', async (path, title, bodyText) => {
    useSuccessfulContentHandlers()

    renderRoute(path)

    expect(await screen.findByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(screen.getByText(bodyText)).toBeInTheDocument()
  })

  test('shows loading and API failure states without leaking server paths', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(navigationSummaries)),
      http.get('/api/content/:slug', async () => {
        await delay(25)

        return HttpResponse.json(documentsBySlug.experience)
      }),
    )

    renderRoute('/experience')

    expect(screen.getByRole('status')).toHaveTextContent(/loading portfolio content/i)
    expect(await screen.findByRole('heading', { name: 'Experience' })).toBeInTheDocument()

    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(navigationSummaries)),
      http.get('/api/content/:slug', () =>
        HttpResponse.text('Z:\\portfolio\\src\\content\\experience.md failed', {
          status: 500,
        }),
      ),
    )

    renderRoute('/experience')

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/could not load this portfolio story/i)
    expect(alert).not.toHaveTextContent('Z:\\portfolio')
    expect(alert).not.toHaveTextContent('experience.md')
  })

  test('uses a not-found state when the content API reports a missing slug', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(navigationSummaries)),
      http.get('/api/content/:slug', () => HttpResponse.text('Missing content', { status: 404 })),
    )

    renderRoute('/experience')

    expect(await screen.findByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.getByText(/portfolio story is not available/i)).toBeInTheDocument()
  })
})
