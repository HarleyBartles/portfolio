import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexChapter } from './IndexChapter'

describe('Index chapter', () => {
  test('composes the accepted Index vertical slices without later chapters', () => {
    render(<IndexChapter />)

    const chapter = screen.getByRole('region', { name: 'Index' })
    expect(within(chapter).getByRole('heading', { level: 2, name: 'Index' })).toBeVisible()
    expect(within(chapter).queryByText('01')).not.toBeInTheDocument()
    const deskDocument = chapter.querySelector<HTMLElement>('[data-index-substrate="desk-diagram"]')
    const storyCard = chapter.querySelector<HTMLElement>('[data-index-story-card]')
    const evidenceField = chapter.querySelector<HTMLElement>('[data-index-evidence-field]')
    expect(deskDocument).toBeInTheDocument()
    expect(storyCard).toBeInTheDocument()
    expect(evidenceField).toBeInTheDocument()
    expect(evidenceField).toContainElement(deskDocument)
    expect(evidenceField).toContainElement(storyCard)
    expect(evidenceField).toContainElement(chapter.querySelector('[data-index-substrate="blue-carrier"]') as HTMLElement)
    expect(deskDocument).not.toContainElement(storyCard)
    expect(chapter.querySelector('[data-index-substrate="blue-carrier"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="graph-paper"]')).toBeInTheDocument()
    const closingSequence = chapter.querySelector<HTMLElement>('[data-index-closing-sequence]')
    const researchLockup = chapter.querySelector<HTMLElement>('[data-index-research-lockup]')
    expect(storyCard).not.toBeNull()
    expect(closingSequence).toBeInTheDocument()
    expect(researchLockup).toBeInTheDocument()
    expect(closingSequence).toContainElement(researchLockup)
    expect(researchLockup).toContainElement(chapter.querySelector('[data-index-substrate="graph-paper"]') as HTMLElement)
    expect(researchLockup).toContainElement(chapter.querySelector('[data-index-inspection-pair]') as HTMLElement)
    expect(researchLockup).toContainElement(chapter.querySelector('[data-index-substrate="commission-03"]') as HTMLElement)
    expect(evidenceField).not.toContainElement(closingSequence)
    expect(chapter.querySelector('[data-index-commission-composition="commission-evidence"]')).toBeNull()
    expect(storyCard!.compareDocumentPosition(closingSequence!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(document.querySelector('[data-specialist-chapter="silk"]')).toBeNull()
  })

  test('forwards an exceptional style override to the chapter root only', () => {
    render(<IndexChapter style={{ opacity: 0.5 }} />)

    const chapter = screen.getByRole('region', { name: 'Index' })
    expect(chapter).toHaveStyle({ opacity: '0.5' })
    expect(chapter.querySelector('[data-index-substrate="desk-diagram"]')).not.toHaveStyle({ opacity: '0.5' })
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    render(<IndexChapter className="external-control" />)
    expect(screen.getByRole('region', { name: 'Index' })).not.toHaveClass('external-control')
  })
})
