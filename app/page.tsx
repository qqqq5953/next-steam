import Select from '@/components/global/Select'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/base-ui/card'
import useFetch from '@/hooks/useFetch'

type Platform = {
  platform: {
    id: number
    name: string
    // image_background: string | null
    // year_start: number | null
    // year_end: number | null
  }
  // requirements_en: {
  //   minimum: string
  //   recommended: string
  // }
}
type Genre = {
  id: number
  name: string
  // image_background: string
}

type Game = {
  id: number
  name: string
  released: string
  background_image: string
  rating: number
  platforms: Platform[]
  genres: Genre[]
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

  // const { data, error } = await useFetch(
  //   'https://jsonplaceholder.typicode.com/posts/1'
  // )

  // 先打官網的
  // https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af

  // 如果不行再打測試的
  // https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}

  // const { data, error } = await useFetch(
  //   `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
  // )

  // const games = data.result

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
            id: 187,
            name: 'PlayStation 5'
          }
        }
      ],
      genres: [
        {
          id: 4,
          name: 'Action'
        },
        {
          id: 3,
          name: 'Adventure'
        }
      ]
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
            id: 186,
            name: 'Xbox Series S/X'
          }
        },
        {
          platform: {
            id: 18,
            name: 'PlayStation 4'
          }
        },
        {
          platform: {
            id: 7,
            name: 'Nintendo Switch'
          }
        },
        {
          platform: {
            id: 4,
            name: 'PC'
          }
        },
        {
          platform: {
            id: 1,
            name: 'Xbox One'
          }
        },
        {
          platform: {
            id: 187,
            name: 'PlayStation 5'
          }
        }
      ],
      genres: [
        {
          id: 4,
          name: 'Action'
        },
        {
          id: 3,
          name: 'Adventure'
        },
        {
          id: 5,
          name: 'RPG'
        }
      ]
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
            id: 16,
            name: 'PlayStation 3'
          }
        },
        {
          platform: {
            id: 4,
            name: 'PC'
          }
        },
        {
          platform: {
            id: 14,
            name: 'Xbox 360'
          }
        },
        {
          platform: {
            id: 6,
            name: 'Linux'
          }
        },
        {
          platform: {
            id: 5,
            name: 'macOS'
          }
        },
        {
          platform: {
            id: 1,
            name: 'Xbox One'
          }
        }
      ],
      genres: [
        {
          id: 2,
          name: 'Shooter'
        },
        {
          id: 7,
          name: 'Puzzle'
        }
      ]
    }
  ]

  return (
    <>
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

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
          {games.map((game) => {
            return (
              <Card
                key={game.id}
                className="overflow-auto bg-neutral-800/90 border-none"
              >
                <div className="relative h-60">
                  <Image
                    src={game.background_image}
                    fill
                    sizes="(min-width: 1480px) 1368px, calc(94.83vw - 16px)"
                    alt={game.name}
                    className="object-cover object-top"
                  ></Image>
                </div>

                <CardHeader>
                  <CardTitle>{game.name}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="divide-y divide-neutral-700 text-xs">
                    <li className="flex justify-between items-center py-3">
                      <span>Release date:</span>
                      <div className="text-right">
                        {game.platforms.map((item) => {
                          return (
                            <span key={item.platform.id}>
                              {item.platform.name}
                            </span>
                          )
                        })}
                      </div>
                    </li>
                    <li className="flex justify-between items-center py-3">
                      <span>Genres:</span>
                      <div className="text-right ">
                        {game.genres.map((genre) => {
                          return (
                            <span
                              key={genre.id}
                              className="after:content-[','] last-of-type:after:content-['']"
                            >
                              &nbsp;{genre.name}
                            </span>
                          )
                        })}
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </section>
      </main>
    </>
  )
}
