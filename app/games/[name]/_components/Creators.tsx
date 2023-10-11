import developers from '@/source/game_developers.json'
import ImageContainer from '@/components/global/ImageContainer'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/base-ui/Card'
import { GameSingle } from '@/types'
import Link from 'next/link'

type Props = {
    game: GameSingle
    id: string
}

export default function Creators({ game, id }: Props) {
    // https://rawg.io/api/games/grand-theft-auto-v/suggested?page=1&page_size=4&key=c542e67aec3a4340908f9de9e86038af
    return <section className='space-y-6'>
        <h3 className='text-center text-xl lg:text-2xl'>{game.name} created by</h3>
        <div className='flex gap-4 pb-4 -mx-4 snap-x overflow-auto border'>
            {developers.results.map(developer => {
                return <div key={developer.id} className='w-1/2 shrink-0'>
                    <Card className="overflow-hidden bg-neutral-800/90 border-transparent  hover:border-neutral-700 transition-all duration-300">
                        <div className='relative aspect-video'>
                            <ImageContainer
                                game={developer}
                            />
                        </div>

                        <CardHeader>
                            <CardTitle>
                                <Link href={`/games/${developer.slug}/?id=${developer.id}`}>{developer.name}</Link>
                            </CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>

                        <CardContent>
                            <ul className="divide-y divide-neutral-700 text-xs">
                                <li className="flex items-center py-3">
                                    known for
                                </li>
                                {developer.games.map(game => {
                                    return <li key={game.id} className="flex justify-between items-center py-3">
                                        <div>{game.name}</div>
                                        <div className="text-right">{game.added}</div>
                                    </li>
                                }
                                )
                                }
                            </ul>
                        </CardContent>

                    </Card>
                </div>
            })}
        </div>
        <div className='text-center'>
            <button className="rounded px-2 py-3.5 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover-text-black transition-colors duration-300 w-full lg:w-1/5 max-w-xs">load more</button>
        </div>
    </section>
}
