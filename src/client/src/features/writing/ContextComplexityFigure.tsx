import type { ReactElement } from 'react'
import './ContextComplexityFigure.scss'

type OrganisationNodeProps = {
  name: string
  role: string
}

function OrganisationNode({ name, role }: OrganisationNodeProps): ReactElement {
  return (
    <div className="context-org-chart__node">
      <strong>{name}</strong>
      <span>{role}</span>
    </div>
  )
}

export function ContextComplexityFigure(): ReactElement {
  return (
    <figure className="context-org-chart" aria-labelledby="context-org-chart-caption">
      <div className="context-org-chart__canvas" aria-hidden="true">
        <p className="context-org-chart__eyebrow">The standing organisation</p>
        <OrganisationNode name="Will" role="Harley’s will, made concrete" />
        <div className="context-org-chart__portfolio">
          <div className="context-org-chart__branches">
            <span />
            <span />
          </div>
          <section className="context-org-chart__project context-org-chart__project--rooms">
            <p>Rooms</p>
            <OrganisationNode name="Chris" role="Project Director" />
            <div className="context-org-chart__departments">
              <OrganisationNode name="Albert" role="Research" />
              <OrganisationNode name="Brian" role="World-building" />
              <OrganisationNode name="Derek" role="Writing" />
            </div>
          </section>
          <section className="context-org-chart__project context-org-chart__project--patch">
            <p>Adventures of Patch</p>
            <OrganisationNode name="Patch" role="Responsible agent" />
          </section>
        </div>
      </div>
      <figcaption id="context-org-chart-caption">
        Will made Harley’s intent concrete. Under him, Rooms had a Project Director and three department heads; Patch represented another repository. A lot of organisation had gathered around “do some work please”.
      </figcaption>
    </figure>
  )
}
