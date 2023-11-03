import dynamic from 'next/dynamic'


const Screenshot = dynamic(() => import('@/app/games/[name]/[details]/_views/Screenshot'))
const Suggestions = dynamic(() => import('@/app/games/[name]/[details]/_views/Suggestions'))
const Achievements = dynamic(() => import('@/app/games/[name]/[details]/_views/Achievements'))
const Reddit = dynamic(() => import('@/app/games/[name]/[details]/_views/Reddit'))
const Youtube = dynamic(() => import('@/app/games/[name]/[details]/_views/Youtube'))
const Team = dynamic(() => import('@/app/games/[name]/[details]/_views/Team'))

type Props = {
  params: { details: string, name: string }
}

export default function Details({ params: { details, name } }: Props) {

  return (
    <>
      {details === 'screenshots' && <Screenshot name={name} />}
      {details === 'suggestions' && <Suggestions name={name} />}
      {details === 'achievements' && <Achievements name={name} />}
      {details === 'reddit' && <Reddit />}
      {details === 'youtube' && <Youtube />}
      {details === 'team' && <Team name={name} />}
    </>
  )
}
