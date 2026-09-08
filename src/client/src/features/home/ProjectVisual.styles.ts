import styled, { css } from 'styled-components'

export type ProjectVisualPlacement = 'preview' | 'index' | 'case-study-hero'

const visualBase = css`
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 3;
  overflow: hidden;
  background: var(--color-teal-deep);
`

const imageBase = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const captionType = css`
  font-family: var(--font-site-sans);
  font-size: var(--type-caption-size);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.5;
  text-transform: none;
`

export const LearningLabVisual = styled.div`
  ${visualBase}
  isolation: isolate;
  display: grid;
  min-height: 100%;
  background: #163f42;

  > * {
    grid-area: 1 / 1;
  }

  @media (max-width: 56rem) {
    min-height: 30rem;
  }
`

export const MarketplaceVisual = styled.figure`
  ${visualBase}
  display: grid;
  grid-template-rows: 1fr auto;
  padding: var(--space-8);
  color: var(--color-surface);

  @media (max-width: 30rem) {
    aspect-ratio: auto;
    padding: var(--space-4);
  }
`

export const MarketplaceNodes = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  transform: rotate(-2deg);

  span {
    display: grid;
    min-height: 3.25rem;
    place-items: center;
    border: 1px solid rgb(255 250 240 / 50%);
    background: rgb(255 250 240 / 8%);
    font-family: var(--font-code);
    font-size: .78rem;
  }

  @media (max-width: 30rem) {
    min-width: 0;
    grid-template-columns: 1fr;
    transform: none;

    span {
      overflow-wrap: anywhere;
    }
  }
`

export const MarketplaceCaption = styled.figcaption`
  ${captionType}
  position: static;
  display: flex;
  gap: var(--space-3);
  align-items: baseline;
  margin-top: var(--space-5);
  color: var(--color-surface);

  strong {
    font-family: var(--font-display);
    font-size: 2rem;
  }

  i {
    color: var(--color-accent-soft);
  }

  @media (max-width: 30rem) {
    min-width: 0;
    flex-wrap: wrap;
  }
`

export const PatchVisual = styled.picture<{ $placement: ProjectVisualPlacement }>`
  ${visualBase}
  display: ${({ $placement }) => ($placement === 'index' ? 'grid' : 'block')};
  place-items: ${({ $placement }) => ($placement === 'index' ? 'center' : 'normal')};
  height: ${({ $placement }) => ($placement === 'index' ? 'auto' : '100%')};
  aspect-ratio: ${({ $placement }) => ($placement === 'index' ? '4 / 3' : '5 / 3')};
  background: ${({ $placement }) => ($placement === 'index' || $placement === 'case-study-hero' ? 'var(--color-patch-field)' : 'var(--color-teal-deep)')};

  img {
    ${imageBase}
    display: block;
    object-fit: contain;
    object-position: center;

    ${({ $placement }) => $placement === 'index' && css`
      position: absolute;
      inset: 0;
    `}
  }

  ${({ $placement }) => $placement === 'case-study-hero' && css`
    @media (max-width: 44rem) {
      height: auto;
      aspect-ratio: auto;
      background: var(--color-patch-field);

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: min(36rem, 70vh);
        margin-inline: auto;
      }
    }
  `}
`

export const WildBunchConceptVisual = styled.figure<{ $placement: ProjectVisualPlacement }>`
  ${visualBase}
  display: block;
  min-width: 0;
  margin: 0;
  background: var(--wild-bunch-field-color, #d4cbc0);

  picture,
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  picture {
    ${({ $placement }) => $placement !== 'index' && css`
      position: relative;
      aspect-ratio: 16 / 9;

      &::after {
        position: absolute;
        inset: 0 auto 0 0;
        width: 18%;
        background: linear-gradient(to right, var(--wild-bunch-field-color, #d4cbc0) 0%, rgb(212 203 192 / 92%) 30%, transparent 100%);
        content: '';
        pointer-events: none;
      }
    `}
  }

  img {
    object-fit: cover;
    object-position: left center;
  }

  @media (min-width: 45rem) {
    ${({ $placement }) => $placement === 'index' && css`
      picture {
        height: 100%;
        aspect-ratio: auto;
        mask-image: none;
        -webkit-mask-image: none;
      }

      img {
        transform: scale(1.12);
        transform-origin: right center;
      }
    `}
  }

  @media (max-width: 44rem) {
    display: flex;
    flex-direction: column;
    aspect-ratio: auto;

    picture {
      aspect-ratio: auto;

      ${({ $placement }) => $placement !== 'index' && css`
        &::after {
          display: none;
        }
      `}
    }
  }
`

export const WildBunchConceptCaption = styled.figcaption`
  ${captionType}
  position: absolute;
  right: var(--space-4);
  bottom: var(--space-4);
  left: auto;
  width: max-content;
  max-width: calc(100% - (2 * var(--space-4)));
  box-sizing: border-box;
  padding: var(--space-2) var(--space-3);
  background: rgb(31 36 31 / 82%);
  color: var(--color-surface);
  overflow-wrap: anywhere;

  @media (max-width: 44rem) {
    position: static;
    align-self: flex-end;
    width: max-content;
    max-width: 100%;
    box-sizing: border-box;
    text-align: right;
  }
`

export const WildBunchPreviewVisual = styled.figure`
  ${visualBase}
  display: grid;
  grid-template-rows: 1fr auto;
  background: var(--color-ink);

  picture {
    min-height: 0;
  }

  img {
    ${imageBase}
  }
`

export const WildBunchPreviewCaption = styled.figcaption`
  ${captionType}
  position: static;
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  color: var(--color-surface);

  span {
    color: rgb(255 250 240 / 72%);
    font-weight: 400;
  }

  @media (max-width: 64rem) {
    flex-direction: column;
  }
`

const diagramBase = css`
  ${visualBase}
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  color: var(--color-surface);
  font-family: var(--font-code);
`

export const DecisionDiagramVisual = styled.figure`
  ${diagramBase}

  span {
    border: 1px solid rgb(255 250 240 / 45%);
    padding: var(--space-3);
  }

  i {
    color: var(--color-accent-soft);
  }
`

export const EssayVisual = styled.figure`
  ${diagramBase}
  flex-direction: column;
  background: var(--color-accent);
  font-family: var(--font-display);

  span,
  strong {
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: .8;
  }

  i {
    font-family: var(--font-body);
    font-size: 1.05rem;
  }
`
