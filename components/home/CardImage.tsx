'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Video from '@/components/global/Video'
import useFetch from '@/hooks/useFetch'

type Props = {
  game: Game
}

type Trailer = {
  data: string | undefined
  error: string | undefined
}

let hasLoad = false
export default function CardImage({ game }: Props) {
  // const { data, error } = useFetch({

  // let promise = new Promise((resolve, reject) => {
  //     resolve({ data: 123, error: null })
  // })

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

  const [videoSrc, setVideoSrc] = useState(null)
  const videoRef = useRef<HTMLDivElement>(null)
  let abortController = new AbortController()

  async function handleMouseEnter() {
    console.log('handleMouseEnter')
    if (videoSrc) {
      playVideo()
    } else {
      loadVideo()
    }
  }

  async function handleMouseLeve() {
    console.log('handleMouseLeve')
    if (videoSrc) {
      stopVideo()
    } else {
      abortFetching()
    }
  }

  async function loadVideo() {
    console.log('loadVideo')

    try {
      abortController = new AbortController()
      const signal = abortController.signal

      //   const response = await fetchTailer()
      //   const videoUrl = response.data
      //   setVideoSrc(videoUrl)

      const response = await fetch(
        `https://api.rawg.io/api/games/${game.id}/movies?key=04fd56d2bfc34a73964433ff1117f1d1`,
        { signal: signal }
      )
      const data = await response.json()
      console.log('videoUrl', data)

      if (data.results.length === 0) {
        // show swiper image
      } else {
        setVideoSrc(data.results[0].data['480'])
      }

      //   setVideoSrc(videoUrl)
      //   const response = await fetch(
      //     'https://jsonplaceholder.typicode.com/posts',
      //     { signal: signal }
      //   )
      //   const videoUrl = await response.json()
      //   console.log('videoUrl', videoUrl)

      //   setVideoSrc(videoUrl[0].title)
    } catch (error) {
      console.error('Error loading video:', error)
    }
  }

  function stopVideo() {
    if (!videoRef.current?.firstChild || !videoSrc) return

    console.log('stopVideo')
    videoRef.current?.firstChild?.pause()
  }

  function playVideo() {
    console.log('playVideo')
    videoRef.current?.firstChild
      ?.play()
      .then(() => console.log('Video is playing'))
  }

  function abortFetching() {
    console.log('中離')
    abortController.abort()
    abortController = new AbortController()
  }

  return (
    <div
      ref={videoRef}
      className="relative aspect-video group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeve}
    >
      {/* {videoSrc} */}

      {videoSrc && (
        <video
          controls
          muted
          width="100%"
          height="100%"
          className="absolute inset-x-0 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300"
          onCanPlay={playVideo}
        >
          <source src={videoSrc} type="video/mp4" />
          <p>
            Your browser doesn't support HTML5 video. Here is a
            <a href={videoSrc}>link to the video</a> instead.
          </p>
        </video>
      )}

      <Image
        src={game.background_image}
        fill
        sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
        alt={game.name}
        className="object-cover object-top"
      ></Image>
    </div>
  )
}
