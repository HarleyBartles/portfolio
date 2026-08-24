import evidence from '../../../data/case-studies/patch-evidence.json'

export type PatchEvidenceStatus =
  | 'published'
  | 'advanced-visual-preproduction'
  | 'visual-development'
  | 'legacy-reference'
  | 'story-seed'
  | 'archived-source-material'

export type PatchEvidenceSourceType = 'repository-evidence' | 'public-artefact' | 'user-supplied-context'

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
  sourceStatus: PatchEvidenceStatus | 'accepted'
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

function freeze<T>(value: T): Readonly<T> {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze)
    Object.freeze(value)
  }
  return value as Readonly<T>
}

const patchEvidence = freeze(evidence) as PatchEvidenceSnapshot

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

export function getPatchRepositoryEvidence(): Readonly<Pick<PatchEvidenceSnapshot, 'observedAt' | 'repositoryUrl' | 'sourceRevision'>> {
  return patchEvidence
}
