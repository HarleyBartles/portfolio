import type { ReactNode } from 'react'
import styled from 'styled-components'

const Footnote = styled.p`
  margin: ${({ theme }) => theme.space.m} 0 0;
  color: ${({ theme }) => theme.color.inkSecondary};
  font-family: ${({ theme }) => theme.font.articleSerif};
  font-size: 0.93em;
  font-style: italic;
  line-height: 1.42;
`

export type EditorialFootnoteProps = {
  children: ReactNode
}

export const EditorialFootnote = ({ children }: EditorialFootnoteProps) => (
  <Footnote data-editorial-footnote data-type-register="article-serif">
    {children}
  </Footnote>
)
