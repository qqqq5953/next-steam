import game from '@/source/game_example.json'
import screenshot from '@/source/screenshot.json'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import Link from 'next/link'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Games({ searchParams }: Props) {
    const { id } = searchParams
    console.log('id', id)

    // https://api.rawg.io/api/games/${id}
    // https://api.rawg.io/api/games/{game_pk}/screenshots

    // const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`)
    // const data = await res.json()
    // console.log('ratings', data.ratings)
    // console.log('ratings_count', data.ratings_count)
    // const res = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`)
    // const data = await res.json()
    // console.log('data', data)

    const breadcrumbs = [
        { name: 'HOME', path: '/' },
        { name: 'GAMES', path: '/' }
    ]

    const ratingTitle = game.ratings.sort((a, b) => b.count - a.count)[0].title
    const ratingTotalScore = game.ratings.reduce((acc, cur) => acc + cur.count, 0)

    const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
    const uniqueIcons = getUniqueIcons(icons)

    return (
        <div className="space-y-4 max-w-lg mx-auto lg:max-w-none">
            <Image
                src={game.background_image}
                alt={game.name}
                width={400}
                height={200}
                priority={true}
                className="rounded absolute top-0 inset-x-0 -z-10 object-cover opacity-[0.22] w-full h-72 lg:h-[500px]"
                style={{
                    maskImage:
                        'linear-gradient(to bottom, #000000,#50509d 80%, transparent)',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, #000000,#50509d 80%, transparent)'
                }}
            />

            <div className='pt-8 lg:grid lg:grid-cols-12'>
                <div className="flex flex-col items-center justify-center gap-4 lg:gap-6 lg:justify-start lg:items-start lg:col-span-7 border">
                    <header></header>
                    {/* breadcrumb */}
                    <ul className="flex items-center gap-1.5 text-sm tracking-widest text-neutral-300/60 flex-wrap">
                        {breadcrumbs.map((item, index) => {
                            return (
                                <li key={index} className="after:content-['/']">
                                    <Link href={item.path} className="mr-1.5 hover:text-white">
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        })}
                        <li>{game.name.toUpperCase()}</li>
                    </ul>

                    {/* date & platform*/}
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className=" space-x-4">
                            {/* date */}
                            <span className="px-2.5 py-px bg-white text-black text-sm rounded-md ">
                                {game.released}
                            </span>

                            {/* platform */}
                            <span className="space-x-2">
                                {uniqueIcons.map((item, index) => {
                                    return (
                                        <span key={index}>
                                            <FontAwesomeIcon
                                                icon={platformMap[item as keyof typeof platformMap]}
                                            ></FontAwesomeIcon>
                                        </span>
                                    )
                                })}
                            </span>
                        </div>

                        <div className="text-sm font-extralight tracking-widest">
                            AVERAGE PLAYTIME: {game.playtime} HOURS
                        </div>
                    </div>

                    {/* game name */}
                    <h2 className="text-3xl font-semibold lg:text-7xl">{game.name}</h2>

                    {/* video and screenshots */}
                    <div className='flex gap-4 snap-x py-6 snap-mandatory overflow-scroll lg:hidden'>
                        <div className='aspect-video rounded-lg overflow-hidden shadow-md shadow-neutral-600/50 snap-center'>
                            <video controls autoPlay muted loop src="https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie_max.mp4"></video>
                        </div>
                        <div className='flex gap-4'>
                            {screenshot.results.map((item, index) => {
                                return <div className='aspect-video shadow-md shadow-neutral-700/90 snap-center' key={item.id}>
                                    <Image
                                        src={item.image}
                                        alt={game.name}
                                        width={100}
                                        height={50}
                                        priority={index === 0}
                                        className="rounded object-cover w-full"
                                    />
                                </div>
                            })}
                        </div>
                    </div>

                    {/* rating */}
                    <section>
                        <div className='text-2xl font-semibold capitalize'>{ratingTitle}</div>
                        <div className='text-sm font-thin text-neutral-400/80'>{ratingTotalScore} RATINGS</div>
                    </section>

                    {/* about */}
                    <section>
                        <h3>about</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab recusandae id nostrum natus ipsam sequi dolorum libero a earum placeat.</p>
                    </section>

                    <div className='grid grid-cols-2 self-start border w-full'>
                        <div className='col-span-1 bg-blue-400'>Platforms</div>
                        <div className='col-span-1 bg-red-400'>Metascore</div>
                        <div className='col-span-1 bg-blue-400'>Genre</div>
                        <div className='col-span-1 bg-red-400'>Release date</div>
                        <div className='col-span-1 bg-blue-400'>Developer</div>
                        <div className='col-span-1 bg-red-400'>Publisher</div>
                        <div className='col-span-1 bg-blue-400'>Age rating</div>
                        <div className='col-span-2 bg-green-400'>Other games in the series
                        </div>
                        <div className='col-span-2 bg-green-400'>DLC's and editions
                        </div>
                        <div className='col-span-2 bg-green-400'>Tags
                        </div>
                        <div className='col-span-2 bg-green-400'>Website
                        </div>
                        <div className='col-span-2 bg-green-400'>System requirements
                        </div>
                        <div className='col-span-2 bg-green-400'>Where to buy (store)
                        </div>
                    </div>
                </div>

                <div className='hidden lg:block lg:col-span-5 border'>
                    <div className='flex gap-4 py-6 lg:py-12 overflow-auto lg:flex-col'>
                        <div className='aspect-video rounded-lg overflow-hidden'>
                            <video controls autoPlay muted loop src="https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie_max.mp4"></video>
                        </div>
                        <div className='flex lg:grid lg:grid-cols-2 gap-4'>
                            {screenshot.results.map(item => {
                                return <div className='lg:col-span-1 aspect-video shadow-md shadow-neutral-700/90'>
                                    <Image
                                        src={item.image}
                                        alt={game.name}
                                        width={100}
                                        height={50}
                                        priority={true}
                                        className="rounded object-cover w-full"
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <section className=''>
                <div>similar games</div>
                <div>creators</div>
            </section>
        </div>
    )
}
