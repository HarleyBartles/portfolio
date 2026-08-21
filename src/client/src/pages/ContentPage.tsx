import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
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
import { ProjectVisual, type ProjectVisualSlug } from '../features/home/ProjectVisual'
import type { ContentKind } from '../types/content'
import { getContentPath } from '../types/content'
import { formatContentDate, sortWriting } from '../utils/content'

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
      />
      <section className="state-panel" aria-labelledby="content-not-found-title">
        <h1 id="content-not-found-title">Page not found</h1>
        <p>This portfolio story is not available.</p>
        <Link to="/">Return to the homepage</Link>
      </section>
    </SiteLayout>
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
  const kindItems = document.summary.kind === 'writing'
    ? sortWriting(relatedSummaries)
    : relatedSummaries.filter((item) => item.kind === document.summary.kind)
  const projectVisualSlugs = new Set<ProjectVisualSlug>([
    'codex-marketplace',
    'agentic-learning-lab',
    'adventures-of-patch',
    'wild-bunch',
  ])
  const projectVisualSlug = document.summary.kind === 'project' && projectVisualSlugs.has(document.summary.slug as ProjectVisualSlug)
    ? document.summary.slug as ProjectVisualSlug
    : null
  const formattedDate = formatContentDate(document.summary.date)

  return (
    <SiteLayout>
      <DocumentMetadata
        title={`${document.summary.title} | Harley Bartles`}
        description={document.summary.summary}
        canonicalPath={getContentPath(document.summary)}
      />
      <article className={`content-page content-page--${document.summary.kind}`} aria-labelledby="content-page-title">
        <header
          className={`content-page-header${projectVisualSlug === null ? '' : ' content-page-header--visual'}`}
          data-visual-contract="content-page-header"
        >
          <div className="content-page-intro">
            <p className="eyebrow">{document.summary.kind}</p>
            <h1 id="content-page-title">{document.summary.title}</h1>
            {document.summary.kind === 'writing' && formattedDate !== null ? (
              <p className="editorial-meta content-date">
                <span>{formattedDate}</span>
                {document.summary.readingMinutes === undefined ? null : <span>{document.summary.readingMinutes} min read</span>}
              </p>
            ) : null}
            <p className="content-summary">{document.summary.summary}</p>
            {document.summary.kind === 'project' ? <ProjectStatus status={document.summary.status} /> : null}
          </div>
          {projectVisualSlug === null ? null : (
            <div className="content-page-visual"><ProjectVisual slug={projectVisualSlug} /></div>
          )}
        </header>
        <div className="content-page-body"><MarkdownContent markdown={document.markdown} /></div>
        {document.summary.kind === 'writing' ? null : (
          <RelatedContent
            slugs={slugsToShow}
            summaries={relatedSummaries}
            unavailable={relatedNavigationUnavailable}
          />
        )}
        <ContentNavigation items={kindItems} currentSlug={document.summary.slug} />
      </article>
    </SiteLayout>
  )
}
