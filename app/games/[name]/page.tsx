

import React from 'react'

type Props = {
    params: { name: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Games({ params: { name }, searchParams }: Props) {

    const { id } = searchParams
    console.log('id', id)

    // https://rawg.io/api/games/${id}

    return (
        <div>name: {decodeURIComponent(name)}</div>
    )
}
