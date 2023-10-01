'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip, faFilm } from '@fortawesome/free-solid-svg-icons'

export default function Display() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedValue, setSelectedValue] = useState<string>(
    searchParams.get('mode') || 'grid'
  )

  function handleClick(type: string) {
    setSelectedValue(type)

    console.log('type', type);


    const queryStrings = searchParams.toString()
    const newSearchParams = new URLSearchParams(queryStrings);
    newSearchParams.set("mode", type)

    router.push(`?${newSearchParams}`)

    console.log('push', type);

  }

  return (
    <>
      <span className="text-sm text-slate-500 font-light">
        Display options:
      </span>
      <button
        className={`${selectedValue === 'grid' ? 'text-white' : 'text-neutral-500'
          } bg-neutral-800/90 rounded-lg w-12 h-12`}
        onClick={() => {
          handleClick('grid')
        }}
      >
        <FontAwesomeIcon icon={faGrip} className="fa-xl" />
      </button>
      <button
        className={`${selectedValue === 'film' ? 'text-white' : 'text-neutral-500'
          } bg-neutral-800/90 rounded-lg w-12 h-12`}
        onClick={() => {
          handleClick('film')
        }}
      >
        <FontAwesomeIcon icon={faFilm} className="fa-xl" />
      </button>
    </>
  )
}
