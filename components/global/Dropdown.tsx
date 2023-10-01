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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { useState, MouseEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Option = {
  name: string
  value: string
  children?: Option[]
}

type Props = {
  selectedValuePrefix?: string
  options: Option[]
  type: string
}

export default function Dropdown({
  selectedValuePrefix,
  options,
  type
}: Props) {
  console.log('renfer')

  const [selectedValue, setSelectedValue] = useState<string>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(type) || options[0].name

  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLElement
    const newValue = target.textContent as string
    console.log('newValue', newValue)
    setSelectedValue(newValue)

    const queryStrings = searchParams.toString()
    const newSearchParams = new URLSearchParams(queryStrings)
    newSearchParams.set(type, newValue)

    router.push(`?${newSearchParams}`)
    console.log('push', newValue)
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
          <FontAwesomeIcon icon={faAngleDown} className="text-neutral-500" />
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
                      className={`${
                        initialValue === option.name
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
                            className={`${
                              initialValue === childOption.name
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
                  className={`${
                    initialValue === option.name
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
}
