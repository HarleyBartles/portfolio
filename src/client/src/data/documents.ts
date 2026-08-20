import type { ContentDocument, ContentSummary } from '../types/content'
import manifest from './content/content-manifest.json'

import codexMarketplace from './content/projects/codex-marketplace.md?raw'
import agenticLearningLab from './content/projects/agentic-learning-lab.md?raw'
import wildBunch from './content/projects/wild-bunch.md?raw'
import adventuresOfPatch from './content/projects/adventures-of-patch.md?raw'

import agenticVsVibeCoding from './content/writing/2026-08-01-agentic-engineering-vs-vibe-coding.md?raw'
import graphIterativeReview from './content/writing/2026-08-05-graph-iterative-review.md?raw'
import contextIsNotState from './content/writing/2026-08-07-context-is-not-state.md?raw'
import provisioningIsNotAccumulation from './content/writing/2026-08-12-provisioning-is-not-accumulation.md?raw'
import passReferencesNotParagraphs from './content/writing/2026-08-15-pass-references-not-paragraphs.md?raw'

function stripFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return match !== null ? markdown.slice(match[0].length) : markdown
}

function stripLeadingTitle(markdown: string, title: string): string {
  const firstHeading = markdown.match(/^\s*#\s+(.+)\r?\n?/)

  if (firstHeading !== null && firstHeading[1].trim().toLowerCase() === title.trim().toLowerCase()) {
    return markdown.slice(firstHeading[0].length).trimStart()
  }

  return markdown
}

function prepareMarkdown(raw: string, summary: ContentSummary): string {
  const withoutFrontmatter = stripFrontmatter(raw)

  if (summary.kind === 'writing') {
    return stripLeadingTitle(withoutFrontmatter, summary.title)
  }

  return withoutFrontmatter
}

const rawByPath: Record<string, string> = {
  'projects/codex-marketplace.md': codexMarketplace,
  'projects/agentic-learning-lab.md': agenticLearningLab,
  'projects/wild-bunch.md': wildBunch,
  'projects/adventures-of-patch.md': adventuresOfPatch,
  'writing/2026-08-01-agentic-engineering-vs-vibe-coding.md': agenticVsVibeCoding,
  'writing/2026-08-05-graph-iterative-review.md': graphIterativeReview,
  'writing/2026-08-07-context-is-not-state.md': contextIsNotState,
  'writing/2026-08-12-provisioning-is-not-accumulation.md': provisioningIsNotAccumulation,
  'writing/2026-08-15-pass-references-not-paragraphs.md': passReferencesNotParagraphs,
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
    const raw = rawByPath[String((item as Record<string, unknown>).path)]
    const markdown = raw === undefined ? '' : prepareMarkdown(raw, summary)
    return [summary.slug, { summary, markdown }]
  }),
)
