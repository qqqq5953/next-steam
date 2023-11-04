'use client'
import { useEffect, useState } from 'react'
import useEventListener from './useEventListener'

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState<null | boolean>(null)
  const [mediaQueryList, setMediaQueryList] = useState<
    (Window & typeof globalThis) | MediaQueryList | null
  >(null)

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEventListener({
    eventType: 'change',
    callback: (e: Event) => {
      if ('matches' in e) {
        setIsMatch((e as MediaQueryListEvent).matches)
      }
    },
    element: mediaQueryList
  })

  return isMatch
}
