import type { ContentDocument, ContentSummary } from '../types/content'
import manifest from '../../../content/content-manifest.json'

import codexMarketplace from '../../../content/projects/codex-marketplace.md?raw'
import agenticLearningLab from '../../../content/projects/agentic-learning-lab.md?raw'
import wildBunch from '../../../content/projects/wild-bunch.md?raw'
import adventuresOfPatch from '../../../content/projects/adventures-of-patch.md?raw'

import graphIterativeReview from '../../../content/writing/2026-08-05-graph-iterative-review.md?raw'
import contextIsNotState from '../../../content/writing/2026-08-07-context-is-not-state.md?raw'
import provisioningIsNotAccumulation from '../../../content/writing/2026-08-12-provisioning-is-not-accumulation.md?raw'
import passReferencesNotParagraphs from '../../../content/writing/2026-08-15-pass-references-not-paragraphs.md?raw'

function stripFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return match !== null ? markdown.slice(match[0].length) : markdown
}

const markdownByPath: Record<string, string> = {
  'projects/codex-marketplace.md': stripFrontmatter(codexMarketplace),
  'projects/agentic-learning-lab.md': stripFrontmatter(agenticLearningLab),
  'projects/wild-bunch.md': stripFrontmatter(wildBunch),
  'projects/adventures-of-patch.md': stripFrontmatter(adventuresOfPatch),
  'writing/2026-08-05-graph-iterative-review.md': stripFrontmatter(graphIterativeReview),
  'writing/2026-08-07-context-is-not-state.md': stripFrontmatter(contextIsNotState),
  'writing/2026-08-12-provisioning-is-not-accumulation.md': stripFrontmatter(provisioningIsNotAccumulation),
  'writing/2026-08-15-pass-references-not-paragraphs.md': stripFrontmatter(passReferencesNotParagraphs),
}

function itemToSummary(item: unknown): ContentSummary {
  const source = item as Record<string, unknown>
  return {
    slug: String(source.slug),
    kind: source.kind as ContentSummary['kind'],
    title: String(source.title),
    status: String(source.status),
    summary: String(source.summary),
    date: source.date === undefined ? undefined : String(source.date),
    tags: Array.isArray(source.tags) ? source.tags.map(String) : [],
    relatedSlugs: Array.isArray(source.relatedSlugs) ? source.relatedSlugs.map(String) : [],
  }
}

export const navigation: ContentSummary[] = manifest.items.map(itemToSummary)

export const documentsBySlug: Record<string, ContentDocument> = Object.fromEntries(
  manifest.items.map((item) => {
    const summary = itemToSummary(item)
    const raw = markdownByPath[String((item as Record<string, unknown>).path)]
    const markdown = raw === undefined ? '' : raw
    return [summary.slug, { summary, markdown }]
  }),
)
