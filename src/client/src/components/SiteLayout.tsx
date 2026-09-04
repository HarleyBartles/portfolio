import type { ReactNode } from 'react'
import styled from 'styled-components'
import { SiteFooter } from './SiteFooter'
import { SiteFrame } from './SiteFrame'
import { SiteHeader } from './SiteHeader'

export type SiteSurface = 'home' | 'interior'

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
  ` : ''}
`

const Main = styled(SiteFrame).attrs({ as: 'main' })``

export const SiteLayout = ({ children, surface = 'interior' }: {
  children: ReactNode
  surface?: SiteSurface
}) => {
  return (
    <SiteShell
      className={`site-shell site-shell--${surface}`}
      data-site-surface={surface}
      data-testid="site-shell"
      $surface={surface}
    >
      <SiteHeader showName={surface === 'interior'} />
      <Main className="site-main" id="main-content" data-site-frame>{children}</Main>
      <SiteFooter />
    </SiteShell>
  )
}
