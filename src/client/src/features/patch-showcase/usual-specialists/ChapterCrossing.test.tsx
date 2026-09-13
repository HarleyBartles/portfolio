import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { ChapterCrossing } from './ChapterCrossing'

describe('ChapterCrossing', () => {
  test.each(['opening-index', 'index-silk'] as const)('owns the %s rule and future-anchor port', (crossing) => {
    const { container } = render(<ChapterCrossing crossing={crossing} style={{ opacity: 0.5 }} />)

    const root = container.querySelector(`[data-specialists-chapter-crossing="${crossing}"]`)
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root?.querySelector('[data-specialists-crossing-rule]')).toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-anchor]')).toHaveAttribute('data-specialists-crossing-anchor', crossing)
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<ChapterCrossing crossing="opening-index" className="external-control" />)
    expect(container.querySelector('[data-specialists-chapter-crossing="opening-index"]')).not.toHaveClass('external-control')
  })
})
