import type { ReactNode } from 'react'
import styled from 'styled-components'
import { IndexEntrySummary, IndexEntryTitle, IndexEntryVisualLink, MetadataRow } from './content'
import { ProjectStatus, type ProjectStatusTone } from './ProjectStatus'
import { getContentPath, type ContentSummaryOf } from '../types'
import { formatContentDate } from '../utils'

type ProjectIndexEntryProps = {
  item: ContentSummaryOf<'project'>
  visual?: ReactNode
  statusTone?: ProjectStatusTone
}

const VisualLink = styled(IndexEntryVisualLink)`
  @media (min-width: 46.01rem) {
    height: clamp(13rem, 24vw, 18rem);
  }
`

const VisualSlot = styled.span`
  display: block;
  height: 100%;
  transition: transform ${({ theme }) => theme.motion.state} ${({ theme }) => theme.motion.easeOut};

  > * {
    height: 100%;
  }

  ${VisualLink}:hover & {
    transform: scale(1.012);
  }

  @media (prefers-reduced-motion: reduce) {
    ${VisualLink}:hover & {
      transform: none;
    }
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

export const ProjectIndexEntry = ({ item, visual, statusTone }: ProjectIndexEntryProps) => {
  const titleId = `project-${item.slug}-title`
  const path = getContentPath(item)
  const date = formatContentDate(item.date)
  const metadata = date === null
    ? []
    : [date, ...(item.readingMinutes === undefined ? [] : [`${item.readingMinutes} min read`])]

  return (
    <Entry className="editorial-card editorial-card--project" aria-labelledby={titleId}>
      {visual === undefined ? null : (
        <VisualLink to={path} className={`editorial-card-visual editorial-card-visual--${item.slug}`} aria-label={`View ${item.title}`}>
          <VisualSlot data-visual-slot>{visual}</VisualSlot>
        </VisualLink>
      )}
      <Copy className="editorial-card-copy" $hasVisual={visual !== undefined}>
        <EntryTitle id={titleId} to={path}>{item.title}</EntryTitle>
        <EntryMetadata items={metadata} />
        <IndexEntrySummary>{item.summary}</IndexEntrySummary>
        <ProjectStatus status={item.status} tone={statusTone} />
      </Copy>
    </Entry>
  )
}
