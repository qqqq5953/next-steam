'use client'

import { usePathname } from 'next/navigation'

import Searchbar from '@/components/global/Searchbar'
import Menu from '@/components/global/Menu'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className={`flex justify-between items-center gap-x-6 p-4 lg:px-10 lg:py-8 ${pathname.startsWith('/games') ? "relative -my-16 lg:-my-20" : 'fixed top-0 inset-x-0 z-[60] bg-[#181818]/50 backdrop-blur-md'}`}>
      <h1 className="font-black tracking-[0.2em] text-lg">
        <Link href="/">STEAM</Link>
      </h1>
      <div className="grow lg:max-w-3xl">
        <Searchbar
        />
      </div>

      <div className='xl:hidden'>
        <Menu />
      </div>
      <ul className='hidden xl:flex xl:items-center xl:gap-4 xl:text-sm'>
        <li className='border-b-2 border-transparent hover:border-current'>
          <Link href="https://rawg.io/apidocs">API</Link>
        </li>
        <li className='border-b-2 border-transparent hover:border-current'>
          <Link href="https://discord.com/invite/erNybDp">DISCORD</Link>
        </li>
        <li className='border-b-2 border-transparent hover:border-current'>
          <Link href="https://twitter.com/rawgtheworld">TWITTER</Link>
        </li>
      </ul>
    </nav>
  )
}
