import type { ReactNode } from 'react'
import styled from 'styled-components'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'
import { SiteHeader } from './SiteHeader'

export type SiteSurface = 'home' | 'interior'
export type SiteMainFrame = 'contained' | 'full'

const SiteShell = styled.div<{ $surface: SiteSurface }>`
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
`

const Main = styled(SiteFrame).attrs({ as: 'main' })<{ $surface: SiteSurface; $mainFrame: SiteMainFrame }>`
  ${({ $surface, $mainFrame }) => $surface === 'home' || $mainFrame === 'full' ? `
    width: 100%;
    max-width: none;
  ` : ''}
`

export const SiteLayout = ({ children, surface = 'interior', mainFrame = 'contained' }: {
  children: ReactNode
  surface?: SiteSurface
  mainFrame?: SiteMainFrame
}) => {
  return (
    <SiteShell
      className={`site-shell site-shell--${surface}`}
      data-site-surface={surface}
      data-testid="site-shell"
      $surface={surface}
    >
      <SiteHeader showName={surface === 'interior'} />
      <Main className="site-main" id="main-content" data-site-frame $surface={surface} $mainFrame={mainFrame}>{children}</Main>
      <SiteFooter />
    </SiteShell>
  )
}
