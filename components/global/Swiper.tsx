'use client'

import { useState, useRef, useEffect } from 'react'

type Props = {
    game: Game,
    showSlide: boolean
}

export default function Swiper({ game, showSlide }: Props) {
    const divRef = useRef<HTMLDivElement>(null);
    const [barWidth, setBarWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const toSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        setBarWidth(divRef.current!.offsetWidth)
    }, [])

    // Function to go to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === game.short_screenshots.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? game.short_screenshots.length - 1 : prevIndex - 1
        );
    };


    return (
        <div className={`relative overflow-hidden h-full ${showSlide ? 'z-10' : '-z-10'}`} ref={divRef}>
            <div className="flex">
                {game.short_screenshots.map((item, index) => (
                    <img
                        key={index}
                        className={`absolute w-full flex-shrink-0 transition-all duration-500 ease-in-out ${index === currentIndex ? 'opacity-100 ' : 'opacity-0'
                            }`}
                        src={item.image}
                        alt={`Slide ${index}`}
                    />
                ))}
            </div>
            <div className='absolute h-full w-full flex items-center justify-center gap-2 px-2 z-10'>
                {game.short_screenshots.map((_, index) => {
                    return (
                        <div
                            key={index}
                            className='flex flex-col-reverse group/slide h-full pb-4'
                            style={{ width: `${barWidth / game.short_screenshots.length}px` }}
                            onMouseEnter={() => toSlide(index)}
                        >
                            <span className={`w-full h-2 rounded-full bg-zinc-400/80 group-hover/slide:bg-white/80`} ></span>
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
    );
}
