import type { ReactElement } from 'react'
import marketplaceEvidence from '../../../data/case-studies/marketplace-evidence.json'

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
    <figure className="marketplace-map" aria-labelledby="marketplace-map-caption" data-visual-contract="marketplace-distribution-map">
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
    </figure>
  )
}
