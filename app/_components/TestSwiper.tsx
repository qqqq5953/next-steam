'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import useMediaQuery from '@/hooks/useMediaQuery'

type Props = {
  screenShots: ShortScreenshot[]
  showItem: "" | "video" | "screenshot"
}

export default function Swiper({ screenShots, showItem }: Props) {
  const divRef = useRef<HTMLDivElement>(null)
  const [barWidth, setBarWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const isWeb = useMediaQuery('(min-width: 1024px)')

  const toSlide = (index: number) => {
    if (!isWeb) return
    setCurrentIndex(index)
  }

  useEffect(() => {
    setBarWidth(divRef.current!.offsetWidth)
  }, [])

  // Function to go to the next slide
  const nextSlide = () => {
    if (isWeb) return
    setCurrentIndex((prevIndex) =>
      prevIndex === screenShots.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenShots.length - 1 : prevIndex - 1
    )
  }

  return (
    <div
      className={`relative overflow-hidden h-full ${showItem === 'screenshot' ? 'z-50 opacity-100' : 'z-10 opacity-0'
        }`}
      ref={divRef}
      onClick={() => nextSlide()}
    >
      <div className="relative h-full">
        {screenShots.map((item, index) => (
          <Image
            key={index}
            priority={index === 0}
            src={item.image}
            fill
            sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
            alt={`Slide ${index}`}
            className={`transition-opacity duration-300 ease-in-out object-cover object-top ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          ></Image>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex items-center justify-center gap-2 px-2 z-10">
        {screenShots.map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-col-reverse group/slide h-full pb-4"
              style={{ width: `${barWidth / screenShots.length}px` }}
              onMouseEnter={() => toSlide(index)}
            >
              <span
                className={`w-full h-2 rounded-full ${index === currentIndex ? 'bg-white/80' : 'bg-zinc-400/80'
                  }`}
              ></span>
            </div>
          )
        })}
      </div>
      {/* <button
                className="absolute inset-y-0 left-0 flex items-center justify-center w-12 bg-gray-600 bg-opacity-50 hover:bg-opacity-75 text-white transition duration-300"
                onClick={prevSlide}
            >
                Prev
            </button>
            <button
                className="absolute inset-y-0 right-0 flex items-center justify-center w-12 bg-gray-600 bg-opacity-50 hover:bg-opacity-75 text-white transition duration-300"
                onClick={nextSlide}
            >
                Next
            </button> */}
    </div>
  )
}
