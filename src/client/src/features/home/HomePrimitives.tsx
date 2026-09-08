import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const HomeFrame = styled.div.attrs<{ 'data-home-frame'?: string }>({
  'data-home-frame': '',
})`
  width: var(--home-frame-width, min(76rem, calc(100% - 48px)));
  min-width: 0;
  margin-inline: var(--home-frame-margin-inline, auto);

  @media (max-width: 800px) {
    width: var(--home-frame-narrow-width, min(calc(100% - 28px), 76rem));
  }
`

export const HomeEyebrow = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: .012em;
`

export const HomeDisplayTitle = styled.h1`
  margin: 12px 0 0;
  font-size: clamp(46px, 6vw, 82px);
  font-weight: 650;
  line-height: .96;
  letter-spacing: -.03em;

  @media (max-width: 480px) {
    font-size: 49px;
  }
`

export const HomeSectionTitle = styled.h2`
  margin: 10px 0 0;
  font-size: clamp(36px, 4.5vw, 62px);
  font-weight: 650;
  line-height: .98;
  letter-spacing: -.028em;

  @media (max-width: 480px) {
    font-size: 42px;
  }
`

export const HomeBody = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.62;
`

const homeCta = css`
  display: inline-block;
  margin-top: 22px;
  font-weight: 600;
`

export const HomeRouteLink = styled(Link)`
  ${homeCta}
`

export const HomeCtaAnchor = styled.a`
  ${homeCta}
`

export const HomeNextAnchor = styled.a`
  color: var(--muted);
  font-size: 15px;
  font-weight: 600;
`

export const HomeRouteActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  margin-top: 22px;

  ${HomeRouteLink},
  ${HomeCtaAnchor} {
    margin-top: 0;
  }
`

export const HomeAnchorTarget = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  scroll-margin-top: 28px;
`
