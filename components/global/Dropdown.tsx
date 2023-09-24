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

import { useState, MouseEvent, useRef, useEffect } from 'react'
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
  const [selectedValue, setSelectedValue] = useState<string>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(type) || options[0].name

  const wrapper = useRef<HTMLDivElement>(null)
  const [panelWidth, setPanelWidth] = useState('200px')

  useEffect(() => {
    setPanelWidth(`${wrapper.current!.offsetWidth}px`)
  }, [])

  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    const target = e.target as HTMLElement
    const newValue = target.textContent as string
    setSelectedValue(newValue)

    let queryString = searchParams.toString()

    if (!queryString) {
      // add first
      queryString += `${type}=${newValue}`
    } else if (!searchParams.has(type)) {
      // attach
      queryString += `&${type}=${newValue}`
    } else {
      // replace
      queryString = Array.from(searchParams.entries())
        .map(([key, value]) => {
          if (key === type) {
            return `${key}=${newValue}`
          } else {
            return `${key}=${value}`
          }
        })
        .join('&')
    }

    router.push(`?${queryString}`)
  }

  return (
    <div
      ref={wrapper}
      onClick={() => setPanelWidth(`${wrapper.current!.offsetWidth}px`)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center border-none bg-neutral-800/90 w-full text-xs sm:text-sm hover:text-neutral-400 transition-colors duration-300">
            <span className="shrink-0 font-light">
              {selectedValuePrefix}
            </span>
            <span className={`${selectedValuePrefix ? 'ml-1' : 'mx-0'} mr-2`}>
              {selectedValue || initialValue}
            </span>
            <FontAwesomeIcon icon={faAngleDown} className='text-neutral-500' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-white text-black"
          style={{
            minWidth: panelWidth
          }}
        >
          <DropdownMenuGroup>
            {options.map((option) => {
              return option.children ? (
                <DropdownMenuSub key={option.name}>
                  <DropdownMenuSubTrigger>
                    <span>{option.name}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className=" bg-white text-black">
                      <DropdownMenuItem onClick={(e) => handleClick(e)}>
                        {option.name}
                      </DropdownMenuItem>
                      {option.children.map((childOption) => {
                        return (
                          <DropdownMenuItem key={childOption.name}>
                            <span onClick={(e) => handleClick(e)}>
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
                  <span onClick={(e) => handleClick(e)}>{option.name}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
