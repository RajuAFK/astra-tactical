import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'The Sport | Astra Tactical',
  description: "Everything you need to know about airsoft — how it works, how it's played, rules, gear, and culture.",
}

const ORANGE = '#FF6B00'
const ORANGE_DIM = 'rgba(255,107,0,0.12)'
const ORANGE_BORDER = 'rgba(255,107,0,0.25)'

const gameModes = [
  {
    code: 'TDM',
    name: 'Team Deathmatch',
    desc: 'Two squads compete for the most eliminations within the time limit. The purest test of individual skill and squad coordination.',
  },
  {
    code: 'DOM',
    name: 'Domination',
    desc: 'Capture and hold objectives scattered across the field. Positioning, communication and zone control win the game.',
  },
  {
    code: 'VIP',
    name: 'VIP Escort',
    desc: 'One team escorts a designated VIP to an extraction point. The other team must eliminate the VIP before extraction.',
  },
  {
    code: 'MILSIM',
    name: 'Military Simulation',
    desc: 'Multi-hour operations with realistic loadouts, radio comms, chain of command, and scenario-driven objectives.',
  },
  {
    code: 'CQB',
    name: 'Close Quarters Battle',
    desc: 'High-intensity room-clearing and corridor fighting in urban arenas. Reflexes and muzzle discipline are everything.',
  },
  {
    code: 'RECON',
    name: 'Recon & Sabotage',
    desc: 'Infiltrate enemy territory, gather intel or destroy a target — without being detected. Stealth over firepower.',
  },
]

const rules = [
  { num: '01', title: 'Call Your Hits', body: "Airsoft runs entirely on the honour system. When you're hit, you call it — no arguing, no peeking. Your integrity is the game." },
  { num: '02', title: 'Eye Protection Always', body: 'Full-seal ANSI-rated goggles are mandatory at all times on the field. No exceptions. No half measures.' },
  { num: '03', title: 'Safe Zone = No Guns Out', body: 'All replicas must be bagged, slung, or safed in the safe zone. Mag out, chamber clear.' },
  { num: '04', title: 'Chrono Before You Play', body: 'Every replica is chronographed before a game. Exceed the site limit and you sit out. Always run regulation BBs.' },
  { num: '05', title: 'No Blind Firing', body: 'You must have a clear sight picture before you shoot. Sticking a barrel around a corner without looking is banned.' },
  { num: '06', title: 'Surrender Rule in CQB', body: 'Under 3 meters you offer a surrender before firing. It prevents close-range injuries and maintains sportsmanship.' },
]

const formats = [
  { label: 'INDOOR / CQB', desc: 'Urban maze arenas with tight corridors, rooms and staircases. High ROF, short range, full-auto action.' },
  { label: 'OUTDOOR / WOODLAND', desc: 'Natural terrain with cover, elevation changes, and long sightlines. Bolt-action snipers and flanking manoeuvres.' },
  { label: 'SPEEDSOFT', desc: 'Speed-running objective games in stripped arenas. Athletic, aggressive, and designed for pure adrenaline.' },
]

export default function TheSportPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── HERO ── */}
      <section
        style={{
          borderBottom: `1px solid ${ORANGE_BORDER}`,
          padding: '120px 24px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${ORANGE_DIM}, transparent)`, pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: ORANGE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '20px' }}>
            // THE SPORT
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 700,
              lineHeight: 0.9,
              color: '#ffffff',
              marginBottom: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            AIRSOFT
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
            A full-spectrum combat sport built on skill, honour, and military precision.
            6mm plastic BBs. Realistic replicas. Real tactics.
          </p>

          {/* Stat strip */}
          <div
            style={{
              display: 'flex',
              gap: '0',
              marginTop: '64px',
              borderTop: `1px solid ${ORANGE_BORDER}`,
            }}
          >
            {[
              { val: '6MM', label: 'BB calibre' },
              { val: '<2J', label: 'Muzzle energy limit' },
              { val: '350+', label: 'FPS field limit' },
              { val: '2–100+', label: 'Players per game' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: '24px 20px',
                  borderRight: i < 3 ? `1px solid ${ORANGE_BORDER}` : 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(22px, 3vw, 36px)', color: ORANGE, fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS AIRSOFT ── */}
      <section style={{ padding: '80px 24px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: ORANGE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '16px' }}>// OVERVIEW</p>
            <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
              WHAT IS<br />AIRSOFT?
            </h2>
            <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '20px' }}>
              Airsoft began in Japan in the 1970s as a way to experience the mechanics and feel of real firearms without the danger. Spring-powered replicas firing lightweight 6mm plastic BBs gave hobbyists a safe, realistic alternative.
            </p>
            <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '17px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
              Today it's a global tactical sport — played in purpose-built urban arenas, dense woodlands, and decommissioned military installations. It blends athletic competition with military simulation, demanding strategy, fitness, and team communication in equal measure.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* ── Japan holographic image ── */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                background: '#040404',
                marginBottom: '2px',
                overflow: 'hidden',
              }}
            >
              {/* Corner brackets */}
              {[
                { top: '12px', left: '12px', borderTop: `1px solid ${ORANGE}`, borderLeft: `1px solid ${ORANGE}` },
                { top: '12px', right: '12px', borderTop: `1px solid ${ORANGE}`, borderRight: `1px solid ${ORANGE}` },
                { bottom: '12px', left: '12px', borderBottom: `1px solid ${ORANGE}`, borderLeft: `1px solid ${ORANGE}` },
                { bottom: '12px', right: '12px', borderBottom: `1px solid ${ORANGE}`, borderRight: `1px solid ${ORANGE}` },
              ].map((style, i) => (
                <div key={i} aria-hidden="true" style={{ position: 'absolute', width: '18px', height: '18px', zIndex: 3, ...style }} />
              ))}

              {/* Image inset within brackets */}
              <div style={{ position: 'absolute', inset: '30px', overflow: 'hidden' }}>
                <Image
                  src="/logos/5771a671-2b83-49c6-8647-41199a52d5d7.png"
                  alt="Holographic map of Japan — birthplace of airsoft"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>

              {/* Scan-line overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, zIndex: 2,
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
                  pointerEvents: 'none',
                }}
              />

              {/* HUD overlays */}
              <div aria-hidden="true" style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 4, fontFamily: 'var(--font-space-mono)', fontSize: '8px', color: ORANGE, letterSpacing: '0.15em', opacity: 0.8 }}>
                ORIGIN / JPN
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 4, fontFamily: 'var(--font-space-mono)', fontSize: '8px', color: ORANGE, letterSpacing: '0.1em', opacity: 0.7, textAlign: 'right' }}>
                35.6762° N<br />139.6503° E
              </div>
              <div aria-hidden="true" style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 4, fontFamily: 'var(--font-space-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
                EST. 1970s
              </div>
            </div>

            {/* Spec table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { label: 'ORIGIN', value: 'Japan, 1970s' },
                { label: 'PROJECTILE', value: '6mm biodegradable BB' },
                { label: 'ENERGY LIMIT', value: 'Sub-2 joules' },
                { label: 'LEGAL STATUS (INDIA)', value: 'Legal as sport equipment' },
                { label: 'ACTIVE PLAYERS', value: '3M+ worldwide' },
                { label: 'TERRAIN TYPES', value: 'CQB, Woodland, MOUT, Speedsoft' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '15px', color: '#ffffff', fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT'S PLAYED ── */}
      <section style={{ padding: '80px 24px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: ORANGE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '16px' }}>// GAMEPLAY</p>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '48px' }}>HOW IT&apos;S PLAYED</h2>

          {/* Formats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px', marginBottom: '64px' }}>
            {formats.map(({ label, desc }) => (
              <div
                key={label}
                style={{
                  padding: '32px 24px',
                  background: ORANGE_DIM,
                  border: `1px solid ${ORANGE_BORDER}`,
                }}
              >
                <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: '13px', letterSpacing: '0.2em', color: ORANGE, marginBottom: '12px' }}>{label}</div>
                <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Flow */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px' }}>
            {[
              { step: '01', title: 'CHRONO', body: "Every replica is chronographed. Exceed site limits — you're out." },
              { step: '02', title: 'BRIEF', body: 'Game marshal briefs objectives, boundaries, and rules.' },
              { step: '03', title: 'DEPLOY', body: 'Teams move to starting positions. Countdown begins.' },
              { step: '04', title: 'ENGAGE', body: 'Objectives are contested. Hits are called on honour.' },
              { step: '05', title: 'RESPAWN', body: 'Eliminated players respawn per game format rules.' },
              { step: '06', title: 'DEBRIEF', body: 'Teams reassemble. Results called. Tactics reviewed.' },
            ].map(({ step, title, body }) => (
              <div key={step} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '9px', color: ORANGE, letterSpacing: '0.15em', marginBottom: '8px' }}>STEP {step}</div>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: '#ffffff', marginBottom: '8px' }}>{title}</div>
                <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAME MODES ── */}
      <section style={{ padding: '80px 24px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: ORANGE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '16px' }}>// GAME MODES</p>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '48px' }}>MISSION TYPES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
            {gameModes.map(({ code, name, desc }) => (
              <div
                key={code}
                style={{
                  padding: '32px 28px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '20px',
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'rgba(255,107,0,0.08)',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {code}
                </div>
                <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: '11px', letterSpacing: '0.2em', color: ORANGE, marginBottom: '8px' }}>{code}</div>
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '15px', color: '#ffffff', marginBottom: '12px' }}>{name}</div>
                <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULES ── */}
      <section style={{ padding: '80px 24px', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: ORANGE, opacity: 0.7, letterSpacing: '0.2em', marginBottom: '16px' }}>// FIELD PROTOCOL</p>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: '48px' }}>THE RULES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2px' }}>
            {rules.map(({ num, title, body }) => (
              <div
                key={num}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '28px 24px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.015)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '28px', fontWeight: 700, color: ORANGE_BORDER, lineHeight: 1, flexShrink: 0 }}>{num}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '13px', color: ORANGE, marginBottom: '8px', letterSpacing: '0.05em' }}>{title}</div>
                  <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '11px', color: ORANGE, opacity: 0.7, letterSpacing: '0.2em' }}>// READY TO DEPLOY</p>
          <h2 style={{ fontFamily: 'var(--font-orbitron)', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, lineHeight: 1 }}>
            JOIN THE<br />FIELD
          </h2>
          <p style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '18px', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', lineHeight: 1.6 }}>
            Astra Tactical is building India&apos;s first full-stack airsoft ecosystem — arenas, gear, and the community to run it. Register your interest now.
          </p>
          <a
            href="/#about"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '12px',
              letterSpacing: '0.15em',
              color: '#080808',
              background: ORANGE,
              padding: '16px 40px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-block',
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            LEARN ABOUT ASTRA
          </a>
        </div>
      </section>

    </main>
  )
}
