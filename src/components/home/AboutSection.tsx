'use client'

import { motion } from 'framer-motion'
import HUDFrame from '@/components/ui/HUDFrame'

function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const stats = [
  { value: '<2J', label: 'ENERGY THRESHOLD' },
  { value: '6mm', label: 'PROJECTILE SIZE' },
  { value: 'LEGAL', label: 'SPORT EQUIPMENT' },
  { value: 'HYD', label: 'HOME BASE' },
]

export default function AboutSection() {
  const shouldReduce = useReducedMotion()
  const dur = shouldReduce ? 0 : 0.6

  return (
    <section
      id="about"
      style={{ background: '#0A0A0A', padding: '96px 24px' }}
      aria-label="About Astra Tactical"
    >
      <div className="max-w-7xl mx-auto">
        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Left: 60% */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: dur }}
          >
            <p
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: '11px',
                color: '#ff5722',
                opacity: 0.6,
                letterSpacing: '0.2em',
                marginBottom: '24px',
              }}
            >
              // WHO WE ARE
            </p>
            <div aria-hidden="true">
              <div
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(40px, 8vw, 72px)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,87,34,0.4)',
                  lineHeight: 1,
                  letterSpacing: '0.05em',
                }}
              >
                ASTRA
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(40px, 8vw, 72px)',
                  color: '#ff5722',
                  lineHeight: 1,
                  letterSpacing: '0.05em',
                }}
              >
                TACTICAL
              </div>
            </div>
            <div
              style={{
                width: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, #ff5722, transparent)',
                margin: '24px 0',
              }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Right: 40% */}
          <motion.div
            className="md:col-span-2 flex flex-col justify-center gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: dur, delay: shouldReduce ? 0 : 0.2 }}
          >
            {[
              "Astra Tactical was founded to build what India has never had — a legitimate, structured, and legally compliant airsoft ecosystem. We believe in sport over stigma, and precision over prejudice.",
              "Airsoft in India exists in a legal grey area not because the sport is dangerous, but because awareness is absent. We're here to change that — one briefing at a time.",
              "From gear sourcing and field design to community building and legal education — Astra Tactical is the first full-stack airsoft operator in India.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '16px',
                  color: '#8A8A8A',
                  lineHeight: 1.8,
                }}
              >
                {para}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Stat cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: dur, delay: shouldReduce ? 0 : 0.3 }}
        >
          {stats.map((stat) => (
            <HUDFrame key={stat.label} glowIntensity="low">
              <div className="text-center py-2">
                <div
                  style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '32px',
                    color: '#ff5722',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '10px',
                    color: '#8A8A8A',
                    letterSpacing: '0.1em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </HUDFrame>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
