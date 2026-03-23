'use client'

import { useEffect, useState } from 'react'

interface WeaponData {
  name: string
  energyJ: number
  velocityMs: number
  massG: number
  legalStatus: string
  statusColor: string
  barColor: string
  description: string
}

const WEAPONS: Record<string, WeaponData> = {
  nerf: {
    name: 'Nerf Blaster',
    energyJ: 0.5,
    velocityMs: 20,
    massG: 1.2,
    legalStatus: 'UNRESTRICTED',
    statusColor: '#ff5722',
    barColor: '#FF6B00',
    description:
      'Standard foam dart blasters operate comfortably within the 2J legal threshold — often less powerful than a standard airsoft gun.',
  },
  airgun: {
    name: 'Air Pistol',
    energyJ: 7.5,
    velocityMs: 120,
    massG: 0.9,
    legalStatus: 'RESTRICTED — Arms Act 1959',
    statusColor: '#EF4444',
    barColor: '#3B82F6',
    description:
      'Traditional air guns regularly exceed 2J, placing them under the Arms Act 1959. These require a valid arms license to own or use.',
  },
  airsoft: {
    name: 'Airsoft Replica',
    energyJ: 1.2,
    velocityMs: 90,
    massG: 0.3,
    legalStatus: 'LEGAL — Below 2J Threshold',
    statusColor: '#ff5722',
    barColor: '#ff5722',
    description:
      'Airsoft guns fire 6mm plastic BBs at under 2 joules — keeping them classified as sport equipment, not firearms, under Indian law.',
  },
  firearm: {
    name: '9mm Service Pistol',
    energyJ: 480,
    velocityMs: 370,
    massG: 7.0,
    legalStatus: 'LICENSED ONLY — Arms Act 1959',
    statusColor: '#EF4444',
    barColor: '#EF4444',
    description:
      'Real firearms carry over 400 times the energy of an airsoft gun. Ownership requires an arms license and is tightly regulated by the government.',
  },
}

function logScale(energyJ: number): number {
  return (Math.log10(energyJ + 1) / Math.log10(481)) * 100
}

interface MuzzleEnergyMeterProps {
  selectedKey: string
  baselineKey: string
}

export default function MuzzleEnergyMeter({
  selectedKey,
  baselineKey,
}: MuzzleEnergyMeterProps) {
  const [animatedSelected, setAnimatedSelected] = useState(0)
  const [animatedBaseline, setAnimatedBaseline] = useState(0)

  const selected = WEAPONS[selectedKey]
  const baseline = WEAPONS[baselineKey]

  useEffect(() => {
    setAnimatedSelected(0)
    setAnimatedBaseline(0)
    const timer = setTimeout(() => {
      setAnimatedSelected(logScale(selected.energyJ))
      setAnimatedBaseline(logScale(baseline.energyJ))
    }, 50)
    return () => clearTimeout(timer)
  }, [selectedKey, selected.energyJ, baseline.energyJ])

  return (
    <div className="w-full" style={{ fontFamily: 'var(--font-space-mono)' }}>
      {/* Bars */}
      <div className="space-y-6">
        {/* Selected weapon bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '11px', color: '#ffffff' }}>{selected.name}</span>
            <span style={{ fontSize: '10px', color: selected.barColor }}>{selected.energyJ}J</span>
          </div>
          <div
            className="w-full"
            style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}
          >
            <div
              style={{
                height: '100%',
                width: `${animatedSelected}%`,
                backgroundColor: selected.barColor,
                transition: 'width 0.8s ease-out',
              }}
            />
          </div>
        </div>

        {/* Baseline bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: '11px', color: '#8A8A8A' }}>{baseline.name} (baseline)</span>
            <span style={{ fontSize: '10px', color: baseline.barColor }}>{baseline.energyJ}J</span>
          </div>
          <div
            className="w-full"
            style={{ height: '8px', background: 'rgba(255,255,255,0.1)' }}
          >
            <div
              style={{
                height: '100%',
                width: `${animatedBaseline}%`,
                backgroundColor: baseline.barColor,
                transition: 'width 0.8s ease-out',
              }}
            />
          </div>
        </div>
      </div>

      {/* Data columns */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <div style={{ fontSize: '9px', color: '#8A8A8A', letterSpacing: '0.15em' }}>ENERGY</div>
          <div style={{ fontSize: '14px', color: '#ffffff', marginTop: '4px' }}>
            {selected.energyJ} J
          </div>
        </div>
        <div>
          <div style={{ fontSize: '9px', color: '#8A8A8A', letterSpacing: '0.15em' }}>VELOCITY</div>
          <div style={{ fontSize: '14px', color: '#ffffff', marginTop: '4px' }}>
            {selected.velocityMs} m/s
          </div>
        </div>
        <div>
          <div style={{ fontSize: '9px', color: '#8A8A8A', letterSpacing: '0.15em' }}>MASS</div>
          <div style={{ fontSize: '14px', color: '#ffffff', marginTop: '4px' }}>
            {selected.massG}g
          </div>
        </div>
      </div>

      {/* Legal status badge */}
      <div className="mt-4">
        <span
          style={{
            display: 'inline-block',
            border: `1px solid ${selected.statusColor}`,
            color: selected.statusColor,
            fontSize: '10px',
            letterSpacing: '0.1em',
            padding: '3px 10px',
            fontFamily: 'var(--font-space-mono)',
          }}
        >
          {selected.legalStatus}
        </span>
      </div>

      {/* Description */}
      <p
        className="mt-4"
        style={{ fontSize: '14px', color: '#8A8A8A', fontFamily: 'var(--font-rajdhani)', lineHeight: 1.7 }}
      >
        {selected.description}
      </p>
    </div>
  )
}
