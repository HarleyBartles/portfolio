import type { ReactNode } from 'react'
import styled from 'styled-components'

type ArticleBodyProps = {
  measure: 'reading' | 'full'
  children: ReactNode
}

const Body = styled.div<{ $measure: ArticleBodyProps['measure'] }>`
  max-width: ${({ $measure, theme }) => $measure === 'reading' ? theme.layout.readingMeasure : 'none'};
`

export const ArticleBody = ({ measure, children }: ArticleBodyProps) => (
  <Body className="content-page-body" data-measure={measure} $measure={measure}>
    {children}
  </Body>
)
