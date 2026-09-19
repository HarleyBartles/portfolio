import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

describe('Usual Specialists route-owned story', () => {
  test('renders the opening and Index only while later Specialist chapters are parked', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists/next/']}>
        <UsualSpecialistsPage />
      </MemoryRouter>,
    )

    const story = screen.getByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index-draft')
    expect(story).toHaveAttribute('aria-label', 'The Usual Specialists')
    expect(story).not.toHaveAttribute('aria-labelledby')
    expect(within(story).getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()
    const index = story.querySelector<HTMLElement>('[data-specialist-chapter="index"]')
    const opening = story.querySelector('header')
    const canvas = story.querySelector<HTMLElement>('[data-specialists-canvas="authored"]')
    const nav = story.querySelector<HTMLElement>('[data-specialists-chapter-nav]')
    const indexMilestone = story.querySelector<HTMLElement>('[data-specialists-index-milestone]')
    expect(opening).toBeInTheDocument()
    expect(story.querySelector('[data-temporary-wireframe-rope="true"]')).not.toBeInTheDocument()
    expect(indexMilestone).not.toBeInTheDocument()
    expect(canvas).not.toBeNull()
    expect(canvas?.children).toHaveLength(3)
    expect(canvas?.children[0]?.querySelector('header')).toBe(opening)
    expect(canvas?.children[1]).toBe(nav)
    expect(canvas?.children[2]).toBe(index)
    expect(opening!.compareDocumentPosition(nav!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(nav!.compareDocumentPosition(index!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(story.querySelector('[data-specialists-chapter-crossing]')).not.toBeInTheDocument()
    expect(story.querySelector('[data-specialists-crossing-lockup]')).not.toBeInTheDocument()
    expect(story.querySelector('[data-specialists-rope-piece]')).not.toBeInTheDocument()
    expect(story.querySelector('[data-specialists-rope-anchor]')).not.toBeInTheDocument()
    expect(index).toBeInTheDocument()
    expect(story.querySelector('[data-specialist-chapter="silk"], [data-specialist-chapter="writ"], [data-specialist-chapter="klause"], [data-specialist-chapter="rollback"], [data-specialist-chapter="receipt"]')).not.toBeInTheDocument()
    expect(within(story).queryByText('Advanced visual pre-production')).not.toBeInTheDocument()
  })

  test('forwards an exceptional style override to the page root only', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists/next/']}>
        <UsualSpecialistsPage style={{ opacity: 0.5 }} />
      </MemoryRouter>,
    )

    const story = screen.getByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveStyle({ opacity: '0.5' })
    expect(within(story).getByRole('region', { name: 'Index' })).not.toHaveStyle({ opacity: '0.5' })
  })

  test('does not expose caller className as a styling seam', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists/next/']}>
        {/* @ts-expect-error className is intentionally not part of the vertical-slice API. */}
        <UsualSpecialistsPage className="external-control" />
      </MemoryRouter>,
    )

    expect(screen.getByRole('article', { name: 'The Usual Specialists' })).not.toHaveClass('external-control')
  })
})
