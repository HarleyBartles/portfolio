import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ProjectVisual, type ProjectVisualSlug } from '../features/home/ProjectVisual'
import type { ContentSummary } from '../types/content'
import { getContentPath } from '../types/content'
import { formatContentDate } from '../utils/content'
import { ProjectStatus } from './ProjectStatus'

type EditorialIndexCardProps = {
  item: ContentSummary
  index: number
  featured?: boolean
}

const projectVisuals = new Set<ProjectVisualSlug>([
  'codex-marketplace',
  'agentic-learning-lab',
  'adventures-of-patch',
  'wild-bunch',
])

const fairytaleMedia: Record<string, { alt: string; folder: string }> = {
  goldilocks: {
    alt: 'Three scenes compare too much, too little, and just enough guidance for Patch.',
    folder: 'goldilocks',
  },
  'sorcerers-apprentice': {
    alt: 'A bounded five-worker delegation expands into an uncontrolled crowd before a delegation policy restores limits.',
    folder: 'sorcerers-apprentice',
  },
}

function publicPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

function CardMedia({ item }: { item: ContentSummary }): ReactElement | null {
  if (item.kind === 'project' && projectVisuals.has(item.slug as ProjectVisualSlug)) {
    return <ProjectVisual slug={item.slug as ProjectVisualSlug} />
  }

  if (item.kind === 'fairytales') {
    const media = fairytaleMedia[item.slug]
    if (media === undefined) return null
    return (
      <picture className="editorial-card-media fairytale-thumbnail">
        <source media="(max-width: 44rem)" srcSet={publicPath(`/fairytales/${media.folder}/page-640.webp`)} />
        <img
          src={publicPath(`/fairytales/${media.folder}/page-1200.webp`)}
          alt={media.alt}
          width="1200"
          height="675"
          loading="lazy"
        />
      </picture>
    )
  }

  return null
}

export function EditorialIndexCard({ item, index, featured = false }: EditorialIndexCardProps): ReactElement {
  const titleId = `${item.kind}-${item.slug}-title`
  const date = formatContentDate(item.date)
  const hasVisual = item.kind === 'project' || item.kind === 'fairytales'

  return (
    <article
      className={`editorial-card editorial-card--${item.kind}${featured ? ' editorial-card--featured' : ''}`}
      aria-labelledby={titleId}
      data-visual-contract={featured ? 'writing-editorial-lead' : undefined}
    >
      {hasVisual ? (
        <Link to={getContentPath(item)} className="editorial-card-visual" aria-label={`View ${item.title}`}>
          <CardMedia item={item} />
        </Link>
      ) : null}
      <div className="editorial-card-copy">
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / {item.kind === 'fairytales' ? 'Patch fairytale' : item.kind}</p>
        <h2 id={titleId}><Link to={getContentPath(item)}>{item.title}</Link></h2>
        {date === null ? null : (
          <p className="editorial-meta">
            <span>{date}</span>
            {item.readingMinutes === undefined ? null : <span>{item.readingMinutes} min read</span>}
          </p>
        )}
        <p>{item.summary}</p>
        {item.kind === 'project' ? <ProjectStatus status={item.status} /> : null}
      </div>
    </article>
  )
}
