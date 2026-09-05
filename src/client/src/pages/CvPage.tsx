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
  CvSubheading,
  CvList,
  CvSkillParagraph,
  CvSkillLabel,
  CvEducationList,
  CvSectionTitle,
  CvDownloadFooter,
} from './cv'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`
const projectStories = getProjectSummaries()
const cvCopy = {
  eyebrow: 'Curriculum vitae',
  downloadLabel: 'Download PDF',
  headerDownloadAriaLabel: 'Download CV at the top',
  footerPrompt: 'Keep a copy.',
  footerDownloadAriaLabel: 'Download CV at the end',
} as const

export const CvPage = () => {
  const { github, linkedin } = professionalProfile.publicLinks

  return (
    <SiteLayout>
      <DocumentMetadata
        title="CV | Harley Bartles"
        description="CV for Harley Bartles, a full-stack software engineer with 7+ years in production systems across .NET, React, Python and AI-assisted automation."
        canonicalPath="/cv"
      />
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
          />

          <CvSection headingId="cv-profile-title" title="Profile" divider="none">
            <CvParagraph $opening>
              Full-stack software engineer with 7+ years in production systems. At The Access Group I'm currently the
              sole engineer responsible for Access Checks. I'm looking for a senior full-stack role where end-to-end
              ownership is expected and there's still something difficult left to learn.
            </CvParagraph>
          </CvSection>

          <CvSection headingId="cv-access-title" title="Professional experience">
            <CvSubheading>The Access Group</CvSubheading>
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
        </CvSheet>

        <CvSheet data-cv-page="2" aria-label="CV page 2">
          <CvRunningTitle>Harley Bartles · CV · 2 / 2</CvRunningTitle>
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

          <CvSection headingId="cv-independent-title" title="Independent engineering projects">
            <CvProjectList projects={projectStories} />
          </CvSection>

          <CvSection headingId="cv-education-title" title="Technical skills">
            <div>
              <CvSkillParagraph>
                <CvSkillLabel>Current</CvSkillLabel> C# / .NET · Azure · Azure Functions · Azure DevOps · AWS · React ·
                TypeScript / JavaScript · Python / Django · SQL Server / MySQL · REST APIs · Git / GitHub
              </CvSkillParagraph>
              <CvSkillParagraph>
                <CvSkillLabel>Testing</CvSkillLabel> Unit · application · integration · browser · xUnit · NUnit · pytest
                · Django/unittest · FakeItEasy · Playwright · Jest
              </CvSkillParagraph>
              <CvSkillParagraph>
                <CvSkillLabel>Earlier production experience</CvSkillLabel> React Native · Redux · GraphQL · SignalR ·
                RabbitMQ / message brokers · Angular · TeamCity · Octopus Deploy · TFS
              </CvSkillParagraph>
            </div>
            <CvSectionTitle wrap="display">Education and current study</CvSectionTitle>
            <CvEducationList records={professionalProfile.education} />
          </CvSection>
        </CvSheet>
        <CvDownloadFooter
          prompt={cvCopy.footerPrompt}
          downloadHref={pdfHref}
          downloadLabel={cvCopy.downloadLabel}
          downloadAriaLabel={cvCopy.footerDownloadAriaLabel}
        />
      </CvDocument>
    </SiteLayout>
  )
}
