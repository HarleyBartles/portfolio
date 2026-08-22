export function CaseStudyEvidence({ auditDate, href, label }: { auditDate: string; href: string; label: string }) {
  return <p className="case-study-evidence"><strong>Repository audit · {auditDate}</strong> · <a href={href}>{label}</a></p>
}
