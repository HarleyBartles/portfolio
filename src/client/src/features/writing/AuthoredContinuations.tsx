import { WritingContinuations, type WritingContinuation } from './WritingContinuations'

type AuthoredContinuationsProps = {
  items: readonly WritingContinuation[]
}

export const AuthoredContinuations = ({ items }: AuthoredContinuationsProps) => {
  return <WritingContinuations items={items} />
}
