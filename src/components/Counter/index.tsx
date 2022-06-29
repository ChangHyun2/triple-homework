import { StyledCounter } from './index.styled'

import useAnimationCount from '@hooks/useAnimationCount'

interface CounterProps {
  start: number
  end: number
  milliSec: number
}

export default function Counter({ start, end, milliSec }: CounterProps) {
  const count = useAnimationCount(start, end, milliSec)

  return (
    <StyledCounter>
      <span className="skeleton">
        {Array(Math.max(start.toString().length, end.toString().length))
          .fill(0)
          .join('')}
      </span>
      <span className="value">{count}</span>
    </StyledCounter>
  )
}
