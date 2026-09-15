import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { describe, expect, test } from 'vitest'
import {
  SILK_COMMISSION_08_REVIEW_ALPHA_THRESHOLD,
  SILK_COMMISSION_08_REVIEW_COVERAGE_BAND,
  SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT,
  SILK_COMMISSION_08_REVIEW_FRAME_WIDTH,
  SILK_COMMISSION_08_REVIEW_VIEWPORT,
} from './silkCommission08ReviewGeometry'

const sourcePath = path.resolve(
  process.cwd(),
  'assets/patch/the-usual-specialists/silk/silk-commission-08-reaction-frame-review.png',
)

describe('Silk Commission 08 reaction-frame geometry', () => {
  test('keeps the hidden reaction viewport behind opaque lath-and-plaster pixels', async () => {
    expect(existsSync(sourcePath), 'Commission 08 accepted master must exist in accepted Silk custody').toBe(true)

    const source = readFileSync(sourcePath)
    expect(source.byteLength).toBe(1_282_877)
    expect(createHash('sha256').update(source).digest('hex')).toBe('867b374f543a9414ab0977881cc0f8b88fd4939ad4001a7030dfeb574a053817')

    const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    expect(info.width).toBe(SILK_COMMISSION_08_REVIEW_FRAME_WIDTH)
    expect(info.height).toBe(SILK_COMMISSION_08_REVIEW_FRAME_HEIGHT)
    expect(info.channels).toBe(4)
    expect(SILK_COMMISSION_08_REVIEW_VIEWPORT).toEqual({ left: 78, right: 1991, top: 256, bottom: 487 })
    expect(SILK_COMMISSION_08_REVIEW_ALPHA_THRESHOLD).toBe(240)
    expect(SILK_COMMISSION_08_REVIEW_COVERAGE_BAND).toBe(2)
    expect((SILK_COMMISSION_08_REVIEW_VIEWPORT.right - SILK_COMMISSION_08_REVIEW_VIEWPORT.left + 1)
      / (SILK_COMMISSION_08_REVIEW_VIEWPORT.bottom - SILK_COMMISSION_08_REVIEW_VIEWPORT.top + 1)).toBe(8.25)

    const alphaAt = (x: number, y: number): number =>
      data[((y * info.width + x) * info.channels) + 3] ?? 0

    const viewport = SILK_COMMISSION_08_REVIEW_VIEWPORT
    expect(alphaAt(Math.round((viewport.left + viewport.right) / 2), Math.round((viewport.top + viewport.bottom) / 2))).toBe(0)
    expect([alphaAt(0, 0), alphaAt(info.width - 1, 0), alphaAt(0, info.height - 1), alphaAt(info.width - 1, info.height - 1)])
      .toEqual([0, 0, 0, 0])

    for (let offset = 0; offset < SILK_COMMISSION_08_REVIEW_COVERAGE_BAND; offset += 1) {
      for (let x = viewport.left; x <= viewport.right; x += 1) {
        expect(alphaAt(x, viewport.top + offset), `top coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_08_REVIEW_ALPHA_THRESHOLD)
        expect(alphaAt(x, viewport.bottom - offset), `bottom coverage leaked at x=${x}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_08_REVIEW_ALPHA_THRESHOLD)
      }
      for (let y = viewport.top; y <= viewport.bottom; y += 1) {
        expect(alphaAt(viewport.left + offset, y), `left coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_08_REVIEW_ALPHA_THRESHOLD)
        expect(alphaAt(viewport.right - offset, y), `right coverage leaked at y=${y}, offset=${offset}`)
          .toBeGreaterThanOrEqual(SILK_COMMISSION_08_REVIEW_ALPHA_THRESHOLD)
      }
    }
  })
})
