import type { ReactElement } from 'react'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'

export function AboutPage(): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="About | Harley Bartles"
        description="About Harley Bartles, agentic engineering, and how to get in touch."
        canonicalPath="/about"
      />
      <section className="content-page about-page" aria-labelledby="about-title">
        <p className="eyebrow">About</p>
        <h1 id="about-title">Harley Bartles</h1>
        <p className="hero-support">I build agentic engineering workflows and silly comics.</p>
        <p>
          I am a senior software engineer working at the practical end of agentic systems. My work
          is about building environments, workflows, and tooling that make agent behaviour reliable
          and proportionate. The portfolio you are reading is one of those projects.
        </p>
        <p>
          I also run a public agent-asset marketplace, teach agentic workflows through a learning lab
          curriculum, and make one-page comics about the principles I keep returning to.
        </p>
        <p>
          The best way to reach me is through{' '}
          <a href="https://github.com/HarleyBartles" rel="noreferrer noopener" target="_blank">
            GitHub
          </a>
          .
        </p>
      </section>
    </SiteLayout>
  )
}
