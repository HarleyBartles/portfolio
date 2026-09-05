import { ExternalLink } from '../../components'
import styled from 'styled-components'

const Evidence = styled.p`
  margin-block: var(--space-4);
`

export function CaseStudyEvidence({ auditDate, href, label }: { auditDate: string; href: string; label: string }) {
  return <Evidence data-evidence-custody="provenance"><strong>Repository audit · {auditDate}</strong> · <ExternalLink href={href}>{label}</ExternalLink></Evidence>
}
