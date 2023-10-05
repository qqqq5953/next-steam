import game from '@/source/game_example.json'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import Link from 'next/link'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Games({ searchParams }: Props) {

    const { id } = searchParams
    console.log('id', id)

    // https://rawg.io/api/games/${id}

    const breadcrumbs = [
        { name: "HOME", path: "/" },
        { name: "GAMES", path: "/" },
    ]

    const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
    const uniqueIcons = getUniqueIcons(icons)

    return (
        <div className='space-y-4 '>
            <Image src={game.background_image} alt={game.name} width={400} height={150} priority={true} className='rounded absolute top-0 inset-x-0 -z-10 opacity-40 -mx-4' />

            <div className='space-y-4 pt-8'>
                {/* breadcrumb */}
                <ul className='flex items-center justify-center gap-1.5 text-sm tracking-widest text-neutral-300/60 flex-wrap'>
                    {breadcrumbs.map((item, index) => {
                        return <li key={index} className="after:content-['/']">
                            <Link href={item.path} className='mr-1.5 hover:text-white'>{item.name}</Link>
                        </li>
                    })}
                    <li>{game.name.toUpperCase()}</li>
                </ul>

                <div className='flex flex-wrap justify-center gap-4'>
                    <div className='flex justify-center gap-4'>
                        {/* date */}
                        <span className='px-2 py-0.5 bg-white text-black  rounded text-sm'>{game.released}</span>

                        {/* platform */}
                        <div className='flex items-center gap-2'>
                            {uniqueIcons.map((item, index) => {
                                return <span key={index}>
                                    <FontAwesomeIcon icon={platformMap[item as keyof typeof platformMap]}></FontAwesomeIcon>
                                </span>
                            })}
                        </div>
                    </div>

                    <div className='text-sm text-center font-extralight tracking-widest'>AVERAGE PLAYTIME: {game.playtime} HOURS</div>
                </div>
            </div>

            <h2 className='text-3xl text-center'>{game.name}</h2>

            <div>video and images</div>
        </div>
    )
}
