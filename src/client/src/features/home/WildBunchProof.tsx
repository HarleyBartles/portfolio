import type { CSSProperties, ReactElement } from 'react'
import { homepageAssetPath } from './homepageAssets'
import {
  CacheStateFlow,
  EventItem,
  EventList,
  EventMeta,
  EventName,
  HistoryRead,
  HistorySweep,
  LiveWire,
  ProofCache,
  ProofFigure,
  ProofHistory,
  ProofReplay,
  ProofState,
  ReplayCacheFlow,
  StateNode,
  StateNodes,
  StateTexture,
  StateValue,
  VisuallyHiddenCaption,
} from './WildBunchProof.styles'

export type WildBunchEvent = readonly [metadata: string, name: string]

export type WildBunchProofProps = {
  events: readonly WildBunchEvent[]
  stateNodes: readonly string[]
}

export function WildBunchProof({ events, stateNodes }: WildBunchProofProps): ReactElement {
  const textureVariables = {
    '--wild-cache-texture': `url("${homepageAssetPath('wild-bunch-cache-crosshatch.webp')}")`,
    '--wild-replay-texture': `url("${homepageAssetPath('wild-bunch-replay-leather.webp')}")`,
  } as CSSProperties

  return (
    <ProofFigure data-wild-proof="true" data-topology="events-cache-state;history-replay-cache-state" aria-labelledby="home-wild-proof-caption" style={textureVariables}>
      <VisuallyHiddenCaption id="home-wild-proof-caption">Six immutable ordered events continually refresh one replaceable Cache. A separate complete-history sweep feeds Replay, which rebuilds that same Cache. Cache alone produces the current State.</VisuallyHiddenCaption>
      <ProofHistory aria-labelledby="home-wild-history-title">
        <h3 id="home-wild-history-title">Immutable event history</h3>
        <EventList>
          {events.map(([metadata, name], index) => (
            <EventItem data-wild-event key={name}>
              <HistoryRead aria-hidden="true" />
              <EventMeta>{metadata}</EventMeta>
              <EventName>{name}</EventName>
              <LiveWire $index={index + 1} data-wild-wire aria-hidden="true" />
            </EventItem>
          ))}
        </EventList>
      </ProofHistory>
      <HistorySweep aria-hidden="true" />
      <ProofCache data-wild-cache aria-labelledby="home-wild-cache-title"><h3 id="home-wild-cache-title">Cache</h3></ProofCache>
      <ProofReplay data-wild-replay aria-labelledby="home-wild-replay-title"><h3 id="home-wild-replay-title">Replay</h3></ProofReplay>
      <ReplayCacheFlow aria-hidden="true" />
      <CacheStateFlow aria-hidden="true" />
      <ProofState data-wild-state aria-labelledby="home-wild-state-title">
        <StateTexture aria-hidden="true"><source media="(max-width: 900px)" srcSet={homepageAssetPath('wild-bunch-state-vertical.webp')} /><img src={homepageAssetPath('wild-bunch-state.webp')} alt="" loading="lazy" decoding="async" /></StateTexture>
        <h3 id="home-wild-state-title">State</h3>
        <StateValue><strong>Current view</strong></StateValue>
        <StateNodes aria-label="Examples of current derived state">{stateNodes.map((label, index) => <StateNode $index={index} key={label}>{label}</StateNode>)}</StateNodes>
      </ProofState>
    </ProofFigure>
  )
}
