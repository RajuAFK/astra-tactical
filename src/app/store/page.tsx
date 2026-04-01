'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ShieldCheck, Package, Shirt, Radio } from 'lucide-react'
import HUDFrame from '@/components/ui/HUDFrame'
import type { ElementType } from 'react'

type Category = 'ALL' | 'PROTECTION' | 'APPAREL' | 'ACCESSORIES' | 'AMMUNITION'

interface Product {
  name: string
  category: Exclude<Category, 'ALL'>
  Icon: ElementType
}

const allProducts: Product[] = [
  { name: 'Tactical Vest', category: 'PROTECTION', Icon: ShieldCheck },
  { name: 'Ballistic Eye Pro', category: 'PROTECTION', Icon: ShieldCheck },
  { name: 'Knee Pads', category: 'PROTECTION', Icon: ShieldCheck },
  { name: 'Full Face Mask', category: 'PROTECTION', Icon: ShieldCheck },
  { name: '0.2g BBs 5000pk', category: 'AMMUNITION', Icon: Package },
  { name: '0.25g BBs 3000pk', category: 'AMMUNITION', Icon: Package },
  { name: 'Tactical Gloves', category: 'APPAREL', Icon: Shirt },
  { name: 'Combat Pants', category: 'APPAREL', Icon: Shirt },
  { name: 'Radio Pouch', category: 'ACCESSORIES', Icon: Radio },
  { name: 'Holster', category: 'ACCESSORIES', Icon: Radio },
  { name: 'Sling Mount', category: 'ACCESSORIES', Icon: Radio },
  { name: 'Hydration Carrier', category: 'ACCESSORIES', Icon: Radio },
]

const categories: Category[] = ['ALL', 'PROTECTION', 'APPAREL', 'ACCESSORIES', 'AMMUNITION']

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filtered =
    activeCategory === 'ALL'
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory)

  const openModal = (productName: string) => {
    setSelectedProduct(productName)
    setSubmitted(false)
    setEmail('')
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('registered_interest').insert({ email, product: selectedProduct })
    setSubmitted(true)
    setTimeout(() => setModalOpen(false), 2000)
  }

  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg flex items-center justify-center"
        style={{ minHeight: '40vh', paddingTop: '96px', background: '#080808' }}
        aria-label="Store hero"
      >
        <HUDFrame label="TACTICAL SUPPLY" className="text-center">
          <div className="py-4 px-8">
            <h1
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: 'clamp(24px, 5vw, 36px)',
                color: '#ffffff',
                marginBottom: '12px',
              }}
            >
              GEAR UP. GEAR RIGHT.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: '12px',
                color: '#ffffff',
              }}
            >
              Status: STORE OPENS Q3 2025
            </p>
          </div>
        </HUDFrame>
      </section>

      {/* Filter bar */}
      <div
        className="sticky top-16 z-40 flex gap-3 flex-wrap px-6 py-3 backdrop-blur-md"
        style={{
          background: 'rgba(10,10,10,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
        role="toolbar"
        aria-label="Filter products by category"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-label={`Filter by ${cat}`}
            aria-pressed={activeCategory === cat}
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '11px',
              border: `1px solid ${activeCategory === cat ? '#ffffff' : 'rgba(255,255,255,0.1)'}`,
              color: activeCategory === cat ? '#ffffff' : '#8A8A8A',
              background: activeCategory === cat ? 'rgba(255,255,255,0.05)' : 'transparent',
              padding: '4px 14px',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              borderRadius: 0,
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div
        style={{ background: '#0A0A0A', padding: '24px' }}
        aria-label="Product grid"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1px', maxWidth: '1400px', margin: '0 auto' }}
        >
          {filtered.map((product) => (
            <div
              key={product.name}
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 0,
              }}
            >
              {/* Image area */}
              <div
                style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #1a1a1a, #111)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-hidden="true"
              >
                <product.Icon size={40} color="rgba(255,255,255,0.1)" />
              </div>

              {/* Content */}
              <div style={{ padding: '16px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '9px',
                    color: '#8A8A8A',
                    letterSpacing: '0.15em',
                  }}
                >
                  {product.category}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '13px',
                    color: '#ffffff',
                    marginTop: '4px',
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '14px',
                    color: '#ffffff',
                    marginTop: '8px',
                  }}
                >
                  ₹—,—
                </div>
                <button
                  onClick={() => openModal(product.name)}
                  aria-label={`Notify me when ${product.name} is available`}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '11px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#ffffff',
                    background: 'transparent',
                    padding: '8px',
                    marginTop: '12px',
                    cursor: 'pointer',
                    letterSpacing: '0.1em',
                    borderRadius: 0,
                  }}
                >
                  NOTIFY ME
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Below grid CTA */}
        <div className="text-center" style={{ padding: '48px 24px' }}>
          <p
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: '18px',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            Want to be notified when we go live?
          </p>
          <button
            onClick={() => openModal('Astra Tactical Store')}
            aria-label="Notify me when the store goes live"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '13px',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#ffffff',
              padding: '14px 32px',
              background: 'transparent',
              cursor: 'pointer',
              letterSpacing: '0.1em',
              borderRadius: 0,
            }}
          >
            NOTIFY ME WHEN WE GO LIVE
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`Notify me form for ${selectedProduct}`}
        >
          <div
            style={{
              maxWidth: '400px',
              width: '90%',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '32px',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                color: '#8A8A8A',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '18px',
                fontFamily: 'var(--font-space-mono)',
              }}
            >
              ✕
            </button>
            <HUDFrame label="NOTIFY ME">
              {submitted ? (
                <p
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '12px',
                    color: '#ffffff',
                    padding: '16px 0',
                  }}
                >
                  REGISTERED. WE&apos;LL BRIEF YOU SOON.
                </p>
              ) : (
                <form onSubmit={handleSubmit} aria-label="Store notification form">
                  <div
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      fontSize: '14px',
                      color: '#ffffff',
                      marginBottom: '8px',
                    }}
                  >
                    REGISTER INTEREST
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '14px',
                      color: '#8A8A8A',
                      marginBottom: '16px',
                    }}
                  >
                    Be first when {selectedProduct} drops.
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    aria-label="Your email address"
                    style={{
                      width: '100%',
                      background: 'transparent',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.3)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '14px',
                      outline: 'none',
                      padding: '8px 0',
                      marginBottom: '16px',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Submit store interest notification"
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      color: '#ffffff',
                      fontFamily: 'var(--font-orbitron)',
                      fontSize: '12px',
                      padding: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '0.1em',
                      borderRadius: 0,
                    }}
                  >
                    SUBMIT
                  </button>
                </form>
              )}
            </HUDFrame>
          </div>
        </div>
      )}
    </>
  )
}
