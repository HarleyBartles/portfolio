import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(clientRoot, 'public', 'media', 'patch')
const manifestPath = path.join(outputRoot, 'patch-derivatives.json')
const generationReceiptPath = path.join(clientRoot, 'assets', 'patch', 'lawful-heist', 'generation-receipt.json')
const generationReceiptRepositoryPath = 'src/client/assets/patch/lawful-heist/generation-receipt.json'
const execFileAsync = promisify(execFile)

export const PATCH_SOURCE_REVISION = '13bf77adc63cf5c8f49363cedd5dd392822b8375'
export const PATCH_HEIST_SOURCE_IDENTITY = Object.freeze({
  gitObjectId: '5d718ee449173bea4374e707a5d1b20ed9d57101',
  sha256: 'b653f2159851d0c1acd10fdf526323f55964aa941669536dfbdb87be40a5f5ab',
})
export const CLUB_DB_RENDERER = Object.freeze({
  name: 'Microsoft PowerPoint',
  version: 'COM Slide.Export PNG',
  tool: 'render-patch-club-db-slides.ps1',
})

const clubDbRendererScript = path.join(path.dirname(fileURLToPath(import.meta.url)), 'render-patch-club-db-slides.ps1')
const formats = ['avif', 'webp']
const encoding = {
  avif: { quality: 52, effort: 6, chromaSubsampling: '4:2:0' },
  webp: { quality: 78, effort: 6, smartSubsample: true },
}

export const PATCH_DERIVATIVES = {
  hero: { sourcePath: 'published/misc/introducing-patch/source_images/page_base_desktop__v1.png', sourceStatus: 'accepted', widths: [720, 1440], formats, byteBudgetClass: 'hero', crop: 'mobile_safe_patch' },
  introducingPage: { sourcePath: 'published/misc/introducing-patch/page__v1.png', sourceStatus: 'published', widths: [640, 1200], formats, byteBudgetClass: 'page' },
  introducingPagePortrait: { sourcePath: 'published/misc/introducing-patch/page__v1-mobile.png', sourceStatus: 'published', widths: [640], formats, byteBudgetClass: 'page' },
  goldilocks: { sourcePath: 'published/fairytales/goldilocks/page__right_amount_of_guidance__v1.png', sourceStatus: 'published', widths: [640, 1200], formats, byteBudgetClass: 'page' },
  goldilocksPortrait: { sourcePath: 'published/fairytales/goldilocks/page__right_amount_of_guidance__v1-mobile.png', sourceStatus: 'published', widths: [640], formats, byteBudgetClass: 'page' },
  sorcerersApprentice: { sourcePath: 'published/fairytales/sorcerers-apprentice/page__delegation_without_boundaries__v1.png', sourceStatus: 'published', widths: [640, 1200], formats, byteBudgetClass: 'page' },
  clubDb: { sourcePath: 'published/adventures/club_db_bouncer_queue_v6_canonical.pptx', sourceStatus: 'legacy_reference', slides: [2, 4, 14], widths: [1200], formats, byteBudgetClass: 'support' },
  heist: { sourcePath: 'workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/07_receipt_joined.png', sourceStatus: 'advanced_visual_preproduction', widths: [1200], formats, byteBudgetClass: 'support', sourceIdentity: PATCH_HEIST_SOURCE_IDENTITY },
  heistFolderOpen: { sourcePath: 'workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/01_clean_folder_and_recruitment_list.png', sourceStatus: 'advanced_visual_preproduction', widths: [1200], formats, byteBudgetClass: 'support' },
  heistIndex: { sourcePath: 'build/characters/heist-crew/reference_sheets/index_hero__v1.png', sourceStatus: 'accepted', widths: [560], formats, byteBudgetClass: 'support' },
  heistSilk: { sourcePath: 'build/characters/heist-crew/reference_sheets/silk_hero__v1.png', sourceStatus: 'accepted', widths: [560], formats, byteBudgetClass: 'support' },
  heistWrit: { sourcePath: 'build/characters/heist-crew/reference_sheets/writ_hero__v1.png', sourceStatus: 'accepted', widths: [560], formats, byteBudgetClass: 'support' },
  heistKlause: { sourcePath: 'build/characters/heist-crew/reference_sheets/klause_hero__v1.png', sourceStatus: 'accepted', widths: [560], formats, byteBudgetClass: 'support' },
  heistRollback: { sourcePath: 'build/characters/heist-crew/reference_sheets/rollback_hero__v1.png', sourceStatus: 'accepted', widths: [560], formats, byteBudgetClass: 'support' },
  heistReceipt: { sourcePath: 'build/characters/heist-crew/reference_sheets/receipt_hero__v1.png', sourceStatus: 'accepted', widths: [560], formats, byteBudgetClass: 'support' },
  heistIndexMarker: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/assent-index.png', sourceStatus: 'accepted', widths: [420], formats, byteBudgetClass: 'support' },
  heistSilkMarker: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/assent-silk.png', sourceStatus: 'accepted', widths: [420], formats, byteBudgetClass: 'support' },
  heistWritMarker: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/assent-writ.png', sourceStatus: 'accepted', widths: [420], formats, byteBudgetClass: 'support' },
  heistKlauseMarker: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/assent-klause.png', sourceStatus: 'accepted', widths: [420], formats, byteBudgetClass: 'support' },
  heistRollbackMarker: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/assent-rollback.png', sourceStatus: 'accepted', widths: [420], formats, byteBudgetClass: 'support' },
  heistReceiptMarker: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/assent-receipt.png', sourceStatus: 'accepted', widths: [420], formats, byteBudgetClass: 'support' },
  heistRollbackLockdown: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/rollback-lockdown.png', sourceStatus: 'accepted', widths: [1200], formats, byteBudgetClass: 'support' },
  heistReceiptAlcove: { portfolioSourcePath: 'src/client/assets/patch/lawful-heist/receipt-alcove.png', sourceStatus: 'accepted', widths: [1200], formats, byteBudgetClass: 'support' },
  tournament: { sourcePath: 'build/adventures/Tournament/long-course-route-check-booth/source_images/source_02_patch_at_route_check_booth__v1.png', sourceStatus: 'visual_development', widths: [1200], formats, byteBudgetClass: 'support' },
  tournamentSevenDay: { sourcePath: 'build/adventures/Tournament/tournament-trial-environments/source_images/c1_r1_hero__v1.png', sourceStatus: 'visual_development', widths: [1200], formats, byteBudgetClass: 'support' },
  tournamentHighJump: { sourcePath: 'build/adventures/Tournament/tournament-trial-environments/source_images/c2_r1_hero__v1.png', sourceStatus: 'visual_development', widths: [1200], formats, byteBudgetClass: 'support' },
  tournamentMaze: { sourcePath: 'build/adventures/Tournament/tournament-trial-environments/source_images/c3_r2_alt_overhead_maze__v1.png', sourceStatus: 'visual_development', widths: [1120], formats, byteBudgetClass: 'support' },
  tournamentMazeMap: { sourcePath: 'build/adventures/Tournament/tournament-trial-environments/source_images/c3_r3_alt_annotated_map__v1.png', sourceStatus: 'visual_development', widths: [1200], formats, byteBudgetClass: 'support' },
  tournamentBitHazard: { sourcePath: 'build/adventures/Tournament/patch-bit-bot-tournament-kit/source_images/bit_hazard_tape__v1.png', sourceStatus: 'visual_development', widths: [560], formats, byteBudgetClass: 'support' },
  tournamentBotWrongLine: { sourcePath: 'build/adventures/Tournament/patch-bit-bot-tournament-kit/source_images/bot_wrong_line__v1.png', sourceStatus: 'visual_development', widths: [560], formats, byteBudgetClass: 'support' },
  tournamentLongCourse: { sourcePath: 'build/adventures/Tournament/tournament-trial-environments/source_images/c4_r2_alt_false_line_risks__v1.png', sourceStatus: 'visual_development', widths: [1200], formats, byteBudgetClass: 'support' },
  identity: { sourcePath: 'build/environments/identity-emporium/reference_sheets/world_proof__v1.png', sourceStatus: 'legacy_reference', widths: [1200], formats, byteBudgetClass: 'support' },
  identityBotFailure: { sourcePath: 'build/characters/bit-bot/bot-role-kit/source_images/cowboy_alt_chicken_chase__v1.png', sourceStatus: 'accepted', widths: [480], formats, byteBudgetClass: 'support', cropFrame: { width: 480, height: 384, position: 'center' } },
  identityBitAction: { sourcePath: 'build/characters/bit-bot/bit-and-bot/source_images/bit_action__v1.png', sourceStatus: 'accepted', widths: [480], formats, byteBudgetClass: 'support' },
  identityCowboy: { sourcePath: 'build/canon/patch/role-kits/cowboy-role-kit/source_images/hero_patch_cowboy_waistcoat__v1.png', sourceStatus: 'visual_development', widths: [480], formats, byteBudgetClass: 'support', frame: { width: 480, height: 600 } },
  identityDetective: { sourcePath: 'build/canon/patch/role-kits/detective-role-kit/source_images/hero_patch_detective__v1.png', sourceStatus: 'visual_development', widths: [480], formats, byteBudgetClass: 'support', frame: { width: 480, height: 600 } },
  identityMechanic: { sourcePath: 'build/canon/patch/role-kits/mechanic-role-kit/source_images/hero_full_body__v1.png', sourceStatus: 'visual_development', widths: [480], formats, byteBudgetClass: 'support', frame: { width: 480, height: 600 } },
  identityChef: { sourcePath: 'build/canon/patch/role-kits/chef-role-kit/source_images/hero_front__v1.png', sourceStatus: 'visual_development', widths: [480], formats, byteBudgetClass: 'support', frame: { width: 480, height: 600 } },
}

function fail(message) { throw new Error(message) }
function sha256(buffer) { return createHash('sha256').update(buffer).digest('hex') }

function isInsideRoot(root, candidate) {
  const relative = path.relative(path.resolve(root), path.resolve(candidate))
  return relative !== '' && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative)
}

function repositoryPath(root, candidate) {
  return path.relative(path.resolve(root), path.resolve(candidate)).split(path.sep).join('/')
}

export function assertApprovedSourceState({ revision, dirty, isWorktree = true, rootMatches = true }) {
  if (!isWorktree || !rootMatches) fail('ADVENTURES_PATCH_SOURCE_ROOT must resolve to its clean Git worktree root.')
  if (revision !== PATCH_SOURCE_REVISION) fail(`ADVENTURES_PATCH_SOURCE_ROOT must be at ${PATCH_SOURCE_REVISION}, got ${revision}.`)
  if (dirty) fail('ADVENTURES_PATCH_SOURCE_ROOT must be clean before Patch assets are applied or checked.')
}

export function assertTrackedSourceIdentity({ candidateWithinRoot, revisionObjectId, workingTreeObjectId, sha256: sourceSha256 }, expected = {}) {
  if (!candidateWithinRoot) fail('Patch source must be inside ADVENTURES_PATCH_SOURCE_ROOT.')
  if (!revisionObjectId) fail('Patch source must be tracked at the pinned revision.')
  if (revisionObjectId !== workingTreeObjectId) fail('Patch source Git object identity does not match the pinned revision.')
  if (expected.gitObjectId !== undefined && revisionObjectId !== expected.gitObjectId) fail('Patch source Git object identity is not the approved custody object.')
  if (expected.sha256 !== undefined && sourceSha256 !== expected.sha256) fail('Patch source SHA-256 is not the approved custody checksum.')
}

export function assertPortfolioSourceIdentity({ candidateWithinRoot, receiptEntry, sha256: sourceSha256, width, height }, expectedPath) {
  if (!candidateWithinRoot) fail('Portfolio-generated source must be inside the portfolio client root.')
  if (!receiptEntry || receiptEntry.outputPath !== expectedPath || receiptEntry.status !== 'accepted') fail(`Portfolio-generated source must have an accepted generation receipt entry for ${expectedPath}.`)
  if (sourceSha256 !== receiptEntry.outputSha256) fail(`Portfolio-generated source SHA-256 drifted for ${expectedPath}.`)
  if (width !== receiptEntry.width || height !== receiptEntry.height) fail(`Portfolio-generated source dimensions drifted for ${expectedPath}.`)
}

export function assertDerivativeReceipt(expected, actual) {
  const actualByPath = new Map(actual.map((entry) => [entry.path, entry]))
  if (actualByPath.size !== actual.length) fail('Patch derivative receipt contains duplicate paths.')
  for (const entry of expected) {
    const received = actualByPath.get(entry.path)
    if (!received) fail(`Patch derivative receipt is missing ${entry.path}.`)
    for (const [field, value] of Object.entries(entry)) {
      if (JSON.stringify(received[field]) !== JSON.stringify(value)) fail(`Patch derivative receipt drifted for ${entry.path}: ${field}.`)
    }
  }
  for (const entry of actual) {
    if (!expected.some((candidate) => candidate.path === entry.path)) fail(`Patch derivative receipt has extra ${entry.path}.`)
  }
}

function heightFor(source, width) { return Math.round((source.height / source.width) * width) }
function outputStem(family, slide) { return slide ? `patch-${family}-slide-${slide}` : `patch-${family.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}` }

export function buildDerivativeManifest(sourceManifest) {
  return Object.entries(PATCH_DERIVATIVES).flatMap(([family, definition]) => {
    const source = sourceManifest[family]
    if (!source?.width || !source?.height) fail(`Missing intrinsic dimensions for ${family}.`)
    const slides = definition.slides ?? [undefined]
    return slides.flatMap((slide) => definition.widths.flatMap((width) => definition.formats.map((format) => ({
      family,
      ...(slide ? { slide } : {}),
      ...(definition.sourcePath ? { sourcePath: definition.sourcePath } : { portfolioSourcePath: definition.portfolioSourcePath, sourceCustody: 'portfolio-generated', generationReceiptPath: generationReceiptRepositoryPath }),
      sourceRevision: PATCH_SOURCE_REVISION,
      sourceStatus: definition.sourceStatus,
      width,
      height: definition.frame?.height ?? definition.cropFrame?.height ?? heightFor(source, width),
      format,
      encoding: encoding[format],
      byteBudgetClass: definition.byteBudgetClass,
      ...(definition.frame ? { frame: definition.frame } : {}),
      ...(definition.cropFrame ? { cropFrame: definition.cropFrame } : {}),
      path: `src/client/public/media/patch/${outputStem(family, slide)}-${width}.${format}`,
      ...(definition.crop ? { crop: definition.crop } : {}),
    }))))
  })
}

function requireSourceRoot(sourceRoot = process.env.ADVENTURES_PATCH_SOURCE_ROOT) {
  if (!sourceRoot || !path.isAbsolute(sourceRoot)) fail('ADVENTURES_PATCH_SOURCE_ROOT must be an absolute source path; sibling layouts are never guessed.')
  return path.resolve(sourceRoot)
}

async function gitOutput(sourceRoot, args) {
  const result = await execFileAsync('git', ['-C', sourceRoot, ...args], { encoding: 'utf8' })
  return result.stdout.trim()
}

async function sourceWorktreeState(sourceRoot) {
  const root = requireSourceRoot(sourceRoot)
  try {
    const [inside, topLevel, revision, porcelain] = await Promise.all([
      gitOutput(root, ['rev-parse', '--is-inside-work-tree']), gitOutput(root, ['rev-parse', '--show-toplevel']),
      gitOutput(root, ['rev-parse', 'HEAD']), gitOutput(root, ['status', '--porcelain=v1']),
    ])
    return { isWorktree: inside === 'true', rootMatches: path.resolve(topLevel) === root, revision, dirty: porcelain.length > 0 }
  } catch (error) { fail(`Cannot verify ADVENTURES_PATCH_SOURCE_ROOT as a Git worktree: ${error.message}`) }
}

async function verifySourceRoot(sourceRoot) {
  const root = requireSourceRoot(sourceRoot)
  assertApprovedSourceState(await sourceWorktreeState(root))
  return root
}

async function sourceInfo(filePath, identity) {
  const buffer = await readFile(filePath).catch((error) => fail(`Cannot read required Patch source ${filePath}: ${error.message}`))
  const metadata = await sharp(buffer).metadata()
  if (!metadata.width || !metadata.height) fail(`Patch source has no intrinsic dimensions: ${filePath}`)
  return { buffer, width: metadata.width, height: metadata.height, sha256: sha256(buffer), gitObjectId: identity.gitObjectId ?? identity.workingTreeObjectId }
}

async function verifyTrackedSource(sourceRoot, candidatePath, expectedIdentity) {
  const candidateWithinRoot = isInsideRoot(sourceRoot, candidatePath)
  const relativePath = candidateWithinRoot ? repositoryPath(sourceRoot, candidatePath) : undefined
  const revisionObjectId = relativePath === undefined ? undefined : await gitOutput(sourceRoot, ['rev-parse', `${PATCH_SOURCE_REVISION}:${relativePath}`]).catch(() => undefined)
  const workingTreeObjectId = candidateWithinRoot ? await gitOutput(sourceRoot, ['hash-object', path.resolve(candidatePath)]).catch(() => undefined) : undefined
  const buffer = candidateWithinRoot ? await readFile(candidatePath).catch(() => undefined) : undefined
  const sourceSha256 = buffer === undefined ? undefined : sha256(buffer)
  assertTrackedSourceIdentity({ candidateWithinRoot, revisionObjectId, workingTreeObjectId, sha256: sourceSha256 }, expectedIdentity)
  return { candidatePath: path.resolve(candidatePath), buffer, sha256: sourceSha256, gitObjectId: workingTreeObjectId }
}

async function verifiedImageSource(sourceRoot, candidatePath, expectedIdentity) {
  const identity = await verifyTrackedSource(sourceRoot, candidatePath, expectedIdentity)
  return sourceInfo(identity.candidatePath, identity)
}

async function verifiedPortfolioImageSource(definition, generationReceipt) {
  const candidatePath = path.join(clientRoot, definition.portfolioSourcePath.replace(/^src\/client\//, ''))
  const candidateWithinRoot = isInsideRoot(clientRoot, candidatePath)
  const buffer = candidateWithinRoot ? await readFile(candidatePath).catch(() => undefined) : undefined
  if (!buffer) fail(`Cannot read required portfolio-generated source ${definition.portfolioSourcePath}.`)
  const metadata = await sharp(buffer).metadata()
  const receiptEntry = generationReceipt.records.find((entry) => entry.outputPath === definition.portfolioSourcePath)
  const identity = { candidateWithinRoot, receiptEntry, sha256: sha256(buffer), width: metadata.width, height: metadata.height }
  assertPortfolioSourceIdentity(identity, definition.portfolioSourcePath)
  return { buffer, width: metadata.width, height: metadata.height, sha256: identity.sha256, sourceCustody: 'portfolio-generated', generationReceiptPath: generationReceiptRepositoryPath }
}

async function renderClubDbSlides(pptxPath) {
  if (process.platform !== 'win32') fail('Club DB derivatives can only be applied on Windows with the named presentation renderer.')
  const scratch = await mkdtemp(path.join(tmpdir(), 'patch-club-db-'))
  try {
    await execFileAsync('powershell.exe', ['-NoProfile', '-STA', '-ExecutionPolicy', 'Bypass', '-File', clubDbRendererScript, '-Pptx', pptxPath, '-OutputDirectory', scratch], { encoding: 'utf8' })
    const slides = new Map()
    for (const slide of PATCH_DERIVATIVES.clubDb.slides) slides.set(slide, await sourceInfo(path.join(scratch, `slide-${slide}.png`), { workingTreeObjectId: undefined }))
    return slides
  } catch (error) { fail(`Cannot render verified Club DB PPTX with ${CLUB_DB_RENDERER.name}: ${error.message}`) } finally {
    await rm(scratch, { recursive: true, force: true })
  }
}

async function loadSourceInputs({ sourceRoot: suppliedSourceRoot }, renderClubDb) {
  const sourceRoot = await verifySourceRoot(suppliedSourceRoot)
  const generationReceipt = JSON.parse(await readFile(generationReceiptPath, 'utf8').catch((error) => fail(`Cannot read Lawful Heist generation receipt: ${error.message}`)))
  if (generationReceipt.sourceRevision !== PATCH_SOURCE_REVISION || !Array.isArray(generationReceipt.records)) fail('Lawful Heist generation receipt is stale or malformed.')
  const sourceManifest = {}
  const sourceInfoByFamily = {}
  for (const [family, definition] of Object.entries(PATCH_DERIVATIVES)) {
    if (family === 'clubDb') continue
    const info = definition.portfolioSourcePath
      ? await verifiedPortfolioImageSource(definition, generationReceipt)
      : await verifiedImageSource(sourceRoot, path.join(sourceRoot, definition.sourcePath), definition.sourceIdentity)
    sourceManifest[family] = info
    sourceInfoByFamily[family] = info
  }
  const pptx = await verifyTrackedSource(sourceRoot, path.join(sourceRoot, PATCH_DERIVATIVES.clubDb.sourcePath))
  if (renderClubDb) {
    const slides = await renderClubDbSlides(pptx.candidatePath)
    sourceManifest.clubDb = slides.get(PATCH_DERIVATIVES.clubDb.slides[0])
    sourceInfoByFamily.clubDb = slides
  } else sourceManifest.clubDb = { width: 1600, height: 900 }
  return { sourceManifest, sourceInfoByFamily, pptx }
}

async function renderDerivative(entry, info) {
  if (entry.cropFrame) {
    return sharp(info.buffer)
      .rotate()
      .resize({ width: entry.cropFrame.width, height: entry.cropFrame.height, fit: 'cover', position: entry.cropFrame.position })
      .toFormat(entry.format, entry.encoding)
      .toBuffer()
  }
  if (entry.frame) {
    const inset = 32
    const subject = await sharp(info.buffer)
      .rotate()
      .trim({ background: '#fff', threshold: 10 })
      .resize({ width: entry.frame.width - (inset * 2), height: entry.frame.height - (inset * 2), fit: 'inside' })
      .png()
      .toBuffer({ resolveWithObject: true })
    const left = Math.round((entry.frame.width - subject.info.width) / 2)
    const top = entry.frame.height - inset - subject.info.height
    return sharp({ create: { width: entry.frame.width, height: entry.frame.height, channels: 3, background: '#fff' } })
      .composite([{ input: subject.data, left, top }])
      .toFormat(entry.format, entry.encoding)
      .toBuffer()
  }
  return sharp(info.buffer).rotate().resize(entry.crop ? { width: entry.width, height: entry.height, fit: 'cover', withoutEnlargement: true, position: 'attention' } : { width: entry.width, withoutEnlargement: true }).toFormat(entry.format, entry.encoding).toBuffer()
}

function entryInfo(entry, sourceInfoByFamily) { return entry.family === 'clubDb' ? sourceInfoByFamily.clubDb.get(entry.slide) : sourceInfoByFamily[entry.family] }

function custodyEntry(entry, info, pptx) {
  const record = { ...entry, sourceGitObjectId: info?.gitObjectId, sourceSha256: info?.sha256 }
  return entry.family === 'clubDb' ? { ...record, sourceGitObjectId: pptx.gitObjectId, sourcePptxSha256: pptx.sha256, renderedSlideSha256: info.sha256, renderer: CLUB_DB_RENDERER } : record
}

async function apply(options) {
  const { sourceManifest, sourceInfoByFamily, pptx } = await loadSourceInputs(options, true)
  await mkdir(outputRoot, { recursive: true })
  const measured = []
  for (const entry of buildDerivativeManifest(sourceManifest)) {
    const info = entryInfo(entry, sourceInfoByFamily)
    const destination = path.join(clientRoot, entry.path.replace(/^src\/client\//, ''))
    const generated = await renderDerivative(entry, info)
    await writeFile(destination, generated)
    const [metadata, fileStats] = await Promise.all([sharp(generated).metadata(), stat(destination)])
    if (metadata.width !== entry.width || metadata.height !== entry.height) fail(`Generated Patch derivative dimensions drifted: ${entry.path}`)
    measured.push({ ...custodyEntry(entry, info, pptx), bytes: fileStats.size, outputSha256: sha256(generated) })
  }
  await writeFile(manifestPath, `${JSON.stringify({ sourceRevision: PATCH_SOURCE_REVISION, images: measured }, null, 2)}\n`, 'utf8')
  return measured
}

function assertClubDbReceipt(entry, pptx) {
  if (entry.sourceGitObjectId !== pptx.gitObjectId || entry.sourcePptxSha256 !== pptx.sha256) fail(`Club DB receipt source identity drifted: ${entry.path}`)
  if (JSON.stringify(entry.renderer) !== JSON.stringify(CLUB_DB_RENDERER)) fail(`Club DB receipt renderer drifted: ${entry.path}`)
  if (entry.sourceSha256 !== entry.renderedSlideSha256 || !/^[a-f0-9]{64}$/.test(entry.renderedSlideSha256 ?? '')) fail(`Club DB receipt slide identity is malformed: ${entry.path}`)
}

async function check(options) {
  const { sourceManifest, sourceInfoByFamily, pptx } = await loadSourceInputs(options, false)
  const receipt = JSON.parse(await readFile(manifestPath, 'utf8').catch((error) => fail(`Cannot read Patch derivative receipt: ${error.message}`)))
  if (receipt.sourceRevision !== PATCH_SOURCE_REVISION || !Array.isArray(receipt.images)) fail('Patch derivative receipt is stale or malformed.')
  const expected = buildDerivativeManifest(sourceManifest).map((entry) => entry.family === 'clubDb'
    ? { ...entry, sourceGitObjectId: pptx.gitObjectId, sourcePptxSha256: pptx.sha256, renderer: CLUB_DB_RENDERER }
    : custodyEntry(entry, entryInfo(entry, sourceInfoByFamily), pptx))
  assertDerivativeReceipt(expected, receipt.images)
  for (const entry of receipt.images) {
    const destination = path.join(clientRoot, entry.path.replace(/^src\/client\//, ''))
    const [actual, metadata, fileStats] = await Promise.all([readFile(destination).catch((error) => fail(`Patch derivative is missing: ${entry.path}: ${error.message}`)), sharp(destination).metadata().catch((error) => fail(`Cannot inspect Patch derivative ${entry.path}: ${error.message}`)), stat(destination).catch((error) => fail(`Cannot stat Patch derivative ${entry.path}: ${error.message}`))])
    if (metadata.width !== entry.width || metadata.height !== entry.height || fileStats.size !== entry.bytes || sha256(actual) !== entry.outputSha256) fail(`Patch derivative dimensions, bytes, or checksum drifted: ${entry.path}`)
    if (entry.family === 'clubDb') { assertClubDbReceipt(entry, pptx); continue }
    if (!actual.equals(await renderDerivative(entry, entryInfo(entry, sourceInfoByFamily)))) fail(`Patch derivative output is stale: ${entry.path}`)
  }
}

export function parseArgs(argv) {
  if (!['--apply', '--check'].includes(argv[0])) fail('Use --apply or --check with ADVENTURES_PATCH_SOURCE_ROOT.')
  if (argv.includes('--club-db-dir')) fail('Club DB renders directly from the verified PPTX; arbitrary slide directories are not accepted.')
  if (argv.includes('--heist-source')) fail('Lawful Heist sources are pinned in the processor; --heist-source is no longer accepted.')
  return { mode: argv[0].slice(2) }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArgs(process.argv.slice(2))
    await (options.mode === 'apply' ? apply(options) : check(options))
    console.log(options.mode === 'apply' ? 'Patch derivatives generated with measured custody metadata.' : 'Patch derivatives and receipt are current.')
  } catch (error) {
    console.error(`Patch asset processing failed: ${error.message}`)
    process.exitCode = 1
  }
}
