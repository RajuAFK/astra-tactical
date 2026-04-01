'use client'

import { useState } from 'react'
import Image from 'next/image'

const TABS = {
  history: {
    label: 'HISTORY',
    heading: 'HISTORY',
    image: '/logos/5771a671-2b83-49c6-8647-41199a52d5d7.png',
    paragraphs: [
      "Airsoft began in Japan in the 1970s, born out of a simple idea: what if civilians could experience the thrill of firearms without the danger? With strict gun laws in place, hobbyists engineered spring-powered replica guns that fired plastic pellets. What started as a collector's niche quickly evolved into a global tactical sport—now spanning urban arenas, dense forests, and massive military simulations worldwide.",
    ],
  },
  airsoftNow: {
    label: 'AIRSOFT NOW',
    heading: 'AIRSOFT NOW',
    image: '/logos/Airsoft now.png',
    paragraphs: [
      "Today, airsoft is a full-spectrum combat sport that blends military realism, strategic gameplay, and adrenaline-fueled athleticism. Players use 1:1 scale replicas of real weapons—rifles, pistols, SMGs—firing 6mm plastic BBs in live-action scenarios ranging from quick skirmishes to full-day operations. Whether it's clearing rooms in CQB (close quarters battle) environments or coordinating multi-squad assaults in large outdoor terrains, airsoft brings video game tactics and military precision to life.",
      "It's not about just pulling a trigger—it's about planning, adapting, surviving, and outmaneuvering. And unlike paintball, airsoft is grounded in honor—no paint marks, no refs watching every angle. You hit, you call it. Integrity is everything.",
    ],
  },
}

type TabKey = keyof typeof TABS

export default function AirsoftHistorySection() {
  const [activeTab, setActiveTab] = useState<TabKey>('history')
  const tab = TABS[activeTab]

  return (
    <section
      aria-label="Airsoft history and current state"
      className="md:px-8 lg:px-14"
      style={{ background: '#080808', width: '100%' }}
    >
      {/* ── Tab bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          borderBottom: '2px solid rgba(255,255,255,0.06)',
          height: '40px',
        }}
      >
        {/* Left cap — desktop only */}
        <div className="hidden md:block" style={{ width: '8px', height: '28px', background: '#ffffff', flexShrink: 0 }} aria-hidden="true" />

        {/* Logo mark — desktop only */}
        <div className="hidden md:block" style={{ padding: '0 10px', flexShrink: 0, position: 'relative', width: '46px', height: '28px' }} aria-hidden="true">
          <Image
            src="/logos/white logo.png"
            alt=""
            fill
            sizes="36px"
            style={{ objectFit: 'contain', mixBlendMode: 'screen' }}
          />
        </div>

        {/* HISTORY tab */}
        <button
          onClick={() => setActiveTab('history')}
          aria-pressed={activeTab === 'history'}
          className="flex-1 md:flex-none"
          style={{
            width: undefined,
            minWidth: 0,
            height: '28px',
            background: activeTab === 'history' ? '#ffffff' : 'rgba(255,255,255,0.12)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-barlow-condensed)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: activeTab === 'history' ? '#111111' : '#ffffff',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          <span className="hidden md:inline" style={{ width: '180px' }}>HISTORY</span>
          <span className="md:hidden">HISTORY</span>
        </button>

        {/* AIRSOFT NOW tab */}
        <button
          onClick={() => setActiveTab('airsoftNow')}
          aria-pressed={activeTab === 'airsoftNow'}
          className="flex-1 md:flex-none"
          style={{
            minWidth: 0,
            height: '28px',
            background: activeTab === 'airsoftNow' ? '#ffffff' : 'rgba(255,255,255,0.12)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-barlow-condensed)',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            color: activeTab === 'airsoftNow' ? '#111111' : '#ffffff',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          <span className="hidden md:inline" style={{ width: '180px' }}>AIRSOFT NOW</span>
          <span className="md:hidden">AIRSOFT NOW</span>
        </button>

        {/* Spacer — desktop only */}
        <div className="hidden md:block" style={{ flex: 1, height: '28px', background: 'rgba(255,255,255,0.07)' }} aria-hidden="true" />

        {/* Right cap — desktop only */}
        <div className="hidden md:block" style={{ width: '8px', height: '28px', background: '#ffffff', flexShrink: 0 }} aria-hidden="true" />
      </div>

      {/* ── Content area ── */}
      <div style={{ display: 'flex', position: 'relative' }}>

        {/* Left decorative bar — desktop only */}
        <div
          className="hidden md:block"
          style={{ width: '42px', flexShrink: 0, position: 'relative', borderRight: '1px solid rgba(255,255,255,0.06)' }}
          aria-hidden="true"
        >
          {[80, 140, 200, 260, 320, 380, 440].map(y => (
            <div key={y} style={{ position: 'absolute', top: y, right: 0, width: '8px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          ))}
          <div style={{ position: 'absolute', top: '80px', left: '16px', width: '7px', height: '60px', background: '#ffffff' }} />
          <div style={{ position: 'absolute', top: '200px', left: '16px', width: '7px', height: '20px', background: '#333333' }} />
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>

          {/* ── MOBILE layout: radar top, scrollable text below ── */}
          <div className="md:hidden flex flex-col">
            {/* Image — compact mobile */}
            <div
              style={{
                height: '260px',
                position: 'relative',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: '10px', left: '10px', width: '14px', height: '14px', borderTop: '1px solid rgba(255,255,255,0.3)', borderLeft: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', top: '10px', right: '10px', width: '14px', height: '14px', borderTop: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '14px', height: '14px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderLeft: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '14px', height: '14px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', inset: '24px', overflow: 'hidden' }}>
                <Image
                  src={tab.image}
                  alt={tab.heading}
                  fill
                  sizes="390px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>

            {/* Scrollable text */}
            <div
              style={{
                height: '260px',
                overflowY: 'auto',
                padding: '24px 20px',
                position: 'relative',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#ffffff',
                  textDecoration: 'underline',
                  textUnderlineOffset: '5px',
                  textDecorationColor: 'rgba(255,255,255,0.5)',
                  marginBottom: '20px',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                }}
              >
                {tab.heading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tab.paragraphs.map((para, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '15px', color: '#8A8A8A', lineHeight: 1.8 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ── DESKTOP layout: text left, radar right ── */}
          <div
            className="hidden md:grid"
            style={{ gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}
          >
            {/* Text panel */}
            <div style={{ padding: '56px 48px 56px 40px', borderRight: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.12)' }} aria-hidden="true" />
              <div style={{ position: 'absolute', left: '28px', top: '80px', bottom: '56px', width: '2px', background: 'linear-gradient(to bottom, rgba(207,255,85,0.6), rgba(207,255,85,0))' }} aria-hidden="true" />
              <h2
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  textDecorationColor: 'rgba(255,255,255,0.5)',
                  marginBottom: '32px',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                }}
              >
                {tab.heading}
              </h2>
              <div style={{ overflowY: 'auto', maxHeight: '320px', paddingRight: '6px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {tab.paragraphs.map((para, i) => (
                  <p key={i} style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '16px', color: '#8A8A8A', lineHeight: 1.85 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Image panel — desktop */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '16px', left: '16px', width: '20px', height: '20px', borderTop: '1px solid rgba(255,255,255,0.3)', borderLeft: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', top: '16px', right: '16px', width: '20px', height: '20px', borderTop: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '20px', height: '20px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderLeft: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '20px', height: '20px', borderBottom: '1px solid rgba(255,255,255,0.3)', borderRight: '1px solid rgba(255,255,255,0.3)', zIndex: 2 }} aria-hidden="true" />
              <div style={{ position: 'absolute', inset: '36px', overflow: 'hidden' }}>
                <Image
                  src={tab.image}
                  alt={tab.heading}
                  fill
                  sizes="50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right decorative panel — desktop only */}
        <div
          className="hidden md:flex"
          style={{ width: '84px', flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.06)', flexDirection: 'column', alignItems: 'center', paddingTop: '44px', gap: '4px' }}
          aria-hidden="true"
        >
          {[
            { num: '01', active: activeTab === 'history' },
            { num: '02', active: activeTab === 'airsoftNow' },
          ].map(({ num, active }) => (
            <div
              key={num}
              style={{
                width: '74px',
                height: '74px',
                border: active ? 'none' : '1px solid #909090',
                background: active ? 'rgba(207,255,85,0.15)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                padding: '8px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-space-mono)', fontSize: '9px', color: active ? '#CFFF55' : '#909090', letterSpacing: '0.1em' }}>SPEC</div>
              <div style={{ fontFamily: 'var(--font-orbitron)', fontSize: '28px', color: active ? '#CFFF55' : '#909090', lineHeight: 1 }}>{num}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom status bar ── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div style={{ width: '13px', height: '13px', background: '#909090', flexShrink: 0 }} aria-hidden="true" />
        <span style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.15em', color: '#ffffff' }}>
          ASTRA TACTICAL
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />
        <div className="hidden md:block" style={{ width: '180px', height: '4px', background: 'rgba(0,119,255,0.45)', flexShrink: 0 }} aria-hidden="true" />
      </div>
    </section>
  )
}
