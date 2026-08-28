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
        {navigationQuery.isSuccess && writing.length > 0 ? (
          <section className="writing-list" aria-label="Writing, newest first" data-visual-contract="writing-peer-list">
            <p className="eyebrow">All writing / newest first</p>
            {writing.map((item, index) => <EditorialIndexCard item={item} index={index} key={item.slug} />)}
          </section>
        ) : null}
      </section>
    </SiteLayout>
  )
}
