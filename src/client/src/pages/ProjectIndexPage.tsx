import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { contentQueries } from '../app/queryClient'
import { ProjectStatus } from '../components/ProjectStatus'
import { SiteLayout } from '../components/SiteLayout'
import { getContentPath } from '../types/content'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export function ProjectIndexPage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())

  return (
    <SiteLayout>
      <section className="content-index" aria-labelledby="project-index-title">
        <p className="eyebrow">Projects</p>
        <h1 id="project-index-title">Project Stories</h1>
        <p className="content-summary">
          Selected public work, framed by what each project is for and the trade-offs behind it.
        </p>
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <nav aria-label="Project stories">
            <ul className="content-card-list">
              {navigationQuery.data
                .filter((item) => item.kind === 'project')
                .map((item) => (
                  <li className="content-card" key={item.slug}>
                    <h2>
                      <a href={getContentPath(item)}>{item.title}</a>
                    </h2>
                    <p>{item.summary}</p>
                    <ProjectStatus status={item.status} />
                  </li>
                ))}
            </ul>
          </nav>
        ) : null}
      </section>
    </SiteLayout>
  )
}
