import type { ContentSummary } from '../../types/content'
import { getContentPath } from '../../types/content'
import { formatContentDate } from '../../utils/content'
import type { FeatureItem } from './FeatureDeck'
import type { ProjectVisualSlug } from './ProjectVisual'


export type HomeFeatureSpec = {
  slug: string
  eyebrow: string
  visual: ProjectVisualSlug
  title?: string
}

export const homeFeatureCatalog: readonly HomeFeatureSpec[] = [
  { slug: 'codex-marketplace', eyebrow: 'Public system', visual: 'codex-marketplace' },
  {
    slug: 'adventures-of-patch',
    eyebrow: 'Visual pipeline',
    visual: 'adventures-of-patch',
    title: 'Patch can be anything',
  },
  {
    slug: 'agentic-engineering-vs-vibe-coding',
    eyebrow: 'Featured essay',
    visual: 'agentic-engineering-vs-vibe-coding',
  },
  { slug: 'wild-bunch', eyebrow: 'Project story', visual: 'wild-bunch' },
  { slug: 'i-made-agentic-engineering-harder-than-it-needed-to-be', eyebrow: 'Field note', visual: 'i-made-agentic-engineering-harder-than-it-needed-to-be' },
]

export function buildHomeFeatures(items: readonly ContentSummary[]): FeatureItem[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]))
  return homeFeatureCatalog.flatMap((spec) => {
    const item = bySlug.get(spec.slug)
    if (item === undefined) return []
    return [{
      id: spec.slug,
      eyebrow: spec.eyebrow,
      title: spec.title ?? item.title,
      summary: item.summary,
      to: getContentPath(item),
      visual: spec.visual,
      meta: item.kind === 'writing' ? formatContentDate(item.date) ?? undefined : item.status,
    }]
  })
}
