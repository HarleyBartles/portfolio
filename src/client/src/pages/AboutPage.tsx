import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { CareerTimeline } from '../components/CareerTimeline'
import { ContactForm } from '../components/ContactForm'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'
import { getEngineeringExperienceLabel, professionalProfile } from '../data/professionalProfile'

const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
const cvPdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`

export function AboutPage(): ReactElement {
  const experienceLabel = getEngineeringExperienceLabel(new Date())

  return (
    <SiteLayout>
      <DocumentMetadata
        title="About and Work With Me | Harley Bartles"
        description="Harley Bartles: senior full-stack engineering scope, career evidence, working style, and contact."
        canonicalPath="/about"
      />
      <article className="about-page" aria-labelledby="about-title">
        <header className="about-intro">
          <div>
            <p className="eyebrow">About / professional truth</p>
            <h1 id="about-title">Senior full-stack engineering, with the evidence in view.</h1>
          </div>
          <div className="about-intro-copy">
            <p className="about-lede">I turn underspecified, consequential problems into software that can be understood, tested, operated, and changed.</p>
            <p>I work at the frontier of agentic engineering with senior responsibility for the decisions around the code: source truth, proportionate architecture, delivery, recovery, and evidence. This page is the direct version of the argument the rest of the portfolio makes through the work.</p>
          </div>
        </header>

        <section className="about-proof" aria-labelledby="about-proof-title" data-visual-contract="about-professional-proof">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">At a glance</p><h2 id="about-proof-title">Responsibility that did not wait for a title change.</h2></div>
            <p>Formal titles matter. So does the scope someone is trusted to carry. I keep the distinction visible.</p>
          </div>
          <dl className="about-facts">
            <div><dt>{experienceLabel}</dt><dd>{professionalProfile.engineeringStarted.label}.</dd></div>
            <div><dt>{professionalProfile.currentRole.formalTitle}</dt><dd>Formal title at {professionalProfile.currentRole.employer}; {professionalProfile.currentRole.scopeStarted.label.toLocaleLowerCase()}.</dd></div>
            <div><dt>Current scope</dt><dd>{professionalProfile.currentRole.scopeLabel}</dd></div>
          </dl>
        </section>

        <section className="about-story about-story--current" aria-labelledby="access-title">
          <div className="about-story__rail"><p className="eyebrow">Current practice / {professionalProfile.currentRole.employer}</p><p>{professionalProfile.currentRole.started.label} – present</p></div>
          <div className="about-story__content">
            <h2 id="access-title">From a recruiter-facing control surface to an operating product.</h2>
            <p>{professionalProfile.currentRole.scopeLabel}</p>
            <p>Product supplies desired outcomes as epics. I turn underspecified work into explicit items and a delivery plan, then own technical design, implementation, DevOps, release, production support, and continuing operation.</p>
            <p>Access Checks includes a .NET 8 API on Azure Functions, a React and .NET portal for API consumers, usage, and webhook subscriptions, and an AI-assisted browser-automation service built end to end. The automation is bounded: an LLM handles change and interpretation inside a deterministic API workflow where no suitable public API exists.</p>
            <p>I enjoy the work and have grown substantially at Access. The scope has outgrown the formal title, and there is no available progression in the current position. I am looking for a senior role where recognition, challenge, scope, and growth align.</p>
          </div>
        </section>

        <section className="about-career" aria-labelledby="career-title">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Career foundation</p><h2 id="career-title">The judgement has a history.</h2></div>
            <p>Compact chronology, rather than a replica of a profile page: enough context to understand the work that shaped the current practice.</p>
          </div>
          <CareerTimeline stages={professionalProfile.career} />
        </section>

        <section className="about-story about-story--study" aria-labelledby="study-title">
          <div className="about-story__rail"><p className="eyebrow">Formal AI depth</p><p>{professionalProfile.apprenticeship.periodLabel}</p></div>
          <div className="about-story__content">
            <h2 id="study-title">{professionalProfile.apprenticeship.title}, in progress.</h2>
            <p>A {professionalProfile.apprenticeship.qualificationLabel.toLowerCase()}, delivered by {professionalProfile.apprenticeship.provider} against the Machine Learning Engineer standard (ST1398 v1.0).</p>
            <p>{professionalProfile.apprenticeship.summary}</p>
          </div>
        </section>

        <section className="about-laboratory" aria-labelledby="laboratory-title">
          <div><p className="eyebrow">Independent engineering laboratory</p><h2 id="laboratory-title">Projects are where the claims become inspectable.</h2></div>
          <div>
            <p>Outside work, I build and publish the systems I want to be able to examine honestly: reusable worker capabilities with provenance and governance, a deterministic game architecture that earns its complexity, a controlled creative-production pipeline, and agentic learning material designed for practical judgement.</p>
            <p>That work is deliberately public enough to inspect, but it does not turn private employer context into a portfolio prop.</p>
          </div>
        </section>

        <section className="about-capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Capability signal</p><h2 id="capabilities-title">Useful on day one; honest about the edges.</h2></div>
            <p>I learn into unfamiliar stacks deliberately, without presenting every tool I have used as current, equal fluency.</p>
          </div>
          <div className="capability-list">
            {professionalProfile.capabilities.map((group) => (
              <section key={group.id} aria-labelledby={`capability-${group.id}`}>
                <p className="eyebrow">{group.qualification}</p>
                <h3 id={`capability-${group.id}`}>{group.label}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            ))}
          </div>
        </section>

        <section className="about-story about-story--working" aria-labelledby="working-title">
          <div className="about-story__rail"><p className="eyebrow">Working style</p><p>Evidence before confidence</p></div>
          <div className="about-story__content">
            <h2 id="working-title">Start with the decision that needs to survive.</h2>
            <p>I reproduce failure first, make requirements concrete, inspect the real source of truth, choose architecture proportionate to the problem, and leave a verification trail. Test design comes before the tool; dependencies remain supply-chain inputs whose provenance, behaviour, privacy, updates, and removal need architectural attention.</p>
            <p>With agents, I add clear authority, stop conditions, and a route back to evidence. The working loop is direct: inspect, question, verify, then commit only what the evidence supports.</p>
          </div>
        </section>

        <aside className="about-aside" aria-labelledby="previous-life-title">
          <p className="eyebrow">In a previous life</p>
          <h2 id="previous-life-title">There was an intermittent four-year acting career, too.</h2>
          <p>It included television work and a role in series three of <em>Shameless</em>. It belongs here as a small human aside, not as a second professional chronology.</p>
          <a className="text-link" href={professionalProfile.publicLinks.imdb.href} rel="noreferrer" target="_blank">{professionalProfile.publicLinks.imdb.label} <span aria-hidden="true">↗</span></a>
        </aside>

        <aside className="cv-note" aria-labelledby="cv-title" data-visual-contract="about-cv-conversion">
          <div>
            <p className="eyebrow">CV / hiring details</p>
            <h2 id="cv-title">A conventional CV, ready to read or print.</h2>
          </div>
          <div>
            <p>{professionalProfile.availability.fullLabel} {professionalProfile.noticePeriod}.</p>
            <p>The web version keeps the chronology accessible; the PDF is the same two-page hiring document in a conventional print format.</p>
            <div className="cv-note-actions">
              <Link className="text-link" to="/cv">Read the web CV</Link>
              <a className="button-link" href={cvPdfHref}>Download PDF</a>
            </div>
          </div>
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
