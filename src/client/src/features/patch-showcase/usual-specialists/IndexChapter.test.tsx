import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexChapter } from './IndexChapter'

describe('Index chapter', () => {
  test('composes the accepted Index vertical slices without future chapters', () => {
    render(<IndexChapter />)

    const chapter = screen.getByRole('region', { name: 'Index' })
    expect(within(chapter).getByRole('heading', { level: 2, name: 'Index' })).toBeVisible()
    expect(chapter.querySelector('[data-index-substrate="desk-diagram"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="blue-carrier"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="graph-paper"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="commission-03"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="commission-04"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="assent-note"]')).toBeInTheDocument()
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
