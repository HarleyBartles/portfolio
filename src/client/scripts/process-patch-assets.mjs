import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(clientRoot, 'public', 'media', 'patch')
const manifestPath = path.join(outputRoot, 'patch-derivatives.json')
const execFileAsync = promisify(execFile)

export const PATCH_SOURCE_REVISION = '0240a8657aae5b580c1a7a0d31e0be7a68b27f4e'

const formats = ['avif', 'webp']
const encoding = {
  avif: { quality: 52, effort: 6, chromaSubsampling: '4:2:0' },
  webp: { quality: 78, effort: 6, smartSubsample: true },
}

export const PATCH_DERIVATIVES = {
  hero: {
    sourcePath: 'published/misc/introducing-patch/source_images/page_base_desktop__v1.png',
    sourceStatus: 'accepted',
    widths: [720, 1440],
    formats,
    byteBudgetClass: 'hero',
    crop: 'mobile_safe_patch',
  },
  introducingPage: {
    sourcePath: 'published/misc/introducing-patch/page__v1.png',
    sourceStatus: 'published',
    widths: [640, 1200],
    formats,
    byteBudgetClass: 'page',
  },
  goldilocks: {
    sourcePath: 'published/fairytales/goldilocks/page__right_amount_of_guidance__v1.png',
    sourceStatus: 'published',
    widths: [640, 1200],
    formats,
    byteBudgetClass: 'page',
  },
  sorcerersApprentice: {
    sourcePath: 'published/fairytales/sorcerers-apprentice/page__delegation_without_boundaries__v1.png',
    sourceStatus: 'published',
    widths: [640, 1200],
    formats,
    byteBudgetClass: 'page',
  },
  clubDb: {
    sourcePath: 'published/adventures/club_db_bouncer_queue_v6_canonical.pptx',
    sourceStatus: 'legacy_reference',
    slides: [2, 4, 14],
    widths: [1200],
    formats,
    byteBudgetClass: 'support',
  },
  heist: {
    sourcePath: 'lawful-heist/receipt-folder/07_receipt_joined.png',
    sourceStatus: 'advanced_visual_preproduction',
    widths: [1200],
    formats,
    byteBudgetClass: 'support',
  },
  tournament: {
    sourcePath: 'build/adventures/Tournament/long-course-route-check-booth/source_images/source_02_patch_at_route_check_booth__v1.png',
    sourceStatus: 'visual_development',
    widths: [1200],
    formats,
    byteBudgetClass: 'support',
  },
  identity: {
    sourcePath: 'build/environments/identity-emporium/reference_sheets/world_proof__v1.png',
    sourceStatus: 'legacy_reference',
    widths: [1200],
    formats,
    byteBudgetClass: 'support',
  },
}

function fail(message) {
  throw new Error(message)
}

export function assertApprovedSourceState({ revision, dirty, isWorktree = true, rootMatches = true }) {
  if (!isWorktree || !rootMatches) fail('ADVENTURES_PATCH_SOURCE_ROOT must resolve to its clean Git worktree root.')
  if (revision !== PATCH_SOURCE_REVISION) fail(`ADVENTURES_PATCH_SOURCE_ROOT must be at ${PATCH_SOURCE_REVISION}, got ${revision}.`)
  if (dirty) fail('ADVENTURES_PATCH_SOURCE_ROOT must be clean before Patch assets are applied or checked.')
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

function heightFor(source, width) {
  return Math.round((source.height / source.width) * width)
}

function outputStem(family, slide) {
  return slide
    ? `patch-${family}-slide-${slide}`
    : `patch-${family.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`
}

export function buildDerivativeManifest(sourceManifest) {
  return Object.entries(PATCH_DERIVATIVES).flatMap(([family, definition]) => {
    const source = sourceManifest[family]
    if (!source?.width || !source?.height) fail(`Missing intrinsic dimensions for ${family}.`)
    const slides = definition.slides ?? [undefined]
    return slides.flatMap((slide) => definition.widths.flatMap((width) => definition.formats.map((format) => ({
      family,
      ...(slide ? { slide } : {}),
      sourcePath: definition.sourcePath,
      sourceRevision: PATCH_SOURCE_REVISION,
      sourceStatus: definition.sourceStatus,
      width,
      height: heightFor(source, width),
      format,
      encoding: encoding[format],
      byteBudgetClass: definition.byteBudgetClass,
      path: `src/client/public/media/patch/${outputStem(family, slide)}-${width}.${format}`,
      ...(definition.crop ? { crop: definition.crop } : {}),
    }))))
  })
}

function requireSourceRoot(sourceRoot = process.env.ADVENTURES_PATCH_SOURCE_ROOT) {
  if (!sourceRoot || !path.isAbsolute(sourceRoot)) {
    fail('ADVENTURES_PATCH_SOURCE_ROOT must be an absolute source path; sibling layouts are never guessed.')
  }
  return sourceRoot
}

async function sourceWorktreeState(sourceRoot) {
  const root = requireSourceRoot(sourceRoot)
  try {
    const [inside, topLevel, revision, porcelain] = await Promise.all([
      execFileAsync('git', ['-C', root, 'rev-parse', '--is-inside-work-tree'], { encoding: 'utf8' }),
      execFileAsync('git', ['-C', root, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }),
      execFileAsync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }),
      execFileAsync('git', ['-C', root, 'status', '--porcelain=v1'], { encoding: 'utf8' }),
    ])
    return {
      isWorktree: inside.stdout.trim() === 'true',
      rootMatches: path.resolve(topLevel.stdout.trim()) === path.resolve(root),
      revision: revision.stdout.trim(),
      dirty: porcelain.stdout.trim().length > 0,
    }
  } catch (error) {
    fail(`Cannot verify ADVENTURES_PATCH_SOURCE_ROOT as a Git worktree: ${error.message}`)
  }
}

async function verifySourceRoot(sourceRoot) {
  const state = await sourceWorktreeState(sourceRoot)
  assertApprovedSourceState(state)
  return requireSourceRoot(sourceRoot)
}

async function sourceInfo(filePath) {
  const buffer = await readFile(filePath).catch((error) => fail(`Cannot read required Patch source ${filePath}: ${error.message}`))
  const metadata = await sharp(buffer).metadata()
  if (!metadata.width || !metadata.height) fail(`Patch source has no intrinsic dimensions: ${filePath}`)
  return {
    buffer,
    width: metadata.width,
    height: metadata.height,
    sha256: createHash('sha256').update(buffer).digest('hex'),
  }
}

function sourceFile(sourceRoot, family, clubDbDirectory, heistSource) {
  if (family === 'heist') {
    if (!heistSource || !path.isAbsolute(heistSource)) fail('--heist-source must be an absolute Lawful Heist source path.')
    return heistSource
  }
  if (family !== 'clubDb') return path.join(sourceRoot, PATCH_DERIVATIVES[family].sourcePath)
  if (!clubDbDirectory || !path.isAbsolute(clubDbDirectory)) fail('--club-db-dir must be an absolute scratch directory containing rendered Club DB slides.')
  return clubDbDirectory
}

async function loadSourceInputs({ sourceRoot: suppliedSourceRoot, clubDbDirectory, heistSource }) {
  const sourceRoot = await verifySourceRoot(suppliedSourceRoot)
  const sourceManifest = {}
  const sourceInfoByFamily = {}

  for (const family of Object.keys(PATCH_DERIVATIVES)) {
    if (family === 'clubDb') {
      const firstSlide = await sourceInfo(path.join(sourceFile(sourceRoot, family, clubDbDirectory, heistSource), 'slide-2.png'))
      sourceManifest[family] = firstSlide
      sourceInfoByFamily[family] = new Map([[2, firstSlide]])
      for (const slide of PATCH_DERIVATIVES.clubDb.slides.slice(1)) {
        sourceInfoByFamily[family].set(slide, await sourceInfo(path.join(sourceFile(sourceRoot, family, clubDbDirectory, heistSource), `slide-${slide}.png`)))
      }
    } else {
      const info = await sourceInfo(sourceFile(sourceRoot, family, clubDbDirectory, heistSource))
      sourceManifest[family] = info
      sourceInfoByFamily[family] = info
    }
  }
  return { sourceManifest, sourceInfoByFamily }
}

async function renderDerivative(entry, info) {
  return sharp(info.buffer)
    .rotate()
    .resize(entry.crop
      ? { width: entry.width, height: entry.height, fit: 'cover', withoutEnlargement: true, position: 'attention' }
      : { width: entry.width, withoutEnlargement: true })
    .toFormat(entry.format, entry.encoding)
    .toBuffer()
}

function entryInfo(entry, sourceInfoByFamily) {
  return entry.family === 'clubDb' ? sourceInfoByFamily.clubDb.get(entry.slide) : sourceInfoByFamily[entry.family]
}

async function apply(options) {
  const { sourceManifest, sourceInfoByFamily } = await loadSourceInputs(options)
  await mkdir(outputRoot, { recursive: true })

  const measured = []
  for (const entry of buildDerivativeManifest(sourceManifest)) {
    const info = entryInfo(entry, sourceInfoByFamily)
    const destination = path.join(clientRoot, entry.path.replace(/^src\/client\//, ''))
    const generated = await renderDerivative(entry, info)
    await writeFile(destination, generated)
    const [metadata, fileStats] = await Promise.all([sharp(generated).metadata(), stat(destination)])
    if (metadata.width !== entry.width || metadata.height !== entry.height) fail(`Generated Patch derivative dimensions drifted: ${entry.path}`)
    measured.push({ ...entry, sourceSha256: info.sha256, bytes: fileStats.size })
  }

  await writeFile(manifestPath, `${JSON.stringify({ sourceRevision: PATCH_SOURCE_REVISION, images: measured }, null, 2)}\n`, 'utf8')
  return measured
}

async function check(options) {
  const { sourceManifest, sourceInfoByFamily } = await loadSourceInputs(options)
  const receipt = JSON.parse(await readFile(manifestPath, 'utf8').catch((error) => fail(`Cannot read Patch derivative receipt: ${error.message}`)))
  if (receipt.sourceRevision !== PATCH_SOURCE_REVISION || !Array.isArray(receipt.images)) fail('Patch derivative receipt is stale or malformed.')
  const expected = buildDerivativeManifest(sourceManifest).map((entry) => ({ ...entry, sourceSha256: entryInfo(entry, sourceInfoByFamily).sha256 }))
  assertDerivativeReceipt(expected, receipt.images)
  for (const entry of receipt.images) {
    const destination = path.join(clientRoot, entry.path.replace(/^src\/client\//, ''))
    const [actual, metadata, fileStats, generated] = await Promise.all([
      readFile(destination).catch((error) => fail(`Patch derivative is missing: ${entry.path}: ${error.message}`)),
      sharp(destination).metadata().catch((error) => fail(`Cannot inspect Patch derivative ${entry.path}: ${error.message}`)),
      stat(destination).catch((error) => fail(`Cannot stat Patch derivative ${entry.path}: ${error.message}`)),
      renderDerivative(entry, entryInfo(entry, sourceInfoByFamily)),
    ])
    if (metadata.width !== entry.width || metadata.height !== entry.height || fileStats.size !== entry.bytes) fail(`Patch derivative dimensions or bytes drifted: ${entry.path}`)
    if (!actual.equals(generated)) fail(`Patch derivative output is stale: ${entry.path}`)
  }
}

function parseArgs(argv) {
  if (!['--apply', '--check'].includes(argv[0])) fail('Use --apply or --check with ADVENTURES_PATCH_SOURCE_ROOT, --club-db-dir, and --heist-source.')
  const clubDbIndex = argv.indexOf('--club-db-dir')
  const heistIndex = argv.indexOf('--heist-source')
  return { mode: argv[0].slice(2), clubDbDirectory: clubDbIndex === -1 ? undefined : argv[clubDbIndex + 1], heistSource: heistIndex === -1 ? undefined : argv[heistIndex + 1] }
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
