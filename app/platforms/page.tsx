import { AllPlatform } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Platforms() {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/platforms`
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch platforms: ${res.status}`);
    }

    const platforms = await res.json()
    const results = Array.isArray(platforms.results) ? platforms.results : [];

    return (
      <div className='space-y-4'>
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Platforms</h2>
        <section className='columns-1 gap-4 sm:gap-6 sm:columns-2 md:columns-3  3xl:columns-4 space-y-4 sm:space-y-6'>
          {results.map((platform: AllPlatform) => {
            return <ItemCard key={platform.id} data={platform} />
          })}
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return (
      <section className="space-y-4">
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Platforms</h2>
        <p className="text-red-500">Failed to load platforms data. Please try again later.</p>
      </section>
    );
  }
}
