import type { ReactElement } from 'react'
import styled from 'styled-components'

const specialistsWordmark = `${import.meta.env.BASE_URL}media/homepage/the-usual-specialists-wordmark.svg`
const patchLockup = `${import.meta.env.BASE_URL}brand/adventures-of-patch/adventures-of-patch-cliff-drop.svg`

const Study = styled.section`
  display: grid;
  width: min(68rem, calc(100vw - (2 * var(--space-6))));
  gap: clamp(var(--space-8), 6vw, var(--space-12));
  margin-block: clamp(var(--space-10), 8vw, var(--space-16));

  @media (max-width: 36rem) {
    width: 100%;
  }
`

const WordmarkFigure = styled.figure`
  margin: 0;
`

const Plate = styled.div`
  border: 1px solid var(--color-border);
  padding: clamp(var(--space-5), 5vw, var(--space-10));
  background: color-mix(in srgb, var(--color-accent-soft) 30%, var(--color-surface));

  @media (max-width: 36rem) {
    padding: var(--space-4);
  }
`

const WordmarkCanvas = styled.div`
  position: relative;

  img {
    display: block;
    width: 100%;
    height: auto;
    opacity: 0.68;
  }
`

const Datum = styled.span`
  position: absolute;
  z-index: 1;
  display: block;
  background: var(--color-accent);
  opacity: 0.78;
  pointer-events: none;
`

const LeftDatum = styled(Datum)`
  top: -0.5rem;
  bottom: -0.5rem;
  left: 2.14%;
  width: 1px;
`

const HorizontalDatum = styled(Datum)<{ $top: string }>`
  right: -0.5rem;
  left: -0.5rem;
  top: ${({ $top }) => $top};
  height: 1px;
`

const DatumKey = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  margin: var(--space-4) 0 0;
  padding: 0;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.78rem;
  list-style: none;

  li {
    display: inline-flex;
    gap: var(--space-2);
    align-items: center;
  }

  li > span {
    width: 1.5rem;
    height: 1px;
    background: var(--color-accent);
  }
`

const Caption = styled.figcaption`
  max-width: var(--measure-reading);
  margin-top: var(--space-3);
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.84rem;
  line-height: 1.5;
`

const Cameo = styled.figure`
  width: min(20rem, 100%);
  margin: clamp(var(--space-8), 6vw, var(--space-12)) 0;
`

const CameoPlate = styled(Plate)`
  padding: clamp(var(--space-5), 5vw, var(--space-8));

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

export function SpecialistsWordmarkStudy(): ReactElement {
  return (
    <Study aria-label="The Usual Specialists wordmark study">
      <WordmarkFigure aria-label="How the hierarchy is built" aria-describedby="rian-construction-caption">
        <Plate>
          <WordmarkCanvas>
            <img
              src={specialistsWordmark}
              alt="The Usual Specialists wordmark with a restrained three-line construction overlay."
              width="1120"
              height="240"
              loading="lazy"
              decoding="async"
            />
            <LeftDatum data-testid="wordmark-datum" aria-hidden="true" />
            <HorizontalDatum $top="36.18%" data-testid="wordmark-datum" aria-hidden="true" />
            <HorizontalDatum $top="79.17%" data-testid="wordmark-datum" aria-hidden="true" />
          </WordmarkCanvas>
        </Plate>
        <DatumKey aria-label="Construction relationships">
          <li><span aria-hidden="true" />shared left edge</li>
          <li><span aria-hidden="true" />SPECIALISTS cap line</li>
          <li><span aria-hidden="true" />shared baseline</li>
        </DatumKey>
        <Caption id="rian-construction-caption">
          Three shared relationships explain the hierarchy without turning the mark into a dimension sheet.
        </Caption>
      </WordmarkFigure>
    </Study>
  )
}

export function PatchLockupCameo(): ReactElement {
  return (
    <Cameo aria-label="A different typographic answer" aria-describedby="rian-patch-caption">
      <CameoPlate>
        <img
          src={patchLockup}
          alt="Adventures of Patch cliff-drop lockup, with the final s dropped vertically above PATCH."
          width="340"
          height="127"
          loading="lazy"
          decoding="async"
        />
      </CameoPlate>
      <Caption id="rian-patch-caption">
        PATCH found a different typographic answer. Chassis stayed with the Specialists.
      </Caption>
    </Cameo>
  )
}
