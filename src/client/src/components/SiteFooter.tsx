import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from './ExternalLink'

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <ul className="footer-links" aria-label="Footer links">
        <li><ExternalLink href="https://github.com/HarleyBartles">GitHub</ExternalLink></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/writing">Writing</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/cv">CV</Link></li>
      </ul>
      <p className="footer-copyright">© 2026 Harley Bartles.</p>
    </footer>
  )
}
