import { AllDeveloper } from '@/types'
import ItemCard from '../_components/ItemCard'

export default async function Developers() {
  const res = await fetch(
    `https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`
  )
  const developers = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Developers</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        {developers.results.map((developer: AllDeveloper) => {
          return <ItemCard key={developer.id} data={developer} />
        })}
      </section>
    </div>
  )
}
