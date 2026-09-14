import { describe, expect, it } from 'vitest'
import {
  USUAL_SPECIALISTS_ASSETS,
  USUAL_SPECIALISTS_CANDIDATE_ASSETS,
  USUAL_SPECIALISTS_WEBP_OPTIONS,
  assertDerivativeReceipt,
  assertSourceIdentity,
  runValidationSteps,
} from './process-usual-specialists-assets.mjs'

describe('Usual Specialists asset processor', () => {
  it('locks the accepted WebP derivative contract', () => {
    const outputs = USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)

    expect(USUAL_SPECIALISTS_ASSETS).toHaveLength(31)
    expect(outputs).toContain('safehouse-threshold.webp')
    expect(outputs).toContain('opening-rope-start-anchor.webp')
    expect(outputs).toContain('index-high-step.webp')
    expect(outputs).toContain('index-return.webp')
    expect(outputs).toContain('patch-return.webp')
    expect(outputs).toContain('silk-commission-05-aperture-rim-heavy.webp')
    expect(outputs).toContain('silk-commission-05-aperture-rim-heavy-portrait.webp')
    expect(outputs).toContain('silk-commission-05-corridor.webp')
    expect(outputs).toContain('silk-commission-06-threshold-crossing.webp')
    expect(outputs).toContain('silk-commission-06-abseil-hands-free.webp')
    expect(outputs).toContain('silk-index-crossing-anchor-ring.webp')
    expect(outputs).toContain('silk-index-crossing-knot-foreground.webp')
    expect(outputs).toContain('silk-index-crossing-knot-foreground-crop.webp')
    expect(outputs).toContain('silk-index-crossing-ring-occluder.webp')
    expect(outputs).toEqual(expect.arrayContaining([
      'rope-loose-a.webp',
      'rope-loose-b.webp',
      'rope-loose-c.webp',
      'rope-terminal-curl.webp',
      'rope-taut-straight.webp',
      'rope-taut-bow.webp',
      'rope-taut-offset.webp',
    ]))
    expect(USUAL_SPECIALISTS_ASSETS.every(({ format }) => format === 'webp')).toBe(true)
    const openingAnchor = USUAL_SPECIALISTS_ASSETS.find(({ id }) => id === 'opening-rope-start-anchor')
    expect(openingAnchor).toMatchObject({
      source: 'opening-rope-start-anchor.png',
      output: 'opening-rope-start-anchor.webp',
      width: 640,
      crop: { left: 0, top: 0, width: 1254, height: 1205 },
    })
    const silkTraversal = USUAL_SPECIALISTS_ASSETS.find(({ id }) => id === 'silk-commission-06-threshold-crossing')
    expect(silkTraversal).toMatchObject({
      sourcePackage: 'silk',
      source: 'silk-commission-06-threshold-crossing.png',
      output: 'silk-commission-06-threshold-crossing.webp',
      width: 720,
    })
    const silkAbseil = USUAL_SPECIALISTS_ASSETS.find(({ id }) => id === 'silk-commission-06-abseil-hands-free')
    expect(silkAbseil).toMatchObject({
      sourcePackage: 'silk',
      source: 'silk-commission-06-abseil-hands-free.png',
      output: 'silk-commission-06-abseil-hands-free.webp',
      width: 720,
    })
    const silkPortraitFrame = USUAL_SPECIALISTS_ASSETS.find(({ id }) => id === 'silk-commission-05-aperture-rim-heavy-portrait')
    expect(silkPortraitFrame).toMatchObject({
      sourcePackage: 'silk',
      source: 'silk-commission-05-aperture-rim-heavy-portrait.png',
      output: 'silk-commission-05-aperture-rim-heavy-portrait.webp',
      width: 1024,
    })
    expect(USUAL_SPECIALISTS_WEBP_OPTIONS).toEqual({ quality: 82, alphaQuality: 100, effort: 6, smartSubsample: true })
  })

  it('registers only the temporary Commission 07 page-review derivative', () => {
    expect(USUAL_SPECIALISTS_CANDIDATE_ASSETS).toEqual([{
      id: 'silk-commission-07-frame-review',
      sourcePackage: 'silk',
      custody: 'candidate',
      source: 'candidates/commission-07-frame-review/silk-commission-07-frame-review.png',
      output: 'silk-commission-07-frame-review.webp',
      width: 1671,
      format: 'webp',
    }])
  })

  it('rejects source SHA drift', () => {
    const expected = { sha256: 'approved-sha', width: 1024, height: 1536 }
    const actual = { sha256: 'different-sha', width: 1024, height: 1536 }

    expect(() => assertSourceIdentity(actual, expected, 'index-walk')).toThrow('SHA-256')
  })

  it('rejects missing and extra derivative receipt entries', () => {
    const expected = [{ output: 'index-walk.webp', sourceSha256: 'source-sha', width: 320, height: 480, format: 'webp' }]

    expect(() => assertDerivativeReceipt(expected, [])).toThrow('missing')
    expect(() => assertDerivativeReceipt(expected, [...expected, { ...expected[0], output: 'extra.webp' }])).toThrow('extra')
  })

  it('runs custody and provenance validation steps in order', async () => {
    const calls: string[] = []

    await runValidationSteps([
      async () => { calls.push('custody') },
      async () => { calls.push('provenance') },
    ])

    expect(calls).toEqual(['custody', 'provenance'])
  })
})
