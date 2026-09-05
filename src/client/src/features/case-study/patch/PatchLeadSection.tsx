import type { ReactNode } from 'react'
import styled from 'styled-components'
import { CaseStudySection } from '../CaseStudySection'
import type { CaseStudySectionTone } from '../CaseStudySection'

type PatchLeadSectionProps = {
  children: ReactNode
  className?: string
  title: string
  titleId: string
  tone?: CaseStudySectionTone
}

const LeadSection = styled(CaseStudySection)`
  min-width: 0;

  h2 {
    max-width: 14ch;
    margin: 0 0 var(--space-6);
    color: var(--color-ink);
    font-size: clamp(2.25rem, 5vw, 4.8rem);
    line-height: .98;
    text-wrap: balance;
  }
`

const LeadBody = styled.div`
  min-width: 0;
  max-width: var(--measure-reading);

  > :first-child { margin-top: 0; }
  > :last-child { margin-bottom: 0; }

  @media (min-width: 44.01rem) {
    padding-top: var(--space-8);
  }
`

export function PatchLeadSection({ children, className, title, titleId, tone = 'default' }: PatchLeadSectionProps) {
  return (
    <LeadSection className={className} title={title} headingId={titleId} layout="lead" tone={tone}>
      <LeadBody>{children}</LeadBody>
    </LeadSection>
  )
}
