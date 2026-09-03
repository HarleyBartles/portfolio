import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type PatchStoryIndexEntryProps = {
  item: ContentSummaryOf<'patch'>
  index: number
}

const patchStoryMedia: Record<string, { alt: string; folder: string }> = {
  goldilocks: { alt: 'Three scenes compare too much, too little, and just enough guidance for Patch.', folder: 'goldilocks' },
  'sorcerers-apprentice': { alt: 'A bounded five-worker delegation expands into an uncontrolled crowd before a delegation policy restores limits.', folder: 'sorcerers-apprentice' },
}

const Entry = styled.article`
  min-width: 0;

  .editorial-card-visual {
    display: block;
    overflow: hidden;
    background: ${({ theme }) => theme.color.tealDeep};
  }

  .editorial-card-media,
  .editorial-card-media img {
    display: block;
    width: 100%;
  }

  .editorial-card-media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .editorial-card-media img {
    height: 100%;
    object-fit: cover;
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

function publicPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export const PatchStoryIndexEntry = ({ item, index }: PatchStoryIndexEntryProps) => {
  const titleId = `patch-${item.slug}-title`
  const date = formatContentDate(item.date)
  const media = patchStoryMedia[item.slug]

  return (
    <Entry className="editorial-card editorial-card--patch" aria-labelledby={titleId}>
      {media === undefined ? null : <Link to={getContentPath(item)} className={`editorial-card-visual editorial-card-visual--${item.slug}`} aria-label={`View ${item.title}`}>
        <picture className="editorial-card-media fairytale-thumbnail">
          <source media="(max-width: 44rem)" srcSet={publicPath(`/fairytales/${media.folder}/page-640.webp`)} />
          <img src={publicPath(`/fairytales/${media.folder}/page-1200.webp`)} alt={media.alt} width="1200" height="675" loading="lazy" />
        </picture>
      </Link>}
      <div className="editorial-card-copy">
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / Patch story</p>
        <h2 id={titleId}><Link to={getContentPath(item)}>{item.title}</Link></h2>
        {date === null ? null : <p className="editorial-meta"><span>{date}</span>{item.readingMinutes === undefined ? null : <span>{item.readingMinutes} min read</span>}</p>}
        <p>{item.summary}</p>
      </div>
    </Entry>
  )
}
