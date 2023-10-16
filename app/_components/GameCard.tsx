'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/base-ui/Card'

import Video from '@/components/global/Video'
import Swiper from '@/components/global/Swiper'
import ImageContainer from '@/components/global/ImageContainer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import Link from 'next/link'
import { Game } from '@/types'

type Props = {
  game: Game
  displayMode?: string | string[]
}

export default function GameCard({ game, displayMode }: Props) {
  const [isHover, setIsHover] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSlide, setShowSlide] = useState(false)

  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  return (
    <Card className={`overflow-hidden bg-neutral-800/90 border-transparent transition-all duration-300 ${displayMode !== 'film' && 'lg:hover:scale-105'}`}>
      <div
        className="relative aspect-video group/video"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Video
          id={game.id}
          isHover={isHover}
          isLoading={isLoading}
          setShowSlide={setShowSlide}
          setIsLoading={setIsLoading}
        />

        <ImageContainer
          game={game}
          className={showSlide ? 'invisible' : 'visible'}
        />

        <Swiper
          screenShots={game.short_screenshots.slice(1)}
          showSlide={showSlide}
        />
      </div>

      <CardHeader>
        <CardTitle>
          <div className="flex items-center py-3 text-sm">
            {uniqueIcons.map((item, index) => {
              return (
                <span key={index} className="mr-2">
                  <FontAwesomeIcon
                    icon={platformMap[item as keyof typeof platformMap]}
                  ></FontAwesomeIcon>
                </span>
              )
            })}
          </div>

          <Link href={`/games/${game.slug}`} className='hover:text-neutral-500 transition-colors duration-300'>{game.name}</Link>

          {displayMode === 'film' && <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 w-full text-sm pt-4 font-light">
            <li className="flex justify-between items-center">
              <span className='text-neutral-500 text-sm mr-2'>Metascore:</span>
              <span className="border rounded px-1.5 py-0.5 inline-block font-bold">{game.metacritic}</span>
            </li>
            <li>
              <span className='text-neutral-500 text-sm mr-2'>Release date:</span>
              <span>{game.released}</span>
            </li>
            <li>
              <span className='text-neutral-500 text-sm mr-2'>Genres:</span>
              <div className='inline-block'>
                {game.genres.map((genre) => {
                  return (
                    <span
                      key={genre.id}
                      className="ml-1.5 first-of-type:ml-0 after:content-[','] last-of-type:after:content-[''] underline underline-offset-2 decoration-neutral-500 inline-block"
                    >
                      {genre.name}
                    </span>
                  )
                })}
              </div>
            </li>
          </ul>}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      {displayMode !== 'film' && <CardContent>
        <ul className="divide-y divide-neutral-700 text-xs">
          <li className="flex justify-between items-center py-3">
            <span className='text-neutral-500 text-sm lg:text-xs'>Release date:</span>
            <div className="text-right">{game.released}</div>
          </li>
          <li className="flex justify-between items-center lg:items-start py-3 gap-2">
            <span className='text-neutral-500 text-sm lg:text-xs'>Genres:</span>
            <div className="text-right">
              {game.genres.map((genre) => {
                return (
                  <span
                    key={genre.id}
                    className="ml-1.5 first-of-type:ml-0 after:content-[','] last-of-type:after:content-[''] underline underline-offset-2 decoration-neutral-500 inline-block"
                  >
                    {genre.name}
                  </span>
                )
              })}
            </div>
          </li>
        </ul>
      </CardContent>}
    </Card>
  )
}
