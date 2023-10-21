'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/components/base-ui/DropdownMenu'
import { Button } from '@/components/base-ui/Button'

import { useState, MouseEvent, memo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Icon from "@/components/global/Icon"

type Option = {
  name: string
  value: string
  children?: Option[]
}

type Props = {
  selectedValuePrefix?: string
  type: string
}

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

export default memo(function Dropdown({
  selectedValuePrefix,
  type
}: Props) {
  const options: Option[] = type === 'order' ? orderOptions : platformOptions

  const [selectedValue, setSelectedValue] = useState<string>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(type) || options[0].name

  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLElement
    const newValue = target.textContent as string
    setSelectedValue(newValue)
    const queryStrings = searchParams.toString()
    const newSearchParams = new URLSearchParams(queryStrings)
    newSearchParams.set(type, newValue)

    router.push(`?${newSearchParams}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center border-none bg-neutral-800/90 w-full text-xs sm:text-sm hover:text-neutral-400 transition-colors duration-300">
          <span className="shrink-0 font-light">{selectedValuePrefix}</span>
          <span
            className={`${selectedValuePrefix ? 'ml-1' : 'mx-0'} mr-2 md:mr-8`}
          >
            {selectedValue || initialValue}
          </span>
          <Icon name="chevron-down" size={22} className='text-neutral-500' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white text-black sm:min-w-[150px]">
        <DropdownMenuGroup>
          {options.map((option) => {
            return option.children ? (
              <DropdownMenuSub key={option.name}>
                <DropdownMenuSubTrigger>
                  <span>{option.name}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className=" bg-white text-black">
                    <DropdownMenuItem
                      onClick={(e) => handleClick(e)}
                      className={`${initialValue === option.name
                        ? 'font-bold pointer-events-none'
                        : 'w-full'
                        }`}
                    >
                      {option.name}
                    </DropdownMenuItem>
                    {option.children.map((childOption) => {
                      return (
                        <DropdownMenuItem key={childOption.name}>
                          <span
                            onClick={(e) => handleClick(e)}
                            className={`${initialValue === childOption.name
                              ? 'font-bold pointer-events-none'
                              : 'w-full'
                              }`}
                          >
                            {childOption.name}
                          </span>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem key={option.name}>
                <div
                  onClick={(e) => handleClick(e)}
                  className={`${initialValue === option.name
                    ? 'font-bold pointer-events-none'
                    : 'w-full'
                    }`}
                >
                  {option.name}
                </div>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
