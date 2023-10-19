import GameCard from '@/app/_components/GameCard'
import { Game } from '@/types'

type Props = {
  games: Game[]
  displayMode: string | string[]
}

export default function CardsSection({ games, displayMode }: Props) {
  return (
    <section
      className={
        displayMode === 'film'
          ? 'columns-1 space-y-8'
          : 'columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 3xl:columns-5 gap-4 sm:gap-6'
        // : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4'
      }
      style={{
        columnWidth: '100px'
      }}
    >
      {games.map((game) => {
        return (
          <div
            key={game.id}
            className={
              displayMode === 'film' ? 'max-w-2xl mx-auto' : 'mb-4 sm:mb-6'
            }
          >
            <GameCard game={game} displayMode={displayMode} />
          </div>
        )
      })}
    </section>
  )
}

function fetchTailer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: 'https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie480.mp4',
        error: null
      })
    }, 2000)
  })
}
