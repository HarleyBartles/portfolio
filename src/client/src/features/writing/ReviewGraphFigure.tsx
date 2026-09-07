import type { ReactElement } from 'react'
import styled from 'styled-components'

const graphSource = `${import.meta.env.BASE_URL}images/writing/review-graph-v1.svg`

const Figure = styled.figure`
  display: grid;
  gap: var(--space-4);
  margin: 0;
  border: 1px solid var(--color-border);
  padding: var(--space-5);
  background: var(--color-ink);
  color: var(--color-surface);
`

const Heading = styled.div`
  display: flex;
  gap: var(--space-4);
  align-items: baseline;
  justify-content: space-between;

  @media (max-width: 34rem) {
    display: grid;
    gap: var(--space-2);
  }
`

const Version = styled.p`
  flex: 0 0 auto;
  margin: 0;
  color: var(--color-accent-soft);
  font-family: var(--font-code);
  font-size: 0.7rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const Title = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.7rem);
  line-height: 1.05;
`

const Graph = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-top: 1px solid rgb(255 255 255 / 22%);
  padding-top: var(--space-4);
`

const Caption = styled.figcaption`
  padding-top: var(--space-4);
  border-top: 1px solid rgb(255 255 255 / 22%);
  color: color-mix(in srgb, var(--color-surface) 76%, transparent);
  font-family: var(--font-code);
  font-size: 0.7rem;
  letter-spacing: 0.035em;
  line-height: 1.5;
`

export function ReviewGraphFigure(): ReactElement {
  return (
    <Figure aria-describedby="review-graph-figure-caption">
      <Heading>
        <Version>Version one / live graph</Version>
        <Title>The loop inside the loop</Title>
      </Heading>
      <Graph
        src={graphSource}
        alt="Version-one iterative-review graph, where the initially straightforward workflow knots around repair, metrics, triage and final review before ready or blocked exits."
      />
      <Caption id="review-graph-figure-caption">A trustworthy review graph turns recorded state into one lawful next action or an honest blocked exit.</Caption>
    </Figure>
  )
}
