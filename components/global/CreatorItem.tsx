import { Developer } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = Developer & {
  imageClassName?: string,
  titleClassName?: string,
}

export default function CreatorItem(props: Props) {

  return <li className='flex gap-4 first-of-type:pt-0'>
    <Link href={`/creators/${props.slug}`} className={cn('relative size-9 rounded-full overflow-hidden shrink-0 hover:brightness-50 transition-all duration-300 ease-in-out', props.imageClassName)}>
      {props.image ?
        <Image src={props.image} width="36" height="36" alt={props.name} className='object-cover h-full bg-neutral-700/50' /> :
        <div className='grid place-items-center w-9 h-9 rounded-full bg-neutral-700/50'>{props.name[0].toUpperCase()}</div>
      }
    </Link>
    <div>
      <h4>
        <Link href={`/creators/${props.slug}`} className={cn("font-medium text-sm link-style", props.titleClassName)}>
          {props.name}
        </Link>
      </h4>
      {props.positions.map(position => {
        return <div key={position.id} className='text-xs text-neutral-500 font-light'>{position.name}</div>
      })}
    </div>
  </li>
}
