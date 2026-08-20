import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'
import { getContentPath } from '../types/content'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export function FairytalesIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Patch Fairytales | Harley Bartles"
        description="One-page visual lessons on agentic engineering, told through Patch."
        canonicalPath="/fairytales"
      />
      <section className="content-index" aria-labelledby="fairytales-index-title">
        <p className="eyebrow">Patch Fairytales</p>
        <h1 id="fairytales-index-title">Patch Fairytales</h1>
        <p className="content-summary">
          One-page visual lessons on agentic engineering, told through Patch.
        </p>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <nav aria-label="Patch Fairytales">
            <ul className="content-card-list">
              {navigationQuery.data
                .filter((item) => item.kind === 'fairytales')
                .map((item) => (
                  <li className="content-card" key={item.slug}>
                    <h2>
                      <Link to={getContentPath(item)}>{item.title}</Link>
                    </h2>
                    <p>{item.summary}</p>
                  </li>
                ))}
            </ul>
          </nav>
        ) : null}
      </section>
    </SiteLayout>
  )
}
