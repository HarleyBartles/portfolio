import styled from 'styled-components'
import { EditorialSingleLineHeading } from '../../components/editorial/EditorialTextWrap'

export const ProfessionalStory = styled.section`
  display: grid;
  grid-template-columns: minmax(10rem, 3fr) minmax(0, 7fr);
  gap: clamp(${({ theme }) => theme.space.xl}, 6vw, var(--space-20));
  border-top: 1px solid ${({ theme }) => theme.color.ink};
  padding: clamp(${({ theme }) => theme.space.xxl}, 6vw, var(--space-16)) 0 var(--space-10);

  @media (max-width: 48rem) {
    grid-template-columns: 1fr;
  }
`

export const ProfessionalStoryRail = styled.div`
  align-self: start;
  color: ${({ theme }) => theme.color.muted};
  font-family: var(--font-site-sans);
  font-size: var(--type-metadata-size);
  letter-spacing: 0;
  line-height: 1.45;

  .eyebrow {
    color: ${({ theme }) => theme.color.muted};
  }

  @media (max-width: 48rem) {
    max-width: 20rem;
  }
`

export const ProfessionalStoryContent = styled.div`
  max-width: var(--measure-reading);
  container-type: inline-size;

  h2 {
    margin: 0;
    font-family: var(--font-site-sans);
    font-size: clamp(2.25rem, 4.5vw, 4.2rem);
    letter-spacing: -0.045em;
    line-height: 0.98;
  }

  ${EditorialSingleLineHeading} {
    font-size: clamp(1.25rem, 8.2cqi, 4.2rem);
  }

  > p {
    color: ${({ theme }) => theme.color.muted};
    font-size: 1.08rem;
  }

  > p:first-of-type {
    color: ${({ theme }) => theme.color.ink};
    font-family: var(--font-site-sans);
    font-size: clamp(1.4rem, 2.3vw, 1.85rem);
    letter-spacing: -0.02em;
    line-height: 1.14;
  }
`

export const NextRolePanel = styled.aside`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(20rem, 7fr);
  gap: ${({ theme }) => theme.space.xxl};
  border-top: 1px solid ${({ theme }) => theme.color.ink};
  padding-block: clamp(${({ theme }) => theme.space.xxl}, 8vw, var(--space-20));

  > div:first-child .eyebrow {
    margin: 0 0 ${({ theme }) => theme.space.md};
  }

  h2 {
    margin: 0;
    font-family: var(--font-site-sans);
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    letter-spacing: -0.045em;
    line-height: 0.98;
  }

  > div:last-child > p {
    color: ${({ theme }) => theme.color.muted};
    font-size: 1.08rem;
  }

  > div:last-child > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.md};
    margin-top: ${({ theme }) => theme.space.lg};
  }

  > div:last-child .button-link {
    border-color: ${({ theme }) => theme.color.ink};
    background: ${({ theme }) => theme.color.ink};
    color: ${({ theme }) => theme.color.surface};
  }

  > div:last-child .button-link:hover {
    background: transparent;
    border-color: ${({ theme }) => theme.color.ink};
    color: ${({ theme }) => theme.color.ink};
  }

  @media (max-width: 68rem) {
    grid-template-columns: 1fr;
  }
`
