import useFetch from '@/hooks/useFetch'
import { Dispatch, SetStateAction, useRef, useEffect } from 'react'

type Props = {
    videoSrc: string | null
    showSlide: boolean
    isHover: boolean | null
    setShowSlide: Dispatch<SetStateAction<boolean>>
    setVideoSrc: Dispatch<SetStateAction<string | null>>
    id: number
}

type Video = {
    id: number,
    name: string
    preview: string,
    data: {
        "480": string,
        "max": string
    }
}

const hasLoadMap = new Map()
let abortController = new AbortController()

export default function Video({ videoSrc, isHover, showSlide, setShowSlide, setVideoSrc, id }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (isHover === true) {
            handleMouseEnter()
        } else if (isHover === false) {
            handleMouseLeve()
        }

    }, [isHover])

    async function handleMouseEnter() {
        console.log('handleMouseEnter')
        if (videoSrc) {
            playVideo()
        } else if (hasLoadMap.has(id)) {
            setShowSlide(true)
        } else {
            const videos = await loadVideo()
            handleHoverResult(videos)
            hasLoadMap.set(id, true)
        }
    }

    async function handleMouseLeve() {
        console.log('handleMouseLeve')
        if (videoSrc) {
            stopVideo()
        } else if (showSlide) {
            setShowSlide(false)
        } else {
            abortFetching()
        }
    }

    function handleHoverResult(videos: Video[]) {
        if (videos.length === 0) {
            setShowSlide(true)
        } else {
            setVideoSrc(videos[0].data['480'])
        }
    }

    function abortFetching() {
        console.log('中離')
        abortController.abort()
        abortController = new AbortController()
    }

    async function loadVideo() {
        console.log('loadVideo')

        try {
            // enable re-fetching
            abortController = new AbortController()

            const response = await fetch(
                `https://api.rawg.io/api/games/${id}/movies?key=04fd56d2bfc34a73964433ff1117f1d1`,
                { signal: abortController.signal }
            )
            const data = await response.json()
            console.log('videoUrl', data)

            return data.results
        } catch (error) {
            console.error('Error loading video:', error)
        }
    }

    function playVideo() {
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
            {videoSrc && <video
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
            </video>}
        </>
    )
}
