import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, delay, http } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import { server } from '../test/server'
import type { ContentSummary } from '../types/content'
import { HomePage } from './HomePage'

const orientationSummaries = [
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
    slug: 'experience',
    kind: 'experience',
    title: 'Experience',
    status: 'current',
    summary: 'Professional full-stack work framed around scope, responsibility, and progression.',
    tags: ['capability', 'experience'],
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
    slug: 'ai-engineering',
    kind: 'ai-engineering',
    title: 'AI Engineering',
    status: 'current',
    summary: 'Practical AI-first engineering with deliberate constraints, review, and tool choice.',
    tags: ['capability', 'ai-engineering'],
    relatedSlugs: ['model-selection-is-engineering'],
  },
  {
    slug: 'agent-ready-repositories',
    kind: 'writing',
    title: 'Agent-Ready Repositories',
    status: 'published',
    summary: 'A note on progressive discovery, thin routing, and repository surfaces that help agents work safely.',
    tags: ['writing', 'agents', 'repositories'],
    relatedSlugs: ['engineering-practice'],
  },
] satisfies ContentSummary[]

function renderHomePage() {
  render(
    <MemoryRouter>
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <HomePage />
      </QueryClientProvider>
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  test('renders the exact core identity before API content and then links orientation areas', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(orientationSummaries)),
    )

    renderHomePage()

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Harley Bartles: Full Stack Software Engineer.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'AI-forward. Stack-agnostic. Experienced across languages, frameworks, and full-stack systems.',
      ),
    ).toBeInTheDocument()

    const orientation = await screen.findByRole('navigation', {
      name: /portfolio orientation/i,
    })

    for (const label of [
      'Projects',
      'Experience',
      'Engineering Practice',
      'AI Engineering',
      'Writing and Notes',
    ]) {
      expect(within(orientation).getByRole('link', { name: label })).toBeInTheDocument()
    }

    expect(within(orientation).getByText(/straightforward ASP\.NET Core and React portfolio/i)).toBeInTheDocument()
    expect(within(orientation).queryByText(/learning-loop/i)).not.toBeInTheDocument()
    expect(within(orientation).queryByText(/evidence checklist/i)).not.toBeInTheDocument()
  })

  test('keeps the core identity available without a Wild Bunch response', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(orientationSummaries)),
    )

    renderHomePage()

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Harley Bartles: Full Stack Software Engineer.',
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Wild Bunch')).not.toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/content/portfolio',
    )
  })

  test('shows understandable loading and API failure states', async () => {
    server.use(
      http.get('/api/content/navigation', async () => {
        await delay(25)

        return HttpResponse.json(orientationSummaries)
      }),
    )

    renderHomePage()

    expect(screen.getByRole('status')).toHaveTextContent(/loading portfolio navigation/i)
    expect(await screen.findByRole('link', { name: 'Projects' })).toBeInTheDocument()

    server.use(
      http.get('/api/content/navigation', () =>
        HttpResponse.text('Z:\\portfolio\\src\\content\\content-manifest.json failed', {
          status: 500,
        }),
      ),
    )

    renderHomePage()

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/could not load the portfolio content/i)
    expect(alert).not.toHaveTextContent('Z:\\portfolio')
    expect(alert).not.toHaveTextContent('content-manifest.json')
  })

  test('keyboard focus reaches the orientation links after the primary navigation', async () => {
    const user = userEvent.setup()
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(orientationSummaries)),
    )

    renderHomePage()

    const orientation = await screen.findByRole('navigation', {
      name: /portfolio orientation/i,
    })
    const projectsLink = within(orientation).getByRole('link', { name: 'Projects' })

    for (let index = 0; index < 6; index += 1) {
      await user.tab()
    }

    expect(projectsLink).toHaveFocus()
  })
})
