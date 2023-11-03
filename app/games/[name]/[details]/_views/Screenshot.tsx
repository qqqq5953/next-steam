// import screenshots from '@/source/screenshot.json'
// import movies from '@/source/game_trailer.json'
import Screenshots from '@/app/games/[name]/_components/Screenshots'
import getGallery from '@/lib/getGallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

type Props = {
  name: string
}

export default async function Screenshot({ name }: Props) {
  const data = await getGallery({ name })
  if (!data) return null
  const { movies, screenshots } = data

  return (
    <section>
      {movies?.results.length !== 0 && <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
        {movies.results.map(movie => {
          return <div className="relative rounded-lg overflow-hidden aspect-video cursor-pointer" key={movie.id}>
            <video muted loop src={movie.data['480']}></video>
            <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 grid place-content-center rounded-full h-10 w-10 pl-1 transition-opacity duration-500 ease-in-out`}>
              <FontAwesomeIcon icon={faPlay} className='text-white fa-2xl' />
            </div>
          </div>
        })}
      </div>}

      <Screenshots
        name={name}
        className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4"
        screenshots={screenshots.results}
        alwaysShow
      />
    </section>
  )
}
