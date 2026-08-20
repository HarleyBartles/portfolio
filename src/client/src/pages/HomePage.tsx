import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'
import { getContentPath } from '../types/content'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

function formatDate(value: string | undefined): string | null {
  if (value === undefined) {
    return null
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function HomePage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())

  if (navigationQuery.isLoading) {
    return (
      <SiteLayout>
        <LoadingPage shell={false} />
      </SiteLayout>
    )
  }

  if (navigationQuery.isError) {
    return (
      <SiteLayout>
        <ErrorPage shell={false} />
      </SiteLayout>
    )
  }

  const items = navigationQuery.data ?? []
  const projects = items.filter((item) => item.kind === 'project')
  const featuredProject = projects[0]
  const allWriting = items
    .filter((item) => item.kind === 'writing')
    .toSorted((a, b) => {
      const aDate = a.date ?? ''
      const bDate = b.date ?? ''
      return aDate.localeCompare(bDate)
    })
    .toReversed()
  const featuredWriting = allWriting.find((item) => item.featured) ?? undefined
  const latestWriting = allWriting
    .filter((item) => item.slug !== featuredWriting?.slug)
    .slice(0, 4)

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Harley Bartles | Agentic Engineering"
        description="I build agentic engineering workflows and silly comics."
        canonicalPath="/"
      />
      <section className="hero" aria-labelledby="homepage-title">
        <p className="eyebrow">Portfolio</p>
        <h1 id="homepage-title">Harley Bartles</h1>
        <p className="hero-support">I build agentic engineering workflows and silly comics.</p>
        <p>
          <Link to="/projects" className="hero-cta">
            See the work
          </Link>
        </p>
      </section>

      <section className="home-spotlight" aria-label="Featured work">
        {featuredWriting !== undefined ? (
          <article className="home-card" aria-labelledby="featured-writing-title">
            <p className="eyebrow">Featured note</p>
            <h2 id="featured-writing-title">
              <Link to={getContentPath(featuredWriting)}>{featuredWriting.title}</Link>
            </h2>
            {formatDate(featuredWriting.date) !== null ? (
              <p className="article-date">{formatDate(featuredWriting.date)}</p>
            ) : null}
            <p>{featuredWriting.summary}</p>
          </article>
        ) : null}

        {featuredProject !== undefined ? (
          <article className="home-card" aria-labelledby="featured-project-title">
            <p className="eyebrow">Featured project</p>
            <h2 id="featured-project-title">
              <Link to={getContentPath(featuredProject)}>{featuredProject.title}</Link>
            </h2>
            <p>{featuredProject.summary}</p>
            <p className="content-status">
              <span>Status</span>
              {featuredProject.status}
            </p>
          </article>
        ) : null}
      </section>

      <section className="latest-writing home-writing" aria-labelledby="latest-writing-title">
        <p className="eyebrow">Writing</p>
        <h2 id="latest-writing-title">Latest notes</h2>
        <ul className="content-card-list">
          {latestWriting.map((item) => (
            <li className="content-card" key={item.slug}>
              <h3>
                <Link to={getContentPath(item)}>{item.title}</Link>
              </h3>
              {formatDate(item.date) !== null ? (
                <p className="article-date">{formatDate(item.date)}</p>
              ) : null}
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
        <div className="home-actions">
          <Link to="/writing" className="home-cta">
            Browse all notes
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}
