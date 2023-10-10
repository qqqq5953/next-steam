'use client'

import { useEffect, useRef } from 'react'

type Props = {
  eventType: string
  callback: (e: Event) => void
  element: (Window & typeof globalThis) | MediaQueryList | null
}

export default function useEventListener({
  eventType,
  callback,
  element = window
}: Props) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!element) return

    const handler = (e: Event) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}
