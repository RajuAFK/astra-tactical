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

      {/* Screen frame */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/screen-frame.png)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <a
        href="#comparison"
        aria-label="Scroll to next section"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
        }}
      >
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="28"
            height="8"
            viewBox="0 0 28 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              animation: `scrollChevron 1.6s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0,
            }}
            aria-hidden="true"
          >
            <polyline
              points="2,2 14,6 26,2"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ))}
      </a>
    </section>
  )
}
