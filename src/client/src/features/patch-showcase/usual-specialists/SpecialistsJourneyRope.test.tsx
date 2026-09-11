import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { EXPECTED_WIREFRAME_ROPE_PATH, SpecialistsJourneyRope } from './SpecialistsJourneyRope'

describe('SpecialistsJourneyRope', () => {
  test('owns the decorative temporary rope geometry and root override', () => {
    const { container } = render(<SpecialistsJourneyRope style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-temporary-wireframe-rope="true"]')
    expect(root).not.toBeNull()
    expect(root).toHaveAttribute('aria-hidden', 'true')
    expect(root).toHaveStyle({ opacity: '0.5' })

    const rope = root?.querySelector('svg')
    expect(rope).toHaveAttribute('viewBox', '0 0 1000 3300')
    expect(rope).toHaveAttribute('preserveAspectRatio', 'none')
    expect(rope?.querySelector('path')).toHaveAttribute('d', EXPECTED_WIREFRAME_ROPE_PATH)
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<SpecialistsJourneyRope className="external-control" />)
    expect(container.querySelector('[data-temporary-wireframe-rope="true"]')).not.toHaveClass('external-control')
  })
})
