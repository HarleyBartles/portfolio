import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import type { ContentSummary } from '../types'
import { ContentNavigation } from './ContentNavigation'
import { PortfolioThemeProvider } from './PortfolioThemeProvider'

function article(slug: string, title: string): ContentSummary {
  return {
    slug,
    title,
    kind: 'writing',
    status: 'published',
    featured: false,
    tags: ['writing'],
    relatedSlugs: [],
    summary: `${title} summary`,
  }
}

const articles = [article('first', 'First note'), article('second', 'Second note'), article('third', 'Third note')]

describe('ContentNavigation', () => {
  test('links to the previous and next entries around the current story', () => {
    render(<PortfolioThemeProvider><MemoryRouter><ContentNavigation items={articles} currentSlug="second" /></MemoryRouter></PortfolioThemeProvider>)

    expect(screen.getByRole('link', { name: /previous.*first note/i })).toHaveAttribute('href', '/writing/first')
    expect(screen.getByRole('link', { name: /next.*third note/i })).toHaveAttribute('href', '/writing/third')
  })

  test('does not wrap at archive boundaries', () => {
    render(<PortfolioThemeProvider><MemoryRouter><ContentNavigation items={articles} currentSlug="first" /></MemoryRouter></PortfolioThemeProvider>)

    expect(screen.queryByRole('link', { name: /previous/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /next.*second note/i })).toBeVisible()
  })
})
