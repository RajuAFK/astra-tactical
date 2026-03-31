import ScanlineOverlay from '@/components/ui/ScanlineOverlay'

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

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.75) 100%)' }}
        aria-hidden="true"
      />

      {/* Scanlines */}
      <ScanlineOverlay />

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
        {/* Top bar */}
        <polygon
          points="0,0 100,0 100,7.8 68.4,7.8 66.6,10.3 33.4,10.3 31.6,7.8 0,7.8"
          fill="#0A0A0A"
        />
        {/* Subtle inner edge line on top bar */}
        <polyline
          points="0,7.8 31.6,7.8 33.4,10.3 66.6,10.3 68.4,7.8 100,7.8"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />

        {/* Bottom bar */}
        <polygon
          points="0,93 31.6,93 33.4,90.8 66.6,90.8 68.4,93 100,93 100,100 0,100"
          fill="#0A0A0A"
        />
        {/* Subtle inner edge line on bottom bar */}
        <polyline
          points="0,93 31.6,93 33.4,90.8 66.6,90.8 68.4,93 100,93"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  )
}
