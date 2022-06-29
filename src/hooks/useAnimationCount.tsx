import { useCallback, useEffect, useRef, useState } from 'react'

export default function useAnimationCount(
  start: number,
  end: number,
  milliSec: number,
) {
  const [count, setCount] = useState(start)
  const startAt = useRef<number | null>(null)

  const increase = useCallback(
    (timestamp: number) => {
      if (!startAt.current) {
        startAt.current = timestamp
      }

      const progress = timestamp - startAt.current

      if (progress < milliSec) {
        const currentRatio = progress / milliSec
        setCount(Math.floor(currentRatio * (end - start) + start))

        requestAnimationFrame(increase)
      } else {
        setCount(end)
      }
    },
    [start, end, milliSec],
  )

  useEffect(() => {
    requestAnimationFrame(increase)
  }, [increase])

  return count
}
