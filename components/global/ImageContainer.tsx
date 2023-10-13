import { Game } from '@/types'
import Image from 'next/image'

type Props = {
  game: Game | any
  className?: string
  style?: object
}

export default function ImageContainer({ game, className, style }: Props) {
  if (!game.background_image && !game.image_background && !game.image) {
    return (
      <div className="absolute grid place-items-center w-full h-full">
        {game.name}
      </div>
    )
  }

  return (
    <Image
      src={game.background_image || game.image_background || game.image}
      fill
      sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
      // placeholder="blur"
      // blurDataURL={game.blurDataURL}
      alt={game.name}
      className={`object-cover object-top absolute ${className}`}
      style={style}
    ></Image>
  )
}
