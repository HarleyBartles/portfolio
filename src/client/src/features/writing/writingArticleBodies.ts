import type { ComponentType } from 'react'
import { ContextComplexityArticle } from './ContextComplexityArticle'
import { ProductOwnershipArticle } from './ProductOwnershipArticle'
import { RianHughesArticle } from './RianHughesArticle'
import { TestingEvidenceArticle } from './TestingEvidenceArticle'

export type WritingArticleBodyProps = {
  markdown: string
}

const writingArticleBodies = {
  'the-right-test-isnt-your-favourite-test': TestingEvidenceArticle,
  'i-just-write-the-code-is-not-a-full-sentence': ProductOwnershipArticle,
  'i-made-agentic-engineering-harder-than-it-needed-to-be': ContextComplexityArticle,
  'how-the-invisibles-logo-designer-influenced-the-usual-specialists': RianHughesArticle,
} as const satisfies Record<string, ComponentType<WritingArticleBodyProps>>

export function getWritingArticleBody(slug: string): ComponentType<WritingArticleBodyProps> | undefined {
  return writingArticleBodies[slug as keyof typeof writingArticleBodies]
}
