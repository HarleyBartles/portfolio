import { describe, expect, it } from 'vitest'
import {
  USUAL_SPECIALISTS_PROVENANCE_HEADINGS,
  assertUsualSpecialistsProvenanceGraph,
  validateUsualSpecialistsProvenance,
} from './validate-usual-specialists-provenance.mjs'

const provenancePath = 'src/client/assets/patch/the-usual-specialists/provenance/example.md'

const provenanceRecord = ({ assetIds = ['example-master'], temporaryCanonicalRepository = 'Portfolio' } = {}) => [
  '# Example provenance',
  '',
  '## Record identity',
  '',
  `- Temporary canonical repository: ${temporaryCanonicalRepository}`,
  `- Assets covered: ${assetIds.join(', ')}`,
  '',
  ...USUAL_SPECIALISTS_PROVENANCE_HEADINGS.slice(1).flatMap((heading) => [heading, '', 'None known.', '']),
].join('\n')

const generationEntry = (overrides = {}) => ({
  model: 'OpenAI Image 2.5',
  modelEvidence: 'project-owner-confirmation-2026-09-14',
  generationId: null,
  generationIdStatus: 'missing-from-retained-history',
  parentGenerationId: null,
  parentGenerationIdStatus: 'missing-from-retained-history',
  seed: null,
  seedStatus: 'missing-from-retained-history',
  generationDate: null,
  generationDateStatus: 'missing-from-retained-history',
  briefStatus: 'missing-from-retained-history',
  ...overrides,
})

const validGraph = () => ({
  acceptedManifests: {
    index: {
      assets: [{
        id: 'example-master',
        status: 'accepted',
        selection: 'current',
        provenanceRecord: provenancePath,
      }],
    },
    rope: { assets: [] },
    silk: { assets: [] },
  },
  candidateManifests: {
    silk: { assets: [] },
  },
  generationReceipts: {
    index: { assets: { 'example-master': generationEntry() } },
    rope: { assets: {} },
    silk: { assets: {} },
  },
  provenanceRecords: {
    [provenancePath]: provenanceRecord(),
  },
  linearSourceRegister: {
    sources: [{
      documentId: 'document:example',
      title: 'Example accepted provenance',
      role: 'accepted-provenance',
      destinationRecords: [provenancePath],
      materialRetained: ['acceptance'],
      migrationStatus: 'migrated',
    }],
  },
})

describe('Usual Specialists provenance graph validator', () => {
  it('loads and validates the live repository provenance corpus', async () => {
    await expect(validateUsualSpecialistsProvenance()).resolves.toBeUndefined()
  })

  it('accepts a complete normalized provenance graph', () => {
    expect(() => assertUsualSpecialistsProvenanceGraph(validGraph())).not.toThrow()
  })

  it('rejects an accepted source without a provenance record pointer', () => {
    const graph = validGraph()
    delete graph.acceptedManifests.index.assets[0].provenanceRecord

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('provenanceRecord')
  })

  it('requires candidate custody to carry provenance and generation receipt coverage', () => {
    const graph = validGraph()
    graph.candidateManifests.silk.assets.push({
      id: 'candidate-master',
      status: 'candidate',
      selection: 'page-review',
      provenanceRecord: provenancePath,
    })
    graph.provenanceRecords[provenancePath] = provenanceRecord({ assetIds: ['example-master', 'candidate-master'] })

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('candidate-master')

    graph.generationReceipts.silk.assets['candidate-master'] = generationEntry({
      generationId: 'candidate-generation',
      generationIdStatus: 'retained',
      parentGenerationIdStatus: 'tool-returned-null',
      seedStatus: 'not-supplied-by-tool',
      generationDate: '2026-09-14',
      generationDateStatus: 'retained',
      briefStatus: 'normalized-from-approved-conversation',
    })

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).not.toThrow()
  })

  it('rejects a provenance pointer to a missing Markdown record', () => {
    const graph = validGraph()
    graph.provenanceRecords = {}

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('missing provenance record')
  })

  it('rejects a provenance record that does not name its linked asset', () => {
    const graph = validGraph()
    graph.provenanceRecords[provenancePath] = provenanceRecord({ assetIds: ['some-other-asset'] })

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('example-master')
  })

  it('rejects a generated accepted master without generation receipt coverage', () => {
    const graph = validGraph()
    graph.generationReceipts.index.assets = {}

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('generation receipt')
  })

  it('rejects missing generation metadata when its missing-history state is ambiguous', () => {
    const graph = validGraph()
    delete graph.generationReceipts.index.assets['example-master'].generationIdStatus

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('generationIdStatus')
  })

  it('rejects generation receipt status values outside the normalized vocabulary', () => {
    const graph = validGraph()
    graph.generationReceipts.index.assets['example-master'].generationId = 'generation-id'
    graph.generationReceipts.index.assets['example-master'].generationIdStatus = 'retained-tool-result'

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('generationIdStatus')
  })

  it('rejects a deterministic accepted child that does not trace to an accepted source', () => {
    const graph = validGraph()
    graph.acceptedManifests.index.assets.push({
      id: 'example-crop',
      status: 'accepted',
      selection: 'deterministic-derivative',
      provenanceRecord: provenancePath,
      derivedFrom: 'not-an-accepted-source',
      derivation: { type: 'crop' },
    })
    graph.provenanceRecords[provenancePath] = provenanceRecord({ assetIds: ['example-master', 'example-crop'] })

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('derivedFrom')
  })

  it('rejects a normalized provenance record with required headings out of order', () => {
    const graph = validGraph()
    graph.provenanceRecords[provenancePath] = provenanceRecord().replace(
      '## Status\n\nNone known.\n\n## Original commission intent',
      '## Original commission intent\n\nNone known.\n\n## Status',
    )

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('heading order')
  })

  it('rejects a migrated Linear source whose destination record is missing', () => {
    const graph = validGraph()
    graph.linearSourceRegister.sources[0].destinationRecords = [
      'src/client/assets/patch/the-usual-specialists/provenance/missing.md',
    ]

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('Linear source')
  })

  it('rejects migrated provenance that still names Linear as canonical custody', () => {
    const graph = validGraph()
    graph.provenanceRecords[provenancePath] = provenanceRecord({ temporaryCanonicalRepository: 'Linear' })

    expect(() => assertUsualSpecialistsProvenanceGraph(graph)).toThrow('Linear as canonical')
  })
})
