import { CreatorCardType } from '@/types'
import CreatorCard from '../_components/CreatorCard'

export default async function Creators() {
  const res = await fetch(
    `https://api.rawg.io/api/creators?key=${process.env.RAWG_API_KEY}`
  )
  const creators = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Creators</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        {creators.results.map((creator: CreatorCardType) => {
          return <CreatorCard
            data={creator}
            hasFollowBtn
            bgAspectRatio={7 / 6}
            avatarClass="w-32 h-32"
          />
        })}
      </section>
    </div>
  )
}