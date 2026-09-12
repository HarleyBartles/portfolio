import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

describe('Usual Specialists route-owned story', () => {
  test('composes Silk immediately after Index without later Specialist chapters', () => {
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
    const index = story.querySelector<HTMLElement>('[data-specialist-chapter="index"]')
    const silk = story.querySelector<HTMLElement>('[data-specialist-chapter="silk"]')
    const opening = story.querySelector('header')
    const rope = story.querySelector<HTMLElement>('[data-temporary-wireframe-rope="true"]')
    const indexMilestone = story.querySelector<HTMLElement>('[data-specialists-index-milestone]')
    expect(opening).toBeInTheDocument()
    expect(rope).toBeInTheDocument()
    expect(opening).not.toContainElement(rope)
    expect(indexMilestone).toBeInTheDocument()
    expect(indexMilestone).toContainElement(opening)
    expect(indexMilestone).toContainElement(index)
    expect(indexMilestone).not.toContainElement(silk)
    expect(index).toBeInTheDocument()
    expect(silk).toBeInTheDocument()
    expect(index!.compareDocumentPosition(silk!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(story.querySelector('[data-specialist-chapter="writ"], [data-specialist-chapter="klause"], [data-specialist-chapter="rollback"], [data-specialist-chapter="receipt"]')).not.toBeInTheDocument()
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
