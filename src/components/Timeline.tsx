import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: '2019',
    title: 'The Awakening',
    description:
      'Discovered programming through curiosity. First lines of HTML/CSS written in a borrowed notebook at a local internet café. The seed was planted.',
    tags: ['HTML', 'CSS', 'Beginning'],
    side: 'left',
    icon: '🌱',
    status: 'Complete',
  },
  {
    year: '2020',
    title: 'Chess & Code Merge',
    description:
      'Recognized the parallel between chess thinking and algorithmic problem-solving. Both demand depth, patience, and the ability to hold complex systems in your mind.',
    tags: ['Chess', 'Logic', 'Pattern Recognition'],
    side: 'right',
    icon: '♟',
    status: 'Complete',
  },
  {
    year: '2021',
    title: 'First $6 Earned',
    description:
      'Landed my first Fiverr order. A small web design project. The money was symbolic — $6 — but the proof of concept was worth a thousand times more. Real clients. Real value delivered.',
    tags: ['Fiverr', 'Freelance', 'First Revenue'],
    side: 'left',
    icon: '💰',
    status: 'Complete',
    highlight: true,
  },
  {
    year: '2022',
    title: 'Fiverr Active Phase',
    description:
      'Continued freelancing on Fiverr while expanding skills. Learned to manage clients, deliver under deadlines, and communicate value. Real-world education no university provides.',
    tags: ['Freelancing', 'Client Work', 'React'],
    side: 'right',
    icon: '⚡',
    status: 'Complete',
  },
  {
    year: '2023',
    title: 'Photography Immersion',
    description:
      'Committed to photography as a serious discipline. Studied composition, light theory, and the psychology of visual storytelling. The camera became another analytical tool.',
    tags: ['Photography', 'Visual Design', 'Composition'],
    side: 'left',
    icon: '📷',
    status: 'Complete',
  },
  {
    year: '2024',
    title: 'Deep Skill Upgrade',
    description:
      'Strategic withdrawal from active freelancing to invest deeply in advanced skills. TypeScript, system design, advanced CSS architecture, and building production-grade tools.',
    tags: ['TypeScript', 'System Design', 'Level Up'],
    side: 'right',
    icon: '🔬',
    status: 'Complete',
  },
  {
    year: '2025',
    title: 'Preparation Phase',
    description:
      'The quiet before the storm. Daily structured learning. Building discipline frameworks. Sharpening every edge. Preparing the complete portfolio and professional identity.',
    tags: ['Daily Practice', 'Discipline', 'Portfolio'],
    side: 'left',
    icon: '🎯',
    status: 'Active',
  },
  {
    year: '2026',
    title: 'Learnify-Tech Launches',
    description:
      'The vision crystallizes into a product. Learnify-Tech — an educational technology platform designed to make technical learning accessible and deeply effective. This is the culmination.',
    tags: ['Learnify-Tech', 'SaaS', 'Founder'],
    side: 'right',
    icon: '🚀',
    status: 'Upcoming',
    highlight: true,
  },
];

function TimelineItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isLeft = milestone.side === 'left';

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.fromTo(
      itemRef.current,
      {
        x: isLeft ? -60 : 60,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [isLeft]);

  const statusColors = {
    Complete: '#4ade80',
    Active: '#FF9F1C',
    Upcoming: '#FFDF00',
  };

  return (
    <div
      ref={itemRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px 1fr',
        gap: '0',
        alignItems: 'start',
        marginBottom: '3rem',
        position: 'relative',
      }}
    >
      {/* Left content */}
      <div
        style={{
          padding: '0 2rem',
          textAlign: isLeft ? 'right' : 'left',
          gridColumn: 1,
          opacity: isLeft ? 1 : 0,
          pointerEvents: isLeft ? 'all' : 'none',
        }}
      >
        {isLeft && (
          <TimelineCard milestone={milestone} align="right" statusColors={statusColors} />
        )}
      </div>

      {/* Center dot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '0.5rem',
          gridColumn: 2,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: milestone.highlight
              ? 'linear-gradient(135deg, #FF9F1C, #FFDF00)'
              : 'rgba(74, 30, 5, 0.6)',
            border: `2px solid ${milestone.highlight ? '#FFDF00' : 'rgba(255, 159, 28, 0.4)'}`,
            boxShadow: milestone.highlight
              ? '0 0 20px rgba(255, 223, 0, 0.5), 0 0 40px rgba(255, 159, 28, 0.3)'
              : '0 0 10px rgba(255, 159, 28, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
            zIndex: 2,
            position: 'relative',
          }}
        >
          {milestone.icon}
        </div>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            color: milestone.highlight ? '#FF9F1C' : 'rgba(255, 159, 28, 0.4)',
            marginTop: '0.5rem',
            fontWeight: milestone.highlight ? '700' : '400',
            textAlign: 'center',
          }}
        >
          {milestone.year}
        </div>
      </div>

      {/* Right content */}
      <div
        style={{
          padding: '0 2rem',
          textAlign: !isLeft ? 'left' : 'right',
          gridColumn: 3,
          opacity: !isLeft ? 1 : 0,
          pointerEvents: !isLeft ? 'all' : 'none',
        }}
      >
        {!isLeft && (
          <TimelineCard milestone={milestone} align="left" statusColors={statusColors} />
        )}
      </div>
    </div>
  );
}

function TimelineCard({
  milestone,
  align,
  statusColors,
}: {
  milestone: (typeof milestones)[0];
  align: 'left' | 'right';
  statusColors: Record<string, string>;
}) {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1.75rem',
        textAlign: 'left',
        borderColor: milestone.highlight
          ? 'rgba(255, 223, 0, 0.3)'
          : 'rgba(255, 159, 28, 0.15)',
      }}
    >
      {/* Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '0.75rem',
          flexDirection: align === 'right' ? 'row-reverse' : 'row',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: statusColors[milestone.status] || '#FF9F1C',
            boxShadow: `0 0 8px ${statusColors[milestone.status] || '#FF9F1C'}`,
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: statusColors[milestone.status] || '#FF9F1C',
          }}
        >
          {milestone.status}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '1rem',
          fontWeight: '700',
          color: milestone.highlight
            ? '#FFDF00'
            : 'rgba(245, 240, 232, 0.9)',
          marginBottom: '0.75rem',
          letterSpacing: '-0.01em',
        }}
      >
        {milestone.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.82rem',
          lineHeight: '1.6',
          color: 'rgba(245, 240, 232, 0.5)',
          fontWeight: '300',
          marginBottom: '1.25rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {milestone.description}
      </p>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
        }}
      >
        {milestone.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 159, 28, 0.7)',
              background: 'rgba(255, 159, 28, 0.08)',
              border: '1px solid rgba(255, 159, 28, 0.15)',
              borderRadius: '3px',
              padding: '2px 8px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #000000 0%, #080401 100%)',
        padding: '10rem 5vw',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
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
              The Journey
            </span>
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, #FF9F1C, transparent)',
              }}
            />
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              color: 'rgba(245, 240, 232, 0.95)',
            }}
          >
            Growth{' '}
            <span className="gradient-text-warm">Mapped</span>
          </h2>
          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '1rem',
              color: 'rgba(245, 240, 232, 0.35)',
              fontWeight: '300',
              maxWidth: '480px',
              margin: '1.5rem auto 0',
              lineHeight: '1.7',
            }}
          >
            From a borrowed screen in Ain El Assel to building a technology
            company. Every step was intentional.
          </p>
        </div>

        {/* Timeline container */}
        <div style={{ position: 'relative' }}>
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="timeline-line"
            style={{ transformOrigin: 'top center' }}
          />

          {/* Items */}
          {milestones.map((milestone, i) => (
            <TimelineItem key={milestone.year} milestone={milestone} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
