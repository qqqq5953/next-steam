// import developers from '@/source/game_developers.json'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Game, Developer } from '@/types'

type Props = {
  name: string
}

export default async function Team({ name }: Props) {
  const res = await fetch(`https://api.rawg.io/api/games/${name}/development-team?page_size=5&key=${process.env.RAWG_API_KEY}`)

  const developers = await res.json()
  console.log('developers', developers);

  return (
    <section className='space-y-8'>
      {developers.results.map((developer: Developer) => {
        return <div key={developer.id}>
          <div className='flex flex-col lg:flex-row lg:justify-between'>
            <div className='lg:w-2/5'>
              {developer.positions.map(position => {
                return <span key={position.id} className="separate-with-comma font-light capitalize text-sm lg:text-base">{position.name}</span>
              })}
            </div>
            <div className='lg:w-3/5'>
              <div className='flex items-center justify-between lg:flex-col lg:items-start'>
                <h3>
                  <Link href={`/creators/${developer.name}`} className='link-style-underline hover:text-neutral-500 text-xl lg:text-2xl'>{developer.name}</Link>
                </h3>
                <span className='text-xs text-neutral-500 font-light lg:text-sm'>{developer.games_count - developer.games.length} more games</span>
              </div>
              <ul className='space-y-4 py-4 divide divide-y-[0.5px] divide-neutral-700'>
                {developer.games.map(game => {
                  return <DeveloperList game={game} key={game.id} />
                })}
              </ul>
            </div>
          </div>
        </div>
      })}
    </section>
  )
}

function DeveloperList({ game }: { game: Game }) {
  const icons = game.platforms.map(item => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  return <li className='flex gap-4 pt-4 first-of-type:pt-0'>
    <div className='relative w-20 h-24 rounded-lg overflow-hidden shrink-0 hover:brightness-50 transition-all duration-300 ease-in-out'>
      <Image src={game.background_image} width="100" height="200" alt={game.name} className='object-cover h-full' />
    </div>
    <div>
      <span className="space-x-2">
        {uniqueIcons.map((item, index) => {
          return (
            <span key={index}>
              <FontAwesomeIcon
                icon={platformMap[item as unknown as keyof typeof platformMap]}
              ></FontAwesomeIcon>
            </span>
          )
        })}
      </span>
      <h4 className='font-medium text-lg'>
        <Link href={`/games/${game.slug}`} className='text-xl link-style'>{game.name}</Link>
      </h4>
    </div>
  </li>
}