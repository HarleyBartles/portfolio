import { describe, expect, it } from 'vitest'
import {
  PATCH_DERIVATIVES,
  PATCH_SOURCE_REVISION,
  buildDerivativeManifest,
} from './process-patch-assets.mjs'

const fixtureManifest = {
  hero: { width: 2400, height: 1350 },
  introducingPage: { width: 2400, height: 1350 },
  goldilocks: { width: 2400, height: 1350 },
  sorcerersApprentice: { width: 2400, height: 1350 },
  clubDb: { width: 1600, height: 900 },
  heist: { width: 1600, height: 900 },
  tournament: { width: 1600, height: 900 },
  identity: { width: 1600, height: 900 },
}

describe('Patch asset processor', () => {
  it('locks the reviewed derivative definitions', () => {
    expect(PATCH_DERIVATIVES.hero.widths).toEqual([720, 1440])
    expect(PATCH_DERIVATIVES.hero.formats).toEqual(['avif', 'webp'])
    expect(PATCH_DERIVATIVES.clubDb.slides).toEqual([2, 4, 14])
    expect(PATCH_DERIVATIVES.identity.sourceStatus).toBe('legacy_reference')
  })

  it('builds outputs with the custody fields required by later evidence', () => {
    const outputs = buildDerivativeManifest(fixtureManifest)

    expect(outputs).not.toHaveLength(0)
    for (const output of outputs) {
      expect(output.width).toBeGreaterThan(0)
      expect(output.height).toBeGreaterThan(0)
      expect(output.sourcePath).toMatch(/^.+\.(png|pptx)$/)
      expect(output.sourceRevision).toBe(PATCH_SOURCE_REVISION)
      expect(output.encoding).toEqual(expect.objectContaining({ quality: expect.any(Number) }))
      expect(output.byteBudgetClass).toMatch(/^(hero|page|support)$/)
    }
  })
})
