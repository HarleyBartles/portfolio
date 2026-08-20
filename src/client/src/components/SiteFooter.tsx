import type { ReactElement } from 'react'

export function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <p>Harley Bartles. I build agentic engineering workflows and silly comics.</p>
      <p className="footer-links">
        <a href="https://github.com/HarleyBartles" rel="noreferrer noopener" target="_blank">
          GitHub
        </a>
      </p>
    </footer>
  )
}
