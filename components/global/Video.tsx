// 'use client'

import useFetch from '@/hooks/useFetch'
import { RefObject } from 'react'

type Props = {
    playVideo: () => void,
    videoSrc: string
    videoRef: RefObject<HTMLVideoElement>
}

export default function Video({ playVideo, videoSrc, videoRef }: Props) {

    return (
        <video
            controls
            muted
            width="100%"
            height="100%"
            className="absolute inset-x-0 z-50 opacity-0 group-hover/video:opacity-100 transition-all duration-300"
            onCanPlay={playVideo}
            ref={videoRef}
        >
            <source src={videoSrc} type="video/mp4" />
            <p>
                Your browser doesn't support HTML5 video. Here is a
                <a href={videoSrc}>link to the video</a> instead.
            </p>
        </video>
    )
}
