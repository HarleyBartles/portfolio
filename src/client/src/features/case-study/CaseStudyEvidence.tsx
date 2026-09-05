import { ExternalLink } from '../../components'
import styled from 'styled-components'

const Evidence = styled.p`
  margin-block: var(--space-4);
`

export type CaseStudyEvidenceProps = {
  auditDate: string
  className?: string
  href: string
  label: string
}

export function CaseStudyEvidence({ auditDate, className, href, label }: CaseStudyEvidenceProps) {
  return <Evidence className={className} data-evidence-custody="provenance"><strong>Repository audit · {auditDate}</strong> · <ExternalLink href={href}>{label}</ExternalLink></Evidence>
}
