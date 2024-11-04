// import developers from '@/source/game_developers.json'
import { Card } from '@/components/base-ui/Card'
import CreatorCard from '@/app/_components/CreatorCard'
import { CreatorCardType } from '@/types'
import { GameSingle } from '@/types'
import Link from 'next/link'

type Props = {
  game: GameSingle
}

export default async function Creators({ game }: Props) {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${game.id}/development-team?page_size=5&key=${process.env.RAWG_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch developers: ${res.status}`);
    }

    const developers = await res.json();
    const results = Array.isArray(developers.results) ? developers.results : [];

    return (
      <section className="space-y-6">
        <div className='flex justify-between items-baseline'>
          <h3 className="mr-2 font-semibold text-2xl lg:text-left">
            {game.name} created by
          </h3>
          <Link href={`/games/${game.slug}/team`} className='shrink-0 underline underline-offset-2 decoration-neutral-500 text-neutral-500 text-xs hover:text-white transition-colors duration-300 font-light lg:text-sm'>
            {developers.count || 0} creators
          </Link>
        </div>
        <div className="flex gap-4 pb-4 snap-x overflow-auto">
          {results.map((developer: CreatorCardType) => (
            <div key={developer.id} className="shrink-0 w-3/4 max-w-[264px] lg:w-[33%] lg:max-w-[304px]">
              <CreatorCard
                data={developer}
                bgAspectRatio={7 / 6}
                avatarClass="w-24 h-24"
              />
            </div>
          ))}
          <div className="shrink-0 w-3/4 lg:w-[30%]">
            <Card className="overflow-hidden bg-black border-transparent h-full">
              <div className="flex p-12 h-full">
                <Link href={`/games/${game.slug}/team`} className="rounded px-2 py-3.5 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover:text-black transition-colors duration-300 w-full m-auto">More</Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching creators:', error);
    return (
      <section className="space-y-6">
        <h3 className="mr-2 font-semibold text-2xl lg:text-left">
          {game.name} created by
        </h3>
        <p className="text-red-500">Failed to load creators data. Please try again later.</p>
      </section>
    );
  }
}
