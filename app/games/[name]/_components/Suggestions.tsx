"use client"

// import suggestions from '@/source/game_suggestions.json'
import GameCard from '@/app/_components/GameCard'
import { GameSingle, Suggestion } from '@/types'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

type Props = {
  game: GameSingle
}

type Suggestions = {
  count: number
  next: string
  previous: string
  results: Suggestion[]
}

export default function Suggestions({ game }: Props) {
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
        count: prevSuggestions?.count ?? 0, // Handle the count property
        next: res.next,
        previous: prevSuggestions?.previous || '', // Handle the previous property
        results: prevSuggestions?.results ? [...prevSuggestions?.results, ...res.results] : res.results,
      };
    })
  }, [])

  useEffect(() => {
    loadData("https://rawg.io/api/games/grand-theft-auto-v/suggested?page=1&page_size=6")
  }, [loadData])

  return <section className='space-y-6'>
    <h3 className='text-center text-xl lg:text-4xl underline underline-offset-4 decoration-neutral-500 decoration-1'>
      <Link href={`/games/${game.slug}/suggestions`}>Games like {game.name}</Link>
    </h3>
    {suggestions && <div className='columns-1 lg:columns-4 gap-2 sm:gap-6'>
      {suggestions?.results.map((suggestion) => {
        return <div key={suggestion.id} className='mb-2 sm:mb-6'>
          <GameCard
            game={suggestion}
          />
        </div>
      })}
    </div>}
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
}
