import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

describe('Usual Specialists route-owned story', () => {
  test('starts from the accepted Index-draft blank slate', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists']}>
        <UsualSpecialistsPage />
      </MemoryRouter>,
    )

    const story = screen.getByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index-draft')
    expect(within(story).getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toHaveAttribute('id', 'content-page-title')
    expect(story.querySelectorAll('[data-specialist]')).toHaveLength(0)
    expect(within(story).queryByText('Advanced visual pre-production')).not.toBeInTheDocument()
  })
})
