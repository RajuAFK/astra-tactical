'use client'

import { useState } from 'react'
import HUDFrame from '@/components/ui/HUDFrame'
import { Zap } from 'lucide-react'

const faqs = [
  {
    q: 'Is it legal to buy an airsoft gun in India?',
    a: 'Yes. Airsoft guns operating below 2 joules of muzzle energy are classified as sport equipment, not firearms. They can be purchased and owned without an arms license.',
  },
  {
    q: 'Do I need a license to own an airsoft gun?',
    a: 'No license is required for airsoft guns that comply with the sub-2J specification. However, owning a modified gun that exceeds this threshold would require an arms license.',
  },
  {
    q: 'Can I carry it on the street or in public?',
    a: 'No. While ownership is legal, carrying any replica firearm openly in public can cause alarm and may be treated as a public order issue. Always transport in a closed, discreet bag.',
  },
  {
    q: 'What happens if police question me about my airsoft gun?',
    a: "Remain calm and explain that it is a sport replica operating below the 2J legal threshold. Carry documentation such as the product's specifications or purchase receipt. Astra Tactical will publish a legal reference card for members.",
  },
  {
    q: 'Is airsoft the same as paintball?',
    a: 'No. Paintball uses larger paintball projectiles and markers. Airsoft uses 6mm plastic BBs fired from realistic-looking replicas. Both are legitimate sports, but they have distinct equipment, rules, and communities.',
  },
  {
    q: 'Is there a minimum age to play airsoft in India?',
    a: 'There is no legislated minimum age specific to airsoft. However, Astra Tactical enforces a minimum age of 18 at all events. Under-18 participants require explicit guardian consent and supervision.',
  },
]

export default function LegalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg flex items-center justify-center"
        style={{ height: '30vh', background: '#0A0A0A' }}
        aria-label="Legal page hero"
      >
        <HUDFrame label="LEGAL BRIEF" className="text-center">
          <div className="py-4 px-8">
            <h1
              style={{
                fontFamily: 'var(--font-orbitron)',
                fontSize: 'clamp(24px, 6vw, 40px)',
                color: '#ffffff',
                marginBottom: '12px',
              }}
            >
              AIRSOFT IN INDIA
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-rajdhani)',
                fontSize: '16px',
                color: '#8A8A8A',
              }}
            >
              Legal Status &amp; What You Need to Know
            </p>
          </div>
        </HUDFrame>
      </section>

      {/* Main content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '64px 24px',
          background: '#0A0A0A',
        }}
      >
        {/* Section 1 */}
        <section style={{ marginBottom: '56px' }} aria-labelledby="arms-act-heading">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '8px',
            }}
          >
            // THE ARMS ACT
          </p>
          <h2
            id="arms-act-heading"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '22px',
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            The Arms Act, 1959
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: '16px',
              color: '#8A8A8A',
              lineHeight: 1.9,
            }}
          >
            The Arms Act 1959 is the primary legislation governing weapons in India. Under this Act, any device capable of propelling a projectile with a muzzle energy exceeding 2 joules is legally classified as a firearm, and its ownership requires a government-issued arms license.
          </p>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '56px' }} aria-labelledby="threshold-heading">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '8px',
            }}
          >
            // THE THRESHOLD
          </p>
          <h2
            id="threshold-heading"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '22px',
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            The 2-Joule Exception
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-rajdhani)',
              fontSize: '16px',
              color: '#8A8A8A',
              lineHeight: 1.9,
              marginBottom: '24px',
            }}
          >
            Airsoft guns are specifically designed to operate below the 2-joule muzzle energy threshold. This engineering choice is intentional — it keeps the sport equipment classification intact and places airsoft firmly outside the scope of the Arms Act. This is not a legal grey area; it is a clearly defined boundary that responsible airsoft operators like Astra Tactical strictly maintain.
          </p>
          <HUDFrame glowIntensity="medium">
            <div className="flex items-start gap-3 p-2">
              <Zap size={16} color="#ff5722" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <p
                style={{
                  fontFamily: 'var(--font-rajdhani)',
                  fontSize: '15px',
                  color: '#8A8A8A',
                  lineHeight: 1.7,
                }}
              >
                In technical terms: at 0.3g BB mass and 90 m/s velocity, the kinetic energy is approximately 1.2 joules — well within the legal threshold.
              </p>
            </div>
          </HUDFrame>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '56px' }} aria-labelledby="permitted-heading">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '8px',
            }}
          >
            // WHAT IS PERMITTED
          </p>
          <h2
            id="permitted-heading"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '22px',
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            Permitted Activities
          </h2>
          <div className="space-y-3">
            {[
              'Owning an airsoft replica for sport use',
              "Using airsoft replicas on private land with the landowner's permission",
              'Participating in organized airsoft events with certified operators',
              'Transporting equipment in a closed, opaque, non-threatening bag or case',
              'Purchasing BBs and accessories',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '10px',
                    color: '#ff5722',
                    flexShrink: 0,
                    marginTop: '3px',
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: '15px',
                    color: '#8A8A8A',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '56px' }} aria-labelledby="prohibited-heading">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '8px',
            }}
          >
            // WHAT IS NOT PERMITTED
          </p>
          <h2
            id="prohibited-heading"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '22px',
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            Prohibited Activities
          </h2>
          <div className="space-y-3">
            {[
              'Carrying an airsoft gun openly in public spaces',
              'Modifying the gun to exceed the 2J threshold',
              'Removing, painting over, or obscuring the mandatory orange tip indicator',
              'Representing the gun as a real firearm in any context',
              'Using on public land without authorization',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span
                  style={{
                    fontFamily: 'var(--font-space-mono)',
                    fontSize: '10px',
                    color: '#EF4444',
                    flexShrink: 0,
                    marginTop: '3px',
                  }}
                  aria-hidden="true"
                >
                  ✗
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-rajdhani)',
                    fontSize: '15px',
                    color: '#8A8A8A',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — FAQ */}
        <section style={{ marginBottom: '56px' }} aria-labelledby="faq-heading">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '8px',
            }}
          >
            // FAQ
          </p>
          <h2
            id="faq-heading"
            style={{
              fontFamily: 'var(--font-orbitron)',
              fontSize: '22px',
              color: '#ffffff',
              marginBottom: '24px',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  padding: '16px 0',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-label={`Toggle FAQ: ${faq.q}`}
                  aria-expanded={openFaq === i}
                  className="w-full flex justify-between items-center text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '16px',
                      color: '#ffffff',
                      paddingRight: '16px',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-space-mono)',
                      fontSize: '18px',
                      color: '#ff5722',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <p
                    style={{
                      fontFamily: 'var(--font-rajdhani)',
                      fontSize: '15px',
                      color: '#8A8A8A',
                      paddingTop: '12px',
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 — Disclaimer */}
        <section aria-labelledby="disclaimer-heading">
          <p
            style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '10px',
              color: '#ff5722',
              opacity: 0.6,
              letterSpacing: '0.2em',
              marginBottom: '16px',
            }}
          >
            // DISCLAIMER
          </p>
          <HUDFrame label="IMPORTANT">
            <p
              id="disclaimer-heading"
              style={{
                fontFamily: 'var(--font-space-mono)',
                fontSize: '11px',
                color: '#8A8A8A',
                lineHeight: 1.8,
                padding: '8px 0',
              }}
            >
              This page is for informational purposes only and does not constitute legal advice. Laws and their interpretation can vary. Always consult a qualified legal professional for advice specific to your situation. Astra Tactical is not liable for any legal consequences arising from reliance on this content.
            </p>
          </HUDFrame>
        </section>
      </div>
    </>
  )
}
