export default function ScanlineOverlay() {
  return (
    <div
      className="scanlines absolute inset-0 z-10"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
