'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Package, Shirt, Target, Tent, Crosshair, Wrench,
  ChevronRight, ArrowLeft, X, LayoutGrid, ChevronLeft, Clock,
} from 'lucide-react'
import type { ElementType } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const BG       = '#131313'
const BG_HERO  = '#0A0A0A'
const BG_SIDE  = '#161616'
const BG_CARD  = '#1A1A1A'
const BORDER   = 'rgba(255,255,255,0.07)'
const ACCENT   = '#CFFF55'
const MONO     = 'var(--font-space-mono)'
const ORB      = 'var(--font-orbitron)'
const RAJ      = 'var(--font-rajdhani)'

const SIDE_FULL  = 280
const SIDE_STRIP =  48

// ─── Types ────────────────────────────────────────────────────────────────────

type Product = { name: string; price: string; desc?: string; badge?: string }
type PClass  = { label: string; abbr: string; products: Product[] }
type Cat     = { label: string; code: string; accent: string; priceColor: string; Icon: ElementType; desc: string; comingSoon?: boolean; eta?: string; classes: Record<string, PClass> }

// ─── Catalog ──────────────────────────────────────────────────────────────────

const catalog: Record<string, Cat> = {
  PROTECTION: {
    label: 'Protection', code: 'PROT', accent: '#22C55E', priceColor: '#86EFAC', Icon: Shield,
    desc: 'Helmets · Vests · Eye Pro · Face Pro',
    classes: {
      HELMETS:  { label: 'Helmets & Head Protection', abbr: 'HLM', products: [
        { name: 'FAST Helmet — MICH Style',     price: '₹2,800', badge: 'NEW',       desc: 'ABS construction. MOLLE-compatible rail.' },
        { name: 'Bump Helmet — ABS',             price: '₹1,900',                    desc: 'Lightweight bump helmet with side rail.' },
        { name: 'FAST Helmet — Carbon Fibre',    price: '₹3,400',                    desc: 'Carbon-pattern ABS. Accepts FAST accessories.' },
      ]},
      VESTS:    { label: 'Vests & Plate Carriers', abbr: 'VST', products: [
        { name: 'JPC 2.0 Style Plate Carrier',  price: '₹4,200', badge: 'HOT',       desc: 'Lightweight. Accepts standard 10×12 plates.' },
        { name: 'CPC Plate Carrier',             price: '₹3,600',                    desc: 'Full MOLLE coverage front and back.' },
        { name: 'Micro Fight Chest Rig',         price: '₹2,100',                    desc: 'Minimal rig for speedsoft and CQB.' },
      ]},
      EYEPRO:   { label: 'Eye Protection', abbr: 'EYE', products: [
        { name: 'Ballistic Eye Pro — Clear',     price: '₹1,200', badge: 'ESSENTIAL', desc: 'Anti-fog. Fits over glasses. ANSI Z87.1.' },
        { name: 'Ballistic Eye Pro — Smoked',    price: '₹1,200',                    desc: 'Tinted lens. Same protection rating.' },
        { name: 'Full Seal Goggles',             price: '₹1,600',                    desc: 'Full-seal foam gasket. No gaps.' },
      ]},
      FACEPRO:  { label: 'Face Protection', abbr: 'FCE', products: [
        { name: 'Full Face Mesh Mask',           price: '₹950',                      desc: 'Wire mesh rated to 350 FPS.' },
        { name: 'Lower Half Mesh Guard',         price: '₹580',                      desc: 'Pairs with goggles. Breathable.' },
        { name: 'Skull Balaclava',               price: '₹780',  badge: 'NEW',       desc: 'Skull-print fabric. Pairs with full goggles.' },
      ]},
    },
  },
  APPAREL: {
    label: 'Apparel', code: 'APRL', accent: '#3B82F6', priceColor: '#93C5FD', Icon: Shirt,
    desc: 'Combat Shirts · BDUs · Gloves',
    classes: {
      TOPS:    { label: 'Combat Shirts & Tops', abbr: 'TOP', products: [
        { name: 'Combat Shirt — Multicam',       price: '₹1,800',                    desc: 'Ripstop. Elbow-pad sleeve compatible.' },
        { name: 'Tactical T-Shirt — Black',      price: '₹890',                     desc: 'Cotton-poly blend. Reinforced shoulders.' },
        { name: 'Longsleeve Shooter Shirt',      price: '₹1,400',                    desc: 'Grid-fleece panels. Moisture-wicking.' },
      ]},
      BOTTOMS: { label: 'Combat Trousers', abbr: 'BTM', products: [
        { name: 'Tactical Combat Pants — OD',    price: '₹2,200',                    desc: 'Ripstop. Knee pad pockets. Double-stitched.' },
        { name: 'BDU Trousers — Multicam',       price: '₹2,600', badge: 'HOT',      desc: 'Classic BDU cut. Full Multicam pattern.' },
        { name: 'Lightweight Cargo Pants',       price: '₹1,800',                    desc: 'Breathable for warm-weather ops.' },
      ]},
      GLOVES:  { label: 'Gloves', abbr: 'GLV', products: [
        { name: 'Full Finger Tactical Gloves',   price: '₹980',                     desc: 'Reinforced knuckles. Touchscreen compatible.' },
        { name: 'Half Finger Shooters Gloves',   price: '₹780',                     desc: 'Better trigger feel. Padded palm.' },
      ]},
    },
  },
  ACCESSORIES: {
    label: 'Accessories', code: 'ACCS', accent: '#F59E0B', priceColor: '#FDE68A', Icon: Target,
    desc: 'Optics · Slings · Holsters · Pouches',
    classes: {
      SLINGS:  { label: 'Slings & Holsters', abbr: 'SLG', products: [
        { name: '2-Point Rifle Sling — Black',   price: '₹620',                     desc: 'Quick-adjust. Universal barrel fit.' },
        { name: '1-Point QD Sling',              price: '₹780',                     desc: 'Single-point for CQB.' },
        { name: 'Drop Leg Platform Holster',      price: '₹1,100',                   desc: 'Adjustable leg strap. MOLLE attachment.' },
      ]},
      POUCHES: { label: 'Pouches & Rigs', abbr: 'PCH', products: [
        { name: 'M4 Double Mag Pouch',           price: '₹420',                     desc: 'Fits M4/M16 30-round mags.' },
        { name: 'Admin Pouch — MOLLE',           price: '₹580',                     desc: 'Panel organiser with slots.' },
        { name: 'Radio Pouch',                   price: '₹490',                     desc: 'Fits most handheld radios.' },
        { name: 'Hydration Carrier',             price: '₹960',                     desc: '2 L bladder compatible.' },
      ]},
      OPTICS:  { label: 'Optics & Sights', abbr: 'OPT', products: [
        { name: 'Red Dot Sight — 1×',            price: '₹1,600', badge: 'NEW',      desc: '21 mm Picatinny. 50,000 h battery life.' },
        { name: 'Holographic Sight',             price: '₹2,200',                   desc: 'QD mount. Multiple reticle patterns.' },
        { name: 'Magnifier 3× Swing Mount',      price: '₹3,800',                   desc: 'Swing-to-side for CQB transitions.' },
      ]},
    },
  },
  AMMUNITION: {
    label: 'Ammunition', code: 'AMMO', accent: '#EF4444', priceColor: '#FCA5A5', Icon: Package,
    desc: 'Standard · Bio · Tracer BBs',
    classes: {
      STANDARD: { label: 'Standard BBs',          abbr: 'STD', products: [
        { name: '0.20g BBs — 5,000 pk',           price: '₹480',  badge: 'ESSENTIAL', desc: 'Seamless, polished. Ideal for CQB.' },
        { name: '0.25g BBs — 3,000 pk',           price: '₹520',                     desc: 'Better trajectory on mid-range AEGs.' },
        { name: '0.28g BBs — 2,500 pk',           price: '₹540',                     desc: 'Recommended for upgraded AEGs and DMRs.' },
      ]},
      BIO:      { label: 'Biodegradable BBs',      abbr: 'BIO', products: [
        { name: 'Bio 0.20g — 3,000 pk',           price: '₹680',  badge: 'ECO',       desc: 'Fully biodegradable. Mandatory at most outdoor sites.' },
        { name: 'Bio 0.25g — 2,500 pk',           price: '₹720',  badge: 'ECO',       desc: 'Certified. Match accuracy to standard BBs.' },
      ]},
      TRACER:   { label: 'Tracer BBs',             abbr: 'TRC', products: [
        { name: 'Tracer 0.20g — 2,000 pk',        price: '₹880',  badge: 'NEW',       desc: 'Glow under UV from a tracer unit.' },
        { name: 'Tracer 0.25g — 1,500 pk',        price: '₹920',                     desc: 'Heavier tracer for higher-FPS builds.' },
      ]},
    },
  },
  SURVIVAL: {
    label: 'Survival Gear', code: 'SURV', accent: '#F97316', priceColor: '#FDBA74', Icon: Tent,
    desc: 'Camping · Navigation · Fire · Hydration',
    classes: {
      CAMPING:    { label: 'Camping Gear',          abbr: 'CMP', products: [
        { name: 'Emergency Bivvy Bag',             price: '₹1,400',                   desc: 'Retains 90% body heat. Windproof outer layer.' },
        { name: 'Silnylon Tarp — 3×3m',            price: '₹980',                     desc: '8 guy-out points. Packs to fist size.' },
        { name: 'Paracord — 30m',                  price: '₹380',  badge: 'ESSENTIAL', desc: '550 lb rated. 7-strand inner core.' },
        { name: 'Folding Camp Shovel',             price: '₹860',                     desc: 'Hardened steel blade. Tri-fold compact.' },
      ]},
      NAVIGATION: { label: 'Navigation Tools',     abbr: 'NAV', products: [
        { name: 'Military Lensatic Compass',       price: '₹1,200',                   desc: 'Luminous dial. Declination-adjustable bezel.' },
        { name: 'Baseplate Orienteering Compass',  price: '₹680',  badge: 'NEW',       desc: 'UTM grid. Built-in magnifier lens.' },
        { name: 'Waterproof Map Case',             price: '₹480',                     desc: 'A4/A5 fold. Double-seal zip. Lanyard loop.' },
        { name: 'Topographic Ruler Set',           price: '₹320',                     desc: '1:25k and 1:50k scales. Grid reference tool.' },
      ]},
      FIRE:       { label: 'Fire Starters',         abbr: 'FIR', products: [
        { name: 'Ferro Rod Fire Starter',          price: '₹580',  badge: 'ESSENTIAL', desc: '12,000+ strike rated. Works wet.' },
        { name: 'Waterproof Matches — 50 pk',      price: '₹280',                     desc: 'Windproof. Burns 12 seconds per match.' },
        { name: 'Fire Paste Tabs — 10 pk',         price: '₹320',                     desc: 'Burns in rain and wind. No igniter needed.' },
      ]},
      HYDRATION:  { label: 'Hydration Systems',    abbr: 'HYD', products: [
        { name: '2L Hydration Bladder',            price: '₹1,100', badge: 'NEW',      desc: 'BPA-free. Universal fit hose. Bite valve.' },
        { name: '3L Hydration Bladder',            price: '₹1,300',                   desc: 'Wide-mouth fill. Dishwasher-safe body.' },
        { name: 'Hydration Pack — 10L',            price: '₹2,800',                   desc: 'Integrated 2L bladder. External MOLLE loops.' },
      ]},
    },
  },
  REPLICAS: {
    label: 'Replicas', code: 'REPL', accent: '#CFFF55', priceColor: '#E9FF99', Icon: Crosshair,
    desc: 'AEGs · GBBs · Sniper Rifles · Pistols',
    comingSoon: true, eta: 'Q3 2026',
    classes: {},
  },
  UPGRADES: {
    label: 'Upgrade Parts', code: 'UPGR', accent: '#A855F7', priceColor: '#D8B4FE', Icon: Wrench,
    desc: 'Internals · Barrels · Hop-Up · Motors',
    comingSoon: true, eta: 'Q4 2026',
    classes: {},
  },
}

// ─── Hero slides ──────────────────────────────────────────────────────────────

const HERO_SLIDES = [
  { tag: 'TACTICAL SUPPLY',    line1: 'GEAR UP.',        line2: 'GEAR RIGHT.',    sub: "India's first dedicated airsoft tactical supply platform.",        accent: ACCENT,    catKey: null            },
  { tag: 'PROTECTION SERIES',  line1: 'PROTECT',         line2: 'YOUR OP.',       sub: 'Helmets, plate carriers, eye & face protection — field-ready.',    accent: '#22C55E', catKey: 'PROTECTION'    },
  { tag: 'APPAREL LINE',       line1: 'DRESS',           line2: 'THE OP.',        sub: 'Combat shirts, BDUs and tactical gloves for every engagement.',     accent: '#3B82F6', catKey: 'APPAREL'       },
  { tag: 'ACCESSORIES',        line1: 'KITTED',          line2: 'OUT.',           sub: 'Optics, slings, holsters and MOLLE pouches, fully spec\'d.',        accent: '#F59E0B', catKey: 'ACCESSORIES'   },
  { tag: 'AMMUNITION',         line1: 'LOADED &',        line2: 'ACCURATE.',      sub: 'Standard, biodegradable and tracer BBs for every setup.',           accent: '#EF4444', catKey: 'AMMUNITION'    },
  { tag: 'SURVIVAL SERIES',   line1: 'BUILT TO',        line2: 'SURVIVE.',       sub: 'Camping, navigation, fire starters and hydration for field ops.',    accent: '#F97316', catKey: 'SURVIVAL'      },
  { tag: 'REPLICAS — Q3 2026', line1: 'YOUR',           line2: 'WEAPON.',        sub: 'Astra-spec AEGs, GBBs and sniper rifles. Launching Q3 2026.',         accent: '#CFFF55', catKey: 'REPLICAS'      },
  { tag: 'UPGRADE PARTS — Q4 2026', line1: 'BUILD.',    line2: 'UPGRADE.',       sub: 'Internals, precision barrels, hop-up units and motors. Coming Q4 2026.', accent: '#A855F7', catKey: 'UPGRADES'      },
]

// ─── Marquee cards ────────────────────────────────────────────────────────────

const MARQUEE_CARDS = [
  { label: 'PROTECTION',   sub: 'Helmets · Vests · Eye Pro · Face Pro', accent: '#22C55E', catKey: 'PROTECTION'  },
  { label: 'APPAREL',      sub: 'Combat Shirts · BDUs · Gloves',         accent: '#3B82F6', catKey: 'APPAREL'     },
  { label: 'ACCESSORIES',  sub: 'Optics · Slings · Holsters · Pouches',  accent: '#F59E0B', catKey: 'ACCESSORIES' },
  { label: 'AMMUNITION',   sub: 'Standard · Bio · Tracer BBs',           accent: '#EF4444', catKey: 'AMMUNITION'  },
  { label: 'SURVIVAL GEAR', sub: 'Camping · Navigation · Fire · Hydration', accent: '#F97316', catKey: 'SURVIVAL'    },
  { label: 'REPLICAS',      sub: 'Coming Q3 2026',                          accent: '#CFFF55', catKey: 'REPLICAS'    },
  { label: 'UPGRADE PARTS', sub: 'Coming Q4 2026',                          accent: '#A855F7', catKey: 'UPGRADES'   },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const BADGE_COL: Record<string, string> = { NEW:'#22C55E', HOT:'#EF4444', ESSENTIAL:'#3B82F6', ECO:'#22C55E' }
const t025 = { duration: 0.25, ease: [0.32,0,0.67,0] as [number,number,number,number] }
const t035 = { duration: 0.35, ease: [0.32,0,0.67,0] as [number,number,number,number] }
const fromL = { opacity: 0, x: -16 }
const fromR = { opacity: 0, x:  16 }
const toC   = { opacity: 1, x:   0 }
const outL  = { opacity: 0, x: -16 }

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// ── Hero Slider ───────────────────────────────────────────────────────────────

function HeroSlider({ onCatSelect }: { onCatSelect: (key: string) => void }) {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % HERO_SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [paused])

  const slide = HERO_SLIDES[idx]

  return (
    <div
      style={{ position: 'relative', height: '360px', overflow: 'hidden', background: BG_HERO, borderBottom: `1px solid ${BORDER}` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 70% 80% at 30% 50%, ${slide.accent}12 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Corner brackets */}
      {[
        { top:16, left:16,   borderTop:`2px solid ${slide.accent}55`, borderLeft:`2px solid ${slide.accent}55` },
        { top:16, right:16,  borderTop:`2px solid ${slide.accent}55`, borderRight:`2px solid ${slide.accent}55` },
        { bottom:16, left:16,  borderBottom:`2px solid ${slide.accent}22`, borderLeft:`2px solid ${slide.accent}22` },
        { bottom:16, right:16, borderBottom:`2px solid ${slide.accent}22`, borderRight:`2px solid ${slide.accent}22` },
      ].map((s, i) => (
        <div key={i} style={{ position:'absolute', width:28, height:28, ...s }} />
      ))}

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '0 48px',
            maxWidth: '760px',
          }}
        >
          <p style={{ fontFamily: MONO, fontSize: '10px', color: slide.accent, letterSpacing: '0.2em', opacity: 0.75, marginBottom: '16px' }}>
            // {slide.tag}
          </p>
          <h1 style={{ fontFamily: ORB, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, lineHeight: 0.92, color: '#fff', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            {slide.line1}<br /><span style={{ color: slide.accent }}>{slide.line2}</span>
          </h1>
          <p style={{ fontFamily: RAJ, fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', lineHeight: 1.6, marginBottom: '28px' }}>
            {slide.sub}
          </p>
          {slide.catKey && (
            <button
              onClick={() => onCatSelect(slide.catKey!)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 22px', background: `${slide.accent}18`,
                border: `1px solid ${slide.accent}55`, borderRadius: '2px',
                color: slide.accent, fontFamily: MONO, fontSize: '10px',
                letterSpacing: '0.12em', cursor: 'pointer', width: 'fit-content',
              }}
            >
              BROWSE {slide.tag.split(' ')[0]} <ChevronRight size={12} />
            </button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Slide counter + dots */}
      <div style={{ position: 'absolute', bottom: 20, right: 24, display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
          {String(idx + 1).padStart(2,'0')} / {String(HERO_SLIDES.length).padStart(2,'0')}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: i === idx ? 20 : 6, height: 6, borderRadius: 3,
                background: i === idx ? slide.accent : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
        {/* Prev / Next */}
        <button onClick={() => setIdx(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          style={{ background:'none', border:`1px solid ${BORDER}`, color:'rgba(255,255,255,0.4)', cursor:'pointer', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2 }}>
          <ChevronLeft size={13} />
        </button>
        <button onClick={() => setIdx(i => (i + 1) % HERO_SLIDES.length)}
          style={{ background:'none', border:`1px solid ${BORDER}`, color:'rgba(255,255,255,0.4)', cursor:'pointer', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:2 }}>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  )
}

// ── Marquee ───────────────────────────────────────────────────────────────────

function HeroMarquee({ onCatSelect }: { onCatSelect: (key: string | null) => void }) {
  const items = [...MARQUEE_CARDS, ...MARQUEE_CARDS, ...MARQUEE_CARDS]
  return (
    <div style={{ overflow:'hidden', background: BG_HERO, borderBottom:`1px solid ${BORDER}`, position:'relative' }}>
      {(['left','right'] as const).map(side => (
        <div key={side} style={{
          position:'absolute', top:0, bottom:0, [side]:0, width:80,
          background:`linear-gradient(to ${side==='left'?'right':'left'}, ${BG_HERO}, transparent)`,
          zIndex:1, pointerEvents:'none',
        }} />
      ))}
      <style>{`@keyframes store-ticker{from{transform:translateX(0)}to{transform:translateX(calc(-100%/3))}}`}</style>
      <div style={{ display:'flex', gap:'10px', padding:'20px 10px', width:'fit-content', animation:'store-ticker 30s linear infinite' }}>
        {items.map((c, i) => (
          <button
            key={i}
            onClick={() => onCatSelect(c.catKey)}
            style={{
              width:220, flexShrink:0,
              border:`1px solid ${c.accent+'30'}`,
              borderRadius:3, padding:'16px 16px',
              background:`linear-gradient(135deg, ${c.accent}08 0%, transparent 70%)`,
              cursor: 'pointer',
              textAlign:'left', position:'relative', overflow:'hidden',
              opacity: 1,
              transition:'border-color 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = c.accent+'66' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = c.accent+'30' }}
          >
            <div style={{ position:'absolute', top:0, left:0, width:16, height:16, borderTop:`1px solid ${c.accent}`, borderLeft:`1px solid ${c.accent}` }} />
            <p style={{ fontFamily:MONO, fontSize:'8px', color:c.accent, letterSpacing:'0.18em', opacity:0.65, marginBottom:'6px' }}>// CATEGORY</p>
            <h3 style={{ fontFamily:ORB, fontSize:'12px', fontWeight:700, color:'#fff', letterSpacing:'0.06em', marginBottom:'6px' }}>{c.label}</h3>
            <p style={{ fontFamily:MONO, fontSize:'8px', color:'rgba(255,255,255,0.35)', lineHeight:1.6 }}>{c.sub}</p>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', background:`linear-gradient(to right, ${c.accent}44, transparent)` }} />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Category icon strip (48 px) ───────────────────────────────────────────────

function CategoryStrip({ selectedCat, onSelect }: { selectedCat: string|null; onSelect: (key: string) => void }) {
  const [tip, setTip] = useState<string|null>(null)
  return (
    <div style={{ width: SIDE_STRIP, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:12 }}>
      {Object.entries(catalog).map(([key, cat]) => {
        const Icon = cat.Icon
        const active = selectedCat === key
        return (
          <div key={key} style={{ position:'relative' }}
            onMouseEnter={() => setTip(key)}
            onMouseLeave={() => setTip(null)}
          >
            <motion.button
              onClick={() => onSelect(key)}
              animate={{ backgroundColor: active ? `${cat.accent}20` : 'rgba(0,0,0,0)', borderColor: active ? `${cat.accent}55` : 'transparent' }}
              transition={{ duration: 0.15 }}
              style={{
                width:36, height:36, margin:'3px 0',
                display:'flex', alignItems:'center', justifyContent:'center',
                border:'1px solid transparent', borderRadius:3, cursor:'pointer',
              }}
            >
              <Icon size={15} color={active ? cat.accent : 'rgba(255,255,255,0.28)'} />
            </motion.button>
            {/* Tooltip */}
            <AnimatePresence>
              {tip === key && (
                <motion.div
                  initial={{ opacity:0, x:-4 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-4 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    position:'absolute', left:'calc(100% + 6px)', top:'50%', transform:'translateY(-50%)',
                    background:'#222', border:`1px solid ${BORDER}`, padding:'4px 10px', borderRadius:2,
                    fontFamily:MONO, fontSize:'9px', color:'#fff', whiteSpace:'nowrap', pointerEvents:'none', zIndex:20,
                  }}
                >
                  {cat.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ── Class icon strip (48 px) ──────────────────────────────────────────────────

function ClassStrip({ catKey, selectedClass, onSelect }: { catKey: string; selectedClass: string|null; onSelect: (key: string) => void }) {
  const cat = catalog[catKey]
  const [tip, setTip] = useState<string|null>(null)
  return (
    <div style={{ width: SIDE_STRIP, display:'flex', flexDirection:'column', alignItems:'center', paddingTop:12 }}>
      {/* Thin accent top bar */}
      <div style={{ width:2, height:8, background: cat.accent, borderRadius:1, marginBottom:8, opacity:0.5 }} />
      {Object.entries(cat.classes).map(([key, cls]) => {
        const active = selectedClass === key
        return (
          <div key={key} style={{ position:'relative' }}
            onMouseEnter={() => setTip(key)}
            onMouseLeave={() => setTip(null)}
          >
            <motion.button
              onClick={() => onSelect(key)}
              animate={{ backgroundColor: active ? `${cat.accent}20` : 'rgba(0,0,0,0)', borderColor: active ? `${cat.accent}55` : 'transparent' }}
              transition={{ duration: 0.15 }}
              style={{
                width:36, height:36, margin:'3px 0',
                display:'flex', alignItems:'center', justifyContent:'center',
                border:'1px solid transparent', borderRadius:3, cursor:'pointer', overflow:'hidden',
              }}
            >
              <span style={{
                fontFamily:MONO, fontSize:'7px', letterSpacing:'0.04em',
                color: active ? cat.accent : 'rgba(255,255,255,0.28)',
                writingMode:'vertical-rl', textOrientation:'mixed',
                transform:'rotate(180deg)',
              }}>
                {cls.abbr}
              </span>
            </motion.button>
            <AnimatePresence>
              {tip === key && (
                <motion.div
                  initial={{ opacity:0, x:-4 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-4 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    position:'absolute', left:'calc(100% + 6px)', top:'50%', transform:'translateY(-50%)',
                    background:'#222', border:`1px solid ${BORDER}`, padding:'4px 10px', borderRadius:2,
                    fontFamily:MONO, fontSize:'9px', color:'#fff', whiteSpace:'nowrap', pointerEvents:'none', zIndex:20,
                  }}
                >
                  {cls.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ── Full category sidebar ─────────────────────────────────────────────────────

function CategorySidebar({ onSelect }: { onSelect: (key: string) => void }) {
  const [hov, setHov] = useState<string|null>(null)
  return (
    <div style={{ width: SIDE_FULL }}>
      <div style={{ padding:'24px 20px 16px', borderBottom:`1px solid ${BORDER}` }}>
        <p style={{ fontFamily:MONO, fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.18em', marginBottom:8 }}>// BROWSE</p>
        <h2 style={{ fontFamily:ORB, fontSize:'15px', fontWeight:700, color:'#fff', letterSpacing:'0.06em' }}>CATEGORIES</h2>
      </div>
      {Object.entries(catalog).map(([key, cat]) => {
        const Icon = cat.Icon
        const isH = hov === key
        return (
          <motion.button key={key} onClick={() => onSelect(key)}
            onHoverStart={() => setHov(key)} onHoverEnd={() => setHov(null)}
            animate={{ backgroundColor: isH ? `${cat.accent}0E` : 'rgba(0,0,0,0)' }} transition={{ duration:0.15 }}
            style={{ display:'flex', alignItems:'center', gap:14, width:'100%', padding:'15px 20px',
              border:'none', borderBottom:`1px solid ${BORDER}`, borderLeft:`2px solid ${isH ? cat.accent : 'transparent'}`,
              cursor:'pointer', textAlign:'left', color:'#fff', transition:'border-color 0.15s' }}
          >
            <div style={{ width:34, height:34, flexShrink:0, borderRadius:3, background:`${cat.accent}18`, border:`1px solid ${cat.accent}30`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon size={15} color={cat.accent} />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:ORB, fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', marginBottom:3 }}>{cat.label.toUpperCase()}</div>
              <div style={{ fontFamily:MONO, fontSize:'9px', color:'rgba(255,255,255,0.38)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cat.desc}</div>
            </div>
            <ChevronRight size={13} color={isH ? cat.accent : 'rgba(255,255,255,0.18)'} style={{ flexShrink:0 }} />
          </motion.button>
        )
      })}
    </div>
  )
}

// ── Full class sidebar ────────────────────────────────────────────────────────

function ClassSidebar({ catKey, onSelect, onBack }: { catKey:string; onSelect:(key:string)=>void; onBack:()=>void }) {
  const cat = catalog[catKey]
  const [hov, setHov] = useState<string|null>(null)
  return (
    <div style={{ width: SIDE_FULL }}>
      <div style={{ padding:'20px 20px 16px', borderBottom:`1px solid ${BORDER}` }}>
        <button onClick={onBack} style={{ display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', padding:0, marginBottom:12, fontFamily:MONO, fontSize:'9px', letterSpacing:'0.12em' }}>
          <ArrowLeft size={11} /> ALL CATEGORIES
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:cat.accent, flexShrink:0 }} />
          <h2 style={{ fontFamily:ORB, fontSize:'14px', fontWeight:700, color:'#fff', letterSpacing:'0.06em' }}>{cat.label.toUpperCase()}</h2>
        </div>
      </div>
      <p style={{ padding:'14px 20px 6px', fontFamily:MONO, fontSize:'9px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.15em' }}>// SELECT CLASS</p>
      {Object.entries(cat.classes).map(([key, cls]) => {
        const isH = hov === key
        return (
          <motion.button key={key} onClick={() => onSelect(key)}
            onHoverStart={() => setHov(key)} onHoverEnd={() => setHov(null)}
            animate={{ backgroundColor: isH ? `${cat.accent}0E` : 'rgba(0,0,0,0)' }} transition={{ duration:0.15 }}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'14px 20px',
              border:'none', borderBottom:`1px solid ${BORDER}`, borderLeft:`2px solid ${isH ? cat.accent : 'transparent'}`,
              cursor:'pointer', color:'#fff', transition:'border-color 0.15s' }}
          >
            <div style={{ textAlign:'left' }}>
              <div style={{ fontFamily:RAJ, fontSize:'14px', fontWeight:600, letterSpacing:'0.03em', marginBottom:3 }}>{cls.label}</div>
              <div style={{ fontFamily:MONO, fontSize:'9px', color:'rgba(255,255,255,0.32)' }}>{cls.products.length} ITEMS</div>
            </div>
            <ChevronRight size={13} color={isH ? cat.accent : 'rgba(255,255,255,0.18)'} style={{ flexShrink:0 }} />
          </motion.button>
        )
      })}
    </div>
  )
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ product, accent, priceColor, Icon }: { product:Product; accent:string; priceColor:string; Icon:ElementType }) {
  const [hov, setHov] = useState(false)
  const bc = product.badge ? (BADGE_COL[product.badge] ?? accent) : accent
  return (
    <motion.div
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      animate={{ borderColor: hov ? `${accent}55` : BORDER }}
      transition={{ duration: 0.2 }}
      style={{ border:`1px solid ${BORDER}`, borderRadius:3, overflow:'hidden', display:'flex', flexDirection:'column', height:360, background: BG_CARD }}
    >
      {/* ── Image placeholder ─────────────────────── */}
      <div style={{ height:160, flexShrink:0, position:'relative', overflow:'hidden', background:'linear-gradient(150deg, #131313 0%, #1A1A1A 100%)' }}>
        {/* Dot-grid texture */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize:'18px 18px' }} />
        {/* Accent radial glow */}
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 90% 90% at 15% 20%, ${accent}0E, transparent)` }} />
        {/* Corner brackets */}
        <div style={{ position:'absolute', top:10, left:10, width:14, height:14, borderTop:`1px solid ${accent}55`, borderLeft:`1px solid ${accent}55` }} />
        <div style={{ position:'absolute', bottom:10, right:10, width:14, height:14, borderBottom:`1px solid ${accent}25`, borderRight:`1px solid ${accent}25` }} />
        {/* Centred category icon watermark */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ opacity:0.1 }}><Icon size={52} color={accent} /></div>
        </div>
        {/* Badge — top-right overlay */}
        {product.badge && (
          <div style={{ position:'absolute', top:10, right:10, padding:'2px 8px', background:`${bc}22`, border:`1px solid ${bc}44`, borderRadius:2, fontFamily:MONO, fontSize:'8px', color:bc, letterSpacing:'0.1em' }}>
            {product.badge}
          </div>
        )}
        {/* Bottom label */}
        <p style={{ position:'absolute', bottom:8, left:12, fontFamily:MONO, fontSize:'8px', color:'rgba(255,255,255,0.13)', letterSpacing:'0.1em', margin:0 }}>// IMG PENDING</p>
        {/* Hover top accent sweep */}
        <motion.div animate={{ opacity:hov?1:0, scaleX:hov?1:0 }} transition={{ duration:0.2 }}
          style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right, ${accent}, transparent)`, transformOrigin:'left' }} />
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div style={{ flex:1, padding:'14px 16px', display:'flex', flexDirection:'column' }}>
        <h3 style={{
          fontFamily:RAJ, fontSize:'15px', fontWeight:600, color:'#fff', lineHeight:1.3, marginBottom:6,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
        } as React.CSSProperties}>
          {product.name}
        </h3>
        <p style={{
          fontFamily:MONO, fontSize:'9px', color:'rgba(255,255,255,0.35)', lineHeight:1.7, flex:1,
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden',
        } as React.CSSProperties}>
          {product.desc ?? ''}
        </p>
        {/* Footer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:`1px solid ${BORDER}`, marginTop:'auto' }}>
          <span style={{ fontFamily:ORB, fontSize:'15px', fontWeight:700, color:priceColor }}>{product.price}</span>
          <div style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 11px', background:`rgba(255,255,255,0.04)`, border:`1px solid rgba(255,255,255,0.1)`, borderRadius:2 }}>
            <Clock size={10} color="rgba(255,255,255,0.3)" />
            <span style={{ fontFamily:MONO, fontSize:'8px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.1em' }}>COMING SOON</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Product grid ──────────────────────────────────────────────────────────────

function ProductGrid({ catKey, classKey, onBackToClasses, onBackToCategories }: {
  catKey:string; classKey:string; onBackToClasses:()=>void; onBackToCategories:()=>void
}) {
  const cat = catalog[catKey]
  const cls = cat.classes[classKey]
  return (
    <div style={{ padding:'28px 32px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24, flexWrap:'wrap' }}>
        {[{label:'ALL', action:onBackToCategories},{label:cat.label.toUpperCase(), action:onBackToClasses}].map(({label,action},i)=>(
          <span key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <button onClick={action} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.32)', cursor:'pointer', fontFamily:MONO, fontSize:'9px', letterSpacing:'0.12em', padding:0 }}>{label}</button>
            <span style={{ color:'rgba(255,255,255,0.15)', fontFamily:MONO, fontSize:'10px' }}>›</span>
          </span>
        ))}
        <span style={{ fontFamily:MONO, fontSize:'9px', color:cat.accent, letterSpacing:'0.12em' }}>{cls.label.toUpperCase()}</span>
      </div>
      <div style={{ marginBottom:24, borderBottom:`1px solid ${BORDER}`, paddingBottom:18 }}>
        <p style={{ fontFamily:MONO, fontSize:'9px', color:cat.accent, letterSpacing:'0.18em', opacity:0.7, marginBottom:8 }}>// {catKey} · {classKey}</p>
        <h2 style={{ fontFamily:ORB, fontSize:'22px', fontWeight:700, color:'#fff' }}>{cls.label}</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:14 }}>
        {cls.products.map((p,i) => (
          <motion.div key={p.name} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07, duration:0.3, ease:'easeOut' }}>
            <ProductCard product={p} accent={cat.accent} priceColor={cat.priceColor} Icon={cat.Icon} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Browse prompt ─────────────────────────────────────────────────────────────

function BrowsePrompt({ drillDown, catKey }: { drillDown:0|1|2; catKey:string|null }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:360, gap:14 }}>
      <div style={{ width:52, height:52, border:`1px solid ${BORDER}`, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <ChevronRight size={18} color="rgba(255,255,255,0.15)" />
      </div>
      <p style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(255,255,255,0.22)', letterSpacing:'0.15em' }}>
        {(drillDown===0 ? 'SELECT A CATEGORY TO BEGIN' : `SELECT A CLASS WITHIN ${catKey ? catalog[catKey].label.toUpperCase() : ''}`)}
      </p>
    </div>
  )
}

// ── Coming Soon panel ─────────────────────────────────────────────────────────

function ComingSoonPanel({ catKey }: { catKey: string }) {
  const cat = catalog[catKey]
  const Icon = cat.Icon
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:480, gap:28, padding:'40px 32px', textAlign:'center' }}>
      {/* Glow ring */}
      <div style={{ position:'relative' }}>
        <div style={{ width:100, height:100, borderRadius:'50%', border:`1px solid ${cat.accent}30`, background:`${cat.accent}08`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon size={36} color={`${cat.accent}88`} />
        </div>
        <motion.div
          animate={{ opacity:[0.15, 0.35, 0.15] }}
          transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
          style={{ position:'absolute', inset:-12, borderRadius:'50%', border:`1px solid ${cat.accent}`, pointerEvents:'none' }}
        />
      </div>
      {/* Badge */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 14px', border:`1px solid ${cat.accent}40`, background:`${cat.accent}0D`, borderRadius:2 }}>
        <Clock size={11} color={cat.accent} />
        <span style={{ fontFamily:MONO, fontSize:'9px', color:cat.accent, letterSpacing:'0.18em' }}>COMING {cat.eta}</span>
      </div>
      {/* Heading */}
      <div>
        <h2 style={{ fontFamily:ORB, fontSize:'clamp(28px, 4vw, 44px)', fontWeight:700, color:'#fff', lineHeight:1, marginBottom:12 }}>
          {cat.label.toUpperCase()}
        </h2>
        <p style={{ fontFamily:MONO, fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.12em' }}>{cat.desc}</p>
      </div>
      <p style={{ fontFamily:RAJ, fontSize:'16px', color:'rgba(255,255,255,0.45)', maxWidth:380, lineHeight:1.7 }}>
        This category is currently in development. Check back soon — or register your interest to be notified at launch.
      </p>
      {/* Divider line */}
      <div style={{ width:60, height:1, background:`linear-gradient(to right, transparent, ${cat.accent}55, transparent)` }} />
    </div>
  )
}

// ── Mobile menu drawer ────────────────────────────────────────────────────────

function MobileMenu({ onClose, onClassSelect }: { onClose:()=>void; onClassSelect:(cat:string, cls:string)=>void }) {
  const [mobDrill, setMobDrill] = useState<0|1>(0)
  const [mobCat, setMobCat] = useState<string|null>(null)
  return (
    <>
      {/* Backdrop */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', zIndex:998 }}
        onClick={onClose}
      />
      {/* Drawer */}
      <motion.div initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }}
        transition={{ type:'spring', damping:32, stiffness:320 }}
        style={{ position:'fixed', bottom:0, left:0, right:0, height:'72vh', background:BG_SIDE, zIndex:999,
          borderRadius:'16px 16px 0 0', borderTop:`2px solid ${mobCat ? catalog[mobCat].accent : ACCENT}`, overflow:'hidden', display:'flex', flexDirection:'column' }}
      >
        {/* Handle */}
        <div style={{ display:'flex', justifyContent:'center', padding:12 }}>
          <div style={{ width:36, height:4, background:'rgba(255,255,255,0.18)', borderRadius:2 }} />
        </div>
        {/* Close */}
        <button onClick={onClose} style={{ position:'absolute', top:14, right:16, background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer' }}>
          <X size={18} />
        </button>

        <div style={{ flex:1, overflowY:'auto' }}>
          <AnimatePresence mode="wait">
            {mobDrill === 0 ? (
              <motion.div key="mob-cats" initial={fromL} animate={toC} exit={outL} transition={t025}>
                <CategorySidebar onSelect={key => { setMobCat(key); setMobDrill(1) }} />
              </motion.div>
            ) : (
              <motion.div key="mob-cls" initial={fromR} animate={toC} exit={outL} transition={t025}>
                <ClassSidebar
                  catKey={mobCat!}
                  onSelect={key => { onClassSelect(mobCat!, key); onClose() }}
                  onBack={() => setMobDrill(0)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function StorePage() {
  const [drillDown,    setDrillDown]    = useState<0|1|2>(0)
  const [selectedCat,  setSelectedCat]  = useState<string|null>(null)
  const [selectedClass,setSelectedClass]= useState<string|null>(null)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const pickCategory = (key: string) => { setSelectedCat(key); setSelectedClass(null); setDrillDown(1) }
  const pickClass    = (key: string) => { setSelectedClass(key); setDrillDown(2) }
  const backToCats   = ()            => { setDrillDown(0); setSelectedCat(null); setSelectedClass(null) }
  const backToCls    = ()            => { setDrillDown(1); setSelectedClass(null) }

  const mobileClassSelect = (cat: string, cls: string) => {
    setSelectedCat(cat); setSelectedClass(cls); setDrillDown(2)
  }

  // Marquee / hero CTA click
  const handleMarqueeClick = (catKey: string | null) => {
    if (!catKey) return
    pickCategory(catKey)
    // scroll past hero on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) setMobileOpen(true)
  }

  return (
    <div style={{ background:BG, minHeight:'100vh', paddingTop:'88px', color:'#fff' }}>

      {/* ── HERO SLIDER ────────────────────────────────────────────────────── */}
      <HeroSlider onCatSelect={handleMarqueeClick} />

      {/* ── MARQUEE ────────────────────────────────────────────────────────── */}
      <HeroMarquee onCatSelect={handleMarqueeClick} />

      {/* ── STORE BODY ─────────────────────────────────────────────────────── */}
      <div style={{ display:'flex', minHeight:'calc(100vh - 540px)' }}>

        {/* ══ DESKTOP SIDEBARS (hidden on mobile) ═══════════════════════════ */}

        {/* Category column: full ↔ strip */}
        <motion.aside
          className="hidden md:block"
          animate={{ width: drillDown === 0 ? SIDE_FULL : SIDE_STRIP }}
          transition={t035}
          style={{ flexShrink:0, overflow:'hidden', background:BG_SIDE, borderRight:`1px solid ${BORDER}`,
            position:'sticky', top:88, alignSelf:'flex-start', height:'calc(100vh - 88px)', overflowY:'auto' }}
        >
          <AnimatePresence mode="wait">
            {drillDown === 0 ? (
              <motion.div key="cat-full" initial={fromL} animate={toC} exit={outL} transition={t025} style={{ width:SIDE_FULL }}>
                <CategorySidebar onSelect={pickCategory} />
              </motion.div>
            ) : (
              <motion.div key="cat-strip" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={t025} style={{ width:SIDE_STRIP }}>
                <CategoryStrip selectedCat={selectedCat} onSelect={pickCategory} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* Class column: appears when drillDown ≥ 1 and not coming-soon */}
        <AnimatePresence>
          {drillDown >= 1 && selectedCat && !catalog[selectedCat].comingSoon && (
            <motion.aside
              key="class-col"
              className="hidden md:block"
              initial={{ width: 0 }}
              animate={{ width: drillDown === 1 ? SIDE_FULL : SIDE_STRIP }}
              exit={{ width: 0 }}
              transition={t035}
              style={{ flexShrink:0, overflow:'hidden', background:BG_SIDE, borderRight:`1px solid ${BORDER}`,
                position:'sticky', top:88, alignSelf:'flex-start', height:'calc(100vh - 88px)', overflowY:'auto' }}
            >
              <AnimatePresence mode="wait">
                {drillDown === 1 ? (
                  <motion.div key="cls-full" initial={fromR} animate={toC} exit={outL} transition={t025} style={{ width:SIDE_FULL }}>
                    <ClassSidebar catKey={selectedCat} onSelect={pickClass} onBack={backToCats} />
                  </motion.div>
                ) : (
                  <motion.div key="cls-strip" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={t025} style={{ width:SIDE_STRIP }}>
                    <ClassStrip catKey={selectedCat} selectedClass={selectedClass} onSelect={(key) => { setSelectedClass(key) }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Content area ─────────────────────────────────────────────────── */}
        <div style={{ flex:1, minWidth:0 }}>
          <AnimatePresence mode="wait">
            {drillDown >= 1 && selectedCat && catalog[selectedCat].comingSoon ? (
              <motion.div key={`coming-${selectedCat}`}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
                <ComingSoonPanel catKey={selectedCat} />
              </motion.div>
            ) : drillDown === 2 && selectedCat && selectedClass ? (
              <motion.div key={`products-${selectedCat}-${selectedClass}`}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
                <ProductGrid
                  catKey={selectedCat} classKey={selectedClass}
                  onBackToClasses={backToCls} onBackToCategories={backToCats}
                />
              </motion.div>
            ) : (
              <motion.div key="browse" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}>
                <BrowsePrompt drillDown={drillDown} catKey={selectedCat} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ MOBILE: floating browse button ═══════════════════════════════════ */}
      <div className="md:hidden" style={{ position:'fixed', bottom:24, right:20, zIndex:40 }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileOpen(true)}
          style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'11px 20px', background:'#1E1E1E',
            border:`1px solid ${selectedCat ? catalog[selectedCat].accent+'55' : BORDER}`,
            borderRadius:32, color:'#fff', fontFamily:MONO, fontSize:'10px',
            letterSpacing:'0.12em', cursor:'pointer',
            boxShadow:'0 4px 24px rgba(0,0,0,0.7)',
          }}
        >
          <LayoutGrid size={13} color={selectedCat ? catalog[selectedCat].accent : ACCENT} />
          {drillDown > 0 && selectedCat ? catalog[selectedCat].label.toUpperCase() : 'BROWSE'}
        </motion.button>
      </div>

      {/* ══ MOBILE MENU DRAWER ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden">
            <MobileMenu onClose={() => setMobileOpen(false)} onClassSelect={mobileClassSelect} />
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
