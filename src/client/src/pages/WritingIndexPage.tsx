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
  display: grid;
`

export const WritingIndexPage = () => {
  const navigationQuery = useQuery(contentQueries.navigation())
  const writing = sortWriting(navigationQuery.data ?? []).filter((item): item is ContentSummaryOf<'writing'> => item.kind === 'writing')

  return (
    <SiteLayout>
      <DocumentMetadata canonicalPath="/writing" />
      <section className="content-index writing-index" aria-labelledby="writing-index-title">
        <IndexHeader
          title="Writing"
          headingId="writing-index-title"
        />
        {navigationQuery.isLoading ? <LoadingPage shell={false} /> : null}
        {navigationQuery.isError ? <ErrorPage shell={false} /> : null}
        {navigationQuery.isSuccess && writing.length > 0 ? (
          <WritingList className="writing-list" aria-label="Writing, newest first" data-visual-contract="writing-peer-list">
            {writing.map((item) => <WritingIndexEntry item={item} key={item.slug} />)}
          </WritingList>
        ) : null}
      </section>
    </SiteLayout>
  )
}
