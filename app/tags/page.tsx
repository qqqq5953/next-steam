import { AllTags } from '@/types'
import { Card } from '@/components/base-ui/Card'
import ImageContainer from '@/components/global/ImageContainer'
import Link from 'next/link'
import ItemCard from '../_components/ItemCard'


export default async function Tags() {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/tags?key=${process.env.RAWG_API_KEY}`
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch developers: ${res.status}`);
    }

    const tags = await res.json()
    const results = Array.isArray(tags.results) ? tags.results : [];

    return (
      <div className='space-y-4'>
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Tags</h2>
        <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
          {results.map((tag: AllTags) => {
            return <ItemCard key={tag.id} data={tag} />
          })}
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching tags:', error);
    return (
      <section className="space-y-4">
        <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Tags</h2>
        <p className="text-red-500">Failed to load tags data. Please try again later.</p>
      </section>
    );
  }
}
