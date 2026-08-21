import { describe, expect, test } from 'vitest'
import { createFeatureOrder } from './featureOrder'

describe('createFeatureOrder', () => {
  test('returns every candidate once without mutating the curated source', () => {
    const source = ['writing', 'marketplace', 'patch', 'wild-bunch'] as const
    const original = [...source]
    const values = [0.1, 0.8, 0.3]
    let index = 0

    const result = createFeatureOrder(source, () => values[index++] ?? 0)

    expect(result).toEqual(['marketplace', 'wild-bunch', 'patch', 'writing'])
    expect(result.toSorted()).toEqual([...source].toSorted())
    expect(source).toEqual(original)
  })
})
