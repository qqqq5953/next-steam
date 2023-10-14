import React from 'react'

type Props = {
  params: { name: string }
}

export default function Creators({ params: { name } }: Props) {
  return (
    <div>name:{name}</div>
  )
}
