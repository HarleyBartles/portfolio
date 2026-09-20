import type { ReactElement } from 'react'
import styled from 'styled-components'
import { usualSpecialistsAssetPath } from '../assets'

const Notice = styled.section`
  position: relative;
  padding:
    clamp(32px, 5vw, 72px)
    var(--specialists-gutter)
    clamp(56px, 9vw, 120px);
`

const Lockup = styled.div`
  container-type: inline-size;
  position: relative;
  width: min(100%, 960px);
  aspect-ratio: 3 / 2;
  margin-inline: auto;

  @media (max-width: 599px) {
    width: calc(100% + (2 * var(--specialists-gutter)));
    max-width: none;
    aspect-ratio: 15 / 13;
    margin-inline: calc(-1 * var(--specialists-gutter));
    overflow: hidden;
  }
`

const Artwork = styled.div`
  position: absolute;
  inset: 0;

  @media (max-width: 599px) {
    inset: auto;
    top: 50%;
    left: 50%;
    width: 100%;
    height: calc(100% / 1.3);
    transform: translate(-50%, -50%) scale(1.3);
    transform-origin: center;
  }
`

const LockupImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const SignFace = styled.div`
  position: absolute;
  /*
   * The accepted 1200×800 derivative owns this coordinate system.
   * These bounds are the blank inner sign face, not a free-floating
   * typographic approximation, so image and copy scale as one lockup.
   */
  top: 34%;
  left: 42%;
  width: 39.2%;
  height: 37%;
  scale: 1.3;
  container-type: inline-size;
  overflow: hidden;
  pointer-events: none;
`

const SignCopy = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.8cqi;
  padding: 7cqi 6cqi;
  color: #20231f;
  text-align: center;

  h2,
  p {
    margin: 0;
  }

  h2 {
    display: grid;
    max-width: 100%;
    font-family: var(--font-site-sans);
    font-size: min(8.5cqi, 2rem);
    font-weight: 800;
    line-height: 0.94;
    letter-spacing: 0.055em;
  }

  h2 span {
    display: block;
  }

  p {
    font-family: var(--font-site-sans);
    font-size: min(4.6cqi, 1.05rem);
    font-weight: 600;
    line-height: 1.2;
  }
`

export const UnderConstructionNotice = (): ReactElement => {
  return (
    <Notice aria-label="Under construction" data-specialists-under-construction>
      <Lockup data-specialists-construction-lockup>
        <Artwork data-specialists-construction-artwork>
          <LockupImage
            src={usualSpecialistsAssetPath('under-construction-patch-lockup.webp')}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            alt="Patch in a yellow hard hat stands beside a construction sign, traffic cone and hazard tape."
          />
          <SignFace data-specialists-construction-sign-face>
            <SignCopy>
              <h2><span>UNDER</span><span>CONSTRUCTION</span></h2>
              <p>Check back soon.</p>
            </SignCopy>
          </SignFace>
        </Artwork>
      </Lockup>
    </Notice>
  )
}
