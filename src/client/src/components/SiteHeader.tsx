import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

const primaryLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/about', label: 'About' },
]

export function SiteHeader(): ReactElement {
  return (
    <header className="site-header">
      <Link to="/" className="site-mark" aria-label="Harley Bartles">
        HB
      </Link>
      <nav aria-label="Primary">
        <ul>
          {primaryLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
