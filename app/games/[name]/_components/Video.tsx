'use client'
import useMediaQuery from '@/hooks/useMediaQuery'

type Props = {
  url?: string
  mediaQuery: string
}

export default function Video({ url, mediaQuery }: Props) {
  const isShow = useMediaQuery(mediaQuery)

  return (
    <>
      {isShow ? (
        <div className="shrink-0 rounded-lg overflow-hidden shadow-md shadow-neutral-600/50 w-[264px] aspect-video snap-center lg:snap-align-none lg:w-full">
          <video controls autoPlay muted loop src={url}></video>
        </div>
      ) : (
        <div className="rounded-lg bg-neutral-600/30 w-[264px] lg:w-full aspect-video animate-pulse"></div>
      )}
    </>
  )
}
