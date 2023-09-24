// 'use client'

import useFetch from '@/hooks/useFetch'
import React from 'react'

type Props = {
    promise: Promise<any | null>
}

export default async function Video({ promise }: Props) {
    // function get
    // const { data, error } = isLoading ? await useFetch('https://jsonplaceholder.typicode.com/posts/1') : { data: { id: 100 }, error: null }



    const { data, error } = await promise

    console.log('data', data);
    // console.log('promise', promise);


    return (
        // <div className='absolute top-0 bg-blue-300 z-20'>{trailer}</div>
        <div></div>
    )
}
