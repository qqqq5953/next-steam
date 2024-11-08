// import game from '@/source/game_example.json'
// import same_series from '@/source/game_same_series.json'
// import dlc from '@/source/games_dlc&edition.json'
// import stores_link from '@/source/game_store.json'

import Link from 'next/link'
// import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'

import { AgeRatingPrefix, Game, GameDetails } from '@/types'
import getGameDetails from '@/lib/getGameDetails'

import AboutSection from './_components/AboutSection'
import RatingSection from './_components/RatingSection'
import GridColumnContainer from './_components/GridColumnContainer'
import Gallery from './_components/Gallery'
import Suggestions from './_components/Suggestions'
import Creators from './_components/Creators'
import Achievements from './_components/Achievements'
import Requirements from './_components/Requirements'
import Reddit from './_components/Reddit'
// const RefreshButton = dynamic(() => import("./_components/RefreshButton"))

type Props = {
  params: { name: string }
}

export const revalidate = 120

export async function generateStaticParams() {
  // only get the first 20 data
  const games: Game[] = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
    .then((res) => res.json())
    .then((data) => data.results);

  // Generate a list of params with the 'name' for each game
  return games.map((game) => ({
    name: game.slug
  }));
}


export default async function Games({ params: { name } }: Props) {
  const { game, same_series, dlc, stores_link, errors }: GameDetails = await getGameDetails(name)

  if (!game) return null

  const storeLinkObj = stores_link?.results.reduce((obj, store) => {
    obj[store.store_id] = store.url
    return obj
  }, {} as { [key: number]: string }) || {}

  const breadcrumbs = [
    { name: 'HOME', path: '/' },
    { name: 'GAMES', path: '/' }
  ]

  const ageRatingPrefix: AgeRatingPrefix = {
    Everyone: '0+',
    'Everyone 10+': '10+',
    Teen: '13+',
    Mature: '17+',
    'Adults only': '18+'
  }

  const icons = game.platforms.map((item) => getBrandIcon(item.platform.name))
  const uniqueIcons = getUniqueIcons(icons)

  const itemClass = "separate-with-comma link-style-underline leading-5"

  return (
    <div className='space-y-4 '>
      <div className="pt-8 grid grid-cols-1 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="col-span-1 space-y-6 lg:col-span-7">
          <header className="flex flex-col items-center justify-center gap-3 lg:gap-6 lg:justify-start lg:items-start">
            {/* breadcrumb */}
            <ul className="flex items-center justify-center gap-1.5 text-sm tracking-widest text-neutral-400/60 flex-wrap font-light">
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

          <Suspense
            fallback={
              <div className="rounded-lg bg-neutral-600/30 h-[149px] animate-pulse lg:hidden"></div>
            }
          >
            <Gallery
              game={game}
              className="flex gap-4 pb-4 -mx-4 snap-x overflow-auto sm:mx-0 lg:hidden"
              mediaQuery="(max-width:1023px)"
            />
          </Suspense>

          <RatingSection game={game} />

          <AboutSection game={game} />

          <section className="grid grid-cols-2 gap-2 self-start w-full text-sm lg:text-base">
            <GridColumnContainer title="Platforms" spanNum="1">
              {game.platforms.map((item) => {
                return (
                  <Link
                    key={item.platform.id}
                    className={itemClass}
                    href={`/games/${item.platform.slug}?${item.platform.id}`}
                  >
                    {item.platform.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            <GridColumnContainer title="Metascore" spanNum="1">
              <div className="border rounded px-1.5 py-0.5 inline-block font-bold">
                {game.metacritic}
              </div>
            </GridColumnContainer>

            <GridColumnContainer title="Genre" spanNum="1">
              {game.genres.map((genre) => {
                return (
                  <Link
                    key={genre.id}
                    className={itemClass}
                    href={`/games/${genre.slug}?${genre.id}`}
                  >
                    {genre.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            <GridColumnContainer title="Release date" spanNum="1">
              {game.tba ? 'TBA' : game.released}
            </GridColumnContainer>

            <GridColumnContainer title="Developer" spanNum="1">
              {game.developers.map((developer) => {
                return (
                  <Link
                    key={developer.id}
                    className={itemClass}
                    href={`/games/${developer.slug}?${developer.id}`}
                  >
                    {developer.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            <GridColumnContainer title="Publisher" spanNum="1">
              {game.publishers.map((publisher) => {
                return (
                  <Link
                    key={publisher.id}
                    className={itemClass}
                    href={`/games/${publisher.slug}?${publisher.id}`}
                  >
                    {publisher.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            <GridColumnContainer title="Age rating" spanNum="1">
              {game.esrb_rating?.name ? (
                <span>
                  {
                    ageRatingPrefix[
                    game.esrb_rating.name as keyof AgeRatingPrefix
                    ]
                  }
                  &nbsp;
                  {game.esrb_rating.name}
                </span>
              ) : (
                'Not rated'
              )}
            </GridColumnContainer>

            <GridColumnContainer title="Other games in the series" spanNum="2">
              {same_series?.results.map((series) => {
                return (
                  <Link
                    key={series.id}
                    className={itemClass}
                    href={`/games/${series.slug}?${series.id}`}
                  >
                    {series.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            <GridColumnContainer title="DLC's and editions" spanNum="2">
              {dlc?.results.map((item) => {
                return (
                  <Link
                    key={item.id}
                    className={itemClass}
                    href={`/games/${item.slug}?${item.id}`}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            <GridColumnContainer title="Tags" spanNum="2">
              {game.tags.map((tag) => {
                return (
                  <Link
                    key={tag.id}
                    className={itemClass}
                    href={`/games/${tag.slug}?${tag.id}`}
                  >
                    {tag.name}
                  </Link>
                )
              })}
            </GridColumnContainer>

            {game.website && <GridColumnContainer title="Website" spanNum="2">
              <Link className={itemClass} href={game.website}>
                {game.website}
              </Link>
            </GridColumnContainer>}

            <Requirements game={game} />

            <GridColumnContainer
              title="Where to buy"
              spanNum="2"
              className="lg:hidden"
            >
              <div className="flex flex-nowrap gap-2 overflow-auto pb-4 lg:hidden">
                {game.stores.map((item) => {
                  if (storeLinkObj[item.store.id]) {
                    return (
                      <Link
                        key={item.store.name}
                        className="text-base shrink-0 rounded p-2 bg-neutral-800/90 text-neutral-400/70 text-center hover:bg-slate-50 hover-text-black transition-colors duration-300"
                        href={storeLinkObj[item.store.id]}
                        target="blank"
                      >
                        {item.store.name}
                      </Link>
                    )
                  }
                })}
              </div>
            </GridColumnContainer>
          </section>
        </div>

        <div className="hidden col-span-1 lg:block lg:col-span-5">
          <Suspense
            fallback={
              <div className="lg:py-12 lg:space-y-4">
                <div className="hidden rounded bg-neutral-600/30 w-full min-h-[210px] animate-pulse lg:block"></div>
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
                  {[...Array(6)].map((e, i) => {
                    return (
                      <div
                        className="rounded bg-neutral-600/30 animate-pulse aspect-video"
                        key={i}
                      ></div>
                    )
                  })}
                </div>
              </div>
            }
          >
            <Gallery
              game={game}
              className="hidden lg:flex lg:mx-0 lg:py-12 lg:flex-col lg:space-y-4"
              mediaQuery="(min-width:1024px)"
            />
          </Suspense>

          <GridColumnContainer title="Where to buy" spanNum="1">
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
              {game.stores.map((item) => {
                if (storeLinkObj[item.store.id]) {
                  return (
                    <Link
                      key={item.store.name}
                      className="col-span-1 rounded p-2 bg-neutral-800/90 text-neutral-400/70 text-center hover:bg-slate-50 hover:text-black transition-colors duration-300"
                      href={storeLinkObj[item.store.id]}
                      target="blank"
                    >
                      {item.store.name}
                    </Link>
                  )
                }
              })}
            </div>
          </GridColumnContainer>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-8">
        <Suggestions game={game} />
        <Creators game={game} />
        <Achievements game={game} />
        <Reddit game={game} />
      </section>
    </div>
  )
}
