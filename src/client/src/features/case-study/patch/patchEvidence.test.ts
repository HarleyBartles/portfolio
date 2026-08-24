import { describe, expect, test } from 'vitest'
import {
  getPatchMedia,
  getPublishedEvidence,
  type PatchEvidenceSourceState,
  type PatchEvidenceSourceType,
} from './patchEvidence'

describe('Patch evidence selectors', () => {
  test('preserve the validator source taxonomy and explicit published-media relations', () => {
    const sourceTypes = [
      'repository-evidence',
      'public-artefact',
      'user-supplied-professional-project-context',
      'generated-pose',
    ] satisfies readonly PatchEvidenceSourceType[]
    const sourceStates = [
      'accepted',
      'published',
      'advanced_visual_preproduction',
      'visual_development',
      'legacy_reference',
    ] satisfies readonly PatchEvidenceSourceState[]

    expect(sourceTypes).toHaveLength(4)
    expect(sourceStates).toHaveLength(5)
    expect(getPatchMedia().map((media) => media.sourceStatus)).toEqual(expect.arrayContaining([
      'accepted', 'published', 'advanced_visual_preproduction', 'visual_development', 'legacy_reference',
    ]))

    const publishedEvidence = getPublishedEvidence()
    expect(publishedEvidence).toHaveLength(4)
    expect(publishedEvidence.map(({ artefact, media }) => [artefact.title, media.path])).toEqual([
      ['Club DB', 'src/client/public/media/patch/patch-clubDb-slide-2-1200.avif'],
      ['Goldilocks', 'src/client/public/media/patch/patch-goldilocks-1200.avif'],
      ["The Sorcerer's Apprentice", 'src/client/public/media/patch/patch-sorcerers-apprentice-1200.avif'],
      ['Introducing Patch', 'src/client/public/media/patch/patch-introducing-page-1200.avif'],
    ])
    expect(publishedEvidence[0]).toMatchObject({
      media: { sourceType: 'repository-evidence', sourceStatus: 'legacy_reference' },
      captionLabel: 'Club DB, published origin deck',
    })
  })
})
