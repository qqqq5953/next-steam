import { Collection } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = Collection & {
  imageClassName?: string,
  titleClassName?: string,
}

export default function CollectionItem(props: Props) {
  return <li className='flex gap-4 first-of-type:pt-0'>
    <Link href={`/collections/${props.slug}`} className={cn('relative w-[36px] h-[47px] rounded-lg overflow-hidden shrink-0 hover:brightness-50 transition-all duration-300 ease-in-out', props.imageClassName)}>
      {props.game_background?.url ?
        <Image src={props.game_background.url} width="36" height="47" alt={props.name} className='object-cover h-full bg-neutral-700/50' /> :
        <div className='h-full bg-neutral-700/50'></div>
      }
    </Link>
    <div>
      <h4>
        <Link href={`/collections/${props.slug}`} className={cn("font-medium text-sm link-style", props.titleClassName)}>
          {props.name}
        </Link>
      </h4>
      <div className='text-xs text-neutral-500 font-light'>{props.games_count} games</div>
    </div>
  </li>
}
