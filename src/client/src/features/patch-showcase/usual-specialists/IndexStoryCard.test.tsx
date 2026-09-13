import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexStoryCard } from './IndexStoryCard'

describe('IndexStoryCard', () => {
  test('owns the Index story copy and root style override', () => {
    const { container } = render(<IndexStoryCard style={{ opacity: 0.5 }} />)

    const card = container.querySelector('[data-index-story-card]')
    expect(card).toHaveStyle({ opacity: '0.5' })
    expect(card).toHaveTextContent('Index is already moving before Patch finishes the pitch. She leads him across maps, revisions and overlapping records, tracing the provenance from source to source until one route holds together.')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexStoryCard className="external-control" />)
    expect(container.querySelector('[data-index-story-card]')).not.toHaveClass('external-control')
  })
})
