import type { ReactElement } from 'react'
import type { ContentSummary } from '../../types/content'
import type { WritingPresentation } from './writingPresentations'
import { WritingContinuations } from './WritingContinuations'

type AuthoredContinuationsProps = {
  presentation: WritingPresentation
  summaries: readonly ContentSummary[]
}

export function AuthoredContinuations({ presentation, summaries }: AuthoredContinuationsProps): ReactElement | null {
  return <WritingContinuations items={presentation.continuations} summaries={summaries} />
}
