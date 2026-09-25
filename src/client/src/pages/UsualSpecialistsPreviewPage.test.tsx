import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../components'
import { UsualSpecialistsPreviewPage } from './UsualSpecialistsPreviewPage'

describe('UsualSpecialistsPreviewPage', () => {
  test('renders V2 in the full site frame without publication metadata', () => {
    render(
      <PortfolioThemeProvider>
        <MemoryRouter>
          <UsualSpecialistsPreviewPage
            Presentation={() => (
              <article aria-label="The Usual Specialists" data-visual-contract="patch-usual-specialists-index">
                <h1>The Usual Specialists</h1>
              </article>
            )}
          />
        </MemoryRouter>
      </PortfolioThemeProvider>,
    )

    expect(screen.getByRole('article', { name: 'The Usual Specialists' })).toBeVisible()
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.head.querySelector('meta[property="og:url"]')).toBeNull()
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull()
    expect(screen.getByRole('main')).toContainElement(screen.getByRole('article', { name: 'The Usual Specialists' }))
  })
})
