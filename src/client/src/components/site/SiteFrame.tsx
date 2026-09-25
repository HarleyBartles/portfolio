import styled from 'styled-components'

export const SiteFrame = styled.div`
  width: min(calc(100% - ${({ theme }) => theme.space.lg} - ${({ theme }) => theme.space.lg}), ${({ theme }) => theme.layout.maxWidth});
  min-width: 0;
  margin-inline: auto;

  @media (max-width: 46rem) {
    width: min(calc(100% - ${({ theme }) => theme.space.md} - ${({ theme }) => theme.space.md}), ${({ theme }) => theme.layout.maxWidth});
  }
`
