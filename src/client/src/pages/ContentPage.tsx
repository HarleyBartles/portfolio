import { useQuery } from '@tanstack/react-query'
import { Suspense, type ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ApiRequestError } from '../api/contentApi'
import { contentQueries } from '../app/queryClient'
import { AccessibleStatus } from '../components/AccessibleStatus'
import { ContentNavigation } from '../components/ContentNavigation'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { MarkdownContent } from '../components/MarkdownContent'
import { ProjectStatus } from '../components/ProjectStatus'
import { RelatedContent } from '../components/RelatedContent'
import { SiteLayout } from '../components/SiteLayout'
import { ShareAction } from '../components/ShareAction'
import { getRouteMetadata } from '../data/routes/routeCatalogue'
import { ProjectVisual, type ProjectVisualSlug } from '../features/home/ProjectVisual'
import { getProjectPresentation } from '../features/case-study/projectPresentations'
import { getWritingPresentation } from '../features/writing/writingPresentations'
import { getWritingArticleBody } from '../features/writing/writingArticleBodies'
import { WritingArticleShell } from '../features/writing/WritingArticleShell'
import '../features/writing/WritingPullQuotes.scss'
import '../styles/interior.scss'
import type { ContentKind } from '../types/content'
import { getContentPath } from '../types/content'

type ContentPageProps = {
  slug: string
  expectedKind?: ContentKind
}

function ContentLoadingState(): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Loading | Harley Bartles"
        description="Portfolio content is loading."
        canonicalPath="/"
        noIndex
      />
      <AccessibleStatus id="content-loading-title" title="Preparing the portfolio" routeLoading>
        Loading portfolio content.
      </AccessibleStatus>
    </SiteLayout>
  )
}

function ContentErrorState(): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Story Unavailable | Harley Bartles"
        description="This portfolio story could not be loaded."
        canonicalPath="/"
        noIndex
      />
      <AccessibleStatus id="content-error-title" title="Portfolio content unavailable" tone="alert">
        Could not load this portfolio story. Please refresh or try again later.
      </AccessibleStatus>
      <div className="state-actions" aria-label="Recovery navigation">
        <Link to="/">Go to the homepage</Link>
        <Link to="/projects">Browse project stories</Link>
      </div>
    </SiteLayout>
  )
}

function ContentNotFoundState(): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Page Not Found | Harley Bartles"
        description="This portfolio story is not available."
        canonicalPath="/"
        noIndex
      />
      <section className="state-panel" aria-labelledby="content-not-found-title">
        <h1 id="content-not-found-title">Page not found</h1>
        <p>This portfolio story is not available.</p>
        <Link to="/">Return to the homepage</Link>
      </section>
    </SiteLayout>
  )
}

function SpecialistPresentationLoading(): ReactElement {
  return (
    <section className="specialist-presentation-loading">
      <p role="status" aria-label="Loading case study presentation" data-loading="specialist-presentation">Loading case study presentation</p>
    </section>
  )
}

export function ContentPage({ slug, expectedKind }: ContentPageProps): ReactElement {
  const contentQuery = useQuery(contentQueries.document(slug))
  const navigationQuery = useQuery(contentQueries.navigation())

  if (contentQuery.isLoading) {
    return <ContentLoadingState />
  }

  if (contentQuery.isError) {
    if (contentQuery.error instanceof ApiRequestError && contentQuery.error.status === 404) {
      return <ContentNotFoundState />
    }

    return <ContentErrorState />
  }

  const document = contentQuery.data

  if (document === undefined) {
    return <ContentErrorState />
  }

  if (expectedKind !== undefined && document.summary.kind !== expectedKind) {
    return <ContentNotFoundState />
  }

  const Presentation = document.summary.presentation === undefined
    ? undefined
    : getProjectPresentation(document.summary.presentation)
  if (document.summary.presentation !== undefined && Presentation === undefined) {
    return <ContentErrorState />
  }
  const writingPresentation = document.summary.kind === 'writing'
    ? getWritingPresentation(document.summary.slug)
    : undefined
  const WritingFigure = writingPresentation?.figure.Component
  const WritingBody = document.summary.kind === 'writing'
    ? getWritingArticleBody(document.summary.slug)
    : undefined

  const relatedSummaries = navigationQuery.data ?? []
  const fallbackSlugs =
    document.summary.relatedSlugs.length === 0 && navigationQuery.isSuccess
      ? relatedSummaries
          .filter((item) => item.kind === 'writing' && item.slug !== document.summary.slug)
          .slice(0, 3)
          .map((item) => item.slug)
      : []
  const slugsToShow =
    document.summary.relatedSlugs.length > 0 ? document.summary.relatedSlugs : fallbackSlugs
  const relatedNavigationUnavailable =
    document.summary.relatedSlugs.length > 0 && navigationQuery.isError
  const kindItems = relatedSummaries.filter((item) => item.kind === document.summary.kind)
  const projectVisualSlugs = new Set<ProjectVisualSlug>([
    'codex-marketplace',
    'agentic-learning-lab',
    'adventures-of-patch',
    'wild-bunch',
  ])
  const projectVisualSlug = document.summary.kind === 'project' && projectVisualSlugs.has(document.summary.slug as ProjectVisualSlug)
    ? document.summary.slug as ProjectVisualSlug
    : null
  const hasHeaderVisual = projectVisualSlug !== null || WritingFigure !== undefined
  const visualContract = writingPresentation === undefined ? document.summary.presentation === 'marketplace-case-study'
    ? 'marketplace-case-study-hero'
    : document.summary.presentation === 'patch-pipeline-case-study'
      ? 'patch-case-study-hero'
    : document.summary.presentation === 'wild-bunch-case-study'
      ? 'wild-bunch-case-study-hero'
    : document.summary.presentation === 'learning-lab-case-study'
      ? 'learning-lab-case-study-hero'
      : 'content-page-header' : writingPresentation.visualContract
  const routeMetadata = getRouteMetadata(getContentPath(document.summary))

  const articleBody = (
    <div className={`content-page-body${Presentation === undefined ? '' : ' content-page-body--presentation'}`}>
      {Presentation === undefined
        ? WritingBody === undefined
          ? <MarkdownContent markdown={document.markdown ?? ''} />
          : <WritingBody markdown={document.markdown ?? ''} />
        : <Suspense fallback={<SpecialistPresentationLoading />}><Presentation /></Suspense>}
    </div>
  )

  const writingHeaderVisual = WritingFigure === undefined ? undefined : (
    <div className="content-page-visual content-page-visual--writing">
      <Suspense fallback={<div className="writing-figure__loading" aria-hidden="true" data-loading="writing-figure" />}><WritingFigure /></Suspense>
    </div>
  )

  return (
    <SiteLayout>
      <DocumentMetadata
        title={`${document.summary.title} | Harley Bartles`}
        description={document.summary.summary}
        canonicalPath={getContentPath(document.summary)}
      />
      <article
        className={`content-page content-page--${document.summary.kind}`}
        aria-labelledby="content-page-title"
        data-visual-language={document.summary.kind === 'writing' ? 'authored-longform' : document.summary.kind}
        data-type-register={document.summary.kind === 'writing' ? 'article-serif' : 'site-sans'}
      >
        {document.summary.kind === 'writing' ? (
          <WritingArticleShell
            summary={document.summary}
            summaries={relatedSummaries}
            navigationUnavailable={navigationQuery.isError}
            presentation={writingPresentation}
            visualContract={visualContract}
            headerVisual={writingHeaderVisual}
          >
            {articleBody}
          </WritingArticleShell>
        ) : <><header
          className={`content-page-header${hasHeaderVisual ? ' content-page-header--visual' : ''}`}
          data-visual-contract={visualContract}
          role={writingPresentation === undefined ? undefined : 'region'}
          aria-label={writingPresentation?.regionLabel}
        >
          <div className="content-page-intro">
            <p className="eyebrow">{document.summary.kind}</p>
            <h1 id="content-page-title">{document.summary.title}</h1>
            <p className="content-summary">{document.summary.summary}</p>
            {document.summary.kind === 'project' && projectVisualSlug !== 'wild-bunch' ? <ProjectStatus status={document.summary.status} /> : null}
          </div>
          {document.summary.kind === 'project' && projectVisualSlug === 'wild-bunch' ? (
            <div className="content-page-status-anchor"><ProjectStatus status={document.summary.status} /></div>
          ) : null}
          {projectVisualSlug === null ? null : (
            <div className="content-page-visual"><ProjectVisual slug={projectVisualSlug} eager={projectVisualSlug === 'wild-bunch' || projectVisualSlug === 'adventures-of-patch' || projectVisualSlug === 'agentic-learning-lab'} placement="case-study-hero" /></div>
          )}
        </header>
        {articleBody}
        {(
          <RelatedContent
            slugs={slugsToShow}
            summaries={relatedSummaries}
            unavailable={relatedNavigationUnavailable}
          />
        )}
        <ContentNavigation items={kindItems} currentSlug={document.summary.slug} />
        {routeMetadata?.shareAction === 'content-end' ? (
          <ShareAction title={document.summary.title} path={routeMetadata.path} />
        ) : null}
        </>}
      </article>
    </SiteLayout>
  )
}
