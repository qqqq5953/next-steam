'use client'

import { Input } from '@/components/base-ui/Input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/base-ui/Sheet'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faRightToBracket,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'
import Link from 'next/link'

const menuItems = [
  {
    path: '/reviews',
    name: 'Reviews'
  },
  {
    path: '/collections',
    name: 'Collections'
  },
  {
    path: '/platforms',
    name: 'Platforms'
  },
  {
    path: '/stores',
    name: 'Stores'
  },
  {
    path: '/genres',
    name: 'Genres'
  },
  {
    path: '/creators',
    name: 'Creators'
  },
  {
    path: '/tags',
    name: 'Tags'
  },
  {
    path: '/developers',
    name: 'Developers'
  }
]

export default function Navbar() {
  const [search, setSearch] = useState('')

  // fetch(
  //   `https://api.rawg.io/api/games?page=1&search=grand&key=04fd56d2bfc34a73964433ff1117f1d1`
  // )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log('res', res)
  //   })

  // fetch(
  //   `https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af`
  // )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log('res', res)
  //   })

  return (
    <header>
      <nav className="flex justify-between items-center gap-x-6">
        <h1 className="font-black tracking-[0.2em] text-lg">STEAM</h1>
        <div className="relative grow">
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
        </div>

        <Sheet>
          <SheetTrigger>Menu</SheetTrigger>
          <SheetContent className="bg-white rounded-2xl text-black">
            <SheetHeader className="relative">
              <SheetTitle className="text-2xl text-left">Home</SheetTitle>
              <SheetTitle className="text-2xl text-left">Browse</SheetTitle>
              <div className="absolute right-0 top-9 space-y-3">
                <button className="grid place-items-center space-y-1">
                  <div className="grid place-items-center w-12 h-12 bg-black rounded-full">
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className="text-white fa-xl"
                    />
                  </div>
                  <div className="text-sm text-gray-500 font-light">Log in</div>
                </button>
                <button className="grid place-items-center space-y-1">
                  <div className="grid place-items-center w-12 h-12 bg-black rounded-full">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-white fa-x"
                    />
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    Sign up
                  </div>
                </button>
              </div>
              <div>
                <ul className="text-left text-lg font-light">
                  {menuItems.map((item) => {
                    return (
                      <li key={item.name} className="py-1">
                        <Link href={item.path}>{item.name}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
