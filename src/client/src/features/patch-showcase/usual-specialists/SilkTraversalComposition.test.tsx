import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  SILK_COMMISSION_06_COMPACT_ROPE_PORT,
  SILK_COMMISSION_06_ROPE_PORT,
  SilkTraversalComposition,
} from './SilkTraversalComposition'

describe('SilkTraversalComposition', () => {
  test('owns upper and lower commissioned rope pieces around Commission 06 as one physical composition', () => {
    const { container } = render(<SilkTraversalComposition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-traversal-composition]')
    const upperRope = root?.querySelector('[data-specialists-rope-piece="silk-upper"]')
    const lowerRope = root?.querySelector('[data-specialists-rope-piece="silk-lower"]')
    const traversal = root?.querySelector('[data-silk-commission="06"]')
    const traversalPort = root?.querySelector('[data-silk-traversal-rope-port]')
    const ropeJoinPort = root?.querySelector('[data-silk-rope-join-port]')
    const ropeAxis = root?.querySelector('[data-silk-rope-axis]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(ropeAxis).toBeInTheDocument()
    expect(ropeAxis).toContainElement(upperRope as HTMLElement)
    expect(ropeAxis).toContainElement(lowerRope as HTMLElement)
    expect(ropeAxis).toContainElement(ropeJoinPort as HTMLElement)
    expect(upperRope?.querySelector('[data-specialists-rope-variant="taut-straight"]')).toBeInTheDocument()
    expect(lowerRope?.querySelector('[data-specialists-rope-variant="terminal-curl"]')).toBeInTheDocument()
    expect(traversal).toHaveTextContent('threshold-crossing Silk traversal')
    expect(traversalPort).toBeInTheDocument()
    expect(ropeJoinPort).toBeInTheDocument()
    expect(root?.querySelector('[data-silk-rope-anchor]')).not.toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-anchor]')).not.toBeInTheDocument()
    expect(SILK_COMMISSION_06_ROPE_PORT).toEqual({ x: 250, y: 580 })
    expect(SILK_COMMISSION_06_COMPACT_ROPE_PORT).toEqual({ x: 244, y: 440 })
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkTraversalComposition className="external-control" />)
    expect(container.querySelector('[data-silk-traversal-composition]')).not.toHaveClass('external-control')
  })
})
