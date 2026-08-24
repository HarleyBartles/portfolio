import type { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

const primaryLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/writing', label: 'Writing' },
  { to: '/patch', label: 'Patch' },
  { to: '/about', label: 'About' },
]

export function SiteHeader(): ReactElement {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
      <NavLink to="/" className="site-mark" aria-label="Harley Bartles, home">
        <img src={`${import.meta.env.BASE_URL}brand/hb-mark.svg`} alt="" width="52" height="52" />
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
    </>
  )
}
