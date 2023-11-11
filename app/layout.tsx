import Navbar from '@/components/global/Navbar'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Steam',
  description: 'The biggest Video Game Database'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`px-4 py-16 mx-auto lg:px-10 lg:py-20 bg-[#181818] text-slate-100 max-w-[1920px] ${inter.className}`}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
