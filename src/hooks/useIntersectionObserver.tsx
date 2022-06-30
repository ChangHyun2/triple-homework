import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

type Observe = (target: Element) => void
type UnObserve = (target: Element) => void

interface Args extends IntersectionObserverInit {
  onObserved?: (entry: IntersectionObserverEntry) => void
}

interface Return {
  inView: boolean
  observe: Observe
  unObserve: UnObserve
}

export default function useIntersectionObserver(
  observedRef: RefObject<HTMLElement>,
  { root = null, rootMargin = '0px', threshold = 1.0, onObserved }: Args,
): Return {
  const [inView, setInView] = useState(false)
  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        setInView(!!entry.isIntersecting)

        if (onObserved) {
          onObserved(entry)
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    ),
  )

  const observe: Observe = useCallback((target: Element) => {
    if (!observer.current) {
      return
    }

    observer.current.observe(target)
  }, [])

  const unObserve: UnObserve = useCallback((target: Element) => {
    if (!observer.current) {
      return
    }
    observer.current.unobserve(target)
  }, [])

  useEffect(() => {
    observe(observedRef.current!)

    return () => unObserve(observedRef.current!)
  }, [observe, unObserve, observedRef])

  return { inView, observe, unObserve }
}
