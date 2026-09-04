import type { ReactNode } from 'react'
import { ContentHeader, ShareAction } from '../../components'
import { AuthoredContinuations } from './AuthoredContinuations'
import { WritingContinuationsUnavailable, type WritingContinuation } from './WritingContinuations'

type WritingArticleShellProps = {
  eyebrow: string
  title: string
  summary: string
  metadata?: ReactNode
  visualContract: string
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
  eyebrow,
  title,
  summary,
  metadata,
  visualContract,
  regionLabel,
  headerVisual,
  body,
  continuations,
  continuationsUnavailable = false,
  share,
}: WritingArticleShellProps) => {
  return (
    <>
      <ContentHeader
        eyebrow={eyebrow}
        title={title}
        summary={summary}
        metadata={metadata}
        visual={headerVisual}
        visualContract={visualContract}
        regionLabel={regionLabel}
        register="article-serif"
      />
      {body}
      {continuationsUnavailable ? (
        <WritingContinuationsUnavailable className="writing-continuations" aria-labelledby="writing-continuations-title">
          <h2 id="writing-continuations-title">Continue reading</h2>
          <p role="status">Related links are temporarily unavailable while supporting navigation reloads.</p>
        </WritingContinuationsUnavailable>
      ) : <AuthoredContinuations items={continuations} />}
      <ShareAction title={share.title} path={share.path} />
    </>
  )
}
