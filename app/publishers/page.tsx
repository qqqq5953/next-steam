import { AllDeveloper } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Publishers() {
  const res = await fetch(
    `https://api.rawg.io/api/publishers?key=${process.env.RAWG_API_KEY}`
  )
  const publishers = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Publishers</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        {publishers.results.map((publisher: AllDeveloper) => {
          return <ItemCard key={publisher.id} data={publisher} />
        })}
      </section>
    </div>
  )
}
