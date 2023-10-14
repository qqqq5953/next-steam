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
}

export default function Creators({ game }: Props) {
  // https://api.rawg.io/api/games/{game.id}/development-team?page_size=5&key={process.env.RAWG_API_KEY}
  return (
    <section className="space-y-6">
      <div className='flex justify-between items-center'>
        <h3 className="mr-2 font-semibold text-2xl lg:text-left">
          {game.name} created by
        </h3>
        <Link href={`/games/${game.slug}/team`} className='shrink-0 underline text-neutral-500 text-xs font-light lg:text-sm'>{developers.count} creators</Link>
      </div>
      <div className="flex gap-4 pb-4 snap-x overflow-auto">
        {developers.results.map((developer) => {
          return (
            <div key={developer.id} className="shrink-0 w-3/4 max-w-[264px] lg:w-[33%] lg:max-w-[304px]">
              <Card className="overflow-hidden bg-neutral-800/90 border-transparent  hover:border-neutral-700 transition-all duration-300 h-full">
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
                      href={`/creators/${developer.slug}`}
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
            </div>
          )
        })}
        <div className="shrink-0 w-3/4 lg:w-[30%]">
          <Card className="overflow-hidden bg-black border-transparent h-full">
            <div className="flex p-12 h-full">
              <Link href={`/games/${game.slug}/team`} className="rounded px-2 py-3.5 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover:text-black transition-colors duration-300 w-full m-auto">More</Link>
            </div>
          </Card>
        </div>
      </div>

    </section>
  )
}
