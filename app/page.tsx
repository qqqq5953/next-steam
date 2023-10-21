import useFetch from '@/hooks/useFetch'

import Dropdown from '@/components/global/Dropdown'
import DisplayOptions from '@/app/_components/DisplayOptions'
import CardsSection from '@/app/_components/CardsSection'
import Sidebar from '@/app/_components/Sidebar'
import { Suspense } from 'react'
import Icon from '@/components/global/Icon'

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default async function Home({ searchParams }: Props) {
  const { order, platform, mode } = searchParams
  // const { data, error } = await useFetch(
  //   'https://jsonplaceholder.typicode.com/posts/1'
  // )

  // 先打官網的
  // https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af

  // const { data, error } = await useFetch(
  //   `https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=4&page=1&key=c542e67aec3a4340908f9de9e86038af`
  // )

  // console.log(data);

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

          {/* <CardsSection
            order={order}
            platform={platform}
            mode={mode}
          /> */}

          <Suspense fallback={<div className="text-center text-2xl">
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
          </Suspense>
        </div>
      </main>
    </>
  )
}
