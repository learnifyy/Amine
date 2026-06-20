import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      label: 'Primary Email',
      value: 'fellah.amine2050@gmail.com',
      icon: '✉',
      copyable: true,
    },
    {
      label: 'Backup Contact',
      value: '0562664409',
      icon: '📱',
      copyable: true,
    },
    {
      label: 'Location',
      value: 'Ain El Assel, El Taref, Algeria 🇩🇿',
      icon: '📍',
      copyable: false,
    },
    {
      label: 'Status',
      value: 'Actively seeking opportunities',
      icon: '⚡',
      copyable: false,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #080401 0%, #000000 100%)',
        padding: '10rem 5vw 8rem',
        overflow: 'hidden',
      }}
    >
      {/* BG Radial */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255, 159, 28, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#FF9F1C',
              marginBottom: '1.5rem',
            }}
          >
            Initiate Connection
          </div>
          <h2
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: '1',
            }}
          >
            <span
              style={{ display: 'block', color: 'rgba(245, 240, 232, 0.9)' }}
            >
              Let's Build
            </span>
            <span className="gradient-text" style={{ display: 'block' }}>
              Something
            </span>
            <span
              style={{
                display: 'block',
                color: 'rgba(245, 240, 232, 0.2)',
                fontWeight: '200',
              }}
            >
              Extraordinary.
            </span>
          </h2>
        </div>

        {/* Contact Grid */}
        <div
          ref={contentRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="glass-card"
              style={{
                padding: '2rem',
                cursor: item.copyable ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
              }}
              onClick={() =>
                item.copyable && copyToClipboard(item.value, item.label)
              }
              onMouseEnter={(e) => {
                if (item.copyable) {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255, 159, 28, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  'rgba(255, 159, 28, 0.2)';
              }}
            >
              <div
                style={{ fontSize: '1.5rem', marginBottom: '1rem' }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#FF9F1C',
                  marginBottom: '0.5rem',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(245, 240, 232, 0.7)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '300',
                  wordBreak: 'break-all',
                }}
              >
                {copied === item.label ? (
                  <span style={{ color: '#4ade80' }}>✓ Copied!</span>
                ) : (
                  item.value
                )}
              </div>
              {item.copyable && (
                <div
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(255, 159, 28, 0.35)',
                    marginTop: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Click to copy
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Big Button */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="mailto:fellah.amine2050@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#120A05',
              background: 'linear-gradient(135deg, #FF9F1C 0%, #FFDF00 50%, #FFF37A 100%)',
              padding: '1.1rem 3rem',
              borderRadius: '6px',
              textDecoration: 'none',
              boxShadow:
                '0 0 40px rgba(255, 159, 28, 0.4), 0 0 80px rgba(255, 159, 28, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 60px rgba(255, 159, 28, 0.7), 0 0 120px rgba(255, 159, 28, 0.3)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 40px rgba(255, 159, 28, 0.4), 0 0 80px rgba(255, 159, 28, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>✉</span>
            <span>Open Direct Line</span>
          </a>
          <p
            style={{
              marginTop: '1.5rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'rgba(245, 240, 232, 0.25)',
              textTransform: 'uppercase',
            }}
          >
            Response guaranteed within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
}
