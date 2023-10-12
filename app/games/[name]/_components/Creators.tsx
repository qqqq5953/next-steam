import developers from '@/source/game_developers.json'
import ImageContainer from '@/components/global/ImageContainer'
import { Card, CardContent } from '@/components/base-ui/Card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/base-ui/Avatar'

import { GameSingle } from '@/types'
import Link from 'next/link'

type Props = {
  game: GameSingle
  id: string
}

export default function Creators({ game, id }: Props) {
  // https://rawg.io/api/games/grand-theft-auto-v/suggested?page=1&page_size=4&key=c542e67aec3a4340908f9de9e86038af
  return (
    <section className="space-y-6">
      <h3 className="text-center text-xl lg:text-2xl">
        {game.name} created by
      </h3>
      <div className="flex gap-4 pb-4 snap-x overflow-auto">
        {developers.results.map((developer) => {
          return (
            <div key={developer.id} className="w-3/4 shrink-0">
              <Card className="overflow-hidden bg-neutral-800/90 border-transparent  hover:border-neutral-700 transition-all duration-300">
                <div className="relative" style={{ aspectRatio: '7/6' }}>
                  <ImageContainer
                    game={developer}
                    className="opacity-50"
                    style={{
                      maskImage:
                        'linear-gradient(to bottom, #000000,#50509d 20%, transparent)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, #000000,#50509d 20%, transparent)'
                    }}
                  />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-2">
                    {developer?.image && (
                      <Avatar className="w-24 h-24">
                        <AvatarImage
                          src={developer.image}
                          className="object-cover"
                        />
                        <AvatarFallback className="w-24 h-24 rounded-full bg-neutral-100/20">
                          DEV
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <Link
                      className="underline underline-offset-[3px] decoration-0 decoration-neutral-500 font-bold"
                      href={`/games/${developer.slug}/?id=${developer.id}`}
                    >
                      {developer.name}
                    </Link>
                    <div className="flex text-xs">
                      {developer.positions.map((position) => {
                        return <span key={position.id}>{position.name}</span>
                      })}
                    </div>
                  </div>
                </div>

                <CardContent>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-600/50">
                    <div className="font-semibold">Known for</div>
                    <div className="text-right text-neutral-500">
                      {developer.games_count}
                    </div>
                  </div>
                  <ul className="text-sm">
                    {developer.games.map((game) => {
                      return (
                        <li
                          key={game.id}
                          className="flex justify-between items-center first-of-type:pt-2 pt-1 pb-1"
                        >
                          <Link
                            className="max-w-[75%] truncate underline underline-offset-[3px] decoration-0 decoration-neutral-500 font-bold"
                            href={`/games/${game.slug}/?id=${game.id}`}
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
            </div>
          )
        })}
      </div>
      <div className="text-center">
        <button className="rounded px-2 py-3.5 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover-text-black transition-colors duration-300 w-full lg:w-1/5 max-w-xs">
          load more
        </button>
      </div>
    </section>
  )
}
