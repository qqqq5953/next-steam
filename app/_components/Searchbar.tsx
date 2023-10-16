'use client'
import { useState } from 'react'

import Icon from "@/components/global/Icon"
import { Input } from '@/components/base-ui/Input'

export default function Searchbar() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Input
        className="border-none rounded-full bg-white/25 pl-10 text-black text-xs placeholder:text-neutral-300 placeholder:font-light focus:bg-white focus:placeholder:text-neutral-400 focus:outline-none focus:border-none peer transition-all duration-200 h-7 lg:h-11 lg:text-sm"
        type="search"
        placeholder="Search for games"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Icon name='search' className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-black peer:transition-all peer:duration-200" size={16} />
    </>
  )
}
