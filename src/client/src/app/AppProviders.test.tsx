import { useQuery } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { HttpResponse, delay, http } from 'msw'
import type { ReactNode } from 'react'
import { createMemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { server } from '../test/server'
import type { ContentDocument, ContentSummary } from '../types/content'
import { AppProviders } from './AppProviders'
import { contentQueries, createPortfolioQueryClient } from './queryClient'

const portfolioSummary = {
  slug: 'portfolio',
  kind: 'project',
  title: 'Portfolio Website',
  status: 'planned',
  summary: 'The personal portfolio implementation.',
  tags: ['React'],
  relatedSlugs: [],
} satisfies ContentSummary

const portfolioDocument = {
  summary: portfolioSummary,
  markdown: '# Portfolio\n\nFoundation notes.',
} satisfies ContentDocument

function NavigationProbe() {
  const navigationQuery = useQuery(contentQueries.navigation())

  if (navigationQuery.isLoading) {
    return <p>Loading navigation</p>
  }

  if (navigationQuery.isError) {
    return <p role="alert">{navigationQuery.error.message}</p>
  }

  return <p>{navigationQuery.data?.[0]?.title ?? 'No navigation'}</p>
}

function DocumentProbe() {
  const documentQuery = useQuery(contentQueries.document('portfolio'))

  if (documentQuery.isLoading) {
    return <p>Loading document</p>
  }

  if (documentQuery.isError) {
    return <p role="alert">{documentQuery.error.message}</p>
  }

  return <p>{documentQuery.data?.markdown ?? 'No document'}</p>
}

function renderWithProviders(element: ReactNode) {
  const router = createMemoryRouter([{ path: '/', element }])

  render(
    <AppProviders
      queryClient={createPortfolioQueryClient()}
      router={router}
    />,
  )
}

describe('AppProviders', () => {
  test('provides React Query through the router seam for loading and success states', async () => {
    server.use(
      http.get('/api/content/navigation', async () => {
        await delay(25)

        return HttpResponse.json([portfolioSummary])
      }),
    )

    renderWithProviders(<NavigationProbe />)

    expect(screen.getByText('Loading navigation')).toBeInTheDocument()
    expect(await screen.findByText('Portfolio Website')).toBeInTheDocument()
  })

  test('provides React Query options for content documents', async () => {
    server.use(
      http.get('/api/content/:slug', ({ params }) => {
        expect(params.slug).toBe('portfolio')

        return HttpResponse.json(portfolioDocument)
      }),
    )

    renderWithProviders(<DocumentProbe />)

    expect(screen.getByText('Loading document')).toBeInTheDocument()
    expect(await screen.findByText(/Foundation notes\./)).toBeInTheDocument()
  })

  test('surfaces API errors through React Query without leaking server paths', async () => {
    server.use(
      http.get('/api/content/:slug', () =>
        HttpResponse.text('D:\\wwwroot\\content\\content-manifest.json is missing', {
          status: 503,
        }),
      ),
    )

    renderWithProviders(<DocumentProbe />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Request to /api/content/portfolio failed with status 503.')
    expect(alert).not.toHaveTextContent('D:\\wwwroot')
    expect(alert).not.toHaveTextContent('content-manifest.json')
  })
})
