import type { ReactNode } from 'react'
import { ShareAction } from '../../components'
import { ContinuationHeading, WritingContinuations, WritingContinuationsUnavailable, type WritingContinuation } from './WritingContinuations'
import { WritingArticleHeader, type WritingArticleHeaderLayout } from './WritingArticleHeader'

type WritingArticleShellProps = {
  title: string
  summary: string
  metadata?: readonly ReactNode[]
  visualContract: string
  layout: WritingArticleHeaderLayout
  regionLabel?: string
  headerVisual?: ReactNode
  body: ReactNode
  continuations: readonly WritingContinuation[]
  continuationsUnavailable?: boolean
  share: {
    title: string
    path: string
  }
}

export const WritingArticleShell = ({
  title,
  summary,
  metadata,
  visualContract,
  layout,
  regionLabel,
  headerVisual,
  body,
  continuations,
  continuationsUnavailable = false,
  share,
}: WritingArticleShellProps) => {
  return (
    <>
      <WritingArticleHeader
        title={title}
        summary={summary}
        metadata={metadata}
        visual={headerVisual}
        visualContract={visualContract}
        regionLabel={regionLabel}
        layout={layout}
      />
      {body}
      {continuationsUnavailable ? (
        <WritingContinuationsUnavailable className="writing-continuations" aria-labelledby="writing-continuations-title">
          <ContinuationHeading id="writing-continuations-title">Continue reading</ContinuationHeading>
          <p role="status">Related links are temporarily unavailable while supporting navigation reloads.</p>
        </WritingContinuationsUnavailable>
      ) : <WritingContinuations items={continuations} />}
      <ShareAction title={share.title} path={share.path} />
    </>
  )
}
