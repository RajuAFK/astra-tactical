'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ScanlineOverlay from '@/components/ui/ScanlineOverlay'

function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HeroSection() {
  const shouldReduce = useReducedMotion()
  const dur = shouldReduce ? 0 : 1
  const delay = shouldReduce ? 0 : 0.4

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center" aria-label="Hero section" style={{ background: '#0A0A0A' }}>
      {/* Video background */}
      {/* REPLACE: add hero.mp4 field footage here */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
        src="/videos/hero.mp4"
        aria-label="Astra Tactical field footage background video"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.75) 100%)' }}
        aria-hidden="true"
      />

      {/* Scanlines */}
      <ScanlineOverlay />

      {/* Screen frame — black bars top/bottom with chamfered X-corners sit over the video */}
      {/* CSS background-image preserves PNG transparency so video shows through center */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/screen-frame.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Center hero content */}
      <motion.div
        className="relative z-20 text-center px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, delay: delay }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 'clamp(56px, 11vw, 110px)',
            fontWeight: 900,
            color: '#ff5722',
            letterSpacing: '0.15em',
            lineHeight: 1,
          }}
        >
          ASTRA
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-orbitron)',
            fontSize: 'clamp(36px, 7vw, 72px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.85)',
            letterSpacing: '0.3em',
            lineHeight: 1,
          }}
        >
          TACTICAL
        </div>

        <div
          style={{ width: '100px', borderTop: '1px solid rgba(255,87,34,0.5)', margin: '20px auto' }}
          aria-hidden="true"
        />

        <p
          style={{
            fontFamily: 'var(--font-rajdhani)',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          India&apos;s First Airsoft Ecosystem
        </p>

        <div style={{ height: '28px' }} />

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#comparison"
            aria-label="Enter briefing room"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '12px',
              background: '#ff5722',
              color: '#ffffff',
              padding: '13px 28px',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 700,
            }}
          >
            ENTER BRIEFING ROOM
          </a>
          <Link
            href="/legal"
            aria-label="View legal status"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '12px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              color: '#ffffff',
              padding: '13px 28px',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            VIEW LEGAL STATUS
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
