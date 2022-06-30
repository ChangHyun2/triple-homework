import { useEffect } from 'react'

import { StyledCounter } from './index.styled'

import useAnimationCount from '@hooks/useAnimationCount'

interface CounterProps {
  start: number
  end: number
  milliSec: number
  shouldRequestAnimation: boolean
}

export default function AnimationCounter({
  start,
  end,
  milliSec,
  shouldRequestAnimation,
}: CounterProps) {
  const [count, requestAnimation] = useAnimationCount(0, end, milliSec)

  useEffect(() => {
    if (shouldRequestAnimation) {
      requestAnimation()
    }
  }, [shouldRequestAnimation, requestAnimation])

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
