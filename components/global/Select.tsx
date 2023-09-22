'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/base-ui/select'
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

export default function CustomSelect({
  selectedValuePrefix,
  options,
  type
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(type) || options[0].name

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
            <div key={option.value}>
              <SelectItem value={option.name}>{option.name}</SelectItem>
            </div>
          )
        })}
      </SelectContent>
    </Select>
  )
}
