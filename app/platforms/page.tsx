import { Platform } from '@/types'
import { Card } from '@/components/base-ui/Card'
import ImageContainer from '@/components/global/ImageContainer'
import Link from 'next/link'

export default async function Platforms() {
  const res = await fetch(
    `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`
  )
  const platforms = await res.json()

  return (
    <div className='space-y-4'>
      <h2 className='text-4xl text-center font-semibold lg:text-left lg:text-7xl'>Platforms</h2>
      <section className='columns-1 gap-4 sm:gap-6 sm:columns-2 md:columns-3  3xl:columns-4 space-y-4 sm:space-y-6'>
        {platforms.results.map((platform: Platform) => {
          return <Card key={platform.id} className={`overflow-hidden  border-transparent bg-neutral-800/90 relative ${platform.year_start ? 'h-[300px]' : 'h-[280px]'}`}>
            <div className="relative h-2/3">
              <ImageContainer
                url={platform.image_background} name={platform.name}
                className="opacity-50"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, #000000,#50509d 20%, transparent)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, #000000,#50509d 20%, transparent)'
                }}
              />
            </div>

            <div className='absolute inset-0 px-4 py-6'>
              <div className='grid place-items-center'>
                <Link
                  className="underline underline-offset-4 decoration-0 decoration-neutral-500 font-bold text-lg lg:text-xl"
                  href={`/games/${platform.slug}`}
                >
                  {platform.name}
                </Link>

                <div className="flex text-xs">
                  {platform.year_start}
                </div>

                <button className='my-4 px-4 py-2 bg-white/20 rounded hover:bg-white hover:text-black transition-color ease-in-out duration-300'>Follow</button>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-neutral-600/50">
                <div className="font-semibold">Popular items</div>
                <div className="text-right text-neutral-500 text-sm">
                  {platform.games_count}
                </div>
              </div>

              <ul className="text-sm">
                {platform.games.slice(0, 3).map((game) => {
                  return (
                    <li
                      key={game.id}
                      className="flex justify-between items-center first-of-type:pt-2 pt-1 pb-1"
                    >
                      <Link
                        className="max-w-[75%] truncate underline underline-offset-[3px] decoration-0 decoration-neutral-500"
                        href={`/games/${game.slug}`}
                      >
                        {game.name}
                      </Link>
                      <div className="text-right text-neutral-500">
                        {game.added}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Card>
        })}
      </section>
    </div>
  )
}
