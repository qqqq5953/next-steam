import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import ImageContainer from '@/components/global/ImageContainer'
import { Youtube as YoutubeType } from '@/types'


type Props = {
  name: string
}

export default async function Youtube({ name }: Props) {
  const res = await fetch(`https://api.rawg.io/api/games/${name}/youtube?page_size=12&key=${process.env.RAWG_OFFICIAL_API_KEY}`)
  const youtube = await res.json()

  return (
    <section className="grid grid-cols-1 overflow-auto">
      {youtube.results.map((video: YoutubeType) => {
        return (
          <div key={video.id} className="flex gap-4 py-4 border-b border-neutral-700 group">
            <div className='relative shrink-0 rounded overflow-hidden aspect-video w-24'>
              <ImageContainer url={video.thumbnails.medium.url} name={video.name} />
              <div className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 grid place-content-center rounded-full h-8 w-8 pl-1 transition-opacity duration-500 ease-in-out bg-black/70`}>
                <FontAwesomeIcon icon={faPlay} className='text-white' />
              </div>
            </div>
            <div className='space-y-px'>
              <div className='text-sm font-semibold group-hover:opacity-50 transition-opacity duration-300'>{video.name}</div>
              <div className='text-xs text-neutral-500 font-light'>{video.created} . {video.channel_title}</div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
