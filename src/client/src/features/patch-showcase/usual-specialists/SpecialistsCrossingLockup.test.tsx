import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { SpecialistsCrossingLockup } from './SpecialistsCrossingLockup'

describe('SpecialistsCrossingLockup', () => {
  test('owns the authored anchor, knot, and foreground ring occluder in stacking order', () => {
    const { container } = render(<SpecialistsCrossingLockup />)

    const root = container.querySelector('[data-specialists-crossing-lockup]')
    const layers = Array.from(root?.querySelectorAll('[data-specialists-crossing-lock-layer]') ?? [])

    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(layers.map((layer) => layer.getAttribute('data-specialists-crossing-lock-layer'))).toEqual([
      'anchor',
      'foreground-rope',
      'foreground-ring',
    ])
    expect(root?.querySelector('[data-specialists-crossing-lock-anchor-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('silk-index-crossing-anchor-ring.webp'),
    )
    expect(root?.querySelector('[data-specialists-crossing-lock-knot-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('silk-index-crossing-knot-foreground-crop.webp'),
    )
    expect(root?.querySelector('[data-specialists-crossing-lock-ring-occluder-image]')).toHaveAttribute(
      'src',
      expect.stringContaining('silk-index-crossing-ring-occluder.webp'),
    )
    expect(root?.querySelector('[data-specialists-crossing-lock-knot-top-port]')).toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-lock-knot-bottom-port]')).toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-lock-contact-strand]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SpecialistsCrossingLockup className="external-control" />)

    expect(container.querySelector('[data-specialists-crossing-lockup]')).not.toHaveClass('external-control')
  })

  test('forwards the canonical style override to the lockup root only', () => {
    const { container } = render(<SpecialistsCrossingLockup style={{ opacity: 0.5 }} />)

    expect(container.querySelector('[data-specialists-crossing-lockup]')).toHaveStyle({ opacity: '0.5' })
  })

  test('owns internal registration without owning page-level placement', () => {
    const { container } = render(<SpecialistsCrossingLockup />)
    const root = container.querySelector<HTMLElement>('[data-specialists-crossing-lockup]')!
    const style = getComputedStyle(root)

    expect(style.position).not.toBe('absolute')
    expect(style.left).toBe('auto')
    expect(style.top).toBe('auto')
  })
})
