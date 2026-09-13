import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexMacguffin } from './IndexMacguffin'

describe('IndexMacguffin', () => {
  test('owns the macguffin media contract and root style override', () => {
    const { container } = render(<IndexMacguffin style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-substrate="commission-04"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    const image = screen.getByRole('img', { name: /physical macguffin/i })
    expect(image).toHaveAttribute('width', '1200')
    expect(image).toHaveAttribute('height', '800')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexMacguffin className="external-control" />)
    expect(container.querySelector('[data-index-substrate="commission-04"]')).not.toHaveClass('external-control')
  })
})
