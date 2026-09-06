import styled from 'styled-components'

const responsibilities = [
  'edge cases',
  'state',
  'error paths',
  'migrations',
  'observability',
  'security',
  'access control',
] as const

const Figure = styled.figure`
  display: grid;
  gap: var(--space-5);
  margin: 0;
  min-width: 0;
  color: var(--color-ink);

  @media (min-width: 46.0625rem) {
    grid-template-columns: minmax(9rem, 0.7fr) minmax(4.5rem, 0.25fr) minmax(17rem, 1.45fr);
    gap: clamp(var(--space-4), 2.4vw, var(--space-8));
    align-items: stretch;
  }
`

const Door = styled.div`
  display: grid;
  align-content: center;
  min-width: 0;
  padding: var(--space-5) var(--space-5) var(--space-6);
  border: solid var(--color-ink);
  border-width: 1px 0 1px 1px;
  background: color-mix(in srgb, var(--color-accent-soft) 30%, transparent);

  @media (max-width: 46rem) {
    padding: var(--space-4);
  }
`

const Threshold = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-accent);

  &::before,
  &::after {
    flex: 1;
    height: 1px;
    background: currentColor;
    content: '';
  }

  @media (min-width: 46.0625rem) {
    flex-direction: column;
    justify-content: center;
    min-height: 100%;

    &::before,
    &::after {
      width: 1px;
      height: auto;
    }
  }
`

const ThresholdLabel = styled.span`
  font-family: var(--font-code);
  font-size: 0.72rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;

  @media (min-width: 46.0625rem) {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
`

const Road = styled.div`
  display: grid;
  align-content: center;
  gap: var(--space-5);
  min-width: 0;
  padding: var(--space-2) 0 0;
`

const Heading = styled.h2`
  margin: var(--space-2) 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.8rem);
  line-height: 1.08;
`

const Chapter = styled.p`
  margin: 0;
  font-family: var(--font-code);
  font-size: 0.72rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const Description = styled.p`
  margin: var(--space-3) 0 0;
  color: var(--color-muted);
  line-height: 1.35;
`

const Responsibilities = styled.ol`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
`

const Responsibility = styled.li`
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-ink-secondary);
  font-family: var(--font-code);
  font-size: 0.72rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;
`

const Releases = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-family: var(--font-code);
  font-size: 0.72rem;
  letter-spacing: 0.035em;
  text-transform: uppercase;

  @media (max-width: 46rem) {
    flex-direction: column;
  }
`

const Caption = styled.figcaption`
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  color: var(--color-ink-secondary);
  font-family: var(--font-code);
  font-size: 0.72rem;
  letter-spacing: 0.035em;
  line-height: 1.5;
  text-transform: none;

  @media (min-width: 46.0625rem) {
    grid-column: 1 / -1;
  }
`

export const VibeCodingFigure = () => {
  return (
    <Figure aria-describedby="vibe-coding-figure-caption">
      <Door>
        <Chapter>01</Chapter>
        <Heading>The door opens</Heading>
        <Description>An idea becomes clickable.</Description>
      </Door>
      <Threshold>
        <ThresholdLabel>Working demo</ThresholdLabel>
      </Threshold>
      <Road>
        <div>
          <Chapter>02</Chapter>
          <Heading>The long road</Heading>
          <Description>Engineering takes responsibility for what happens after.</Description>
        </div>
        <Responsibilities aria-label="Engineering responsibilities">
          {responsibilities.map((responsibility) => <Responsibility key={responsibility}>{responsibility}</Responsibility>)}
        </Responsibilities>
        <Releases aria-label="Release progression">
          <span>First draft</span>
          <span>Hundredth release</span>
        </Releases>
      </Road>
      <Caption id="vibe-coding-figure-caption">Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.</Caption>
    </Figure>
  )
}
