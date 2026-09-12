import { describe, expect, it } from 'vitest'
import {
  USUAL_SPECIALISTS_ASSETS,
  USUAL_SPECIALISTS_WEBP_OPTIONS,
  assertDerivativeReceipt,
  assertSourceIdentity,
} from './process-usual-specialists-assets.mjs'

describe('Usual Specialists asset processor', () => {
  it('locks the accepted WebP derivative contract', () => {
    expect(USUAL_SPECIALISTS_ASSETS).toHaveLength(14)
    expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('safehouse-threshold.webp')
    expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('index-high-step.webp')
    expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('index-return.webp')
    expect(USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)).toContain('patch-return.webp')
    expect(USUAL_SPECIALISTS_ASSETS.every(({ format }) => format === 'webp')).toBe(true)
    expect(USUAL_SPECIALISTS_WEBP_OPTIONS).toEqual({ quality: 82, alphaQuality: 100, effort: 6, smartSubsample: true })
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
})
