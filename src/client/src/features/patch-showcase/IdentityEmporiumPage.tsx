import { Link } from 'react-router-dom'
import { IdentityEmporiumEvidence } from './PatchShowcaseEvidence'
import './PatchShowcase.scss'

export function IdentityEmporiumPage() {
  return (
    <section className="identity-showcase" aria-label="Identity Emporium adventure">
      <div className="identity-showcase__lead">
        <p className="patch-status">Visual development</p>
        <p>Patch, Bit and Bot are each given one of four jobs. The Emporium can supply the role, but the costume only helps when it stays connected to the task.</p>
      </div>
      <IdentityEmporiumEvidence />
      <div className="identity-showcase__case-study-link">
        <p>The production system behind this adventure has its own engineering story.</p>
        <Link to="/projects/adventures-of-patch">Read the Adventures of Patch engineering case study</Link>
      </div>
    </section>
  )
}
