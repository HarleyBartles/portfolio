import styled from 'styled-components'
import { IndexEntrySummary, IndexEntryTitle, MetadataRow } from './content'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type WritingIndexEntryProps = {
  item: ContentSummaryOf<'writing'>
}

const Copy = styled.div`
  display: contents;
`

const EntryTitle = styled(IndexEntryTitle)`
  grid-area: title;
  margin: 0 0 ${({ theme }) => theme.space.md};
`

const EntryMetadata = styled(MetadataRow)`
  grid-area: metadata;
  align-self: end;
`

const EntrySummary = styled(IndexEntrySummary)`
  grid-area: summary;
  align-self: start;
`

const Entry = styled.article`
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(15rem, 5fr);
  grid-template-areas:
    'title summary'
    'metadata summary';
  grid-template-rows: auto minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.xl};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding-block: ${({ theme }) => theme.space.xl};

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'metadata'
      'summary';
    grid-template-rows: auto;

    ${EntrySummary} {
      align-self: auto;
    }
  }
`

export const WritingIndexEntry = ({ item }: WritingIndexEntryProps) => {
  const titleId = `writing-${item.slug}-title`
  const date = formatContentDate(item.date)
  const metadata = date === null
    ? []
    : [date, ...(item.readingMinutes === undefined ? [] : [`${item.readingMinutes} min read`])]

  return (
    <Entry className="editorial-card editorial-card--writing" aria-labelledby={titleId}>
      <Copy className="editorial-card-copy">
        <EntryTitle id={titleId} to={getContentPath(item)}>{item.title}</EntryTitle>
        <EntryMetadata items={metadata} />
        <EntrySummary>{item.summary}</EntrySummary>
      </Copy>
    </Entry>
  )
}
