import { AllGenres } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Genres() {
  const res = await fetch(
    `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
  )
  const genres = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Genres</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        {genres.results.map((genre: AllGenres) => {
          return <ItemCard key={genre.id} data={genre} />
        })}
      </section>
    </div>
  )
}
