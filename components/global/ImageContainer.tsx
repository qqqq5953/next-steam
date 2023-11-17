import Image from 'next/image'

type Props = {
  url: string | null
  name: string
  className?: string
  style?: object
}

export default function ImageContainer({ url, name, className, style }: Props) {
  if (!url) {
    return (
      <div className="absolute grid place-items-center w-full h-full">
        {name}
      </div>
    )
  }

  return (
    <Image
      src={url}
      fill
      sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
      // placeholder="blur"
      // blurDataURL={game.blurDataURL}
      alt={name}
      className={`object-cover object-top absolute ${className}`}
      style={style}
    ></Image>
  )
}
