import { describe, expect, test } from 'vitest'
import { INDEX_SILK_CONNECTION, OPENING_INDEX_CONNECTION } from './usualSpecialistsConnections'

describe('usual specialists rope connection geometry', () => {
  test('keeps both crossing lockups at one shared scale so one fixed rope gauge matches both', () => {
    const bands = ['narrow', 'compactLandscape', 'mid', 'default', 'wide'] as const

    for (const band of bands) {
      expect(OPENING_INDEX_CONNECTION[band].crossing.scale).toBe(0.725)
      expect(INDEX_SILK_CONNECTION[band].scale).toBe(0.725)
    }
  })
})
