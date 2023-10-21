'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/base-ui/Select'
import { useRouter, useSearchParams } from 'next/navigation'
import { memo } from 'react'
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

export default memo(function CustomSelect({
  selectedValuePrefix,
  type
}: Props) {
  console.log('renfer')
  const options: Option[] = type === 'order' ? orderOptions : platformOptions

  const router = useRouter()
  const searchParams = useSearchParams()
  const initialValue = searchParams.get(type) || options[0].name

  function setFilter(newValue: string) {
    const queryString = searchParams.toString()
    const newSearchParams = new URLSearchParams(queryString)
    newSearchParams.set(type, newValue)

    router.push(`?${newSearchParams}`)
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
              <SelectItem
                value={option.name}
                className={`${initialValue === option.name ? 'font-bold' : ''
                  } pl-3`}
              >
                {option.name}
              </SelectItem>
            </div>
          )
        })}
      </SelectContent>
    </Select>
  )
})
