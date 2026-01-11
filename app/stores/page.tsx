import { AllStore } from '@/types'
import ItemCard from '../_components/ItemCard'

export const dynamic = 'force-dynamic'

export default async function Stores() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stores`)

    if (!res.ok) {
      throw new Error(`Failed to fetch stores: ${res.status}`);
    }

    const stores = await res.json()
    const results = Array.isArray(stores.results) ? stores.results : [];

    return (
      <div className='space-y-4'>
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Stores</h2>
        <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
          {results.map((store: AllStore) => {
            return <ItemCard key={store.id} data={store} />
          })}
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching stores:', error);
    return (
      <section className="space-y-4">
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Stores</h2>
        <p className="text-red-500">Failed to load stores data. Please try again later.</p>
      </section>
    );
  }
}
