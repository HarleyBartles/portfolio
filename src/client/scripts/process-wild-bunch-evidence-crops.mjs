import { createHash } from 'node:crypto'
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const clientRoot = path.resolve(import.meta.dirname, '..')
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const outputRoot = path.join(clientRoot, 'public', 'media', 'wild-bunch')
const manifestPath = path.join(outputRoot, 'evidence-crop-derivatives.json')

const assets = Object.freeze({
  'dustwell-town-hub-focus': {
    sourcePath: path.join(outputRoot, 'dustwell-town-1200.webp'),
    sourceSha256: '03a765839f6650aaf54c4fb269fee40b727f6cd98b13f971e9fe37616912e0ba',
    sourceFormat: 'webp',
    sourceWidth: 1200,
    sourceHeight: 917,
    crop: { left: 267, top: 244, width: 667, height: 417 },
    widths: [640, 800],
  },
  'trail-map-focus': {
    sourcePath: path.join(outputRoot, 'trail-map-1200.webp'),
    sourceSha256: '7b00aecd93e3729a2c50e9df3589a52061e55bb85cfba3a09d4f57e26b83c730',
    sourceFormat: 'webp',
    sourceWidth: 1200,
    sourceHeight: 917,
    crop: { left: 300, top: 278, width: 600, height: 590 },
    widths: [480, 600],
  },
  'wanted-notice-focus': {
    sourcePath: path.join(outputRoot, 'wanted-notice-960.webp'),
    sourceSha256: 'b03e2ef23c6aabe6e00cd3f88b85282fb31af8555fd00369da90b618d7a60afc',
    sourceFormat: 'webp',
    sourceWidth: 960,
    sourceHeight: 733,
    crop: { left: 180, top: 134, width: 590, height: 599 },
    widths: [472, 590],
  },
})

const formats = [
  { extension: 'avif', options: { quality: 55, effort: 6, chromaSubsampling: '4:2:0' } },
  { extension: 'webp', options: { quality: 80, effort: 6, smartSubsample: true } },
]

function publicPath(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/')
}

function outputPath(id, width, extension) {
  return path.join(outputRoot, `${id}-${width}.${extension}`)
}

function outputHeight(asset, width) {
  return Math.round((asset.crop.height / asset.crop.width) * width)
}

function expectedSpecs() {
  return Object.entries(assets).flatMap(([id, asset]) => asset.widths.flatMap((width) => formats.map(({ extension }) => ({
    id,
    sourcePath: publicPath(asset.sourcePath),
    sourceSha256: asset.sourceSha256,
    crop: asset.crop,
    path: publicPath(outputPath(id, width, extension)),
    width,
    height: outputHeight(asset, width),
    format: extension,
  }))))
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, 'utf8'))
  } catch (error) {
    throw new Error(`Cannot read Wild Bunch evidence-crop manifest: ${error.message}`)
  }
}

async function assertSources() {
  for (const [id, asset] of Object.entries(assets)) {
    const source = await readFile(asset.sourcePath)
    const [metadata, hash] = await Promise.all([
      sharp(source).metadata(),
      Promise.resolve(createHash('sha256').update(source).digest('hex')),
    ])
    if (hash !== asset.sourceSha256
      || metadata.format !== asset.sourceFormat
      || metadata.width !== asset.sourceWidth
      || metadata.height !== asset.sourceHeight) {
      throw new Error(`Wild Bunch evidence-crop source identity drifted for ${id}.`)
    }
  }
}

async function check() {
  await assertSources()
  const manifest = await readManifest()
  const expected = expectedSpecs()
  if (!Array.isArray(manifest.derivatives) || manifest.derivatives.length !== expected.length) {
    throw new Error(`Wild Bunch evidence-crop manifest must contain ${expected.length} entries.`)
  }
  const byPath = new Map(manifest.derivatives.map((entry) => [entry.path, entry]))
  if (byPath.size !== expected.length) throw new Error('Wild Bunch evidence-crop manifest contains duplicate paths.')
  for (const specification of expected) {
    const entry = byPath.get(specification.path)
    if (!entry) throw new Error(`Wild Bunch evidence-crop manifest is missing ${specification.path}.`)
    for (const [field, value] of Object.entries(specification)) {
      if (JSON.stringify(entry[field]) !== JSON.stringify(value)) {
        throw new Error(`Wild Bunch evidence-crop contract drifted for ${specification.path}: ${field}.`)
      }
    }
    if (!Number.isInteger(entry.bytes) || entry.bytes <= 0 || entry.bytes > 250_000) {
      throw new Error(`Wild Bunch evidence-crop byte budget failed for ${specification.path}.`)
    }
    const filePath = path.join(repositoryRoot, entry.path)
    await access(filePath)
    const [metadata, fileStats, output] = await Promise.all([sharp(filePath).metadata(), stat(filePath), readFile(filePath)])
    const expectedFormat = entry.format === 'avif' ? 'heif' : entry.format
    if (metadata.format !== expectedFormat || metadata.width !== entry.width || metadata.height !== entry.height || fileStats.size !== entry.bytes) {
      throw new Error(`Wild Bunch evidence-crop metadata drifted for ${entry.path}.`)
    }
    if (createHash('sha256').update(output).digest('hex') !== entry.outputSha256) {
      throw new Error(`Wild Bunch evidence-crop identity drifted for ${entry.path}.`)
    }
    if (metadata.exif || metadata.icc || metadata.xmp || metadata.hasProfile) {
      throw new Error(`Wild Bunch evidence-crop retains metadata: ${entry.path}.`)
    }
  }
}

async function apply() {
  await assertSources()
  await mkdir(outputRoot, { recursive: true })
  const derivatives = []
  for (const [id, asset] of Object.entries(assets)) {
    const source = await readFile(asset.sourcePath)
    for (const width of asset.widths) {
      for (const format of formats) {
        const destination = outputPath(id, width, format.extension)
        await sharp(source)
          .extract(asset.crop)
          .resize({ width, height: outputHeight(asset, width), fit: 'fill' })
          .toFormat(format.extension, format.options)
          .toFile(destination)
        const [fileStats, output] = await Promise.all([stat(destination), readFile(destination)])
        const expected = expectedSpecs().find((entry) => entry.path === publicPath(destination))
        derivatives.push({ ...expected, bytes: fileStats.size, outputSha256: createHash('sha256').update(output).digest('hex') })
      }
    }
  }
  await writeFile(manifestPath, `${JSON.stringify({ generatedBy: 'src/client/scripts/process-wild-bunch-evidence-crops.mjs', derivatives }, null, 2)}\n`, 'utf8')
  await check()
}

const mode = process.argv[2]
try {
  if (!['--apply', '--check'].includes(mode) || process.argv.length !== 3) throw new Error('Use exactly one of --apply or --check.')
  if (mode === '--apply') await apply()
  else await check()
  console.log(`Wild Bunch evidence crops ${mode === '--apply' ? 'generated and verified' : 'are current'}.`)
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
