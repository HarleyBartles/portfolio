import { useQuery } from '@tanstack/react-query'
import { ProjectVisual, type ProjectVisualSlug } from '../features/home/ProjectVisual'
import styled from 'styled-components'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata, IndexHeader, ProjectIndexEntry, SiteLayout } from '../components'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import { getProjectSummaries } from '../data'
import type { ContentSummaryOf } from '../types'
import '../styles/interior.scss'

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(${({ theme }) => theme.space.xl}, 6vw, ${({ theme }) => theme.space.xxxxl}) ${({ theme }) => theme.space.xl};

  > .editorial-card:nth-child(4n + 1),
  > .editorial-card:nth-child(4n) {
    grid-column: span 7;
  }

  > .editorial-card:nth-child(4n + 2),
  > .editorial-card:nth-child(4n + 3) {
    grid-column: span 5;
  }

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;

    > .editorial-card,
    > .editorial-card:nth-child(n) {
      grid-column: auto;
    }
  }
`

const projectIndexOrder = new Map([
  ['wild-bunch', 0],
  ['adventures-of-patch', 1],
  ['agentic-learning-lab', 2],
  ['codex-marketplace', 3],
])

const projectVisualSlugs = new Set<ProjectVisualSlug>([
  'codex-marketplace',
  'agentic-learning-lab',
  'adventures-of-patch',
  'wild-bunch',
])

export function orderProjectIndex<T extends { slug: string }>(projects: readonly T[]): T[] {
  return [...projects].sort((left, right) => {
    const leftRank = projectIndexOrder.get(left.slug) ?? Number.MAX_SAFE_INTEGER
    const rightRank = projectIndexOrder.get(right.slug) ?? Number.MAX_SAFE_INTEGER
    return leftRank - rightRank
  })
}

export const ProjectIndexPage = () => {
  const navigationQuery = useQuery(contentQueries.navigation())
  const projects = navigationQuery.data === undefined ? [] : orderProjectIndex(getProjectSummaries(navigationQuery.data)).filter((item): item is ContentSummaryOf<'project'> => item.kind === 'project')

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Project Stories | Harley Bartles"
        description="Selected public engineering project stories from Harley Bartles."
        canonicalPath="/projects"
      />
      <section className="content-index project-index" aria-labelledby="project-index-title">
        <IndexHeader
          eyebrow="Projects / proof with rough edges intact"
          title="Project Stories"
          summary="Public systems, teaching work, experiments, and visual pipelines, framed by what each one is for, what works now, and what it costs."
          headingId="project-index-title"
        />
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess ? (
          <ProjectGrid className="editorial-index-grid editorial-index-grid--projects">
            {projects.map((item, index) => {
              const visualSlug = projectVisualSlugs.has(item.slug as ProjectVisualSlug)
                ? item.slug as ProjectVisualSlug
                : undefined

              return (
                <ProjectIndexEntry
                  item={item}
                  index={index}
                  key={item.slug}
                  visual={visualSlug === undefined ? undefined : <ProjectVisual slug={visualSlug} placement="index" />}
                />
              )
            })}
          </ProjectGrid>
        ) : null}
      </section>
    </SiteLayout>
  )
}
