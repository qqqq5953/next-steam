import type { Metadata } from 'next'
import Sidebar from '@/app/_components/Sidebar'
import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'

export const metadata: Metadata = {
  title: 'Next Steam',
  description: 'The biggest Video Game Database'
}

type Props = {
  children: React.ReactNode
  params: { name: string; details: string }
}

export default async function GameLayout({
  children,
  params: { name, details }
}: Props) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${name}?key=${process.env.RAWG_API_KEY}`
  )
  const game = await res.json()

  const breadcrumbs = [
    { name: 'HOME', path: '/' },
    { name: 'GAMES', path: '/' }
  ]

  const navLists = [
    { name: 'About', slug: '' },
    {
      name: 'Screenshots',
      slug: 'screenshots'
    },
    {
      name: 'Games like',
      slug: 'suggestions'
    },
    {
      name: 'Achievements',
      slug: 'achievements'
    },
    {
      name: 'Posts',
      slug: 'reddit'
    },
    {
      name: 'Videos',
      slug: 'youtube'
    },
    {
      name: 'Development team',
      slug: 'team'
    }
  ]

  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  return (
    <div className="grid grid-cols-1">
      <header className="flex flex-col items-center justify-center gap-2.5 lg:gap-6 lg:justify-start lg:items-start">
        {/* breadcrumb */}
        <ul className="flex items-center justify-center gap-1.5 text-xs tracking-widest text-neutral-400/60 flex-wrap font-light">
          {breadcrumbs.map((item, index) => {
            return (
              <li key={index} className="after:content-['/']">
                <Link href={item.path} className="mr-1.5 hover:text-white">
                  {item.name}
                </Link>
              </li>
            )
          })}
          <li>{game.name.toUpperCase()}</li>
        </ul>

        {/* platform */}
        <div>
          <span className="space-x-2">
            {uniqueIcons.map((item, index) => {
              return (
                <span key={index}>
                  <FontAwesomeIcon
                    icon={platformMap[item as keyof typeof platformMap]}
                  ></FontAwesomeIcon>
                </span>
              )
            })}
          </span>
        </div>

        {/* game name */}
        <div className="text-2xl font-semibold lg:text-7xl leading-7">
          <h2>{game.name}</h2>
          <div className="text-center lg:text-start">achievements</div>
        </div>
      </header>

      <nav className="overflow-auto py-3.5">
        <ul className="flex gap-4">
          {navLists.map((nav) => {
            return (
              <li key={nav.name} className="shrink-0 space-x-1.5">
                {nav.slug === details ? (
                  <span className="font-medium cursor-default">{nav.name}</span>
                ) : (
                  <Link
                    href={`/games/${game.slug}/${nav.slug}`}
                    className="text-neutral-400/60 font-light hover:text-slate-100 transition-color ease-in-out duration-300"
                  >
                    {nav.name}
                  </Link>
                )}
                <span className="text-neutral-300/30">65</span>
              </li>
            )
          })}
        </ul>
      </nav>
      {children}
    </div>
  )
}
