import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <div className="footer-primary">
        <p>Independent notes, working systems, and occasional Patch misadventures.</p>
        <ul className="footer-links" aria-label="Footer links">
          <li><a href="https://github.com/HarleyBartles" rel="noreferrer noopener" target="_blank">GitHub</a></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/writing">Writing</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <p className="footer-copyright">© 2026 Harley Bartles. Built in public, judged by the evidence.</p>
    </footer>
  )
}
