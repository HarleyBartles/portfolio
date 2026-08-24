import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { ExternalLink } from '../components/ExternalLink'
import { SiteLayout } from '../components/SiteLayout'
import { professionalProfile, type CareerStage } from '../data/professionalProfile'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`

function careerStage(id: string): CareerStage {
  const stage = professionalProfile.career.find((candidate) => candidate.id === id)

  if (stage === undefined) {
    throw new Error(`Missing CV career stage: ${id}`)
  }

  return stage
}

export function CvPage(): ReactElement {
  const access = careerStage('access')
  const barbicanArch = careerStage('barbican-arch')
  const brandAddition = careerStage('brand-addition')
  const { github, linkedin, portfolio } = professionalProfile.publicLinks

  return (
    <SiteLayout>
      <DocumentMetadata
        title="CV | Harley Bartles"
        description="A two-page CV for Harley Bartles, senior software engineer working across full-stack and agentic systems."
        canonicalPath="/cv"
      />
      <article className="cv-page" aria-labelledby="cv-name">
        <nav className="cv-screen-controls" aria-label="CV actions">
          <Link className="text-link" to="/about">Return to About</Link>
          <a className="button-link" href={pdfHref}>Download PDF</a>
        </nav>

        <section className="cv-sheet" data-cv-page="1" aria-labelledby="cv-name">
          <header className="cv-header">
            <div>
              <p className="eyebrow">Curriculum vitae</p>
              <h1 id="cv-name">Harley Bartles</h1>
              <p className="cv-headline">Senior software engineer | full-stack and agentic systems</p>
            </div>
            <div className="cv-header__details">
              <p>{professionalProfile.availability.shortLabel} · {professionalProfile.noticePeriod}</p>
              <p>{professionalProfile.availability.fullLabel}</p>
              <ul className="cv-links" aria-label="Professional links">
                <li><Link to="/">{portfolio.label}</Link></li>
                <li><ExternalLink href={linkedin.href}>{linkedin.label}</ExternalLink></li>
                <li><ExternalLink href={github.href}>{github.label}</ExternalLink></li>
                <li><Link to="/about#contact">Portfolio contact route</Link></li>
              </ul>
            </div>
          </header>

          <section className="cv-section" aria-labelledby="cv-profile-title">
            <h2 id="cv-profile-title">Profile</h2>
            <p>I enjoy turning underspecified, consequential problems into software that can be understood, tested, operated, and changed. I have grown into senior scope across full-stack delivery and agentic engineering, and I am looking for a larger next challenge with room to keep growing.</p>
          </section>

          <section className="cv-section" aria-labelledby="cv-contribution-title">
            <h2 id="cv-contribution-title">Immediate contribution</h2>
            <div className="cv-capabilities">
              {professionalProfile.capabilities.map((group) => (
                <section key={group.id} aria-labelledby={`cv-capability-${group.id}`}>
                  <p className="eyebrow">{group.qualification}</p>
                  <h3 id={`cv-capability-${group.id}`}>{group.label}</h3>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              ))}
            </div>
          </section>

          <section className="cv-section cv-section--employment" aria-labelledby="cv-access-title">
            <p className="eyebrow">Employment / {access.periodLabel}</p>
            <h2 id="cv-access-title">{access.heading}</h2>
            <p className="cv-role">{access.formalTitle}</p>
            <p>{professionalProfile.currentRole.scopeLabel}</p>
            <p>{access.summary}</p>
            <ul>{access.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </section>

        <section className="cv-sheet" data-cv-page="2" aria-label="CV page 2">
          <section className="cv-section cv-section--employment" aria-labelledby="cv-barbican-title">
            <p className="eyebrow">Employment / {barbicanArch.periodLabel}</p>
            <h2 id="cv-barbican-title">{barbicanArch.heading}</h2>
            <p>{barbicanArch.summary}</p>
            <ul>{barbicanArch.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="cv-section cv-section--employment" aria-labelledby="cv-brand-title">
            <p className="eyebrow">Employment / {brandAddition.periodLabel}</p>
            <h2 id="cv-brand-title">{brandAddition.heading}</h2>
            <p className="cv-role">{brandAddition.formalTitle}</p>
            <p>{brandAddition.summary}</p>
            <ul>{brandAddition.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="cv-section" aria-labelledby="cv-independent-title">
            <h2 id="cv-independent-title">Selected independent engineering</h2>
            <div className="cv-independent-work">
              {professionalProfile.independentWork.map((work) => (
                <section key={work.id}>
                  <h3><Link to={work.path}>{work.title}</Link></h3>
                  <p>{work.summary}</p>
                </section>
              ))}
            </div>
          </section>

          <section className="cv-section" aria-labelledby="cv-education-title">
            <h2 id="cv-education-title">Education</h2>
            <dl className="cv-education">
              {professionalProfile.education.map((record) => (
                <div key={record.id}>
                  <dt>{record.level}</dt>
                  <dd>
                    <h3>{record.title}</h3>
                    {record.provider === undefined ? null : <p>{record.provider}</p>}
                    {record.periodLabel === undefined ? null : <p>{record.periodLabel}</p>}
                    {record.detail === undefined ? null : <p>{record.detail}</p>}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </section>
      </article>
    </SiteLayout>
  )
}
