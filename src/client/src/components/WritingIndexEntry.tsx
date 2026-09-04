import styled from 'styled-components'
import { Eyebrow, IndexEntrySummary, IndexEntryTitle, MetadataRow } from './content'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type WritingIndexEntryProps = {
  item: ContentSummaryOf<'writing'>
  index: number
}

const Copy = styled.div`
  display: contents;
`

const EntryEyebrow = styled(Eyebrow)`
  grid-column: 1;
`

const EntryTitle = styled(IndexEntryTitle)`
  grid-column: 1;
  margin: ${({ theme }) => theme.space.sm} 0 ${({ theme }) => theme.space.md};
`

const EntryMetadata = styled(MetadataRow)`
  grid-column: 1;
  margin-bottom: ${({ theme }) => theme.space.md};
`

const EntrySummary = styled(IndexEntrySummary)`
  grid-column: 2;
  grid-row: 1 / span 3;
  align-self: center;
`

const Entry = styled.article`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(15rem, 5fr);
  gap: ${({ theme }) => theme.space.xl};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-block: ${({ theme }) => theme.space.xl};

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;

    ${EntrySummary} {
      grid-column: 1;
      grid-row: auto;
    }
  }
`

export const WritingIndexEntry = ({ item, index }: WritingIndexEntryProps) => {
  const titleId = `writing-${item.slug}-title`
  const date = formatContentDate(item.date)
  const metadata = date === null
    ? []
    : [date, ...(item.readingMinutes === undefined ? [] : [`${item.readingMinutes} min read`])]

  return (
    <Entry className="editorial-card editorial-card--writing" aria-labelledby={titleId}>
      <Copy className="editorial-card-copy">
        <EntryEyebrow>{String(index + 1).padStart(2, '0')} / writing</EntryEyebrow>
        <EntryTitle id={titleId} to={getContentPath(item)}>{item.title}</EntryTitle>
        <EntryMetadata items={metadata} />
        <EntrySummary>{item.summary}</EntrySummary>
      </Copy>
    </Entry>
  )
}
