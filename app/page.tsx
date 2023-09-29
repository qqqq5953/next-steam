import useFetch from '@/hooks/useFetch'

import Dropdown from '@/components/global/Dropdown'
import DisplayOptions from '@/app/_components/DisplayOptions'
import GameCard from '@/app/_components/GameCard'
import Sidebar from '@/app/_components/Sidebar'

import { addBlurredDataURL } from '@/lib/getPlaceholder'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: Props) {
  // const { data, error } = await useFetch(
  //   'https://jsonplaceholder.typicode.com/posts/1'
  // )

  // 先打官網的
  // https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af

  // const { data, error } = await useFetch(
  //   `https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=4&page=1&key=c542e67aec3a4340908f9de9e86038af`
  // )

  // console.log(data);

  const orderOptions = [
    {
      name: 'Relevance',
      value: '-relevance'
    },
    {
      name: 'Date added',
      value: '-created'
    },
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Release date',
      value: '-released'
    },
    {
      name: 'Popularity',
      value: '-added'
    },
    {
      name: 'Average rating',
      value: '-rating'
    }
  ]

  const platformOptions = [
    {
      name: 'PC',
      value: '1'
    },
    {
      name: 'PlayStation',
      value: '2',
      children: [
        {
          name: 'PlayStation 4',
          value: '18'
        },
        {
          name: 'PlayStation 5',
          value: '187'
        }
      ]
    },
    {
      name: 'Xbox',
      value: '3',
      children: [
        {
          name: 'Xbox One',
          value: '1'
        },
        {
          name: 'Xbox Series S/X',
          value: '186'
        }
      ]
    },
    {
      name: 'iOS',
      value: '4'
    },
    {
      name: 'Android',
      value: '8'
    },
    {
      name: 'Macintosh',
      value: '5'
    },
    {
      name: 'Linux',
      value: '6'
    },
    {
      name: 'Nintendo',
      value: '7'
    }
  ]

  const { order, platform } = searchParams
  const orderValue = orderOptions.find((option) => option.name === order)?.value ?? '-relevance'
  const platformValue = platformOptions.find(
    (option) => option.name === platform
  )?.value ?? "1"

  console.log('orderValue', orderValue)
  console.log('platformValue', platformValue)

  // 如果不行再打測試的
  //api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}

  const { data, error } = await useFetch(
    `https://api.rawg.io/api/games?ordering=${orderValue}&parent_platforms=${platformValue}&key=${process.env.RAWG_API_KEY}`
  )
  // `https://api.rawg.io/api/games?ordering=${orderValue}&parent_platforms=${platformValue}&key=${process.env.RAWG_API_KEY}`

  const games = data.results
  // console.log(data.results[0])

  // const games: Game[] = [
  //   {
  //     id: 3498,
  //     name: 'Grand Theft Auto V',
  //     released: '2013-09-17',
  //     background_image:
  //       'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
  //     rating: 4.47,
  //     platforms: [
  //       {
  //         platform: {
  //           id: 187,
  //           name: 'PlayStation 5'
  //         }
  //       }
  //     ],
  //     genres: [
  //       {
  //         id: 4,
  //         name: 'Action'
  //       },
  //       {
  //         id: 3,
  //         name: 'Adventure'
  //       }
  //     ],
  //     short_screenshots: [
  //       {
  //         id: -1,
  //         image:
  //           'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg'
  //       },
  //       {
  //         id: 1827221,
  //         image:
  //           'https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg'
  //       },
  //       {
  //         id: 1827222,
  //         image:
  //           'https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg'
  //       },
  //       {
  //         id: 1827223,
  //         image:
  //           'https://media.rawg.io/media/screenshots/f95/f9518b1d99210c0cae21fc09e95b4e31.jpg'
  //       },
  //       {
  //         id: 1827225,
  //         image:
  //           'https://media.rawg.io/media/screenshots/a5c/a5c95ea539c87d5f538763e16e18fb99.jpg'
  //       },
  //       {
  //         id: 1827226,
  //         image:
  //           'https://media.rawg.io/media/screenshots/a7e/a7e990bc574f4d34e03b5926361d1ee7.jpg'
  //       },
  //       {
  //         id: 1827227,
  //         image:
  //           'https://media.rawg.io/media/screenshots/592/592e2501d8734b802b2a34fee2df59fa.jpg'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3328,
  //     name: 'The Witcher 3: Wild Hunt',
  //     released: '2015-05-18',
  //     background_image:
  //       'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
  //     rating: 4.66,
  //     platforms: [
  //       {
  //         platform: {
  //           id: 186,
  //           name: 'Xbox Series S/X'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 18,
  //           name: 'PlayStation 4'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 7,
  //           name: 'Nintendo Switch'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 4,
  //           name: 'PC'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 1,
  //           name: 'Xbox One'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 187,
  //           name: 'PlayStation 5'
  //         }
  //       }
  //     ],
  //     genres: [
  //       {
  //         id: 4,
  //         name: 'Action'
  //       },
  //       {
  //         id: 3,
  //         name: 'Adventure'
  //       },
  //       {
  //         id: 5,
  //         name: 'RPG'
  //       }
  //     ],
  //     short_screenshots: [
  //       {
  //         id: -1,
  //         image:
  //           'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg'
  //       },
  //       {
  //         id: 30336,
  //         image:
  //           'https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg'
  //       },
  //       {
  //         id: 30337,
  //         image:
  //           'https://media.rawg.io/media/screenshots/6a0/6a08afca95261a2fe221ea9e01d28762.jpg'
  //       },
  //       {
  //         id: 30338,
  //         image:
  //           'https://media.rawg.io/media/screenshots/cdd/cdd31b6b4a687425a87b5ce231ac89d7.jpg'
  //       },
  //       {
  //         id: 30339,
  //         image:
  //           'https://media.rawg.io/media/screenshots/862/862397b153221a625922d3bb66337834.jpg'
  //       },
  //       {
  //         id: 30340,
  //         image:
  //           'https://media.rawg.io/media/screenshots/166/166787c442a45f52f4f230c33fd7d605.jpg'
  //       },
  //       {
  //         id: 30342,
  //         image:
  //           'https://media.rawg.io/media/screenshots/f63/f6373ee614046d81503d63f167181803.jpg'
  //       }
  //     ]
  //   },
  //   {
  //     id: 4200,
  //     name: 'Portal 2',
  //     released: '2011-04-18',
  //     background_image:
  //       'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
  //     rating: 4.61,
  //     platforms: [
  //       {
  //         platform: {
  //           id: 16,
  //           name: 'PlayStation 3'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 4,
  //           name: 'PC'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 14,
  //           name: 'Xbox 360'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 6,
  //           name: 'Linux'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 5,
  //           name: 'macOS'
  //         }
  //       },
  //       {
  //         platform: {
  //           id: 1,
  //           name: 'Xbox One'
  //         }
  //       }
  //     ],
  //     genres: [
  //       {
  //         id: 2,
  //         name: 'Shooter'
  //       },
  //       {
  //         id: 7,
  //         name: 'Puzzle'
  //       }
  //     ],
  //     short_screenshots: [
  //       {
  //         id: -1,
  //         image:
  //           'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg'
  //       },
  //       {
  //         id: 99018,
  //         image:
  //           'https://media.rawg.io/media/screenshots/221/221a03c11e5ff9f765d62f60d4b4cbf5.jpg'
  //       },
  //       {
  //         id: 99019,
  //         image:
  //           'https://media.rawg.io/media/screenshots/173/1737ff43c14f40294011a209b1012875.jpg'
  //       },
  //       {
  //         id: 99020,
  //         image:
  //           'https://media.rawg.io/media/screenshots/b11/b11a2ae0664f0e8a1ef2346f99df26e1.jpg'
  //       },
  //       {
  //         id: 99021,
  //         image:
  //           'https://media.rawg.io/media/screenshots/9b1/9b107a790909b31918ebe2f40547cc85.jpg'
  //       },
  //       {
  //         id: 99022,
  //         image:
  //           'https://media.rawg.io/media/screenshots/d05/d058fc7f7fa6128916c311eb14267fed.jpg'
  //       },
  //       {
  //         id: 99023,
  //         image:
  //           'https://media.rawg.io/media/screenshots/415/41543dcc12dffc8e97d85a56ad42cda8.jpg'
  //       }
  //     ]
  //   }
  // ]

  const gameWithBlurDataURL = await addBlurredDataURL(games)

  // console.log('gameWithBlurDataURL', gameWithBlurDataURL);

  // console.log('searchParams', searchParams);


  return (
    <>
      <main className='flex pt-6 lg:pt-10 gap-11'>
        <Sidebar />

        <div className="space-y-4 grow">
          <div className="text-center pb-6 lg:text-left">
            <h2 className="font-bold text-3xl  lg:text-7xl">New and trending</h2>
            <h3 className="font-light pt-2 text-sm lg:text-base ">
              Based on player counts and release date
            </h3>
          </div>

          <div className="flex gap-2 items-center pb-4">
            <div className="flex gap-2 grow sm:grow-0">
              <div className="grow">
                <Dropdown
                  selectedValuePrefix={'Order by:'}
                  options={orderOptions}
                  type="order"
                />
              </div>
              <div className="grow lg:min-w-[150px]">
                <Dropdown options={platformOptions} type="platform" />
              </div>
            </div>
            <div className="hidden lg:flex lg:gap-3 lg:items-center ml-auto">
              <DisplayOptions />
            </div>
          </div>

          {searchParams.mode === 'grid' ?
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
              {gameWithBlurDataURL.map((game, index) => {
                return (
                  <div key={game.id}>
                    <GameCard game={game} index={index} />
                  </div>
                )
              })}
            </section>
            :
            <section className='space-y-8'>
              {gameWithBlurDataURL.map((game, index) => {
                return (
                  <div key={game.id} className='max-w-2xl mx-auto'>
                    <GameCard game={game} index={index} />
                  </div>
                )
              })}
            </section>
          }

        </div>
      </main>
    </>
  )
}
