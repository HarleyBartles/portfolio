import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { IndexClosingSequence } from './IndexClosingSequence'

describe('IndexClosingSequence', () => {
  test('orders research, recognition, retrieval and assent consequence as one causal close', () => {
    const { container } = render(<IndexClosingSequence />)
    const root = container.querySelector('[data-index-closing-sequence]')!
    const beats = Array.from(root.querySelectorAll('[data-index-closing-beat]'))
      .map((element) => element.getAttribute('data-index-closing-beat'))

    expect(beats).toEqual(['research', 'recognition', 'source-retrieval', 'assent-outcome'])
    expect(root.querySelector('[data-index-substrate="assent-note"]')).toBeNull()
    const research = root.querySelector('[data-index-research-lockup]')
    const inspectionPair = research?.querySelector('[data-index-inspection-pair]')
    expect(inspectionPair).toBeInTheDocument()
    expect(inspectionPair?.querySelector('[data-index-traversal="patch-peer"]')).toHaveAttribute('data-substrate', 'commission-03-baseline')
    expect(inspectionPair?.querySelector('[data-index-traversal="index-inspect"]')).toHaveAttribute('data-substrate', 'commission-03-baseline')
  })
})
