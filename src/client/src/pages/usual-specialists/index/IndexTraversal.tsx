import type { CSSProperties } from 'react'
import styled from 'styled-components'

export type IndexTraversalName =
  | 'index-walk'
  | 'patch-return'
  | 'index-return'
  | 'patch-follow'
  | 'index-high-step'
  | 'patch-peer'
  | 'index-inspect'

export type IndexTraversalSubstrate = 'desk-diagram' | 'blue-carrier' | 'commission-03-baseline'
export type IndexTraversalCharacter = 'index' | 'patch'
export type IndexTraversalMoment =
  | 'exploration'
  | 'following-index'
  | 'leading-route'
  | 'inspection'
  | 'return-to-work'
  | 'departure'

type IndexTraversalProps = {
  character: IndexTraversalCharacter
  moment: IndexTraversalMoment
  src: string
  traversal: IndexTraversalName
  substrate: IndexTraversalSubstrate
  style?: CSSProperties
}

const TraversalImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
`

export const IndexTraversal = ({ character, moment, src, traversal, substrate, style }: IndexTraversalProps) => {
  return (
    <TraversalImage
      src={src}
      width="320"
      height="480"
      loading="lazy"
      decoding="async"
      alt=""
      aria-hidden="true"
      data-index-character={character}
      data-index-moment={moment}
      data-index-traversal={traversal}
      data-substrate={substrate}
      style={style}
    />
  )
}
