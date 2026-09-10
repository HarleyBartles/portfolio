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
    expect(within(story).getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toHaveAttribute('id', 'content-page-title')
    expect(within(story).getByText('Patch has a route-shaped problem. Six people make it legitimate, testable, lawful, decidable, recoverable and reviewable - mostly by carrying on with their actual jobs while he talks.')).toBeVisible()
    expect(story.querySelector('[data-temporary-wireframe-rope="true"]')).toBeInTheDocument()
    expect(story.querySelector('[data-specialist-chapter="index"]')).toBeInTheDocument()
    expect(story.querySelector('[data-specialist-chapter="silk"]')).not.toBeInTheDocument()
    expect(within(story).queryByText('Advanced visual pre-production')).not.toBeInTheDocument()
  })
})
