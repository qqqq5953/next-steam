import { GameSingle } from '@/types'
import Screenshots from './Screenshots'
import Video from './Video'
import trailer from '@/source/game_trailer.json'
import screenshots from '@/source/screenshot.json'

type Props = {
  game: GameSingle
  id: string
  className?: string
  mediaQuery: string
}

export default async function Gallery({
  game,
  id,
  className,
  mediaQuery
}: Props) {
  //   const res = await fetch(
  //     `https://api.rawg.io/api/games/${id}/movies?key=${process.env.RAWG_API_KEY}`
  //   )
  //   const trailer = await res.json()
  //   console.log('movies', trailer)

  // const res = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`)
  // const data = await res.json()
  // console.log('screenshots', data)

  return (
    <div className={className}>
      <Video url={trailer?.results[0]?.data['480']} mediaQuery={mediaQuery} />
      <Screenshots
        game={game}
        screenshots={screenshots}
        mediaQuery={mediaQuery}
      />
    </div>
  )
}
