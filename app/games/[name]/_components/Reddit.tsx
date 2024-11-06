import reddit from '@/source/game_reddit.json'
import Link from 'next/link'
import Icon from "@/components/global/Icon"
import { GameSingle } from '@/types'

type Props = {
  game: GameSingle
}

export default function Reddit({ game }: Props) {
  // const res = await fetch(`https://api.rawg.io/api/games/${name}/reddit?page_size=6&key=${process.env.RAWG_API_KEY}`)
  // const data = await res.json()
  // console.log('reddit', data)

  return (
    <section className="space-y-6">
      <div className='flex justify-between items-baseline '>
        <h3 className="mr-2 font-semibold text-2xl lg:text-left">
          {game.name} posts
        </h3>
        <Link href={`/games/${game.slug}/achievements`} className='shrink-0 underline underline-offset-2 decoration-neutral-500 text-neutral-500 text-xs hover:text-white transition-colors duration-300 font-light lg:text-sm'>{reddit.count} posts</Link>
      </div>
      <div className="grid grid-cols-1 snap-x gap-4 lg:grid-cols-3 lg:gap-6 lg:border-b lg:border-neutral-700 relative">
        {reddit.results.map((post) => {
          return (
            <div key={post.id} className='space-y-1.5 pb-4 border-b border-neutral-700 lg:border-none'>
              <div className='text-sm font-semibold'>{post.name}</div>
              <div className='text-xs text-neutral-500 font-light'>{post.created}</div>
            </div>
          )
        })}
        <Link href={`/games/${game.slug}/reddit`} className="block rounded px-2 py-3.5 bg-neutral-800/90 text-white text-sm text-center font-light hover:bg-slate-50 hover:text-black transition-colors duration-300 w-full lg:hidden">View All</Link>

        <Link href={`/games/${game.slug}/reddit`} className="hidden absolute -bottom-2 right-20 px-2 rounded bg-[#181818] text-white text-center text-xs font-light tracking-wider hover:text-neutral-500 transition-colors duration-300 lg:flex lg:items-center">
          <span>VIEW ALL</span>
          <Icon name="chevron-right" size={16} className='inline-block' />
        </Link>
      </div>
    </section>
  )
}
