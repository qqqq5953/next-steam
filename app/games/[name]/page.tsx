import game from '@/source/game_example.json'
import screenshot from '@/source/screenshot.json'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import Link from 'next/link'
import AboutSection from './_components/AboutSection'
import RatingSection from './_components/RatingSection'
import { AgeRatingPrefix, Platform } from '@/types'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Games({ searchParams }: Props) {
    const { id } = searchParams
    console.log('id', id)

    // https://api.rawg.io/api/games/${id}
    // https://api.rawg.io/api/games/{game_pk}/screenshots

    // const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`)
    // const game = await res.json()
    // console.log('ratings', game.ratings)
    // console.log('ratings_count', game.ratings_count)
    // const res = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`)
    // const data = await res.json()
    // console.log('data', data)

    const breadcrumbs = [
        { name: 'HOME', path: '/' },
        { name: 'GAMES', path: '/' }
    ]

    const ageRatingPrefix: AgeRatingPrefix = {
        "Everyone": "0+",
        "Everyone 10+": "10+",
        "Teen": "13+",
        "Mature": "17+",
        "Adults only": "18+",
    }

    const icons = game.platforms.map((item: Platform) => getBrandIcon(item.platform.name))
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
                <div className="lg:col-span-7 space-y-6">
                    <header className='flex flex-col items-center justify-center gap-4 lg:gap-6 lg:justify-start lg:items-start'>
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
                    </header>

                    {/* video and screenshots */}
                    <div className='flex gap-4 snap-x snap-mandatory overflow-auto lg:hidden'>
                        <div className='aspect-video rounded-lg overflow-hidden shadow-md shadow-neutral-600/50 snap-center '>
                            <video controls autoPlay muted loop src="https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie_max.mp4" className='aspect-video'></video>
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

                    <RatingSection game={game} />

                    <AboutSection game={game} />

                    <section className='grid grid-cols-2 gap-2 self-start w-full text-sm'>
                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Platforms</h4>
                            <div className='font-light'>
                                {game.platforms.map((item) => {
                                    return <span key={item.platform.id} className="before:content-['\00a0'] first-of-type:before:content-[''] after:content-[','] last-of-type:after:content-[''] leading-5">
                                        {item.platform.name}
                                    </span>
                                })}
                            </div>
                        </div>

                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Metascore</h4>
                            <div className='border rounded px-1.5 py-0.5 inline-block font-bold'>{game.metacritic}</div>
                        </div>

                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Genre</h4>
                            <div className='font-light'>
                                {game.genres.map((genre) => {
                                    return <span key={genre.id} className="before:content-['\00a0'] first-of-type:before:content-[''] after:content-[','] last-of-type:after:content-[''] leading-5">
                                        {genre.name}
                                    </span>
                                })}
                            </div>
                        </div>

                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Release date</h4>
                            <div className='font-light'>{game.tba ? 'TBA' : game.released}</div>
                        </div>

                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Developer</h4>
                            <div className='font-light'>
                                {game.developers.map((developer) => {
                                    return <span key={developer.id} className="before:content-['\00a0'] first-of-type:before:content-[''] after:content-[','] last-of-type:after:content-[''] leading-5">
                                        {developer.name}
                                    </span>
                                })}
                            </div>
                        </div>

                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Publisher</h4>
                            <div className='font-light'>
                                {game.publishers.map((publisher) => {
                                    return <span key={publisher.id} className="before:content-['\00a0'] first-of-type:before:content-[''] after:content-[','] last-of-type:after:content-[''] leading-5">
                                        {publisher.name}
                                    </span>
                                })}
                            </div>
                        </div>


                        <div className='col-span-1'>
                            <h4 className='text-neutral-400/80 pb-2'>Age rating</h4>
                            <div className='font-light'>
                                {game.esrb_rating?.name && <span>{ageRatingPrefix[game.esrb_rating.name as keyof AgeRatingPrefix]} </span>}
                                <span>{game.esrb_rating?.name || 'Not rated'}</span>
                            </div>

                        </div>
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
                    </section>
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
