import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { appRoutes } from '../app/router'
import { createPortfolioQueryClient } from '../app/queryClient'
import { server } from '../test/server'
import type { ContentDocument, ContentSummary } from '../types/content'

const projectSummaries = [
  {
    slug: 'wild-bunch',
    kind: 'project',
    title: 'Wild Bunch',
    status: 'pre-alpha',
    summary: 'A work-in-progress project demonstrating deliberate complex architecture.',
    tags: ['project', 'architecture'],
    relatedSlugs: ['engineering-practice', 'ai-engineering'],
  },
  {
    slug: 'portfolio',
    kind: 'project',
    title: 'Portfolio Website',
    status: 'initial implementation',
    summary: 'A straightforward ASP.NET Core and React portfolio built as a public engineering artifact.',
    tags: ['project', 'portfolio', 'full-stack'],
    relatedSlugs: ['engineering-practice'],
  },
  {
    slug: 'engineering-practice',
    kind: 'practice',
    title: 'Engineering Practice',
    status: 'current',
    summary: 'How requirements, architecture, tests, reviews, and repository design shape the work.',
    tags: ['capability', 'practice'],
    relatedSlugs: ['wild-bunch'],
  },
  {
    slug: 'ai-engineering',
    kind: 'ai-engineering',
    title: 'AI Engineering',
    status: 'current',
    summary: 'Practical AI-first engineering with deliberate constraints and review.',
    tags: ['capability', 'ai-engineering'],
    relatedSlugs: ['wild-bunch'],
  },
] satisfies ContentSummary[]

const projectDocuments: Record<string, ContentDocument> = {
  'wild-bunch': {
    summary: projectSummaries[0],
    markdown:
      'Wild Bunch is an active, buggy, pre-alpha project.\n\n[Public repository](https://github.com/HarleyBartles/wild-bunch)\n\nDemo: not published yet.',
  },
  portfolio: {
    summary: projectSummaries[1],
    markdown:
      'This Portfolio application uses a small server content boundary and repository-owned Markdown.\n\nThe architecture is intentionally straightforward.',
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

function useProjectHandlers() {
  server.use(
    http.get('/api/content/navigation', () => HttpResponse.json(projectSummaries)),
    http.get('/api/content/:slug', ({ params }) => {
      const slug = String(params.slug)
      const document = projectDocuments[slug]

      if (!document) {
        return HttpResponse.text('Missing content', { status: 404 })
      }

      return HttpResponse.json(document)
    }),
  )
}

describe('ProjectPage routes', () => {
  test('lists projects in manifest order without a technology badge wall', async () => {
    useProjectHandlers()

    renderRoute('/projects')

    const projectIndex = await screen.findByRole('navigation', { name: /project stories/i })
    const links = within(projectIndex).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual(['Wild Bunch', 'Portfolio Website'])
    expect(links[0]).toHaveAttribute('href', '/projects/wild-bunch')
    expect(screen.getByText(/pre-alpha/i)).toBeInTheDocument()
    expect(screen.queryByText('React')).not.toBeInTheDocument()
    expect(screen.queryByText('ASP.NET Core')).not.toBeInTheDocument()
  })

  test('renders Wild Bunch with honest pre-alpha status, public repo link, and no unavailable demo link', async () => {
    const user = userEvent.setup()
    useProjectHandlers()

    renderRoute('/projects/wild-bunch')

    expect(await screen.findByRole('heading', { level: 1, name: 'Wild Bunch' })).toBeInTheDocument()
    expect(screen.getByText(/active, buggy, pre-alpha project/i)).toBeInTheDocument()
    expect(screen.getByText('Status').closest('p')).toHaveTextContent('pre-alpha')

    const repositoryLink = screen.getByRole('link', { name: 'Public repository' })
    expect(repositoryLink).toHaveAttribute('href', 'https://github.com/HarleyBartles/wild-bunch')
    expect(repositoryLink).toHaveAttribute('target', '_blank')
    expect(repositoryLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument()

    const related = screen.getByRole('navigation', { name: /related content/i })
    expect(within(related).getByRole('link', { name: 'Engineering Practice' })).toHaveAttribute(
      'href',
      '/engineering-practice',
    )

    for (let index = 0; index < 6; index += 1) {
      await user.tab()
    }

    expect(repositoryLink).toHaveFocus()
  })

  test('renders the Portfolio project as the simpler full-stack architecture story', async () => {
    useProjectHandlers()

    renderRoute('/projects/portfolio')

    expect(await screen.findByRole('heading', { level: 1, name: 'Portfolio Website' })).toBeInTheDocument()
    expect(screen.getByText(/small server content boundary/i)).toBeInTheDocument()
    expect(screen.getByText(/architecture is intentionally straightforward/i)).toBeInTheDocument()
    expect(screen.queryByText(/authentication/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/database/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/contact form/i)).not.toBeInTheDocument()
  })

  test('uses the not-found state when a writing slug is opened through the project route', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(projectSummaries)),
      http.get('/api/content/:slug', ({ params }) => {
        if (String(params.slug) === 'agent-ready-repositories') {
          return HttpResponse.json({
            summary: {
              slug: 'agent-ready-repositories',
              kind: 'writing',
              title: 'Agent-Ready Repositories',
              status: 'published',
              summary: 'A note on progressive discovery and repository surfaces that help agents work safely.',
              tags: ['writing', 'agents', 'repositories'],
              relatedSlugs: [],
            },
            markdown: 'This note should not render under the project route.',
          } satisfies ContentDocument)
        }

        const slug = String(params.slug)
        const document = projectDocuments[slug]

        if (!document) {
          return HttpResponse.text('Missing content', { status: 404 })
        }

        return HttpResponse.json(document)
      }),
    )

    renderRoute('/projects/agent-ready-repositories')

    expect(await screen.findByRole('heading', { name: /page not found/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Agent-Ready Repositories' })).not.toBeInTheDocument()
  })
})
