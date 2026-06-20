import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from './ParticleCanvas';
import { TextScramble } from '../utils/textScramble';

gsap.registerPlugin(ScrollTrigger);

const TAGLINES = [
  'Analyze. Capture. Code.',
  'Tactical. Visual. Digital.',
  'Chess. Photography. Engineering.',
  'Precision. Patience. Power.',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);
  const taglineIndexRef = useRef(0);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate name with char split
    if (nameRef.current) {
      const text = nameRef.current.textContent || '';
      nameRef.current.innerHTML = text
        .split('')
        .map(
          (char) =>
            `<span style="display:inline-block; opacity:0; transform:translateY(60px) rotateX(-90deg)">${char === ' ' ? '&nbsp;' : char}</span>`
        )
        .join('');

      tl.to(nameRef.current.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power4.out',
      });
    }

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        locationRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.2'
      );

    // Start tagline scrambler
    if (taglineRef.current) {
      scramblerRef.current = new TextScramble(taglineRef.current);
      const cycleTagline = () => {
        const idx = taglineIndexRef.current % TAGLINES.length;
        scramblerRef.current?.setText(TAGLINES[idx]).then(() => {
          setTimeout(cycleTagline, 3500);
        });
        taglineIndexRef.current++;
      };
      setTimeout(cycleTagline, 1800);
    }

    // Parallax on scroll
    if (overlayRef.current && sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              y: self.progress * 120,
              opacity: 1 - self.progress * 0.8,
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector('#manifesto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #120A05 0%, #000000 100%)',
      }}
    >
      {/* Grid Background */}
      <div
        className="grid-bg"
        style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
      />

      {/* Particle Canvas — fills right side of screen */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            width: '55%',
            height: '100%',
            position: 'relative',
          }}
        >
          <ParticleCanvas
            className="hero-canvas"
          />
          {/* Fade left edge */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, #000000 0%, transparent 40%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,0,0,0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content */}
      <div
        ref={overlayRef}
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 5vw',
          maxWidth: '680px',
          width: '100%',
        }}
      >
        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(74, 30, 5, 0.4)',
            border: '1px solid rgba(255, 159, 28, 0.3)',
            borderRadius: '100px',
            padding: '0.35rem 1rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 8px #4ade80',
              animation: 'pulse-glow 2s infinite',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 232, 0.7)',
            }}
          >
            Available for Projects
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          style={{
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: '800',
            lineHeight: '0.95',
            letterSpacing: '-0.03em',
            background:
              'linear-gradient(135deg, #FFF37A 0%, #FFDF00 25%, #FF9F1C 60%, #A04A0A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Fellah Amine
        </h1>

        {/* Tagline — glitch scramble */}
        <div
          ref={taglineRef}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.3rem)',
            fontWeight: '300',
            letterSpacing: '0.12em',
            color: '#FF9F1C',
            marginBottom: '1.5rem',
            minHeight: '2rem',
          }}
        >
          Analyze. Capture. Code.
        </div>

        {/* Sub Description */}
        <div
          ref={subRef}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            fontWeight: '300',
            lineHeight: '1.8',
            color: 'rgba(245, 240, 232, 0.55)',
            maxWidth: '420px',
            marginBottom: '2rem',
          }}
        >
          University student, chess tactician & self-taught developer from
          Algeria. Transforming complex patterns into elegant digital solutions.
        </div>

        {/* Location badge */}
        <div
          ref={locationRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <span style={{ fontSize: '1rem' }}>🇩🇿</span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              color: 'rgba(245, 240, 232, 0.4)',
              textTransform: 'uppercase',
            }}
          >
            Ain El Assel · El Taref · Algeria
          </span>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              fontWeight: '600',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#120A05',
              background: 'linear-gradient(135deg, #FF9F1C, #FFDF00)',
              padding: '0.9rem 2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              boxShadow:
                '0 0 30px rgba(255, 159, 28, 0.4), 0 0 60px rgba(255, 159, 28, 0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 50px rgba(255, 159, 28, 0.7), 0 0 100px rgba(255, 159, 28, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 0 30px rgba(255, 159, 28, 0.4), 0 0 60px rgba(255, 159, 28, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Initiate Contact
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              fontWeight: '500',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(245, 240, 232, 0.6)',
              background: 'transparent',
              padding: '0.9rem 2rem',
              borderRadius: '4px',
              textDecoration: 'none',
              border: '1px solid rgba(255, 159, 28, 0.25)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.6)';
              e.currentTarget.style.color = '#FF9F1C';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 159, 28, 0.25)';
              e.currentTarget.style.color = 'rgba(245, 240, 232, 0.6)';
            }}
          >
            View Arsenal
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.5,
          transition: 'opacity 0.3s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.5')}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: 'rgba(255, 159, 28, 0.7)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background:
              'linear-gradient(180deg, rgba(255, 159, 28, 0.7), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </button>

      {/* Arabic name watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          right: '5vw',
          fontFamily: 'serif',
          fontSize: 'clamp(1rem, 3vw, 1.8rem)',
          color: 'rgba(160, 74, 10, 0.3)',
          letterSpacing: '0.05em',
          direction: 'rtl',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        فلاح امين
      </div>
    </section>
  );
          }
