import styled from 'styled-components'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const AssentNote = styled.div`
  aspect-ratio: 1373 / 1145;
  transform: rotate(-5deg);

  > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const AssentCopy = styled.span`
  position: absolute;
  inset: 21% 16% 16%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: var(--specialists-index-ink);
  font-family: "Segoe Print", "Bradley Hand", cursive;
  line-height: .98;
  text-shadow: 0 .2px 0 rgb(23 54 77 / 30%);
  transform: rotate(-6deg) translate(18%, -5%);

  span {
    font-size: 1.25rem;
    font-weight: 600;
    white-space: nowrap;
  }

  span:first-child {
    transform: rotate(1.5deg);
  }

  span:nth-child(2) {
    margin-top: -.04em;
    margin-left: 2.65em;
    transform: rotate(-2deg);
  }

  strong {
    margin-top: .42em;
    margin-left: .35em;
    font-size: 1.6rem;
    font-weight: 700;
    white-space: nowrap;
    transform: rotate(.8deg);
  }

  @media (max-width: 900px) {
    span {
      font-size: 1rem;
    }

    strong {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 720px) {
    span {
      font-size: .9rem;
    }

    strong {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 390px) {
    span {
      font-size: .7rem;
    }
  }
`

export const IndexAssentNote = ({ className }: { className?: string }) => {
  return (
    <AssentNote className={className} data-index-substrate="assent-note">
      <img src={usualSpecialistsAssetPath('index-assent-note.webp')} width="480" height="400" loading="lazy" decoding="async" alt="" aria-hidden="true" />
      <span className="visually-hidden">You son of a gun. I'm in!</span>
      <AssentCopy aria-hidden="true">
        <span>You son of</span>
        <span>a gun</span>
        <strong>I'm in!</strong>
      </AssentCopy>
    </AssentNote>
  )
}
