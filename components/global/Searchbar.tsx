'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/base-ui/Input'
import { useDebounce } from '@/hooks/useDebounce'

import { SearchResult } from '@/types'
import GameList from './GameList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Searchbar() {
  const [searchResult, setSearchResult] = useState([])
  const [keyword, setKeyword] = useState<string>('')
  const debouncedValue = useDebounce<string>(keyword, 500)

  useEffect(() => {
    console.log('debouncedValue', debouncedValue);
    if (!debouncedValue) return setSearchResult([])

    async function searchForGames(keyword: string) {
      const res = await fetch(`https://rawg.io/api/games?search=${keyword}&page_size=2&key=c542e67aec3a4340908f9de9e86038af`)
      const data = await res.json()

      console.log('data', data);
      setSearchResult(data.results)
    }

    searchForGames(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="relative group">
      <Input
        className="border-none rounded-full bg-white/25 pl-10 text-neutral-300 text-xs placeholder:text-neutral-300 placeholder:font-light focus:bg-white focus:text-black focus:placeholder:text-neutral-400 focus:outline-none focus:border-none peer transition-all duration-200 h-7 lg:h-11 lg:text-sm peer"
        type="search"
        placeholder="Search for games"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-black peer:transition-all peer:duration-200'></FontAwesomeIcon>

      {keyword && searchResult.length !== 0 && <ul className='absolute top-full z-40 w-full mt-4 p-4 rounded-lg bg-black group-focus-within:block hidden'>
        {searchResult.map((result: SearchResult) => {
          return <GameList game={result} key={result.slug} />
        })}
      </ul>}
    </div>
  )
}