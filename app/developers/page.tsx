import { AllDeveloper } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Developers() {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch developers: ${res.status}`);
    }

    const developers = await res.json();
    const results = Array.isArray(developers.results) ? developers.results : [];

    return (
      <div className='space-y-4'>
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Developers</h2>
        <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
          {results.map((developer: AllDeveloper) => {
            return <ItemCard key={developer.id} data={developer} />
          })}
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching developers:', error);
    return (
      <section className="space-y-4">
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Developers</h2>
        <p className="text-red-500">Failed to load developers data. Please try again later.</p>
      </section>
    );
  }
}
