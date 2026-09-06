import styled from 'styled-components'

const LoadingSection = styled.section`
  min-height: 8rem;
  max-width: ${({ theme }) => theme.layout.readingMeasure};
  padding-block: ${({ theme }) => theme.space.lg};
`

export function WritingArticleBodyLoading() {
  return (
    <LoadingSection>
      <p role="status" aria-label="Loading article">Loading article</p>
    </LoadingSection>
  )
}
