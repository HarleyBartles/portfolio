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
  fairytalePlans: readonly Readonly<{ title: string; lesson: string }>[]
  adventurePlans: readonly Readonly<{ title: string; lesson: string }>[]
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
  portraitMediaPath?: string
  captionLabel: string
  captionDetail?: string
  alt: string
}>

export type PatchPublishedEvidence = Readonly<{
  artefact: PatchPublishedArtefact
  media: PatchEvidenceMedia
  portraitMedia?: PatchEvidenceMedia
  captionLabel: string
  captionDetail?: string
  alt: string
}>

const publishedEvidenceRelations: Readonly<Record<string, PublishedEvidenceRelation>> = {
  'Club DB': {
    mediaPath: 'src/client/public/media/patch/patch-clubDb-slide-2-1200.avif',
    captionLabel: 'Club DB, published origin deck',
    captionDetail: 'Slide 2 traces the deletion back to an environment that made the database look disposable. This derivative records the original production process.',
    alt: 'Club DB slide showing Patch at a workstation after the database deletion, with the root cause traced to a disposable-looking working folder.',
  },
  Goldilocks: {
    mediaPath: 'src/client/public/media/patch/patch-goldilocks-1200.avif',
    portraitMediaPath: 'src/client/public/media/patch/patch-goldilocks-portrait-640.avif',
    captionLabel: 'Goldilocks and the Right Amount of Guidance',
    captionDetail: 'Enough relevant context supports the next confident decision; more context isn’t automatically better.',
    alt: 'Goldilocks fairytale contrasting too much guidance, too little guidance, and a just-right organised workspace for Patch.',
  },
  "The Sorcerer's Apprentice": {
    mediaPath: 'src/client/public/media/patch/patch-sorcerers-apprentice-1200.avif',
    captionLabel: "The Sorcerer's Apprentice",
    captionDetail: 'Delegation needs boundaries around authority, depth, tools, reporting and escalation.',
    alt: 'Sorcerer’s Apprentice fairytale showing one bounded delegation policy beside many multiplying Patch apprentices.',
  },
  'Introducing Patch': {
    mediaPath: 'src/client/public/media/patch/patch-introducing-page-1200.avif',
    portraitMediaPath: 'src/client/public/media/patch/patch-introducing-page-portrait-640.avif',
    captionLabel: 'Introducing Patch',
    captionDetail: 'The finished one-page introduction is a published artefact; a separate base image supplies the route hero.',
    alt: 'Introducing Patch page with the character holding an index card and map beside a concise explanation of his role.',
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

export function getPatchAssetPath(path: string, baseUrl = import.meta.env.BASE_URL): string {
  return `${baseUrl}${path.replace(/^src\/client\/public\/?/, '')}`
}

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

export function getPatchMediaByPath(path: string): PatchEvidenceMedia | undefined {
  return patchMediaByPath.get(path)
}

export function getPublishedEvidence(): readonly PatchPublishedEvidence[] {
  return patchEvidence.published.map((artefact) => {
    const relation = publishedEvidenceRelations[artefact.title]
    const media = relation === undefined ? undefined : patchMediaByPath.get(relation.mediaPath)
    const portraitMedia = relation?.portraitMediaPath === undefined ? undefined : patchMediaByPath.get(relation.portraitMediaPath)

    if (relation === undefined || media === undefined || (relation.portraitMediaPath !== undefined && portraitMedia === undefined)) {
      throw new Error(`Patch published evidence relation is missing for ${artefact.title}.`)
    }

    return freeze({ artefact, media, portraitMedia, captionLabel: relation.captionLabel, captionDetail: relation.captionDetail, alt: relation.alt })
  })
}

export function getPatchRepositoryEvidence(): Readonly<Pick<PatchEvidenceSnapshot, 'observedAt' | 'repositoryUrl' | 'sourceRevision'>> {
  return patchEvidence
}
