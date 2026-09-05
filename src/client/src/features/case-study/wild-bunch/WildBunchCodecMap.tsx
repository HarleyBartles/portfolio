import type { ReactElement } from 'react'
import styled from 'styled-components'

type CodecField = {
  bits: string
  group: 'case' | 'settlement' | 'topology'
  label: string
  sample: string
  width: number
}

const codecFieldsLowToHigh: readonly CodecField[] = [
  { label: 'variant', bits: '0–1', group: 'case', sample: '2', width: 2 },
  { label: 'accused', bits: '2–5', group: 'case', sample: '3', width: 4 },
  { label: 'culprit', bits: '6–9', group: 'case', sample: '5', width: 4 },
  { label: 'cash', bits: '10–13', group: 'settlement', sample: '9', width: 4 },
  { label: 'towns', bits: '14–17', group: 'settlement', sample: '2', width: 4 },
  { label: 'prosperity', bits: '18–20', group: 'settlement', sample: '4', width: 3 },
  { label: 'services', bits: '21–23', group: 'settlement', sample: '6', width: 3 },
  { label: 'clusters', bits: '24–25', group: 'topology', sample: '2', width: 2 },
  { label: 'density', bits: '26', group: 'topology', sample: '1', width: 1 },
  { label: 'outlier', bits: '27–28', group: 'topology', sample: '1', width: 2 },
  { label: 'building layout', bits: '29–32', group: 'topology', sample: '9', width: 4 },
]

const codecFieldsHighToLow = [...codecFieldsLowToHigh].reverse()
const codecGroups = [
  { key: 'topology', label: 'layout topology' },
  { key: 'settlement', label: 'town profile' },
  { key: 'case', label: 'case setup' },
] as const

const Map = styled.div`
  container: wild-bunch-codec-map / inline-size;
  margin-block: var(--space-4) var(--space-5);
  box-sizing: border-box;
  padding: var(--space-4) var(--space-2);
  border: 1px solid rgb(230 191 109 / 24%);
  background: var(--wild-bunch-color-earth, #574c3f);
  box-shadow: 0 .9rem 2rem rgb(18 15 11 / 16%);
  font-family: var(--font-site-sans);

  .wild-bunch-codec-map__eyebrow { margin: 0 0 var(--space-3); color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .025em; }
  .wild-bunch-codec-map__uuid { display: flex; flex-wrap: wrap; justify-content: center; overflow-wrap: normal; color: var(--color-surface); font-family: var(--font-code); font-size: var(--type-code-size); letter-spacing: .025em; text-align: center; white-space: nowrap; }
  .wild-bunch-codec-map__allocation { margin-top: var(--space-5); }
  .wild-bunch-codec-map__allocation-labels,
  .wild-bunch-codec-map__allocation-rail,
  .wild-bunch-codec-map__allocation-notes { display: grid; grid-template-columns: 95fr 33fr; }
  .wild-bunch-codec-map__allocation-labels,
  .wild-bunch-codec-map__allocation-notes { color: rgb(255 250 240 / 72%); font-size: var(--type-metadata-size); line-height: 1.2; text-align: center; }
  .wild-bunch-codec-map__allocation-rail { height: 1.75rem; margin-block: var(--space-2); }
  .wild-bunch-codec-map__allocation-rail span:first-child { border: 1px solid rgb(255 250 240 / 34%); background: rgb(255 250 240 / 5%); }
  .wild-bunch-codec-map__allocation-rail span:last-child { border: 1px solid var(--wild-bunch-color-faded-gold, #e6bf6d); background: rgb(230 191 109 / 18%); }
  .wild-bunch-codec-map__allocation-notes span:last-child { color: var(--wild-bunch-color-faded-gold, #e6bf6d); }
  .wild-bunch-codec-map__recipe-heading { margin-top: var(--space-6); padding-bottom: var(--space-3); border-bottom: 1px solid rgb(255 250 240 / 24%); }
  .wild-bunch-codec-map__recipe-heading p { margin: 0; color: var(--wild-bunch-color-faded-gold, #e6bf6d); font-size: var(--type-metadata-size); font-weight: 700; }
  .wild-bunch-codec-map__recipe-heading span { margin-left: var(--space-2); color: rgb(255 250 240 / 68%); font-weight: 400; }
  .wild-bunch-codec-map__groups { display: grid; grid-template-columns: 4fr 4fr 3fr; gap: var(--space-5); margin-top: var(--space-4); }
  .wild-bunch-codec-map__group--topology {
    --codec-group-color: #d2c0aa;
  }
  .wild-bunch-codec-map__group--settlement {
    --codec-group-color: var(--color-evidence-group-secondary);
  }
  .wild-bunch-codec-map__group--case {
    --codec-group-color: var(--wild-bunch-color-faded-gold, #e6bf6d);
  }
  .wild-bunch-codec-map__group h4 { margin: 0; padding-top: var(--space-2); border-top: 2px solid var(--codec-group-color); color: var(--codec-group-color); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); line-height: 1.2; }
  .wild-bunch-codec-map__group ol { display: grid; gap: var(--space-3); margin: var(--space-4) 0 0; padding: 0; list-style: none; }
  .wild-bunch-codec-map__group li { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--space-2); align-items: baseline; min-width: 0; }
  .wild-bunch-codec-map__group li > code { color: var(--codec-group-color); font-size: var(--type-code-size); font-weight: 600; }
  .wild-bunch-codec-map__group strong,
  .wild-bunch-codec-map__group small { display: block; }
  .wild-bunch-codec-map__group strong { color: var(--codec-group-color); font-size: var(--type-metadata-size); line-height: 1.2; }
  .wild-bunch-codec-map__group small { margin-top: .15rem; color: rgb(255 250 240 / 68%); font-size: .8125rem; line-height: 1.25; }

  @container wild-bunch-codec-map (max-width: 36rem) {
    .wild-bunch-codec-map__groups { grid-template-columns: 1fr; }
    .wild-bunch-codec-map__group ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @container wild-bunch-codec-map (max-width: 24rem) {
    .wild-bunch-codec-map__group ol { grid-template-columns: 1fr; }
  }
`

export function WildBunchCodecMap(): ReactElement {
  return (
    <Map aria-labelledby="wild-bunch-codec-map-title" className="wild-bunch-codec-map" role="group">
      <p className="wild-bunch-codec-map__eyebrow" id="wild-bunch-codec-map-title">Resolver version 17 UUID bit allocation</p>
      <code className="wild-bunch-codec-map__uuid">
        <span>00000000-0000-0000-</span><span>0000-00012ed0a54e</span>
      </code>

      <div aria-label="95 upper bits reserved and rightmost 33 bits packed" className="wild-bunch-codec-map__allocation">
        <div className="wild-bunch-codec-map__allocation-labels">
          <span>95 reserved bits</span>
          <span>33 packed bits</span>
        </div>
        <div aria-hidden="true" className="wild-bunch-codec-map__allocation-rail">
          <span />
          <span />
        </div>
        <div className="wild-bunch-codec-map__allocation-notes">
          <span>future capacity</span>
          <span>world recipe</span>
        </div>
      </div>

      <div className="wild-bunch-codec-map__recipe-heading">
        <p>packed recipe <span>high bits 32 → low bits 0</span></p>
      </div>
      <div className="wild-bunch-codec-map__groups">
        {codecGroups.map((group) => {
          const fields = codecFieldsHighToLow.filter((field) => field.group === group.key)

          return (
            <section className={`wild-bunch-codec-map__group wild-bunch-codec-map__group--${group.key}`} key={group.key}>
              <h4>{group.label}</h4>
              <ol>
                {fields.map((field) => (
                  <li data-codec-field={field.label} key={field.bits}>
                    <code>[{field.sample}]</code>
                    <span>
                      <strong>{field.label}</strong>
                      <small>{field.bits} · {field.width} {field.width === 1 ? 'bit' : 'bits'}</small>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          )
        })}
      </div>
    </Map>
  )
}
