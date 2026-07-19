import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'
import { getContentPath } from '../types/content'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export function WritingIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Writing and Notes | Harley Bartles"
        description="Short public notes on engineering practice, AI work, and repository design."
        canonicalPath="/writing"
      />
      <section className="content-index" aria-labelledby="writing-index-title">
        <p className="eyebrow">Writing</p>
        <h1 id="writing-index-title">Writing and Notes</h1>
        <p className="content-summary">
          Short public notes on engineering practice, AI work, and repository design.
        </p>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <nav aria-label="Writing and notes">
            <ul className="content-card-list">
              {navigationQuery.data
                .filter((item) => item.kind === 'writing')
                .map((item) => (
                  <li className="content-card" key={item.slug}>
                    <h2>
                      <a href={getContentPath(item)}>{item.title}</a>
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
