import GameCard from '@/app/_components/GameCard'

type Props = {
  games: Game[]
  displayMode: string | string[]
}

export default function CardsSection({ games, displayMode }: Props) {
  return (
    <section
      className={
        displayMode === 'film'
          ? 'space-y-8'
          : 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4'
      }
    >
      {games.map((game, index) => {
        return (
          <div
            key={game.id}
            className={displayMode === 'film' ? 'max-w-2xl mx-auto' : ''}
          >
            <GameCard game={game} index={index} />
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
