import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { ApiRequestError } from '../api/contentApi'
import { contentQueries } from '../app/queryClient'
import { AccessibleStatus } from '../components/AccessibleStatus'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { MarkdownContent } from '../components/MarkdownContent'
import { ProjectStatus } from '../components/ProjectStatus'
import { RelatedContent } from '../components/RelatedContent'
import { SiteLayout } from '../components/SiteLayout'
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
      />
      <AccessibleStatus id="content-loading-title" title="Preparing the portfolio">
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
        <a href="/">Go to the homepage</a>
        <a href="/projects">Browse project stories</a>
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
        <a href="/">Return to the homepage</a>
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
  const relatedNavigationUnavailable =
    document.summary.relatedSlugs.length > 0 && navigationQuery.isError

  return (
    <SiteLayout>
      <DocumentMetadata
        title={`${document.summary.title} | Harley Bartles`}
        description={document.summary.summary}
        canonicalPath={getContentPath(document.summary)}
      />
      <article className="content-page" aria-labelledby="content-page-title">
        <header className="content-page-header">
          <p className="eyebrow">{document.summary.kind}</p>
          <h1 id="content-page-title">{document.summary.title}</h1>
          <p className="content-summary">{document.summary.summary}</p>
          {document.summary.kind === 'project' ? <ProjectStatus status={document.summary.status} /> : null}
        </header>
        <MarkdownContent markdown={document.markdown} />
        <RelatedContent
          slugs={document.summary.relatedSlugs}
          summaries={relatedSummaries}
          unavailable={relatedNavigationUnavailable}
        />
      </article>
    </SiteLayout>
  )
}
