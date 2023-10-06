import useFetch from '@/hooks/useFetch'
import { Dispatch, SetStateAction, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isHover: boolean | null
  isLoading: boolean
  setShowSlide: Dispatch<SetStateAction<boolean>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  id: number
}

type Video = {
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

export default function Video({
  isHover,
  isLoading,
  setShowSlide,
  setIsLoading,
  id
}:
  Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (isHover === true) {
      handleMouseEnter()
    } else if (isHover === false) {
      handleMouseLeve()
    }
  }, [isHover])

  async function handleMouseEnter() {
    console.log('handleMouseEnter')

    if (hasLoadMap.has(id)) {
      if (hasLoadMap.get(id)) {
        setShowSlide(false)
        playVideo()
      } else {
        setShowSlide(true)
      }
    } else {
      const videos = await loadVideo()
      if (!videos) return
      handleHoverResult(videos)
    }
  }

  async function handleMouseLeve() {
    console.log('handleMouseLeve')

    if (hasLoadMap.get(id)) {
      stopVideo()
    } else if (hasLoadMap.has(id) && !hasLoadMap.get(id)) {
      setShowSlide(false)
    } else {
      abortFetching()
    }
  }

  function handleHoverResult(videos: Video[]) {
    if (videos.length === 0) {
      setShowSlide(true)
      hasLoadMap.set(id, null)
    } else {
      hasLoadMap.set(id, videos[0].data['480'])
    }
  }

  function abortFetching() {
    setIsLoading(false)

    console.log('中離')
    abortController.abort()
    abortController = new AbortController()
  }

  async function loadVideo() {
    console.log('loadVideo')

    try {
      // enable re-fetching
      abortController = new AbortController()

      setIsLoading(true)

      const response = await fetch(
        `https://api.rawg.io/api/games/${id}/movies?key=${process.env.RAWG_API_KEY}`,
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

  function playVideo() {
    abortController = new AbortController()
    console.log('playVideo')
    videoRef.current?.play().then(() => console.log('Video is playing'))
  }

  function stopVideo() {
    if (!videoRef.current) return

    console.log('stopVideo')
    videoRef.current?.pause()
  }

  return (
    <>
      {isLoading ? (
        <div className="bg-black/50 absolute inset-0 z-50 grid place-items-center">
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="animate-spin text-4xl text-white/50"
          />
        </div>
      ) : (
        <>
          {hasLoadMap.get(id) && (
            <div className="absolute inset-0 z-50">
              <video
                muted
                width="100%"
                height="100%"
                className="absolute inset-x-0 z-50 opacity-0 group-hover/video:opacity-100 transition-all duration-500 ease-in-out"
                onCanPlay={playVideo}
                ref={videoRef}
              >
                <source src={hasLoadMap.get(id)} type="video/mp4" />
                <p>
                  Your browser doesn't support HTML5 video. Here is a
                  <a href={hasLoadMap.get(id)}>link to the video</a> instead.
                </p>
              </video>
              {isHover && (
                <button className="absolute bottom-0 right-0 text-white bg-black/50 z-50 px-1.5 py-1 m-2 rounded text-xs hover:border hover:border-neutral-400/60">
                  Play full video
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}
