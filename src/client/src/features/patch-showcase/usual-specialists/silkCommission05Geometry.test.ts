import path from 'node:path'
import sharp from 'sharp'
import { describe, expect, test } from 'vitest'
import {
  SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD,
  SILK_COMMISSION_05_FRAME_COVERAGE_BAND,
  SILK_COMMISSION_05_FRAME_HEIGHT,
  SILK_COMMISSION_05_FRAME_WIDTH,
  SILK_COMMISSION_05_PARALLAX_TRAVEL,
  SILK_COMMISSION_05_PARALLAX_SAFETY_MARGIN,
  SILK_COMMISSION_05_PORTRAIT_FRAME_HEIGHT,
  SILK_COMMISSION_05_PORTRAIT_FRAME_WIDTH,
  SILK_COMMISSION_05_PORTRAIT_VIEWPORT,
  SILK_COMMISSION_05_SCENE_OVERSCAN,
  SILK_COMMISSION_05_VIEWPORT,
} from './silkCommission05Geometry'

const sourcePath = path.resolve(
  process.cwd(),
  'assets/patch/the-usual-specialists/silk/silk-commission-05-aperture-rim-heavy.png',
)
const portraitSourcePath = path.resolve(
  process.cwd(),
  'assets/patch/the-usual-specialists/silk/silk-commission-05-aperture-rim-heavy-portrait.png',
)

describe('Silk Commission 05 geometry', () => {
  test('uses the approved 128px total parallax travel', () => {
    expect(SILK_COMMISSION_05_PARALLAX_TRAVEL).toBe(128)
  })

  test('reserves enough hidden vertical scene bleed for the approved 128px total parallax', () => {
    const safeTotalTravel = (SILK_COMMISSION_05_SCENE_OVERSCAN * 2)
      - (SILK_COMMISSION_05_PARALLAX_SAFETY_MARGIN * 2)

    expect(safeTotalTravel).toBeGreaterThanOrEqual(128)
  })

  test('uses the accepted portrait viewport scaled to the new source geometry', () => {
    expect(SILK_COMMISSION_05_PORTRAIT_VIEWPORT).toEqual({
      left: 155,
      right: 873,
      top: 164,
      bottom: 1361,
    })
  })

  test('keeps every hard viewport edge hidden beneath the heavy frame', async () => {
    const { data, info } = await sharp(sourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

    expect(info.width).toBe(SILK_COMMISSION_05_FRAME_WIDTH)
    expect(info.height).toBe(SILK_COMMISSION_05_FRAME_HEIGHT)
    expect(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD).toBe(250)
    expect(SILK_COMMISSION_05_FRAME_COVERAGE_BAND).toBe(8)
    expect(SILK_COMMISSION_05_VIEWPORT).toEqual({ left: 200, right: 1500, top: 130, bottom: 820 })

    const alphaAt = (x: number, y: number): number =>
      data[(y * info.width + x) * info.channels + 3] ?? 0

    const { left, right, top, bottom } = SILK_COMMISSION_05_VIEWPORT
    for (let x = left; x <= right; x += 1) {
      for (let offset = 0; offset < SILK_COMMISSION_05_FRAME_COVERAGE_BAND; offset += 1) {
        expect(alphaAt(x, top + offset), `top coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
        expect(alphaAt(x, bottom - offset), `bottom coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
      }
    }
    for (let y = top; y <= bottom; y += 1) {
      for (let offset = 0; offset < SILK_COMMISSION_05_FRAME_COVERAGE_BAND; offset += 1) {
        expect(alphaAt(left + offset, y), `left coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
        expect(alphaAt(right - offset, y), `right coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
      }
    }
  })

  test('keeps every hard portrait viewport edge hidden beneath the commissioned portrait frame', async () => {
    const { data, info } = await sharp(portraitSourcePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

    expect(info.width).toBe(SILK_COMMISSION_05_PORTRAIT_FRAME_WIDTH)
    expect(info.height).toBe(SILK_COMMISSION_05_PORTRAIT_FRAME_HEIGHT)

    const alphaAt = (x: number, y: number): number =>
      data[(y * info.width + x) * info.channels + 3] ?? 0

    const { left, right, top, bottom } = SILK_COMMISSION_05_PORTRAIT_VIEWPORT
    for (let x = left; x <= right; x += 1) {
      for (let offset = 0; offset < SILK_COMMISSION_05_FRAME_COVERAGE_BAND; offset += 1) {
        expect(alphaAt(x, top + offset), `portrait top coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
        expect(alphaAt(x, bottom - offset), `portrait bottom coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
      }
    }
    for (let y = top; y <= bottom; y += 1) {
      for (let offset = 0; offset < SILK_COMMISSION_05_FRAME_COVERAGE_BAND; offset += 1) {
        expect(alphaAt(left + offset, y), `portrait left coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
        expect(alphaAt(right - offset, y), `portrait right coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_05_FRAME_ALPHA_THRESHOLD)
      }
    }
  })
})
