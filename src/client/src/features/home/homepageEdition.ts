import { navigation } from '../../data'
import { getContentPath, type ContentSummary } from '../../types'

export type HomepageFeatureBase = {
  anchorId: 'writing' | 'patch'
  title: string
  to: string
  inwardLabel: string
  incomingTeaser: string
}

export type WritingHomepageFeature = HomepageFeatureBase & {
  kind: 'writing'
  anchorId: 'writing'
  summary: string
}

export type PatchHomepageFeature = HomepageFeatureBase & {
  kind: 'patch'
  anchorId: 'patch'
  closingTeaser: string
  presentation: 'usual-specialists' | 'tournament'
}

export type HomepageFeatureDescriptor = WritingHomepageFeature | PatchHomepageFeature

export type HomepageEdition = {
  id: string
  writing: WritingHomepageFeature
  patch: PatchHomepageFeature
}

const patchFeature: PatchHomepageFeature = {
  kind: 'patch',
  anchorId: 'patch',
  title: 'The Usual Specialists',
  to: '/patch/the-usual-specialists',
  inwardLabel: 'Meet the crew',
  incomingTeaser: 'Meet The Usual Specialists',
  closingTeaser: "Tell me what you're building",
  presentation: 'usual-specialists',
}

export function createWritingHomepageFeature(summary: ContentSummary): WritingHomepageFeature | undefined {
  if (summary.kind !== 'writing' || summary.homepageFeature === undefined) return undefined

  return {
    kind: 'writing',
    anchorId: 'writing',
    title: summary.title,
    summary: summary.homepageFeature.summary,
    to: getContentPath(summary),
    inwardLabel: summary.homepageFeature.inwardLabel,
    incomingTeaser: summary.homepageFeature.incomingTeaser,
  }
}

export const homepageEditions: readonly HomepageEdition[] = navigation
  .filter((item) => item.kind === 'writing' && item.status === 'published')
  .toSorted((left, right) => (left.date ?? '').localeCompare(right.date ?? ''))
  .map((item) => {
    const writing = createWritingHomepageFeature(item)
    if (writing === undefined) throw new Error(`Published article ${item.slug} needs homepage copy`)
    return { id: item.slug, writing, patch: patchFeature }
  })

export const defaultHomepageEdition = homepageEditions[0]

const firstEditionDay = Date.UTC(2026, 8, 28) / 86_400_000

export function getHomepageEdition(at: Date = new Date()): HomepageEdition {
  if (homepageEditions.length === 0) throw new Error('No published articles for the homepage')
  const day = Math.floor(at.getTime() / 86_400_000)
  const index = ((day - firstEditionDay) % homepageEditions.length + homepageEditions.length) % homepageEditions.length
  return homepageEditions[index]
}
