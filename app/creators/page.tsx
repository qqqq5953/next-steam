import { CreatorCardType } from '@/types'
import CreatorCard from '../_components/CreatorCard'
import { getCreators } from '@/lib/rawg/getCreators'

export default async function Creators() {
  const creators = await getCreators()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Creators</h2>
      <section className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4'>
        {creators.results.map((creator: CreatorCardType) => {
          return <CreatorCard
            key={creator.id}
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