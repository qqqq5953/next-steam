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
        <div className="shrink-0 rounded-lg overflow-hidden shadow-md shadow-neutral-600/50 w-[264px] aspect-video snap-center lg:snap-align-none lg:w-auto">
          <video controls autoPlay muted loop src={url}></video>
        </div>
      )}
    </>
  )
}
