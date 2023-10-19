import { MutableRefObject } from 'react'

type Props = {
  showItem: "" | "video" | "screenshot"
  id: number
  videoRef: MutableRefObject<HTMLVideoElement | null>
  hasLoadMap: Map<any, any>
  playVideo: () => void
}

export default function Video({
  showItem,
  id,
  videoRef,
  hasLoadMap,
  playVideo
}:
  Props) {
  return (
    <div className="absolute inset-0 z-20">
      <video
        muted
        className={`absolute inset-x-0 z-20 object-cover w-full h-full transition-opacity duration-500 ease-in-out ${showItem === 'video' ? 'opacity-100' : 'opacity-0'}`}
        onCanPlay={playVideo}
        ref={videoRef}
      >
        <source src={hasLoadMap.get(id)} type="video/mp4" />
        <p>
          Your browser doesn't support HTML5 video. Here is a
          <a href={hasLoadMap.get(id)}>link to the video</a> instead.
        </p>
      </video>
    </div>
  )
}
