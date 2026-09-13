import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ChapterCrossing } from './ChapterCrossing'

describe('ChapterCrossing', () => {
  test('owns the ordinary opening to Index rule and future-anchor port', () => {
    const { container } = render(<ChapterCrossing crossing="opening-index" style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-specialists-chapter-crossing="opening-index"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root?.querySelector('[data-specialists-crossing-rule]')).toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-anchor]')).toHaveAttribute('data-specialists-crossing-anchor', 'opening-index')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<ChapterCrossing crossing="opening-index" className="external-control" />)
    expect(container.querySelector('[data-specialists-chapter-crossing="opening-index"]')).not.toHaveClass('external-control')
  })
})
