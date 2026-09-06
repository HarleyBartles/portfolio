import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { MetadataRow, PageLead, PageTitle } from '../../components'

export type WritingArticleHeaderLayout =
  | 'standard'
  | 'vibe-door-road'
  | 'decision-memory'
  | 'capability-read-path'
  | 'review-graph-authority'
  | 'agent-organisation-overhead'

export type WritingArticleHeaderProps = {
  title: string
  summary: string
  metadata?: readonly ReactNode[]
  visual?: ReactNode
  regionLabel?: string
  visualContract: string
  layout: WritingArticleHeaderLayout
}

const Intro = styled.div`
  min-width: 0;
`

const HeaderTitle = styled(PageTitle)<{ $layout: WritingArticleHeaderLayout }>`
  ${({ $layout }) => $layout === 'vibe-door-road' ? css`
    max-width: 13ch;
  ` : ''}

  ${({ $layout }) => $layout === 'capability-read-path' ? css`
    font-size: clamp(2.7rem, 5.2vw, 4.6rem);
  ` : ''}

  ${({ $layout }) => $layout === 'review-graph-authority' ? css`
    max-width: 21ch;
    font-size: clamp(2.5rem, 4.8vw, 4.6rem);
  ` : ''}

  @media (max-width: 46rem) {
    max-width: none;
  }
`

const HeaderMetadata = styled(MetadataRow)`
  margin-top: ${({ theme }) => theme.space.md};
`

const Summary = styled(PageLead)`
  margin: ${({ theme }) => theme.space.lg} 0 0;
`

const Visual = styled.div`
  min-width: 0;
`

const Header = styled.header<{ $hasVisual: boolean; $layout: WritingArticleHeaderLayout }>`
  margin-bottom: ${({ theme }) => theme.space.xxl};

  ${({ $hasVisual, theme }) => $hasVisual ? css`
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(20rem, 7fr);
    gap: clamp(${theme.space.xl}, 6vw, ${theme.space.xxxl});
    align-items: center;
    border-bottom: 1px solid ${theme.color.border};
    padding-bottom: clamp(var(--space-10), 7vw, ${theme.space.xxxl});
  ` : css`
    max-width: ${theme.layout.readingMeasure};
  `}

  ${({ $layout, theme }) => $layout === 'vibe-door-road' ? css`
    @media (min-width: 46.0625rem) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.45fr);
      gap: clamp(${theme.space.xl}, 6vw, ${theme.space.xxxl});
      align-items: center;
      padding-bottom: clamp(var(--space-10), 7vw, ${theme.space.xxxl});
    }

    @media (min-width: 46.0625rem) and (max-width: 64rem) {
      grid-template-columns: 1fr;
    }

  ` : ''}

  ${({ $layout }) => $layout === 'decision-memory' || $layout === 'capability-read-path' ? css`
    @media (min-width: 60rem) {
      grid-template-columns: minmax(16rem, 0.72fr) minmax(32rem, 1.28fr);
    }
  ` : ''}

  ${({ $layout }) => $layout === 'capability-read-path' ? css`
    align-items: start;
  ` : ''}

  ${({ $layout }) => $layout === 'review-graph-authority' ? css`
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-8);
    align-items: start;
    ${Intro} { max-width: min(48rem, 100%); }
  ` : ''}

  ${({ $layout }) => $layout === 'agent-organisation-overhead' ? css`
    @media (max-width: 68rem) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-8);
      align-items: start;
      ${Intro} { max-width: min(44rem, 100%); }
    }
  ` : ''}

  @media (max-width: 64rem) {
    ${({ $hasVisual, $layout }) => $hasVisual && $layout !== 'review-graph-authority' && $layout !== 'vibe-door-road' ? 'grid-template-columns: minmax(0, 1fr) minmax(18rem, 1fr);' : ''}
  }

  @media (max-width: 46rem) {
    ${({ $hasVisual, theme }) => $hasVisual ? css`
      grid-template-columns: 1fr;
      gap: ${theme.space.xl};
    ` : ''}
  }
`

export function WritingArticleHeader({
  title,
  summary,
  metadata,
  visual,
  regionLabel,
  visualContract,
  layout,
}: WritingArticleHeaderProps) {
  const hasVisual = visual !== undefined

  return (
    <Header
      className={`content-page-header writing-article-header${hasVisual ? ' content-page-header--visual writing-article-header--visual' : ''}`}
      data-writing-header-layout={layout}
      data-visual-contract={visualContract}
      data-type-register="article-serif"
      role={regionLabel === undefined ? undefined : 'region'}
      aria-label={regionLabel}
      $hasVisual={hasVisual}
      $layout={layout}
    >
      <Intro className="writing-article-header__intro">
        <HeaderTitle id="content-page-title" register="article-serif" $layout={layout}>{title}</HeaderTitle>
        {metadata === undefined ? null : <HeaderMetadata items={metadata} />}
        <Summary className="content-summary writing-article-header__summary">{summary}</Summary>
      </Intro>
      {hasVisual ? <Visual className="writing-article-header__visual" data-writing-header-visual>{visual}</Visual> : null}
    </Header>
  )
}
