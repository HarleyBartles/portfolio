import { ExternalLink } from '../../components'
import styled from 'styled-components'

type CaseStudyEvidenceVariant = 'default' | 'boundary'

const Evidence = styled.p<{ $variant: CaseStudyEvidenceVariant }>`
  margin-block: var(--space-4);
  ${({ $variant }) => $variant === 'boundary' ? `
    margin-top: var(--space-8);
    padding-top: var(--space-5);
    border-top: 1px solid rgb(21 63 66 / 30%);
  ` : ''}
`

export function CaseStudyEvidence({ auditDate, href, label, variant = 'default' }: { auditDate: string; href: string; label: string; variant?: CaseStudyEvidenceVariant }) {
  return <Evidence $variant={variant} data-evidence-custody="provenance"><strong>Repository audit · {auditDate}</strong> · <ExternalLink href={href}>{label}</ExternalLink></Evidence>
}
