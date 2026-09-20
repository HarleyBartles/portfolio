import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexGraphPaper } from './IndexGraphPaper'

describe('IndexGraphPaper', () => {
  test('owns the graph-paper media contract and root style override', () => {
    const { container } = render(<IndexGraphPaper style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-substrate="graph-paper"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    const image = screen.getByRole('img', { name: /graph paper spilling/i })
    expect(image).toHaveAttribute('width', '1140')
    expect(image).toHaveAttribute('height', '760')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexGraphPaper className="external-control" />)
    expect(container.querySelector('[data-index-substrate="graph-paper"]')).not.toHaveClass('external-control')
  })
})
