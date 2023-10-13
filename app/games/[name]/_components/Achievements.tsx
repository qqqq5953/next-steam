import achievements from '@/source/game_achievements.json'
import Link from 'next/link'
import ImageContainer from '@/components/global/ImageContainer'
import { GameSingle } from '@/types'

type Props = {
  game: GameSingle
  id: string
}

export default function Achievement({ game, id }: Props) {
  // https://api.rawg.io/api/games/${id}/achievements?page_size=5&key=04fd56d2bfc34a73964433ff1117f1d1
  return (
    <section className="space-y-6">
      <div className='flex justify-between items-center'>
        <h3 className="mr-2 font-semibold text-2xl lg:text-left">
          {game.name} created by
        </h3>
        <Link href={`/games/${game.slug}/achievements`} className='shrink-0 underline text-neutral-500 text-xs font-light'>{achievements.count} achievements</Link>
      </div>
      <div className="grid grid-cols-1 gap-4 snap-x overflow-auto lg:grid-cols-3">
        {achievements.results.map((achievement) => {
          return (
            <div key={achievement.id} className="flex gap-4 py-4 border-b border-neutral-700">
              <div className='relative shrink-0 w-12 h-12 rounded-lg overflow-hidden'>
                <ImageContainer game={achievement} className='' />
              </div>
              <div className='space-y-px'>
                <div className='text-xs font-light'>{achievement.percent}%</div>
                <div className='text-sm font-semibold'>{achievement.name}</div>
                <div className='text-xs text-neutral-500 font-light'>{achievement.description}</div>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
