import { GameSingle, Rating, RatingColor } from '@/types'

type Props = {
    game: GameSingle
}

export default function RatingSection({ game }: Props) {
    const ratingTitle = game.ratings.sort((a: { count: number }, b: { count: number }) => b.count - a.count)[0].title

    const ratingTotalScore = game.ratings.reduce((acc: any, cur: { count: any }) => acc + cur.count, 0)

    const ratingColorMap: RatingColor = {
        'exceptional': 'bg-lime-400',
        'recommended': 'bg-blue-500',
        'meh': 'bg-orange-400',
        'skip': 'bg-red-500',
    }

    return (
        <section className='space-y-4'>
            <div className='text-center lg:text-left'>
                <div className='text-xl font-semibold capitalize'>{ratingTitle}</div>
                <div className='text-sm font-thin text-neutral-400/80 tracking-widest'>{ratingTotalScore} RATINGS</div>
            </div>

            <div className='flex w-full rounded overflow-hidden'>
                {game.ratings.map((rating: Rating) => {
                    return <div
                        key={rating.id}
                        className={`h-10 ${ratingColorMap[rating.title as keyof RatingColor]}`}
                        style={{
                            width: `${rating.percent}%`
                        }}></div>
                })}
            </div>

            <div className='flex flex-wrap gap-4 text-sm '>
                {game.ratings.map((rating: Rating) => {
                    return <div key={rating.id} className='flex items-center gap-2'>
                        <div className={`w-2 h-2 rounded-full ${ratingColorMap[rating.title as keyof RatingColor]}`}></div>
                        <div className='capitalize'>{rating.title}</div>
                        <div className='  text-neutral-400/80 font-thin tracking-widest'>{rating.count}</div>
                    </div>
                })}
            </div>
        </section>
    )
}
