'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT   = '#CFFF55'
const MONO     = 'var(--font-space-mono)'
const ORB      = 'var(--font-orbitron)'
const RAJ      = 'var(--font-rajdhani)'
const BORDER   = 'rgba(255,255,255,0.08)'

const navLinks = [
  { label: 'ABOUT',     href: '/#about' },
  { label: 'THE SPORT', href: '/the-sport' },
  { label: 'SERVICES',  href: '/services' },
  { label: 'LEGAL',     href: '/legal' },
  { label: 'STORE',     href: '/store' },
]

const INTEREST_OPTIONS = [
  { value: 'player',    label: 'Player',    sub: 'I want to join & play' },
  { value: 'store',     label: 'Store',     sub: 'I want to shop for gear' },
  { value: 'franchise', label: 'Franchise', sub: 'I want to operate a field' },
]

// ─── Register Interest Form ───────────────────────────────────────────────────

function RegisterForm({ onClose }: { onClose: () => void }) {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [interest, setInterest] = useState('player')
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('astra_registered_interest').insert({
      name,
      email,
      interest_type: interest,
    })
    setLoading(false)
    setDone(true)
    setTimeout(onClose, 2800)
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '24px 0' }}
      >
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: `${ACCENT}18`, border: `1px solid ${ACCENT}55`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Check size={20} color={ACCENT} />
        </div>
        <p style={{ fontFamily: MONO, fontSize: '11px', color: ACCENT, letterSpacing: '0.18em', textAlign: 'center' }}>
          REGISTERED.<br />WE&apos;LL BRIEF YOU SOON.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
          NAME
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full name"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${BORDER}`,
            borderRadius: 2,
            padding: '9px 12px',
            color: '#fff',
            fontFamily: RAJ,
            fontSize: '14px',
            outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = `${ACCENT}55`)}
          onBlur={e  => (e.target.style.borderColor = BORDER)}
        />
      </div>

      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
          EMAIL
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${BORDER}`,
            borderRadius: 2,
            padding: '9px 12px',
            color: '#fff',
            fontFamily: RAJ,
            fontSize: '14px',
            outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = `${ACCENT}55`)}
          onBlur={e  => (e.target.style.borderColor = BORDER)}
        />
      </div>

      {/* Interest type */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
          TYPE OF INTEREST
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {INTEREST_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setInterest(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px',
                background: interest === opt.value ? `${ACCENT}0F` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${interest === opt.value ? `${ACCENT}55` : BORDER}`,
                borderRadius: 2,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              {/* Radio dot */}
              <span style={{
                width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                border: `1px solid ${interest === opt.value ? ACCENT : 'rgba(255,255,255,0.25)'}`,
                background: interest === opt.value ? ACCENT : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {interest === opt.value && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#000' }} />}
              </span>
              <span>
                <span style={{ fontFamily: ORB, fontSize: '11px', color: '#fff', display: 'block', letterSpacing: '0.04em' }}>
                  {opt.label}
                </span>
                <span style={{ fontFamily: RAJ, fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.02em' }}>
                  {opt.sub}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 4,
          padding: '11px 0',
          background: loading ? `${ACCENT}88` : ACCENT,
          border: 'none',
          borderRadius: 2,
          color: '#080808',
          fontFamily: ORB,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          cursor: loading ? 'default' : 'pointer',
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? 'SUBMITTING…' : 'SUBMIT INTEREST'}
      </button>
    </form>
  )
}

// ─── Desktop dropdown panel ────────────────────────────────────────────────────

function DesktopPanel({ anchor, onClose }: { anchor: DOMRect; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Position: left-align with button, drop below it
  const top  = anchor.bottom + 8
  // Clamp so panel never bleeds off the right edge
  const panelW = 340
  const maxLeft = typeof window !== 'undefined' ? window.innerWidth - panelW - 12 : 0
  const left = Math.min(anchor.left, maxLeft)

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Register Interest form"
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top,
        left,
        width: panelW,
        background: '#1A1A1A',
        border: `1px solid rgba(255,255,255,0.1)`,
        borderTop: `2px solid ${ACCENT}`,
        borderRadius: '0 0 4px 4px',
        padding: '24px',
        zIndex: 200,
        boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <p style={{ fontFamily: MONO, fontSize: '9px', color: ACCENT, opacity: 0.7, letterSpacing: '0.2em', marginBottom: 4 }}>
            // JOIN THE MISSION
          </p>
          <h2 style={{ fontFamily: ORB, fontSize: '16px', color: '#fff', fontWeight: 700 }}>
            REGISTER INTEREST
          </h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close panel"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: 2, flexShrink: 0 }}
        >
          <X size={16} />
        </button>
      </div>

      <RegisterForm onClose={onClose} />
    </motion.div>
  )
}

// ─── Mobile bottom sheet ──────────────────────────────────────────────────────

function MobileSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 199 }}
      />

      {/* Sheet */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Register Interest"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          background: '#1A1A1A',
          borderRadius: '16px 16px 0 0',
          borderTop: `2px solid ${ACCENT}`,
          padding: '0 24px 40px',
          zIndex: 200,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 18px' }}>
          <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.18)', borderRadius: 2 }} />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', color: ACCENT, opacity: 0.7, letterSpacing: '0.2em', marginBottom: 4 }}>
            // JOIN THE MISSION
          </p>
          <h2 style={{ fontFamily: ORB, fontSize: '20px', color: '#fff', fontWeight: 700 }}>
            REGISTER INTEREST
          </h2>
          <p style={{ fontFamily: RAJ, fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: 6 }}>
            Be first to receive field invites, gear drops, and launch details.
          </p>
        </div>

        <RegisterForm onClose={onClose} />
      </motion.div>
    </>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [registerOpen,  setRegisterOpen]  = useState(false)
  const [anchor,        setAnchor]        = useState<DOMRect | null>(null)
  const [isMobile,      setIsMobile]      = useState(false)

  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const openRegister = () => {
    if (btnRef.current) setAnchor(btnRef.current.getBoundingClientRect())
    setRegisterOpen(true)
    setMobileOpen(false)
  }

  const closeRegister = () => {
    setRegisterOpen(false)
    setAnchor(null)
  }

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
        {/* ── Desktop: 3-column grid ── */}
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
            <button
              ref={btnRef}
              onClick={openRegister}
              aria-expanded={registerOpen}
              aria-haspopup="dialog"
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#080808',
                background: registerOpen ? `${ACCENT}cc` : ACCENT,
                padding: '7px 16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
              className="hover:opacity-80"
            >
              REGISTER INTEREST
            </button>
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

      {/* Mobile overlay nav */}
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

            {/* Register Interest — opens bottom sheet */}
            <button
              onClick={openRegister}
              style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#080808',
                background: ACCENT,
                padding: '10px 28px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              REGISTER INTEREST
            </button>
          </nav>
        </div>
      )}

      {/* Register Interest panel / sheet */}
      <AnimatePresence>
        {registerOpen && anchor && !isMobile && (
          <DesktopPanel key="desktop-panel" anchor={anchor} onClose={closeRegister} />
        )}
        {registerOpen && isMobile && (
          <MobileSheet key="mobile-sheet" onClose={closeRegister} />
        )}
      </AnimatePresence>
    </>
  )
}
