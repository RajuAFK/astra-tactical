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

      {/* Cover the scroll symbol baked into screen-frame.png */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: 0, left: 0, right: 0, height: '60px', background: '#0A0A0A', zIndex: 20 }}
        aria-hidden="true"
      />
    </section>
  )
}
