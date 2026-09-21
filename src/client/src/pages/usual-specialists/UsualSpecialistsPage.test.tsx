import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

describe('Usual Specialists route-owned story', () => {
  test('renders the temporary construction beat immediately after the latest launched chapter', () => {
    render(
      <MemoryRouter basename="/portfolio" initialEntries={['/portfolio/patch/the-usual-specialists/next/']}>
        <UsualSpecialistsPage />
      </MemoryRouter>,
    )

    const story = screen.getByRole('article', { name: 'The Usual Specialists' })
    expect(story).toHaveAttribute('data-visual-contract', 'patch-usual-specialists-index')
    expect(story).toHaveAttribute('aria-label', 'The Usual Specialists')
    expect(story).not.toHaveAttribute('aria-labelledby')
    expect(within(story).getByRole('heading', { level: 1, name: 'The Usual Specialists' })).toBeVisible()
    const index = story.querySelector<HTMLElement>('[data-specialist-chapter="index"]')
    const opening = story.querySelector('header')
    const canvas = story.querySelector<HTMLElement>('[data-specialists-canvas="authored"]')
    const indexMilestone = story.querySelector<HTMLElement>('[data-specialists-index-milestone]')
    const chapterDivider = story.querySelector<HTMLElement>('[data-specialists-chapter-divider]')
    const underConstruction = story.querySelector<HTMLElement>('[data-specialists-under-construction]')
    expect(opening).toBeInTheDocument()
    expect(indexMilestone).not.toBeInTheDocument()
    expect(canvas).not.toBeNull()
    expect(canvas?.children).toHaveLength(3)
    expect(canvas?.children[0]?.querySelector('header')).toBe(opening)
    expect(canvas?.children[1]).toBe(index)
    expect(canvas?.children[2]).toBe(chapterDivider)
    expect(opening!.compareDocumentPosition(index!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(index!.compareDocumentPosition(chapterDivider!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(index).toBeInTheDocument()
    expect(story.querySelector('[data-specialists-chapter-nav]')).not.toBeInTheDocument()
    expect(chapterDivider).toContainElement(underConstruction)
    expect(chapterDivider).toHaveStyle({ borderTopStyle: 'solid' })
    expect(underConstruction).toBeInTheDocument()
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
