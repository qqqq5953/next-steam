import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import { Game, SearchResult } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/utils'

type Props = {
  game: SearchResult | Game,
  imageClassName?: string,
  titleClassName?: string,
}

export default function GameItem({ game, imageClassName, titleClassName }: Props) {
  const icons = game.platforms?.map(item => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  return <li className='flex gap-4 first-of-type:pt-0'>
    <Link href={`/games/${game.slug}`} className={cn("relative w-20 h-24 rounded-lg overflow-hidden shrink-0 hover:brightness-50 transition-all duration-300 ease-in-out", imageClassName)}>
      {game?.background_image ?
        <Image src={game.background_image} width="100" height="200" alt={game.name} className='object-cover h-full bg-neutral-700/50' /> :
        <div className='h-full bg-neutral-700/50'></div>
      }
    </Link>
    <div>
      <span className="space-x-2">
        {uniqueIcons.map((item, index) => {
          const icon = platformMap[item as unknown as keyof typeof platformMap]
          return (
            <span key={index}>
              {icon && <FontAwesomeIcon
                icon={icon}
              ></FontAwesomeIcon>}
            </span>
          )
        })}
      </span>
      <h4>
        <Link href={`/games/${game.slug}`} className={cn("font-medium text-xl link-style", titleClassName)}>{game.name}</Link>
      </h4>
    </div>
  </li>
}
