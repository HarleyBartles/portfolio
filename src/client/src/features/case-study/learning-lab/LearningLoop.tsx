const stages = [
  { label: 'Direct', owner: 'human' },
  { label: 'Agent works', owner: 'agent' },
  { label: 'Inspect', owner: 'human' },
  { label: 'Verify', owner: 'human' },
  { label: 'Question', owner: 'human' },
  { label: 'Explain observable work', owner: 'human' },
  { label: 'Redirect', owner: 'human' },
] as const

export function LearningLoop() {
  return (
    <figure className="learning-loop" data-visual-contract="learning-lab-loop" aria-label="The Learning Lab direction and verification loop">
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
    </figure>
  )
}
