import type { ReactElement } from 'react'
import { ContactForm } from '../components/ContactForm'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'

const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

export function AboutPage(): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="About and Work With Me | Harley Bartles"
        description="Harley Bartles: full-stack experience, senior engineering responsibility, working style, and contact."
        canonicalPath="/about"
      />
      <article className="about-page" aria-labelledby="about-title">
        <header className="about-intro">
          <div>
            <p className="eyebrow">About / the explicit version</p>
            <h1 id="about-title">This is the part where I ask you to hire me.</h1>
          </div>
          <div className="about-intro-copy">
            <p className="about-lede">I am a full-stack software engineer with six and a half years of professional practice, working at the practical end of agentic systems.</p>
            <p>The rest of this site lets the work make the argument. Here is the direct version: I take senior responsibility for turning unclear, consequential problems into software that can be understood, tested, and changed.</p>
          </div>
        </header>

        <section className="about-proof" aria-labelledby="about-proof-title">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Why I am useful</p><h2 id="about-proof-title">Engineering judgment, with receipts.</h2></div>
            <p>I care about the gap between an impressive prototype and a system somebody can safely own.</p>
          </div>
          <dl className="about-facts">
            <div><dt>6.5 years</dt><dd>Professional full-stack practice across the layers a working product actually depends on.</dd></div>
            <div><dt>Senior responsibility</dt><dd>Requirements, architecture, delivery, review, recovery, and the quality of the evidence—not only implementation.</dd></div>
            <div><dt>AI-forward</dt><dd>Agents used as leverage inside explicit boundaries, with source truth and accountability kept visible.</dd></div>
          </dl>
        </section>

        <section className="about-working" aria-labelledby="about-working-title">
          <div className="about-section-number" aria-hidden="true">01</div>
          <div>
            <p className="eyebrow">How I work</p>
            <h2 id="about-working-title">Start with the decision that needs to survive.</h2>
            <p>I make requirements concrete, inspect the real source of truth, choose architecture proportionate to the problem, and leave a verification trail. With agents, I add clear authority, stop conditions, and a route back to evidence.</p>
            <p>The working loop is simple: direct, inspect, question, verify, and commit only what the evidence supports. That is as useful in a rescue job as it is in greenfield product work.</p>
          </div>
        </section>

        <section className="about-working" aria-labelledby="about-learning-title">
          <div className="about-section-number" aria-hidden="true">02</div>
          <div>
            <p className="eyebrow">Still learning deliberately</p>
            <h2 id="about-learning-title">Level 6 AI Engineering apprenticeship.</h2>
            <p>I am developing deeper AI engineering capability through structured study alongside practical work. The point is not a badge or a vocabulary upgrade; it is better judgment about where AI helps, where it fails, and how to build responsibly around both.</p>
          </div>
        </section>

        <section className="about-problems" aria-labelledby="about-problems-title">
          <p className="eyebrow">Bring me the awkward work</p>
          <h2 id="about-problems-title">Problems I am well suited to.</h2>
          <ul>
            <li><span>01</span><p>Agentic workflows that need to become reliable engineering systems rather than clever demonstrations.</p></li>
            <li><span>02</span><p>Repositories where standards, tests, tooling, and delivery have drifted away from one another.</p></li>
            <li><span>03</span><p>Full-stack product work that needs architectural restraint as much as technical range.</p></li>
            <li><span>04</span><p>Complex recovery or change where the evidence matters as much as the proposed fix.</p></li>
          </ul>
        </section>

        <aside className="cv-note" aria-labelledby="cv-title">
          <p className="eyebrow">CV / not theatre</p>
          <h2 id="cv-title">A conventional CV download is coming.</h2>
          <p>I will publish it when the employment chronology and claims have been checked for public release. Until then, the project stories, repositories, and writing here are the evidence I am comfortable asking you to assess.</p>
        </aside>

        <section className="about-contact" id="contact" aria-labelledby="contact-title">
          <header>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Have a useful problem?</h2>
            <p>Tell me what needs to change, why it matters, and what a good outcome looks like. No public email address; no harvested inbox.</p>
          </header>
          <ContactForm endpoint={contactEndpoint} />
        </section>
      </article>
    </SiteLayout>
  )
}
