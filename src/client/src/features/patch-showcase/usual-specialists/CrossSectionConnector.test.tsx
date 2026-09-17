import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CrossSectionConnector } from './CrossSectionConnector'

describe('CrossSectionConnector', () => {
  test.each(['opening-index', 'index-silk'] as const)('owns the %s crossing layout around the shared lockup', (crossing) => {
    const { container } = render(<CrossSectionConnector crossing={crossing} style={{ opacity: 0.5 }} />)

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
    const { container } = render(<CrossSectionConnector crossing="opening-index" className="external-control" />)

    expect(container.querySelector('[data-specialists-chapter-crossing="opening-index"]')).not.toHaveClass('external-control')
  })
})
