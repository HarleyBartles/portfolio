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

const writingSummaries = [
  {
    slug: 'agent-ready-repositories',
    kind: 'writing',
    title: 'Agent-Ready Repositories',
    status: 'published',
    summary: 'A note on progressive discovery and repository surfaces that help agents work safely.',
    tags: ['writing', 'agents', 'repositories'],
    relatedSlugs: ['engineering-practice', 'portfolio'],
  },
  {
    slug: 'model-selection-is-engineering',
    kind: 'writing',
    title: 'Model Selection Is Engineering',
    status: 'published',
    summary: 'A note on choosing AI models and tools by task, risk, feedback speed, and cost.',
    tags: ['writing', 'ai-engineering', 'cost'],
    relatedSlugs: ['ai-engineering'],
  },
  {
    slug: 'engineering-practice',
    kind: 'practice',
    title: 'Engineering Practice',
    status: 'current',
    summary: 'How requirements, architecture, tests, reviews, and repository design shape the work.',
    tags: ['capability', 'practice'],
    relatedSlugs: ['agent-ready-repositories'],
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
] satisfies ContentSummary[]

const writingDocuments: Record<string, ContentDocument> = {
  'agent-ready-repositories': {
    summary: writingSummaries[0],
    markdown:
      'Agent-ready repositories use progressive discovery.\n\n## Repository surfaces\n\nRead [React Markdown](https://github.com/remarkjs/react-markdown) for renderer behavior.\n\n<div><a href="https://unsafe.example">Unsafe raw link</a></div>',
  },
  'model-selection-is-engineering': {
    summary: writingSummaries[1],
    markdown: 'Choosing an AI model or tool is an engineering decision.',
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

function useWritingHandlers() {
  server.use(
    http.get('/api/content/navigation', () => HttpResponse.json(writingSummaries)),
    http.get('/api/content/:slug', ({ params }) => {
      const slug = String(params.slug)
      const document = writingDocuments[slug]

      if (!document) {
        return HttpResponse.text('Missing content', { status: 404 })
      }

      return HttpResponse.json(document)
    }),
  )
}

describe('WritingPage routes', () => {
  test('lists writing in manifest order', async () => {
    useWritingHandlers()

    renderRoute('/writing')

    const writingIndex = await screen.findByRole('navigation', { name: /writing and notes/i })
    const links = within(writingIndex).getAllByRole('link')

    expect(links.map((link) => link.textContent)).toEqual([
      'Agent-Ready Repositories',
      'Model Selection Is Engineering',
    ])
    expect(links[0]).toHaveAttribute('href', '/writing/agent-ready-repositories')
  })

  test('renders Markdown safely and exposes related content links', async () => {
    const user = userEvent.setup()
    useWritingHandlers()

    renderRoute('/writing/agent-ready-repositories')

    expect(await screen.findByRole('heading', { level: 1, name: 'Agent-Ready Repositories' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Repository surfaces' })).toBeInTheDocument()

    const markdownLink = screen.getByRole('link', { name: 'React Markdown' })
    expect(markdownLink).toHaveAttribute('href', 'https://github.com/remarkjs/react-markdown')
    expect(markdownLink).toHaveAttribute('target', '_blank')
    expect(markdownLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
    expect(screen.queryByRole('link', { name: 'Unsafe raw link' })).not.toBeInTheDocument()

    const related = screen.getByRole('navigation', { name: /related content/i })
    expect(within(related).getByRole('link', { name: 'Engineering Practice' })).toHaveAttribute(
      'href',
      '/engineering-practice',
    )
    expect(within(related).getByRole('link', { name: 'Portfolio Website' })).toHaveAttribute(
      'href',
      '/projects/portfolio',
    )

    for (let index = 0; index < 6; index += 1) {
      await user.tab()
    }

    expect(markdownLink).toHaveFocus()
  })
})
