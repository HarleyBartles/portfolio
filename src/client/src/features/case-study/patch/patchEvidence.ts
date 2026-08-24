import evidence from '../../../data/case-studies/patch-evidence.json'

export type PatchEvidenceStatus =
  | 'published'
  | 'advanced-visual-preproduction'
  | 'visual-development'
  | 'legacy-reference'
  | 'story-seed'
  | 'archived-source-material'

export type PatchEvidenceSourceType =
  | 'repository-evidence'
  | 'public-artefact'
  | 'user-supplied-professional-project-context'
  | 'generated-pose'

export type PatchEvidenceSourceState =
  | 'accepted'
  | 'published'
  | 'advanced_visual_preproduction'
  | 'visual_development'
  | 'legacy_reference'

export type PatchPipelineStage = Readonly<{
  id: string
  name: string
  input: string
  decision: string
  output: string
  stopCondition: string
}>

export type PatchPublishedArtefact = Readonly<{
  title: string
  status: Extract<PatchEvidenceStatus, 'published'>
  publicArtefactUrl: string
}>

export type PatchInFlightWorld = Readonly<{
  title: string
  status: Exclude<PatchEvidenceStatus, 'published' | 'story-seed' | 'archived-source-material'>
  lesson: string
  currentEvidence: string
  remaining: string
}>

export type PatchStoryLab = Readonly<{
  fairytaleLessons: readonly string[]
  adventureQuestions: readonly Readonly<{ title: string; lesson: string }>[]
}>

export type PatchEvidenceMedia = Readonly<{
  path: string
  width: number
  height: number
  bytes: number
  custody: string
  sourceType: PatchEvidenceSourceType
  sourceStatus: PatchEvidenceSourceState
  sourceRevision: string
}>

type PatchEvidenceSnapshot = Readonly<{
  observedAt: string
  repositoryUrl: string
  sourceRevision: string
  pipeline: readonly PatchPipelineStage[]
  published: readonly PatchPublishedArtefact[]
  inFlight: readonly PatchInFlightWorld[]
  storyLab: PatchStoryLab
  media: readonly PatchEvidenceMedia[]
}>

type PublishedEvidenceRelation = Readonly<{
  mediaPath: string
  captionLabel: string
  captionDetail?: string
  alt: string
}>

export type PatchPublishedEvidence = Readonly<{
  artefact: PatchPublishedArtefact
  media: PatchEvidenceMedia
  captionLabel: string
  captionDetail?: string
  alt: string
}>

const publishedEvidenceRelations: Readonly<Record<string, PublishedEvidenceRelation>> = {
  'Club DB': {
    mediaPath: 'src/client/public/media/patch/patch-clubDb-slide-2-1200.avif',
    captionLabel: 'Historical published-deck evidence',
    captionDetail: 'Its legacy-reference derivative preserves the origin without claiming current production quality.',
    alt: 'Historical Club DB deck evidence.',
  },
  Goldilocks: {
    mediaPath: 'src/client/public/media/patch/patch-goldilocks-1200.avif',
    captionLabel: 'Published artefact evidence',
    alt: 'Published Goldilocks fairytale evidence.',
  },
  "The Sorcerer's Apprentice": {
    mediaPath: 'src/client/public/media/patch/patch-sorcerers-apprentice-1200.avif',
    captionLabel: 'Published artefact evidence',
    alt: "Published Sorcerer's Apprentice fairytale evidence.",
  },
  'Introducing Patch': {
    mediaPath: 'src/client/public/media/patch/patch-introducing-page-1200.avif',
    captionLabel: 'Published artefact evidence',
    alt: 'Published Introducing Patch evidence.',
  },
}

function freeze<T>(value: T): Readonly<T> {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze)
    Object.freeze(value)
  }
  return value as Readonly<T>
}

const patchEvidence = freeze(evidence) as PatchEvidenceSnapshot
const patchMediaByPath = new Map(patchEvidence.media.map((media) => [media.path, media]))

export function getPatchPipeline(): readonly PatchPipelineStage[] {
  return patchEvidence.pipeline
}

export function getPublishedArtefacts(): readonly PatchPublishedArtefact[] {
  return patchEvidence.published
}

export function getInFlightWorlds(): readonly PatchInFlightWorld[] {
  return patchEvidence.inFlight
}

export function getPatchStoryLab(): PatchStoryLab {
  return patchEvidence.storyLab
}

export function getPatchMedia(): readonly PatchEvidenceMedia[] {
  return patchEvidence.media
}

export function getPublishedEvidence(): readonly PatchPublishedEvidence[] {
  return patchEvidence.published.map((artefact) => {
    const relation = publishedEvidenceRelations[artefact.title]
    const media = relation === undefined ? undefined : patchMediaByPath.get(relation.mediaPath)

    if (relation === undefined || media === undefined) {
      throw new Error(`Patch published evidence relation is missing for ${artefact.title}.`)
    }

    return freeze({ artefact, media, captionLabel: relation.captionLabel, captionDetail: relation.captionDetail, alt: relation.alt })
  })
}

export function getPatchRepositoryEvidence(): Readonly<Pick<PatchEvidenceSnapshot, 'observedAt' | 'repositoryUrl' | 'sourceRevision'>> {
  return patchEvidence
}
