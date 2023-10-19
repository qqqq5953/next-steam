'use client'

import { useEffect, useState, useRef } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/base-ui/Card'

import Video from '@/app/_components/TestVideo'
import Swiper from '@/app/_components/TestSwiper'
import ImageContainer from '@/app/_components/TestImageContainer'

// import Video from '@/components/global/Video'
// import Swiper from '@/components/global/Swiper'
// import ImageContainer from '@/components/global/ImageContainer'

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

const hasLoadMap = new Map()
let abortController = new AbortController()

export default function GameCard({ game, displayMode }: Props) {
  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  const [isActivate, setIsActivate] = useState<boolean | null>(null)
  const [showItem, setShowItem] = useState<"" | "video" | "screenshot">("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const isWeb = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    console.log('hasLoadMap', hasLoadMap);
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
      setShowItem('video')
    } else {
      abortFetching()
    }
  }

  function handleHoverResult(videos) {
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
    // if (isWeb) return
    setIsActivate(h => !h)
  }

  function enterMask() {
    // if (!isWeb) return
    setIsActivate(true)
  }
  function leaveMask() {
    // if (!isWeb) return
    setIsActivate(false)
  }

  return (
    <Card className={`overflow-hidden bg-neutral-800/90 border-transparent transition-all duration-300 ${displayMode !== 'film' && 'lg:hover:scale-105'}`}>
      <div
        className="relative aspect-video group/video"
      >
        {/* mask */}
        <div className="absolute w-full h-full z-50 flex items-end"
          onClick={handleClick}
        // onMouseEnter={enterMask}
        // onMouseLeave={leaveMask}
        >
          <div className={`grid place-content-center rounded-full h-10 w-10 pl-1 m-4 bg-black/70 ${isActivate ? 'opacity-0' : 'opacity-100'}`}>
            <FontAwesomeIcon icon={faPlay} className='text-white fa-lg' />
          </div>
        </div>

        {/* loading */}
        {isLoading ? <div className="bg-black/50 absolute inset-0 z-40 grid place-items-center">
          <Icon
            name="loader-2"
            useSuspense={false}
            size={36}
            className="animate-spin text-white/50"
          />
        </div>
          :
          <>
            {/* video */}
            {hasLoadMap.get(game.id) && (
              <div className="absolute inset-0 z-20">
                <video
                  muted
                  className={`absolute inset-x-0 z-20 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${showItem === 'video' ? 'opacity-100' : 'opacity-0'}`}
                  onCanPlay={playVideo}
                  ref={videoRef}
                >
                  <source src={hasLoadMap.get(game.id)} type="video/mp4" />
                  <p>
                    Your browser doesn't support HTML5 video. Here is a
                    <a href={hasLoadMap.get(game.id)}>link to the video</a> instead.
                  </p>
                </video>
              </div>
            )}

          </>
        }

        <ImageContainer
          game={game}
          className={`transition-opacity duration-500 ease-in-out ${isActivate && !isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
        <Swiper
          screenShots={game.short_screenshots.slice(1)}
          showItem={showItem}
        />
      </div>

      {/* <div
        className="relative aspect-video group/video"
      >
        <div className="absolute w-full h-full z-50 flex items-end"
          onClick={handleClick}
        >
          <div className={`grid place-content-center rounded-full h-10 w-10 pl-1 m-4 bg-black/70 ${isActivate ? 'opacity-0' : 'opacity-100'}`}>
            <Icon name="play" className='fill-white' /> {showItem}
          </div>
        </div>

        <Video
          id={game.id}
          isActivate={isActivate}
          setShowItem={setShowItem}
        />

        <ImageContainer
          game={game}
          className={showItem === 'screenshot' ? 'invisible' : 'visible'}
        />

        <Swiper
          screenShots={game.short_screenshots.slice(1)}
          showItem={showItem}
        />
      </div> */}

      {/* <div
        className="relative aspect-video group/video"
      >
        <div className='absolute top-0 w-full h-full z-50'
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        ></div>

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
      </div> */}
    </Card>
  )
}
