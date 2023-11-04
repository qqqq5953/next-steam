import Searchbar from '@/app/_components/Searchbar'
import Menu from '@/components/global/Menu'
import Link from 'next/link'

export default function Navbar() {

  // fetch(
  //   `https://api.rawg.io/api/games?page=1&search=grand&key=04fd56d2bfc34a73964433ff1117f1d1`
  // )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log('res', res)
  //   })

  // fetch(
  //   `https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af`
  // )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log('res', res)
  //   })

  return (
    <nav className="flex justify-between items-center gap-x-6">
      <h1 className="font-black tracking-[0.2em] text-lg">
        <Link href="/">STEAM</Link>
      </h1>
      <div className="relative grow">
        <Searchbar
        />
      </div>
      <Menu />
    </nav>
  )
}
