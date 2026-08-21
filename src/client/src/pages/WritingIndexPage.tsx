import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { EditorialIndexCard } from '../components/EditorialIndexCard'
import { SiteLayout } from '../components/SiteLayout'
import { sortWriting } from '../utils/content'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export function WritingIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())
  const writing = sortWriting(navigationQuery.data ?? [])
  const featured = writing.find((item) => item.featured) ?? writing[0]
  const archive = writing.filter((item) => item.slug !== featured?.slug)

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Writing and Notes | Harley Bartles"
        description="Notes on engineering practice, agentic systems, and repository design."
        canonicalPath="/writing"
      />
      <section className="content-index writing-index" aria-labelledby="writing-index-title">
        <header className="index-intro index-intro--split">
          <div>
            <p className="eyebrow">Writing / field notes</p>
            <h1 id="writing-index-title">Writing and Notes</h1>
          </div>
          <p className="content-summary">Judgment is easier to inspect when it is written down. These are notes from building agentic workflows, repositories, and review systems in public.</p>
        </header>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess && featured !== undefined ? (
          <>
            <EditorialIndexCard item={featured} index={0} featured />
            <div className="writing-archive" aria-label="Writing archive">
              <p className="eyebrow">Archive / newest first</p>
              {archive.map((item, index) => <EditorialIndexCard item={item} index={index + 1} key={item.slug} />)}
            </div>
          </>
        ) : null}
      </section>
    </SiteLayout>
  )
}
