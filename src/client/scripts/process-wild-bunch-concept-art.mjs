import { createHash } from 'node:crypto'
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const clientRoot = path.resolve(import.meta.dirname, '..')
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const sourceRoot = path.join(clientRoot, 'assets', 'wild-bunch', 'concept-art')
const outputRoot = path.join(clientRoot, 'public', 'media', 'wild-bunch')
const receiptPath = path.join(sourceRoot, 'generation-receipt.json')
const manifestPath = path.join(outputRoot, 'concept-art-derivatives.json')

const assets = Object.freeze({
  'town-arrival-landscape': {
    sourceSha256: '9d592f8840034dc9be94c541d2e1fb744f5cba55663e5881730c338628cfc21e',
    sourceWidth: 1672,
    sourceHeight: 941,
    outputWidth: 1440,
    outputHeight: 810,
  },
  'town-arrival-portrait': {
    sourceSha256: '6caa63f62e91da216054c864893e277f085b30f0b3149aacafac61c9b25456c2',
    sourceWidth: 1122,
    sourceHeight: 1402,
    outputWidth: 720,
    outputHeight: 900,
  },
})

const formats = [
  { extension: 'avif', options: { quality: 55, effort: 6, chromaSubsampling: '4:2:0' } },
  { extension: 'webp', options: { quality: 80, effort: 6, smartSubsample: true } },
]

function publicPath(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/')
}

function sourcePath(id) {
  return path.join(sourceRoot, `${id}.png`)
}

function outputPath(id, extension) {
  return path.join(outputRoot, `${id}.${extension}`)
}

function expectedSpecs() {
  return Object.entries(assets).flatMap(([id, asset]) => formats.map(({ extension }) => ({
    id,
    sourceSha256: asset.sourceSha256,
    path: publicPath(outputPath(id, extension)),
    width: asset.outputWidth,
    height: asset.outputHeight,
    format: extension,
  })))
}

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (error) {
    throw new Error(`Cannot read ${label}: ${error.message}`)
  }
}

async function assertSources() {
  const receipt = await readJson(receiptPath, 'Wild Bunch concept-art generation receipt')
  for (const [id, asset] of Object.entries(assets)) {
    const entry = receipt.assets?.find((candidate) => candidate.id === id)
    const buffer = await readFile(sourcePath(id))
    const metadata = await sharp(buffer).metadata()
    const hash = createHash('sha256').update(buffer).digest('hex')
    if (entry?.status !== 'accepted'
      || entry.outputPath !== publicPath(sourcePath(id))
      || entry.outputSha256 !== asset.sourceSha256
      || entry.width !== asset.sourceWidth
      || entry.height !== asset.sourceHeight
      || hash !== asset.sourceSha256
      || metadata.format !== 'png'
      || metadata.width !== asset.sourceWidth
      || metadata.height !== asset.sourceHeight) {
      throw new Error(`Wild Bunch concept-art source identity drifted for ${id}.`)
    }
  }
}

async function check() {
  await assertSources()
  const manifest = await readJson(manifestPath, 'Wild Bunch concept-art derivative manifest')
  const expected = expectedSpecs()
  if (!Array.isArray(manifest.derivatives) || manifest.derivatives.length !== expected.length) {
    throw new Error(`Wild Bunch concept-art derivative manifest must contain ${expected.length} entries.`)
  }
  const byPath = new Map(manifest.derivatives.map((entry) => [entry.path, entry]))
  if (byPath.size !== expected.length) throw new Error('Wild Bunch concept-art derivative manifest contains duplicate paths.')
  for (const specification of expected) {
    const entry = byPath.get(specification.path)
    if (!entry) throw new Error(`Wild Bunch concept-art derivative manifest is missing ${specification.path}.`)
    for (const [field, value] of Object.entries(specification)) {
      if (entry[field] !== value) throw new Error(`Wild Bunch concept-art derivative contract drifted for ${specification.path}: ${field}.`)
    }
    if (!Number.isInteger(entry.bytes) || entry.bytes <= 0 || entry.bytes > 450_000) {
      throw new Error(`Wild Bunch concept-art derivative byte budget failed for ${specification.path}.`)
    }
    const filePath = path.join(repositoryRoot, entry.path)
    await access(filePath)
    const [metadata, fileStats, output] = await Promise.all([sharp(filePath).metadata(), stat(filePath), readFile(filePath)])
    const expectedFormat = entry.format === 'avif' ? 'heif' : entry.format
    if (metadata.format !== expectedFormat || metadata.width !== entry.width || metadata.height !== entry.height || fileStats.size !== entry.bytes) {
      throw new Error(`Wild Bunch concept-art derivative metadata drifted for ${entry.path}.`)
    }
    if (createHash('sha256').update(output).digest('hex') !== entry.outputSha256) {
      throw new Error(`Wild Bunch concept-art derivative identity drifted for ${entry.path}.`)
    }
    if (metadata.exif || metadata.icc || metadata.xmp || metadata.hasProfile) {
      throw new Error(`Wild Bunch concept-art derivative retains metadata: ${entry.path}.`)
    }
  }
}

async function apply() {
  await assertSources()
  await mkdir(outputRoot, { recursive: true })
  const derivatives = []
  for (const [id, asset] of Object.entries(assets)) {
    const source = await readFile(sourcePath(id))
    for (const format of formats) {
      const destination = outputPath(id, format.extension)
      await sharp(source)
        .rotate()
        .resize({ width: asset.outputWidth, height: asset.outputHeight, fit: 'cover', position: 'centre' })
        .toFormat(format.extension, format.options)
        .toFile(destination)
      const [fileStats, output] = await Promise.all([stat(destination), readFile(destination)])
      const expected = expectedSpecs().find((entry) => entry.path === publicPath(destination))
      derivatives.push({ ...expected, bytes: fileStats.size, outputSha256: createHash('sha256').update(output).digest('hex') })
    }
  }
  await writeFile(manifestPath, `${JSON.stringify({ generatedBy: 'src/client/scripts/process-wild-bunch-concept-art.mjs', derivatives }, null, 2)}\n`, 'utf8')
  await check()
}

const mode = process.argv[2]
try {
  if (!['--apply', '--check'].includes(mode) || process.argv.length !== 3) throw new Error('Use exactly one of --apply or --check.')
  if (mode === '--apply') await apply()
  else await check()
  console.log(`Wild Bunch concept-art derivatives ${mode === '--apply' ? 'generated and verified' : 'are current'}.`)
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
