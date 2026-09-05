import type { ReactNode } from 'react'
import { useId } from 'react'
import styled, { css } from 'styled-components'

const Aside = styled.aside`
  display: grid;
  width: 100%;
  margin: var(--space-16) 0 var(--space-14);
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top: 0.35rem solid ${({ theme }) => theme.color.accent};
  background: color-mix(in srgb, ${({ theme }) => theme.color.accentSoft} 18%, ${({ theme }) => theme.color.surface});
  color: ${({ theme }) => theme.color.ink};
  overflow-wrap: anywhere;
  grid-template-areas:
    'header'
    'content';

  @media (min-width: 60rem) {
    width: min(64rem, calc(100vw - var(--space-12)));
    grid-template-columns: minmax(18rem, 0.8fr) minmax(22rem, 1.2fr);
    grid-template-areas:
      'header header'
      'content content';
  }

  @media (min-width: 72rem) {
    grid-template-columns: minmax(22rem, 1.05fr) minmax(22rem, 0.95fr);
    grid-template-areas: 'header content';
  }
`

const Header = styled.header<{ $hasEyebrow: boolean }>`
  grid-area: header;
  padding: clamp(var(--space-5), 3vw, var(--space-7));
  padding-bottom: 0;

  @media (min-width: 60rem) {
    align-self: start;
  }

  @media (min-width: 60rem) and (max-width: 71.99rem) {
    display: grid;
    grid-template-columns: minmax(18rem, 0.8fr) minmax(22rem, 1.2fr);
    ${({ $hasEyebrow }) => ($hasEyebrow
      ? css`
          grid-template-rows: auto auto;
          grid-template-areas:
            'eyebrow .'
            'heading .';
        `
      : css`
          grid-template-areas: 'heading .';
        `)}
  }
`

const Heading = styled.div`
  @media (min-width: 60rem) and (max-width: 71.99rem) {
    grid-area: heading;
  }
`

const Eyebrow = styled.p`
  @media (min-width: 60rem) and (max-width: 71.99rem) {
    grid-area: eyebrow;
  }

  margin: 0;
  color: ${({ theme }) => theme.color.inkSecondary};
  font-family: ${({ theme }) => theme.font.code};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.45;
`

const Title = styled.h2`
  max-width: 20ch;
  margin: var(--space-3) 0 0;
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.7rem, 3vw, 2.45rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.04;
`

const Precis = styled.p<{ $hasEyebrow: boolean }>`
  max-width: 32rem;
  margin: var(--space-5) 0 0;
  color: ${({ theme }) => theme.color.inkSecondary};
  font-family: ${({ theme }) => theme.font.articleSerif};
  font-size: 1rem;
  line-height: 1.55;

  @media (min-width: 60rem) and (max-width: 71.99rem) {
    grid-column: 2;
    grid-row: ${({ $hasEyebrow }) => ($hasEyebrow ? 2 : 1)};
    align-self: start;
    margin-top: var(--space-3);
  }

  @media (min-width: 72rem) {
    margin-top: clamp(var(--space-5), 3vw, var(--space-7));
  }
`

const Content = styled.div`
  grid-area: content;
  min-width: 0;
  padding: var(--space-5) clamp(var(--space-5), 3vw, var(--space-7)) clamp(var(--space-5), 3vw, var(--space-7));

  @media (min-width: 60rem) and (max-width: 71.99rem) {
    padding-top: clamp(var(--space-10), 5vw, var(--space-12));
    padding-bottom: clamp(var(--space-10), 5vw, var(--space-12));
  }
`

const Details = styled.details`
  min-width: 0;

  @media (min-width: 60rem) and (max-width: 71.99rem) {
    display: block;
  }

  summary {
    display: flex;
    min-height: 2.75rem;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding: var(--space-3) 0;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.ink};
    cursor: pointer;
    font-family: ${({ theme }) => theme.font.code};
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1.45;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.color.focus};
    outline-offset: 0.35rem;
  }
`

const Marker = styled.span`
  position: relative;
  width: 1rem;
  height: 1rem;
  flex: 0 0 1rem;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    content: '';
    transition: transform var(--duration-fast) var(--ease-out);
  }

  &::after {
    transform: rotate(90deg);
  }

  ${Details}[open] &::after {
    transform: rotate(0deg);
  }

  @media (prefers-reduced-motion: reduce) {
    &::before,
    &::after {
      transition: none;
    }
  }
`

const Body = styled.div`
  max-width: 38rem;
  padding-top: var(--space-6);

  @media (min-width: 60rem) and (max-width: 71.99rem) {
    max-width: none;
    margin-left: 40%;
  }
`

export type EditorialAsideProps = {
  children: ReactNode
  disclosureLabel: string
  precis: ReactNode
  title: string
  eyebrow?: ReactNode
  visual?: ReactNode
}

export const EditorialAside = ({
  children,
  disclosureLabel,
  eyebrow,
  precis,
  title,
  visual,
}: EditorialAsideProps) => {
  const titleId = useId()

  return (
    <Aside aria-labelledby={titleId} data-editorial-aside>
      <Header $hasEyebrow={eyebrow !== undefined}>
        {eyebrow === undefined ? null : <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading>
          <Title id={titleId}>{title}</Title>
        </Heading>
        <Precis $hasEyebrow={eyebrow !== undefined}>{precis}</Precis>
      </Header>
      <Content>
        {visual}
        <Details data-editorial-aside-disclosure>
          <summary>
            <span>{disclosureLabel}</span>
            <Marker aria-hidden="true" />
          </summary>
          <Body data-editorial-aside-body>{children}</Body>
        </Details>
      </Content>
    </Aside>
  )
}
