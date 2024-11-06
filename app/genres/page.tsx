import { AllGenres } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Genres() {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/genres`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch genre: ${res.status}`);
    }

    const genres = await res.json()
    const results: AllGenres[] = Array.isArray(genres.results) ? genres.results : [];

    return (
      <div className='space-y-4'>
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Genres</h2>
        <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
          {results.map((genre) => {
            return <ItemCard key={genre.id} data={genre} />
          })}
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching genres:', error);
    return (
      <section className="space-y-4">
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Genres</h2>
        <p className="text-red-500">Failed to load genres data. Please try again later.</p>
      </section>
    );
  }
}
