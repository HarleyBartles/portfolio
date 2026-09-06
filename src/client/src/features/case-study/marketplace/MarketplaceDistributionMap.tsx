import type { ReactElement } from 'react'
import styled from 'styled-components'
import marketplaceEvidence from '../../../data/case-studies/marketplace-evidence.json'

const DistributionFigure = styled.figure`
  margin: 0;
  border-block: 1px solid var(--color-border);
  padding-block: clamp(var(--space-6), 5vw, var(--space-10));
  color: var(--color-ink);

  figcaption { display: grid; gap: var(--space-3); max-width: 52rem; margin-bottom: var(--space-8); }
  figcaption strong { font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 5rem); line-height: .9; }
  .marketplace-map__flow { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--space-3); padding: 0; list-style: none; }
  .marketplace-map__flow > li { min-width: 0; border-top: 1px solid var(--color-border); padding: var(--space-6) 0; color: var(--color-ink); }
  .marketplace-map__source { grid-column: span 4; display: grid; align-content: center; gap: var(--space-4); }
  .marketplace-map__source strong { font-family: var(--font-site-sans); font-size: 2rem; line-height: 1; }
  .marketplace-map__plugins { grid-column: span 8; }
  .marketplace-map__plugins--selected { grid-column: 3 / span 8; }
  .marketplace-map__plugins ul,
  .marketplace-map__consumers ul { display: grid; gap: var(--space-4); margin: var(--space-5) 0 0; padding: 0; list-style: none; }
  .marketplace-map__plugins ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .marketplace-map__plugins li { display: flex; gap: var(--space-3); align-items: center; min-width: 0; font-family: var(--font-code); font-size: .8rem; }
  .marketplace-map__plugins li span { min-width: 0; overflow-wrap: anywhere; }
  .marketplace-map__plugins img { width: 1.5rem; height: 1.5rem; flex: none; }
  .marketplace-map__consumers { grid-column: 1 / -1; }
  .marketplace-map__consumers ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .marketplace-map__consumers li { display: grid; gap: var(--space-2); border-top: 1px solid var(--color-border); padding-top: var(--space-4); }
  .marketplace-map__consumers code { width: fit-content; background: var(--color-accent-soft); padding: .1rem .3rem; color: var(--color-ink); font-size: .72rem; }
  .marketplace-map__consumers span { color: var(--color-muted); font-size: .92rem; }

  @media (max-width: 44rem) {
    .marketplace-map__flow,
    .marketplace-map__plugins ul,
    .marketplace-map__consumers ul { grid-template-columns: 1fr; }
    .marketplace-map__source,
    .marketplace-map__plugins,
    .marketplace-map__plugins--selected,
    .marketplace-map__consumers { grid-column: 1; }
  }
`

function assetPath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

function revisionFor(name: string): string {
  const consumer = marketplaceEvidence.consumers.find((item) => item.name === name)
  if (consumer === undefined) throw new Error(`Missing Marketplace evidence for ${name}`)
  return consumer.marketplaceRevision.slice(0, 7)
}

const corePlugins = [
  ['repo-worker-pack', 'repo-worker-pack.svg'],
  ['superpowers-plus', 'superpowers-plus.svg'],
  ['mcp-usage-pack', 'mcp-usage-pack.svg'],
] as const

const selectedPlugins = [
  ['frontend-pack', 'frontend-pack.svg'],
  ['architecture-pack', 'architecture-pack.svg'],
  ['dotnet-pack', 'dotnet-pack.svg'],
] as const

const consumers = [
  ['Portfolio', 'seven local design skills and repository doctrine'],
  ['Adventures of Patch', 'four local project skills and runbooks'],
] as const

export function MarketplaceDistributionMap(): ReactElement {
  const { pluginCount, entryCount, uniqueSkillCount } = marketplaceEvidence.inventory

  return (
    <DistributionFigure aria-labelledby="marketplace-map-caption" data-visual-contract="marketplace-distribution-map">
      <figcaption id="marketplace-map-caption">
        <strong>Selective distribution map</strong>
        <span>Repository audit · 21 August 2026. A dated snapshot, not live telemetry; consumers may pin different Marketplace revisions.</span>
      </figcaption>
      <ol className="marketplace-map__flow">
        <li className="marketplace-map__source"><strong>Marketplace source</strong><span>{pluginCount} plugins · {entryCount} entries · {uniqueSkillCount} unique skill names</span></li>
        <li className="marketplace-map__plugins"><strong>Core baseline</strong><ul>{corePlugins.map(([name, icon]) => <li key={name}><img src={assetPath(`/media/marketplace/${icon}`)} alt="" /><span>{name}</span></li>)}</ul></li>
        <li className="marketplace-map__plugins marketplace-map__plugins--selected"><strong>Selected by domain</strong><ul>{selectedPlugins.map(([name, icon]) => <li key={name}><img src={assetPath(`/media/marketplace/${icon}`)} alt="" /><span>{name}</span></li>)}</ul></li>
        <li className="marketplace-map__consumers"><strong>Consumers keep local custody</strong><ul>
          {consumers.map(([name, description]) => <li key={name}><b>{name}</b><code>{revisionFor(name)}</code><span>{description}</span></li>)}
          <li><b>Wild Bunch</b><code>{revisionFor('Wild Bunch')}</code><span>architecture-pack, dotnet-pack, frontend-pack, game-studio, and four local skills; no mcp-usage-pack selection in this audit.</span></li>
        </ul></li>
      </ol>
    </DistributionFigure>
  )
}
