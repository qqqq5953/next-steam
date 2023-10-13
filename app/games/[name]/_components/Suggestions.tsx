import suggestions from '@/source/game_suggestions.json'
import GameCard from '@/app/_components/GameCard'
import { GameSingle } from '@/types'
import Link from 'next/link'

type Props = {
  game: GameSingle
  id: string
}

export default function Suggestions({ game, id }: Props) {
  // https://rawg.io/api/games/grand-theft-auto-v/suggested?page=1&page_size=4&key=c542e67aec3a4340908f9de9e86038af
  return <section className='space-y-6'>
    <h3 className='text-center text-xl lg:text-4xl underline underline-offset-4 decoration-neutral-500 decoration-1'>
      <Link href={`/games/${game.slug}/suggestions`}>Games like {game.name}</Link>
    </h3>
    <div className='grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-6'>
      {suggestions.results.map(suggestion => {
        return <div key={suggestion.id} >
          <GameCard
            game={suggestion}
          />
        </div>
      })}
    </div>
    <div className='text-center'>
      <button className="rounded px-2 py-3.5 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover-text-black transition-colors duration-300 w-full lg:w-1/5 max-w-xs">load more</button>
    </div>
  </section>
}
