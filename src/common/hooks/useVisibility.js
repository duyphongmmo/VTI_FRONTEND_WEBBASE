import { useEffect, useRef, useState } from 'react'

export const useVisibility = (ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting),
    )
  }, [])

  useEffect(() => {
    if (!ref) return

    observerRef.current.observe(ref.current)

    return () => {
      observerRef.current.disconnect()
    }
  }, [ref])

  return isVisible
}
