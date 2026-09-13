import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexSilkCrossingLock } from './IndexSilkCrossingLock'

describe('IndexSilkCrossingLock', () => {
  test('owns the authored anchor, knot, and foreground ring occluder in stacking order', () => {
    const { container } = render(<IndexSilkCrossingLock />)

    const root = container.querySelector('[data-index-silk-crossing-lock]')
    const layers = Array.from(root?.querySelectorAll('[data-index-silk-lock-layer]') ?? [])

    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(layers.map((layer) => layer.getAttribute('data-index-silk-lock-layer'))).toEqual([
      'anchor',
      'foreground-rope',
      'foreground-ring',
    ])
    expect(root?.querySelector('[data-index-silk-lock-anchor-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('silk-index-crossing-anchor-ring.webp'),
    )
    expect(root?.querySelector('[data-index-silk-lock-knot-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('silk-index-crossing-knot-foreground-crop.webp'),
    )
    expect(root?.querySelector('[data-index-silk-lock-ring-occluder-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('silk-index-crossing-ring-occluder.webp'),
    )
    expect(root?.querySelector('[data-index-silk-lock-knot-top-port]')).toBeInTheDocument()
    expect(root?.querySelector('[data-index-silk-lock-knot-bottom-port]')).toBeInTheDocument()
    expect(root?.querySelector('[data-index-silk-lock-contact-strand]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexSilkCrossingLock className="external-control" />)

    expect(container.querySelector('[data-index-silk-crossing-lock]')).not.toHaveClass('external-control')
  })
})
