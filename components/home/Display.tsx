'use client'

import { useState, MouseEvent } from 'react'
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

    let queryString = searchParams.toString()

    if (!queryString) {
      // add first
      queryString += `mode=${type}`
    } else if (!searchParams.has('mode')) {
      // attach
      queryString += `&mode=${type}`
    } else {
      // replace
      queryString = Array.from(searchParams.entries())
        .map(([key, value]) => {
          if (key === 'mode') {
            return `${key}=${type}`
          } else {
            return `${key}=${value}`
          }
        })
        .join('&')
    }

    router.push(`?${queryString}`)
  }

  return (
    <>
      <span className="text-sm text-slate-500 font-light">
        Display options:
      </span>
      <button
        className={`${
          selectedValue === 'grid' ? 'text-white' : 'text-neutral-500'
        } bg-neutral-800/90 rounded-lg w-12 h-12`}
        onClick={() => {
          handleClick('grid')
        }}
      >
        <FontAwesomeIcon icon={faGrip} className="fa-xl" />
      </button>
      <button
        className={`${
          selectedValue === 'film' ? 'text-white' : 'text-neutral-500'
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
