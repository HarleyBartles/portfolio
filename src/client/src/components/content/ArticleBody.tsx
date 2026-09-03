import type { ReactNode } from 'react'
import styled from 'styled-components'

type ArticleBodyProps = {
  presentation: boolean
  children: ReactNode
}

const Body = styled.div`
  max-width: ${({ theme }) => theme.layout.readingMeasure};
`

export const ArticleBody = ({ presentation, children }: ArticleBodyProps) => (
  <Body className={`content-page-body${presentation ? ' content-page-body--presentation' : ''}`}>
    {children}
  </Body>
)
