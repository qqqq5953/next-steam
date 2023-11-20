import { AllPlatform } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Platforms() {
  const res = await fetch(
    `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`
  )
  const platforms = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Platforms</h2>
      <section className='columns-1 gap-4 sm:gap-6 sm:columns-2 md:columns-3  3xl:columns-4 space-y-4 sm:space-y-6'>
        {platforms.results.map((platform: AllPlatform) => {
          return <ItemCard data={platform} />
        })}
      </section>
    </div>
  )
}
