'use client'

import { useState, useEffect, CSSProperties } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  style?: CSSProperties
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  triggerOnLoad?: boolean
  triggerOnHover?: boolean
}

export default function GlitchText({
  text,
  className = '',
  style,
  as: Tag = 'span',
  triggerOnLoad = false,
  triggerOnHover = true,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  const triggerGlitch = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 400)
  }

  useEffect(() => {
    if (triggerOnLoad) {
      const timer = setTimeout(() => triggerGlitch(), 600)
      return () => clearTimeout(timer)
    }
  }, [triggerOnLoad])

  return (
    <Tag
      className={`${className} ${isGlitching ? 'animate-glitch' : ''}`}
      style={style}
      onMouseEnter={triggerOnHover ? triggerGlitch : undefined}
    >
      {text}
    </Tag>
  )
}
