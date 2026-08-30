import type { ReactElement } from 'react'

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

export function WildBunchCodecMap(): ReactElement {
  return (
    <div aria-labelledby="wild-bunch-codec-map-title" className="wild-bunch-codec-map" role="group">
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
    </div>
  )
}
