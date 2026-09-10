import styled from 'styled-components'

export const IndexTraversal = styled.img.attrs({
  width: 320,
  height: 480,
  loading: 'lazy',
  decoding: 'async',
  alt: '',
  'aria-hidden': true,
})`
  position: absolute;
  z-index: 10;
  display: block;
  height: auto;
  pointer-events: none;
  user-select: none;
`
