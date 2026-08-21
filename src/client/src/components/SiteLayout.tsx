import type { ReactElement, ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout(props: { children: ReactNode }): ReactElement {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content">{props.children}</main>
      <SiteFooter />
    </div>
  )
}
