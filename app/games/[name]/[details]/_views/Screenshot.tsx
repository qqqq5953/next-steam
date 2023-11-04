// import screenshots from '@/source/screenshot.json'
// import movies from '@/source/game_trailer.json'
import getGallery from '@/lib/getGallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4">
        {screenshots.results.map((item, index) => {
          return (
            <div
              className="aspect-video shadow-md shadow-neutral-700/90 snap-center lg:snap-align-none"
              key={item.id}
            >
              <Image
                src={item.image}
                alt={name}
                width={160}
                height={90}
                priority={index === 0}
                className="rounded-lg object-cover w-full"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
