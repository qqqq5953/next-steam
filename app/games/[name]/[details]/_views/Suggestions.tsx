"use client"

// import suggestions from '@/source/game_suggestions.json'
import GameCard from '@/app/_components/GameCard'
import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { Suggestion } from '@/types'

type Props = {
  name: string
}

type Suggestions = {
  count: number
  next: string
  previous: string
  results: Suggestion[]
}

type Prev = (prevSuggestions: Suggestions | null) => { next: any; results: any; count?: number | undefined; previous?: string | undefined; }

export default function Suggestions({ name }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function getSuggestions(url: string) {
    const res = await fetch(`${url}&key=c542e67aec3a4340908f9de9e86038af`)
    const data = await res.json()
    return data
  }

  const loadData = useCallback(async (url: string) => {
    setIsLoading(true)

    const res = await getSuggestions(url)
    setSuggestions((prevSuggestions: Suggestions | null) => {
      setIsLoading(false)

      return {
        count: prevSuggestions?.count ?? 0,
        previous: prevSuggestions?.previous || '',
        next: res.next,
        results: prevSuggestions?.results ? [...prevSuggestions?.results, ...res.results] : res.results,
      };
    })
  }, [])

  useEffect(() => {
    loadData("https://rawg.io/api/games/grand-theft-auto-v/suggested?page=1&page_size=6")
  }, [loadData])

  return (
    <section className='space-y-6'>
      <p className='pb-4'>
        Are you searching for games like {name}? Look no further! Here&apos;s a list of games similar to {name} either in the gameplay or in the visual style. If you like {name}, be sure to check some of these games as well.
      </p>

      {suggestions ?
        <div className='columns-1 lg:columns-3 gap-2 sm:gap-6'>
          {suggestions?.results.map((suggestion) => {
            return <div key={suggestion.id} className='mb-2 sm:mb-6'>
              <GameCard
                game={suggestion}
                showDescription={true}
              />
            </div>
          })}
        </div>
        :
        <div className="text-center text-2xl">
          <FontAwesomeIcon icon={faCircleNotch} className='animate-spin fa-xl text-neutral-400/70' />
        </div>
      }

      {suggestions?.next && <div className='text-center'>
        {isLoading ?
          <button className="rounded px-2 py-3.5 bg-neutral-800/90 text-center w-full lg:w-1/5 lg:max-w-xs">
            <FontAwesomeIcon icon={faCircleNotch} className='animate-spin fa-xl text-neutral-400/70' />
          </button> :
          <button className="rounded px-2 py-3.5 bg-neutral-800/90 text-neutral-400/70 text-center hover:bg-slate-50 hover:text-black transition-colors duration-300 w-full lg:w-1/5 lg:max-w-xs" onClick={() => loadData(suggestions.next)}>
            Load more
          </button>
        }
      </div>}
    </section>
  )
}
