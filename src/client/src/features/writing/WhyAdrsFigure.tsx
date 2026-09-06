import type { ReactElement } from 'react'
import styled from 'styled-components'

const decisionContents = [
  'Context before vocabulary',
  'Chosen route and consequences',
  'Rejected routes keep their evidence',
] as const

const Figure = styled.figure`
  display: grid;
  gap: var(--space-4);
  min-width: 0;
  margin: 0;
  color: var(--color-ink);

  @media (min-width: 60rem) {
    grid-template-columns: minmax(0, 0.86fr) minmax(0, 1.08fr) minmax(0, 0.86fr);
    align-items: stretch;
  }
`

const Heading = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.7rem);
  line-height: 1.05;
`

const Moment = styled.section`
  display: grid;
  gap: var(--space-3);
  align-content: center;
  min-width: 0;
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 76%, transparent);

  > p:not([data-marker]) {
    margin: 0;
    color: var(--color-muted);
    line-height: 1.4;
  }
`

const Marker = styled.p`
  margin: 0;
  color: var(--color-accent);
  font-family: var(--font-code);
  font-size: 0.7rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const Routes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);

  span {
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--color-border);
    color: var(--color-ink-secondary);
    font-family: var(--font-code);
    font-size: 0.7rem;
    letter-spacing: 0.035em;
  }
`

const Record = styled.section`
  position: relative;
  min-width: 0;
  padding: var(--space-5);
  border: 1px solid var(--color-ink);
  background: var(--color-ink);
  color: var(--color-surface);

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    width: 1px;
    height: var(--space-5);
    background: var(--color-accent);
    content: '';
  }

  &::before { bottom: 100%; }
  &::after { top: 100%; }

  ${Marker} { color: var(--color-accent-soft); }

  ul {
    display: grid;
    gap: var(--space-2);
    margin: var(--space-4) 0 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding-top: var(--space-2);
    border-top: 1px solid rgb(255 255 255 / 20%);
    font-family: var(--font-code);
    font-size: 0.7rem;
    letter-spacing: 0.035em;
    line-height: 1.35;
  }

  @media (min-width: 60rem) {
    &::before,
    &::after {
      top: 50%;
      bottom: auto;
      width: var(--space-5);
      height: 1px;
    }

    &::before { right: 100%; left: auto; }
    &::after { right: auto; left: 100%; }
  }
`

const Reconsideration = styled.strong`
  display: block;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-accent);
  color: var(--color-accent);
  font-family: var(--font-code);
  font-size: 0.7rem;
  letter-spacing: 0.035em;
  line-height: 1.35;
  text-transform: uppercase;
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

export function WhyAdrsFigure(): ReactElement {
  return (
    <Figure aria-describedby="decision-memory-figure-caption">
      <Moment aria-labelledby="decision-memory-start">
        <Marker data-marker>Then</Marker>
        <Heading id="decision-memory-start">At the decision</Heading>
        <p>Several credible routes meet a real constraint.</p>
        <Routes aria-label="Decision inputs">
          <span>Context</span><span>Routes</span><span>Evidence</span>
        </Routes>
      </Moment>

      <Record aria-labelledby="decision-memory-record">
        <Marker data-marker>Kept</Marker>
        <Heading id="decision-memory-record">Decision record</Heading>
        <ul>
          {decisionContents.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Record>

      <Moment aria-labelledby="decision-memory-later">
        <Marker data-marker>Later</Marker>
        <Heading id="decision-memory-later">With the next engineer</Heading>
        <p>The old choice can be challenged without paying twice for the same learning.</p>
        <Reconsideration>Reconsider when the facts change</Reconsideration>
      </Moment>

      <Caption id="decision-memory-figure-caption">A decision record carries context, rejected alternatives, evidence, consequences and reconsideration triggers forward to the next engineer.</Caption>
    </Figure>
  )
}
