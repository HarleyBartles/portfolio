import { render, screen } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { expect, test } from 'vitest'
import { createMemoryRouter } from 'react-router-dom'
import { AppProviders } from './app/AppProviders'
import { createPortfolioQueryClient } from './app/queryClient'
import { appRoutes } from './app/router'
import { server } from './test/server'
import type { ContentDocument, ContentSummary } from './types/content'

const navigationSummaries = [
  {
    slug: 'wild-bunch',
    kind: 'project',
    title: 'Wild Bunch',
    status: 'pre-alpha',
    summary: 'A work-in-progress project demonstrating deliberate complex architecture.',
    tags: ['project'],
    relatedSlugs: ['engineering-practice'],
  },
  {
    slug: 'experience',
    kind: 'experience',
    title: 'Experience',
    status: 'current',
    summary: 'Professional full-stack work framed around scope and responsibility.',
    tags: ['capability'],
    relatedSlugs: [],
  },
  {
    slug: 'engineering-practice',
    kind: 'practice',
    title: 'Engineering Practice',
    status: 'current',
    summary: 'How requirements, architecture, tests, reviews, and repository design shape the work.',
    tags: ['capability'],
    relatedSlugs: [],
  },
  {
    slug: 'ai-engineering',
    kind: 'ai-engineering',
    title: 'AI Engineering',
    status: 'current',
    summary: 'Practical AI-first engineering with deliberate constraints and review.',
    tags: ['capability'],
    relatedSlugs: [],
  },
  {
    slug: 'learning-and-development',
    kind: 'learning',
    title: 'Learning and Development',
    status: 'current study',
    summary: 'Structured development toward deeper AI engineering capability.',
    tags: ['learning'],
    relatedSlugs: [],
  },
  {
    slug: 'agent-ready-repositories',
    kind: 'writing',
    title: 'Agent-Ready Repositories',
    status: 'published',
    summary: 'A note on progressive discovery and repository surfaces.',
    tags: ['writing'],
    relatedSlugs: [],
  },
] satisfies ContentSummary[]

const documentsBySlug: Record<string, ContentDocument> = Object.fromEntries(
  navigationSummaries
    .filter((summary) => summary.kind !== 'writing' && summary.kind !== 'project')
    .map((summary) => [
      summary.slug,
      {
        summary,
        markdown: `${summary.title} narrative content.`,
      },
    ]),
)

function useContentHandlers() {
  server.use(
    http.get('/api/content/navigation', () => HttpResponse.json(navigationSummaries)),
    http.get('/api/content/:slug', ({ params }) => {
      const document = documentsBySlug[String(params.slug)]

      if (document === undefined) {
        return HttpResponse.text('Missing content', { status: 404 })
      }

      return HttpResponse.json(document)
    }),
  )
}

test('app renders the active route through the router shell', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <p>Route content</p>,
    },
  ])

  render(
    <AppProviders
      queryClient={createPortfolioQueryClient()}
      router={router}
    />,
  )

  expect(screen.getByText('Route content')).toBeInTheDocument()
})

test.each([
  ['/projects', 'Project Stories', /selected public work/i],
  ['/experience', 'Experience', /experience narrative content/i],
  ['/engineering-practice', 'Engineering Practice', /engineering practice narrative content/i],
  ['/ai-engineering', 'AI Engineering', /ai engineering narrative content/i],
  ['/learning-and-development', 'Learning and Development', /learning and development narrative content/i],
  ['/writing', 'Writing and Notes', /short public notes/i],
])('app renders the narrative route for %s', async (initialEntry, heading, bodyText) => {
  useContentHandlers()

  const router = createMemoryRouter(appRoutes, {
    initialEntries: [initialEntry],
  })

  render(
    <AppProviders
      queryClient={createPortfolioQueryClient()}
      router={router}
    />,
  )

  expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  expect(screen.getByText(bodyText)).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /page not found/i })).not.toBeInTheDocument()
})
