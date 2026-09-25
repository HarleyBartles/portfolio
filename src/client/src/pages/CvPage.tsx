import { DocumentMetadata, SiteLayout } from '../components'
import { getProjectSummaries, professionalProfile } from '../data'
import {
  CvDocument,
  CvSheet,
  CvHeader,
  CvSection,
  CvRole,
  CvRunningTitle,
  CvProjectList,
  CvParagraph,
  CvList,
  CvSkillParagraph,
  CvSkillLabel,
  CvEducationList,
  CvSubsectionTitle,
  CvDownloadFooter,
} from './cv'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`
const projectStories = getProjectSummaries()
const projectRepositoryUrls: Readonly<Record<string, string>> = {
  'codex-marketplace': 'https://github.com/HarleyBartles/agent-asset-marketplace',
  'agentic-learning-lab': 'https://github.com/HarleyBartles/agentic-learning-lab',
  'wild-bunch': 'https://github.com/HarleyBartles/wild-bunch',
  'adventures-of-patch': 'https://github.com/HarleyBartles/adventures-of-patch',
}
const cvProjectStories = projectStories.map((project) => {
  const repositoryUrl = projectRepositoryUrls[project.slug]
  if (repositoryUrl === undefined) {
    throw new Error(`Missing CV repository URL for project: ${project.slug}`)
  }
  const url = new URL(repositoryUrl)
  return {
    ...project,
    repositoryUrl: `${url.hostname.replace(/^www\./, '')}${url.pathname.replace(/\/$/, '')}`,
  }
})
const cvCopy = {
  eyebrow: 'Curriculum vitae',
  downloadLabel: 'Download PDF',
  headerDownloadAriaLabel: 'Download CV at the top',
  footerDownloadAriaLabel: 'Download CV at the end',
} as const

export const CvPage = () => {
  const { github, linkedin } = professionalProfile.publicLinks
  const printUrls = [professionalProfile.publicLinks.portfolio.href, github.href, linkedin.href].map((href) => {
    const url = new URL(href)
    return `${url.hostname.replace(/^www\./, '')}${url.pathname.replace(/\/$/, '')}`
  })

  return (
    <SiteLayout printSurface="paper">
      <DocumentMetadata canonicalPath="/cv" />
      <CvDocument aria-labelledby="cv-name" data-type-register="site-sans">
        <CvSheet data-cv-page="1" aria-labelledby="cv-name">
          <CvHeader
            headingId="cv-name"
            eyebrow={cvCopy.eyebrow}
            name="Harley Bartles"
            headline="Full-stack software engineer"
            availability={`${professionalProfile.availability.shortLabel} · ${professionalProfile.noticePeriod}`}
            links={[
              { label: 'harleybartles.com', href: '/' },
              { label: 'LinkedIn', href: linkedin.href, external: true },
              { label: 'GitHub', href: github.href, external: true },
              { label: 'Contact', href: '/contact' },
            ]}
            downloadHref={pdfHref}
            downloadLabel={cvCopy.downloadLabel}
            downloadAriaLabel={cvCopy.headerDownloadAriaLabel}
            printUrls={printUrls}
          />

          <CvSection headingId="cv-profile-title" title="Profile" divider="none">
            <CvParagraph $opening>
              Full-stack software engineer with 7+ years in production systems. At The Access Group I'm currently the
              sole engineer responsible for Access Checks. I'm looking for a senior full-stack role where end-to-end
              ownership is expected and there's still something difficult left to learn.
            </CvParagraph>
          </CvSection>

          <CvSection headingId="cv-access-title" title="The Access Group">
            <CvRole>Software Engineer · September 2021 – present</CvRole>
            <CvParagraph>
              I joined Recruitment CRM, volunteered for a move to Access Screening in January 2023, then moved into
              Access Checks from its early greenfield stage. I'm now the sole engineer responsible for designing,
              delivering, operating and supporting Access Checks.
            </CvParagraph>
            <CvList>
              <li>
                Turn product epics into delivery plans and own technical design, implementation, DevOps, release,
                production support and continuing operation across a .NET API on Azure Functions, a React/.NET portal
                and its supporting automation services.
              </li>
              <li>
                Designed and delivered a browser-automation service for DBS Update and Right to Work Sharecode checks
                where the authoritative government services expose web journeys rather than suitable APIs. The LLM is
                bounded to locating page elements and proposing browser actions; deterministic code executes the actions
                and extracts the result.
              </li>
              <li>
                Made source evidence a hard success condition: no captured government result, no successful check, and a
                no-charge signal downstream. The service enabled Access Screening to offer two additional paid checks
                inside its normal screening journey.
              </li>
              <li>
                Owned a cross-product v1-to-v2 migration where Access Screening was both the original upstream supplier
                and becoming a downstream consumer of Access Checks. I sequenced the remaining v1 consumers first,
                preventing a valid but wasteful round trip through both generations of Access Checks. The old v1
                endpoint is now unused and tracked for retirement.
              </li>
              <li>
                Earlier on Recruitment CRM, replaced a cursor-heavy chain of stored procedures with set-based SQL,
                reducing a several-minute operation to a couple of seconds while preserving existing single-ID callers.
              </li>
            </CvList>
          </CvSection>
          <CvSection
            headingId="cv-barbican-title"
            title="Barbican Insurance Group → Arch Capital Group"
            headingWrap="balanced"
          >
            <CvRole>
              Full Stack Software Engineer (Barbican) · Software Engineer, Level 1 → Level 2 (Arch) · February 2019 –
              September 2021
            </CvRole>
            <CvParagraph>
              My first professional engineering role was at Barbican Insurance Group. I moved with the product after
              Arch Capital acquired the company and spent roughly two years on LENS in a three-person engineering team,
              progressing from Level 1 to Level 2 in Arch's three-level software-engineer framework.
            </CvParagraph>
            <CvList>
              <li>
                Built a complex insurance application across .NET Core, React/Redux and SQL Server, working deeply with
                DDD, CQRS, event sourcing and layered/onion architecture.
              </li>
              <li>
                Worked in a domain where dense business rules needed explicit modelling and full replay and audit
                history made the event-sourced design earn its cost. That's where I learned that architecture has to
                earn its place.
              </li>
            </CvList>
          </CvSection>
          <CvSection headingId="cv-brand-title" title="Brand Addition">
            <CvRole>
              2005–2015: order administration → Account Executive → Account Manager → Team Manager
              <br />
              May 2015–January 2019: Web Manager
            </CvRole>
            <CvParagraph>
              I started in order administration, became an Account Executive, then an Account Manager, before moving
              into team management.
            </CvParagraph>
            <CvList>
              <li>
                As Team Manager, I managed an operational account-support unit: 3–5 Account Managers, around eight
                Account Executives and two Order Administrators. I identified a web change the team needed and worked
                with the Ecommerce Director to specify and deliver it, which led to the Web Manager role.
              </li>
              <li>
                As Web Manager I defined requirements, coordinated external developers, held platform and delivery
                responsibility, and helped migrate and maintain more than 100 multilingual, multicurrency stores.
              </li>
            </CvList>
          </CvSection>
        </CvSheet>

        <CvSheet data-cv-page="2" aria-label="CV page 2">
          <CvRunningTitle>Harley Bartles · CV · 2 / 2</CvRunningTitle>
          <CvSection headingId="cv-independent-title" title="Independent engineering projects">
            <CvProjectList projects={cvProjectStories} />
          </CvSection>

          <CvSection headingId="cv-education-title" title="Technical skills">
            <div>
              <CvSkillParagraph>
                <CvSkillLabel>Languages</CvSkillLabel> C# · TypeScript / JavaScript · Python
              </CvSkillParagraph>
              <CvSkillParagraph>
                <CvSkillLabel>Frameworks &amp; libraries</CvSkillLabel> .NET · React · Django · React Native · Redux · Angular
              </CvSkillParagraph>
              <CvSkillParagraph>
                <CvSkillLabel>Cloud &amp; delivery</CvSkillLabel> Azure · Azure Functions · Azure DevOps · AWS · TeamCity ·
                Octopus Deploy · TFS · Git / GitHub
              </CvSkillParagraph>
              <CvSkillParagraph>
                <CvSkillLabel>Data &amp; integration</CvSkillLabel> SQL Server / MySQL · REST APIs · GraphQL · SignalR ·
                RabbitMQ / message brokers
              </CvSkillParagraph>
              <CvSkillParagraph>
                <CvSkillLabel>Testing</CvSkillLabel> Unit · application · integration · browser · xUnit · NUnit · pytest
                · Django/unittest · FakeItEasy · Playwright · Jest
              </CvSkillParagraph>
            </div>
            <CvSubsectionTitle wrap="display">Education and current study</CvSubsectionTitle>
            <CvEducationList records={professionalProfile.education} />
          </CvSection>
        </CvSheet>
        <CvDownloadFooter
          downloadHref={pdfHref}
          downloadLabel={cvCopy.downloadLabel}
          downloadAriaLabel={cvCopy.footerDownloadAriaLabel}
        />
      </CvDocument>
    </SiteLayout>
  )
}
