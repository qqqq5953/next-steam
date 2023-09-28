'use client'
import { useState } from 'react'

import { Input } from '@/components/base-ui/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'

export default function Searchbar() {
    const [search, setSearch] = useState('')

    return (
        <>
            <Input
                className="border-none rounded-full bg-white/25 pl-10 h-7 lg:h-9 text-black placeholder:text-neutral-300 placeholder:font-light focus:bg-white focus:placeholder:text-neutral-400 focus:outline-none focus:border-none peer transition-all duration-200 text-xs"
                type="search"
                placeholder="Search for games"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 peer-focus:text-black peer:transition-all peer:duration-200 fa-sm"
            />
        </>
    )
}
