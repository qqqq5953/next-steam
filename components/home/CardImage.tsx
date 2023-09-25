'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import Video from '@/components/global/Video'
import Swiper from '@/components/global/Swiper'

type Props = {
    game: Game,
    index: number
}

export default function CardImage({ game, index }: Props) {
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

    const [videoSrc, setVideoSrc] = useState<string | null>(null)
    const [isHover, setIsHover] = useState<boolean | null>(null)
    const [showSlide, setShowSlide] = useState(false)

    return (
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
            <Image
                src={game.background_image}
                priority={index === 0}
                fill
                sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
                alt={game.name}
                className={`object-cover object-top ${showSlide ? 'invisible' : 'visible'}`}
            ></Image>

            <Swiper screenShots={game.short_screenshots.slice(1)} showSlide={showSlide} />


        </div>
    )
}
