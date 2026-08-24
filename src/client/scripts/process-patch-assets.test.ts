import { describe, expect, it } from 'vitest'
import {
  PATCH_DERIVATIVES,
  PATCH_HEIST_SOURCE_IDENTITY,
  PATCH_SOURCE_REVISION,
  assertApprovedSourceState,
  assertDerivativeReceipt,
  assertPortfolioSourceIdentity,
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
  heistFolderOpen: { width: 1600, height: 900 },
  heistIndex: { width: 1254, height: 1672 },
  heistSilk: { width: 1254, height: 1672 },
  heistWrit: { width: 1254, height: 1672 },
  heistKlause: { width: 1254, height: 1672 },
  heistRollback: { width: 1254, height: 1672 },
  heistReceipt: { width: 1254, height: 1672 },
  heistIndexMarker: { width: 1254, height: 1254 },
  heistSilkMarker: { width: 1254, height: 1254 },
  heistWritMarker: { width: 1254, height: 1254 },
  heistKlauseMarker: { width: 1254, height: 1254 },
  heistRollbackMarker: { width: 1254, height: 1254 },
  heistReceiptMarker: { width: 1254, height: 1254 },
  heistRollbackLockdown: { width: 1672, height: 941 },
  heistReceiptAlcove: { width: 1672, height: 941 },
  tournament: { width: 1600, height: 900 },
  tournamentSevenDay: { width: 1600, height: 1200 },
  tournamentHighJump: { width: 1600, height: 1200 },
  tournamentMaze: { width: 1600, height: 1200 },
  tournamentMazeMap: { width: 1600, height: 1200 },
  tournamentBitHazard: { width: 1124, height: 1448 },
  tournamentBotWrongLine: { width: 1124, height: 1448 },
  tournamentLongCourse: { width: 1600, height: 900 },
  identity: { width: 1600, height: 900 },
  identityBotFailure: { width: 1400, height: 1114 },
  identityBitAction: { width: 1124, height: 1448 },
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
    expect(PATCH_DERIVATIVES.identityBotFailure.sourcePath).toContain('cowboy_alt_chicken_chase')
    expect(PATCH_DERIVATIVES.identityBotFailure.cropFrame).toEqual({ width: 480, height: 384, position: 'center' })
    expect(PATCH_DERIVATIVES.identityBitAction.sourcePath).toContain('bit_action')
    expect(PATCH_DERIVATIVES.tournamentSevenDay.sourcePath).toContain('c1_r1_hero')
    expect(PATCH_DERIVATIVES.tournamentHighJump.sourcePath).toContain('c2_r1_hero')
    expect(PATCH_DERIVATIVES.tournamentMaze.sourcePath).toContain('c3_r2_alt_overhead_maze')
    expect(PATCH_DERIVATIVES.tournamentMazeMap.sourcePath).toContain('c3_r3_alt_annotated_map')
    expect(PATCH_DERIVATIVES.tournamentBitHazard.sourcePath).toContain('bit_hazard_tape')
    expect(PATCH_DERIVATIVES.tournamentBotWrongLine.sourcePath).toContain('bot_wrong_line')
    expect(PATCH_DERIVATIVES.tournamentLongCourse.sourcePath).toContain('c4_r2_alt_false_line_risks')
    expect(PATCH_DERIVATIVES.identityCowboy.sourcePath).toContain('cowboy-role-kit')
    expect(PATCH_DERIVATIVES.heistFolderOpen.sourcePath).toContain('01_clean_folder')
    expect(PATCH_DERIVATIVES.heist.sourcePath).toContain('07_receipt_joined')
    expect(PATCH_DERIVATIVES.heistIndex.sourcePath).toBe('build/characters/heist-crew/reference_sheets/index_hero__v1.png')
    expect(PATCH_DERIVATIVES.heistReceipt.sourcePath).toBe('build/characters/heist-crew/reference_sheets/receipt_hero__v1.png')
    expect(PATCH_DERIVATIVES.heistIndexMarker.portfolioSourcePath).toBe('src/client/assets/patch/lawful-heist/assent-index.png')
    expect(PATCH_DERIVATIVES.heistReceiptMarker.portfolioSourcePath).toBe('src/client/assets/patch/lawful-heist/assent-receipt.png')
    expect(PATCH_DERIVATIVES.heistRollbackLockdown.portfolioSourcePath).toBe('src/client/assets/patch/lawful-heist/rollback-lockdown.png')
    expect(PATCH_DERIVATIVES.heistReceiptAlcove.portfolioSourcePath).toBe('src/client/assets/patch/lawful-heist/receipt-alcove.png')
    expect(Object.keys(PATCH_DERIVATIVES).filter((key) => key.endsWith('Marker'))).toHaveLength(6)
    expect([
      PATCH_DERIVATIVES.identityCowboy,
      PATCH_DERIVATIVES.identityDetective,
      PATCH_DERIVATIVES.identityMechanic,
      PATCH_DERIVATIVES.identityChef,
    ].map(({ frame }) => frame)).toEqual(Array(4).fill({ width: 480, height: 600 }))
  })

  it('builds outputs with the custody fields required by later evidence', () => {
    const outputs = buildDerivativeManifest(fixtureManifest)

    expect(outputs).not.toHaveLength(0)
    for (const output of outputs) {
      expect(output.width).toBeGreaterThan(0)
      expect(output.height).toBeGreaterThan(0)
      expect(output.sourcePath ?? output.portfolioSourcePath ?? output.sourceObjectId).toMatch(/^(?:.+\.(png|pptx)|[a-f0-9]{40})$/)
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

  it('accepts only receipt-backed portfolio generated masters inside the client root', () => {
    const expected = {
      outputPath: 'src/client/assets/patch/lawful-heist/assent-index.png',
      outputSha256: 'approved-sha',
      width: 1254,
      height: 1254,
      status: 'accepted',
    }
    const accepted = {
      candidateWithinRoot: true,
      receiptEntry: expected,
      sha256: 'approved-sha',
      width: 1254,
      height: 1254,
    }

    expect(() => assertPortfolioSourceIdentity(accepted, expected.outputPath)).not.toThrow()
    expect(() => assertPortfolioSourceIdentity({ ...accepted, candidateWithinRoot: false }, expected.outputPath)).toThrow('inside the portfolio client root')
    expect(() => assertPortfolioSourceIdentity({ ...accepted, receiptEntry: undefined }, expected.outputPath)).toThrow('generation receipt')
    expect(() => assertPortfolioSourceIdentity({ ...accepted, sha256: 'different' }, expected.outputPath)).toThrow('SHA-256')
  })

  it('rejects arbitrary Club DB slide directories because apply renders the verified PPTX itself', () => {
    expect(() => parseArgs(['--apply', '--club-db-dir', 'C:\\untrusted-slides'])).toThrow('renders directly from the verified PPTX')
  })

  it('accepts a current receipt and rejects missing, extra, and stale entries without writing files', () => {
    const expected = [{ path: 'src/client/public/media/patch/example.avif', width: 720, height: 405, bytes: 12, sourceSha256: 'source' }]

    expect(() => assertDerivativeReceipt(expected, expected)).not.toThrow()
    expect(() => assertDerivativeReceipt(expected, [])).toThrow('missing')
    expect(() => assertDerivativeReceipt(expected, [...expected, { ...expected[0], path: 'src/client/public/media/patch/extra.avif' }])).toThrow('extra')
    expect(() => assertDerivativeReceipt(expected, [{ ...expected[0], bytes: 13 }])).toThrow('drifted')
  })
})
