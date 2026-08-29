import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { EditorialBalancedHeading } from '../components/editorial/EditorialTextWrap'
import { EditorialThemeProvider } from '../components/editorial/EditorialThemeProvider'
import { ExternalLink } from '../components/ExternalLink'
import { SiteLayout } from '../components/SiteLayout'
import { getProjectSummaries } from '../data/documents'
import { professionalProfile } from '../data/professionalProfile'
import { CvDocument, CvSheet } from './cv/CvSurface'
import './CvPage.scss'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`
const projectStories = getProjectSummaries()

export function CvPage(): ReactElement {
  const { github, linkedin } = professionalProfile.publicLinks

  return (
    <SiteLayout>
      <DocumentMetadata
        title="CV | Harley Bartles"
        description="CV for Harley Bartles, a full-stack software engineer with 7+ years in production systems across .NET, React, Python and AI-assisted automation."
        canonicalPath="/cv"
      />
      <EditorialThemeProvider>
        <CvDocument aria-labelledby="cv-name">
          <nav className="cv-screen-controls" aria-label="CV actions">
            <a className="button-link" href={pdfHref}>
              Download PDF
            </a>
          </nav>

          <CvSheet data-cv-page="1" aria-labelledby="cv-name">
            <header className="cv-header">
              <div className="cv-header__identity">
                <p className="eyebrow">Curriculum vitae</p>
                <h1 id="cv-name">Harley Bartles</h1>
              </div>
              <p className="cv-headline">Full-stack software engineer</p>
              <div className="cv-header__details">
                <p>
                  {professionalProfile.availability.shortLabel} · {professionalProfile.noticePeriod}
                </p>
                <ul className="cv-links" aria-label="Professional links">
                  <li>
                    <Link to="/">harleybartles.com</Link>
                  </li>
                  <li>
                    <ExternalLink href={linkedin.href}>LinkedIn</ExternalLink>
                  </li>
                  <li>
                    <ExternalLink href={github.href}>GitHub</ExternalLink>
                  </li>
                  <li>
                    <Link to="/about#contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </header>

            <section className="cv-section" aria-labelledby="cv-profile-title">
              <h2 id="cv-profile-title">Profile</h2>
              <p>
                Full-stack software engineer with 7+ years in production systems. At The Access
                Group I'm currently the sole engineer responsible for Access Checks. I'm looking for
                a senior full-stack role where end-to-end ownership is expected and there's still
                something difficult left to learn.
              </p>
            </section>

            <section
              className="cv-section cv-section--employment"
              aria-labelledby="cv-access-title"
            >
              <h2 id="cv-access-title">Professional experience</h2>
              <h3>The Access Group</h3>
              <p className="cv-role">Software Engineer · September 2021 – present</p>
              <p>
                I joined Recruitment CRM, volunteered for a move to Access Screening in January
                2023, then moved into Access Checks from its early greenfield stage. I'm now the
                sole engineer responsible for designing, delivering, operating and supporting Access
                Checks.
              </p>
              <ul>
                <li>
                  Turn product epics into delivery plans and own technical design, implementation,
                  DevOps, release, production support and continuing operation across a .NET API
                  on Azure Functions, a React/.NET portal and its supporting automation services.
                </li>
                <li>
                  Designed and delivered a browser-automation service for DBS Update and Right to
                  Work Sharecode checks where the authoritative government services expose web
                  journeys rather than suitable APIs. The LLM is bounded to locating page elements
                  and proposing browser actions; deterministic code executes the actions and
                  extracts the result.
                </li>
                <li>
                  Made source evidence a hard success condition: no captured government result, no
                  successful check, and a no-charge signal downstream. The service enabled Access
                  Screening to offer two additional paid checks inside its normal screening journey.
                </li>
                <li>
                  Owned a cross-product v1-to-v2 migration where Access Screening was both the
                  original upstream supplier and becoming a downstream consumer of Access Checks. I
                  sequenced the remaining v1 consumers first, preventing a valid but wasteful round
                  trip through both generations of Access Checks. The old v1 endpoint is now unused
                  and tracked for retirement.
                </li>
                <li>
                  Earlier on Recruitment CRM, replaced a cursor-heavy chain of stored procedures
                  with set-based SQL, reducing a several-minute operation to a couple of seconds
                  while preserving existing single-ID callers.
                </li>
              </ul>
            </section>
          </CvSheet>

          <CvSheet data-cv-page="2" aria-label="CV page 2">
            <p className="cv-running-title">Harley Bartles · CV · 2 / 2</p>
            <section
              className="cv-section cv-section--employment"
              aria-labelledby="cv-barbican-title"
            >
              <EditorialBalancedHeading as="h2" data-text-wrap="balanced" id="cv-barbican-title">
                Barbican Insurance Group → Arch Capital Group
              </EditorialBalancedHeading>
              <p className="cv-role">
                Full Stack Software Engineer (Barbican) · Software Engineer, Level 1 → Level 2
                (Arch) · February 2019 – September 2021
              </p>
              <p>
                My first professional engineering role was at Barbican Insurance Group. I moved
                with the product after Arch Capital acquired the company and spent roughly two years
                on LENS in a three-person engineering team, progressing from Level 1 to Level 2 in
                Arch's three-level software-engineer framework.
              </p>
              <ul>
                <li>
                  Built a complex insurance application across .NET Core, React/Redux and SQL
                  Server, working deeply with DDD, CQRS, event sourcing and layered/onion
                  architecture.
                </li>
                <li>
                  Worked in a domain where dense business rules needed explicit modelling and full
                  replay and audit history made the event-sourced design earn its cost. That's where
                  I learned that architecture has to earn its place.
                </li>
              </ul>
            </section>

            <section
              className="cv-section cv-section--employment"
              aria-labelledby="cv-brand-title"
            >
              <h2 id="cv-brand-title">Brand Addition</h2>
              <p className="cv-role">
                2005–2015: order administration → Account Executive → Account Manager → Team Manager
                <br />
                May 2015–January 2019: Web Manager
              </p>
              <p>
                I started in order administration, became an Account Executive, then an Account
                Manager, before moving into team management.
              </p>
              <ul>
                <li>
                  As Team Manager, I managed an operational account-support unit: 3–5 Account
                  Managers, around eight Account Executives and two Order Administrators. I
                  identified a web change the team needed and worked with the Ecommerce Director to
                  specify and deliver it, which led to the Web Manager role.
                </li>
                <li>
                  As Web Manager I defined requirements, coordinated external developers, held
                  platform and delivery responsibility, and helped migrate and maintain more than
                  100 multilingual, multicurrency stores.
                </li>
              </ul>
            </section>

            <section className="cv-section" aria-labelledby="cv-independent-title">
              <h2 id="cv-independent-title">Independent engineering projects</h2>
              <div className="cv-independent-work">
                {projectStories.map((project) => (
                  <section key={project.slug}>
                    <h3>
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p>{project.summary}</p>
                  </section>
                ))}
              </div>
            </section>

            <section className="cv-section" aria-labelledby="cv-education-title">
              <h2 id="cv-education-title">Technical skills</h2>
              <div className="cv-skills">
                <p>
                  <strong>Current</strong> C# / .NET · Azure · Azure Functions · Azure DevOps · AWS
                  · React · TypeScript / JavaScript · Python / Django · SQL Server / MySQL · REST
                  APIs · Git / GitHub
                </p>
                <p>
                  <strong>Testing</strong> Unit · application · integration · browser · xUnit · NUnit
                  · pytest · Django/unittest · FakeItEasy · Playwright · Jest
                </p>
                <p>
                  <strong>Earlier production experience</strong> React Native · Redux · GraphQL ·
                  SignalR · RabbitMQ / message brokers · Angular · TeamCity · Octopus Deploy · TFS
                </p>
              </div>
              <h2>Education and current study</h2>
              <dl className="cv-education">
                {professionalProfile.education.map((record) => (
                  <div key={record.id}>
                    <dt>{record.level}</dt>
                    <dd>
                      <h3>{record.title}</h3>
                      {record.provider === undefined ? null : (
                        <p>
                          {record.provider}
                          {record.providerWebsiteLabel === undefined
                            ? null
                            : ` (${record.providerWebsiteLabel})`}
                        </p>
                      )}
                      {record.periodLabel === undefined ? null : <p>{record.periodLabel}</p>}
                      {record.detail === undefined ? null : <p>{record.detail}</p>}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </CvSheet>
        </CvDocument>
      </EditorialThemeProvider>
    </SiteLayout>
  )
}
