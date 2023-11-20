import ImageContainer from '@/components/global/ImageContainer'
import { Card, CardContent } from '@/components/base-ui/Card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/base-ui/Avatar'
import { CreatorCardType } from '@/types'

import Link from 'next/link'

type Props = {
  data: CreatorCardType,
  hasFollowBtn?: boolean,
  bgAspectRatio: number,
  avatarClass: string
}

export default function CreatorCard({ data, hasFollowBtn, bgAspectRatio, avatarClass }: Props) {
  return (
    <Card className="overflow-hidden bg-neutral-800/90 border-transparent relative">
      <div className="relative" style={{ aspectRatio: bgAspectRatio }}>
        <ImageContainer
          url={data.image_background} name={data.name}
          className="opacity-50"
          style={{
            maskImage:
              'linear-gradient(to bottom, #000000,#50509d 20%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, #000000,#50509d 20%, transparent)'
          }}
        />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
          {data?.image && (
            <Avatar className={`${avatarClass} mb-2`}>
              <AvatarImage
                src={data.image}
                className="object-cover"
              />
              <AvatarFallback className={`${avatarClass}  rounded-full bg-neutral-100/20`}>
                DEV
              </AvatarFallback>
            </Avatar>
          )}

          <Link
            className="mb-2 underline underline-offset-4 decoration-0 decoration-neutral-400 font-bold  text-lg lg:text-xl"
            href={`/creators/${data.slug}`}
          >
            {data.name}
          </Link>

          {data?.positions && <div className="flex text-xs mb-2">
            {data.positions.map((position) => {
              return <span key={position.id} className='separate-with-comma'>{position.name}</span>
            })}
          </div>}

          {hasFollowBtn && <button className='px-4 py-2 bg-white/20 rounded hover:bg-white hover:text-black transition-color ease-in-out duration-300'>Follow</button>}
        </div>
      </div>

      <CardContent>
        <div className="flex justify-between items-center py-2 border-b border-neutral-600/50">
          <div className="font-semibold">Known for</div>
          <div className="text-right text-neutral-500">
            {data.games_count}
          </div>
        </div>
        <ul className="text-sm">
          {data.games.slice(0, 3).map((game) => {
            return (
              <li
                key={game.id}
                className="flex justify-between items-center first-of-type:pt-2 pt-1 pb-1"
              >
                <Link
                  className="max-w-[75%] truncate underline underline-offset-[3px] decoration-0 decoration-neutral-500"
                  href={`/games/${game.slug}`}
                >
                  {game.name}
                </Link>
                <div className="text-right text-neutral-500">
                  {game.added}
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
