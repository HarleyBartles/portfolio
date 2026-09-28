import { describe, expect, it } from 'vitest'
import {
  assertDerivativeReceipt,
  assertSourceIdentity,
  runValidationSteps,
} from './process-usual-specialists-assets.mjs'

describe('Usual Specialists asset processor', () => {
  it('rejects source SHA drift', () => {
    const expected = { sha256: 'approved-sha', width: 1024, height: 1536 }
    const actual = { sha256: 'different-sha', width: 1024, height: 1536, format: 'png' }

    expect(() => assertSourceIdentity(actual, expected, 'index-walk')).toThrow('SHA-256')
    expect(() => assertSourceIdentity({ ...expected, format: 'png', width: 900 }, expected, 'index-walk')).toThrow('dimensions')
    expect(() => assertSourceIdentity({ ...expected, format: 'jpeg' }, expected, 'index-walk')).toThrow('format')
  })

  it('rejects missing and extra derivative receipt entries', () => {
    const expected = [{ output: 'index-walk.webp', sourceSha256: 'source-sha', width: 320, height: 480, format: 'webp' }]

    expect(() => assertDerivativeReceipt(expected, [])).toThrow('missing')
    expect(() => assertDerivativeReceipt(expected, [...expected, { ...expected[0], output: 'extra.webp' }])).toThrow('extra')
  })

  it('runs custody before provenance and stops after a custody failure', async () => {
    const calls: string[] = []

    await expect(runValidationSteps([
      async () => { calls.push('custody'); throw new Error('custody failed') },
      async () => { calls.push('provenance') },
    ])).rejects.toThrow('custody failed')

    expect(calls).toEqual(['custody'])
  })

})
