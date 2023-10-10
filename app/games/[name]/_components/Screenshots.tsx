'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { GameSingle } from '@/types'

type Props = {
  game: GameSingle
  screenshots: any
  mediaQuery: string
}

export default function Screenshots({ game, screenshots, mediaQuery }: Props) {
  const isShow = useMediaQuery(mediaQuery)

  return (
    <>
      {isShow && (
        <div className="flex gap-4 lg:grid lg:grid-cols-2">
          {screenshots.results.map((item, index) => {
            return (
              <div
                className="aspect-video shadow-md shadow-neutral-700/90 snap-center lg:snap-align-none"
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={game.name}
                  width={100}
                  height={50}
                  priority={index === 0}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
