import type { ReactElement } from 'react'
import './RianHughesArticle.scss'

const specialistsWordmark = `${import.meta.env.BASE_URL}media/homepage/the-usual-specialists-wordmark.svg`
const patchLockup = `${import.meta.env.BASE_URL}brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg`

export function SpecialistsWordmarkStudy(): ReactElement {
  return (
    <section className="rian-wordmark-study" aria-label="The Usual Specialists wordmark study">
      <figure className="rian-wordmark-figure rian-wordmark-figure--construction" aria-label="How the hierarchy is built" aria-describedby="rian-construction-caption">
        <div className="rian-wordmark-plate rian-wordmark-plate--construction">
          <div className="rian-wordmark-canvas">
            <img
              src={specialistsWordmark}
              alt="The Usual Specialists wordmark with a restrained three-line construction overlay."
              width="1120"
              height="240"
              loading="lazy"
              decoding="async"
            />
            <span className="rian-datum rian-datum--left" data-testid="wordmark-datum" aria-hidden="true" />
            <span className="rian-datum rian-datum--cap" data-testid="wordmark-datum" aria-hidden="true" />
            <span className="rian-datum rian-datum--baseline" data-testid="wordmark-datum" aria-hidden="true" />
          </div>
        </div>
        <ul className="rian-datum-key" aria-label="Construction relationships">
          <li><span aria-hidden="true" />shared left edge</li>
          <li><span aria-hidden="true" />SPECIALISTS cap line</li>
          <li><span aria-hidden="true" />shared baseline</li>
        </ul>
        <figcaption id="rian-construction-caption">
          Three shared relationships explain the hierarchy without turning the mark into a dimension sheet.
        </figcaption>
      </figure>
    </section>
  )
}

export function PatchLockupCameo(): ReactElement {
  return (
    <figure className="rian-patch-cameo" aria-label="A different typographic answer" aria-describedby="rian-patch-caption">
      <div className="rian-patch-cameo__plate">
        <img
          src={patchLockup}
          alt="Adventures of Patch cliff-drop lockup, with the final s dropped vertically above PATCH."
          width="340"
          height="127"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption id="rian-patch-caption">
        PATCH found a different typographic answer. Chassis stayed with the Specialists.
      </figcaption>
    </figure>
  )
}
