import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { WritingArticleBodyLoading } from './WritingArticleBodyLoading'

describe('WritingArticleBodyLoading', () => {
  test('provides one neutral route-local status without card furniture', () => {
    const { container } = render(
      <PortfolioThemeProvider>
        <WritingArticleBodyLoading />
      </PortfolioThemeProvider>,
    )

    expect(screen.getByRole('status', { name: 'Loading article' })).toBeVisible()
    expect(container.querySelector('section')).not.toHaveAttribute('aria-label')
    expect(container.querySelector('[data-loading="specialist-presentation"]')).toBeNull()
    expect(container.querySelector('article')).toBeNull()
  })
})
