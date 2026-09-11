import type { CSSProperties } from 'react'
import styled from 'styled-components'

const StoryCard = styled.div`
  width: 100%;
  padding: 22px 24px;
  border: 1px solid rgb(32 35 31 / 52%);
  background: rgb(242 236 223 / 94%);
  box-shadow: 9px 11px 0 rgb(0 0 0 / 9%);

  p {
    margin: 0;
  }
`

type IndexStoryCardProps = {
  style?: CSSProperties
}

export const IndexStoryCard = ({ style }: IndexStoryCardProps) => {
  return (
    <StoryCard data-index-story-card style={style}>
      <p>Index is already moving before Patch finishes the pitch. She leads him across maps, revisions and overlapping records, tracing the provenance from source to source until one route holds together.</p>
    </StoryCard>
  )
}
