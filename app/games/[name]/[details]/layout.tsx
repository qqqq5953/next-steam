import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/global/Icon'
import { Suspense } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import { GameSingle } from '@/types'

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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/games/details?name=${name}`
  )
  const game: GameSingle = await res.json()

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

  const pageTitleMap = {
    suggestions: `Games like ${game.name}`,
    team: `${game.name} created by`,
    youtube: `${game.name} videos`,
  }

  const pageTitle = pageTitleMap[details as keyof typeof pageTitleMap] || `${game.name} ${details}`

  return (
    <div className="grid grid-cols-1">
      <header className="flex flex-col items-center justify-center gap-2.5 lg:justify-start lg:items-start">
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
        <div className='lg:pt-4'>
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
        <h2 className='text-2xl font-semibold lg:text-7xl leading-7 text-center lg:text-start tracking-tight'>
          <span className='mr-3'>{pageTitle}</span>
          {details === "youtube" && <span className='inline-block text-base'>
            <span className='flex justify-center items-center gap-0.5 text-neutral-500 lg:items-end lg:px-4 lg:py-2'>
              <FontAwesomeIcon icon={faYoutube} className='text-xl lg:text-4xl' />
              <span className='tracking-tighter font-semibold lg:text-3xl'>YouTube</span>
            </span>
          </span>}
        </h2>
      </header>

      <section className='flex flex-col lg:flex-row-reverse max-w-[496px] -mx-4 lg:max-w-none lg:mx-0'>
        <nav className="overflow-auto py-3.5 lg:w-1/3 lg:pl-16 lg:pt-8">
          <ul className="flex gap-4 lg:flex-col">
            {navLists.map((nav) => {
              return (
                <li key={nav.name} className="shrink-0 space-x-1.5">
                  {nav.slug === details ? (
                    <span className="font-medium cursor-default">{nav.name}</span>
                  ) : (
                    <Link
                      href={`/games/${game.slug}/${nav.slug}`}
                      className="text-neutral-400/60 font-light hover:text-slate-100 transition-color ease-in-out duration-300 lg:underline lg:underline-offset-2 "
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
        <div className='lg:w-2/3 pt-4 px-2'>
          <Suspense fallback={<div className="text-center text-2xl">
            <Icon
              name="loader-2"
              useSuspense={false}
              size={72}
              strokeWidth={1}
              className="animate-spin text-white/50 inline"
            />
          </div>}>
            {children}
          </Suspense>
        </div>
      </section>
    </div>
  )
}
