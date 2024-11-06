import type { Metadata } from 'next'
import Sidebar from '@/app/_components/Sidebar'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Next Steam',
  description: 'The biggest Video Game Database'
}

type Props = {
  children: React.ReactNode
  params: { name: string }
}

export default async function GameLayout({
  children,
  params: { name }
}: Props) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/games?name=${name}`
  )
  const game = await res.json()

  return (
    <div className="max-w-lg mx-auto lg:max-w-none xl:max-w-[944px]">
      <Image
        src={game.background_image}
        alt={game.name}
        width={400}
        height={200}
        priority={true}
        className="rounded absolute top-0 inset-x-0 -z-10 object-cover opacity-[0.22] w-full h-72 lg:h-[500px]"
        style={{
          maskImage:
            'linear-gradient(to bottom, #000000,#50509d 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000000,#50509d 80%, transparent)'
        }}
      />

      {children}
    </div>
  )
}
