import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const philosophyItems = [
  {
    icon: '♟',
    domain: 'Chess Mastery',
    thesis:
      'Every position is a data structure. Every move is an algorithm. I trained my mind to see ten steps ahead — a skill that directly translates into architecting software systems and debugging at depth.',
    metric: 'Pattern Recognition',
    value: '∞',
  },
  {
    icon: '📷',
    domain: 'Visual Engineering',
    thesis:
      'Photography taught me that composition is everything. The discipline of framing a perfect shot — understanding light, timing, and perspective — is identical to designing flawless user interfaces and visual hierarchies.',
    metric: 'Eye for Detail',
    value: '∞',
  },
  {
    icon: '⌨',
    domain: 'Code Architecture',
    thesis:
      'Self-taught through fire. Every bug was a puzzle. Every deployment was a lesson in pressure management. The same mental fortitude that holds position in a losing chess game writes clean code under deadline.',
    metric: 'Languages Mastered',
    value: '↑',
  },
];

const manifestoLines = [
  'I do not separate my skills.',
  'They are one unified discipline.',
  'The mind that plays chess',
  'is the mind that frames the shot',
  'is the mind that writes the code.',
  'Every domain reinforces the other.',
  'This is the strategic advantage.',
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.manifesto-word');
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -60 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Manifesto lines
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Philosophy cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Quote parallax
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #000000 0%, #0A0502 30%, #120A05 60%, #000000 100%)',
        padding: '12rem 5vw',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 159, 28, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 223, 0, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #FF9F1C)',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#FF9F1C',
            }}
          >
            Core Philosophy
          </span>
        </div>

        {/* Big Heading */}
        <h2
          ref={headingRef}
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: '800',
            lineHeight: '1',
            letterSpacing: '-0.03em',
            marginBottom: '5rem',
            perspective: '1000px',
          }}
        >
          {'The Unified\nMind'.split('\n').map((line, li) => (
            <span
              key={li}
              style={{ display: 'block', overflow: 'hidden' }}
            >
              {line.split(' ').map((word, wi) => (
                <span
                  key={wi}
                  className="manifesto-word"
                  style={{
                    display: 'inline-block',
                    marginRight: '0.3em',
                    background:
                      li === 0
                        ? 'linear-gradient(135deg, #f5f0e8, rgba(245, 240, 232, 0.5))'
                        : 'linear-gradient(135deg, #FFF37A, #FFDF00, #FF9F1C)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Manifesto lines — large flowing text */}
        <div
          style={{
            marginBottom: '8rem',
            borderLeft: '1px solid rgba(255, 159, 28, 0.2)',
            paddingLeft: '3rem',
          }}
        >
          {manifestoLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight: i < 2 ? '600' : '300',
                lineHeight: '1.6',
                color:
                  i < 2
                    ? 'rgba(245, 240, 232, 0.9)'
                    : 'rgba(245, 240, 232, 0.4)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontStyle: i >= 2 ? 'italic' : 'normal',
                marginBottom: '0.3rem',
                letterSpacing: i < 2 ? '-0.01em' : '0',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Philosophy Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '8rem',
          }}
        >
          {philosophyItems.map((item, i) => (
            <div
              key={item.domain}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="glass-card"
              style={{ padding: '2.5rem' }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: '2.5rem',
                  marginBottom: '1.5rem',
                  filter: 'drop-shadow(0 0 12px rgba(255, 159, 28, 0.4))',
                }}
              >
                {item.icon}
              </div>

              {/* Domain */}
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#FF9F1C',
                  marginBottom: '0.75rem',
                }}
              >
                {item.domain}
              </div>

              {/* Thesis */}
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.7',
                  color: 'rgba(245, 240, 232, 0.6)',
                  fontWeight: '300',
                  marginBottom: '2rem',
                }}
              >
                {item.thesis}
              </p>

              {/* Metric */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 159, 28, 0.1)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    color: 'rgba(245, 240, 232, 0.35)',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.metric}
                </span>
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#FFDF00',
                    textShadow: '0 0 12px rgba(255, 223, 0, 0.5)',
                  }}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Quote */}
        <div
          ref={quoteRef}
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255, 159, 28, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              color: '#FF9F1C',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            — Personal Doctrine —
          </div>
          <blockquote
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
              fontWeight: '300',
              lineHeight: '1.4',
              color: 'rgba(245, 240, 232, 0.85)',
              fontStyle: 'italic',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              letterSpacing: '-0.01em',
            }}
          >
            "Self-control is the rarest skill in any room. It is the source of
            my patience in chess, my stillness behind the lens, and my
            resilience in code."
          </blockquote>
          <cite
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'rgba(255, 159, 28, 0.5)',
              textTransform: 'uppercase',
              fontStyle: 'normal',
            }}
          >
            Fellah Amine
          </cite>
        </div>
      </div>
    </section>
  );
}
