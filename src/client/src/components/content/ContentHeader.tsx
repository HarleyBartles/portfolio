import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Eyebrow, MetadataRow, PageLead, PageTitle, type PublicationRegister } from './PublicationPrimitives'

export type ContentHeaderRegister = PublicationRegister

type ContentHeaderProps = {
  eyebrow: string
  title: string
  summary: string
  metadata?: readonly ReactNode[]
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
`

const HeaderEyebrow = styled(Eyebrow)`
  margin-bottom: ${({ theme }) => theme.space.sm};
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
        <HeaderEyebrow>{eyebrow}</HeaderEyebrow>
        <PageTitle id="content-page-title" register={register}>{title}</PageTitle>
        {metadata === undefined ? null : <HeaderMetadata items={metadata} />}
        <Summary className="content-summary">{summary}</Summary>
        {status}
      </Intro>
      {statusAnchor === undefined ? null : <StatusAnchor className="content-page-status-anchor">{statusAnchor}</StatusAnchor>}
      {visual == null ? null : <Visual className="content-page-visual">{visual}</Visual>}
    </Header>
  )
}
