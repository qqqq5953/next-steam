import Navbar from '@/components/Navbar'
import Select from '@/components/Select'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/base-ui/card'

type Platform = {
  platform: {
    id: number
    name: string
    image_background: string | null
    year_start: string | null
    year_end: string | null
  }
  // requirements_en: {
  //   minimum: string
  //   recommended: string
  // }
}
type Genre = {
  id: number
  name: string
  image_background: string
}

type Game = {
  id: number
  name: string
  released: string
  background_image: string
  rating: number
  platforms: Platform[]
  // genres: Genre[]
  // short_screenshots: object[]
}

async function getGames(): Promise<Game[]> {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
  )
  if (!res.ok) throw new Error('Faied to fecth game')
  const data = await res.json()
  // console.log('data', JSON.stringify(data.results[0]))
  return data.results
}

export default async function Home() {
  const options = [
    {
      name: '123',
      value: '123'
    },
    {
      name: '456',
      value: '456'
    }
  ]

  // const games: Game[] = await getGames()
  const games: Game[] = [
    {
      id: 3498,
      name: 'Grand Theft Auto V',
      released: '2013-09-17',
      background_image:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
      rating: 4.47,
      platforms: [
        {
          platform: {
            id: 123123,
            name: 'string',
            image_background: 'qweqwe',
            year_start: '2008',
            year_end: null
          }
        }
      ]
      // genres: [Array],
      // short_screenshots: [Array]
    },
    {
      id: 3328,
      name: 'The Witcher 3: Wild Hunt',
      released: '2015-05-18',
      background_image:
        'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
      rating: 4.66,
      platforms: [
        {
          platform: {
            id: 123123,
            name: 'string',
            image_background: 'qweqwe',
            year_start: '2008',
            year_end: null
          }
        }
      ]
      // genres: [Array],
      // short_screenshots: [Array]
    },
    {
      id: 4200,
      name: 'Portal 2',
      released: '2011-04-18',
      background_image:
        'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
      rating: 4.61,
      platforms: [
        {
          platform: {
            id: 123123,
            name: 'string',
            image_background: 'qweqwe',
            year_start: '2008',
            year_end: null
          }
        }
      ]
      // genres: [Array],
      // short_screenshots: [Array]
    }
  ]

  // const item = localStorage.getItem('game')
  // let games: Game[]

  // if (item) {
  //   games = JSON.parse(item)
  // } else {
  //   const test: Game[] = await getGames()
  //   localStorage.setItem('game', JSON.stringify(test))
  // }

  return (
    <>
      <Navbar></Navbar>
      <main>
        <div className="text-center py-6">
          <h2 className="text-3xl font-bold">New and trending</h2>
          <h3 className="text-sm font-light pt-2">
            Based on player counts and release date
          </h3>
        </div>

        <div className="flex gap-3 border-b-4 border-neutral-500 pb-4 mb-4">
          <Select selectedValuePrefix={'Order by:'} options={options} />
          <Select options={options} />
        </div>

        <section className="grid columns-1 gap-4">
          {games.map((game) => {
            return (
              <Card
                key={game.id}
                className="overflow-auto bg-neutral-800/90 border-none"
              >
                <div className="relative h-60 ">
                  <Image
                    src={game.background_image}
                    fill
                    // width={250}
                    // height={250}
                    alt={game.name}
                    className="object-cover"
                  ></Image>
                </div>
                <CardHeader>
                  <CardTitle>{game.name}</CardTitle>
                  <CardDescription>{game.released}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    {game.platforms.map((item) => {
                      return (
                        <>
                          <div className="text-xs" key={item.platform.id}>
                            {item.platform.name}
                          </div>
                        </>
                      )
                    })}
                  </div>

                  {/* {game.genres.map((genre) => {
                    return <h3 key={genre.id}>{genre.name}</h3>
                  })} */}
                  {/* <pre></pre> */}
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}
