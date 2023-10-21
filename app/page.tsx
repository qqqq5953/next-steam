import useFetch from '@/hooks/useFetch'

import Dropdown from '@/components/global/Dropdown'
import DisplayOptions from '@/app/_components/DisplayOptions'
import CardsSection from '@/app/_components/CardsSection'
import Sidebar from '@/app/_components/Sidebar'

import { Suspense } from 'react'
import Icon from '@/components/global/Icon'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: Props) {
  const time = process.hrtime.bigint()
  console.log('time', time)
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
      value: '-name'
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

  const { order, platform, mode } = searchParams
  const orderValue =
    orderOptions.find((option) => option.name === order)?.value ?? '-relevance'
  const platformValue =
    platformOptions.find((option) => option.name === platform)?.value ?? '1'
  const displayMode = mode || 'grid'

  console.log('orderValue', orderValue)
  console.log('platformValue', platformValue)
  console.log('displayMode', displayMode)

  // const res = await fetch(
  //   `https://jsonplaceholder.typicode.com/${obj[orderValue]}`
  // )
  // const data = await res.json()

  // 如果不行再打測試的
  //api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}
  // `https://api.rawg.io/api/games?ordering=${orderValue}&parent_platforms=${platformValue}&key=${process.env.RAWG_API_KEY}`

  return (
    <>
      <main className="flex pt-6 lg:pt-10 gap-11">
        <Sidebar />

        <div className="space-y-4 grow">
          <div className="text-center pb-6 lg:text-left">
            <h2 className="font-bold text-3xl  lg:text-7xl">
              New and trending
            </h2>
            <h3 className="font-light pt-2 text-sm lg:text-base ">
              Based on player counts and release date
            </h3>
          </div>

          <div className="flex gap-2 items-center pb-4">
            <div className="flex gap-2 grow sm:grow-0">
              <div className="grow">
                <Dropdown
                  selectedValuePrefix='Order by:'
                  type="order"
                />
              </div>
              <div className="grow sm:min-w-[150px]">
                <Dropdown type="platform" />
              </div>
            </div>
            <div className="hidden lg:flex lg:gap-3 lg:items-center ml-auto">
              <DisplayOptions />
            </div>
          </div>

          <CardsSection
            order={order}
            platform={platform}
            mode={mode}
          />

          {/* <Suspense fallback={<div className="text-center text-2xl">
            <Icon
              name="loader-2"
              useSuspense={false}
              size={72}
              strokeWidth={1}
              className="animate-spin text-white/50 inline"
            />
          </div>}>
            <CardsSection
              order={order}
              platform={platform}
              mode={mode}
            />
          </Suspense> */}
        </div>
      </main>
    </>
  )
}
