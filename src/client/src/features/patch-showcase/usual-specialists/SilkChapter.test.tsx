import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkChapter } from './SilkChapter'

describe('SilkChapter', () => {
  test('owns the Silk chapter story and specialist identity', () => {
    render(<SilkChapter />)

    const chapter = screen.getByRole('region', { name: 'Silk' })
    expect(chapter).toHaveAttribute('data-specialist-chapter', 'silk')
    expect(within(chapter).getByRole('heading', { level: 2, name: 'Silk' })).toBeVisible()
    expect(chapter.querySelector('[data-silk-chapter-number]')).toHaveTextContent('02')
    expect(chapter.querySelector('[data-silk-name-mark]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-silk-name-strapline]')).toHaveTextContent('PRESSURE | PROVE THE ROUTE')

    const story = chapter.querySelector('[data-silk-story-card]')
    expect(story).toHaveTextContent('Silk sees Index’s route and launches before Patch can properly begin.')
    expect(story?.querySelectorAll('p')).toHaveLength(1)
  })

  test('composes opaque Silk children in chapter story order', () => {
    render(<SilkChapter />)

    const chapter = screen.getByRole('region', { name: 'Silk' })
    const stage = chapter.querySelector<HTMLElement>('[data-silk-stage]')
    const traversalPlacement = chapter.querySelector<HTMLElement>('[data-silk-traversal-placement]')
    const commission05 = chapter.querySelector<HTMLElement>('[data-silk-commission="05"]')
    const commission07 = chapter.querySelector<HTMLElement>('[data-silk-commission="07"]')
    const receipt = chapter.querySelector<HTMLElement>('[data-silk-receipt-peekthrough]')
    const commission08 = chapter.querySelector<HTMLElement>('[data-silk-commission="08"]')
    const commission09 = chapter.querySelector<HTMLElement>('[data-silk-commission="09"]')

    expect(traversalPlacement?.parentElement).toBe(stage)
    expect(traversalPlacement?.querySelector('[data-silk-traversal-composition]')).toBeInTheDocument()
    expect(commission05).toHaveAttribute('data-silk-aperture-owner', '05')
    expect(commission05?.querySelector('[data-silk-aperture-composition]')).toBeInTheDocument()
    expect(commission07).toHaveAttribute('data-silk-aperture-owner', '07')
    expect(commission07?.querySelector('[data-silk-aperture-composition]')).toBeInTheDocument()
    expect(receipt?.querySelector('[data-silk-receipt-peekthrough-composition]')).toBeInTheDocument()
    expect(commission08).toHaveAttribute('data-silk-aperture-owner', '08')
    expect(commission08?.querySelector('[data-silk-reaction-frame-composition]')).toBeInTheDocument()
    expect(commission09).toHaveAttribute('data-silk-aperture-owner', '09')
    expect(commission09).toHaveAttribute('data-silk-commission-09-placement')
    expect(commission09?.querySelector('[data-silk-commission-09-composition]')).toBeInTheDocument()

    expect(commission05!.compareDocumentPosition(commission07!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(commission07!.compareDocumentPosition(commission08!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
    expect(commission08!.compareDocumentPosition(commission09!) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0)
  })

  test('forwards root style without exposing a className seam', () => {
    const { rerender } = render(<SilkChapter style={{ opacity: 0.5 }} />)
    expect(screen.getByRole('region', { name: 'Silk' })).toHaveStyle({ opacity: '0.5' })

    // @ts-expect-error className is intentionally not part of the chapter API.
    rerender(<SilkChapter className="external-control" />)
    expect(screen.getByRole('region', { name: 'Silk' })).not.toHaveClass('external-control')
  })
})
