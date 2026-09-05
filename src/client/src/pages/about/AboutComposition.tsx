import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ExternalLink, Eyebrow } from '../../components'
import { EditorialHeading } from '../../components/editorial'
import type { ContentSummary } from '../../types'

const Intro = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(20rem, 5fr);
  gap: clamp(var(--space-8), 5vw, var(--space-12));
  align-items: start;
  box-sizing: border-box;
  padding-block: var(--space-8) var(--space-10);
  @media (max-width: 68rem) {
    grid-template-columns: 1fr;
  }
`
const IntroTitle = styled(EditorialHeading)`
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--type-site-display-size);
  line-height: var(--type-site-display-leading);
  letter-spacing: var(--type-site-display-tracking);
`
const IntroCopy = styled.div`
  border-top: 1px solid var(--color-ink);
  padding-top: var(--space-6);
`
const IntroLead = styled.p`
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.5vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
`
export const AboutIntro = ({
  headingId,
  eyebrow,
  title,
  lead,
}: {
  headingId: string
  eyebrow: string
  title: string
  lead: ReactNode
}) => (
  <Intro data-visual-contract="about-intro">
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <IntroTitle forwardedAs="h1" wrap="display" id={headingId}>
        {title}
      </IntroTitle>
    </div>
    <IntroCopy>
      <IntroLead>{lead}</IntroLead>
    </IntroCopy>
  </Intro>
)

const Conversion = styled.aside`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(20rem, 7fr);
  gap: var(--space-12);
  border-top: 1px solid var(--color-ink);
  padding-block: var(--space-10);
  @media (max-width: 68rem) {
    grid-template-columns: 1fr;
  }
`
const ConversionTitle = styled(EditorialHeading)`
  margin: 0;
  font-family: var(--font-site-sans);
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  letter-spacing: -0.045em;
  line-height: 0.98;
`
const ConversionEyebrow = styled(Eyebrow)`
  margin-bottom: var(--space-4);
`
const Paragraph = styled.p`
  margin: var(--space-5) 0 0;
  color: var(--color-muted);
  font-size: 1.08rem;
`
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
`
export const NextRolePanel = ({
  headingId,
  eyebrow,
  title,
  body,
  actions,
}: {
  headingId: string
  eyebrow: string
  title: string
  body: readonly ReactNode[]
  actions: ReactNode
}) => (
  <Conversion
    aria-labelledby={headingId}
    data-visual-contract="about-cv-conversion"
  >
    <div>
      <ConversionEyebrow>{eyebrow}</ConversionEyebrow>
      <ConversionTitle wrap="display" id={headingId}>
        {title}
      </ConversionTitle>
    </div>
    <div>
      {body.map((paragraph, index) => (
        <Paragraph key={index}>{paragraph}</Paragraph>
      ))}
      <Actions>{actions}</Actions>
    </div>
  </Conversion>
)

const Story = styled.section<{ $layout: 'split' | 'stacked' }>`
  display: grid;
  grid-template-columns: ${({ $layout }) =>
    $layout === 'stacked' ? '1fr' : 'minmax(10rem, 3fr) minmax(0, 7fr)'};
  gap: clamp(var(--space-8), 6vw, var(--space-20));
  border-top: 1px solid var(--color-ink);
  padding: clamp(var(--space-12), 6vw, var(--space-16)) 0 var(--space-10);
  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
  }
`
const Rail = styled.div<{ $kind: 'chronology' | 'context' }>`
  align-self: start;
  color: var(--color-muted);
  font-family: var(--font-site-sans);
  font-size: var(--type-metadata-size);
  line-height: 1.45;
  @media (max-width: 48rem) {
    max-width: ${({ $kind }) => ($kind === 'context' ? 'none' : '20rem')};
  }
`
const RailEyebrow = styled(Eyebrow)`
  margin: var(--space-5) 0 0;
`
const Period = styled.p`
  margin: var(--space-5) 0 0;
  color: var(--color-ink);
`
const StoryContent = styled.div`
  max-width: var(--measure-reading);
  container-type: inline-size;
`
const StoryTitle = styled(EditorialHeading)`
  margin: 0;
  font-family: var(--font-site-sans);
  font-size: clamp(1.25rem, 8.2cqi, 4.2rem);
  letter-spacing: -0.045em;
  line-height: 0.98;
`
const Lead = styled.p`
  margin: var(--space-5) 0 0;
  color: var(--color-ink);
  font-family: var(--font-site-sans);
  font-size: clamp(1.4rem, 2.3vw, 1.85rem);
  letter-spacing: -0.02em;
  line-height: 1.14;
`
export const StoryParagraph = Paragraph
export const ProfessionalStory = ({
  headingId,
  eyebrow,
  period,
  title,
  lead,
  children,
  layout = 'split',
  visualContract,
  railKind = 'context',
}: {
  headingId: string
  eyebrow: string
  period?: string
  title: string
  lead: ReactNode
  children?: ReactNode
  layout?: 'split' | 'stacked'
  visualContract?: string
  railKind?: 'chronology' | 'context'
}) => (
  <Story
    aria-labelledby={headingId}
    data-visual-contract={visualContract}
    data-professional-story={layout}
    $layout={layout}
  >
    <Rail
      data-professional-rail={railKind}
      data-professional-story-rail
      $kind={railKind}
    >
      <RailEyebrow>{eyebrow}</RailEyebrow>
      {period === undefined ? null : <Period>{period}</Period>}
    </Rail>
    <StoryContent>
      <StoryTitle wrap="single-line" id={headingId}>
        {title}
      </StoryTitle>
      <Lead>{lead}</Lead>
      {children}
    </StoryContent>
  </Story>
)

const Career = styled.section`
  border-top: 1px solid var(--color-ink);
  padding: clamp(var(--space-12), 6vw, var(--space-16)) 0 0;
`
export const AboutSectionHeading = styled.div`
  max-width: 50rem;
  margin-bottom: var(--space-12);
`
const CareerEyebrow = styled(Eyebrow)`
  margin-bottom: var(--space-3);
`
const SectionTitle = styled(EditorialHeading)`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4.5vw, 4.2rem);
  letter-spacing: -0.045em;
  line-height: 0.98;
`
const Stage = styled.section`
  display: grid;
  grid-template-columns: minmax(10rem, 3fr) minmax(0, 7fr);
  gap: clamp(var(--space-8), 6vw, var(--space-20));
  border-top: 1px solid var(--color-ink);
  padding-block: var(--space-10);
  scroll-margin-top: var(--space-8);
  &:last-child {
    padding-bottom: var(--space-6);
  }
  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
  }
`
const TimelineBody = styled.div`
  max-width: var(--measure-reading);
`
export const TimelineParagraph = styled.p`
  margin: var(--space-5) 0 0;
  color: var(--color-muted);
`
export const TimelineMetadata = styled(Eyebrow)`
  margin: var(--space-5) 0 0;
`
export type ProfessionalTimelineEntry = Readonly<{
  id: string
  period: string
  title: string
  body: ReactNode
  kind?: 'career' | 'aside'
}>
export const ProfessionalTimeline = ({
  headingId,
  eyebrow,
  title,
  entries,
}: {
  headingId: string
  eyebrow: string
  title: string
  entries: readonly ProfessionalTimelineEntry[]
}) => (
  <Career aria-labelledby={headingId}>
    <AboutSectionHeading>
      <CareerEyebrow>{eyebrow}</CareerEyebrow>
      <SectionTitle wrap="single-line" id={headingId}>
        {title}
      </SectionTitle>
    </AboutSectionHeading>
    <div>
      {entries.map(({ id, period, title, body, kind }) => (
        <Stage
          as={kind === 'aside' ? 'aside' : 'section'}
          key={id}
          aria-labelledby={id}
        >
          <div>
            <Eyebrow>{period}</Eyebrow>
          </div>
          <TimelineBody>
            <h3 id={id}>{title}</h3>
            {body}
          </TimelineBody>
        </Stage>
      ))}
    </div>
  </Career>
)
const Independent = styled.section`
  border-top: 1px solid var(--color-ink);
  padding: clamp(var(--space-12), 6vw, var(--space-16)) 0 var(--space-10);
`
const IndependentTitle = styled(EditorialHeading)`
  margin-top: var(--space-3);
`
const IndependentEyebrow = styled(Eyebrow)`
  margin: var(--space-5) 0 0;
`
const IndependentIntro = styled.p`
  margin: var(--space-5) 0 0;
  color: var(--color-muted);
`
const ProjectRow = styled.section`
  display: grid;
  grid-template-columns: minmax(12rem, 3fr) minmax(0, 6fr) auto;
  gap: var(--space-6);
  align-items: start;
  border-top: 1px solid rgb(31 36 31 / 25%);
  margin-top: var(--space-7);
  padding-top: var(--space-6);
  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
`
const ProjectTitle = styled.h3`
  margin: 0;
`
const ProjectLink = styled(Link)`
  color: var(--color-ink);
`
const ProjectSummary = styled.p`
  margin: 0;
  color: var(--color-muted);
`
export const ProfessionalLink = styled(Link)`
  color: var(--color-ink);
  text-decoration-color: currentColor;
`
export const ProfessionalExternalLink = styled(ExternalLink)`
  color: var(--color-ink);
  text-decoration-color: currentColor;
`
export const IndependentWork = ({
  headingId,
  eyebrow,
  title,
  intro,
  projects,
}: {
  headingId: string
  eyebrow: string
  title: string
  intro: string
  projects: readonly ContentSummary[]
}) => (
  <Independent aria-labelledby={headingId}>
    <IndependentEyebrow>{eyebrow}</IndependentEyebrow>
    <IndependentTitle wrap="single-line" id={headingId}>
      {title}
    </IndependentTitle>
    <IndependentIntro data-independent-preamble>{intro}</IndependentIntro>
    {projects.map((project) => (
      <ProjectRow key={project.slug}>
        <ProjectTitle>
          <ProjectLink to={`/projects/${project.slug}`}>
            {project.title}
          </ProjectLink>
        </ProjectTitle>
        <ProjectSummary>{project.summary}</ProjectSummary>
        <ProfessionalLink to={`/projects/${project.slug}`}>
          Read the case study
        </ProfessionalLink>
      </ProjectRow>
    ))}
  </Independent>
)
