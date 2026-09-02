import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { WritingHomepageFeature } from './homepageEdition'
import { homepageAssetPath } from './homepageAssets'

const events = [
  ['EVENT 01 · 08:14:03', 'GameStarted'],
  ['EVENT 02 · 08:14:19', 'StoreItemPurchased'],
  ['EVENT 03 · 08:15:02', 'JourneyStarted'],
  ['EVENT 04 · 08:15:44', 'TravelDayAdvanced'],
  ['EVENT 05 · 08:16:27', 'JourneyCompleted'],
  ['EVENT 06 · 08:16:31', 'JourneyArrivalAcknowledged'],
] as const

export function WildBunchFeature({ nextFeature }: { nextFeature: WritingHomepageFeature }): ReactElement {
  return (
    <section className="home-movement home-project home-project-reverse wild-movement" aria-labelledby="home-wild-title" data-home-movement="wild-bunch" data-visual-contract="homepage-wild-bunch">
      <span className="home-anchor-target" id="wild-bunch" aria-hidden="true" />
      <div className="home-frame home-project-grid wild-grid">
        <p className="home-eyebrow">Wild Bunch · C# / .NET / PostgreSQL</p>
        <div className="home-project-copy wild-copy-rail">
          <h2 className="home-section-title" id="home-wild-title">I only get to call the replay exact because it's falsifiable.</h2>
          <div className="wild-reading-card">
            <p className="home-body">I said events were the source of truth. Then I audited the replay and found they weren't. I fixed the gaps until I could throw the snapshot away and reconstruct the same session from the event stream.</p>
            <div className="home-route-actions">
              <Link className="home-cta" to="/projects/wild-bunch">Follow the trail →</Link>
              <a className="home-next" href={`#${nextFeature.anchorId}`}>{nextFeature.incomingTeaser} ↓</a>
            </div>
          </div>
        </div>
        <div className="home-project-visual"><figure className="wild-proof home-wild-proof" data-wild-proof="true" data-topology="events-cache-state;history-replay-cache-state" aria-labelledby="home-wild-proof-caption">
          <figcaption className="visually-hidden" id="home-wild-proof-caption">Six immutable ordered events continually refresh one replaceable Cache. A separate complete-history sweep feeds Replay, which rebuilds that same Cache. Cache alone produces the current State.</figcaption>
          <section className="wild-proof-history" aria-labelledby="home-wild-history-title">
            <h3 id="home-wild-history-title">Immutable event history</h3>
            <ol className="wild-event-list">
              {events.map(([metadata, name], index) => (
                <li className="home-wild-event" key={name}>
                  <span className="wild-history-read" aria-hidden="true" />
                  <span className="wild-event-meta">{metadata}</span>
                  <strong className="wild-event-name">{name}</strong>
                  <span className={`wild-wire wild-live-wire wild-live-wire--${index + 1} home-wild-live-wire home-wild-live-wire--${index + 1}`} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </section>
          <span className="wild-history-sweep home-wild-history-sweep" aria-hidden="true" />
          <section className="wild-proof-cache" aria-labelledby="home-wild-cache-title"><h3 id="home-wild-cache-title">Cache</h3></section>
          <section className="wild-proof-replay" aria-labelledby="home-wild-replay-title"><h3 id="home-wild-replay-title">Replay</h3></section>
          <span className="wild-wire wild-replay-cache-flow home-wild-replay-cache-flow" aria-hidden="true" />
          <span className="wild-wire wild-cache-state-flow home-wild-cache-state-flow" aria-hidden="true" />
          <section className="wild-proof-state" aria-labelledby="home-wild-state-title">
            <picture className="wild-state-texture" aria-hidden="true"><source media="(max-width: 900px)" srcSet={homepageAssetPath('wild-bunch-state-vertical.webp')} /><img src={homepageAssetPath('wild-bunch-state.webp')} alt="" loading="lazy" decoding="async" /></picture>
            <h3 id="home-wild-state-title">State</h3>
            <p className="wild-state-value"><strong>Current view</strong></p>
            <ul className="wild-state-nodes" aria-label="Examples of current derived state">{['Player', 'World', 'Clock', 'Journey', 'Case file', 'Pursuit'].map((label) => <li className={`wild-state-node--${label.toLowerCase().replace(' file', '')}`} key={label}>{label}</li>)}</ul>
          </section>
        </figure></div>
      </div>
    </section>
  )
}
