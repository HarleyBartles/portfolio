import type { ReactElement, ReactNode } from 'react'
import { ShareAction } from '../../components/ShareAction'
import type { ContentSummary } from '../../types/content'
import { getContentPath } from '../../types/content'
import { formatContentDate } from '../../utils/content'
import { AuthoredContinuations } from './AuthoredContinuations'
import { WritingContinuations, type WritingContinuationItem } from './WritingContinuations'
import type { WritingPresentation } from './writingPresentations'

type WritingArticleShellProps = {
  summary: ContentSummary
  summaries: readonly ContentSummary[]
  navigationUnavailable: boolean
  presentation?: WritingPresentation
  visualContract: string
  headerVisual?: ReactNode
  children: ReactNode
}

export function WritingArticleShell({
  summary,
  summaries,
  navigationUnavailable,
  presentation,
  visualContract,
  headerVisual,
  children,
}: WritingArticleShellProps): ReactElement {
  const formattedDate = formatContentDate(summary.date)
  const hasReadingMetadata = formattedDate !== null || summary.readingMinutes !== undefined
  const fallbackSlugs = summary.relatedSlugs.length === 0
    ? summaries
        .filter((item) => item.kind === 'writing' && item.slug !== summary.slug)
        .slice(0, 2)
        .map((item) => item.slug)
    : []
  const relatedSlugs = summary.relatedSlugs.length > 0 ? summary.relatedSlugs : fallbackSlugs
  const continuations: WritingContinuationItem[] = relatedSlugs.flatMap((slug) => {
    const related = summaries.find((item) => item.slug === slug)
    if (related === undefined) return []
    const kind = related.kind === 'patch' ? 'Patch story' : related.kind === 'project' ? 'Project story' : 'Article'
    return [{ slug, eyebrow: kind }]
  })

  return (
    <>
      <header
        className={`content-page-header${headerVisual === undefined ? '' : ' content-page-header--visual'}`}
        data-visual-contract={visualContract}
        role={presentation === undefined ? undefined : 'region'}
        aria-label={presentation?.regionLabel}
      >
        <div className="content-page-intro">
          <p className="eyebrow">writing</p>
          <h1 id="content-page-title">{summary.title}</h1>
          {hasReadingMetadata ? (
            <p className="editorial-meta content-date">
              {formattedDate === null ? null : <span>{formattedDate}</span>}
              {summary.readingMinutes === undefined ? null : <span>{summary.readingMinutes} min read</span>}
            </p>
          ) : null}
          {summary.showSummary === false ? null : <p className="content-summary">{summary.summary}</p>}
        </div>
        {headerVisual}
      </header>
      {children}
      {presentation === undefined
        ? navigationUnavailable
          ? <section className="writing-continuations" aria-labelledby="writing-continuations-title"><h2 id="writing-continuations-title">Continue reading</h2><p role="status">Related links are temporarily unavailable while supporting navigation reloads.</p></section>
          : <WritingContinuations items={continuations} summaries={summaries} />
        : <AuthoredContinuations presentation={presentation} summaries={summaries} />}
      <ShareAction title={summary.title} path={getContentPath(summary)} />
    </>
  )
}
