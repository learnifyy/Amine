import React from 'react';

export default function Footer() {
  const year = 2026; // As specified — strictly 2026

  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255, 159, 28, 0.08)',
        padding: '3rem 5vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(255, 159, 28, 0.4), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #FF9F1C, #FFDF00)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '800',
                color: '#120A05',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              FA
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  color: 'rgba(245, 240, 232, 0.8)',
                }}
              >
                Fellah Amine
              </div>
              <div
                style={{
                  fontFamily: 'serif',
                  fontSize: '0.7rem',
                  color: 'rgba(160, 74, 10, 0.6)',
                  direction: 'ltr',
                }}
              >
                فلاح امين
              </div>
            </div>
          </div>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(245, 240, 232, 0.3)',
              lineHeight: '1.6',
              fontWeight: '300',
              maxWidth: '220px',
            }}
          >
            Tactical analyst. Visual engineer. Code architect. Algerian
            tech-pioneer.
          </p>
        </div>

        {/* Links */}
        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#FF9F1C',
              marginBottom: '1.25rem',
            }}
          >
            Navigate
          </div>
          {[
            ['Identity', '#hero'],
            ['Philosophy', '#manifesto'],
            ['Arsenal', '#skills'],
            ['Journey', '#timeline'],
            ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'block',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.82rem',
                color: 'rgba(245, 240, 232, 0.35)',
                textDecoration: 'none',
                marginBottom: '0.6rem',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = '#FF9F1C')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  'rgba(245, 240, 232, 0.35)')
              }
            >
              {label}
            </a>
          ))}
        </div>

        {/* Contact quick */}
        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#FF9F1C',
              marginBottom: '1.25rem',
            }}
          >
            Direct Line
          </div>
          <a
            href="mailto:fellah.amine2050@gmail.com"
            style={{
              display: 'block',
              fontSize: '0.78rem',
              color: 'rgba(245, 240, 232, 0.5)',
              textDecoration: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '0.6rem',
              transition: 'color 0.3s ease',
              wordBreak: 'break-all',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = '#FFDF00')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                'rgba(245, 240, 232, 0.5)')
            }
          >
            fellah.amine2050@gmail.com
          </a>
          <div
            style={{
              fontSize: '0.78rem',
              color: 'rgba(245, 240, 232, 0.3)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            0562664409
          </div>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>🇩🇿</span>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'rgba(245, 240, 232, 0.25)',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.1em',
              }}
            >
              Algeria
            </span>
          </div>
        </div>

        {/* Learnify teaser */}
        <div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#FF9F1C',
              marginBottom: '1.25rem',
            }}
          >
            Upcoming
          </div>
          <div
            className="glass-card"
            style={{ padding: '1.25rem' }}
          >
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #FFDF00, #FF9F1C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '0.4rem',
                letterSpacing: '0.05em',
              }}
            >
              Learnify-Tech
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'rgba(245, 240, 232, 0.35)',
                lineHeight: '1.5',
              }}
            >
              Educational technology platform. Launching {year}.
            </div>
            <div
              style={{
                marginTop: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.55rem',
                color: '#4ade80',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 6px #4ade80',
                  display: 'inline-block',
                }}
              />
              In development
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 159, 28, 0.06)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'rgba(245, 240, 232, 0.2)',
          }}
        >
          © {year} Fellah Amine. All rights reserved.
        </div>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(245, 240, 232, 0.15)',
          }}
        >
          Built with precision · Ain El Assel, Algeria
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            color: 'rgba(255, 159, 28, 0.35)',
          }}
        >
          <span>⚡</span>
          <span>GSAP · React · Canvas</span>
        </div>
      </div>
    </footer>
  );
}
