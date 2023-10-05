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

type Props = {
  game: Game
  index: number
}

export default function GameCard({ game, index }: Props) {
  const [isHover, setIsHover] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSlide, setShowSlide] = useState(false)

  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  return (
    <Card className="overflow-hidden bg-neutral-800/90 border-transparent  hover:border-neutral-700 transition-all duration-300">
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
          index={index}
          className={showSlide ? 'invisible' : 'visible'}
        />

        <Swiper
          screenShots={game.short_screenshots.slice(1)}
          showSlide={showSlide}
        />
      </div>

      <CardHeader>
        <CardTitle>
          <Link href={`/games/${game.slug}/?id=${game.id}`}>{game.name}</Link>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="divide-y divide-neutral-700 text-xs">
          <li className="flex items-center py-3">
            {uniqueIcons.map((item, index) => {
              return <span key={index} className='mr-2'>
                <FontAwesomeIcon icon={platformMap[item as keyof typeof platformMap]}></FontAwesomeIcon>
              </span>
            })}
          </li>
          <li className="flex justify-between items-center py-3">
            <span>Release date:</span>
            <div className="text-right">
              {game.released}
            </div>
          </li>
          <li className="flex justify-between items-center py-3">
            <span>Genres:</span>
            <div className="text-right ">
              {game.genres.map((genre) => {
                return (
                  <span
                    key={genre.id}
                    className="after:content-[','] last-of-type:after:content-['']"
                  >
                    &nbsp;{genre.name}
                  </span>
                )
              })}
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
