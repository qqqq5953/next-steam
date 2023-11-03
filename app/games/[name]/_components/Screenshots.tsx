'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import Image from 'next/image'
import { GameSingle, ShortScreenshot } from '@/types'

type Props = {
  name: string
  screenshots: ShortScreenshot[]
  className?: string
  mediaQuery?: string
  alwaysShow?: boolean
}

export default function Screenshots({ name, className = "flex gap-4 lg:grid lg:grid-cols-2", screenshots, mediaQuery = "(min-width:360px)", alwaysShow = false }: Props) {
  const isShow = alwaysShow || useMediaQuery(mediaQuery)

  return (
    <>
      {isShow && (
        <div className={className}>
          {screenshots.map((item, index) => {
            return (
              <div
                className="aspect-video shadow-md shadow-neutral-700/90 snap-center lg:snap-align-none"
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt={name}
                  width={160}
                  height={90}
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
