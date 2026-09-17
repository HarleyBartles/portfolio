import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SilkTraversalCutout } from './SilkTraversalCutout'

describe('SilkTraversalCutout', () => {
  test('owns the accepted decorative Commission 06 image and intrinsic display contract', () => {
    const { container } = render(<SilkTraversalCutout />)

    const root = container.querySelector('[data-silk-traversal-cutout]')
    const image = container.querySelector<HTMLImageElement>('[data-silk-traversal-cutout-image]')

    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(image).toHaveAttribute('src', expect.stringContaining('silk-commission-06-abseil-hands-free.webp'))
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('width', '720')
    expect(image).toHaveAttribute('height', '864')
    expect(image).toHaveAttribute('decoding', 'async')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  test('forwards only the canonical root style escape hatch, not className', () => {
    const { container, rerender } = render(<SilkTraversalCutout style={{ opacity: 0.5 }} />)
    expect(container.querySelector('[data-silk-traversal-cutout]')).toHaveStyle({ opacity: '0.5' })

    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    rerender(<SilkTraversalCutout className="external-control" />)
    expect(container.querySelector('[data-silk-traversal-cutout]')).not.toHaveClass('external-control')
  })
})
