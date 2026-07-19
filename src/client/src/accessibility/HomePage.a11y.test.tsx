import { QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { HttpResponse, delay, http } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { createPortfolioQueryClient } from '../app/queryClient'
import '../styles/global.scss'
import { server } from '../test/server'
import type { ContentSummary } from '../types/content'
import { HomePage } from '../pages/HomePage'

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
  return render(
    <MemoryRouter>
      <QueryClientProvider client={createPortfolioQueryClient()}>
        <HomePage />
      </QueryClientProvider>
    </MemoryRouter>,
  )
}

describe('HomePage accessibility baseline', () => {
  test('has accessible landmarks, ordered headings, and no serious axe violations', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(orientationSummaries)),
    )

    const { container } = renderHomePage()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    const orientation = await screen.findByRole('navigation', {
      name: /portfolio orientation/i,
    })
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /harley bartles: full stack software engineer/i,
      }),
    ).toBeInTheDocument()

    for (const heading of within(orientation).getAllByRole('heading')) {
      expect(heading.tagName).toBe('H2')
    }

    const results = await axe(container)
    expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([])
  })

  test('keeps visible keyboard focus and tabs from primary navigation into orientation links', async () => {
    const user = userEvent.setup()
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(orientationSummaries)),
    )

    renderHomePage()

    const focusRule = Array.from(document.styleSheets)
      .flatMap((sheet) => Array.from(sheet.cssRules))
      .find((rule) => rule.cssText.includes(':focus-visible'))

    expect(focusRule?.cssText).toContain('outline')

    const orientation = await screen.findByRole('navigation', {
      name: /portfolio orientation/i,
    })

    for (let index = 0; index < 6; index += 1) {
      await user.tab()
    }

    expect(within(orientation).getByRole('link', { name: 'Projects' })).toHaveFocus()
  })

  test('announces loading and error states without leaking server details', async () => {
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

  test('sets homepage metadata for the public canonical route', () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json(orientationSummaries)),
    )

    renderHomePage()

    expect(document.title).toBe('Harley Bartles | Full Stack Software Engineer')
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Portfolio of Harley Bartles, a full stack software engineer focused on AI-forward, stack-agnostic delivery.',
    )
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://harleybartles.com/',
    )
  })
})
