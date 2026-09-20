import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  USUAL_SPECIALISTS_ASSETS,
  USUAL_SPECIALISTS_WEBP_OPTIONS,
  assertDerivativeReceipt,
  assertSourceIdentity,
  runValidationSteps,
} from './process-usual-specialists-assets.mjs'

describe('Usual Specialists asset processor', () => {
  it('records the generation contract that produced the committed derivatives', async () => {
    const receiptPath = path.resolve(
      import.meta.dirname,
      '..',
      'public',
      'media',
      'patch',
      'the-usual-specialists',
      'usual-specialists-derivatives.json',
    )
    const receipt = JSON.parse(await readFile(receiptPath, 'utf8'))
    const processor = await import('./process-usual-specialists-assets.mjs')

    expect(receipt.generationContractSha256).toMatch(/^[a-f0-9]{64}$/)
    expect(processor.usualSpecialistsGenerationContractSource).toBeTypeOf('function')
    const rendererSource = await processor.usualSpecialistsGenerationContractSource()
    expect(rendererSource).toContain('const renderDerivative')
    expect(processor.usualSpecialistsGenerationContractSha256).toBeTypeOf('function')
    expect(receipt.generationContractSha256).toBe(await processor.usualSpecialistsGenerationContractSha256())

    const processorSource = await readFile(path.resolve(import.meta.dirname, 'process-usual-specialists-assets.mjs'), 'utf8')
    const mutatedRendererSource = processorSource.replace(
      '.resize({ width: source.asset.width, withoutEnlargement: true })',
      '.resize({ width: source.asset.width, fit: \'inside\', withoutEnlargement: true })',
    )
    expect(mutatedRendererSource).not.toBe(processorSource)
    expect(processor.usualSpecialistsGenerationContractSha256From(mutatedRendererSource))
      .not.toBe(processor.usualSpecialistsGenerationContractSha256From(processorSource))
  })

  it('locks the accepted WebP derivative contract', () => {
    const outputs = USUAL_SPECIALISTS_ASSETS.map(({ output }) => output)

    expect(USUAL_SPECIALISTS_ASSETS).toHaveLength(16)
    expect(outputs).toContain('safehouse-threshold.webp')
    expect(outputs).toContain('index-high-step.webp')
    expect(outputs).toContain('index-outcome-folder.webp')
    expect(outputs).toContain('index-return.webp')
    expect(outputs).toContain('patch-return.webp')
    expect(outputs).toContain('under-construction-patch-lockup.webp')
    expect(USUAL_SPECIALISTS_ASSETS.every(({ format }) => format === 'webp')).toBe(true)
    expect(USUAL_SPECIALISTS_WEBP_OPTIONS).toEqual({ quality: 82, alphaQuality: 100, effort: 6, smartSubsample: true })
  })

  it('keeps the accepted Index outcome source in production custody', () => {
    expect(USUAL_SPECIALISTS_ASSETS).toContainEqual(expect.objectContaining({
      id: 'index-outcome-folder',
      source: 'index-outcome-folder.png',
      output: 'index-outcome-folder.webp',
      width: 1200,
    }))
  })

  it('keeps the accepted under-construction lockup in route-level custody', () => {
    expect(USUAL_SPECIALISTS_ASSETS).toContainEqual(expect.objectContaining({
      id: 'under-construction-patch-lockup',
      sourcePackage: 'under-construction',
      source: 'under-construction-patch-lockup.png',
      output: 'under-construction-patch-lockup.webp',
      width: 1200,
    }))
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
