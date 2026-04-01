import React from 'react'

interface HUDFrameProps {
  children: React.ReactNode
  label?: string
  className?: string
  glowIntensity?: 'low' | 'medium' | 'high'
}

export default function HUDFrame({
  children,
  label,
  className = '',
  glowIntensity = 'low',
}: HUDFrameProps) {
  const glowMap = {
    low: 'none',
    medium: '0 0 8px rgba(207,255,85,0.15)',
    high: '0 0 20px rgba(207,255,85,0.3)',
  }

  return (
    <div
      className={`hud-corner hud-corner-bottom relative p-3 backdrop-blur-sm ${className}`}
      style={{
        border: '1px solid rgba(207,255,85,0.25)',
        background: 'rgba(207,255,85,0.03)',
        fontFamily: 'var(--font-space-mono)',
        boxShadow: glowMap[glowIntensity],
      }}
    >
      {label && (
        <span
          className="absolute"
          style={{
            fontSize: '10px',
            color: '#CFFF55',
            opacity: 0.7,
            letterSpacing: '0.15em',
            top: '-8px',
            left: '12px',
            background: '#0A0A0A',
            padding: '0 4px',
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
