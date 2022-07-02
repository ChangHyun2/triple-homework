import { useCallback, useRef, useState } from 'react'

const MAX_FPX = 60

export default function useAnimationCount(
  start: number,
  end: number,
  milliSec: number,
): [number, () => void] {
  const [count, setCount] = useState(start)
  const startAtRef = useRef<number | null>(null)
  const fps = useRef(MAX_FPX)

  const draw = useCallback(
    (timestamp: number, prevTimeStamp: number) => {
      // 첫 프레임일 때
      if (!startAtRef.current) {
        startAtRef.current = timestamp
      }

      // x축:t , y축:progress
      const spf = 1 / fps.current
      const startAt = startAtRef.current

      const t = timestamp - startAt
      const progress = t / milliSec

      // 타원에서 y축 offset 4
      fps.current =
        Math.abs(MAX_FPX * (Math.sqrt(1 - (progress - 1) ** 2) - 1)) + 5

      if ((timestamp - prevTimeStamp) / 1000 < spf) {
        requestAnimationFrame((timestamp) => draw(timestamp, prevTimeStamp))
        return
      }

      if (t < milliSec) {
        setCount(Math.floor(progress * (end - start) + start))

        const currentTimeStamp = timestamp
        requestAnimationFrame((timestamp) => draw(timestamp, currentTimeStamp))
      } else {
        setCount(end)
      }
    },
    [start, end, milliSec],
  )

  const requestAnimation = useCallback(
    () => requestAnimationFrame((timestamp) => draw(timestamp, timestamp)),
    [draw],
  )

  return [count, requestAnimation]
}
