import { AllDeveloper } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Publishers() {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/publishers`
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch publishers: ${res.status}`);
    }

    const publishers = await res.json()
    const results = Array.isArray(publishers.results) ? publishers.results : [];

    return (
      <div className='space-y-4'>
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Publishers</h2>
        <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
          {results.map((publisher: AllDeveloper) => {
            return <ItemCard key={publisher.id} data={publisher} />
          })}
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching publishers:', error);
    return (
      <section className="space-y-4">
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Publishers</h2>
        <p className="text-red-500">Failed to load publishers data. Please try again later.</p>
      </section>
    );
  }
}
