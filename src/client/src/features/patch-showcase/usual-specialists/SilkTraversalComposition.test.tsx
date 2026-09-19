import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  SILK_COMMISSION_06_COMPACT_ROPE_PORT,
  SILK_COMMISSION_06_ROPE_PORT,
  SilkTraversalComposition,
} from './SilkTraversalComposition'
import { INDEX_SILK_CONNECTION } from './usualSpecialistsConnections'

describe('SilkTraversalComposition', () => {
  test('owns a seam-to-join upper rope and a join-owned lower rope around Commission 06', () => {
    const { container } = render(<SilkTraversalComposition connection={INDEX_SILK_CONNECTION} style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-traversal-composition]')
    const upperRope = root?.querySelector('[data-specialists-rope-piece="silk-upper"]')
    const lowerRope = root?.querySelector('[data-specialists-rope-piece="silk-lower"]')
    const ropeAxis = root?.querySelector('[data-silk-rope-axis]')
    const traversal = root?.querySelector('[data-silk-commission="06"]')
    const traversalPort = root?.querySelector('[data-silk-traversal-rope-port]')
    const ropeJoinPort = root?.querySelector('[data-silk-rope-join-port]')
    const upperEntryPort = upperRope?.querySelector('[data-silk-upper-rope-entry-port]')
    const upperExitPort = upperRope?.querySelector('[data-silk-upper-rope-exit-port]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(ropeAxis).toBeInTheDocument()
    expect(getComputedStyle(root as HTMLElement).position).toBe('relative')
    expect(getComputedStyle(root as HTMLElement).width).toBe('100%')
    expect(getComputedStyle(root as HTMLElement).height).toBe('100%')
    expect(ropeAxis).toContainElement(upperRope as HTMLElement)
    expect(ropeAxis).toContainElement(lowerRope as HTMLElement)
    expect(ropeAxis).toContainElement(ropeJoinPort as HTMLElement)
    expect(upperEntryPort).toBeInTheDocument()
    expect(upperExitPort).toBeInTheDocument()
    expect(upperRope?.querySelector('[data-silk-upper-rope-material="tiled"]')).toBeInTheDocument()
    expect(upperRope?.querySelector('[data-specialists-rope-variant="taut-straight"]')).not.toBeInTheDocument()
    expect(lowerRope?.querySelector('[data-specialists-rope-variant="terminal-curl"]')).toBeInTheDocument()
    const traversalImage = traversal?.querySelector<HTMLImageElement>('[data-silk-traversal-cutout-image]')
    expect(traversalImage).toBeInTheDocument()
    expect(traversalImage).toHaveAttribute('src', expect.stringContaining('silk-commission-06-abseil-hands-free.webp'))
    expect(traversalImage).toHaveAttribute('alt', '')
    expect(traversal).not.toHaveTextContent('threshold-crossing Silk traversal')
    expect(traversalPort).toBeInTheDocument()
    expect(ropeJoinPort).toBeInTheDocument()
    expect(root?.querySelector('[data-silk-rope-anchor]')).not.toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-anchor]')).not.toBeInTheDocument()
    expect(SILK_COMMISSION_06_ROPE_PORT).toEqual({ x: 250, y: 580 })
    expect(SILK_COMMISSION_06_COMPACT_ROPE_PORT).toEqual({ x: 244, y: 440 })
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkTraversalComposition connection={INDEX_SILK_CONNECTION} className="external-control" />)
    expect(container.querySelector('[data-silk-traversal-composition]')).not.toHaveClass('external-control')
  })

  test('does not accept raw join or traversal coordinates from its parent', () => {
    // @ts-expect-error raw join geometry is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkTraversalComposition connection={INDEX_SILK_CONNECTION} ropeJoinTop={440} traversalTop={580} />)
    const root = container.querySelector('[data-silk-traversal-composition]')

    expect(root).not.toHaveAttribute('ropeJoinTop')
    expect(root).not.toHaveAttribute('traversalTop')
  })
})
