import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export type PublicationRegister = 'site-sans' | 'article-serif'
export type EyebrowVariant = 'site' | 'utility'

type EyebrowProps = ComponentPropsWithoutRef<'p'> & {
  as?: 'p' | 'span'
  variant?: EyebrowVariant
}

const EyebrowText = styled.p<{ $variant: EyebrowVariant }>`
  margin: 0;
  color: ${({ $variant, theme }) => $variant === 'utility' ? theme.color.accent : theme.color.muted};
  font-family: ${({ $variant, theme }) => $variant === 'utility' ? theme.font.code : theme.font.siteSans};
  font-size: ${({ $variant, theme }) => $variant === 'utility' ? '0.72rem' : theme.type.metadataSize};
  font-weight: ${({ $variant }) => $variant === 'utility' ? '400' : '600'};
  line-height: ${({ $variant }) => $variant === 'utility' ? '1.62' : '1.4'};
  letter-spacing: ${({ $variant }) => $variant === 'utility' ? '0.035em' : '.012em'};
  text-transform: ${({ $variant }) => $variant === 'utility' ? 'uppercase' : 'none'};
`

export const Eyebrow = ({ variant = 'site', ...props }: EyebrowProps) => (
  <EyebrowText {...props} data-eyebrow $variant={variant} />
)

type PageTitleProps = ComponentPropsWithoutRef<'h1'> & {
  register: PublicationRegister
}

const PageTitleHeading = styled.h1<{ $register: PublicationRegister }>`
  margin: 0;
  font-family: ${({ $register, theme }) => $register === 'article-serif' ? theme.font.articleSerif : theme.font.siteSans};
  font-size: ${({ $register, theme }) => $register === 'article-serif' ? 'clamp(38px, 4.2vw, 52px)' : theme.type.siteDisplaySize};
  line-height: ${({ $register, theme }) => $register === 'article-serif' ? '1.04' : theme.type.siteDisplayLeading};
  letter-spacing: ${({ theme }) => theme.type.siteDisplayTracking};
  text-wrap: balance;
`

export const PageTitle = ({ register, ...props }: PageTitleProps) => (
  <PageTitleHeading {...props} data-type-register={register} $register={register} />
)

export const PageLead = styled.p`
  max-width: 42rem;
  margin: 0;
  color: ${({ theme }) => theme.color.muted};
  font-size: clamp(1.1rem, 2.4vw, 1.35rem);
  line-height: 1.45;
`

type MetadataRowProps = Omit<ComponentPropsWithoutRef<'p'>, 'children'> & {
  items: readonly ReactNode[]
}

const Metadata = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.lg};
  margin: 0;
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.color.muted};
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: ${({ theme }) => theme.type.metadataSize};
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: .012em;
  text-transform: none;

  > span + span::before {
    content: '·';
    margin-right: ${({ theme }) => theme.space.lg};
    color: currentColor;
  }
`

export const MetadataRow = ({ items, ...props }: MetadataRowProps) => {
  if (items.length === 0) return null

  return (
    <Metadata {...props} data-metadata-row>
      {items.map((item, index) => <span key={index}>{item}</span>)}
    </Metadata>
  )
}

type IndexEntryTitleProps = Omit<ComponentPropsWithoutRef<'h2'>, 'children'> & {
  children: ReactNode
  to: string
}

const IndexTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.8rem, 3.3vw, 3.25rem);
  line-height: 1;
  letter-spacing: -0.04em;
  text-wrap: balance;

  a {
    color: ${({ theme }) => theme.color.ink};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.color.accent};
  }
`

export const IndexEntryTitle = ({ children, to, ...props }: IndexEntryTitleProps) => (
  <IndexTitle {...props}><Link to={to}>{children}</Link></IndexTitle>
)

export const IndexEntrySummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.color.muted};
`

export const IndexEntryVisualLink = styled(Link)`
  display: block;
  overflow: hidden;
  background: ${({ theme }) => theme.color.tealDeep};
`

const actionControlStyles = css`
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.color.ink};
  background: ${({ theme }) => theme.color.ink};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.m};
  color: ${({ theme }) => theme.color.surface};
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-transform: none;
  text-decoration: none;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.motion.fast}, color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: transparent;
    color: ${({ theme }) => theme.color.ink};
  }
`

export const ActionButton = styled.button`${actionControlStyles}`
export const ActionAnchor = styled.a`${actionControlStyles}`
export const ActionRouteLink = styled(Link)`${actionControlStyles}`

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  line-height: 1.03;
  letter-spacing: -0.035em;
`
