import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import {
  SILK_COMMISSION_06_COMPACT_ROPE_PORT,
  SILK_COMMISSION_06_ROPE_PORT,
  SILK_ROPE_VIEWBOX,
  SILK_WIREFRAME_ROPE_PATH,
  SilkTraversalComposition,
} from './SilkTraversalComposition'

describe('SilkTraversalComposition', () => {
  test('owns rope, Commission 06 and anchor as one atomic physical composition', () => {
    const { container } = render(<SilkTraversalComposition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-silk-traversal-composition]')
    const entryPath = root?.querySelector('[data-silk-journey-rope-entry-path]')
    const rope = root?.querySelector('[data-silk-journey-rope]')
    const ropePath = root?.querySelector('[data-silk-journey-rope-path]')
    const traversal = root?.querySelector('[data-silk-commission="06"]')
    const traversalPort = root?.querySelector('[data-silk-traversal-rope-port]')
    const anchor = root?.querySelector('[data-silk-rope-anchor]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(entryPath).toBeInTheDocument()
    expect(rope).toHaveAttribute('viewBox', `0 0 ${SILK_ROPE_VIEWBOX.width} ${SILK_ROPE_VIEWBOX.height}`)
    expect(ropePath).toHaveAttribute('d', SILK_WIREFRAME_ROPE_PATH)
    expect(traversal).toHaveTextContent('threshold-crossing Silk traversal')
    expect(traversalPort).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
    expect(SILK_COMMISSION_06_ROPE_PORT).toEqual({ x: 250, y: 580 })
    expect(SILK_COMMISSION_06_COMPACT_ROPE_PORT).toEqual({ x: 244, y: 440 })
    expect(SILK_WIREFRAME_ROPE_PATH).toContain('244 440')
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SilkTraversalComposition className="external-control" />)
    expect(container.querySelector('[data-silk-traversal-composition]')).not.toHaveClass('external-control')
  })
})
