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
        className={`p-4 mx-auto lg:p-10 bg-black text-slate-50 ${inter.className}`}
      >
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
