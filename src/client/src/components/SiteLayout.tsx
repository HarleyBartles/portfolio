import type { ReactElement, ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export type SiteSurface = 'home' | 'interior'

export function SiteLayout({ children, surface = 'interior' }: {
  children: ReactNode
  surface?: SiteSurface
}): ReactElement {
  return (
    <div className={`site-shell site-shell--${surface}`}>
      <SiteHeader showName={surface === 'interior'} />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  )
}
