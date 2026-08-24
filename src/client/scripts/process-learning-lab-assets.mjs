import { createHash } from 'node:crypto'
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const clientRoot = path.resolve(import.meta.dirname, '..')
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const sourceRoot = path.join(clientRoot, 'assets', 'learning-lab')
const outputRoot = path.join(clientRoot, 'public', 'media', 'learning-lab')
const receiptPath = path.join(sourceRoot, 'generation-receipt.json')
const manifestPath = path.join(outputRoot, 'learning-lab-derivatives.json')

const formats = [
  { extension: 'avif', options: { quality: 50, effort: 6, chromaSubsampling: '4:2:0' } },
  { extension: 'webp', options: { quality: 78, effort: 6, smartSubsample: true } },
]

export const LEARNING_LAB_ASSETS = Object.freeze({
  'engineering-control-workbench': {
    sourcePath: 'src/client/assets/learning-lab/engineering-control-workbench.png',
    sourceSha256: '6d9c3f85ac63e7743525d269e9e86f9330101e3e6a04267711be067c6e6ce170',
    sourceWidth: 1536,
    sourceHeight: 1024,
    derivatives: [
      { variant: 'mobile', width: 720, height: 450, fit: 'cover', position: 'east' },
      { variant: 'desktop', width: 1440, height: 960, fit: 'cover', position: 'centre' },
    ],
  },
  'safe-breakage-rig': {
    sourcePath: 'src/client/assets/learning-lab/safe-breakage-rig.png',
    sourceSha256: '8e81ed32473bf50433b65f6ef5f9853f0b7e679d9ef2eee815f8bc650849d1a7',
    sourceWidth: 1536,
    sourceHeight: 1024,
    derivatives: [
      { variant: 'mobile', width: 720, height: 540, fit: 'cover', position: 'centre' },
      { variant: 'desktop', width: 1200, height: 800, fit: 'cover', position: 'centre' },
    ],
  },
  'authority-transfer': {
    sourcePath: 'src/client/assets/learning-lab/authority-transfer.png',
    sourceSha256: 'a9485800263c51185133a7dcb4647a95faf28b1a9d98da19c0215fc3e9e894db',
    sourceWidth: 1568,
    sourceHeight: 1003,
    derivatives: [
      { variant: 'mobile', width: 720, height: 461, fit: 'inside', position: 'centre' },
      { variant: 'desktop', width: 1440, height: 921, fit: 'inside', position: 'centre' },
    ],
  },
})

function publicPath(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/')
}

function sourceFile(asset) {
  return path.join(repositoryRoot, asset.sourcePath)
}

function derivativeFile(id, derivative, extension) {
  return path.join(outputRoot, `${id}-${derivative.variant}-${derivative.width}.${extension}`)
}

export function expectedDerivativeSpecs() {
  return Object.entries(LEARNING_LAB_ASSETS).flatMap(([id, asset]) => asset.derivatives.flatMap((derivative) => formats.map(({ extension }) => ({
    id,
    variant: derivative.variant,
    sourceSha256: asset.sourceSha256,
    path: publicPath(derivativeFile(id, derivative, extension)),
    width: derivative.width,
    height: derivative.height,
    format: extension,
  }))))
}

async function readJson(filePath, label) {
  try { return JSON.parse(await readFile(filePath, 'utf8')) } catch (error) { throw new Error(`Cannot read ${label}: ${error.message}`) }
}

async function assertSources() {
  const receipt = await readJson(receiptPath, 'Learning Lab generation receipt')
  for (const [id, asset] of Object.entries(LEARNING_LAB_ASSETS)) {
    const entry = receipt.assets?.find((candidate) => candidate.id === id)
    if (entry?.status !== 'accepted' || entry.outputPath !== asset.sourcePath || entry.outputSha256 !== asset.sourceSha256 || entry.width !== asset.sourceWidth || entry.height !== asset.sourceHeight) {
      throw new Error(`Generation receipt does not accept the fixed source contract for ${id}.`)
    }
    const buffer = await readFile(sourceFile(asset))
    const metadata = await sharp(buffer).metadata()
    const hash = createHash('sha256').update(buffer).digest('hex')
    if (hash !== asset.sourceSha256 || metadata.format !== 'png' || metadata.width !== asset.sourceWidth || metadata.height !== asset.sourceHeight) {
      throw new Error(`Learning Lab source identity drifted for ${id}.`)
    }
  }
}

async function check() {
  await assertSources()
  const manifest = await readJson(manifestPath, 'Learning Lab derivative manifest')
  const expected = expectedDerivativeSpecs()
  if (!Array.isArray(manifest.derivatives) || manifest.derivatives.length !== expected.length) throw new Error(`Learning Lab derivative manifest must contain ${expected.length} entries.`)
  const byPath = new Map(manifest.derivatives.map((entry) => [entry.path, entry]))
  if (byPath.size !== expected.length) throw new Error('Learning Lab derivative manifest contains duplicate paths.')
  for (const specification of expected) {
    const entry = byPath.get(specification.path)
    if (!entry) throw new Error(`Learning Lab derivative manifest is missing ${specification.path}.`)
    for (const [field, value] of Object.entries(specification)) if (entry[field] !== value) throw new Error(`Learning Lab derivative contract drifted for ${specification.path}: ${field}.`)
    if (!Number.isInteger(entry.bytes) || entry.bytes <= 0 || entry.bytes > 450_000) throw new Error(`Learning Lab derivative byte budget failed for ${specification.path}.`)
    const filePath = path.join(repositoryRoot, entry.path)
    await access(filePath)
    const [metadata, fileStats] = await Promise.all([sharp(filePath).metadata(), stat(filePath)])
    const expectedFormat = entry.format === 'avif' ? 'heif' : entry.format
    if (metadata.format !== expectedFormat || metadata.width !== entry.width || metadata.height !== entry.height || fileStats.size !== entry.bytes) throw new Error(`Learning Lab derivative metadata drifted for ${entry.path}.`)
    if (metadata.exif || metadata.icc || metadata.xmp || metadata.hasProfile) throw new Error(`Learning Lab derivative retains metadata: ${entry.path}.`)
  }
}

async function apply() {
  await assertSources()
  await mkdir(outputRoot, { recursive: true })
  const derivatives = []
  for (const [id, asset] of Object.entries(LEARNING_LAB_ASSETS)) {
    const source = await readFile(sourceFile(asset))
    for (const derivative of asset.derivatives) {
      for (const format of formats) {
        const destination = derivativeFile(id, derivative, format.extension)
        await sharp(source).rotate().resize({ width: derivative.width, height: derivative.height, fit: derivative.fit, position: derivative.position, withoutEnlargement: true }).toFormat(format.extension, format.options).toFile(destination)
        const fileStats = await stat(destination)
        const expected = expectedDerivativeSpecs().find((entry) => entry.path === publicPath(destination))
        derivatives.push({ ...expected, bytes: fileStats.size })
      }
    }
  }
  await writeFile(manifestPath, `${JSON.stringify({ generatedBy: 'src/client/scripts/process-learning-lab-assets.mjs', derivatives }, null, 2)}\n`, 'utf8')
  await check()
}

function parseMode(args) {
  if (args.length !== 1 || !['--apply', '--check'].includes(args[0])) throw new Error('Use exactly one of --apply or --check.')
  return args[0]
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const mode = parseMode(process.argv.slice(2))
    if (mode === '--apply') await apply()
    else await check()
    console.log(`Learning Lab derivatives ${mode === '--apply' ? 'generated and verified' : 'are current'}.`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
