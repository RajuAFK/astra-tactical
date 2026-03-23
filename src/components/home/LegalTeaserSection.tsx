'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import HUDFrame from '@/components/ui/HUDFrame'

function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function LegalTeaserSection() {
  const shouldReduce = useReducedMotion()
  const dur = shouldReduce ? 0 : 0.6

  return (
    <section
      style={{ background: '#080808', padding: '80px 24px' }}
      aria-label="Legal status overview"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '11px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '12px',
            }}
          >
            // LEGAL STATUS: INDIA
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '28px',
              color: '#ffffff',
            }}
          >
            Understanding the Rules
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ maxWidth: '900px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dur }}
        >
          {/* Card 1 */}
          <HUDFrame label="OVERVIEW">
            <div style={{ padding: '8px 0' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '16px',
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                Airsoft in India — The Legal Reality
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '15px',
                  color: '#8A8A8A',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                }}
              >
                Under the Arms Act 1959, any device capable of propelling a projectile exceeding 2 joules of energy is classified as a firearm. Airsoft guns, firing 6mm BBs at under 2J, fall outside this definition — making them legal as sports equipment.
              </p>
              <Link
                href="/legal"
                aria-label="Read the full legal brief for airsoft in India"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '11px',
                  color: '#ff5722',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                READ FULL BRIEF →
              </Link>
            </div>
          </HUDFrame>

          {/* Card 2 */}
          <HUDFrame label="RULES">
            <div style={{ padding: '8px 0' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '16px',
                  color: '#ffffff',
                  marginBottom: '12px',
                }}
              >
                What You Can and Cannot Do
              </h3>
              <div className="space-y-2 mb-4">
                {[
                  'Use on private land with permission',
                  'Purchase and own for sport',
                  'Transport in a closed, non-threatening container',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: '11px',
                        color: '#ff5722',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-rajdhani)',
                        fontSize: '14px',
                        color: '#8A8A8A',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
                {[
                  'Carry openly in public spaces',
                  'Modify beyond manufacturer specifications',
                  'Remove or cover the orange tip indicator',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span
                      style={{
                        fontFamily: 'var(--font-space-mono)',
                        fontSize: '11px',
                        color: '#EF4444',
                        flexShrink: 0,
                      }}
                    >
                      ✗
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-rajdhani)',
                        fontSize: '14px',
                        color: '#8A8A8A',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/legal"
                aria-label="Read the full legal brief for airsoft rules"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '11px',
                  color: '#ff5722',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                READ FULL BRIEF →
              </Link>
            </div>
          </HUDFrame>
        </motion.div>
      </div>
    </section>
  )
}
