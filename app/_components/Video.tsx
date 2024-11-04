import { MutableRefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

type Props = {
  controls?: boolean
  showItem: "" | "video" | "screenshot"
  id: number
  videoRef: MutableRefObject<HTMLVideoElement | null>
  hasLoadMap: Map<any, any>
  playTrailer: () => void
  playFullVideo: () => void
}

export default function Video({
  controls = false,
  showItem,
  id,
  videoRef,
  hasLoadMap,
  playTrailer,
}:
  Props) {
  return (
    <video
      controls={controls}
      muted
      loop
      className={`absolute inset-x-0 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${showItem === 'video' ? 'opacity-100 z-30' : 'opacity-0 z-auto'}`}
      onCanPlay={playTrailer}
      ref={videoRef}
    >
      <source src={hasLoadMap.get(id)} type="video/mp4" />
      <p>
        Your browser doesn&apos;t support HTML5 video. Here is a
        <a href={hasLoadMap.get(id)}>link to the video</a> instead.
      </p>
    </video>
  )
}
