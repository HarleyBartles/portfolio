import { describe, expect, test } from 'vitest'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { LEARNING_LAB_ASSETS, expectedDerivativeSpecs } from './process-learning-lab-assets.mjs'

describe('Learning Lab asset processor', () => {
  test('keeps three accepted masters and purposeful responsive crops', () => {
    expect(Object.keys(LEARNING_LAB_ASSETS)).toEqual(['engineering-control-workbench', 'safe-breakage-rig', 'authority-transfer'])
    expect(LEARNING_LAB_ASSETS['engineering-control-workbench'].derivatives.map((item) => item.variant)).toEqual(['mobile', 'desktop'])
    expect(LEARNING_LAB_ASSETS['safe-breakage-rig'].derivatives.map((item) => [item.width, item.height])).toEqual([[720, 540], [1200, 800]])
    expect(LEARNING_LAB_ASSETS['authority-transfer'].derivatives.map((item) => [item.width, item.height])).toEqual([[720, 461], [1440, 921]])
  })

  test('records a content hash for every generated derivative', async () => {
    const manifestPath = path.resolve(import.meta.dirname, '..', 'public', 'media', 'learning-lab', 'learning-lab-derivatives.json')
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
    expect(manifest.derivatives).toHaveLength(12)
    for (const derivative of manifest.derivatives) {
      expect(derivative.outputSha256).toMatch(/^[a-f0-9]{64}$/)
    }
  })

  test('emits AVIF and WebP fallback entries for every display contract', () => {
    const derivatives = expectedDerivativeSpecs()
    expect(derivatives).toHaveLength(12)
    expect(new Set(derivatives.map((item) => item.path)).size).toBe(12)
    expect(derivatives.every((item) => item.sourceSha256.length === 64)).toBe(true)
    expect(derivatives.filter((item) => item.format === 'avif')).toHaveLength(6)
    expect(derivatives.filter((item) => item.format === 'webp')).toHaveLength(6)
  })
})
