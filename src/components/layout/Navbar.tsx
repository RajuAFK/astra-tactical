'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'THE SPORT', href: '/#comparison' },
  { label: 'SERVICES', href: '/services' },
  { label: 'LEGAL', href: '/legal' },
  { label: 'STORE', href: '/store' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-[2px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(207,255,85,0.15)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="w-full px-6 py-3 flex items-center">
          {/* Logo + Logotype */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Astra Tactical home">
            <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0 }}>
              <Image
                src="/logos/logo-3d.png"
                alt="Astra Tactical logo"
                fill
                sizes="52px"
                style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
              />
            </div>
            <div style={{ position: 'relative', height: '52px', width: '130px', flexShrink: 0 }}>
              <Image
                src="/logos/logotype.png"
                alt="Astra Tactical"
                fill
                sizes="130px"
                style={{ objectFit: 'contain', objectPosition: 'left center', mixBlendMode: 'screen' }}
              />
            </div>
          </Link>

          {/* Desktop nav — pushed to the right */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#8A8A8A',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                className="hover:text-white"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 ml-auto"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
            <span className="block w-5 h-0.5 bg-white" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] grid-bg flex flex-col items-center justify-center"
          style={{ background: '#0A0A0A' }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <button
            className="absolute top-6 right-6 text-2xl"
            style={{ color: '#8A8A8A', fontFamily: 'var(--font-space-mono)' }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile menu"
          >
            ✕
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '24px',
                  color: '#ffffff',
                  letterSpacing: '0.15em',
                }}
                onClick={() => setMobileOpen(false)}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
