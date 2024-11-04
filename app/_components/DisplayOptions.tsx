'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useMediaQuery from '@/hooks/useMediaQuery'
import { LayoutGrid, Film } from 'lucide-react'

export default function Display() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedValue, setSelectedValue] = useState<string>(
    searchParams.get('mode') || 'grid'
  )

  const handleClick = useCallback((type: string) => {
    setSelectedValue(type)

    const queryStrings = searchParams.toString()
    const newSearchParams = new URLSearchParams(queryStrings);
    newSearchParams.set("mode", type)

    router.push(`?${newSearchParams}`)
  }, [searchParams])

  const isWeb = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isWeb == null) return
    if (!isWeb) handleClick('grid')
  }, [isWeb, handleClick])

  return (
    <>
      <span className="text-sm text-neutral-500 font-light">
        Display options:
      </span>
      <button
        className={`${selectedValue === 'grid' ? 'text-white' : 'text-neutral-500'
          } bg-neutral-800/90 rounded-lg w-12 h-12 grid place-content-center`}
        onClick={() => {
          handleClick('grid')
        }}
      >
        <LayoutGrid strokeWidth={1} />
      </button>
      <button
        className={`${selectedValue === 'film' ? 'text-white' : 'text-neutral-500'
          } bg-neutral-800/90 rounded-lg w-12 h-12 grid place-content-center`}
        onClick={() => {
          handleClick('film')
        }}
      >
        <Film strokeWidth={1} size={28} />
      </button>
    </>
  )
}
