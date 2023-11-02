import reddits from '@/source/game_reddit.json'
import Link from 'next/link';

import React from 'react'

export default function Reddit() {
  // const res = await fetch(`https://api.rawg.io/api/games/${name}/reddit?page_size=5&key=${process.env.RAWG_API_KEY}`)

  // const reddits = await res.json()
  // console.log('reddits', reddits);

  function replaceText(text: string) {
    return text.replace(/&#8217;|<p>|<\/p>/g, function (matched: string) {
      switch (matched) {
        case '&#8217;':
          return "'";
        default:
          return '';
      }
    });
  }

  return (
    <section className='space-y-8 divide divide-y-[0.5px] divide-neutral-700'>
      {reddits.results.map(reddit => {
        const text = replaceText(reddit.text.substring(3, 375))

        return <div key={reddit.id} className='pt-8 first-of-type:pt-0'>
          <h3 className='text-2xl font-semibold pb-4 link-style hover:brightness-75'>
            <Link href={reddit.url} target='blank'>{reddit.name}</Link>
          </h3>
          <div>{text}...</div>
        </div>
      })}
    </section>
  )
}

