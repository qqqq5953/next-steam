'use client'

import { useEffect, useState, useRef } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/base-ui/Card'

import Video from '@/app/_components/Video'
import Swiper from '@/app/_components/Swiper'
import ImageContainer from '@/components/global/ImageContainer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import Link from 'next/link'
import { Game } from '@/types'
import Icon from '@/components/global/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

type Props = {
  game: Game
  displayMode?: string | string[]
}

type Trailer = {
  id: number
  name: string
  preview: string
  data: {
    '480': string
    max: string
  }
}

const hasLoadMap = new Map()
let abortController = new AbortController()

export default function GameCard({ game, displayMode }: Props) {
  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons) as (keyof typeof platformMap)[]

  const [isActivate, setIsActivate] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showItem, setShowItem] = useState<"" | "video" | "screenshot">("")
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isWeb = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    if (isActivate === true) {
      handleMouseEnter()
    } else if (isActivate === false) {
      handleMouseLeave()
    }
  }, [isActivate])

  async function handleMouseEnter() {
    console.log('handleMouseEnter')

    if (hasLoadMap.has(game.id)) {
      if (hasLoadMap.get(game.id)) {
        setShowItem('video')
        playVideo()
      } else {
        setShowItem('screenshot')
      }
    } else {
      const videos = await loadVideo()
      if (!videos) return
      handleHoverResult(videos)
    }
  }

  async function handleMouseLeave() {
    console.log('handleMouseLeve')

    if (hasLoadMap.get(game.id)) {
      stopVideo()
    } else if (hasLoadMap.has(game.id) && !hasLoadMap.get(game.id)) {
      setShowItem('')
    } else {
      abortFetching()
    }
  }

  function handleHoverResult(videos: Trailer[]) {
    if (videos.length === 0) {
      setShowItem('screenshot')
    } else {
      setShowItem('video')
    }

    hasLoadMap.set(game.id, videos[0]?.data?.['480'])
  }

  async function loadVideo() {
    console.log('loadVideo')

    try {
      // enable re-fetching
      abortController = new AbortController()

      setIsLoading(true)

      const response = await fetch(
        `https://api.rawg.io/api/games/${game.id}/movies?key=04fd56d2bfc34a73964433ff1117f1d1`,
        { signal: abortController.signal }
      )
      const data = await response.json()
      console.log('videoUrl', data)

      return data.results
    } catch (error) {
      console.error('Error loading video:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function stopVideo() {
    if (!videoRef.current) return

    console.log('stopVideo')
    videoRef.current?.pause()
  }

  function playVideo() {
    abortController = new AbortController()
    console.log('playVideo')
    videoRef.current?.play().then(() => console.log('Video is playing'))
  }

  function abortFetching() {
    setIsLoading(false)

    console.log('中離')
    abortController.abort()
    abortController = new AbortController()
  }

  function handleClick() {
    if (isWeb) return
    setIsActivate(h => !h)
  }

  function enterMask() {
    if (!isWeb) return
    setIsActivate(true)
  }

  function leaveMask() {
    if (!isWeb) return
    setIsActivate(false)
  }

  return (
    <Card className={`overflow-hidden bg-neutral-800/90 border-transparent transition-all duration-500 ease-in-out ${displayMode !== 'film' && 'lg:hover:scale-105'}`}>
      <div
        className="relative aspect-video group/video"
        onMouseEnter={enterMask}
        onMouseLeave={leaveMask}
      >
        {/* mask z-index 40 是為了讓 swiper 到最上層*/}
        <div className={`absolute w-full h-full flex items-end ${isActivate ? 'z-40' : 'z-50'}`}
          onClick={handleClick}
        >
          <div className={`grid place-content-center rounded-full h-10 w-10 pl-1 m-4 bg-black/70 transition-opacity duration-500 ease-in-out ${isActivate ? 'opacity-0' : 'opacity-100'}`}>
            <FontAwesomeIcon icon={faPlay} className='text-white fa-lg' />
          </div>
        </div>

        {isLoading ? <Loading /> :
          <>
            {hasLoadMap.get(game.id) && <Video showItem={showItem} id={game.id} videoRef={videoRef} hasLoadMap={hasLoadMap} playVideo={playVideo} />}
          </>
        }

        <ImageContainer
          game={game}
          className={`transition-opacity duration-500 ease-in-out ${isActivate && !isLoading ? 'opacity-0' : 'opacity-100'}`}
        />

        {game.short_screenshots && <Swiper
          screenShots={game.short_screenshots.slice(1)}
          showItem={showItem}
        />}
      </div>

      <CardHeader>
        <CardTitle>
          <div className="flex items-center py-3 text-sm">
            {uniqueIcons.map((item, index) => {
              return (
                <span key={index} className="mr-2">
                  {platformMap[item] && <FontAwesomeIcon
                    icon={platformMap[item]}
                  ></FontAwesomeIcon>}
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

function Loading() {
  return <div className="bg-black/50 absolute inset-0 z-40 grid place-items-center">
    <Icon
      name="loader-2"
      useSuspense={false}
      size={108}
      strokeWidth={1}
      className="animate-spin text-white/50"
    />
  </div>
}