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
import Icon from '@/components/global/Icon'
import { orderOptions, platformOptions } from '@/lib/dropdownOptions'

type Option = {
  name: string
  value: string
  children?: Option[]
}

type Props = {
  selectedValuePrefix?: string
  type: string
}

export default memo(function Dropdown({ selectedValuePrefix, type }: Props) {
  console.log('type')

  const options: Option[] = type === 'order' ? orderOptions : platformOptions

  const [selectedValue, setSelectedValue] = useState<string>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(type) || options[0].name

  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLElement
    const newValue = target.textContent as string

    const queryStrings = searchParams.toString()
    const newSearchParams = new URLSearchParams(queryStrings)
    newSearchParams.set(type, newValue)

    router.push(`?${newSearchParams}`)

    setSelectedValue(newValue)
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
          <Icon name="chevron-down" size={22} className="text-neutral-500" />
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
                      className={`hover:bg-neutral-200/80 ${initialValue === option.name
                        ? 'font-bold pointer-events-none'
                        : 'w-full'
                        }`}
                    >
                      {option.name}
                    </DropdownMenuItem>
                    {option.children.map((childOption) => {
                      return (
                        <DropdownMenuItem key={childOption.name} onClick={(e) => handleClick(e)}
                          className={`hover:bg-neutral-200/80  ${initialValue === childOption.name
                            ? 'font-bold pointer-events-none'
                            : 'w-full'
                            }`}>
                          {childOption.name}
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem key={option.name} onClick={(e) => handleClick(e)}
                className={`hover:bg-neutral-200/80 ${[selectedValue, initialValue].includes(option.name)
                  ? 'font-bold pointer-events-none'
                  : 'w-full'
                  }`}>
                {option.name}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
