'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/base-ui/select'

import { useState } from 'react'

type Option = {
  name: string
  value: string
}

type Props = {
  selectedValuePrefix?: string
  options: Option[]
}

export default function CustomSelect({ selectedValuePrefix, options }: Props) {
  const [order, setOrder] = useState(options[0].name)

  return (
    <>
      <Select onValueChange={(val) => setOrder(val)}>
        <SelectTrigger className="w-[180px]">
          {selectedValuePrefix}
          <div className="font-bold tracking-wide">
            <SelectValue placeholder={order} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem value={option.value} key={option.value}>
                {option.name}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </>
  )
}
