'use client'
import useMediaQuery from '@/hooks/useMediaQuery'

type Props = {
  url: string
  mediaQuery: string
}

export default function Video({ url, mediaQuery }: Props) {
  const isShow = useMediaQuery(mediaQuery)

  return (
    <>
      {isShow && (
        <div className="rounded-lg overflow-hidden shadow-md shadow-neutral-600/50 max-h-[150px] max-w-[260px] snap-center lg:snap-align-none lg:aspect-video lg:max-h-none lg:max-w-none">
          <video controls autoPlay muted loop src={url}></video>
        </div>
      )}
    </>
  )
}
