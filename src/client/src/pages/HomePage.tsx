import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'
import { FeatureDeck } from '../features/home/FeatureDeck'
import { buildHomeFeatures } from '../features/home/featureCatalog'
import { ProjectVisual } from '../features/home/ProjectVisual'
import type { ContentSummary } from '../types/content'
import { getContentPath } from '../types/content'
import { formatContentDate, sortWriting } from '../utils/content'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

function findItem(items: readonly ContentSummary[], slug: string): ContentSummary | undefined {
  return items.find((item) => item.slug === slug)
}

export function HomePage(): ReactElement {
  const navigationQuery = useQuery(contentQueries.navigation())

  if (navigationQuery.isLoading) {
    return <SiteLayout><LoadingPage shell={false} /></SiteLayout>
  }

  if (navigationQuery.isError) {
    return <SiteLayout><ErrorPage shell={false} /></SiteLayout>
  }

  const items = navigationQuery.data ?? []
  const features = buildHomeFeatures(items)
  const projects = ['codex-marketplace', 'wild-bunch', 'agentic-learning-lab']
    .map((slug) => findItem(items, slug))
    .filter((item): item is ContentSummary => item !== undefined)
  const writing = sortWriting(items)
  const featuredEssay = findItem(items, 'agentic-engineering-vs-vibe-coding')
  const recentWriting = writing.filter((item) => item.slug !== featuredEssay?.slug).slice(0, 3)

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Harley Bartles | Senior Software Engineer"
        description="Senior software engineer building reliable agentic systems, public tools, and memorable visual explanations."
        canonicalPath="/"
      />

      <section className="hero" aria-labelledby="homepage-title" data-visual-contract="homepage-masthead">
        <p className="eyebrow">Senior software engineer / agentic systems</p>
        <div className="hero-grid">
          <div>
            <h1 id="homepage-title">Harley Bartles</h1>
            <p className="hero-thesis">I build reliable agentic systems.</p>
          </div>
          <div className="hero-aside">
            <p>I make workflows, repositories, and tools that help people ship, then turn some of the lessons into silly comics.</p>
            <div className="hero-actions">
              <a href="#selected-work" className="button-link">View selected work</a>
              <Link to="/about#contact" className="text-link">Work with me <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section" id="selected-work" aria-labelledby="feature-title" data-visual-contract="homepage-feature-deck">
        <header className="section-heading">
          <p className="eyebrow">Selected / shuffled on arrival</p>
          <h2 id="feature-title">Work worth bringing forward</h2>
          <p>Prominence changes. The proof stays available.</p>
        </header>
        <FeatureDeck items={features} />
      </section>

      <section className="case-studies" aria-labelledby="case-study-title">
        <header className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Case studies</p>
            <h2 id="case-study-title">Systems with edges</h2>
          </div>
          <p>Public work is most useful when you can see what it does, what it costs, and where it is unfinished.</p>
        </header>
        <div className="case-study-grid">
          {projects.map((project, index) => (
            <article className="case-study" key={project.slug}>
              <ProjectVisual slug={project.slug as 'codex-marketplace' | 'wild-bunch' | 'agentic-learning-lab'} />
              <div className="case-study-copy">
                <p className="eyebrow">0{index + 1} / {project.status}</p>
                <h3><Link to={getContentPath(project)}>{project.title}</Link></h3>
                <p>{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
        <Link to="/projects" className="text-link section-link">All project stories <span aria-hidden="true">→</span></Link>
      </section>

      <section className="working-principles" aria-labelledby="principles-title">
        <header className="section-heading">
          <p className="eyebrow">Working principles</p>
          <h2 id="principles-title">How the work stays honest</h2>
        </header>
        <ol>
          <li><span>01</span><h3>Requirements before architecture</h3><p>Start with the problem and constraints. Let patterns earn their place.</p><Link to="/projects/wild-bunch">See it under pressure</Link></li>
          <li><span>02</span><h3>Bounded agent leverage</h3><p>Give agents useful authority, a clear stop condition, and a route back to evidence.</p><Link to="/fairytales/sorcerers-apprentice">See the fairytale</Link></li>
          <li><span>03</span><h3>Evidence before claims</h3><p>Source truth, validation, and review remain human responsibilities.</p><Link to="/writing/context-is-not-state">Read the field note</Link></li>
        </ol>
      </section>

      <section className="home-writing" aria-labelledby="latest-writing-title">
        <header className="section-heading section-heading--split">
          <div><p className="eyebrow">Field notes</p><h2 id="latest-writing-title">Judgment, written down</h2></div>
          <p>Notes from building agentic workflows, repositories, and review systems in public.</p>
        </header>
        <div className="home-writing-grid">
          {featuredEssay === undefined ? null : (
            <article className="featured-essay">
              <p className="eyebrow">Featured essay / {formatContentDate(featuredEssay.date)}</p>
              <h3><Link to={getContentPath(featuredEssay)}>{featuredEssay.title}</Link></h3>
              <p>{featuredEssay.summary}</p>
            </article>
          )}
          <ol className="recent-notes">
            {recentWriting.map((item, index) => (
              <li key={item.slug}><span>0{index + 1}</span><div><p className="article-date">{formatContentDate(item.date)}</p><h3><Link to={getContentPath(item)}>{item.title}</Link></h3></div></li>
            ))}
          </ol>
        </div>
        <Link to="/writing" className="text-link section-link">Browse all field notes <span aria-hidden="true">→</span></Link>
      </section>

      <section className="home-close" aria-labelledby="home-close-title">
        <p className="eyebrow">The practical bit</p>
        <h2 id="home-close-title">Yes, this is also a portfolio.</h2>
        <p>The work makes the argument elsewhere. About is where I make it explicit.</p>
        <Link to="/about" className="button-link">Experience, working style, contact</Link>
      </section>
    </SiteLayout>
  )
}
