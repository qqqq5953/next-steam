import game from '@/source/game_example.json'
import same_series from '@/source/game_same_series.json'
import dlc from '@/source/games_dlc&edition.json'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getBrandIcon, getUniqueIcons, platformMap } from '@/lib/getBrandIcon'
import Link from 'next/link'
import AboutSection from './_components/AboutSection'
import RatingSection from './_components/RatingSection'
import GridColumnContainer from './_components/GridColumnContainer'
import Gallery from './_components/Gallery'
import Sidebar from '@/app/_components/Sidebar'
import { Suspense } from 'react'

import { AgeRatingPrefix, Platform } from '@/types'
import Suggestions from './_components/Suggestions'
import Creators from './_components/Creators'
import Achievements from './_components/Achievements'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Games({ searchParams }: Props) {
  const { id } = searchParams
  console.log('id', id)

  // https://api.rawg.io/api/games/${id}
  // https://api.rawg.io/api/games/{game_pk}/screenshots

  // const res = await fetch(
  //   `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`
  // )
  // const game = await res.json()
  // console.log('ratings', game.stores)

  // const res = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${process.env.RAWG_API_KEY}`)
  // const data = await res.json()
  // console.log('game-series', data)

  // const res = await fetch(`https://api.rawg.io/api/games/${id}/additions?key=${process.env.RAWG_API_KEY}`)
  // const data = await res.json()
  // console.log('additions', data)

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

  const icons = game.platforms.map((item: Platform) =>
    getBrandIcon(item.platform.name)
  )
  const uniqueIcons = getUniqueIcons(icons)

  const itemClass =
    "ml-1.5 first-of-type:ml-0 after:content-[','] last-of-type:after:content-[''] leading-5 underline underline-offset-2 decoration-neutral-500"

  return (
    <main className="flex pt-6 lg:pt-10 gap-11">
      <Sidebar />

      <div className="space-y-4 max-w-lg mx-auto lg:max-w-5xl">
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

        <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 space-y-6">
            <header className="flex flex-col items-center justify-center gap-3 lg:gap-6 lg:justify-start lg:items-start">
              {/* breadcrumb */}
              <ul className="flex items-center gap-1.5 text-sm tracking-widest text-neutral-300/60 flex-wrap">
                {breadcrumbs.map((item, index) => {
                  return (
                    <li key={index} className="after:content-['/']">
                      <Link
                        href={item.path}
                        className="mr-1.5 hover:text-white"
                      >
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
              <h2 className="text-3xl font-semibold lg:text-7xl">
                {game.name}
              </h2>
            </header>

            {/* video and screenshots */}

            {/* <div className="flex gap-4 pb-4 -mx-4 snap-x overflow-auto lg:hidden">
              <div className="rounded-lg overflow-hidden shadow-md shadow-neutral-600/50 snap-center max-h-[150px] max-w-[260px]">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  src={trailer?.results[0]?.data['480']}
                ></video>
              </div>
              <div className="flex gap-4">
                {screenshot.results.map((item, index) => {
                  return (
                    <div
                      className="aspect-video shadow-md shadow-neutral-700/90 snap-center"
                      key={item.id}
                    >
                      <Image
                        src={item.image}
                        alt={game.name}
                        width={100}
                        height={50}
                        priority={index === 0}
                        className="rounded-lg object-cover w-full"
                      />
                    </div>
                  )
                })}
              </div>
            </div> */}

            <Suspense
              fallback={
                <div className="rounded bg-slate-200/20  w-full min-h-[260px] animate-pulse"></div>
              }
            >
              <Gallery
                game={game}
                id={id}
                className="flex gap-4 pb-4 -mx-4 snap-x overflow-auto"
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

              <GridColumnContainer
                title="Metascore"
                spanNum="1"
                className="border rounded px-1.5 py-0.5 inline-block font-bold"
              >
                {game.metacritic}
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

              <GridColumnContainer
                title="Other games in the series"
                spanNum="2"
              >
                {same_series.results.map((series) => {
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
                {dlc.results.map((item) => {
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

              <GridColumnContainer title="Website" spanNum="2">
                <Link className={itemClass} href={game.website}>
                  {game.website}
                </Link>
              </GridColumnContainer>

              <GridColumnContainer
                title="System requirements"
                spanNum="2"
                className="space-y-4"
              >
                {game.platforms.map((item) => {
                  return (
                    <div key={item.platform.id} className="space-y-4">
                      <div className="font-light  text-lg">
                        System requirements for {item.platform.name}
                      </div>
                      {item.requirements.minimum && (
                        <div className="font-extralight">
                          {item.requirements.minimum}
                        </div>
                      )}
                      {item.requirements.recommended && (
                        <div className="font-extralight">
                          {item.requirements.recommended}
                        </div>
                      )}
                    </div>
                  )
                })}
              </GridColumnContainer>

              <GridColumnContainer
                title="Where to buy"
                spanNum="2"
                className="flex flex-nowrap gap-2 overflow-auto pb-4 lg:hidden"
              >
                {game.stores.map((item) => {
                  return (
                    <Link
                      key={item.store.name}
                      className="text-base shrink-0 rounded p-2 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover-text-black transition-colors duration-300"
                      href={`/games/${item.store.slug}?${item.store.id}`}
                    >
                      {item.store.name}
                    </Link>
                  )
                })}
              </GridColumnContainer>
            </section>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <Suspense
              fallback={
                <div className="rounded bg-slate-200/20  w-full min-h-[260px] animate-pulse"></div>
              }
            >
              <Gallery
                game={game}
                id={id}
                className="lg:flex lg:mx-0 lg:py-12 lg:flex-col lg:space-y-4"
                mediaQuery="(min-width:1024px)"
              />
            </Suspense>
            {/* <div className="lg:py-12 lg:flex-col space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  src="https://steamcdn-a.akamaihd.net/steam/apps/256693661/movie_max.mp4"
                ></video>
              </div>
              <div className="flex lg:grid lg:grid-cols-2 gap-4">
                {screenshot.results.map((item) => {
                  return (
                    <div
                      className="lg:col-span-1 aspect-video shadow-md shadow-neutral-700/90"
                      key={item.id}
                    >
                      <Image
                        src={item.image}
                        alt={game.name}
                        width={100}
                        height={50}
                        priority={true}
                        className="rounded-lg object-cover w-full"
                      />
                    </div>
                  )
                })}
              </div>
            </div> */}

            <GridColumnContainer
              title="Where to buy"
              spanNum="1"
              className="hidden lg:grid lg:grid-cols-2 lg:gap-4"
            >
              {game.stores.map((item) => {
                return (
                  <Link
                    key={item.store.name}
                    className="col-span-1 rounded p-2 bg-neutral-800/90 text-neutral-500 text-center hover:bg-slate-50 hover-text-black transition-colors duration-300"
                    href={`/games/${item.store.slug}?${item.store.id}`}
                  >
                    {item.store.name}
                  </Link>
                )
              })}
            </GridColumnContainer>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-8">
          <Suggestions game={game} id={id} />
          <Creators game={game} id={id} />
          <Achievements game={game} id={id} />
        </section>
      </div>
    </main>
  )
}
