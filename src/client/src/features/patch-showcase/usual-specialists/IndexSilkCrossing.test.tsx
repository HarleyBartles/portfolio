import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexSilkCrossing } from './IndexSilkCrossing'

describe('IndexSilkCrossing', () => {
  test('owns the Index to Silk crossing surface and whole-lock placement without a generic anchor', () => {
    const { container } = render(<IndexSilkCrossing style={{ opacity: 0.5 }} />)

    const root = container.querySelector('[data-specialists-chapter-crossing="index-silk"]')
    const placement = root?.querySelector<HTMLElement>('[data-index-silk-lock-placement]')

    expect(root).toHaveStyle({ opacity: '0.5' })
    expect(root?.querySelector('[data-specialists-crossing-rule]')).toBeInTheDocument()
    expect(placement).toBeInTheDocument()
    expect(placement?.querySelector('[data-index-silk-crossing-lock]')).toBeInTheDocument()
    expect(root?.querySelector('[data-specialists-crossing-anchor]')).not.toBeInTheDocument()
  })

  test('does not expose caller className as a styling seam', () => {
    // @ts-expect-error className is intentionally not part of the compositor API.
    const { container } = render(<IndexSilkCrossing className="external-control" />)

    expect(container.querySelector('[data-specialists-chapter-crossing="index-silk"]')).not.toHaveClass('external-control')
  })
})
