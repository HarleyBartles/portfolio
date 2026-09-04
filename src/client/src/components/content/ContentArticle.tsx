import type { ReactNode } from 'react'
import styled from 'styled-components'
import type { ContentKind } from '../../types'

type ContentArticleProps = {
  kind: ContentKind
  visualLanguage: ContentKind | 'authored-longform'
  register: 'site-sans' | 'article-serif'
  children: ReactNode
}

const Article = styled.article`
  max-width: 76rem;
  padding-block: clamp(4rem, 9vw, 7rem);
`

export const ContentArticle = ({ kind, visualLanguage, register, children }: ContentArticleProps) => (
  <Article
    className="content-page"
    aria-labelledby="content-page-title"
    data-visual-language={visualLanguage}
    data-type-register={register}
    data-content-kind={kind}
  >
    {children}
  </Article>
)
