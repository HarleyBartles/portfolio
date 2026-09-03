import type { ReactNode } from 'react'
import styled from 'styled-components'
import { ContentHeader, ShareAction } from '../../components'
import { AuthoredContinuations } from './AuthoredContinuations'
import type { WritingContinuation } from './WritingContinuations'

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

const UnavailableContinuations = styled.section`
  margin-top: ${({ theme }) => theme.space.xxxl};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-top: ${({ theme }) => theme.space.xl};

  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.font.display};
  }

  p {
    color: ${({ theme }) => theme.color.muted};
  }
`

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
        <UnavailableContinuations className="writing-continuations" aria-labelledby="writing-continuations-title">
          <h2 id="writing-continuations-title">Continue reading</h2>
          <p role="status">Related links are temporarily unavailable while supporting navigation reloads.</p>
        </UnavailableContinuations>
      ) : <AuthoredContinuations items={continuations} />}
      <ShareAction title={share.title} path={share.path} />
    </>
  )
}
