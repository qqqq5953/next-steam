import React from 'react'

type Props = {
  params: { details: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Details({ params: { details }, searchParams }: Props) {
  return (
    <div>slug:{details}</div>
  )
}
