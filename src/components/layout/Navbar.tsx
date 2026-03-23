'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'THE SPORT', href: '/#comparison' },
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
          borderBottom: scrolled ? '1px solid rgba(255,87,34,0.15)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2" aria-label="Astra Tactical home">
            <span
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: '18px',
                color: '#ff5722',
                fontWeight: 700,
                letterSpacing: '0.2em',
              }}
            >
              ASTRA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: '18px',
                color: '#ffffff',
                fontWeight: 400,
                letterSpacing: '0.2em',
              }}
            >
              TACTICAL
            </span>
            <span
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: '9px',
                color: '#ff5722',
                border: '1px solid rgba(255,87,34,0.4)',
                padding: '1px 4px',
                marginLeft: '8px',
              }}
            >
              [IN]
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '14px',
                  color: '#8A8A8A',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                className="hover:text-white"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#register"
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: '11px',
                color: '#ff5722',
                border: '1px solid #ff5722',
                padding: '6px 14px',
                letterSpacing: '0.1em',
                transition: 'background 0.2s',
              }}
              className="hover:bg-phosphor/10"
              aria-label="Register your interest"
            >
              REGISTER INTEREST
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
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
            <Link
              href="/#register"
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: '14px',
                color: '#ff5722',
                border: '1px solid #ff5722',
                padding: '10px 24px',
                letterSpacing: '0.15em',
              }}
              onClick={() => setMobileOpen(false)}
              aria-label="Register your interest"
            >
              REGISTER INTEREST
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
