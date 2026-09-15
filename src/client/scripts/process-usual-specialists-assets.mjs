import { createHash } from 'node:crypto'
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { validateUsualSpecialistsProvenance } from './validate-usual-specialists-provenance.mjs'

const clientRoot = path.resolve(import.meta.dirname, '..')
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const specialistsSourceRoot = path.join(clientRoot, 'assets', 'patch', 'the-usual-specialists')
const acceptedPackageRoots = Object.freeze({
  index: path.join(specialistsSourceRoot, 'index'),
  silk: path.join(specialistsSourceRoot, 'silk'),
  rope: path.join(specialistsSourceRoot, 'rope'),
})
const candidateManifestPaths = Object.freeze({
  silk: path.join(
    acceptedPackageRoots.silk,
    'candidates',
    'receipt-hole-peek-cutout-review',
    'candidate-assets.json',
  ),
})
const outputRoot = path.join(clientRoot, 'public', 'media', 'patch', 'the-usual-specialists')
const receiptPath = path.join(outputRoot, 'usual-specialists-derivatives.json')

export const USUAL_SPECIALISTS_WEBP_OPTIONS = Object.freeze({
  quality: 82,
  alphaQuality: 100,
  effort: 6,
  smartSubsample: true,
})

const RECEIPT_PEEKTHROUGH_MINERAL_FIELD = Object.freeze({
  blue: 235,
  green: 234,
  mineralStartRadiusRatio: 0.48,
  preserveRadiusRatio: 0.40,
  red: 230,
})

export const USUAL_SPECIALISTS_ASSETS = Object.freeze([
  { id: 'safehouse-threshold', source: 'safehouse-threshold.png', output: 'safehouse-threshold.webp', width: 1672, format: 'webp' },
  {
    id: 'opening-rope-start-anchor',
    source: 'opening-rope-start-anchor.png',
    output: 'opening-rope-start-anchor.webp',
    width: 640,
    crop: { left: 0, top: 0, width: 1254, height: 1205 },
    format: 'webp',
  },
  { id: 'index-desktop-base', source: 'index-desktop-base.png', output: 'index-desktop-base.webp', width: 1672, format: 'webp' },
  { id: 'index-assent-note', source: 'index-assent-note.png', output: 'index-assent-note.webp', width: 480, format: 'webp' },
  { id: 'index-blue-carrier', source: 'index-blue-carrier.png', output: 'index-blue-carrier.webp', width: 1240, format: 'webp' },
  { id: 'index-graph-paper', source: 'index-graph-paper.png', output: 'index-graph-paper.webp', width: 1140, format: 'webp' },
  { id: 'index-observation', source: 'index-observation.png', output: 'index-observation.webp', width: 1320, format: 'webp' },
  { id: 'index-macguffin', source: 'index-macguffin.png', output: 'index-macguffin.webp', width: 1200, format: 'webp' },
  { id: 'index-walk', source: 'index-walk.png', output: 'index-walk.webp', width: 320, format: 'webp' },
  { id: 'index-inspect', source: 'index-inspect.png', output: 'index-inspect.webp', width: 320, format: 'webp' },
  { id: 'index-high-step', source: 'index-high-step.png', output: 'index-high-step.webp', width: 320, format: 'webp' },
  { id: 'index-return', source: 'index-return.png', output: 'index-return.webp', width: 320, format: 'webp' },
  { id: 'patch-follow', source: 'patch-follow.png', output: 'patch-follow.webp', width: 320, format: 'webp' },
  { id: 'patch-leaning', source: 'patch-leaning.png', output: 'patch-leaning.webp', width: 320, format: 'webp' },
  { id: 'patch-return', source: 'patch-return.png', output: 'patch-return.webp', width: 320, format: 'webp' },
  {
    id: 'silk-commission-05-aperture-rim-heavy',
    sourcePackage: 'silk',
    source: 'silk-commission-05-aperture-rim-heavy.png',
    output: 'silk-commission-05-aperture-rim-heavy.webp',
    width: 1672,
    format: 'webp',
  },
  {
    id: 'silk-commission-05-aperture-rim-heavy-portrait',
    sourcePackage: 'silk',
    source: 'silk-commission-05-aperture-rim-heavy-portrait.png',
    output: 'silk-commission-05-aperture-rim-heavy-portrait.webp',
    width: 1024,
    format: 'webp',
  },
  {
    id: 'silk-commission-05-corridor',
    sourcePackage: 'silk',
    source: 'silk-commission-05-corridor.png',
    output: 'silk-commission-05-corridor.webp',
    width: 1086,
    format: 'webp',
  },
  {
    id: 'silk-commission-06-threshold-crossing',
    sourcePackage: 'silk',
    source: 'silk-commission-06-threshold-crossing.png',
    output: 'silk-commission-06-threshold-crossing.webp',
    width: 720,
    format: 'webp',
  },
  {
    id: 'silk-commission-06-abseil-hands-free',
    sourcePackage: 'silk',
    source: 'silk-commission-06-abseil-hands-free.png',
    output: 'silk-commission-06-abseil-hands-free.webp',
    width: 720,
    format: 'webp',
  },
  {
    id: 'silk-commission-07-frame-review',
    sourcePackage: 'silk',
    source: 'silk-commission-07-frame-review.png',
    output: 'silk-commission-07-frame-review.webp',
    width: 1671,
    format: 'webp',
  },
  {
    id: 'silk-commission-07-frame-review-portrait',
    sourcePackage: 'silk',
    source: 'silk-commission-07-frame-review-portrait.png',
    output: 'silk-commission-07-frame-review-portrait.webp',
    width: 941,
    format: 'webp',
  },
  {
    id: 'silk-commission-07-service-corridor-review',
    sourcePackage: 'silk',
    source: 'silk-commission-07-service-corridor-review.png',
    output: 'silk-commission-07-service-corridor-review.webp',
    width: 1672,
    format: 'webp',
  },
  {
    id: 'silk-commission-08-reaction-frame-review',
    sourcePackage: 'silk',
    source: 'silk-commission-08-reaction-frame-review.png',
    output: 'silk-commission-08-reaction-frame-review.webp',
    width: 1750,
    format: 'webp',
  },
  {
    id: 'silk-receipt-peekthrough-frame-review',
    sourcePackage: 'silk',
    source: 'silk-receipt-peekthrough-frame-review.png',
    output: 'silk-receipt-peekthrough-frame-review.webp',
    width: 1254,
    mineralFieldCorrection: RECEIPT_PEEKTHROUGH_MINERAL_FIELD,
    format: 'webp',
  },
  {
    id: 'silk-receipt-hole-peek-cutout-review',
    sourcePackage: 'silk',
    source: 'silk-receipt-hole-peek-cutout-review.png',
    output: 'silk-receipt-hole-peek-cutout-review.webp',
    width: 720,
    format: 'webp',
  },
  {
    id: 'silk-index-crossing-anchor-ring',
    sourcePackage: 'silk',
    source: 'silk-index-crossing-anchor-ring.png',
    output: 'silk-index-crossing-anchor-ring.webp',
    width: 512,
    format: 'webp',
  },
  {
    id: 'silk-index-crossing-knot-foreground',
    sourcePackage: 'silk',
    source: 'silk-index-crossing-knot-foreground.png',
    output: 'silk-index-crossing-knot-foreground.webp',
    width: 1145,
    format: 'webp',
  },
  {
    id: 'silk-index-crossing-knot-foreground-crop',
    sourcePackage: 'silk',
    source: 'silk-index-crossing-knot-foreground-crop.png',
    output: 'silk-index-crossing-knot-foreground-crop.webp',
    width: 470,
    format: 'webp',
  },
  {
    id: 'silk-index-crossing-ring-occluder',
    sourcePackage: 'silk',
    source: 'silk-index-crossing-ring-occluder.png',
    output: 'silk-index-crossing-ring-occluder.webp',
    width: 512,
    format: 'webp',
  },
  { id: 'rope-loose-a', sourcePackage: 'rope', source: 'rope-loose-a.png', output: 'rope-loose-a.webp', width: 724, format: 'webp' },
  { id: 'rope-loose-b', sourcePackage: 'rope', source: 'rope-loose-b.png', output: 'rope-loose-b.webp', width: 724, format: 'webp' },
  { id: 'rope-loose-c', sourcePackage: 'rope', source: 'rope-loose-c.png', output: 'rope-loose-c.webp', width: 724, format: 'webp' },
  { id: 'rope-terminal-curl', sourcePackage: 'rope', source: 'rope-terminal-curl.png', output: 'rope-terminal-curl.webp', width: 724, format: 'webp' },
  { id: 'rope-taut-straight', sourcePackage: 'rope', source: 'rope-taut-straight.png', output: 'rope-taut-straight.webp', width: 724, format: 'webp' },
  { id: 'rope-taut-bow', sourcePackage: 'rope', source: 'rope-taut-bow.png', output: 'rope-taut-bow.webp', width: 724, format: 'webp' },
  { id: 'rope-taut-offset', sourcePackage: 'rope', source: 'rope-taut-offset.png', output: 'rope-taut-offset.webp', width: 724, format: 'webp' },
])

export const USUAL_SPECIALISTS_CANDIDATE_ASSETS = Object.freeze([])

const USUAL_SPECIALISTS_PROCESSABLE_ASSETS = Object.freeze([
  ...USUAL_SPECIALISTS_ASSETS,
  ...USUAL_SPECIALISTS_CANDIDATE_ASSETS,
])

const fail = (message) => {
  throw new Error(message)
}

const sha256 = (buffer) => {
  return createHash('sha256').update(buffer).digest('hex')
}

const repositoryPath = (filePath) => {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/')
}

export const assertSourceIdentity = (actual, expected, id) => {
  if (actual.sha256 !== expected.sha256) fail(`Usual Specialists source SHA-256 drifted for ${id}.`)
  if (actual.width !== expected.width || actual.height !== expected.height) fail(`Usual Specialists source dimensions drifted for ${id}.`)
  if (actual.format !== 'png') fail(`Usual Specialists source format drifted for ${id}.`)
}

export const assertDerivativeReceipt = (expected, actual) => {
  if (!Array.isArray(actual)) fail('Usual Specialists derivative receipt is malformed.')
  const actualByOutput = new Map(actual.map((entry) => [entry.output, entry]))
  if (actualByOutput.size !== actual.length) fail('Usual Specialists derivative receipt contains duplicate outputs.')
  for (const expectedEntry of expected) {
    const received = actualByOutput.get(expectedEntry.output)
    if (!received) fail(`Usual Specialists derivative receipt is missing ${expectedEntry.output}.`)
    for (const [field, value] of Object.entries(expectedEntry)) {
      if (JSON.stringify(received[field]) !== JSON.stringify(value)) fail(`Usual Specialists derivative receipt drifted for ${expectedEntry.output}: ${field}.`)
    }
  }
  for (const received of actual) {
    if (!expected.some((entry) => entry.output === received.output)) fail(`Usual Specialists derivative receipt has extra ${received.output}.`)
  }
}

const readJson = async (filePath, label) => {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (error) {
    fail(`Cannot read ${label}: ${error.message}`)
  }
}

const sourcePackageFor = (asset) => asset.sourcePackage ?? 'index'
const custodyFor = (asset) => asset.custody ?? 'accepted'

const loadCustodiedSources = async () => {
  const manifests = new Map()
  const groups = new Map()
  for (const asset of USUAL_SPECIALISTS_PROCESSABLE_ASSETS) {
    const packageName = sourcePackageFor(asset)
    const custody = custodyFor(asset)
    const key = `${custody}:${packageName}`
    const grouped = groups.get(key) ?? { packageName, custody, assets: [] }
    grouped.assets.push(asset)
    groups.set(key, grouped)
  }

  for (const [key, group] of groups) {
    const { packageName, custody, assets: packageAssets } = group
    const packageRoot = acceptedPackageRoots[packageName]
    if (!packageRoot) fail(`Unknown Usual Specialists source package: ${packageName}.`)
    const manifestPath = custody === 'candidate'
      ? candidateManifestPaths[packageName]
      : path.join(packageRoot, 'accepted-assets.json')
    if (!manifestPath) fail(`Unknown Usual Specialists ${custody} manifest for package: ${packageName}.`)
    const manifest = await readJson(
      manifestPath,
      `Usual Specialists ${packageName} ${custody} source manifest`,
    )
    if (!Array.isArray(manifest.assets) || manifest.assets.length !== packageAssets.length) {
      fail(`Usual Specialists ${packageName} ${custody} source manifest must contain ${packageAssets.length} assets.`)
    }
    const byId = new Map(manifest.assets.map((entry) => [entry.id, entry]))
    if (byId.size !== manifest.assets.length) fail(`Usual Specialists ${packageName} ${custody} source manifest contains duplicate ids.`)
    manifests.set(key, byId)
  }

  const sources = new Map()
  for (const asset of USUAL_SPECIALISTS_PROCESSABLE_ASSETS) {
    const packageName = sourcePackageFor(asset)
    const custody = custodyFor(asset)
    const packageRoot = acceptedPackageRoots[packageName]
    const sourceRecord = manifests.get(`${custody}:${packageName}`)?.get(asset.id)
    if (!sourceRecord) fail(`Usual Specialists ${custody} source manifest is missing ${asset.id}.`)
    const sourcePath = path.join(packageRoot, asset.source)
    const expectedRepositoryPath = repositoryPath(sourcePath)
    const expectedStatus = custody === 'candidate' ? 'candidate' : 'accepted'
    if (
      sourceRecord.repositorySourcePath !== expectedRepositoryPath
      || sourceRecord.status !== expectedStatus
      || sourceRecord.rightsOwner !== 'Harley Bartles'
      || (custody === 'candidate' && sourceRecord.selection !== 'page-review')
    ) {
      fail(`Usual Specialists ${custody} source custody drifted for ${asset.id}.`)
    }
    const buffer = await readFile(sourcePath).catch((error) => fail(`Cannot read Usual Specialists source ${asset.source}: ${error.message}`))
    const metadata = await sharp(buffer).metadata()
    const actual = { sha256: sha256(buffer), width: metadata.width, height: metadata.height, format: metadata.format }
    assertSourceIdentity(actual, sourceRecord, asset.id)
    sources.set(asset.id, { asset, sourceRecord, buffer })
  }
  return sources
}

const expectedDerivative = (asset, sourceRecord) => {
  const sourceWidth = asset.crop?.width ?? sourceRecord.width
  const sourceHeight = asset.crop?.height ?? sourceRecord.height
  const width = Math.min(asset.width, sourceWidth)
  const height = Math.round((sourceHeight / sourceWidth) * width)
  return {
    id: asset.id,
    sourcePath: sourceRecord.repositorySourcePath,
    sourceSha256: sourceRecord.sha256,
    output: asset.output,
    path: repositoryPath(path.join(outputRoot, asset.output)),
    width,
    height,
    format: asset.format,
    encoding: USUAL_SPECIALISTS_WEBP_OPTIONS,
    ...(asset.mineralFieldCorrection ? { mineralFieldCorrection: asset.mineralFieldCorrection } : {}),
  }
}

const smoothstep = (value) => value * value * (3 - (2 * value))

const normalizeMineralField = async (source) => {
  const correction = source.asset.mineralFieldCorrection
  if (!correction) return sharp(source.buffer)

  const { data, info } = await sharp(source.buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const centreX = (info.width - 1) / 2
  const centreY = (info.height - 1) / 2
  const radiusUnit = Math.min(info.width, info.height)
  const preserveRadius = radiusUnit * correction.preserveRadiusRatio
  const mineralStartRadius = radiusUnit * correction.mineralStartRadiusRatio
  const blendDistance = mineralStartRadius - preserveRadius

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const distance = Math.hypot(x - centreX, y - centreY)
      if (distance <= preserveRadius) continue

      const blendProgress = blendDistance <= 0
        ? 1
        : Math.min(1, Math.max(0, (distance - preserveRadius) / blendDistance))
      const mineralWeight = smoothstep(blendProgress)
      const sourceWeight = 1 - mineralWeight
      const offset = ((y * info.width) + x) * info.channels

      data[offset] = Math.round((data[offset] * sourceWeight) + (correction.red * mineralWeight))
      data[offset + 1] = Math.round((data[offset + 1] * sourceWeight) + (correction.green * mineralWeight))
      data[offset + 2] = Math.round((data[offset + 2] * sourceWeight) + (correction.blue * mineralWeight))
      data[offset + 3] = Math.round((data[offset + 3] * sourceWeight) + (255 * mineralWeight))
    }
  }

  return sharp(data, {
    raw: {
      channels: info.channels,
      height: info.height,
      width: info.width,
    },
  })
}

const renderDerivative = async (source) => {
  const image = await normalizeMineralField(source)
  if (source.asset.crop) image.extract(source.asset.crop)
  return image
    .resize({ width: source.asset.width, withoutEnlargement: true })
    .webp(USUAL_SPECIALISTS_WEBP_OPTIONS)
    .toBuffer()
}

const checkOutput = async (entry, source, receiptEntry) => {
  const destination = path.join(outputRoot, entry.output)
  await access(destination).catch((error) => fail(`Usual Specialists derivative is missing ${entry.output}: ${error.message}`))
  const [actual, metadata, fileStats, expectedBuffer] = await Promise.all([
    readFile(destination),
    sharp(destination).metadata(),
    stat(destination),
    renderDerivative(source),
  ])
  if (metadata.format !== 'webp' || metadata.width !== entry.width || metadata.height !== entry.height) fail(`Usual Specialists derivative dimensions or format drifted for ${entry.output}.`)
  if (metadata.exif || metadata.icc || metadata.xmp || metadata.hasProfile) fail(`Usual Specialists derivative retains metadata: ${entry.output}.`)
  if (fileStats.size !== receiptEntry.bytes || sha256(actual) !== receiptEntry.outputSha256) fail(`Usual Specialists derivative identity drifted for ${entry.output}.`)
  if (!actual.equals(expectedBuffer)) fail(`Usual Specialists derivative output is stale for ${entry.output}.`)
}

export const runValidationSteps = async (steps) => {
  for (const step of steps) await step()
}

const checkCustodyAndDerivatives = async () => {
  const sources = await loadCustodiedSources()
  const receipt = await readJson(receiptPath, 'Usual Specialists derivative receipt')
  if (receipt.generatedBy !== 'src/client/scripts/process-usual-specialists-assets.mjs' || !Array.isArray(receipt.derivatives)) fail('Usual Specialists derivative receipt is stale or malformed.')
  const expected = USUAL_SPECIALISTS_PROCESSABLE_ASSETS.map((asset) => expectedDerivative(asset, sources.get(asset.id).sourceRecord))
  assertDerivativeReceipt(expected, receipt.derivatives)
  for (const entry of expected) {
    const receiptEntry = receipt.derivatives.find((candidate) => candidate.output === entry.output)
    if (!Number.isInteger(receiptEntry.bytes) || receiptEntry.bytes <= 0 || receiptEntry.bytes > 450_000) fail(`Usual Specialists derivative byte budget failed for ${entry.output}.`)
    if (typeof receiptEntry.outputSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(receiptEntry.outputSha256)) fail(`Usual Specialists derivative hash is malformed for ${entry.output}.`)
    await checkOutput(entry, sources.get(entry.id), receiptEntry)
  }
}

const check = async () => {
  await runValidationSteps([
    checkCustodyAndDerivatives,
    validateUsualSpecialistsProvenance,
  ])
}

const apply = async () => {
  const sources = await loadCustodiedSources()
  await mkdir(outputRoot, { recursive: true })
  const derivatives = []
  for (const asset of USUAL_SPECIALISTS_PROCESSABLE_ASSETS) {
    const source = sources.get(asset.id)
    const entry = expectedDerivative(asset, source.sourceRecord)
    const output = await renderDerivative(source)
    const destination = path.join(outputRoot, asset.output)
    await writeFile(destination, output)
    const metadata = await sharp(output).metadata()
    if (metadata.width !== entry.width || metadata.height !== entry.height || metadata.format !== 'webp') fail(`Generated Usual Specialists derivative dimensions drifted for ${asset.output}.`)
    if (metadata.exif || metadata.icc || metadata.xmp || metadata.hasProfile) fail(`Generated Usual Specialists derivative retains metadata: ${asset.output}.`)
    derivatives.push({ ...entry, bytes: output.byteLength, outputSha256: sha256(output) })
  }
  await writeFile(receiptPath, `${JSON.stringify({ generatedBy: 'src/client/scripts/process-usual-specialists-assets.mjs', derivatives }, null, 2)}\n`, 'utf8')
  await check()
}

const parseMode = (args) => {
  if (args.length !== 1 || !['--apply', '--check'].includes(args[0])) fail('Use exactly one of --apply or --check.')
  return args[0]
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const mode = parseMode(process.argv.slice(2))
    if (mode === '--apply') await apply()
    else await check()
    console.log(`Usual Specialists derivatives ${mode === '--apply' ? 'generated and verified' : 'are current'}.`)
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
