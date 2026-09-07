import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IdentityEmporiumEvidence } from './PatchShowcaseEvidence'

const Story = styled.section`
  display: grid;
  gap: clamp(var(--space-10), 6vw, var(--space-16));
  padding-block: var(--space-12) var(--space-20);
  --patch-teal: #0d7476;
  --patch-teal-deep: #153f42;
  --patch-cream: #f7efdd;

  .identity-showcase__lead, .identity-showcase__case-study-link { max-width: 46rem; }
  .identity-showcase__lead { font-family: var(--font-site-sans); font-size: clamp(1.35rem, 2.4vw, 1.9rem); line-height: 1.35; }
  .identity-showcase__lead .patch-status { margin-bottom: var(--space-4); color: var(--patch-teal); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  .identity-showcase__case-study-link { padding-top: var(--space-8); border-top: 1px solid var(--color-ink); }
  .identity-showcase__case-study-link a { color: var(--patch-teal-deep); font-weight: 700; text-decoration-thickness: .12em; text-underline-offset: .2em; }

`

export function IdentityEmporiumPage() {
  return (
    <Story className="identity-showcase" aria-label="Identity Emporium adventure" data-testid="identity-emporium-story" data-visual-contract="patch-identity-emporium">
      <div className="identity-showcase__lead">
        <p className="patch-status">Visual development</p>
        <p>Patch, Bit and Bot are each given one of four jobs. The Emporium can supply the role, but the costume only helps when it stays connected to the task.</p>
      </div>
      <IdentityEmporiumEvidence />
      <div className="identity-showcase__case-study-link">
        <p>The production system behind this adventure has its own engineering story.</p>
        <Link to="/projects/adventures-of-patch">Read the Adventures of Patch engineering case study</Link>
      </div>
    </Story>
  )
}
