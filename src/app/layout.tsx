import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Flow Jobs",
    template: "%s | Flow Jobs"
  },
  description: 'Find your dream developer job.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-[350px]`}>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
