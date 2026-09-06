import type { ReactElement } from 'react'
import styled from 'styled-components'

const storedCapabilities = [
  'Repository law',
  'Tool routes',
  'Workflow',
  'Evidence',
] as const

const activeKnowledge = [
  'Repository boundary',
  'Handoff contract',
] as const

const Figure = styled.figure`
  display: grid;
  gap: var(--space-5);
  min-width: 0;
  margin: 0;
  color: var(--color-ink);

  @media (min-width: 60rem) {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.94fr) minmax(0, 0.82fr);
    align-items: stretch;
  }

  @media (max-width: 30rem) {
    [data-capability-store] ul { grid-template-columns: 1fr; }
  }
`

const Stage = styled.section<{ $active?: boolean }>`
  position: relative;
  display: grid;
  gap: var(--space-3);
  min-width: 0;
  align-content: center;
  border: 1px solid var(--color-border);
  padding: var(--space-5);
  background: ${({ $active }) => $active ? 'var(--color-ink)' : 'color-mix(in srgb, var(--color-surface) 78%, transparent)'};
  color: ${({ $active }) => $active ? 'var(--color-surface)' : 'var(--color-ink)'};

  &::after {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 1px;
    height: var(--space-6);
    background: var(--color-accent);
    content: '';
  }

  ${({ $active }) => $active ? `
    &::after { background: var(--color-accent); }
  ` : ''}

  @media (min-width: 60rem) {
    &::after {
      top: 50%;
      right: calc(-1 * var(--space-6));
      left: auto;
      width: var(--space-6);
      height: 1px;
    }
  }
`

const Marker = styled.p<{ $active?: boolean }>`
  margin: 0;
  color: ${({ $active }) => $active ? 'var(--color-accent-soft)' : 'var(--color-accent)'};
  font-family: var(--font-code);
  font-size: 0.7rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const Heading = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.7rem);
  line-height: 1.05;
`

const Capabilities = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
  margin: var(--space-1) 0 0;
  padding: 0;
  list-style: none;

  li {
    border: 1px solid var(--color-border);
    padding: var(--space-2);
    color: var(--color-ink-secondary);
    font-family: var(--font-code);
    font-size: 0.7rem;
    letter-spacing: 0.035em;
    line-height: 1.35;
  }
`

const ActiveList = styled.ul`
  display: grid;
  gap: var(--space-2);
  margin: var(--space-1) 0 0;
  padding: 0;
  list-style: none;

  li {
    padding-top: var(--space-2);
    border-top: 1px solid rgb(255 255 255 / 22%);
    font-family: var(--font-code);
    font-size: 0.7rem;
    letter-spacing: 0.035em;
    line-height: 1.35;
  }
`

const Description = styled.p`
  margin: 0;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.4;
`

const Caption = styled.figcaption`
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-secondary);
  font-family: var(--font-code);
  font-size: 0.7rem;
  letter-spacing: 0.035em;
  line-height: 1.5;

  @media (min-width: 60rem) {
    grid-column: 1 / -1;
  }
`

export function ProvisioningFigure(): ReactElement {
  return (
    <Figure aria-describedby="capability-path-caption">
      <Stage data-capability-store>
        <Marker>Available</Marker>
        <Heading id="capability-path-store">Capability store</Heading>
        <Capabilities>
          {storedCapabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </Capabilities>
      </Stage>

      <Stage $active>
        <Marker $active>Activated</Marker>
        <Heading id="capability-path-active">This task’s read path</Heading>
        <ActiveList>
          {activeKnowledge.map((item) => <li key={item}>{item}</li>)}
        </ActiveList>
      </Stage>

      <Stage>
        <Marker>Working</Marker>
        <Heading id="capability-path-worker">Current agent</Heading>
        <Description>Enough context for the next useful move.</Description>
      </Stage>

      <Caption id="capability-path-caption">A deep capability store feeds only the relevant guidance into a narrow active path for the current agent.</Caption>
    </Figure>
  )
}
