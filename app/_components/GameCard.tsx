'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'

import { Game, Suggestion } from '@/types'
import useMediaQuery from '@/hooks/useMediaQuery'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/base-ui/Card'

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/base-ui/Sheet'

// import Swiper from '@/app/_components/Swiper'
import ImageContainer from '@/components/global/ImageContainer'
import Video from '@/app/_components/Video'
const Swiper = dynamic(() => import('@/app/_components/Swiper'), { ssr: false })
const VideoLoader = dynamic(() => import('@/app/_components/VideoLoader'), { ssr: false })

type Props = {
  game: Game | Suggestion
  displayMode?: string | string[]
  showDescription?: boolean
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

export default function GameCard({ game, displayMode, showDescription = false }: Props) {
  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons) as (keyof typeof platformMap)[]

  const [isActivate, setIsActivate] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showItem, setShowItem] = useState<"" | "video" | "screenshot">("")
  const [isFull, setIsFull] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isWeb = useMediaQuery('(min-width: 1024px)')

  const loadTrailer = useCallback(async () => {
    console.log('loadTrailer')

    try {
      // enable re-fetching
      abortController = new AbortController()

      setIsLoading(true)

      const response = await fetch(
        `/api/games/movies?gameId=${game.id}`,
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
  }, [game.id])

  const handleHoverResult = useCallback((trailer: Trailer[]) => {
    if (trailer.length === 0) {
      setShowItem('screenshot')
    } else {
      setShowItem('video')
      setIsFull(true)
    }

    hasLoadMap.set(game.id, trailer[0]?.data?.['480'])
  }, [game.id])

  const handleMouseEnter = useCallback(async () => {
    console.log('handleMouseEnter')

    if (hasLoadMap.has(game.id)) {
      if (hasLoadMap.get(game.id)) {
        setShowItem('video')
      } else {
        setShowItem('screenshot')
      }
    } else {
      const trailer = await loadTrailer()
      if (!trailer) return
      handleHoverResult(trailer)
    }
  }, [game.id, loadTrailer, handleHoverResult])

  const handleMouseLeave = useCallback(async () => {
    console.log('handleMouseLeve')

    if (hasLoadMap.get(game.id)) {
      stopTrailer()
    } else if (hasLoadMap.has(game.id) && !hasLoadMap.get(game.id)) {
      setShowItem('')
    } else {
      abortFetching()
    }
  }, [game.id])

  useEffect(() => {
    if (isActivate === true) {
      handleMouseEnter()
    } else if (isActivate === false) {
      handleMouseLeave()
    }
  }, [isActivate, game.id, handleHoverResult, handleMouseEnter, handleMouseLeave, loadTrailer])

  function stopTrailer() {
    if (!videoRef.current) return

    console.log('stopTrailer')
    videoRef.current?.pause()
  }

  function playTrailer() {
    abortController = new AbortController()
    console.log('playTrailer')
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

  function playFullVideo() {
    stopTrailer()
    setIsActivate(false)
  }

  return (
    <>
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

          <Sheet>
            <SheetTrigger className={`absolute right-2 bottom-2 bg-black/70 px-2 py-1 rounded text-xs border border-transparent hover:border-neutral-500 transition ease-in-out duration-300 ${showItem === 'video' && isActivate ? 'opacity-100 z-40' : 'opacity-0 z-30'}`}>
              <div onClick={playFullVideo}>
                <FontAwesomeIcon icon={faYoutube} className='fa-lg' />
                <span className='ml-2'>Play full video</span>
              </div>
            </SheetTrigger>
            {isFull && <SheetContent className="bg-neutral-900 z-[60]" side="middle">
              <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full px-4'>
                <video controls autoPlay muted src={hasLoadMap.get(game.id)} onLoad={playTrailer} className='w-full mx-auto'></video>
              </div>
            </SheetContent>}
          </Sheet>

          {isLoading ? <VideoLoader /> :
            <>
              {hasLoadMap.get(game.id) && isActivate && <Video showItem={showItem} id={game.id} videoRef={videoRef} hasLoadMap={hasLoadMap} playTrailer={playTrailer} playFullVideo={playFullVideo} />}
            </>
          }

          <ImageContainer
            url={game.background_image}
            name={game.name}
            className={`transition-opacity duration-500 ease-in-out ${isActivate && !isLoading ? 'opacity-0 z-10' : 'opacity-100 z-30'}`}
          />

          {game.short_screenshots && <Swiper
            screenShots={game.short_screenshots.slice(1)}
            showItem={showItem}
          />}
        </div>

        <CardHeader className={`pb-0 ${displayMode !== 'film' && 'px-4'}`}>
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

            {displayMode === 'film' && <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 w-full text-sm py-4 font-light">
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
                        className="separate-with-comma underline underline-offset-2 decoration-neutral-500 inline-block"
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

        {displayMode !== 'film' && <CardContent className={`${displayMode !== 'film' && 'px-4'}`}>
          <ul className="divide-y divide-neutral-700 text-xs">
            <li className="flex justify-between items-center py-2.5">
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
                      className="separate-with-comma link-style-underline inline-block"
                    >
                      {genre.name}
                    </span>
                  )
                })}
              </div>
            </li>
          </ul>
          {showDescription && ("short_description" in game) && <p className='text-sm font-light lg:hidden'>
            {game.short_description}
          </p>
          }
        </CardContent>}
      </Card>
    </>
  )
}