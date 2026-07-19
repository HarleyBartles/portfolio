import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { ApiRequestError } from '../api/contentApi'
import { contentQueries } from '../app/queryClient'
import { MarkdownContent } from '../components/MarkdownContent'
import { ProjectStatus } from '../components/ProjectStatus'
import { RelatedContent } from '../components/RelatedContent'
import { SiteLayout } from '../components/SiteLayout'

type ContentPageProps = {
  slug: string
}

function ContentLoadingState(): ReactElement {
  return (
    <SiteLayout>
      <section className="state-panel" aria-labelledby="content-loading-title">
        <h1 id="content-loading-title">Preparing the portfolio</h1>
        <p role="status">Loading portfolio content.</p>
      </section>
    </SiteLayout>
  )
}

function ContentErrorState(): ReactElement {
  return (
    <SiteLayout>
      <section className="state-panel" aria-labelledby="content-error-title">
        <h1 id="content-error-title">Portfolio content unavailable</h1>
        <p role="alert">Could not load this portfolio story. Please refresh or try again later.</p>
      </section>
    </SiteLayout>
  )
}

function ContentNotFoundState(): ReactElement {
  return (
    <SiteLayout>
      <section className="state-panel" aria-labelledby="content-not-found-title">
        <h1 id="content-not-found-title">Page not found</h1>
        <p>This portfolio story is not available.</p>
        <a href="/">Return to the homepage</a>
      </section>
    </SiteLayout>
  )
}

export function ContentPage({ slug }: ContentPageProps): ReactElement {
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

  const relatedSummaries = navigationQuery.data ?? []

  return (
    <SiteLayout>
      <article className="content-page" aria-labelledby="content-page-title">
        <header className="content-page-header">
          <p className="eyebrow">{document.summary.kind}</p>
          <h1 id="content-page-title">{document.summary.title}</h1>
          <p className="content-summary">{document.summary.summary}</p>
          {document.summary.kind === 'project' ? <ProjectStatus status={document.summary.status} /> : null}
        </header>
        <MarkdownContent markdown={document.markdown} />
        <RelatedContent slugs={document.summary.relatedSlugs} summaries={relatedSummaries} />
      </article>
    </SiteLayout>
  )
}
