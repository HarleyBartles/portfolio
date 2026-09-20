import type { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'

const Bridge = styled.p`
  width: fit-content;
  margin: 0;
  padding: .6rem .85rem;
  border: 1px solid rgb(32 35 31 / 48%);
  background: rgb(242 236 223 / 96%);
  box-shadow: 5px 6px 0 rgb(0 0 0 / 8%);
  font-family: "Source Serif 4", Georgia, serif;
  font-size: clamp(.9rem, 1.1cqi, 1.15rem);
  line-height: 1.1;
`

type IndexRecognitionBridgeProps = {
  style?: CSSProperties
}

export const IndexRecognitionBridge = ({ style }: IndexRecognitionBridgeProps): ReactElement => {
  return (
    <Bridge data-index-closing-beat="recognition" style={style}>
      <span className="visually-hidden">Index says: </span>
      <span>“Bingo”</span>
    </Bridge>
  )
}
