import path from 'node:path'
import sharp from 'sharp'
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

    expect(USUAL_SPECIALISTS_ASSETS).toHaveLength(40)
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
    expect(outputs).toContain('silk-commission-07-frame-review.webp')
    expect(outputs).toContain('silk-commission-07-frame-review-portrait.webp')
    expect(outputs).toContain('silk-commission-07-service-corridor-review.webp')
    expect(outputs).toContain('silk-commission-08-reaction-frame-review.webp')
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

  it('promotes the mounted Commission 09 frame family into accepted custody', () => {
    expect(USUAL_SPECIALISTS_CANDIDATE_ASSETS).toEqual([])
    expect(USUAL_SPECIALISTS_ASSETS).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'silk-commission-09-knockthrough-frame-review',
        sourcePackage: 'silk',
        source: 'silk-commission-09-knockthrough-frame-review.png',
        output: 'silk-commission-09-knockthrough-frame-review.webp',
        width: 1672,
      }),
      expect.objectContaining({
        id: 'silk-commission-09-knockthrough-frame-review-portrait',
        sourcePackage: 'silk',
        source: 'silk-commission-09-knockthrough-frame-review-portrait.png',
        output: 'silk-commission-09-knockthrough-frame-review-portrait.webp',
        width: 941,
      }),
      expect.objectContaining({
        id: 'silk-receipt-hole-peek-cutout-review',
        sourcePackage: 'silk',
        source: 'silk-receipt-hole-peek-cutout-review.png',
        output: 'silk-receipt-hole-peek-cutout-review.webp',
        width: 720,
      }),
      expect.objectContaining({
        id: 'silk-receipt-peekthrough-frame-review',
        sourcePackage: 'silk',
        source: 'silk-receipt-peekthrough-frame-review.png',
        output: 'silk-receipt-peekthrough-frame-review.webp',
        width: 1254,
      }),
      expect.objectContaining({
        id: 'silk-receipt-alcove-world-review',
        sourcePackage: 'silk',
        source: 'silk-receipt-alcove-world-review.png',
        output: 'silk-receipt-alcove-world-review.webp',
        width: 1254,
      }),
      expect.objectContaining({
        id: 'silk-commission-07-frame-review',
        sourcePackage: 'silk',
        source: 'silk-commission-07-frame-review.png',
        output: 'silk-commission-07-frame-review.webp',
      }),
      expect.objectContaining({
        id: 'silk-commission-07-frame-review-portrait',
        sourcePackage: 'silk',
        source: 'silk-commission-07-frame-review-portrait.png',
        output: 'silk-commission-07-frame-review-portrait.webp',
      }),
      expect.objectContaining({
        id: 'silk-commission-07-service-corridor-review',
        sourcePackage: 'silk',
        source: 'silk-commission-07-service-corridor-review.png',
        output: 'silk-commission-07-service-corridor-review.webp',
      }),
      expect.objectContaining({
        id: 'silk-commission-08-reaction-frame-review',
        sourcePackage: 'silk',
        source: 'silk-commission-08-reaction-frame-review.png',
        output: 'silk-commission-08-reaction-frame-review.webp',
        width: 1750,
      }),
    ]))
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

  it('normalizes the receipt review outer wall to the page mineral without filling the aperture', async () => {
    const derivativePath = path.resolve(
      import.meta.dirname,
      '..',
      'public',
      'media',
      'patch',
      'the-usual-specialists',
      'silk-receipt-peekthrough-frame-review.webp',
    )
    const { data, info } = await sharp(derivativePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    const pixelAt = (x: number, y: number) => {
      const offset = ((y * info.width) + x) * info.channels
      return Array.from(data.subarray(offset, offset + 4))
    }

    for (const [x, y] of [[0, 0], [info.width - 1, 0], [0, info.height - 1], [info.width - 1, info.height - 1]] as const) {
      const [red, green, blue, alpha] = pixelAt(x, y)
      expect(red).toBeGreaterThanOrEqual(228)
      expect(red).toBeLessThanOrEqual(232)
      expect(green).toBeGreaterThanOrEqual(232)
      expect(green).toBeLessThanOrEqual(236)
      expect(blue).toBeGreaterThanOrEqual(233)
      expect(blue).toBeLessThanOrEqual(237)
      expect(alpha).toBe(255)
    }

    expect(pixelAt(Math.floor(info.width / 2), Math.floor(info.height / 2))[3]).toBe(0)
  })
})
