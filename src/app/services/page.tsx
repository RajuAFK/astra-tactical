import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Astra Tactical',
  description: 'Astra Tactical provides 3D-printed airsoft replicas, a venue management system for franchise arenas, and the Mission Control player app.',
}

const PURPLE = '#A855F7'
const PURPLE_DIM = 'rgba(168,85,247,0.1)'
const PURPLE_BORDER = 'rgba(168,85,247,0.25)'

const services = [
  {
    code: '01',
    tag: '// HARDWARE',
    title: '3D-PRINTED\nAIRSOFT REPLICAS',
    body: [
      'We design and manufacture professional-grade airsoft replicas using high-spec polymer composites and precision FDM printing. Every unit is tuned to operate at sub-2J — well within the 20J Arms Act threshold.',
      'Our replicas are built for arena use — durable, consistent, and maintainable. Franchise operators receive a standardised fleet, reducing equipment variance across the playing field and eliminating the fragmentation that comes with player-owned gear.',
    ],
    specs: [
      { label: 'CALIBRE', value: '6mm BB' },
      { label: 'ENERGY', value: 'Sub-2 joules' },
      { label: 'MATERIAL', value: 'Polymer composite' },
      { label: 'AVAILABILITY', value: 'Franchise partners' },
    ],
  },
  {
    code: '02',
    tag: '// SOFTWARE',
    title: 'VENUE\nMANAGEMENT SYSTEM',
    body: [
      'Running an airsoft arena involves more moving parts than most sport venues — equipment check-out, field scheduling, safety briefings, hit-counting, and revenue tracking, all at the same time.',
      'Our Venue Management System handles it all from a single dashboard. Operators manage bookings, equipment inventory, player waivers, and live field status in real time. Built for franchise scale — deploy once, manage everywhere.',
    ],
    specs: [
      { label: 'PLATFORM', value: 'Web + tablet' },
      { label: 'DEPLOYMENT', value: 'Cloud-hosted' },
      { label: 'FEATURES', value: 'Booking, inventory, analytics' },
      { label: 'AVAILABILITY', value: 'Franchise partners' },
    ],
  },
  {
    code: '03',
    tag: '// APP',
    title: 'MISSION\nCONTROL APP',
    body: [
      'Mission Control is the player-facing layer of the Astra ecosystem. It tracks individual stats, game history, rank progression, and field performance across every session — whether at an Astra arena or a registered independent site.',
      'Players use it to find nearby games, register for events, view their kill/death breakdown, and unlock achievements. It\'s also the social layer — squads form here, rivalries are tracked here, and the community breathes here.',
    ],
    specs: [
      { label: 'PLATFORM', value: 'iOS + Android' },
      { label: 'FEATURES', value: 'Stats, events, social, squads' },
      { label: 'INTEGRATION', value: 'Venue Management System' },
      { label: 'AVAILABILITY', value: 'Coming soon' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── HERO ── */}
      <section
        style={{
          borderBottom: `1px solid ${PURPLE_BORDER}`,
          padding: '120px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse 60% 50% at 30% 50%, ${PURPLE_DIM}, transparent)`, pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: PURPLE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '20px' }}>
            // SERVICES
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 700,
              lineHeight: 0.9,
              color: '#ffffff',
              marginBottom: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            THE<br />ECOSYSTEM
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: 'clamp(16px, 2.5vw, 22px)',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            We build the hardware, software, and community infrastructure that powers professional airsoft in India — from the replica in your hands to the app tracking your rank.
          </p>

          {/* Service count strip */}
          <div style={{ display: 'flex', gap: '0', marginTop: '64px', borderTop: `1px solid ${PURPLE_BORDER}` }}>
            {[
              { val: '3D-PRINT', label: 'Replica manufacturing' },
              { val: 'VMS', label: 'Venue management' },
              { val: 'MC APP', label: 'Player platform' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '24px 20px',
                  borderRight: i < 2 ? `1px solid ${PURPLE_BORDER}` : 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(18px, 2.5vw, 28px)', color: PURPLE, fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE BLOCKS ── */}
      {services.map(({ code, tag, title, body, specs }, i) => (
        <section
          key={code}
          style={{
            padding: '80px 24px',
            borderBottom: `1px solid rgba(255,255,255,0.06)`,
            background: i % 2 === 1 ? 'rgba(168,85,247,0.03)' : 'transparent',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Text column */}
            <div>
              <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: PURPLE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '12px' }}>{tag}</p>
              <h2
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(26px, 3.5vw, 44px)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  marginBottom: '32px',
                  whiteSpace: 'pre-line',
                }}
              >
                {title}
              </h2>
              {body.map((para, j) => (
                <p
                  key={j}
                  style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: '17px',
                    color: 'rgba(255,255,255,0.62)',
                    lineHeight: 1.75,
                    marginBottom: j < body.length - 1 ? '20px' : 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Spec column */}
            <div style={{ paddingTop: '52px' }}>
              <div
                style={{
                  border: `1px solid ${PURPLE_BORDER}`,
                  background: PURPLE_DIM,
                }}
              >
                <div
                  style={{
                    borderBottom: `1px solid ${PURPLE_BORDER}`,
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '32px', fontWeight: 700, color: PURPLE, lineHeight: 1 }}>{code}</div>
                  <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>SPEC SHEET</div>
                </div>
                {specs.map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '14px 20px',
                      borderBottom: '1px solid rgba(168,85,247,0.1)',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '15px', color: '#ffffff', fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── FRANCHISE CTA ── */}
      <section style={{ padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            border: `1px solid ${PURPLE_BORDER}`,
            background: PURPLE_DIM,
            padding: 'clamp(32px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'flex-start',
          }}
        >
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: PURPLE, opacity: 0.7, letterSpacing: '0.2em' }}>// PARTNER WITH US</p>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05 }}>
            OPEN AN ASTRA<br />FRANCHISE ARENA
          </h2>
          <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', lineHeight: 1.65 }}>
            Get the full stack — replicas, venue software, and player app — under one franchise agreement. We handle the infrastructure. You run the field.
          </p>
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '11px',
            color: PURPLE,
            opacity: 0.75,
            letterSpacing: '0.15em',
            marginTop: '8px',
          }}>
            USE THE REGISTER INTEREST BUTTON ABOVE ↑
          </p>
        </div>
      </section>

    </main>
  )
}
