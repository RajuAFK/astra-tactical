'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'
import Image from 'next/image'

function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const WEAPONS = {
  nerf: {
    name: 'Nerf Blaster',
    energyJ: 0.3,
    velocityMs: 25,
    massG: 1.0,
    legalStatus: 'UNRESTRICTED',
    accentColor: '#22C55E',
    classLabel: 'TOY CLASS',
    image: '/weapons/nerf-gun.png',
    description: 'Foam dart blasters fire ~1g darts at 25 m/s — well under the 20J Arms Act threshold and far less powerful than an airsoft gun.',
  },
  paintball: {
    name: 'Paintball Marker',
    energyJ: 15,
    velocityMs: 91,
    massG: 3.6,
    legalStatus: 'LICENSED — Regulated Equipment',
    accentColor: '#F59E0B',
    classLabel: 'RESTRICTED CLASS',
    image: '/weapons/paintball.png',
    description: 'Paintball markers can reach 12–17J depending on load and velocity. While under the 20J Arms Act energy threshold, paintball markers are regulated equipment requiring a license in India.',
  },
  airsoft: {
    name: 'Airsoft Replica',
    energyJ: 1.4,
    velocityMs: 120,
    massG: 0.2,
    legalStatus: 'LEGAL — Under 20J Threshold',
    accentColor: '#3B82F6',
    classLabel: 'SPORT CLASS',
    image: '/weapons/airsoft-gun.png',
    description: 'Airsoft fires 6mm plastic BBs at under 2 joules — well below the 20J Arms Act threshold. Legal as sport equipment under Indian law, no license required.',
  },
  airgun: {
    name: 'Airgun',
    energyJ: 18,
    velocityMs: 200,
    massG: 0.9,
    legalStatus: 'BORDERLINE — Often Exceeds 20J',
    accentColor: '#F59E0B',
    classLabel: 'RESTRICTED CLASS',
    image: '/weapons/airgun.png',
    description: 'Airguns typically operate at 15–20J and frequently exceed the 20J Arms Act threshold. Units above 20J legally require a government-issued arms license.',
  },
  firearm: {
    name: '9mm Service Pistol',
    energyJ: 510,
    velocityMs: 370,
    massG: 7.5,
    legalStatus: 'LICENSED ONLY — Arms Act 1959',
    accentColor: '#EF4444',
    classLabel: 'FIREARMS CLASS',
    image: '/weapons/firearm.png',
    description: 'A 9mm round delivers ~510J — over 25× the 20J Arms Act threshold. A government-issued arms license is mandatory.',
  },
}

function logScale(energyJ: number): number {
  return (Math.log10(energyJ + 1) / Math.log10(511)) * 100
}

export default function WeaponComparisonSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const [arcPct, setArcPct] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (!selected) return
    setArcPct(0)
    const t = setTimeout(() => {
      setArcPct(logScale(WEAPONS[selected as keyof typeof WEAPONS].energyJ))
    }, 80)
    return () => clearTimeout(t)
  }, [selected])

  const weapon = selected ? WEAPONS[selected as keyof typeof WEAPONS] : null

  return (
    <section
      id="comparison"
      className="w-full relative"
      style={{ background: '#080808', padding: '96px 24px' }}
      aria-label="Weapon energy comparison"
    >
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.15 }} aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: '#CFFF55', opacity: 0.7, letterSpacing: '0.2em', marginBottom: '10px' }}>
            // ENERGY COMPARISON MODULE
          </p>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(20px, 4vw, 34px)', color: '#ffffff', marginBottom: '10px' }}>
            What Kind of Power Are We Actually Talking About?
          </h2>
          <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '16px', color: '#8A8A8A' }}>
            Select a device to compare its muzzle energy against a standard airsoft gun.
          </p>
        </div>

        {/* Main layout: selector left, circular display right */}
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">

          {/* Weapon selector — vertical stack */}
          <div className="flex flex-row lg:flex-col gap-3 flex-wrap justify-center" role="radiogroup" aria-label="Select weapon type">
            {Object.entries(WEAPONS).map(([key, w]) => {
              const isSelected = selected === key
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  aria-label={`Select ${w.name}`}
                  aria-pressed={isSelected}
                  style={{
                    background: isSelected ? `${w.accentColor}14` : '#111111',
                    border: `1px solid ${isSelected ? w.accentColor : 'rgba(255,255,255,0.08)'}`,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    borderRadius: 0,
                    minWidth: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {/* Weapon thumbnail */}
                  <div style={{ position: 'relative', width: '48px', height: '48px', flexShrink: 0, background: '#0a0a0a', borderRadius: '50%' }}>
                    <Image
                      src={w.image}
                      alt={w.name}
                      fill
                      sizes="48px"
                      style={{ objectFit: 'contain', mixBlendMode: 'screen', padding: '4px' }}
                    />
                  </div>
                  {/* Text info */}
                  <div>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '9px', color: w.accentColor, letterSpacing: '0.15em', marginBottom: '4px' }}>
                      {w.classLabel}
                    </div>
                    <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '12px', color: '#ffffff' }}>
                      {w.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', color: '#8A8A8A', marginTop: '3px' }}>
                      {w.energyJ}J
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Circular HUD display */}
          <div className="relative flex items-center justify-center" style={{ width: '380px', height: '380px', flexShrink: 0 }}>
            {/* Background circle */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 70%, #080808 100%)',
                border: '1px solid rgba(207,255,85,0.15)',
              }}
              aria-hidden="true"
            />

            {/* Outer dashed ring */}
            <div
              style={{
                position: 'absolute',
                inset: '8px',
                borderRadius: '50%',
                border: '1px dashed rgba(207,255,85,0.15)',
              }}
              aria-hidden="true"
            />

            {/* Ring — spinning clockwise (behind gun) */}
            <div
              className="absolute"
              style={{
                width: '360px',
                height: '360px',
                animation: shouldReduce ? 'none' : 'spinClockwise 8s linear infinite',
                zIndex: 1,
                opacity: weapon ? 0.75 : 0.25,
                transition: 'opacity 0.5s',
              }}
              aria-hidden="true"
            >
              <Image src="/ring-middle.png" alt="" fill sizes="360px" style={{ objectFit: 'contain', mixBlendMode: 'screen' }} />
            </div>

            {/* Ring — smaller, counter-clockwise (behind gun) */}
            <div
              className="absolute"
              style={{
                width: '220px',
                height: '220px',
                animation: shouldReduce ? 'none' : 'spinAntiClockwise 6s linear infinite',
                zIndex: 2,
                opacity: weapon ? 0.45 : 0.15,
                transition: 'opacity 0.5s',
              }}
              aria-hidden="true"
            >
              <Image src="/ring-middle.png" alt="" fill sizes="220px" style={{ objectFit: 'contain', mixBlendMode: 'screen' }} />
            </div>

            {/* Weapon image — above rings so it's clearly visible */}
            <AnimatePresence mode="wait">
              {weapon && (
                <motion.div
                  key={selected}
                  className="absolute"
                  style={{ width: '180px', height: '180px', zIndex: 5 }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: shouldReduce ? 0 : 0.3 }}
                >
                  <Image
                    src={weapon.image}
                    alt={weapon.name}
                    fill
                    sizes="180px"
                    style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Energy arc SVG — outermost ring */}
            <svg
              className="absolute"
              width="380"
              height="380"
              viewBox="0 0 380 380"
              style={{ zIndex: 4, transform: 'rotate(-90deg)' }}
              aria-hidden="true"
            >
              {/* Track */}
              <circle cx="190" cy="190" r="178" fill="none" stroke="rgba(207,255,85,0.12)" strokeWidth="3" />
              {/* Energy fill arc */}
              <circle
                cx="190"
                cy="190"
                r="178"
                fill="none"
                stroke={weapon ? weapon.accentColor : 'rgba(255,255,255,0.15)'}
                strokeWidth="3"
                strokeLinecap="butt"
                strokeDasharray={`${(arcPct / 100) * (2 * Math.PI * 178)} ${2 * Math.PI * 178}`}
                style={{ transition: 'stroke-dasharray 0.8s ease-out' }}
              />
            </svg>

            {/* Center prompt — no selection */}
            {!weapon && (
              <div className="absolute text-center" style={{ zIndex: 10 }}>
                <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', color: 'rgba(207,255,85,0.5)', letterSpacing: '0.15em' }}>
                  SELECT A<br />WEAPON
                </p>
              </div>
            )}

            {/* Energy readout — bottom of circle, below the gun image */}
            {weapon && (
              <div className="absolute text-center" style={{ zIndex: 10, bottom: '36px' }}>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '22px', color: weapon.accentColor, fontWeight: 900, lineHeight: 1 }}>
                  {weapon.energyJ}J
                </div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '8px', color: '#8A8A8A', letterSpacing: '0.1em', marginTop: '4px' }}>
                  MUZZLE ENERGY
                </div>
              </div>
            )}
          </div>

          {/* Stats panel — shown after selection */}
          <AnimatePresence mode="wait">
            {weapon && (
              <motion.div
                key={selected + '-stats'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: shouldReduce ? 0 : 0.4 }}
                style={{ maxWidth: '280px' }}
              >
                <h3 style={{ fontFamily: 'var(--font-orbitron)', fontSize: '16px', color: '#ffffff', marginBottom: '16px' }}>
                  {weapon.name}
                </h3>

                {/* Data grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'ENERGY', value: `${weapon.energyJ}J` },
                    { label: 'VELOCITY', value: `${weapon.velocityMs}m/s` },
                    { label: 'MASS', value: `${weapon.massG}g` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ border: '1px solid rgba(255,255,255,0.07)', padding: '10px 8px', textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '8px', color: '#8A8A8A', letterSpacing: '0.1em' }}>{label}</div>
                      <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '12px', color: '#ffffff', marginTop: '4px' }}>{value}</div>
                    </div>
                  ))}
                </div>

                {/* Legal badge */}
                <div style={{ border: `1px solid ${weapon.accentColor}`, color: weapon.accentColor, fontFamily: 'var(--font-space-mono)', fontSize: '9px', padding: '4px 10px', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '12px' }}>
                  {weapon.legalStatus}
                </div>

                <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '14px', color: '#8A8A8A', lineHeight: 1.7 }}>
                  {weapon.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Key insight */}
        <div style={{ maxWidth: '700px', margin: '48px auto 0', borderLeft: '3px solid #CFFF55', padding: '16px 24px', background: 'rgba(207,255,85,0.04)' }}>
          <div className="flex items-start gap-2">
            <Zap size={16} color="#CFFF55" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
            <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '15px', color: '#ffffff', lineHeight: 1.7 }}>
              <strong>Key Insight:</strong> A standard Nerf blaster and an airsoft gun often operate at identical energy levels. The difference is context — airsoft is a structured sport with protective gear, trained marshals, and community rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
