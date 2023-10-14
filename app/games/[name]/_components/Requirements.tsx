'use client'

import { GameSingle } from '@/types'
import { useState } from 'react'
import GridColumnContainer from './GridColumnContainer'

type Props = {
  game: GameSingle
}

export default function Requirements({ game }: Props) {
  const [isReadMore, setIsReadMore] = useState(false)

  return <GridColumnContainer
    spanNum="2"
  >
    <>
      <div className="space-y-2.5" style={
        isReadMore
          ? {}
          : {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
            maskImage: "linear-gradient(#000 -webkit-calc(100% - 30px),transparent",
            WebkitMaskImage: "linear-gradient(#000 -webkit-calc(100% - 30px),transparent",
          }
      }>
        {game.platforms.map((item) => {
          return (
            <div key={item.platform.id} className="space-y-4">
              <div className="font-light text-lg lg:text-2xl lg:font-medium">
                System requirements for {item.platform.name}
              </div>
              {item.requirements.minimum && (
                <div className="font-extralight">
                  {item.requirements.minimum}
                </div>
              )}
              {item.requirements.recommended && (
                <div className="font-extralight">
                  {item.requirements.recommended}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <button className='mt-4 text-sm transition-colors duration-300 hover:text-white/50' onClick={() => setIsReadMore((r) => !r)} >{isReadMore ? 'Read less...' : 'Read more...'}</button>
    </>
  </GridColumnContainer>
}
