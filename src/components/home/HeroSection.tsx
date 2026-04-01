import ScanlineOverlay from '@/components/ui/ScanlineOverlay'

const ACCENT = '#CFFF55'

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden" aria-label="Hero section" style={{ background: '#0A0A0A' }}>
      {/* Video background */}
      <video
        className="absolute inset-0 object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
        src="https://pub-9df89263609345f4a555f6e0d4bdc389.r2.dev/hero.mp4"
        aria-label="Astra Tactical field footage background video"
      />

      {/* Radial accent glow — matches store hero */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 80% at 20% 55%, ${ACCENT}18 0%, transparent 65%)` }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay — matches store hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.75) 100%)' }}
        aria-hidden="true"
      />

      {/* Scanlines */}
      <ScanlineOverlay />

      {/* Corner brackets — matches store hero, inset from video area edges */}
      {[
        { top: '14%', left: '1.5%',  borderTop: `2px solid ${ACCENT}55`,  borderLeft:  `2px solid ${ACCENT}55`  },
        { top: '14%', right: '1.5%', borderTop: `2px solid ${ACCENT}55`,  borderRight: `2px solid ${ACCENT}55`  },
        { bottom: '8%', left: '1.5%',  borderBottom: `2px solid ${ACCENT}22`, borderLeft:  `2px solid ${ACCENT}22` },
        { bottom: '8%', right: '1.5%', borderBottom: `2px solid ${ACCENT}22`, borderRight: `2px solid ${ACCENT}22` },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ width: 32, height: 32, zIndex: 11, ...s }}
          aria-hidden="true"
        />
      ))}

      {/*
        Screen frame — SVG recreation of the original PNG shape.
        Top bar: full-width, with a centre tab that extends further down, flanked by 45° chamfers.
        Bottom bar: same inverted, with a centre tab that rises up into the video area.
        No scroll-indicator symbol. preserveAspectRatio="none" so it stretches to any viewport.
      */}
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient: transparent at edges, accent at centre — for inner edge strokes */}
          <linearGradient id="edgeGradTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="25%"  stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="50%"  stopColor={ACCENT} stopOpacity="0.55" />
            <stop offset="75%"  stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="edgeGradBottom" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="25%"  stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="50%"  stopColor={ACCENT} stopOpacity="0.55" />
            <stop offset="75%"  stopColor={ACCENT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top bar */}
        <polygon
          points="0,0 100,0 100,9.5 68.4,9.5 66.6,12.5 33.4,12.5 31.6,9.5 0,9.5"
          fill="#0A0A0A"
        />
        {/* Accent inner edge — top bar faces video */}
        <polyline
          points="0,9.5 31.6,9.5 33.4,12.5 66.6,12.5 68.4,9.5 100,9.5"
          fill="none"
          stroke="url(#edgeGradTop)"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />

        {/* Bottom bar */}
        <polygon
          points="0,93 31.6,93 33.4,90.8 66.6,90.8 68.4,93 100,93 100,100 0,100"
          fill="#0A0A0A"
        />
        {/* Accent inner edge — bottom bar faces video */}
        <polyline
          points="0,93 31.6,93 33.4,90.8 66.6,90.8 68.4,93 100,93"
          fill="none"
          stroke="url(#edgeGradBottom)"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  )
}
