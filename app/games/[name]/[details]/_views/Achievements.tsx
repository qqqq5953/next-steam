import achievements from '@/source/game_achievements.json'
import ImageContainer from '@/components/global/ImageContainer'

type Props = {
  name: string
}

export default async function Achievements({ name }: Props) {
  // https://api.rawg.io/api/games/${name}/achievements?page_size=5&key=04fd56d2bfc34a73964433ff1117f1d1

  // const res = await fetch(`https://api.rawg.io/api/games/${name}/achievements?page_size=5&key=${process.env.RAWG_API_KEY}`)

  // const achievements = await res.json()
  // console.log('achievements', achievements);

  return (
    <section className="grid grid-cols-1 overflow-auto">
      {achievements.results.map((achievement) => {
        return (
          <div key={achievement.id} className="flex gap-4 py-4 border-b border-neutral-700">
            <div className='relative shrink-0 rounded-lg overflow-hidden w-12 h-12 lg:w-14 lg:h-14'>
              <ImageContainer game={achievement} className='' />
            </div>
            <div className='space-y-px'>
              <div className='text-xs font-light'>{achievement.percent}%</div>
              <div className='text-sm font-semibold'>{achievement.name}</div>
              <div className='text-xs text-neutral-500 font-light'>{achievement.description}</div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
