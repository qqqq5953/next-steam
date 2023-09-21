'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/base-ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

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

export default function CustomSelect({
  selectedValuePrefix,
  options,
  type
}: Props) {
  const initialValue = options[0].name
  const router = useRouter()
  const searchParams = useSearchParams()

  function setFilter(newValue: string) {
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
    <Select onValueChange={(newValue) => setFilter(newValue)}>
      <SelectTrigger className="w-full border-none bg-neutral-800/90">
        <span className="shrink-0 mr-1 text-xs text-slate-300">
          {selectedValuePrefix}
        </span>
        <div>
          <SelectValue placeholder={initialValue} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white text-black">
        {options.map((option) => {
          return (
            <SelectItem value={option.value} key={option.value}>
              {option.name}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
