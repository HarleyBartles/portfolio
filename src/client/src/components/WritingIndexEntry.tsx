import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type WritingIndexEntryProps = {
  item: ContentSummaryOf<'writing'>
  index: number
}

const Entry = styled.article`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(15rem, 5fr);
  gap: ${({ theme }) => theme.space.xl};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-block: ${({ theme }) => theme.space.xl};

  .editorial-card-copy {
    display: contents;
  }

  .eyebrow,
  h2,
  .editorial-meta {
    grid-column: 1;
  }

  .eyebrow,
  .editorial-meta,
  > .editorial-card-copy > p {
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

  .editorial-card-copy > p:not(.eyebrow, .editorial-meta) {
    grid-column: 2;
    grid-row: 1 / span 3;
    align-self: center;
    color: ${({ theme }) => theme.color.muted};
  }

  h2 + .editorial-meta {
    margin-bottom: ${({ theme }) => theme.space.md};
  }

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;

    .editorial-card-copy > p:not(.eyebrow, .editorial-meta) {
      grid-column: 1;
      grid-row: auto;
    }
  }
`

export const WritingIndexEntry = ({ item, index }: WritingIndexEntryProps) => {
  const titleId = `writing-${item.slug}-title`
  const date = formatContentDate(item.date)

  return (
    <Entry className="editorial-card editorial-card--writing" aria-labelledby={titleId}>
      <div className="editorial-card-copy">
        <p className="eyebrow">{String(index + 1).padStart(2, '0')} / writing</p>
        <h2 id={titleId}><Link to={getContentPath(item)}>{item.title}</Link></h2>
        {date === null ? null : <p className="editorial-meta"><span>{date}</span>{item.readingMinutes === undefined ? null : <span>{item.readingMinutes} min read</span>}</p>}
        <p>{item.summary}</p>
      </div>
    </Entry>
  )
}
