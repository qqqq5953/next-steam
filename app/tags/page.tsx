import { AllTags } from '@/types'
import { Card } from '@/components/base-ui/Card'
import ImageContainer from '@/components/global/ImageContainer'
import Link from 'next/link'
import ItemCard from '../_components/ItemCard'


export default async function Tags() {
  const res = await fetch(
    `https://api.rawg.io/api/tags?key=${process.env.RAWG_API_KEY}`
  )
  const tags = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Tags</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        {tags.results.map((tag: AllTags) => {
          return <ItemCard data={tag} />
        })}
      </section>
    </div>
  )
}
