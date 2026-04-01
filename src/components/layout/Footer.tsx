'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Footer email registered:', email)
    setEmail('')
  }

  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(207,255,85,0.15)',
        padding: '48px 24px',
      }}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '18px',
                  color: '#CFFF55',
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
            </div>
            <p
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '14px',
                color: '#8A8A8A',
                marginBottom: '16px',
              }}
            >
              India&apos;s First Airsoft Ecosystem
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Astra Tactical on Instagram"
                style={{ color: '#8A8A8A', transition: 'color 0.2s' }}
                className="hover:text-phosphor"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Astra Tactical on YouTube"
                style={{ color: '#8A8A8A', transition: 'color 0.2s' }}
                className="hover:text-phosphor"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: '10px',
                color: '#CFFF55',
                opacity: 0.6,
                letterSpacing: '0.15em',
                marginBottom: '16px',
              }}
            >
              NAVIGATION
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {[
                { label: 'ABOUT', href: '/#about' },
                { label: 'THE SPORT', href: '/#comparison' },
                { label: 'LEGAL', href: '/legal' },
                { label: 'STORE', href: '/store' },
              ].map((link) => (
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
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: '10px',
                color: '#CFFF55',
                opacity: 0.6,
                letterSpacing: '0.15em',
                marginBottom: '16px',
              }}
            >
              REGISTER INTEREST
            </p>
            <p
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '14px',
                color: '#8A8A8A',
                marginBottom: '16px',
              }}
            >
              Be first to receive field invites and gear drops.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-0" aria-label="Email registration form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Your email address"
                style={{
                  flex: 1,
                  background: 'transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: '1px solid rgba(207,255,85,0.3)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '14px',
                  outline: 'none',
                  padding: '8px 0',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#CFFF55'
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(207,255,85,0.3)'
                }}
              />
              <button
                type="submit"
                aria-label="Submit email registration"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '11px',
                  background: '#CFFF55',
                  color: '#ffffff',
                  padding: '8px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                  borderRadius: 0,
                }}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '11px',
              color: '#8A8A8A',
            }}
          >
            © 2025 ASTRA TACTICAL. INDIA.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#8A8A8A',
              opacity: 0.5,
            }}
          >
            Disclaimer: Sport equipment compliant with Indian Arms Act 1959.
          </span>
        </div>
      </div>
    </footer>
  )
}
