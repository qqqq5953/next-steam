'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import GameCard from '@/app/_components/GameCard'
import { Game } from '@/types'
import { platformMap, orderMap } from '@/lib/dropdownOptions'
import Icon from '@/components/global/Icon'

type Props = {
  order?: string
  platform?: string
  mode?: string
}

export default function CardsSection({ order, platform, mode }: Props) {
  const orderValue = orderMap[order as keyof typeof orderMap] || '-relevance'
  const platformValue = platformMap[platform as keyof typeof platformMap] || '1'
  const displayMode = mode || 'grid'

  const [games, setGames] = useState<Game[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true) // Track if there's more data to fetch
  const lastGameRef = useRef(null);

  const fetchGames = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/games?ordering=${orderValue}&parent_platforms=${platformValue}&page=${page}`);

      if (!res.ok) throw new Error(`Failed to fetch data`)
      const data = await res.json()
      // console.log('data', data);
      setGames((prevGames) => [...prevGames, ...data.results])
      setHasMore(data.results.length > 0)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [orderValue, platformValue, page])

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  // Infinite Scroll
  useEffect(() => {
    if (isLoading || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1) // Load the next page
        }
      },
      { threshold: 1.0 }
    )

    /* 
      The ref value 'lastGameRef.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'lastGameRef.current' to a variable inside the effect, and use that variable in the cleanup function. 

      if (lastGameRef.current) observer.observe(lastGameRef.current);

      return () => {
        if (lastGameRef.current) observer.unobserve(lastGameRef.current);
      };
    */

    // Capture the current `lastGameRef.current` value to avoid potential issues in cleanup
    const currentRef = lastGameRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isLoading, hasMore])

  return (
    <>
      <section
        className={
          displayMode === 'film'
            ? 'columns-1 space-y-8'
            : 'columns-1 sm:columns-2 md:columns-3 2xl:columns-4 3xl:columns-5 gap-4 sm:gap-6'
        }
      >
        {games.map((game, index) => {
          const isLastItem = index === games.length - 1;
          return (
            <div
              key={game.id}
              ref={isLastItem ? lastGameRef : null} // Attach ref to the last item
              className={mode === 'film' ? 'max-w-2xl mx-auto' : 'mb-4 sm:mb-6'}
            >
              <GameCard game={game} displayMode={mode} />
            </div>
          );
        })}
      </section>

      {/* Loading indicator and trigger for infinite scrolling */}
      <div className='flex justify-center'>
        {isLoading && <Icon
          name="loader-2"
          useSuspense={false}
          size={36}
          strokeWidth={1}
          className="animate-spin text-white/50"
        />}
      </div>
    </>
  )
}
