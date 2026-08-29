import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { EditorialIndexCard } from '../components/EditorialIndexCard'
import { SiteLayout } from '../components/SiteLayout'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import { getProjectSummaries } from '../data/documents'

export function ProjectIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())
  const projects = navigationQuery.data === undefined ? [] : getProjectSummaries(navigationQuery.data)

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Project Stories | Harley Bartles"
        description="Selected public engineering project stories from Harley Bartles."
        canonicalPath="/projects"
      />
      <section className="content-index project-index" aria-labelledby="project-index-title">
        <header className="index-intro">
          <p className="eyebrow">Projects / proof with rough edges intact</p>
          <h1 id="project-index-title">Project Stories</h1>
          <p className="content-summary">Public systems, teaching work, experiments, and visual pipelines, framed by what each one is for, what works now, and what it costs.</p>
        </header>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <div className="editorial-index-grid editorial-index-grid--projects">
            {projects.map((item, index) => <EditorialIndexCard item={item} index={index} key={item.slug} />)}
          </div>
        ) : null}
      </section>
    </SiteLayout>
  )
}
