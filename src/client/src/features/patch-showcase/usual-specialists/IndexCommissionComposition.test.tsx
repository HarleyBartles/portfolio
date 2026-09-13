import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexCommissionComposition } from './IndexCommissionComposition'

describe('IndexCommissionComposition', () => {
  test('owns the three commission slices and forwards a root-only style override', () => {
    const { container } = render(<IndexCommissionComposition style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-commission-composition="commission-evidence"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root?.querySelector('[data-index-substrate="commission-03"]')).toBeInTheDocument()
    expect(root?.querySelector('[data-index-substrate="commission-04"]')).toBeInTheDocument()
    expect(root?.querySelector('[data-index-substrate="assent-note"]')).toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexCommissionComposition className="external-control" />)
    expect(container.querySelector('[data-index-commission-composition="commission-evidence"]')).not.toHaveClass('external-control')
  })
})
