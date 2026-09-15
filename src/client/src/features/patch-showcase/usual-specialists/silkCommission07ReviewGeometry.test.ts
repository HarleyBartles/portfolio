import path from 'node:path'
import sharp from 'sharp'
import { describe, expect, test } from 'vitest'
import {
  SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD,
  SILK_COMMISSION_07_REVIEW_COVERAGE_BAND,
  SILK_COMMISSION_07_REVIEW_FRAME_HEIGHT,
  SILK_COMMISSION_07_REVIEW_FRAME_WIDTH,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_HEIGHT,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_WIDTH,
  SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT,
  SILK_COMMISSION_07_REVIEW_PARALLAX_SAFETY_MARGIN,
  SILK_COMMISSION_07_REVIEW_PARALLAX_TRAVEL,
  SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN,
  SILK_COMMISSION_07_REVIEW_VIEWPORT,
} from './silkCommission07ReviewGeometry'

const sourcePath = path.resolve(
  process.cwd(),
  'assets/patch/the-usual-specialists/silk/silk-commission-07-frame-review.png',
)

const portraitSourcePath = path.resolve(
  process.cwd(),
  'assets/patch/the-usual-specialists/silk/silk-commission-07-frame-review-portrait.png',
)

describe('Silk Commission 07 review geometry', () => {
  test('keeps the rectangular review world behind a continuous opaque frame perimeter', async () => {
    const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

    expect(info.width).toBe(SILK_COMMISSION_07_REVIEW_FRAME_WIDTH)
    expect(info.height).toBe(SILK_COMMISSION_07_REVIEW_FRAME_HEIGHT)
    expect(SILK_COMMISSION_07_REVIEW_VIEWPORT).toEqual({ left: 112, right: 1522, top: 166, bottom: 812 })
    expect(SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD).toBe(240)
    expect(SILK_COMMISSION_07_REVIEW_COVERAGE_BAND).toBe(2)
    expect(SILK_COMMISSION_07_REVIEW_PARALLAX_TRAVEL).toBe(128)
    expect(SILK_COMMISSION_07_REVIEW_WORLD_OVERSCAN).toBe(80)
    expect(SILK_COMMISSION_07_REVIEW_PARALLAX_SAFETY_MARGIN).toBe(8)

    const alphaAt = (x: number, y: number): number =>
      data[((y * info.width + x) * info.channels) + 3] ?? 0
    const { left, right, top, bottom } = SILK_COMMISSION_07_REVIEW_VIEWPORT

    for (let y = top; y <= bottom; y += 1) {
      for (let x = left; x <= right; x += 1) {
        const insideCoverageBand = x < left + SILK_COMMISSION_07_REVIEW_COVERAGE_BAND
          || x > right - SILK_COMMISSION_07_REVIEW_COVERAGE_BAND
          || y < top + SILK_COMMISSION_07_REVIEW_COVERAGE_BAND
          || y > bottom - SILK_COMMISSION_07_REVIEW_COVERAGE_BAND
        if (insideCoverageBand) {
          expect(alphaAt(x, y), JSON.stringify({ x, y })).toBeGreaterThanOrEqual(SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD)
        }
      }
    }
  })

  test('keeps the narrow portrait review world behind a continuous opaque frame perimeter', async () => {
    const { data, info } = await sharp(portraitSourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

    expect(info.width).toBe(SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_WIDTH)
    expect(info.height).toBe(SILK_COMMISSION_07_REVIEW_PORTRAIT_FRAME_HEIGHT)
    expect(SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT).toEqual({ left: 143, right: 837, top: 198, bottom: 1475 })

    const alphaAt = (x: number, y: number): number =>
      data[((y * info.width + x) * info.channels) + 3] ?? 0
    const { left, right, top, bottom } = SILK_COMMISSION_07_REVIEW_PORTRAIT_VIEWPORT

    expect((right - left) / info.width).toBeGreaterThan(0.7)
    expect((bottom - top) / info.height).toBeGreaterThan(0.75)
    expect(alphaAt(Math.round((left + right) / 2), Math.round((top + bottom) / 2))).toBe(0)

    for (let offset = 0; offset < SILK_COMMISSION_07_REVIEW_COVERAGE_BAND; offset += 1) {
      for (let x = left; x <= right; x += 1) {
        expect(alphaAt(x, top + offset), `portrait top coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD)
        expect(alphaAt(x, bottom - offset), `portrait bottom coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD)
      }
      for (let y = top; y <= bottom; y += 1) {
        expect(alphaAt(left + offset, y), `portrait left coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD)
        expect(alphaAt(right - offset, y), `portrait right coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_07_REVIEW_ALPHA_THRESHOLD)
      }
    }
  })
})
