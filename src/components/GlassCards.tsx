import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  category: string;
  icon: string;
  color: string;
  items: { name: string; level: number; tag?: string }[];
  description: string;
  badge: string;
}

const skills: Skill[] = [
  {
    category: 'Analytical Warfare',
    icon: '♟',
    color: '#FFF37A',
    badge: 'Chess Tactician',
    description:
      'Trained strategic pattern recognition across thousands of positions. Applied tactical depth to every technical decision.',
    items: [
      { name: 'Tactical Vision', level: 88, tag: 'Elite' },
      { name: 'Positional Understanding', level: 82 },
      { name: 'Endgame Precision', level: 76 },
      { name: 'Psychological Pressure', level: 91, tag: 'Core' },
    ],
  },
  {
    category: 'Visual Architecture',
    icon: '📷',
    color: '#FF9F1C',
    badge: 'Photographer',
    description:
      'Passionate documentary and landscape photographer. Expert in composition, natural light, and captured decisive moments.',
    items: [
      { name: 'Composition & Framing', level: 90, tag: 'Expert' },
      { name: 'Light Analysis', level: 85 },
      { name: 'Post Processing', level: 78 },
      { name: 'Perspective Design', level: 87, tag: 'Core' },
    ],
  },
  {
    category: 'Digital Engineering',
    icon: '⌨',
    color: '#FFDF00',
    badge: 'Self-Taught Dev',
    description:
      'Full-stack web development expertise. From Fiverr freelancing to building complete SaaS products in 2026.',
    items: [
      { name: 'React / TypeScript', level: 84, tag: 'Primary' },
      { name: 'Python / Automation', level: 79 },
      { name: 'CSS / UI Design', level: 88, tag: 'Strength' },
      { name: 'Problem Solving', level: 93, tag: 'Elite' },
    ],
  },
  {
    category: 'Mental Discipline',
    icon: '🧠',
    color: '#FF9F1C',
    badge: 'Core Trait',
    description:
      'The meta-skill above all others. Daily commitment to self-improvement, deep situational analysis, and precise execution under pressure.',
    items: [
      { name: 'Self Control', level: 96, tag: 'Elite' },
      { name: 'Deep Focus', level: 92, tag: 'Elite' },
      { name: 'Adaptive Learning', level: 89 },
      { name: 'Long-term Vision', level: 94, tag: 'Core' },
    ],
  },
];

function SkillBar({ name, level, tag, color, index }: {
  name: string;
  level: number;
  tag?: string;
  color: string;
  index: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    ScrollTrigger.create({
      trigger: barRef.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          barRef.current,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.4,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        );

        if (countRef.current) {
          gsap.fromTo(
            { val: 0 },
            {
              val: level,
              duration: 1.4,
              delay: index * 0.1,
              ease: 'power3.out',
              onUpdate: function () {
                if (countRef.current) {
                  countRef.current.textContent = `${Math.round(this.targets()[0].val)}%`;
                }
              },
            }
          );
        }
      },
    });
  }, [level, index]);

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontSize: '0.8rem',
              color: 'rgba(245, 240, 232, 0.7)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '400',
            }}
          >
            {name}
          </span>
          {tag && (
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: color,
                background: `${color}15`,
                border: `1px solid ${color}30`,
                borderRadius: '3px',
                padding: '1px 6px',
              }}
            >
              {tag}
            </span>
          )}
        </div>
        <span
          ref={countRef}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: color,
            fontWeight: '600',
          }}
        >
          0%
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          ref={barRef}
          className="skill-bar-fill"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 80, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Hover tilt effect
    const card = cardRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
        transformPerspective: 1000,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass-card"
      style={{ padding: '2.5rem', transformStyle: 'preserve-3d' }}
    >
      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '2.2rem',
              marginBottom: '0.75rem',
              filter: `drop-shadow(0 0 12px ${skill.color}66)`,
            }}
          >
            {skill.icon}
          </div>
          <div
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: skill.color,
              marginBottom: '0.4rem',
            }}
          >
            {skill.category}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#120A05',
            background: `linear-gradient(135deg, ${skill.color}, #FF9F1C)`,
            padding: '0.35rem 0.8rem',
            borderRadius: '3px',
            fontWeight: '700',
            whiteSpace: 'nowrap',
          }}
        >
          {skill.badge}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.82rem',
          lineHeight: '1.6',
          color: 'rgba(245, 240, 232, 0.5)',
          fontWeight: '300',
          marginBottom: '2rem',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {skill.description}
      </p>

      {/* Skill Bars */}
      <div>
        {skill.items.map((item, i) => (
          <SkillBar
            key={item.name}
            {...item}
            color={skill.color}
            index={i}
          />
        ))}
      </div>

      {/* Card number */}
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '3.5rem',
          fontWeight: '800',
          color: 'rgba(255, 159, 28, 0.04)',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        0{index + 1}
      </div>
    </div>
  );
}

export default function GlassCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#0A0502',
        padding: '10rem 5vw',
        overflow: 'hidden',
      }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Section Header */}
        <div ref={headingRef} style={{ marginBottom: '5rem' }}>
          <div
            style={{
              display: 'flex',
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
              The Arsenal
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
            }}
          >
            <span
              style={{
                display: 'block',
                color: 'rgba(245, 240, 232, 0.95)',
              }}
            >
              Capabilities &
            </span>
            <span
              className="gradient-text"
              style={{ display: 'block' }}
            >
              Core Disciplines
            </span>
          </h2>
          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '1rem',
              color: 'rgba(245, 240, 232, 0.4)',
              fontWeight: '300',
              maxWidth: '480px',
              lineHeight: '1.7',
            }}
          >
            Each skill domain is a pillar of the same structure — analytical
            depth forged through daily practice and intentional discipline.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {skills.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} index={i} />
          ))}
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            marginTop: '4rem',
            border: '1px solid rgba(255, 159, 28, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Years of Study', value: '3+' },
            { label: 'First Earned', value: '$6' },
            { label: 'Daily Commitment', value: '∞' },
            { label: 'Goal Year', value: '2026' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '2rem',
                background: 'rgba(18, 10, 5, 0.5)',
                textAlign: 'center',
                borderRight: '1px solid rgba(255, 159, 28, 0.08)',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FFDF00, #FF9F1C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(245, 240, 232, 0.3)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
          }
