import styled from 'styled-components'

const stages = [
  { label: 'Direct', owner: 'human' },
  { label: 'Agent works', owner: 'agent' },
  { label: 'Inspect', owner: 'human' },
  { label: 'Verify', owner: 'human' },
  { label: 'Question', owner: 'human' },
  { label: 'Explain observable work', owner: 'human' },
  { label: 'Redirect', owner: 'human' },
] as const

type LearningLoopPlacement = 'preview' | 'index' | 'case-study-hero'

const Loop = styled.figure<{ $placement: LearningLoopPlacement }>`
  display: grid;
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: clamp(var(--space-5), 3vw, var(--space-8));
  background: #163f42;
  color: #fffaf0;

  .learning-loop__stages {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    align-content: center;
    margin: 0;
    padding: 0;
    list-style: none;
    background: rgb(255 250 240 / 24%);
  }

  .learning-loop__stage {
    position: relative;
    display: grid;
    min-height: 7.5rem;
    padding: var(--space-4);
    background: #163f42;
  }

  .learning-loop__stage--agent { background: #a24f32; }
  .learning-loop__index,
  .learning-loop__stage small { font-family: var(--font-code); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; }
  .learning-loop__index { color: #efbd77; }
  .learning-loop__stage strong { align-self: end; font-family: var(--font-display); font-size: clamp(1rem, 1.7vw, 1.4rem); line-height: 1; }
  .learning-loop__stage small { margin-top: var(--space-2); color: rgb(255 250 240 / 72%); }
  .learning-loop__stage--agent .learning-loop__index,
  .learning-loop__stage--agent small { color: #fffaf0; }
  .learning-loop__connector { position: absolute; z-index: 1; right: -0.5rem; top: 50%; color: #efbd77; }
  .learning-loop__stage:nth-child(5) { grid-column: 2; }

  ${({ $placement }) => $placement === 'index' ? `
    width: calc(100% - (2 * var(--space-3)));
    min-height: 0;
    margin: var(--space-3);
    padding: var(--space-3);

    .learning-loop__stage { min-height: 6.25rem; padding: var(--space-2); }
    .learning-loop__stage strong { font-size: 0.9rem; }
  ` : `
    width: min(82%, 48rem);
    min-height: 0;
    margin: clamp(var(--space-3), 3vw, var(--space-8));
    padding: clamp(var(--space-3), 2vw, var(--space-5));
    background: rgb(22 63 66 / 94%);
    box-shadow: 0 1rem 3rem rgb(13 24 24 / 28%);

    .learning-loop__stage { min-height: clamp(4.5rem, 8vw, 7.5rem); padding: clamp(var(--space-2), 1.5vw, var(--space-4)); }
    .learning-loop__stage strong { font-size: clamp(0.9rem, 1.4vw, 1.2rem); }
  `}

  @media (max-width: 64rem) {
    .learning-loop__stages { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .learning-loop__stage:nth-child(5) { grid-column: auto; }
  }

  @media (max-width: 56rem) {
    .learning-loop__stage { min-height: 6.5rem; }
  }
`

export function LearningLoop({ placement = 'preview' }: { placement?: LearningLoopPlacement }) {
  return (
    <Loop className="learning-loop" $placement={placement} data-visual-contract="learning-lab-loop" aria-label="The Learning Lab direction and verification loop">
      <ol className="learning-loop__stages">
        {stages.map((stage, index) => (
          <li className={`learning-loop__stage learning-loop__stage--${stage.owner}`} key={stage.label}>
            <span className="learning-loop__index">{String(index + 1).padStart(2, '0')}</span>
            <strong>{stage.label}</strong>
            <small>{stage.owner === 'agent' ? 'Agent performed' : 'Human owned'}</small>
            <span className="learning-loop__connector" aria-hidden="true">{index === stages.length - 1 ? '↺' : '→'}</span>
          </li>
        ))}
      </ol>
    </Loop>
  )
}
