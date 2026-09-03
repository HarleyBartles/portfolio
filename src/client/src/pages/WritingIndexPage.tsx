import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { contentQueries } from '../app/queryClient'
import { DocumentMetadata, IndexHeader, SiteLayout, WritingIndexEntry } from '../components'
import { sortWriting } from '../utils'
import type { ContentSummaryOf } from '../types'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'
import '../styles/interior.scss'

const WritingList = styled.section`
  margin-top: clamp(${({ theme }) => theme.space.xxl}, 9vw, ${({ theme }) => theme.space.xxxxl});

  > .eyebrow {
    margin-bottom: ${({ theme }) => theme.space.m};
  }
`

export const WritingIndexPage = () => {
  const navigationQuery = useQuery(contentQueries.navigation())
  const writing = sortWriting(navigationQuery.data ?? []).filter((item): item is ContentSummaryOf<'writing'> => item.kind === 'writing')

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Writing and Notes | Harley Bartles"
        description="Notes on engineering practice, agentic systems, and repository design."
        canonicalPath="/writing"
      />
      <section className="content-index writing-index" aria-labelledby="writing-index-title">
        <IndexHeader
          eyebrow="Writing / field notes"
          title="Writing and Notes"
          summary="Judgment is easier to inspect when it is written down. These are notes from building agentic workflows, repositories, and review systems in public."
          layout="split"
          headingId="writing-index-title"
        />
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess && writing.length > 0 ? (
          <WritingList className="writing-list" aria-label="Writing, newest first" data-visual-contract="writing-peer-list">
            <p className="eyebrow">All writing / newest first</p>
            {writing.map((item, index) => <WritingIndexEntry item={item} index={index} key={item.slug} />)}
          </WritingList>
        ) : null}
      </section>
    </SiteLayout>
  )
}
