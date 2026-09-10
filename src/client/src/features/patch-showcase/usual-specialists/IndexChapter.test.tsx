import { render, screen, within } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexChapter } from './IndexChapter'

describe('Index chapter', () => {
  test('renders the accepted Index story and traversal ownership', () => {
    render(<IndexChapter />)

    const chapter = screen.getByRole('region', { name: 'Index' })
    expect(within(chapter).getByRole('heading', { level: 2, name: 'Index' })).toBeVisible()
    expect(chapter).toHaveTextContent('Index is already moving before Patch finishes the pitch.')
    expect(chapter).toHaveTextContent('PROVENANCE | TRACE THE ROUTES')
    expect(chapter).toHaveTextContent("You son of a gun. I'm in!")
    expect(chapter.querySelectorAll('[data-index-traversal]')).toHaveLength(7)
    expect(chapter.querySelector('[data-index-traversal="index-return"]')).toHaveAttribute('data-substrate', 'desk-diagram')
    expect(chapter.querySelector('[data-index-traversal="patch-return"]')).toHaveAttribute('data-substrate', 'desk-diagram')
    expect(chapter.querySelector('[data-index-substrate="desk-diagram"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="blue-carrier"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="graph-paper"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="commission-03"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="commission-04"]')).toBeInTheDocument()
    expect(chapter.querySelector('[data-index-substrate="assent-note"]')).toBeInTheDocument()
    expect(document.querySelector('[data-specialist-chapter="silk"]')).toBeNull()
  })

  test('keeps every traversal image lazy and asynchronously decoded', () => {
    render(<IndexChapter />)

    const chapter = screen.getByRole('region', { name: 'Index' })
    const traversalImages = chapter.querySelectorAll<HTMLImageElement>('[data-index-traversal]')

    expect(traversalImages).toHaveLength(7)
    for (const image of traversalImages) {
      expect(image).toHaveAttribute('loading', 'lazy')
      expect(image).toHaveAttribute('decoding', 'async')
    }
  })

  test('reserves the INDEX wordmark aspect ratio before the SVG loads', () => {
    render(<IndexChapter />)

    const chapter = screen.getByRole('region', { name: 'Index' })
    const wordmark = chapter.querySelector<HTMLImageElement>('[data-index-lockup] img')

    expect(wordmark).not.toBeNull()
    expect(getComputedStyle(wordmark!).aspectRatio).toBe('521.7171/103.332')
  })
})
