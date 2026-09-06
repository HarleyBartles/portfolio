import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export type WritingArticleBodyProps = {
  markdown: string
}

export type WritingArticleBody = LazyExoticComponent<ComponentType<WritingArticleBodyProps>>

const writingArticleBodies = {
  'the-right-test-isnt-your-favourite-test': lazy(async () => ({ default: (await import('./TestingEvidenceArticle')).TestingEvidenceArticle })),
  'i-just-write-the-code-is-not-a-full-sentence': lazy(async () => ({ default: (await import('./ProductOwnershipArticle')).ProductOwnershipArticle })),
  'i-made-agentic-engineering-harder-than-it-needed-to-be': lazy(async () => ({ default: (await import('./ContextComplexityArticle')).ContextComplexityArticle })),
  'how-the-invisibles-logo-designer-influenced-the-usual-specialists': lazy(async () => ({ default: (await import('./RianHughesArticle')).RianHughesArticle })),
  'use-superpowers': lazy(async () => ({ default: (await import('./UseSuperpowersArticle')).UseSuperpowersArticle })),
} as const satisfies Record<string, WritingArticleBody>

export function getWritingArticleBody(slug: string): WritingArticleBody | undefined {
  return writingArticleBodies[slug as keyof typeof writingArticleBodies]
}
