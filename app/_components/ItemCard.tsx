import { Card } from '@/components/base-ui/Card'
import ImageContainer from '@/components/global/ImageContainer'
import Link from 'next/link'

type Props = {
  data: {
    id: number;
    name: string;
    slug: string;
    year_start?: number;
    image_background: string;
    games_count: number;
    games: {
      id: number;
      name: string;
      slug: string;
      added: number;
    }[];
  },
}

export default function ItemCard({ data }: Props) {
  return <Card key={data.id} className={`overflow-hidden  border-transparent bg-neutral-800/90 relative ${data.year_start ? 'h-[300px]' : 'h-[280px]'}`}>
    <div className="relative h-2/3">
      <ImageContainer
        url={data.image_background} name={data.name}
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
          href={`/games/${data.slug}`}
        >
          {data.name}
        </Link>

        {data.year_start && <div className="flex text-xs">
          {data.year_start}
        </div>}

        <button className='my-4 px-4 py-2 bg-white/20 rounded hover:bg-white hover:text-black transition-color ease-in-out duration-300'>Follow</button>
      </div>

      <div className="flex justify-between items-center py-2 border-b border-neutral-600/50">
        <div className="font-semibold">Popular items</div>
        <div className="text-right text-neutral-500 text-sm">
          {data.games_count}
        </div>
      </div>

      <ul className="text-sm">
        {data.games.slice(0, 3).map((game) => {
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
}
