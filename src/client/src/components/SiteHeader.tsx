import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

const primaryLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
]

export function SiteHeader(): ReactElement {
  return (
    <header className="site-header">
      <NavLink to="/" className="site-mark" aria-label="Harley Bartles">
        HB
      </NavLink>
      <nav aria-label="Primary">
        <ul>
          {primaryLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
