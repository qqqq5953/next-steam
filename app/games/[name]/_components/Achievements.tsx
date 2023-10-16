import achievements from '@/source/game_achievements.json'
import Link from 'next/link'
import ImageContainer from '@/components/global/ImageContainer'
import Icon from "@/components/global/Icon"
import { GameSingle } from '@/types'

type Props = {
  game: GameSingle
}

export default function Achievement({ game }: Props) {
  // https://api.rawg.io/api/games/${game.id}/achievements?page_size=5&key=04fd56d2bfc34a73964433ff1117f1d1
  return (
    <section className="space-y-6">
      <div className='flex justify-between items-baseline'>
        <h3 className="mr-2 font-semibold text-2xl lg:text-left">
          {game.name} achievements
        </h3>
        <Link href={`/games/${game.slug}/achievements`} className='shrink-0 underline underline-offset-2 decoration-neutral-500 text-neutral-500 text-xs hover:text-white transition-colors duration-300 font-light lg:text-sm'>{achievements.count} achievements</Link>
      </div>
      <div className="grid grid-cols-1 snap-x overflow-auto lg:grid-cols-3 lg:gap-6">
        {achievements.results.map((achievement) => {
          return (
            <div key={achievement.id} className="flex gap-4 py-4 border-b border-neutral-700">
              <div className='relative shrink-0 rounded-lg overflow-hidden w-12 h-12  lg:w-14 lg:h-14'>
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
        <Link href={`/games/${game.slug}/achievements`} className="flex gap-4 py-2 lg:py-4 lg:border-b lg:border-neutral-700 group">
          <div className='grid place-content-center w-12 h-12 rounded-lg bg-neutral-800/90 text-neutral-500 group-hover:bg-slate-50 group-hover:text-black transition-colors duration-300 lg:w-14 lg:h-14'>
            <Icon name="more-horizontal" />
          </div>
          <div className='space-y-px group-hover:opacity-50 transition-opacity duration-300'>
            <div className='text-sm font-semibold'>View all achievement</div>
            <div className='text-xs text-neutral-500 font-light'>{achievements.count} items</div>
          </div>
        </Link>
      </div>

    </section>
  )
}
