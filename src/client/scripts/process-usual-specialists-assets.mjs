import { createHash } from 'node:crypto'
import { access, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const clientRoot = path.resolve(import.meta.dirname, '..')
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const sourceRoot = path.join(clientRoot, 'assets', 'patch', 'the-usual-specialists', 'index')
const acceptedAssetsPath = path.join(sourceRoot, 'accepted-assets.json')
const outputRoot = path.join(clientRoot, 'public', 'media', 'patch', 'the-usual-specialists')
const receiptPath = path.join(outputRoot, 'usual-specialists-derivatives.json')

export const USUAL_SPECIALISTS_WEBP_OPTIONS = Object.freeze({
  quality: 82,
  alphaQuality: 100,
  effort: 6,
  smartSubsample: true,
})

export const USUAL_SPECIALISTS_ASSETS = Object.freeze([
  { id: 'safehouse-threshold', source: 'safehouse-threshold.png', output: 'safehouse-threshold.webp', width: 1672, format: 'webp' },
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
])

function fail(message) {
  throw new Error(message)
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

function repositoryPath(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join('/')
}

export function assertSourceIdentity(actual, expected, id) {
  if (actual.sha256 !== expected.sha256) fail(`Usual Specialists source SHA-256 drifted for ${id}.`)
  if (actual.width !== expected.width || actual.height !== expected.height) fail(`Usual Specialists source dimensions drifted for ${id}.`)
  if (actual.format !== 'png') fail(`Usual Specialists source format drifted for ${id}.`)
}

export function assertDerivativeReceipt(expected, actual) {
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

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (error) {
    fail(`Cannot read ${label}: ${error.message}`)
  }
}

async function loadAcceptedSources() {
  const manifest = await readJson(acceptedAssetsPath, 'Usual Specialists accepted source manifest')
  if (!Array.isArray(manifest.assets) || manifest.assets.length !== USUAL_SPECIALISTS_ASSETS.length) {
    fail(`Usual Specialists accepted source manifest must contain ${USUAL_SPECIALISTS_ASSETS.length} assets.`)
  }
  const byId = new Map(manifest.assets.map((entry) => [entry.id, entry]))
  if (byId.size !== manifest.assets.length) fail('Usual Specialists accepted source manifest contains duplicate ids.')

  const sources = new Map()
  for (const asset of USUAL_SPECIALISTS_ASSETS) {
    const accepted = byId.get(asset.id)
    if (!accepted) fail(`Usual Specialists accepted source manifest is missing ${asset.id}.`)
    const expectedRepositoryPath = repositoryPath(path.join(sourceRoot, asset.source))
    if (accepted.repositorySourcePath !== expectedRepositoryPath || accepted.status !== 'accepted' || accepted.rightsOwner !== 'Harley Bartles') {
      fail(`Usual Specialists accepted source custody drifted for ${asset.id}.`)
    }
    const sourcePath = path.join(sourceRoot, asset.source)
    const buffer = await readFile(sourcePath).catch((error) => fail(`Cannot read Usual Specialists source ${asset.source}: ${error.message}`))
    const metadata = await sharp(buffer).metadata()
    const actual = { sha256: sha256(buffer), width: metadata.width, height: metadata.height, format: metadata.format }
    assertSourceIdentity(actual, accepted, asset.id)
    sources.set(asset.id, { asset, accepted, buffer })
  }
  return sources
}

function expectedDerivative(asset, accepted) {
  const width = Math.min(asset.width, accepted.width)
  const height = Math.round((accepted.height / accepted.width) * width)
  return {
    id: asset.id,
    sourcePath: accepted.repositorySourcePath,
    sourceSha256: accepted.sha256,
    output: asset.output,
    path: repositoryPath(path.join(outputRoot, asset.output)),
    width,
    height,
    format: asset.format,
    encoding: USUAL_SPECIALISTS_WEBP_OPTIONS,
  }
}

async function renderDerivative(source) {
  return sharp(source.buffer)
    .resize({ width: source.asset.width, withoutEnlargement: true })
    .webp(USUAL_SPECIALISTS_WEBP_OPTIONS)
    .toBuffer()
}

async function checkOutput(entry, source, receiptEntry) {
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

async function check() {
  const sources = await loadAcceptedSources()
  const receipt = await readJson(receiptPath, 'Usual Specialists derivative receipt')
  if (receipt.generatedBy !== 'src/client/scripts/process-usual-specialists-assets.mjs' || !Array.isArray(receipt.derivatives)) fail('Usual Specialists derivative receipt is stale or malformed.')
  const expected = USUAL_SPECIALISTS_ASSETS.map((asset) => expectedDerivative(asset, sources.get(asset.id).accepted))
  assertDerivativeReceipt(expected, receipt.derivatives)
  for (const entry of expected) {
    const receiptEntry = receipt.derivatives.find((candidate) => candidate.output === entry.output)
    if (!Number.isInteger(receiptEntry.bytes) || receiptEntry.bytes <= 0 || receiptEntry.bytes > 450_000) fail(`Usual Specialists derivative byte budget failed for ${entry.output}.`)
    if (typeof receiptEntry.outputSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(receiptEntry.outputSha256)) fail(`Usual Specialists derivative hash is malformed for ${entry.output}.`)
    await checkOutput(entry, sources.get(entry.id), receiptEntry)
  }
}

async function apply() {
  const sources = await loadAcceptedSources()
  await mkdir(outputRoot, { recursive: true })
  const derivatives = []
  for (const asset of USUAL_SPECIALISTS_ASSETS) {
    const source = sources.get(asset.id)
    const entry = expectedDerivative(asset, source.accepted)
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

function parseMode(args) {
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
