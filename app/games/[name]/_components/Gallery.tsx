// import movies from '@/source/game_trailer.json'
// import screenshots from '@/source/screenshot.json'
import { GameSingle } from '@/types'
import Screenshots from './Screenshots'
import Video from './Video'
import getGallery from '@/lib/getGallery'

type Props = {
  game: GameSingle
  className?: string
  mediaQuery: string
}

export default async function Gallery({
  game,
  className,
  mediaQuery
}: Props) {
  const data = await getGallery({ id: game.id })
  if (!data) return null
  const { movies, screenshots } = data

  return (
    <div className={className}>
      <Video url={movies?.results[0]?.data['480']} mediaQuery={mediaQuery} />
      <Screenshots
        name={game.name}
        screenshots={screenshots.results}
        mediaQuery={mediaQuery}
      />
    </div>
  )
}
