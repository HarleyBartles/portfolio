import { Navigate, useLocation } from 'react-router-dom'
import { ActionRouteLink, DocumentMetadata, SiteLayout } from '../components'
import {
  getEngineeringExperienceLabel,
  getProjectSummaries,
  professionalProfile,
} from '../data'
import { EditorialPullQuote } from '../components/editorial'
import {
  AboutArticle,
  AboutRouteFigure,
  AboutIntro,
  NextRolePanel,
  ProfessionalStory,
  StoryParagraph,
  ProfessionalTimeline,
  TimelineParagraph,
  TimelineMetadata,
  IndependentWork,
  ProfessionalLink,
  ProfessionalExternalLink,
} from './about'
import type { ProfessionalTimelineEntry } from './about'

const projectStories = getProjectSummaries()
const careerEntries: readonly ProfessionalTimelineEntry[] = [
  {
    id: 'career-access',
    period: 'September 2021 – present',
    title: 'The Access Group',
    body: (
      <>
        <TimelineParagraph>
          I joined Recruitment CRM in 2021, then volunteered to move to
          Screening in January 2023. I learned Python, Django, MySQL and GitHub
          during that month and was contributing fully from February.
        </TimelineParagraph>
        <TimelineParagraph>
          I moved into Access Checks from its early greenfield stage and became
          its sole engineer around May 2026.
        </TimelineParagraph>
      </>
    ),
  },
  {
    id: 'career-barbican',
    period: 'February 2019 – September 2021',
    title: 'Barbican Insurance Group → Arch Capital Group',
    body: (
      <>
        <TimelineParagraph>
          I joined Barbican as a Full Stack Software Engineer in my first
          professional engineering role. Arch acquired the company and I moved
          with the product. In Arch's three-level framework I progressed from
          Software Engineer Level 1 to Level 2 before I left.
        </TimelineParagraph>
        <TimelineParagraph>
          That was the deep end. LENS was a genuinely complex insurance system
          with dense business rules, full replay and auditability. The domain
          needed explicit models, auditability and replay, and I learned DDD,
          CQRS and event sourcing in the work itself. That's where I first saw
          expensive architecture pay rent.
        </TimelineParagraph>
        <TimelineParagraph>Complexity has to earn its place.</TimelineParagraph>
        <ProfessionalLink to="/writing/why-adrs">
          Read the LENS handover story in Why ADRs?
        </ProfessionalLink>
      </>
    ),
  },
  {
    id: 'career-brand',
    period: 'July 2005 – January 2019',
    title: 'Brand Addition',
    body: (
      <>
        <TimelineMetadata>
          2005–2015: order administration → Account Executive → Account Manager
          → Team Manager
          <br />
          May 2015–January 2019: Web Manager
        </TimelineMetadata>
        <TimelineParagraph>
          I started in order administration, became an Account Executive, then
          an Account Manager, before moving into team management. While managing
          a team, I spotted a web change we needed and worked with the Ecommerce
          Director to specify and deliver it. That led to the Web Manager role.
        </TimelineParagraph>
        <TimelineParagraph>
          In that role I defined requirements, coordinated external developers,
          held platform and delivery responsibility, and helped migrate and
          maintain more than 100 multilingual, multicurrency stores. It was a
          hybrid business-systems and proto-development role, not a
          software-engineer job. It became the bridge into doing software
          engineering full time.
        </TimelineParagraph>
      </>
    ),
  },
  {
    id: 'previous-life-title',
    period: 'In another life',
    title: 'There was an acting career too.',
    kind: 'aside',
    body: (
      <>
        <TimelineParagraph>
          I acted on and off for about four years, including a role in series
          three of <em>Shameless</em>. It overlapped with the early part of my
          time at Brand Addition and has almost nothing to do with the
          engineering argument. And yet, it still feels worth mentioning.
        </TimelineParagraph>
        <ProfessionalExternalLink
          href={professionalProfile.publicLinks.imdb.href}
        >
          IMDb: Harley Bartles
        </ProfessionalExternalLink>
      </>
    ),
  },
]

export const AboutPage = () => {
  const location = useLocation()
  if (location.hash === '#contact') return <Navigate to="/contact" replace />

  const experience = getEngineeringExperienceLabel(new Date())

  return (
    <SiteLayout>
      <DocumentMetadata
        title="About | Harley Bartles"
        description={`Full-stack software engineer with ${experience} of professional experience, currently the sole engineer responsible for Access Checks at The Access Group. Career, independent work, current study and hiring details.`}
        canonicalPath="/about"
      />
      <AboutArticle
        aria-labelledby="about-title"
        data-type-register="site-sans"
      >
        <AboutIntro
          headingId="about-title"
          eyebrow="About"
          title="I still like writing code. I just know the job is bigger than that now."
          lead={
            <>
              I'm a full-stack software engineer with {experience} of
              professional experience. At The Access Group I'm currently the
              sole engineer responsible for Access Checks, taking work from
              product epics through technical design, implementation, release,
              support and operation.
            </>
          }
        />

        <NextRolePanel
          headingId="cv-title"
          eyebrow="Next role"
          title="I'm looking for a senior full-stack role."
          body={[
            <>
              Remote-first works best. I'm open to occasional UK-wide office
              travel, or Manchester hybrid up to one day a week. My notice
              period is four weeks.
            </>,
            <>
              I want a job where owning the shape of a problem, the technical
              decisions and what happens after release is normal, and where I
              still have people around me who know things I don't.
            </>,
          ]}
          actions={
            <>
              <ProfessionalLink to="/cv">Read the CV</ProfessionalLink>
              <ActionRouteLink to="/contact">Get in touch</ActionRouteLink>
            </>
          }
        />

        <ProfessionalStory
          headingId="access-title"
          eyebrow="Current work / The Access Group"
          period="September 2021 – present"
          title="Access Checks, end to end."
          lead={
            <>
              Product usually gives me the desired outcome as an epic. I turn
              that into a delivery plan, make the technical decisions, build it,
              handle the DevOps, release it, support it and keep it running.
            </>
          }
          visualContract="about-current-work"
          railKind="chronology"
        >
          <StoryParagraph>
            Access Checks is a .NET API on Azure Functions, with a React and
            .NET portal for API consumers, usage and webhook subscriptions. It
            also consumes a separate browser-automation service I designed and
            delivered for checks where the authoritative service is a website
            rather than a suitable API.
          </StoryParagraph>
          <StoryParagraph>
            DBS Update and Right to Work Sharecode are two live examples. Their
            government services expose web journeys rather than suitable APIs.
            The LLM handles the narrow part that benefits from interpretation:
            locating page elements and proposing browser actions. Deterministic
            code executes those actions and extracts the result.
          </StoryParagraph>
          <EditorialPullQuote
            attribution="Production invariant"
            typeRegister="site-sans"
          >
            No source capture, no success.
          </EditorialPullQuote>
          <StoryParagraph>
            Customers also need a rendering of the authoritative government
            result page so they can inspect the source. After hardening and
            load-testing the recovery paths, I removed partial-success delivery.
            If we don't have the capture, the check fails and downstream systems
            receive a no-charge signal.
          </StoryParagraph>
          <StoryParagraph>
            That work enabled Access Screening to offer two additional paid
            checks inside its normal screening journey.
          </StoryParagraph>
          <h3>Sometimes the important bit is the order.</h3>
          <StoryParagraph>
            Access Checks started by exposing capabilities that already lived in
            Access Screening. Screening was the original supplier behind some v1
            endpoints while Access Checks built direct supplier integrations
            behind v2. As products moved onto v2, Screening itself was also
            becoming an Access Checks consumer.
          </StoryParagraph>
          <StoryParagraph>
            For three related checks, switching Screening to v2 before the
            remaining v1 consumers had moved would have created a technically
            valid but pointless loop:
          </StoryParagraph>
          <AboutRouteFigure aria-label="Avoided v1-to-v2 migration route">
            remaining v1 consumer -&gt; Access Checks v1 -&gt; Access Screening
            -&gt; Access Checks v2 -&gt; direct supplier
          </AboutRouteFigure>
          <StoryParagraph>
            Every hop worked. The route just added latency, failure surface and
            support opacity for no customer value.
          </StoryParagraph>
          <StoryParagraph>
            I made migration of the remaining v1 consumers a prerequisite. They
            moved first, Screening switched afterwards, and the loop never
            became the production design. The old v1 endpoint is now unused.
            Retiring it is still on my backlog.
          </StoryParagraph>
          <StoryParagraph>
            Those are two easy-to-explain examples from a lot of less photogenic
            work: integrations, migrations, production support, awkward edge
            cases, releases and keeping the product operable.
          </StoryParagraph>
        </ProfessionalStory>

        <ProfessionalTimeline
          headingId="career-title"
          eyebrow="Career"
          title="How I got here."
          entries={careerEntries}
        />

        <IndependentWork
          headingId="independent-title"
          eyebrow="Independent work"
          title="Work I can show you."
          intro="Employer systems have sensible confidentiality boundaries. My own projects are where I can show my working."
          projects={projectStories}
        />

        <ProfessionalStory
          headingId="study-title"
          eyebrow="Current study"
          period={professionalProfile.apprenticeship.periodLabel}
          title="AI Engineer Level 6."
          lead={
            <>
              I started QA's Level 6 AI Engineer apprenticeship in February
              2026. It runs through January 2028 and is a bachelor's
              degree-level programme against the Machine Learning Engineer
              standard. The syllabus covers machine learning, generative AI,
              model development, deployment, monitoring, ethics and security
              underneath the agent layer.
            </>
          }
          layout="split"
        ></ProfessionalStory>
      </AboutArticle>
    </SiteLayout>
  )
}
