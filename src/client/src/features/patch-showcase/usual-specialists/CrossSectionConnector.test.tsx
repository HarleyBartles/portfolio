import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CrossSectionConnector } from './CrossSectionConnector'
import { INDEX_SILK_CONNECTION, OPENING_INDEX_CONNECTION } from './usualSpecialistsConnections'

describe('CrossSectionConnector', () => {
  test.each(['opening-index', 'index-silk'] as const)('owns the %s crossing layout around the shared lockup', (crossing) => {
    const connector = crossing === 'index-silk'
      ? <CrossSectionConnector connection={INDEX_SILK_CONNECTION} crossing={crossing} style={{ opacity: 0.5 }} />
      : <CrossSectionConnector connection={OPENING_INDEX_CONNECTION} crossing={crossing} style={{ opacity: 0.5 }} />
    const { container } = render(connector)

    const root = container.querySelector(`[data-specialists-chapter-crossing="${crossing}"]`)
    const placement = root?.querySelector(`[data-specialists-crossing-lock-placement="${crossing}"]`)

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root?.querySelector('[data-specialists-crossing-rule]')).toBeInTheDocument()
    expect(placement).toBeInTheDocument()
    expect(placement?.querySelector('[data-specialists-crossing-lockup]')).toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-anchor]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the compositor API.
    const { container } = render(<CrossSectionConnector className="external-control" connection={OPENING_INDEX_CONNECTION} crossing="opening-index" />)

    expect(container.querySelector('[data-specialists-chapter-crossing="opening-index"]')).not.toHaveClass('external-control')
  })
})
