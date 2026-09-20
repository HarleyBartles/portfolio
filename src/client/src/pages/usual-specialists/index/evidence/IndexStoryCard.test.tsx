import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexStoryCard } from './IndexStoryCard'

describe('IndexStoryCard', () => {
  test('keeps Index focused on lawful-route evidence and provenance', () => {
    const { container } = render(<IndexStoryCard style={{ opacity: 0.5 }} />)

    const card = container.querySelector('[data-index-story-card]')
    expect(card).toHaveStyle({ opacity: '0.5' })
    expect(card).toHaveTextContent(/pitch barely gets started/i)
    expect(card).toHaveTextContent(/maps/i)
    expect(card).toHaveTextContent(/sources overlap/i)
    expect(card).toHaveTextContent(/revisions disagree/i)
    expect(card).toHaveTextContent(/lawful routes/i)
    expect(card).toHaveTextContent(/where they came from/i)
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexStoryCard className="external-control" />)
    expect(container.querySelector('[data-index-story-card]')).not.toHaveClass('external-control')
  })
})
