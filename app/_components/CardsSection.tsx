// import games_all from '@/source/games_all.json'
// import { addBlurredDataURL } from '@/lib/getPlaceholder'
import GameCard from '@/app/_components/GameCard'
import { Game } from '@/types'
import { platformMap, orderMap } from '@/lib/dropdownOptions'

type Props = {
  order: string | undefined
  platform: string | undefined
  mode: string | undefined
}

export default async function CardsSection({ order, platform, mode }: Props) {
  const orderValue = orderMap[order as keyof typeof orderMap] || '-relevance'
  const platformValue = platformMap[platform as keyof typeof platformMap] || '1'
  const displayMode = mode || 'grid'

  const res = await fetch(
    `https://api.rawg.io/api/games?ordering=${orderValue}&parent_platforms=${platformValue}&page_size=12&key=${process.env.RAWG_API_KEY}`
  )

  if (!res.ok) throw new Error(`Failed to fetch data`)
  const data = await res.json()
  const games: Game[] = data.results
  // const games: Game[] = games_all.result
  // const gameWithBlurDataURL = await addBlurredDataURL(games)

  return (
    <section
      className={
        displayMode === 'film'
          ? 'columns-1 space-y-8'
          : 'columns-1 sm:columns-2 md:columns-3 2xl:columns-4 3xl:columns-5 gap-4 sm:gap-6'
      }
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
