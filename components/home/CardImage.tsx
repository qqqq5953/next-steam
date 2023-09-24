'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Video from '@/components/global/Video'
import useFetch from '@/hooks/useFetch'

type Props = {
    game: Game
}

type Trailer = {
    data: string | undefined,
    error: string | undefined
}

let hasLoad = false
export default function CardImage({ game }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const [trailer, setTrailer] = useState<Trailer>({ data: undefined, error: undefined })

    // const { data, error } = useFetch({

    // let promise = new Promise((resolve, reject) => {
    //     resolve({ data: 123, error: null })
    // })
    const videoRef = useRef<HTMLDivElement>(null)

    function fetchTailer() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: 'https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie480.mp4', error: null })
            }, 2000)
        })
    }

    async function loadTrailer() {
        console.log('loadTrailer');

        if (!hasLoad) {
            console.log('has not load yet');
            const data = await fetchTailer()
            // const data = await useFetch('https://jsonplaceholder.typicode.com/posts/1')
            console.log('data', data);


            setTrailer(data)

            setTimeout(() => {
                console.log('videoRef', videoRef.current?.firstChild);
                videoRef.current?.firstChild.pause().then(() => {
                    console.log('play');
                }).catch((err) => {
                    console.log('err', err);

                })
            }, 100);

            hasLoad = true // 用物件紀錄哪個影片已經load 過了
        } else {
            console.log('has load');
        }
    }

    function abortLoading() {
        console.log('abortLoading');
        console.log('videoRef', videoRef.current?.firstChild);
        // videoRef.current?.firstChild?.pause().then(() => {
        //     console.log('pause');
        // }).catch((err) => {
        //     console.log('err', err);

        // })
    }

    // if (isLoading) {
    //     loadTrailer()
    // } else {
    //     abortLoading()
    // }

    useEffect(() => {
        if (isLoading) {
            loadTrailer()
        } else {
            abortLoading()
        }

    }, [isLoading])


    return (
        <div ref={videoRef} className="relative aspect-video group" onMouseLeave={() => setIsLoading(false)} onMouseEnter={() => setIsLoading(true)}
        >
            {/* poster={game.background_image} */}
            {trailer?.data && <video controls muted width="100%" height="100%" poster={game.background_image} className="absolute inset-x-0">
                <source src={trailer?.data}
                    type="video/mp4" />
                <p>
                    Your browser doesn't support HTML5 video. Here is a
                    <a href={trailer?.data}>link to the video</a> instead.
                </p>
            </video>}
            {/* {trailer?.data && <video autoPlay controls muted width="100%" height="100%" className="absolute inset-x-0 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                <source src={trailer?.data} type="video/mp4" />
                <p>
                    Your browser doesn't support HTML5 video. Here is a
                    <a href={trailer?.data}>link to the video</a> instead.
                </p>
            </video>} */}

            {/* <Image
                src={game.background_image}
                fill
                sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
                alt={game.name}
                className="object-cover object-top"
            ></Image> */}

            {/* <div className='absolute inset-x-0 bottom-0 bg-red-300'>{isLoading ? 'loading' : 'not loading'}

            </div> */}


        </div>
    )
}
