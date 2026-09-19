import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexObservation } from './IndexObservation'

describe('IndexObservation', () => {
  test('owns only the observation media and root style override', () => {
    const { container } = render(<IndexObservation style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-index-substrate="commission-03"]')
    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(screen.getByRole('img', { name: /obstructed observation point/i })).toHaveAttribute('loading', 'lazy')
    expect(root?.querySelector('[data-index-inspection-pair]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the vertical-slice API.
    const { container } = render(<IndexObservation className="external-control" />)
    expect(container.querySelector('[data-index-substrate="commission-03"]')).not.toHaveClass('external-control')
  })
})
