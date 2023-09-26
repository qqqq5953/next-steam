'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/base-ui/Card'

import Image from 'next/image'
import Video from '@/components/global/Video'
import Swiper from '@/components/global/Swiper'
import ImageContainer from '@/components/global/ImageContainer'

type Props = {
  game: Game
  index: number
}

export default function GameCard({ game, index }: Props) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [isHover, setIsHover] = useState<boolean | null>(null)
  const [showSlide, setShowSlide] = useState(false)

  return (
    <Card className="overflow-hidden bg-neutral-800/90 border-transparent  hover:border-neutral-700 transition-all duration-300">
      <div
        className="relative aspect-video group/video"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Video
          id={game.id}
          videoSrc={videoSrc}
          isHover={isHover}
          showSlide={showSlide}
          setShowSlide={setShowSlide}
          setVideoSrc={setVideoSrc}
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
        <CardTitle>{game.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="divide-y divide-neutral-700 text-xs">
          <li className="flex justify-between items-center py-3">
            <span>Release date:</span>
            <div className="text-right">
              {game.platforms.map((item) => {
                return <span key={item.platform.id}>{item.platform.name}</span>
              })}
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

function fetchTailer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: 'https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie480.mp4',
        error: null
      })
    }, 2000)
  })
}
