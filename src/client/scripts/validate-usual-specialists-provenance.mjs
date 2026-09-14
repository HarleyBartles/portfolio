import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const clientRoot = path.resolve(import.meta.dirname, '..')
const repositoryRoot = path.resolve(clientRoot, '..', '..')
const specialistsRoot = path.join(clientRoot, 'assets', 'patch', 'the-usual-specialists')
const provenanceRoot = path.join(specialistsRoot, 'provenance')

const fail = (message) => {
  throw new Error(message)
}

export const USUAL_SPECIALISTS_PROVENANCE_HEADINGS = Object.freeze([
  '## Record identity',
  '## Status',
  '## Original commission intent',
  '## Material changes from original intent',
  '## Accepted execution brief',
  '## Reference hierarchy',
  '## Accepted asset identity',
  '## Generation provenance',
  '## Iteration history',
  '## Acceptance decision',
  '## Known accepted limitations',
  '## Composition / ownership contract',
  '## Deterministic descendants',
  '## Missing historical evidence',
  '## Custody history',
])

const generatedSelection = (selection) => selection !== 'deterministic-derivative'

const GENERATION_RECEIPT_VOCABULARY = Object.freeze({
  modelEvidence: new Set([
    'project-owner-confirmation-2026-09-14',
    'retained-linear-provenance',
    'retained-tool-result',
  ]),
  generationIdStatus: new Set(['retained', 'missing-from-retained-history']),
  parentGenerationIdStatus: new Set(['retained', 'tool-returned-null', 'missing-from-retained-history']),
  seedStatus: new Set(['retained', 'not-supplied-by-tool', 'missing-from-retained-history']),
  generationDateStatus: new Set(['retained', 'missing-from-retained-history']),
  briefStatus: new Set([
    'verbatim-recovered',
    'normalized-from-approved-conversation',
    'recovered-from-linear-record',
    'missing-from-retained-history',
  ]),
})

const manifestAssets = (manifests, custody) => {
  const assets = []
  for (const [packageName, manifest] of Object.entries(manifests ?? {})) {
    if (!Array.isArray(manifest?.assets)) fail(`Usual Specialists ${packageName} ${custody} manifest is malformed.`)
    for (const asset of manifest.assets) assets.push({ ...asset, packageName, custody })
  }
  return assets
}

const assertHeadings = (recordPath, markdown) => {
  let previous = -1
  for (const heading of USUAL_SPECIALISTS_PROVENANCE_HEADINGS) {
    const index = markdown.indexOf(heading)
    if (index < 0) fail(`Usual Specialists provenance record ${recordPath} is missing required heading ${heading}.`)
    if (index <= previous) fail(`Usual Specialists provenance record ${recordPath} has invalid heading order.`)
    previous = index
  }
}

const assertExplicitMissingState = (assetId, entry, valueField) => {
  if (entry[valueField] !== null) return
  const statusField = `${valueField}Status`
  if (typeof entry[statusField] !== 'string' || entry[statusField].length === 0) {
    fail(`Usual Specialists generation receipt for ${assetId} requires ${statusField} when ${valueField} is missing.`)
  }
}

const assertVocabularyValue = (assetId, entry, field) => {
  const allowed = GENERATION_RECEIPT_VOCABULARY[field]
  if (!allowed.has(entry[field])) {
    fail(`Usual Specialists generation receipt for ${assetId} has unsupported ${field}: ${entry[field]}.`)
  }
}

const assertGenerationReceipt = (asset) => {
  const receipts = asset.graph.generationReceipts ?? {}
  const entry = receipts[asset.packageName]?.assets?.[asset.id]
  if (!entry) fail(`Usual Specialists generation receipt is missing ${asset.id}.`)
  if (typeof entry.model !== 'string' || typeof entry.modelEvidence !== 'string' || typeof entry.briefStatus !== 'string') {
    fail(`Usual Specialists generation receipt is incomplete for ${asset.id}.`)
  }
  for (const field of ['generationId', 'parentGenerationId', 'seed', 'generationDate']) {
    assertExplicitMissingState(asset.id, entry, field)
  }
  for (const field of Object.keys(GENERATION_RECEIPT_VOCABULARY)) {
    assertVocabularyValue(asset.id, entry, field)
  }
}

const assertNoLinearCanonicalCustody = (recordPath, markdown) => {
  const canonicalLinearPatterns = [
    /temporary canonical repository:\s*linear\b/i,
    /current provenance custody:\s*linear\b/i,
    /canonical authority:\s*linear\b/i,
  ]
  if (canonicalLinearPatterns.some((pattern) => pattern.test(markdown))) {
    fail(`Usual Specialists migrated provenance record ${recordPath} still names Linear as canonical custody.`)
  }
}

export const assertUsualSpecialistsProvenanceGraph = (graph) => {
  const records = graph?.provenanceRecords ?? {}
  const accepted = manifestAssets(graph?.acceptedManifests, 'accepted')
  const candidates = manifestAssets(graph?.candidateManifests, 'candidate')
  const assets = [...accepted, ...candidates]
  const acceptedIds = new Set(accepted.map(({ id }) => id))

  for (const asset of assets) {
    const expectedStatus = asset.custody === 'candidate' ? 'candidate' : 'accepted'
    if (asset.status !== expectedStatus) {
      fail(`Usual Specialists ${asset.custody} source ${asset.id} has invalid status ${asset.status}.`)
    }
    if (asset.custody === 'candidate' && asset.selection !== 'page-review') {
      fail(`Usual Specialists candidate source ${asset.id} must be selected for page-review.`)
    }
    if (typeof asset.provenanceRecord !== 'string' || asset.provenanceRecord.length === 0) {
      fail(`Usual Specialists accepted source ${asset.id} is missing provenanceRecord.`)
    }
    const markdown = records[asset.provenanceRecord]
    if (typeof markdown !== 'string') {
      fail(`Usual Specialists accepted source ${asset.id} points to missing provenance record ${asset.provenanceRecord}.`)
    }
    assertHeadings(asset.provenanceRecord, markdown)
    if (!markdown.includes(asset.id)) {
      fail(`Usual Specialists provenance record ${asset.provenanceRecord} does not name linked asset ${asset.id}.`)
    }
    if (generatedSelection(asset.selection)) {
      assertGenerationReceipt({ ...asset, graph })
    } else {
      if (typeof asset.derivedFrom !== 'string' || !acceptedIds.has(asset.derivedFrom)) {
        fail(`Usual Specialists deterministic accepted child ${asset.id} has invalid derivedFrom.`)
      }
      if (!asset.derivation || typeof asset.derivation !== 'object') {
        fail(`Usual Specialists deterministic accepted child ${asset.id} is missing derivation metadata.`)
      }
    }
  }

  for (const [recordPath, markdown] of Object.entries(records)) {
    assertHeadings(recordPath, markdown)
  }

  const sources = graph?.linearSourceRegister?.sources
  if (!Array.isArray(sources)) fail('Usual Specialists Linear source register is malformed.')
  for (const source of sources) {
    if (source.migrationStatus !== 'migrated') continue
    if (!Array.isArray(source.destinationRecords) || source.destinationRecords.length === 0) {
      fail(`Usual Specialists migrated Linear source ${source.documentId} has no destination records.`)
    }
    for (const recordPath of source.destinationRecords) {
      const markdown = records[recordPath]
      if (typeof markdown !== 'string') {
        fail(`Usual Specialists migrated Linear source ${source.documentId} points to missing destination record ${recordPath}.`)
      }
      assertNoLinearCanonicalCustody(recordPath, markdown)
    }
  }
}

const readJson = async (filePath, label) => {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'))
  } catch (error) {
    fail(`Cannot read ${label}: ${error.message}`)
  }
}

const repositoryPath = (filePath) => path.relative(repositoryRoot, filePath).split(path.sep).join('/')

export const validateUsualSpecialistsProvenance = async () => {
  const packageNames = ['index', 'rope', 'silk']
  const acceptedManifests = {}
  const generationReceipts = {}
  for (const packageName of packageNames) {
    const packageRoot = path.join(specialistsRoot, packageName)
    acceptedManifests[packageName] = await readJson(
      path.join(packageRoot, 'accepted-assets.json'),
      `Usual Specialists ${packageName} accepted manifest`,
    )
    generationReceipts[packageName] = await readJson(
      path.join(packageRoot, 'generation-receipt.json'),
      `Usual Specialists ${packageName} generation receipt`,
    )
  }

  const candidateManifests = {}

  const provenanceRecords = {}
  const entries = await readdir(provenanceRoot, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md') || ['README.md', 'INDEX.md'].includes(entry.name)) continue
    const filePath = path.join(provenanceRoot, entry.name)
    provenanceRecords[repositoryPath(filePath)] = await readFile(filePath, 'utf8')
  }

  const linearSourceRegister = await readJson(
    path.join(provenanceRoot, 'linear-source-register.json'),
    'Usual Specialists Linear source register',
  )

  assertUsualSpecialistsProvenanceGraph({
    acceptedManifests,
    candidateManifests,
    generationReceipts,
    provenanceRecords,
    linearSourceRegister,
  })
}
