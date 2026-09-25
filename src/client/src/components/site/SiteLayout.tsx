import type { ReactNode } from 'react'
import styled from 'styled-components'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'
import { SiteHeader } from './SiteHeader'

export type SiteSurface = 'home' | 'interior'
export type SiteMainFrame = 'contained' | 'full'
export type SiteOpening = 'standard' | 'composed'

const SiteShell = styled.div<{ $surface: SiteSurface; $printSurface: 'site' | 'paper' }>`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  ${({ $surface, theme }) => $surface === 'interior' ? `
      --font-display: ${theme.font.siteSans};
      --font-body: ${theme.font.siteSans};
      background: ${theme.color.interiorCanvas};
      font-family: var(--font-body);
      font-size: ${theme.type.siteBodySize};
      line-height: ${theme.type.siteBodyLeading};
    ` : `
      --sans: ${theme.font.siteSans};
      --serif: ${theme.font.articleSerif};
      --mono: ${theme.font.technical};
      --mineral: ${theme.color.interiorCanvas};
      --surface: #f4f6f6;
      --ink: #172127;
      --muted: #56636b;
      --rule: rgb(23 33 39 / 22%);
      --rule-strong: rgb(23 33 39 / 42%);
      --focus: #005f87;
      --max: 76rem;
      background: ${theme.color.interiorCanvas};
      color: #172127;
      font-family: ${theme.font.siteSans};
      overflow-x: hidden;
    `}

  @media print {
    min-height: 0;
    display: block;
    ${({ $printSurface }) => $printSurface === 'paper' ? 'background: transparent;' : ''}
  }
`

const Main = styled(SiteFrame).attrs({ as: 'main' })<{ $surface: SiteSurface; $mainFrame: SiteMainFrame; $opening: SiteOpening }>`
  ${({ $opening }) => $opening === 'standard' ? 'padding-block-start: clamp(4rem, 9vw, 7rem);' : ''}
  ${({ $surface, $mainFrame }) => $surface === 'home' || $mainFrame === 'full' ? `
    width: 100%;
    max-width: none;
  ` : ''}

  @media print {
    width: auto;
    max-width: none;
    margin: 0;
    padding: 0;
  }
`

export const SiteLayout = ({ children, surface = 'interior', printSurface = 'site', mainFrame = 'contained', opening = 'standard' }: {
  children: ReactNode
  surface?: SiteSurface
  printSurface?: 'site' | 'paper'
  mainFrame?: SiteMainFrame
  opening?: SiteOpening
}) => {
  return (
    <SiteShell
      className={`site-shell site-shell--${surface}`}
      data-site-surface={surface}
      data-testid="site-shell"
      $surface={surface}
      $printSurface={printSurface}
    >
      <SiteHeader />
      <Main className="site-main" id="main-content" data-site-frame data-site-opening={opening} $surface={surface} $mainFrame={mainFrame} $opening={opening}>{children}</Main>
      <SiteFooter />
    </SiteShell>
  )
}
