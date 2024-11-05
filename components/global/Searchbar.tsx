'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/base-ui/Input'
import { useDebounce } from '@/hooks/useDebounce'

import { Collection, CollectionsAPI, Developer, SearchResult } from '@/types'
import GameItem from './GameItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'
import CreatorItem from './CreatorItem'
import CollectionItem from './CollectionItem'

export default function Searchbar() {
  const [gamesValue, setGamesValue] = useState<{
    count: number,
    results: SearchResult[]
  } | null>(null)

  const [collectionsValue, setCollectionsValue] = useState<CollectionsAPI | null>(null)

  const [creatorsValue, setCreatorsValue] = useState<{
    count: number,
    results: any
  } | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')

  const debouncedValue = useDebounce<string>(keyword, 500)

  useEffect(() => {
    if (!debouncedValue) {
      setGamesValue(null)
      setCollectionsValue(null)
      setCreatorsValue(null)
      return
    }

    setIsLoading(true)

    Promise
      .allSettled([
        searchForGames(debouncedValue),
        searchForCollections(debouncedValue),
        searchForCreators(debouncedValue),
      ])
      .then(res => {
        const [gamesRes, collectionsRes, creatorsRes] = res

        if (
          gamesRes.status === "fulfilled" &&
          !gamesRes.value.errorMsg
        ) {
          setGamesValue(gamesRes.value)
        } else {
          setGamesValue(null)
        }

        if (
          collectionsRes.status === "fulfilled" &&
          !collectionsRes.value.errorMsg
        ) {
          setCollectionsValue(collectionsRes.value)
        } else {
          setCollectionsValue(null)
        }

        if (
          creatorsRes.status === "fulfilled" &&
          !creatorsRes.value.errorMsg
        ) {
          setCreatorsValue(creatorsRes.value)
        } else {
          setCreatorsValue(null)
        }
      })
      .catch(err => {
        console.error('search err', err);
        setGamesValue(null)
        setCollectionsValue(null)
        setCreatorsValue(null)
      })
      .finally(() => {
        setIsLoading(false)
      })

    async function searchForGames(keyword: string) {
      const res = await fetch(`${process.env.BASE_URL}/api/games/search?query=${keyword.trim()}`)

      if (!res.ok) return setGamesValue(null)
      return await res.json()
    }

    async function searchForCollections(keyword: string) {
      const res = await fetch(`${process.env.BASE_URL}/api/collections/search?query=${keyword.trim()}`)
      console.log('res2', res);

      if (!res.ok) return setCollectionsValue(null)
      return await res.json()
    }

    async function searchForCreators(keyword: string) {
      const res = await fetch(`${process.env.BASE_URL}/api/creators/search?query=${keyword.trim()}`)
      console.log('res3', res);

      if (!res.ok) return setCreatorsValue(null)
      return await res.json()
    }
  }, [debouncedValue])

  return (
    <div className="relative group">
      <Input
        className="border-none rounded-full bg-white/25 pl-9 pr-7 text-neutral-300 text-xs placeholder:text-neutral-300 placeholder:font-light focus:bg-white focus:text-black focus:placeholder:text-neutral-400 focus:outline-none focus:border-none peer transition-all duration-200 h-7 lg:h-11 lg:text-sm peer"
        type="search"
        placeholder="Search for games"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-black peer:transition-all peer:duration-200' />

      <FontAwesomeIcon icon={faTimes} className='absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-black peer:transition-all peer:duration-200 cursor-pointer' onClick={() => setKeyword("")} />

      {debouncedValue && <div className='fixed top-12 inset-x-0 bg-[#181818] overflow-auto overscroll-contain mt-4 p-4 md:rounded-xl group-focus-within:block hidden md:absolute md:top-full md:w-full md:bg-black
      max-h-[500px]
        '>
        {isLoading ?
          <div className='text-center py-4'>
            <FontAwesomeIcon icon={faCircleNotch} className='text-neutral-500 animate-spin fa-2xl' />
          </div> :
          <div className='space-y-4'>
            {gamesValue && gamesValue?.results?.length !== 0 && <div className='space-y-4'>
              <p className='text-xl'>Games</p>
              <ul className='space-y-4'>
                {gamesValue.results?.map((result: SearchResult) => {
                  return <GameItem
                    game={result}
                    key={result.slug} imageClassName='w-[36px] h-[47px]'
                    titleClassName="text-sm"
                  />
                })}
              </ul>
            </div>}

            {collectionsValue && collectionsValue?.results?.length !== 0 && <div className='space-y-4'>
              <p className='text-xl'>Collections</p>
              <ul className='space-y-4'>
                {collectionsValue.results?.map((result: Collection) => {
                  return <CollectionItem {...result} key={result.slug} />
                })}
              </ul>
            </div>}

            {creatorsValue && creatorsValue?.results?.length !== 0 && <div className='space-y-4'>
              <p className='text-xl'>Creators</p>
              <ul className='space-y-4'>
                {creatorsValue.results?.map((result: Developer) => {
                  return <CreatorItem {...result} key={result.slug} />
                })}
              </ul>
            </div>}
          </div>
        }
      </div>}
    </div>
  )
}