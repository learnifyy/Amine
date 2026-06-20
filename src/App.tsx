import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ManifestoSection from './components/ManifestoSection';
import GlassCards from './components/GlassCards';
import Timeline from './components/Timeline';
import ContactSection from './components/ContactSection';
import AmbientSound from './components/AmbientSound';
import Footer from './components/Footer';
import { useLenis } from './hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  useLenis(); // Initialize Lenis smooth scroll

  useEffect(() => {
    // Custom cursor
    const moveCursor = (e: MouseEvent) => {
      if (cursorOuterRef.current) {
        gsap.to(cursorOuterRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
      if (cursorInnerRef.current) {
        gsap.to(cursorInnerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.06,
          ease: 'none',
        });
      }
    };

    // Cursor scale on interactive elements
    const handleHoverIn = () => {
      gsap.to(cursorOuterRef.current, {
        scale: 1.8,
        borderColor: 'rgba(255, 223, 0, 0.8)',
        duration: 0.3,
      });
    };

    const handleHoverOut = () => {
      gsap.to(cursorOuterRef.current, {
        scale: 1,
        borderColor: 'rgba(255, 159, 28, 0.6)',
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    const interactives = document.querySelectorAll('a, button, [data-cursor]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* CRT Scan line */}
      <div className="scan-line" />

      {/* Custom cursor */}
      <div ref={cursorOuterRef} className="cursor-outer" />
      <div ref={cursorInnerRef} className="cursor-inner" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />
        <ManifestoSection />
        <GlassCards />
        <Timeline />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient Sound Toggle */}
      <AmbientSound />
    </>
  );
}
