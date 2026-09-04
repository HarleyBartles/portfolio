import styled from 'styled-components'
import { Eyebrow, IndexEntrySummary, IndexEntryTitle, IndexEntryVisualLink, MetadataRow } from './content'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type PatchStoryIndexEntryProps = {
  item: ContentSummaryOf<'patch'>
  index: number
  media?: PatchStoryMedia
}

export type PatchStoryMedia = { alt: string; folder: string }

const Media = styled.picture`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Copy = styled.div<{ $hasVisual: boolean }>`
  border-top: ${({ $hasVisual, theme }) => $hasVisual ? '0' : `1px solid ${theme.color.ink}`};
  padding-top: ${({ $hasVisual, theme }) => $hasVisual ? theme.space.lg : theme.space.m};
`

const EntryTitle = styled(IndexEntryTitle)`
  margin: ${({ theme }) => theme.space.sm} 0 ${({ theme }) => theme.space.md};
`

const EntryMetadata = styled(MetadataRow)`
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Entry = styled.article`
  min-width: 0;
`

const publicPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const PatchStoryIndexEntry = ({ item, index, media }: PatchStoryIndexEntryProps) => {
  const titleId = `patch-${item.slug}-title`
  const path = getContentPath(item)
  const date = formatContentDate(item.date)
  const metadata = date === null
    ? []
    : [date, ...(item.readingMinutes === undefined ? [] : [`${item.readingMinutes} min read`])]

  return (
    <Entry className="editorial-card editorial-card--patch" aria-labelledby={titleId}>
      {media === undefined ? null : (
        <IndexEntryVisualLink to={path} className={`editorial-card-visual editorial-card-visual--${item.slug}`} aria-label={`View ${item.title}`}>
          <Media className="editorial-card-media fairytale-thumbnail">
            <source media="(max-width: 44rem)" srcSet={publicPath(`/fairytales/${media.folder}/page-640.webp`)} />
            <img src={publicPath(`/fairytales/${media.folder}/page-1200.webp`)} alt={media.alt} width="1200" height="675" loading="lazy" />
          </Media>
        </IndexEntryVisualLink>
      )}
      <Copy className="editorial-card-copy" $hasVisual={media !== undefined}>
        <Eyebrow>{String(index + 1).padStart(2, '0')} / Patch story</Eyebrow>
        <EntryTitle id={titleId} to={path}>{item.title}</EntryTitle>
        <EntryMetadata items={metadata} />
        <IndexEntrySummary>{item.summary}</IndexEntrySummary>
      </Copy>
    </Entry>
  )
}
