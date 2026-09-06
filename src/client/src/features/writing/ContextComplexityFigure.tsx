import type { ReactElement } from 'react'
import styled from 'styled-components'

type OrganisationNodeProps = {
  name: string
  role: string
}

const Canvas = styled.div`
  position: relative;
  padding: clamp(var(--space-5), 3.5vw, var(--space-8));
  border: 1px solid var(--color-ink);
  background: var(--color-surface);
`

const Eyebrow = styled.p`
  margin: 0 0 var(--space-5);
  color: var(--color-accent);
  font-family: var(--font-code);
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`

const Node = styled.div`
  position: relative;
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-ink);
  background: var(--color-surface);

  strong {
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    line-height: 1;
  }

  span {
    color: var(--color-ink-secondary);
    font-family: var(--font-code);
    font-size: 0.63rem;
    line-height: 1.35;
  }
`

const RootNode = styled(Node)`
  width: min(15rem, 70%);
  margin-inline: auto;
  border-color: var(--color-accent);
`

const Portfolio = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(8rem, 0.8fr);
  gap: var(--space-5);
  margin-top: var(--space-8);

  &::before {
    position: absolute;
    top: calc(var(--space-8) * -1);
    left: 50%;
    width: 1px;
    height: var(--space-4);
    background: var(--color-accent);
    content: '';
  }

  @media (max-width: 39rem) {
    grid-template-columns: 1fr;
    margin-top: var(--space-6);
    margin-left: var(--space-4);
    padding-left: var(--space-5);
    border-left: 1px solid var(--color-accent);

    &::before {
      top: calc(var(--space-6) * -1);
      left: calc(50% - var(--space-2));
      height: var(--space-6);
    }

    &::after {
      position: absolute;
      top: 0;
      right: 50%;
      left: 0;
      height: 1px;
      background: var(--color-accent);
      content: '';
    }
  }
`

const Branches = styled.div`
  position: absolute;
  top: calc(var(--space-4) * -1);
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(8rem, 0.8fr);
  gap: var(--space-5);
  height: var(--space-4);
  pointer-events: none;

  span {
    position: relative;

    &::before {
      position: absolute;
      top: 0;
      height: 1px;
      background: var(--color-accent);
      content: '';
    }

    &:first-child::before {
      right: calc(var(--space-5) * -0.5);
      left: 50%;
    }

    &:last-child::before {
      right: 50%;
      left: calc(var(--space-5) * -0.5);
    }
  }

  @media (max-width: 39rem) {
    display: none;
  }
`

const Project = styled.section`
  position: relative;
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);

  > p {
    margin: 0;
    color: var(--color-accent);
    font-family: var(--font-code);
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  > ${Node} {
    margin-top: var(--space-3);
  }

  &::before {
    position: absolute;
    top: calc(var(--space-4) * -1);
    left: 50%;
    width: 1px;
    height: var(--space-4);
    background: var(--color-accent);
    content: '';
  }

  @media (max-width: 39rem) {
    &::before {
      top: var(--space-6);
      left: calc(var(--space-5) * -1);
      width: var(--space-5);
      height: 1px;
    }

    &:last-child { margin-top: var(--space-2); }
  }
`

const Departments = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-6);

  ${Node}::before {
    position: absolute;
    top: calc(var(--space-3) * -1);
    left: 50%;
    width: 1px;
    height: var(--space-3);
    background: var(--color-accent);
    content: '';
  }

  @media (max-width: 25rem) {
    grid-template-columns: 1fr;
    margin-left: var(--space-4);
    padding-left: var(--space-5);
    border-left: 1px solid var(--color-accent);

    ${Node}::before {
      top: 50%;
      left: var(--space-5);
      width: var(--space-5);
      height: 1px;
      transform: translateX(calc((var(--space-5) + var(--space-4)) * -1));
    }
  }
`

const Caption = styled.figcaption`
  margin-top: var(--space-4);
  color: var(--color-muted);
  font-family: var(--font-code);
  font-size: 0.68rem;
  line-height: 1.5;
`

function OrganisationNode({ name, role }: OrganisationNodeProps): ReactElement {
  return (
    <Node>
      <strong>{name}</strong>
      <span>{role}</span>
    </Node>
  )
}

export function ContextComplexityFigure(): ReactElement {
  return (
    <figure aria-labelledby="context-org-chart-caption">
      <Canvas aria-hidden="true">
        <Eyebrow>The standing organisation</Eyebrow>
        <RootNode><strong>Will</strong><span>Harley’s will, made concrete</span></RootNode>
        <Portfolio>
          <Branches><span /><span /></Branches>
          <Project>
            <p>Rooms</p>
            <OrganisationNode name="Chris" role="Project Director" />
            <Departments>
              <OrganisationNode name="Albert" role="Research" />
              <OrganisationNode name="Brian" role="World-building" />
              <OrganisationNode name="Derek" role="Writing" />
            </Departments>
          </Project>
          <Project>
            <p>Adventures of Patch</p>
            <OrganisationNode name="Patch" role="Responsible agent" />
          </Project>
        </Portfolio>
      </Canvas>
      <Caption id="context-org-chart-caption">
        Will made Harley’s intent concrete. Under him, Rooms had a Project Director and three department heads; Patch represented another repository. A lot of organisation had gathered around “do some work please”.
      </Caption>
    </figure>
  )
}
