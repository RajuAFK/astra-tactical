'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'THE SPORT', href: '/the-sport' },
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
        {/* ── Desktop: 3-column grid for true centering ── */}
        <div
          className="hidden md:grid w-full px-6 py-3"
          style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px' }}
        >
          {/* Left: action buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/mission-control"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '7px 16px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }}
              className="hover:border-white"
              aria-label="Open Mission Control"
            >
              MISSION CONTROL
            </Link>
            <Link
              href="/#about"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#080808',
                background: '#CFFF55',
                padding: '7px 16px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
              className="hover:opacity-80"
              aria-label="Register your interest"
            >
              REGISTER INTEREST
            </Link>
          </div>

          {/* Center: logo + logotype */}
          <Link href="/" className="flex items-center gap-3" aria-label="Astra Tactical home">
            <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
              <Image
                src="/logos/logo-3d.png"
                alt="Astra Tactical logo"
                fill
                sizes="64px"
                style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
              />
            </div>
            <div style={{ position: 'relative', height: '64px', width: '160px', flexShrink: 0 }}>
              <Image
                src="/logos/logotype.png"
                alt="Astra Tactical"
                fill
                sizes="160px"
                style={{ objectFit: 'contain', objectPosition: 'left center', mixBlendMode: 'screen' }}
              />
            </div>
          </Link>

          {/* Right: nav links */}
          <div className="flex items-center gap-6 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#8A8A8A',
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                className="hover:text-white"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile: logo left, hamburger right ── */}
        <div className="md:hidden w-full px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Astra Tactical home">
            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
              <Image
                src="/logos/logo-3d.png"
                alt="Astra Tactical logo"
                fill
                sizes="44px"
                style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
              />
            </div>
            <div style={{ position: 'relative', height: '44px', width: '110px' }}>
              <Image
                src="/logos/logotype.png"
                alt="Astra Tactical"
                fill
                sizes="110px"
                style={{ objectFit: 'contain', objectPosition: 'left center', mixBlendMode: 'screen' }}
              />
            </div>
          </Link>

          <button
            className="flex flex-col gap-1 p-2"
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
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

          <nav className="flex flex-col items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '22px',
                  color: '#ffffff',
                  letterSpacing: '0.15em',
                  textDecoration: 'none',
                }}
                onClick={() => setMobileOpen(false)}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Action buttons in mobile menu */}
            <div style={{ width: '1px', height: '1px', margin: '8px 0', background: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
            <Link
              href="/mission-control"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '10px 28px',
                textDecoration: 'none',
              }}
              onClick={() => setMobileOpen(false)}
            >
              MISSION CONTROL
            </Link>
            <Link
              href="/#about"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#080808',
                background: '#CFFF55',
                padding: '10px 28px',
                textDecoration: 'none',
              }}
              onClick={() => setMobileOpen(false)}
            >
              REGISTER INTEREST
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
