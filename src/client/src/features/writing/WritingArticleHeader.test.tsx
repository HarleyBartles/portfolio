import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { WritingArticleHeader } from './WritingArticleHeader'

describe('WritingArticleHeader', () => {
  test('owns the article hierarchy and selected layout without a generic route selector', () => {
    render(
      <PortfolioThemeProvider>
        <WritingArticleHeader
          title="A durable article"
          summary="A concise article proposition."
          metadata={['3 September 2026', '5 min read']}
          visual={<div data-testid="article-visual">Figure</div>}
          regionLabel="Article introduction"
          visualContract="article-introduction"
          layout="vibe-door-road"
        />
      </PortfolioThemeProvider>,
    )

    const header = screen.getByRole('region', { name: 'Article introduction' })
    expect(header).toHaveAttribute('data-writing-header-layout', 'vibe-door-road')
    expect(header).toHaveAttribute('data-visual-contract', 'article-introduction')
    expect(screen.getByRole('heading', { level: 1, name: 'A durable article' })).toBeVisible()
    expect(screen.getByText('A concise article proposition.')).toBeVisible()
    expect(screen.getByText('3 September 2026')).toBeVisible()
    expect(screen.getByTestId('article-visual')).toBeVisible()
  })

  test('omits the visual slot without leaving empty display furniture', () => {
    render(
      <PortfolioThemeProvider>
        <WritingArticleHeader
          title="A plain article"
          summary="A reading proposition."
          visualContract="article-introduction"
          layout="standard"
        />
      </PortfolioThemeProvider>,
    )

    expect(screen.getByRole('heading', { name: 'A plain article' })).toBeVisible()
    expect(document.querySelector('[data-writing-header-layout="standard"] [data-writing-header-visual]')).toBeNull()
  })
})
