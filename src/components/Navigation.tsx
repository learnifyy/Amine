import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const navItems = [
  { label: 'Identity', href: '#hero' },
  { label: 'Philosophy', href: '#manifesto' },
  { label: 'Arsenal', href: '#skills' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
        background: scrolled
          ? 'rgba(0, 0, 0, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255, 159, 28, 0.1)'
          : 'none',
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #FF9F1C, #FFDF00)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '800',
            color: '#120A05',
            fontFamily: 'JetBrains Mono, monospace',
            boxShadow: '0 0 16px rgba(255, 159, 28, 0.4)',
          }}
        >
          FA
        </div>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.12em',
            color: 'rgba(245, 240, 232, 0.7)',
          }}
        >
          FELLAH AMINE
        </span>
      </div>

      {/* Desktop Nav */}
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
        className="hidden md:flex"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNav(e, item.href)}
            className="nav-link"
          >
            {item.label}
          </a>
        ))}
        <a
          href="mailto:fellah.amine2050@gmail.com"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            fontWeight: '600',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#120A05',
            background: 'linear-gradient(135deg, #FF9F1C, #FFDF00)',
            padding: '0.5rem 1.25rem',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 16px rgba(255, 159, 28, 0.3)',
          }}
        >
          Hire Me
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '24px',
              height: '1px',
              background: '#FF9F1C',
              transition: 'all 0.3s ease',
              transformOrigin: 'center',
              transform:
                menuOpen && i === 0
                  ? 'rotate(45deg) translate(4px, 4px)'
                  : menuOpen && i === 2
                  ? 'rotate(-45deg) translate(4px, -4px)'
                  : menuOpen && i === 1
                  ? 'scaleX(0)'
                  : 'none',
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 159, 28, 0.15)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className="nav-link"
              style={{ fontSize: '0.85rem' }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
