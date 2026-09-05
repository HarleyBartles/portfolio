import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ActionAnchor, ExternalLink, Eyebrow } from '../../components'
import { EditorialHeading } from '../../components/editorial'
import type { ContentSummary } from '../../types'
import type { EducationRecord as EducationRecordData } from '../../data/professionalProfile'

const Header = styled.header`
  display: grid;
  grid-template-areas: 'identity actions' 'headline details';
  grid-template-columns: minmax(0, 1fr) max-content;
  column-gap: var(--space-8);
  row-gap: var(--space-5);
  border-bottom: 2px solid var(--color-ink);
  padding-bottom: var(--space-8);
  @media print {
    gap: 6mm;
    padding-bottom: 4mm;
  }
  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
    grid-template-areas: 'identity' 'actions' 'headline' 'details';
  }
`
const Identity = styled.div`
  grid-area: identity;
`
const Name = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 8vw, 5.8rem);
  letter-spacing: -0.06em;
  line-height: 0.86;
  @media print {
    font-size: 3.25rem;
  }
`
const HeaderEyebrow = styled(Eyebrow)`
  margin-bottom: 1em;
`
const Headline = styled.p`
  grid-area: headline;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
  letter-spacing: -0.02em;
  line-height: 1.1;
  @media print {
    font-size: 1.15rem;
    line-height: 1.05;
  }
`
const Details = styled.div`
  grid-area: details;
  align-self: end;
  color: var(--color-muted);
  font-size: 0.95rem;
  @media print {
    font-size: 8pt;
    line-height: 1.25;
  }
`
const Availability = styled.p`
  margin: 0 0 var(--space-4);
`
const Links = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-4);
  padding: 0;
  list-style: none;
  @media print {
    gap: 1mm 3mm;
    margin: 2mm 0 0;
    a[href^='https']::after {
      content: ' (' attr(href) ')';
      font-family: var(--font-site-sans);
      font-size: 6.25pt;
      overflow-wrap: anywhere;
    }
  }
`
const Controls = styled.nav<{ $position: 'header' | 'footer' }>`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  ${({ $position }) =>
    $position === 'header'
      ? 'grid-area: actions; align-self: start; justify-self: end;'
      : ''}
  @media (max-width: 46rem) {
    justify-content: flex-start;
    justify-self: start;
  }
  @media print {
    display: none !important;
  }
`
export type CvLink = Readonly<{
  label: string
  href: string
  external?: boolean
}>
export const CvHeader = ({
  headingId,
  eyebrow,
  name,
  headline,
  availability,
  links,
  downloadHref,
  downloadLabel,
  downloadAriaLabel,
}: {
  headingId: string
  eyebrow: string
  name: string
  headline: string
  availability: string
  links: readonly CvLink[]
  downloadHref: string
  downloadLabel: string
  downloadAriaLabel: string
}) => (
  <Header data-cv-header>
    <Identity>
      <HeaderEyebrow>{eyebrow}</HeaderEyebrow>
      <Name id={headingId}>{name}</Name>
    </Identity>
    <Controls $position="header" aria-label={downloadAriaLabel}>
      <ActionAnchor href={downloadHref} download>
        {downloadLabel}
      </ActionAnchor>
    </Controls>
    <Headline data-cv-headline>{headline}</Headline>
    <Details data-cv-details>
      <Availability data-cv-availability>{availability}</Availability>
      <Links aria-label="Professional links">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            ) : (
              <Link to={link.href}>{link.label}</Link>
            )}
          </li>
        ))}
      </Links>
    </Details>
  </Header>
)

const Section = styled.section<{ $divider: 'standard' | 'none' }>`
  border-top: ${({ $divider }) =>
    $divider === 'none' ? '0' : '1px solid rgb(31 36 31 / 25%)'};
  padding-top: var(--space-7);
  margin-top: ${({ $divider }) =>
    $divider === 'none' ? '0' : 'var(--space-7)'};
  @media print {
    margin-top: ${({ $divider }) => ($divider === 'none' ? '0' : '3mm')};
    padding-top: 3mm;
  }
`

export const CvParagraph = styled.p<{ $opening?: boolean }>`
  color: var(--color-muted);
  ${({ $opening }) => ($opening ? 'margin-top: 0;' : '')}
  @media print {
    font-size: 9.25pt;
    line-height: 1.3;
    margin: ${({ $opening }) => ($opening ? '0 0 2mm' : '2mm 0')};
  }
`
export const CvSubheading = styled.h3`
  margin: 0;
  font-family: var(--font-body);
  font-size: 1.05rem;
  @media print {
    font-size: 9.25pt;
  }
`
export const CvList = styled.ul`
  margin: var(--space-4) 0 0;
  padding-left: 1.15rem;
  color: var(--color-muted);
  li + li {
    margin-top: var(--space-2);
  }
  @media print {
    font-size: 9.25pt;
    line-height: 1.3;
    margin-top: 2mm;
    padding-left: 4mm;
    li + li {
      margin-top: 1mm;
    }
  }
`

export const CvSectionTitle = styled(EditorialHeading)`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3vw, 2.6rem);
  letter-spacing: -0.04em;
  line-height: 0.98;
  @media print {
    font-size: 1.45rem;
  }
`
export const CvSection = ({
  headingId,
  title,
  headingWrap = 'display',
  divider = 'standard',
  children,
}: {
  headingId: string
  title: string
  headingWrap?: 'display' | 'balanced' | 'single-line'
  divider?: 'standard' | 'none'
  children: ReactNode
}) => (
  <Section
    aria-labelledby={headingId}
    data-cv-section
    data-divider={divider}
    $divider={divider}
  >
    <CvSectionTitle id={headingId} wrap={headingWrap}>
      {title}
    </CvSectionTitle>
    {children}
  </Section>
)

export const CvRole = styled.p.attrs<{ 'data-cv-role'?: string }>({
  'data-cv-role': '',
})`
  margin-top: 0;
  color: var(--color-muted);
  font-family: var(--font-site-sans);
  font-size: var(--type-metadata-size);
  font-weight: 700;
  text-transform: none;
  @media print {
    font-size: 7.5pt;
    line-height: 1.3;
    margin: 0 0 2mm;
  }
`
export const CvRunningTitle = styled.p`
  margin: 0 0 var(--space-5);
  color: var(--color-muted);
  font-family: var(--font-site-sans);
  font-size: var(--type-metadata-size);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
`
const Projects = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-6);
  @media print {
    gap: 3mm;
    margin-top: 3mm;
  }
  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }
`
const Project = styled.section`
  min-width: 0;
  @media print {
    break-inside: avoid;
  }
`
const ProjectLink = styled(Link)`
  color: var(--color-ink);
`
const ProjectSummary = styled(CvParagraph)`
  margin-bottom: 0;
  @media print {
    margin-bottom: 2mm;
  }
`
export const CvProjectList = ({
  projects,
}: {
  projects: readonly ContentSummary[]
}) => (
  <Projects>
    {projects.map((project) => (
      <Project key={project.slug}>
        <CvSubheading>
          <ProjectLink to={`/projects/${project.slug}`}>
            {project.title}
          </ProjectLink>
        </CvSubheading>
        <ProjectSummary>{project.summary}</ProjectSummary>
      </Project>
    ))}
  </Projects>
)

export const CvSkillParagraph = styled(CvParagraph)`
  margin: var(--space-3) 0;
`
export const CvSkillLabel = styled.strong`
  color: var(--color-ink);
  font-family: var(--font-site-sans);
  font-size: 0.9em;
  text-transform: none;
`
const Education = styled.dl`
  display: grid;
  gap: var(--space-5);
  margin: var(--space-6) 0 0;
  @media print {
    gap: 3mm;
    margin-top: 3mm;
  }
`
const EducationRecord = styled.div`
  display: grid;
  grid-template-columns: minmax(10rem, 3fr) minmax(0, 7fr);
  gap: var(--space-6);
  @media print {
    gap: 4mm;
    break-inside: avoid;
  }
  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }
`
const EducationLevel = styled.dt`
  color: var(--color-muted);
  font-family: var(--font-site-sans);
  font-size: var(--type-metadata-size);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
  @media print {
    font-size: 7.25pt;
  }
`
const EducationDetail = styled.dd`
  margin: 0;
`
const EducationParagraph = styled(CvParagraph)`
  margin: 0;
  & + & {
    margin-top: var(--space-2);
  }
  @media print {
    margin-block: 2mm;
  }
`
export const CvEducationList = ({
  records,
}: {
  records: readonly EducationRecordData[]
}) => (
  <Education>
    {records.map((record) => (
      <EducationRecord key={record.id}>
        <EducationLevel>{record.level}</EducationLevel>
        <EducationDetail>
          <CvSubheading>{record.title}</CvSubheading>
          {record.provider === undefined ? null : (
            <EducationParagraph>
              {record.provider}
              {record.providerWebsiteLabel === undefined
                ? null
                : ` (${record.providerWebsiteLabel})`}
            </EducationParagraph>
          )}
          {record.periodLabel === undefined ? null : (
            <EducationParagraph>{record.periodLabel}</EducationParagraph>
          )}
          {record.detail === undefined ? null : (
            <EducationParagraph>{record.detail}</EducationParagraph>
          )}
        </EducationDetail>
      </EducationRecord>
    ))}
  </Education>
)

const DownloadFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-6);
  width: min(100%, 58rem);
  margin: var(--space-10) auto 0;
  border-top: 2px solid var(--color-ink);
  padding: var(--space-8) clamp(var(--space-5), 5vw, var(--space-16)) 0;
  @media print {
    display: none;
  }
  @media (max-width: 46rem) {
    align-items: flex-start;
    flex-direction: column;
    padding-inline: 0;
  }
`
const DownloadPrompt = styled.p`
  margin: 0;
  font-family: var(--font-site-sans);
  font-size: clamp(1.35rem, 2.4vw, 1.8rem);
  font-weight: 650;
  letter-spacing: -0.02em;
`
export const CvDownloadFooter = ({
  prompt,
  downloadHref,
  downloadLabel,
  downloadAriaLabel,
}: {
  prompt: string
  downloadHref: string
  downloadLabel: string
  downloadAriaLabel: string
}) => (
  <DownloadFooter>
    <DownloadPrompt>{prompt}</DownloadPrompt>
    <Controls $position="footer" aria-label={downloadAriaLabel}>
      <ActionAnchor href={downloadHref} download>
        {downloadLabel}
      </ActionAnchor>
    </Controls>
  </DownloadFooter>
)
