import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { EditorialIndexCard } from '../components/EditorialIndexCard'
import { SiteLayout } from '../components/SiteLayout'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export function FairytalesIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())
  const fairytales = navigationQuery.data?.filter((item) => item.kind === 'fairytales') ?? []

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Patch Fairytales | Harley Bartles"
        description="One-page visual lessons on agentic engineering, told through Patch."
        canonicalPath="/fairytales"
      />
      <section className="content-index fairytale-index" aria-labelledby="fairytales-index-title">
        <header className="index-intro index-intro--split">
          <div>
            <p className="eyebrow">Patch Fairytales / one-page lessons</p>
            <h1 id="fairytales-index-title">Small stories for difficult ideas</h1>
          </div>
          <p className="content-summary">Agentic engineering principles, turned into visual stories that are easier to remember and argue with.</p>
        </header>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <div className="editorial-index-grid editorial-index-grid--fairytales">
            {fairytales.map((item, index) => <EditorialIndexCard item={item} index={index} key={item.slug} />)}
          </div>
        ) : null}
      </section>
    </SiteLayout>
  )
}
