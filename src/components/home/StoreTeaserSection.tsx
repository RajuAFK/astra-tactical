'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Package, Shirt, Radio } from 'lucide-react'
import HUDFrame from '@/components/ui/HUDFrame'

function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const products = [
  { name: 'Tactical Vest', category: 'PROTECTION', price: '₹—,—', Icon: ShieldCheck },
  { name: 'Ballistic Eye Pro', category: 'PROTECTION', price: '₹—,—', Icon: ShieldCheck },
  { name: '0.2g BBs — 5000pk', category: 'AMMUNITION', price: '₹—,—', Icon: Package },
  { name: 'Tactical Gloves', category: 'APPAREL', price: '₹—,—', Icon: Shirt },
  { name: 'Knee & Shin Guards', category: 'PROTECTION', price: '₹—,—', Icon: ShieldCheck },
  { name: 'Radio/Comms Pouch', category: 'ACCESSORIES', price: '₹—,—', Icon: Radio },
]

export default function StoreTeaserSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const shouldReduce = useReducedMotion()

  const openModal = (productName: string) => {
    setSelectedProduct(productName)
    setSubmitted(false)
    setEmail('')
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Notify me:', { email, product: selectedProduct })
    setSubmitted(true)
    setTimeout(() => setModalOpen(false), 2000)
  }

  return (
    <section
      style={{ background: '#0A0A0A', padding: '80px 24px' }}
      aria-label="Store teaser section"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '11px',
              color: '#CFFF55',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '12px',
            }}
          >
            // TACTICAL SUPPLY — COMING ONLINE
          </p>
          <span
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '9px',
              border: '1px solid rgba(207,255,85,0.4)',
              color: '#CFFF55',
              padding: '3px 10px',
              letterSpacing: '0.1em',
            }}
          >
            STORE OPENS Q3 2025
          </span>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ maxWidth: '1100px', margin: '0 auto 48px' }}>
          {products.map((product) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={shouldReduce ? {} : { y: -4, borderColor: 'rgba(207,255,85,0.3)' }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduce ? 0 : 0.4 }}
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 0,
                transition: 'border-color 0.2s',
              }}
            >
              {/* Image area */}
              <div
                style={{
                  height: '160px',
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
                    color: '#CFFF55',
                    marginTop: '8px',
                  }}
                >
                  {product.price}
                </div>
                <button
                  onClick={() => openModal(product.name)}
                  aria-label={`Notify me when ${product.name} is available`}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-orbitron)',
                    fontSize: '11px',
                    border: '1px solid rgba(207,255,85,0.3)',
                    color: '#CFFF55',
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
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <motion.a
            href="/store"
            aria-label="Explore the Astra Tactical store"
            whileHover={shouldReduce ? {} : { backgroundColor: 'rgba(207,255,85,0.08)' }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '13px',
              border: '1px solid rgba(207,255,85,0.4)',
              color: '#CFFF55',
              padding: '14px 32px',
              display: 'inline-block',
              textDecoration: 'none',
              letterSpacing: '0.1em',
            }}
          >
            EXPLORE THE STORE →
          </motion.a>
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
              border: '1px solid rgba(207,255,85,0.3)',
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
                    color: '#CFFF55',
                    padding: '16px 0',
                  }}
                >
                  REGISTERED. WE&apos;LL BRIEF YOU SOON.
                </p>
              ) : (
                <form onSubmit={handleSubmit} aria-label="Product notification form">
                  <div
                    style={{
                      fontFamily: 'var(--font-orbitron)',
                      fontSize: '14px',
                      color: '#CFFF55',
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
                      borderBottom: '1px solid rgba(207,255,85,0.3)',
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
                    aria-label="Submit product interest notification"
                    style={{
                      width: '100%',
                      background: '#CFFF55',
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
    </section>
  )
}
