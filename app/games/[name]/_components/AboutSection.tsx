'use client'

import { GameSingle } from '@/types'
import { useState } from 'react'

type Props = {
    game: GameSingle
}

export default function AboutSection({ game }: Props) {
    const [isReadMore, setIsReadMore] = useState(false)

    return (
        <section>
            <h3 className='text-xl pb-2'>About</h3>
            <div dangerouslySetInnerHTML={{ __html: game.description }} className='text-sm font-light' style={isReadMore ? {} : {
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "9",
            }} />
            <button className='bg-white rounded-sm text-black text-xs px-1.5 transition-colors  duration-300 hover:bg-white/50' onClick={() => setIsReadMore(r => !r)}>{isReadMore ? 'Read less' : 'Read more'}</button>
        </section>
    )
}
