import styled from 'styled-components'
import { Eyebrow, PageLead, PageTitle } from './PublicationPrimitives'

type IndexHeaderProps = {
  eyebrow: string
  title: string
  summary: string
  layout?: 'single' | 'split'
  headingId?: string
}

const Header = styled.header<{ $layout: 'single' | 'split' }>`
  max-width: ${({ $layout }) => $layout === 'split' ? 'none' : '54rem'};
  margin-bottom: clamp(${({ theme }) => theme.space.xl}, 9vw, ${({ theme }) => theme.space.xxl});

  ${({ $layout, theme }) => $layout === 'split' ? `
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(18rem, 5fr);
    gap: ${theme.space.xxl};
    align-items: end;
  ` : ''}

  @media (max-width: 46rem) {
    ${({ $layout, theme }) => $layout === 'split' ? `
      grid-template-columns: 1fr;
      gap: ${theme.space.lg};
    ` : ''}
  }
`

const Copy = styled.div`
  min-width: 0;
`

const HeaderEyebrow = styled(Eyebrow)`
  margin-bottom: ${({ theme }) => theme.space.md};
`

const Summary = styled(PageLead)<{ $layout: 'single' | 'split' }>`
  margin: ${({ $layout, theme }) => $layout === 'split' ? '0' : `${theme.space.lg} 0 0`};
`

export const IndexHeader = ({ eyebrow, title, summary, layout = 'single', headingId = 'index-header-title' }: IndexHeaderProps) => {
  return (
    <Header className={`index-intro${layout === 'split' ? ' index-intro--split' : ''}`} data-index-layout={layout} $layout={layout}>
      <Copy>
        <HeaderEyebrow>{eyebrow}</HeaderEyebrow>
        <PageTitle id={headingId} register="site-sans">{title}</PageTitle>
      </Copy>
      <Summary className="content-summary" $layout={layout}>{summary}</Summary>
    </Header>
  )
}
