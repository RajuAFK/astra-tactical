import type { Metadata } from 'next'
import { Orbitron, Space_Mono, Rajdhani, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TacticalBackground from '@/components/ui/TacticalBackground'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Astra Tactical | India's First Airsoft Ecosystem",
  description:
    "Building India's first legal, structured airsoft sport ecosystem. Learn airsoft laws in India, compare equipment energy, and gear up.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceMono.variable} ${rajdhani.variable} ${barlowCondensed.variable}`}
    >
      <body style={{ fontFamily: 'var(--font-rajdhani), sans-serif' }}>
        <TacticalBackground />
        <div
          className="animate-scanpulse fixed top-0 left-0 right-0 z-[60] h-[2px]"
          style={{ backgroundColor: '#CFFF55' }}
          aria-hidden="true"
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
