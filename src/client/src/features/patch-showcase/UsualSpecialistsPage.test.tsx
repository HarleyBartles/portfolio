import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

describe('Usual Specialists route-owned story', () => {
  test('composes the accepted opening as the route-owned Index draft', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsPage />
      </MemoryRouter>,
    )

    const story = screen.getByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index-draft')
    expect(story).toHaveAttribute('aria-label', 'The Usual Specialists')
    expect(story).not.toHaveAttribute('aria-labelledby')
    expect(within(story).getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()
    expect(story.querySelector('[data-specialist-chapter="index"]')).toBeInTheDocument()
    expect(story.querySelector('[data-specialist-chapter="silk"]')).not.toBeInTheDocument()
    expect(within(story).queryByText('Advanced visual pre-production')).not.toBeInTheDocument()
  })

  test('forwards an exceptional style override to the page root only', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsPage style={{ opacity: 0.5 }} />
      </MemoryRouter>,
    )

    const story = screen.getByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveStyle({ opacity: '0.5' })
    expect(within(story).getByRole('region', { name: 'Index' })).not.toHaveStyle({ opacity: '0.5' })
  })

  test('does not expose caller className as a styling seam', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        {/* @ts-expect-error className is intentionally not part of the vertical-slice API. */}
        <UsualSpecialistsPage className="external-control" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('article', { name: 'The Usual Specialists' })).not.toHaveClass('external-control')
  })
})
