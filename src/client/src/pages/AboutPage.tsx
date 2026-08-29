import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { EditorialPullQuote } from '../components/editorial/EditorialPullQuote'
import { EditorialThemeProvider } from '../components/editorial/EditorialThemeProvider'
import { ExternalLink } from '../components/ExternalLink'
import { SiteLayout } from '../components/SiteLayout'
import { getProjectSummaries } from '../data/documents'
import { getEngineeringExperienceLabel, professionalProfile } from '../data/professionalProfile'
import { NextRolePanel, ProfessionalStory, ProfessionalStoryContent, ProfessionalStoryRail } from './about/ProfessionalSurface'
import './AboutPage.scss'

const pdfHref = `${import.meta.env.BASE_URL}harley-bartles-cv.pdf`
const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT
const projectStories = getProjectSummaries()

export function AboutPage(): ReactElement {
  const experience = getEngineeringExperienceLabel(new Date())

  return <SiteLayout>
    <DocumentMetadata title="About | Harley Bartles" description={`Full-stack software engineer with ${experience} of professional experience, currently the sole engineer responsible for Access Checks at The Access Group. Career, independent work, current study and hiring details.`} canonicalPath="/about" />
    <EditorialThemeProvider>
      <article className="about-page" aria-labelledby="about-title">
        <header className="about-intro">
          <div><p className="eyebrow">About</p><h1 id="about-title">I still like writing code. I just know the job is bigger than that now.</h1></div>
          <div className="about-intro-copy"><p className="about-lede">I'm a full-stack software engineer with {experience} of professional experience. At The Access Group I'm currently the sole engineer responsible for Access Checks, taking work from product epics through technical design, implementation, release, support and operation.</p><p>My formal title is Software Engineer. I'm looking for a senior role where that level of ownership is expected, and where there's still something difficult left to learn.</p></div>
        </header>

        <ProfessionalStory aria-labelledby="access-title" data-visual-contract="about-current-work">
          <ProfessionalStoryRail data-professional-story-rail><p className="eyebrow">Current work / The Access Group</p><p>September 2021 – present</p></ProfessionalStoryRail>
          <ProfessionalStoryContent>
            <h2 id="access-title">Access Checks, end to end.</h2>
            <p>Product usually gives me the desired outcome as an epic. I turn that into a delivery plan, make the technical decisions, build it, handle the DevOps, release it, support it and keep it running.</p>
            <p>Access Checks is a .NET 8 API on Azure Functions, with a React and .NET portal for API consumers, usage and webhook subscriptions. It also consumes a separate browser-automation service I designed and delivered for checks where the authoritative service is a website rather than a suitable API.</p>
            <p>DBS Update and Right to Work Sharecode are two live examples. Their government services expose web journeys rather than suitable APIs. The LLM handles the narrow part that benefits from interpretation: locating page elements and proposing browser actions. Deterministic code executes those actions and extracts the result.</p>
            <EditorialPullQuote attribution="Production invariant">No source capture, no success.</EditorialPullQuote>
            <p>Customers also need a rendering of the authoritative government result page so they can inspect the source. After hardening and load-testing the recovery paths, I removed partial-success delivery. If we don't have the capture, the check fails and downstream systems receive a no-charge signal.</p>
            <p>That work enabled Access Screening to offer two additional paid checks inside its normal screening journey.</p>
            <h3>Sometimes the important bit is the order.</h3>
            <p>Access Checks started by exposing capabilities that already lived in Access Screening. Screening was the original supplier behind some v1 endpoints while Access Checks built direct supplier integrations behind v2. As products moved onto v2, Screening itself was also becoming an Access Checks consumer.</p>
            <p>For three related checks, switching Screening to v2 before the remaining v1 consumers had moved would have created a technically valid but pointless loop:</p>
            <figure className="about-route" aria-label="Avoided v1-to-v2 migration route">remaining v1 consumer -&gt; Access Checks v1 -&gt; Access Screening -&gt; Access Checks v2 -&gt; direct supplier</figure>
            <p>Every hop worked. The route just added latency, failure surface and support opacity for no customer value.</p>
            <p>I made migration of the remaining v1 consumers a prerequisite. They moved first, Screening switched afterwards, and the loop never became the production design. The old v1 endpoint is now unused. Retiring it is still on my backlog.</p>
            <p>Those are two easy-to-explain examples from a lot of less photogenic work: integrations, migrations, production support, awkward edge cases, releases and keeping the product operable.</p>
          </ProfessionalStoryContent>
        </ProfessionalStory>

        <section className="about-career" aria-labelledby="career-title">
          <div className="section-heading"><p className="eyebrow">Career</p><h2 id="career-title">How I got here.</h2></div>
          <div className="career-timeline">
            <section className="career-timeline__stage"><div className="career-timeline__rail"><p className="eyebrow">July 2005 – January 2019</p></div><div className="career-timeline__content"><h3>Brand Addition</h3><p className="eyebrow">Commercial roles -&gt; team management -&gt; Web Manager</p><p>I spent almost fourteen years at Brand Addition, but Web Manager was only the last couple. I progressed through commercial roles and team management before I got there.</p><p>While managing a team, I spotted a web change we needed and worked with the Ecommerce Director to specify and deliver it. That led directly to an offer to move into Web Manager.</p><p>In that role I defined requirements, coordinated external developers, held platform and delivery responsibility, and helped migrate and maintain more than 100 multilingual, multicurrency stores. It was a hybrid business-systems and proto-development role, not a software-engineer job. It became the bridge into doing software engineering full time.</p></div></section>
            <section className="career-timeline__stage"><div className="career-timeline__rail"><p className="eyebrow">February 2019 – September 2021</p></div><div className="career-timeline__content"><h3>Barbican Insurance Group → Arch Capital Group</h3><p>I joined Barbican as a Full Stack Software Engineer in my first professional engineering role. Arch acquired the company and I moved with the product. In Arch's three-level framework I progressed from Software Engineer Level 1 to Level 2 before I left.</p><p>That was the deep end. LENS was a genuinely complex insurance system with dense business rules, full replay and auditability. The domain needed explicit models, auditability and replay, and I learned DDD, CQRS and event sourcing in the work itself. That's where I first saw expensive architecture pay rent.</p><p>Complexity has to earn its place.</p><Link className="text-link" to="/writing/why-adrs">Read the LENS handover story in Why ADRs?</Link></div></section>
            <section className="career-timeline__stage"><div className="career-timeline__rail"><p className="eyebrow">September 2021 – present</p></div><div className="career-timeline__content"><h3>The Access Group</h3><p>I joined Recruitment CRM in 2021, then volunteered to move to Screening in January 2023. I learned Python, Django, MySQL and GitHub during that month and was contributing fully from February.</p><p>I moved into Access Checks from its early greenfield stage and became its sole engineer around May 2026.</p></div></section>
          </div>
        </section>

        <section className="about-independent" aria-labelledby="independent-title"><p className="eyebrow">Independent work</p><h2 id="independent-title">Work I can show you.</h2><p>Employer systems have sensible confidentiality boundaries. My own projects are where I can show my working.</p>{projectStories.map((project) => <section className="about-independent__row" key={project.slug}><h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p><Link className="text-link" to={`/projects/${project.slug}`}>Read the case study</Link></section>)}</section>
        <ProfessionalStory aria-labelledby="study-title"><ProfessionalStoryRail data-professional-story-rail><p className="eyebrow">Current study</p><p>{professionalProfile.apprenticeship.periodLabel}</p></ProfessionalStoryRail><ProfessionalStoryContent><h2 id="study-title">AI Engineer Level 6 apprenticeship.</h2><p>I started QA's Level 6 AI Engineer apprenticeship in February 2026. It runs through January 2028 and is a bachelor's degree-level programme against the Machine Learning Engineer standard. The syllabus covers machine learning, generative AI, model development, deployment, monitoring, ethics and security underneath the agent layer.</p></ProfessionalStoryContent></ProfessionalStory>
        <aside className="about-aside" aria-labelledby="previous-life-title"><p className="eyebrow">In a previous life</p><h2 id="previous-life-title">There was an acting career too.</h2><p>I acted on and off for about four years, including a role in series three of <em>Shameless</em>. It has almost nothing to do with the engineering argument and still feels worth mentioning.</p><ExternalLink className="text-link" href={professionalProfile.publicLinks.imdb.href}>IMDb: Harley Bartles</ExternalLink></aside>
        <NextRolePanel aria-labelledby="cv-title" data-visual-contract="about-cv-conversion"><div><p className="eyebrow">Next role</p><h2 id="cv-title">I'm looking for a senior full-stack role.</h2></div><div><p>Remote-first works best. I'm open to occasional UK-wide office travel, or Manchester hybrid up to one day a week. My notice period is four weeks.</p><p>I want a job where owning the shape of a problem, the technical decisions and what happens after release is normal, and where I still have people around me who know things I don't.</p><div><Link className="text-link" to="/cv">Read the CV</Link><a className="button-link" href={pdfHref}>Download PDF</a></div></div></NextRolePanel>
        <section className="about-contact" id="contact" aria-labelledby="contact-title"><header><p className="eyebrow">Contact</p><h2 id="contact-title">Get in touch.</h2><p>If you're hiring, want to ask about something on the site, or just have an interesting engineering problem, send me a note.</p></header><ContactForm endpoint={contactEndpoint} /></section>
      </article>
    </EditorialThemeProvider>
  </SiteLayout>
}
