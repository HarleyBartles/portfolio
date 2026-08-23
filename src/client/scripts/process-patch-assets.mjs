import { createHash } from 'node:crypto'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(clientRoot, 'public', 'media', 'patch')
const manifestPath = path.join(outputRoot, 'patch-derivatives.json')

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
    sourcePath: 'workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/07_receipt_joined.png',
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

function requireSourceRoot() {
  const sourceRoot = process.env.ADVENTURES_PATCH_SOURCE_ROOT
  if (!sourceRoot || !path.isAbsolute(sourceRoot)) {
    fail('ADVENTURES_PATCH_SOURCE_ROOT must be an absolute source path; sibling layouts are never guessed.')
  }
  return sourceRoot
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

function sourceFile(sourceRoot, family, clubDbDirectory) {
  if (family !== 'clubDb') return path.join(sourceRoot, PATCH_DERIVATIVES[family].sourcePath)
  if (!clubDbDirectory || !path.isAbsolute(clubDbDirectory)) fail('--club-db-dir must be an absolute scratch directory containing rendered Club DB slides.')
  return clubDbDirectory
}

async function apply({ clubDbDirectory }) {
  const sourceRoot = requireSourceRoot()
  await mkdir(outputRoot, { recursive: true })
  const sourceManifest = {}
  const sourceInfoByFamily = {}

  for (const family of Object.keys(PATCH_DERIVATIVES)) {
    if (family === 'clubDb') {
      const firstSlide = await sourceInfo(path.join(sourceFile(sourceRoot, family, clubDbDirectory), 'slide-2.png'))
      sourceManifest[family] = firstSlide
      sourceInfoByFamily[family] = new Map([[2, firstSlide]])
      for (const slide of PATCH_DERIVATIVES.clubDb.slides.slice(1)) {
        sourceInfoByFamily[family].set(slide, await sourceInfo(path.join(sourceFile(sourceRoot, family, clubDbDirectory), `slide-${slide}.png`)))
      }
    } else {
      const info = await sourceInfo(sourceFile(sourceRoot, family, clubDbDirectory))
      sourceManifest[family] = info
      sourceInfoByFamily[family] = info
    }
  }

  const measured = []
  for (const entry of buildDerivativeManifest(sourceManifest)) {
    const info = entry.family === 'clubDb' ? sourceInfoByFamily.clubDb.get(entry.slide) : sourceInfoByFamily[entry.family]
    const destination = path.join(clientRoot, entry.path.replace(/^src\/client\//, ''))
    await sharp(info.buffer)
      .rotate()
      .resize(entry.crop
        ? { width: entry.width, height: entry.height, fit: 'cover', withoutEnlargement: true, position: 'attention' }
        : { width: entry.width, withoutEnlargement: true })
      .toFormat(entry.format, entry.encoding)
      .toFile(destination)
    const [metadata, fileStats] = await Promise.all([sharp(destination).metadata(), stat(destination)])
    if (metadata.width !== entry.width || metadata.height !== entry.height) fail(`Generated Patch derivative dimensions drifted: ${entry.path}`)
    measured.push({ ...entry, sourceSha256: info.sha256, bytes: fileStats.size })
  }

  await writeFile(manifestPath, `${JSON.stringify({ sourceRevision: PATCH_SOURCE_REVISION, images: measured }, null, 2)}\n`, 'utf8')
  return measured
}

function parseArgs(argv) {
  if (argv[0] !== '--apply') fail('Use --apply with ADVENTURES_PATCH_SOURCE_ROOT and --club-db-dir.')
  const clubDbIndex = argv.indexOf('--club-db-dir')
  return { clubDbDirectory: clubDbIndex === -1 ? undefined : argv[clubDbIndex + 1] }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await apply(parseArgs(process.argv.slice(2)))
    console.log('Patch derivatives generated with measured custody metadata.')
  } catch (error) {
    console.error(`Patch asset processing failed: ${error.message}`)
    process.exitCode = 1
  }
}
