import type { ReactElement } from 'react'

const primaryLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#engineering-practice', label: 'Engineering Practice' },
  { href: '/#ai-engineering', label: 'AI Engineering' },
  { href: '/#writing-and-notes', label: 'Writing and Notes' },
]

export function SiteHeader(): ReactElement {
  return (
    <header className="site-header">
      <span className="site-mark" aria-label="Harley Bartles">
        HB
      </span>
      <nav aria-label="Primary">
        <ul>
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} aria-label={`${link.label} section`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
