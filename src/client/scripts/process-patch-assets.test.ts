import { describe, expect, it } from 'vitest'
import {
  PATCH_DERIVATIVES,
  PATCH_HEIST_SOURCE_IDENTITY,
  PATCH_SOURCE_REVISION,
  assertApprovedSourceState,
  assertDerivativeReceipt,
  assertTrackedSourceIdentity,
  buildDerivativeManifest,
  parseArgs,
} from './process-patch-assets.mjs'

const fixtureManifest = {
  hero: { width: 2400, height: 1350 },
  introducingPage: { width: 2400, height: 1350 },
  introducingPagePortrait: { width: 1080, height: 1920 },
  goldilocks: { width: 2400, height: 1350 },
  goldilocksPortrait: { width: 1080, height: 1920 },
  sorcerersApprentice: { width: 2400, height: 1350 },
  clubDb: { width: 1600, height: 900 },
  heist: { width: 1600, height: 900 },
  tournament: { width: 1600, height: 900 },
  identity: { width: 1600, height: 900 },
  identityBotRoleKit: { width: 1536, height: 1008 },
  identityCowboy: { width: 1254, height: 1254 },
  identityDetective: { width: 1086, height: 1448 },
  identityMechanic: { width: 1122, height: 1402 },
  identityChef: { width: 1122, height: 1402 },
}

describe('Patch asset processor', () => {
  it('locks the reviewed derivative definitions', () => {
    expect(PATCH_DERIVATIVES.hero.widths).toEqual([720, 1440])
    expect(PATCH_DERIVATIVES.hero.formats).toEqual(['avif', 'webp'])
    expect(PATCH_DERIVATIVES.clubDb.slides).toEqual([2, 4, 14])
    expect(PATCH_DERIVATIVES.introducingPagePortrait.sourcePath).toBe('published/misc/introducing-patch/page__v1-mobile.png')
    expect(PATCH_DERIVATIVES.goldilocksPortrait.sourcePath).toBe('published/fairytales/goldilocks/page__right_amount_of_guidance__v1-mobile.png')
    expect(PATCH_DERIVATIVES.identity.sourceStatus).toBe('legacy_reference')
    expect(PATCH_DERIVATIVES.identityBotRoleKit.sourceStatus).toBe('accepted')
    expect(PATCH_DERIVATIVES.identityCowboy.sourcePath).toContain('cowboy-role-kit')
    expect(PATCH_DERIVATIVES.heist.sourcePath).toBeUndefined()
  })

  it('builds outputs with the custody fields required by later evidence', () => {
    const outputs = buildDerivativeManifest(fixtureManifest)

    expect(outputs).not.toHaveLength(0)
    for (const output of outputs) {
      expect(output.width).toBeGreaterThan(0)
      expect(output.height).toBeGreaterThan(0)
      expect(output.sourcePath ?? output.sourceObjectId).toMatch(/^(?:.+\.(png|pptx)|[a-f0-9]{40})$/)
      expect(output.sourceRevision).toBe(PATCH_SOURCE_REVISION)
      expect(output.encoding).toEqual(expect.objectContaining({ quality: expect.any(Number) }))
      expect(output.byteBudgetClass).toMatch(/^(hero|page|support)$/)
    }
  })

  it('rejects a dirty or revision-mismatched Adventures worktree', () => {
    expect(() => assertApprovedSourceState({ revision: 'different', dirty: false })).toThrow(PATCH_SOURCE_REVISION)
    expect(() => assertApprovedSourceState({ revision: PATCH_SOURCE_REVISION, dirty: true })).toThrow('clean')
  })

  it('rejects an external, untracked, or mismatched Heist input instead of lending it the pinned revision', () => {
    const accepted = {
      candidateWithinRoot: true,
      revisionObjectId: PATCH_HEIST_SOURCE_IDENTITY.gitObjectId,
      workingTreeObjectId: PATCH_HEIST_SOURCE_IDENTITY.gitObjectId,
      sha256: PATCH_HEIST_SOURCE_IDENTITY.sha256,
    }

    expect(() => assertTrackedSourceIdentity({ ...accepted, candidateWithinRoot: false }, PATCH_HEIST_SOURCE_IDENTITY)).toThrow('inside ADVENTURES_PATCH_SOURCE_ROOT')
    expect(() => assertTrackedSourceIdentity({ ...accepted, revisionObjectId: undefined }, PATCH_HEIST_SOURCE_IDENTITY)).toThrow('tracked at the pinned revision')
    expect(() => assertTrackedSourceIdentity({ ...accepted, workingTreeObjectId: 'different' }, PATCH_HEIST_SOURCE_IDENTITY)).toThrow('Git object identity')
    expect(() => assertTrackedSourceIdentity({ ...accepted, sha256: 'different' }, PATCH_HEIST_SOURCE_IDENTITY)).toThrow('SHA-256')
  })

  it('rejects arbitrary Club DB slide directories because apply renders the verified PPTX itself', () => {
    expect(() => parseArgs(['--apply', '--club-db-dir', 'C:\\untrusted-slides', '--heist-source', 'C:\\source\\receipt.png'])).toThrow('renders directly from the verified PPTX')
  })

  it('accepts a current receipt and rejects missing, extra, and stale entries without writing files', () => {
    const expected = [{ path: 'src/client/public/media/patch/example.avif', width: 720, height: 405, bytes: 12, sourceSha256: 'source' }]

    expect(() => assertDerivativeReceipt(expected, expected)).not.toThrow()
    expect(() => assertDerivativeReceipt(expected, [])).toThrow('missing')
    expect(() => assertDerivativeReceipt(expected, [...expected, { ...expected[0], path: 'src/client/public/media/patch/extra.avif' }])).toThrow('extra')
    expect(() => assertDerivativeReceipt(expected, [{ ...expected[0], bytes: 13 }])).toThrow('drifted')
  })
})
