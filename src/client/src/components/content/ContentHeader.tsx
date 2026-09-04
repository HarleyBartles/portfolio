import type { ReactNode } from 'react'
import styled from 'styled-components'

export type ContentHeaderRegister = 'site-sans' | 'article-serif'

type ContentHeaderProps = {
  eyebrow: string
  title: string
  summary: string
  metadata?: ReactNode
  status?: ReactNode
  statusAnchor?: ReactNode
  visual?: ReactNode
  visualContract: string
  regionLabel?: string
  register: ContentHeaderRegister
}

const Header = styled.header<{ $hasVisual: boolean }>`
  margin-bottom: ${({ theme }) => theme.space.xxl};

  ${({ $hasVisual, theme }) => $hasVisual ? `
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(20rem, 7fr);
    gap: clamp(${theme.space.xl}, 6vw, ${theme.space.xxxl});
    align-items: center;
    border-bottom: 1px solid ${theme.color.border};
    padding-bottom: clamp(var(--space-10), 7vw, ${theme.space.xxxl});
  ` : `
    max-width: ${theme.layout.readingMeasure};
  `}

  @media (max-width: 64rem) {
    ${({ $hasVisual }) => $hasVisual ? 'grid-template-columns: minmax(0, 1fr) minmax(18rem, 1fr);' : ''}
  }

  @media (max-width: 46rem) {
    ${({ $hasVisual, theme }) => $hasVisual ? `
      grid-template-columns: 1fr;
      gap: ${theme.space.xl};
    ` : ''}
  }
`

const Intro = styled.div`
  min-width: 0;

  > .eyebrow {
    margin: 0 0 ${({ theme }) => theme.space.sm};
  }

  > .content-header__metadata {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
    margin: ${({ theme }) => theme.space.md} 0 0;
    overflow-wrap: anywhere;
    color: ${({ theme }) => theme.color.muted};
    font-family: ${({ theme }) => theme.font.siteSans};
    font-size: ${({ theme }) => theme.type.metadataSize};
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: .012em;
    text-transform: none;
  }

  > .content-header__metadata span + span::before {
    content: '·';
    margin-right: ${({ theme }) => theme.space.lg};
    color: currentColor;
  }
`

const Title = styled.h1<{ $register: ContentHeaderRegister }>`
  && {
    margin: 0;
    font-family: ${({ $register, theme }) => $register === 'article-serif' ? theme.font.articleSerif : theme.font.siteSans};
    font-size: ${({ $register, theme }) => $register === 'article-serif' ? 'clamp(38px, 4.2vw, 52px)' : theme.type.siteDisplaySize};
    line-height: ${({ $register, theme }) => $register === 'article-serif' ? '1.04' : theme.type.siteDisplayLeading};
    letter-spacing: ${({ theme }) => theme.type.siteDisplayTracking};
  }
`

const Summary = styled.p`
  max-width: 42rem;
  margin: ${({ theme }) => theme.space.lg} 0 0;
  color: ${({ theme }) => theme.color.muted};
  font-size: clamp(1.1rem, 2.4vw, 1.35rem);
  line-height: 1.45;
`

const Visual = styled.div`
  min-width: 0;
`

const StatusAnchor = styled.div`
  min-width: 0;
`

export const ContentHeader = ({
  eyebrow,
  title,
  summary,
  metadata,
  status,
  statusAnchor,
  visual,
  visualContract,
  regionLabel,
  register,
}: ContentHeaderProps) => {
  const hasVisual = visual != null
  return (
    <Header
      className={`content-page-header${hasVisual ? ' content-page-header--visual' : ''}`}
      data-visual-contract={visualContract}
      data-type-register={register}
      role={regionLabel === undefined ? undefined : 'region'}
      aria-label={regionLabel}
      $hasVisual={hasVisual}
    >
      <Intro className="content-page-intro">
        <p className="eyebrow">{eyebrow}</p>
        <Title id="content-page-title" $register={register}>{title}</Title>
        {metadata === undefined ? null : <p className="content-header__metadata editorial-meta content-date">{metadata}</p>}
        <Summary className="content-summary">{summary}</Summary>
        {status}
      </Intro>
      {statusAnchor === undefined ? null : <StatusAnchor className="content-page-status-anchor">{statusAnchor}</StatusAnchor>}
      {visual == null ? null : <Visual className="content-page-visual">{visual}</Visual>}
    </Header>
  )
}
