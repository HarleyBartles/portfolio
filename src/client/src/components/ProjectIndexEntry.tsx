import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ProjectStatus } from './ProjectStatus'
import { ProjectVisual, type ProjectVisualSlug } from '../features/home/ProjectVisual'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type ProjectIndexEntryProps = {
  item: ContentSummaryOf<'project'>
  index: number
}

const Entry = styled.article`
  min-width: 0;

  .editorial-card-visual {
    display: block;
    overflow: hidden;
    background: ${({ theme }) => theme.color.tealDeep};
  }

  .editorial-card-visual .project-visual {
    transition: transform ${({ theme }) => theme.motion.state} ${({ theme }) => theme.motion.easeOut};
  }

  .editorial-card-visual:hover .project-visual {
    transform: scale(1.012);
  }

  .editorial-card-copy {
    border-top: 1px solid ${({ theme }) => theme.color.ink};
    padding-top: ${({ theme }) => theme.space.m};
  }

  .editorial-card-visual + .editorial-card-copy {
    border-top: 0;
    padding-top: ${({ theme }) => theme.space.lg};
  }

  .eyebrow,
  .editorial-meta,
  .editorial-card-copy > p {
    margin: 0;
  }

  h2 {
    margin: ${({ theme }) => theme.space.sm} 0 ${({ theme }) => theme.space.md};
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.8rem, 3.3vw, 3.25rem);
    line-height: 1;
    letter-spacing: -0.04em;
    text-wrap: balance;
  }

  h2 a {
    color: ${({ theme }) => theme.color.ink};
    text-decoration: none;
  }

  h2 a:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.color.accent};
  }

  .editorial-meta {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
    margin-bottom: ${({ theme }) => theme.space.md};
    color: ${({ theme }) => theme.color.muted};
    font-family: ${({ theme }) => theme.font.siteSans};
    font-size: ${({ theme }) => theme.type.metadataSize};
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: .012em;
    text-transform: none;
  }

  .editorial-meta span + span::before {
    content: '·';
    margin-right: ${({ theme }) => theme.space.lg};
    color: currentColor;
  }

  .editorial-card-copy > p:not(.eyebrow, .editorial-meta, .content-status) {
    color: ${({ theme }) => theme.color.muted};
  }
`

const projectVisuals = new Set<ProjectVisualSlug>([
  'codex-marketplace',
  'agentic-learning-lab',
  'adventures-of-patch',
  'wild-bunch',
])

export const ProjectIndexEntry = ({ item, index }: ProjectIndexEntryProps) => {
  const titleId = `project-${item.slug}-title`
  const date = formatContentDate(item.date)
  const hasVisual = projectVisuals.has(item.slug as ProjectVisualSlug)

  return (
    <Entry className="editorial-card editorial-card--project" aria-labelledby={titleId}>
      {hasVisual ? <Link to={getContentPath(item)} className={`editorial-card-visual editorial-card-visual--${item.slug}`} aria-label={`View ${item.title}`}><ProjectVisual slug={item.slug as ProjectVisualSlug} placement="index" /></Link> : null}
      <div className="editorial-card-copy">
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / Project</p>
        <h2 id={titleId}><Link to={getContentPath(item)}>{item.title}</Link></h2>
        {date === null ? null : <p className="editorial-meta"><span>{date}</span>{item.readingMinutes === undefined ? null : <span>{item.readingMinutes} min read</span>}</p>}
        <p>{item.summary}</p>
        <ProjectStatus status={item.status} />
      </div>
    </Entry>
  )
}
