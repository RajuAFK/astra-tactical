// Fixed full-page background layer with scattered tactical SVG elements.
// All elements are grey at 4–7% opacity — visible as texture, not distracting.

const ELEMENTS = [
  // --- BULLET HOLES ---
  // A circle with radial crack lines emanating outward
  {
    id: 'bh1', x: '7%', y: '18%', size: 48, rotate: 0,
    svg: (
      <g>
        <circle cx="24" cy="24" r="5" fill="#888" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="#888" strokeWidth="0.8" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => {
          const r = (a * Math.PI) / 180
          const x1 = 24 + Math.cos(r) * 9
          const y1 = 24 + Math.sin(r) * 9
          const x2 = 24 + Math.cos(r) * (14 + (i % 3) * 4)
          const y2 = 24 + Math.sin(r) * (14 + (i % 3) * 4)
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="0.6" />
        })}
      </g>
    ),
  },
  {
    id: 'bh2', x: '88%', y: '42%', size: 36, rotate: 15,
    svg: (
      <g>
        <circle cx="18" cy="18" r="4" fill="#888" />
        <circle cx="18" cy="18" r="6.5" fill="none" stroke="#888" strokeWidth="0.7" />
        {[0,45,90,135,180,225,270,315].map((a, i) => {
          const r = (a * Math.PI) / 180
          const x1 = 18 + Math.cos(r) * 7.5
          const y1 = 18 + Math.sin(r) * 7.5
          const x2 = 18 + Math.cos(r) * (11 + (i % 2) * 3)
          const y2 = 18 + Math.sin(r) * (11 + (i % 2) * 3)
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="0.5" />
        })}
      </g>
    ),
  },
  {
    id: 'bh3', x: '53%', y: '76%', size: 42, rotate: -20,
    svg: (
      <g>
        <circle cx="21" cy="21" r="4.5" fill="#888" />
        <circle cx="21" cy="21" r="7.5" fill="none" stroke="#888" strokeWidth="0.7" />
        {[0,40,80,120,160,200,240,280,320].map((a, i) => {
          const r = (a * Math.PI) / 180
          const x1 = 21 + Math.cos(r) * 8.5
          const y1 = 21 + Math.sin(r) * 8.5
          const x2 = 21 + Math.cos(r) * (12 + (i % 3) * 3)
          const y2 = 21 + Math.sin(r) * (12 + (i % 3) * 3)
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="0.5" />
        })}
      </g>
    ),
  },

  // --- CROSSHAIR / TARGETING RETICLE ---
  {
    id: 'ch1', x: '72%', y: '14%', size: 60, rotate: 0,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.7">
        <circle cx="30" cy="30" r="12" />
        <circle cx="30" cy="30" r="2.5" />
        <line x1="30" y1="0" x2="30" y2="16" />
        <line x1="30" y1="44" x2="30" y2="60" />
        <line x1="0" y1="30" x2="16" y2="30" />
        <line x1="44" y1="30" x2="60" y2="30" />
        {/* tick marks on circle */}
        <line x1="30" y1="18" x2="30" y2="22" strokeWidth="1" />
        <line x1="30" y1="38" x2="30" y2="42" strokeWidth="1" />
        <line x1="18" y1="30" x2="22" y2="30" strokeWidth="1" />
        <line x1="38" y1="30" x2="42" y2="30" strokeWidth="1" />
      </g>
    ),
  },
  {
    id: 'ch2', x: '22%', y: '62%', size: 44, rotate: 45,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.7">
        <circle cx="22" cy="22" r="9" />
        <circle cx="22" cy="22" r="2" />
        <line x1="22" y1="2" x2="22" y2="12" />
        <line x1="22" y1="32" x2="22" y2="42" />
        <line x1="2" y1="22" x2="12" y2="22" />
        <line x1="32" y1="22" x2="42" y2="22" />
      </g>
    ),
  },

  // --- BULLET CASING (side view — tapered cylinder) ---
  {
    id: 'bc1', x: '15%', y: '38%', size: 50, rotate: -35,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.8">
        {/* casing body */}
        <path d="M18,38 L16,12 Q20,6 24,5 Q28,6 32,12 L30,38 Z" />
        {/* rim at base */}
        <line x1="14" y1="38" x2="34" y2="38" strokeWidth="1.2" />
        <line x1="15" y1="40" x2="33" y2="40" strokeWidth="0.6" />
        {/* ejector groove */}
        <line x1="15" y1="36" x2="33" y2="36" />
      </g>
    ),
  },
  {
    id: 'bc2', x: '82%', y: '68%', size: 50, rotate: 20,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.8">
        <path d="M18,38 L16,12 Q20,6 24,5 Q28,6 32,12 L30,38 Z" />
        <line x1="14" y1="38" x2="34" y2="38" strokeWidth="1.2" />
        <line x1="15" y1="40" x2="33" y2="40" strokeWidth="0.6" />
        <line x1="15" y1="36" x2="33" y2="36" />
      </g>
    ),
  },
  {
    id: 'bc3', x: '44%', y: '22%', size: 50, rotate: 70,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.8">
        <path d="M18,38 L16,12 Q20,6 24,5 Q28,6 32,12 L30,38 Z" />
        <line x1="14" y1="38" x2="34" y2="38" strokeWidth="1.2" />
        <line x1="15" y1="40" x2="33" y2="40" strokeWidth="0.6" />
        <line x1="15" y1="36" x2="33" y2="36" />
      </g>
    ),
  },

  // --- TACTICAL VEST (front silhouette) ---
  {
    id: 'vest1', x: '63%', y: '54%', size: 80, rotate: 5,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.8">
        {/* shoulder straps */}
        <path d="M20,8 Q16,4 12,8 L10,28 L20,30" />
        <path d="M60,8 Q64,4 68,8 L70,28 L60,30" />
        {/* body panel */}
        <path d="M20,8 L20,30 L10,28 L10,62 Q10,68 16,70 L40,72 L64,70 Q70,68 70,62 L70,28 L60,30 L60,8" />
        {/* MOLLE webbing rows */}
        {[36, 44, 52].map(y => (
          <g key={y}>
            <line x1="14" y1={y} x2="66" y2={y} strokeWidth="0.5" />
            {[18, 26, 34, 42, 50, 58].map(x => (
              <line key={x} x1={x} y1={y} x2={x} y2={y + 6} strokeWidth="0.5" />
            ))}
          </g>
        ))}
        {/* centre zip */}
        <line x1="40" y1="8" x2="40" y2="70" strokeWidth="0.5" strokeDasharray="2,2" />
        {/* chest pouches */}
        <rect x="13" y="12" width="18" height="20" rx="1" strokeWidth="0.6" />
        <rect x="49" y="12" width="18" height="20" rx="1" strokeWidth="0.6" />
      </g>
    ),
  },

  // --- RIFLE SILHOUETTE (AR-style top view, minimal) ---
  {
    id: 'rifle1', x: '34%', y: '86%', size: 120, rotate: -12,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.7">
        {/* barrel */}
        <line x1="8" y1="20" x2="90" y2="20" strokeWidth="1" />
        {/* receiver block */}
        <rect x="56" y="14" width="28" height="12" rx="1" />
        {/* grip */}
        <path d="M66,26 L62,40 L70,40 L72,26" />
        {/* stock */}
        <path d="M84,15 L110,12 L112,20 L110,28 L84,25" />
        {/* mag */}
        <path d="M70,26 L68,44 L76,44 L74,26" />
        {/* handguard */}
        <rect x="20" y="15" width="36" height="10" rx="1" />
        {/* front sight */}
        <line x1="16" y1="14" x2="16" y2="26" />
        {/* charging handle */}
        <line x1="80" y1="14" x2="84" y2="10" />
      </g>
    ),
  },
  {
    id: 'rifle2', x: '5%', y: '72%', size: 110, rotate: 8,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.7">
        <line x1="8" y1="20" x2="82" y2="20" strokeWidth="1" />
        <rect x="50" y="14" width="26" height="12" rx="1" />
        <path d="M60,26 L56,38 L64,38 L66,26" />
        <path d="M76,15 L100,12 L102,20 L100,28 L76,25" />
        <path d="M64,26 L62,42 L70,42 L68,26" />
        <rect x="18" y="15" width="32" height="10" rx="1" />
        <line x1="14" y1="14" x2="14" y2="26" />
      </g>
    ),
  },

  // --- TIRE TRACK SEGMENT ---
  {
    id: 'tt1', x: '90%', y: '82%', size: 90, rotate: -5,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.6">
        {/* two track rails */}
        <line x1="15" y1="0" x2="15" y2="90" strokeWidth="0.8" />
        <line x1="35" y1="0" x2="35" y2="90" strokeWidth="0.8" />
        {/* tread blocks */}
        {[5,18,31,44,57,70,83].map(y => (
          <rect key={y} x="8" y={y} width="34" height="8" rx="1" />
        ))}
        {/* centre void gaps between blocks */}
        {[13,26,39,52,65,78].map(y => (
          <line key={y} x1="15" y1={y} x2="35" y2={y} strokeWidth="0.3" />
        ))}
      </g>
    ),
  },
  {
    id: 'tt2', x: '2%', y: '44%', size: 90, rotate: 90,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.6">
        <line x1="15" y1="0" x2="15" y2="90" strokeWidth="0.8" />
        <line x1="35" y1="0" x2="35" y2="90" strokeWidth="0.8" />
        {[5,18,31,44,57,70,83].map(y => (
          <rect key={y} x="8" y={y} width="34" height="8" rx="1" />
        ))}
      </g>
    ),
  },

  // --- DOG TAG ---
  {
    id: 'dt1', x: '48%', y: '48%', size: 50, rotate: -8,
    svg: (
      <g fill="none" stroke="#888" strokeWidth="0.8">
        <rect x="8" y="10" width="34" height="42" rx="3" />
        {/* notch at bottom */}
        <path d="M22,52 Q25,58 28,52" />
        {/* text lines */}
        <line x1="13" y1="20" x2="37" y2="20" strokeWidth="0.5" />
        <line x1="13" y1="26" x2="37" y2="26" strokeWidth="0.5" />
        <line x1="13" y1="32" x2="30" y2="32" strokeWidth="0.5" />
        <line x1="13" y1="38" x2="33" y2="38" strokeWidth="0.5" />
        {/* chain hole */}
        <circle cx="25" cy="13" r="2" />
      </g>
    ),
  },
]

export default function TacticalBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {ELEMENTS.map(({ id, x, y, size, rotate, svg }) => (
        <svg
          key={id}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            transform: `rotate(${rotate}deg)`,
            opacity: 0.13,
          }}
        >
          {svg}
        </svg>
      ))}
    </div>
  )
}
