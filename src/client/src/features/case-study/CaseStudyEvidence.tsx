import { ExternalLink } from '../../components/ExternalLink'

export function CaseStudyEvidence({ auditDate, href, label }: { auditDate: string; href: string; label: string }) {
  return <p className="case-study-evidence" data-evidence-custody="provenance"><strong>Repository audit · {auditDate}</strong> · <ExternalLink href={href}>{label}</ExternalLink></p>
}
