import styled from 'styled-components'
import {
  ContentContinuationFrame,
  ContentContinuationHeading,
  ContentContinuations,
  type ContentContinuation,
} from '../../components/ContentContinuations'

export type WritingContinuation = ContentContinuation

type WritingContinuationsProps = {
  items: readonly WritingContinuation[]
}

export const ContinuationHeading = ContentContinuationHeading

export const WritingContinuationsUnavailable = styled(ContentContinuationFrame)`
  p {
    color: ${({ theme }) => theme.color.muted};
  }
`

export const WritingContinuations = ({ items }: WritingContinuationsProps) => {
  return <ContentContinuations className="writing-continuations" items={items} />
}
