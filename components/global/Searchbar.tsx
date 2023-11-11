'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/base-ui/Input'
import { useDebounce } from '@/hooks/useDebounce'

import { SearchResult } from '@/types'
import GameList from './GameList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Searchbar() {
  const [searchResult, setSearchResult] = useState<[] | null>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const debouncedValue = useDebounce<string>(keyword, 500)

  useEffect(() => {
    if (!debouncedValue) return setSearchResult(null)
    searchForGames(debouncedValue)

    async function searchForGames(keyword: string) {
      setIsLoading(true)

      const res = await fetch(`https://rawg.io/api/games?search=${keyword.trim()}&page_size=20&key=c542e67aec3a4340908f9de9e86038af`)
      const data = await res.json()
      console.log('data', data);

      setSearchResult(data.results)
      setIsLoading(false)
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

      <FontAwesomeIcon icon={faTimes} className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-black peer:transition-all peer:duration-200' onClick={() => setKeyword("")} />

      {debouncedValue && <div className='fixed top-12 inset-x-0 bg-[#181818] overflow-auto overscroll-contain mt-4 p-4 md:rounded-xl group-focus-within:block hidden md:absolute md:top-full md:w-full md:bg-black
      max-h-[500px]
        '>
        {isLoading &&
          <div className='text-center py-4'>
            <FontAwesomeIcon icon={faCircleNotch} className='text-neutral-500 animate-spin fa-2xl' />
          </div>
        }

        {!isLoading && searchResult?.length !== 0 && <ul className='space-y-4'>
          {searchResult?.map((result: SearchResult) => {
            return <GameList game={result} key={result.slug} />
          })}
        </ul>}

        {!isLoading && searchResult?.length === 0 && <div>No result</div>}
      </div>}
    </div>
  )
}