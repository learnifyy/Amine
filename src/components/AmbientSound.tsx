import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    oscillators: OscillatorNode[];
    gainNode: GainNode | null;
    masterGain: GainNode | null;
  }>({ oscillators: [], gainNode: null, masterGain: null });
  const btnRef = useRef<HTMLButtonElement>(null);

  const createAmbientSound = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const oscillators: OscillatorNode[] = [];

    // Drone base — deep sub frequency
    const droneFreqs = [55, 82.4, 110, 146.8];
    droneFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = i === 0 ? 'sine' : i === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle LFO modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.05 + i * 0.03, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      gain.gain.setValueAtTime(0.06 / (i + 1), ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
    });

    // High shimmer
    const shimmerFreqs = [440, 550, 660];
    shimmerFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + i * 0.07, ctx.currentTime);
      lfoGain.gain.setValueAtTime(2, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);

      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
    });

    nodesRef.current = { oscillators, gainNode: null, masterGain };
    setIsLoaded(true);
    return masterGain;
  };

  const toggleAmbient = () => {
    if (!isLoaded) {
      const masterGain = createAmbientSound();
      gsap.to(masterGain.gain, {
        value: 0.4,
        duration: 3,
        ease: 'power2.out',
        onUpdate: () => {
          if (audioCtxRef.current && masterGain.gain.value > 0) {
            // keep alive
          }
        },
      });
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      const { masterGain } = nodesRef.current;
      if (masterGain) {
        gsap.to(masterGain.gain, {
          value: 0,
          duration: 2,
          ease: 'power2.out',
        });
      }
      setIsPlaying(false);
    } else {
      const { masterGain } = nodesRef.current;
      if (masterGain) {
        gsap.to(masterGain.gain, {
          value: 0.4,
          duration: 2,
          ease: 'power2.out',
        });
      }
      setIsPlaying(true);
    }
  };

  // Pulse animation when active
  useEffect(() => {
    if (!btnRef.current) return;
    if (isPlaying) {
      gsap.to(btnRef.current, {
        boxShadow:
          '0 0 20px rgba(255, 223, 0, 0.4), 0 0 40px rgba(255, 159, 28, 0.2)',
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    } else {
      gsap.killTweensOf(btnRef.current);
      gsap.to(btnRef.current, {
        boxShadow: 'none',
        duration: 0.5,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={toggleAmbient}
      className={`ambient-btn ${isPlaying ? 'active' : ''}`}
      title={isPlaying ? 'Disable Ambient Sound' : 'Enable Ambient Sound'}
      aria-label="Toggle ambient sound"
    >
      {isPlaying ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFDF00"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          {/* Sound waves */}
          <path d="M6 15.5 Q 8 14 6 12.5" stroke="#FF9F1C" opacity="0.7" />
          <path d="M6 15.5 Q 10 13 6 10" stroke="#FF9F1C" opacity="0.4" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255, 159, 28, 0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
          <line x1="1" y1="1" x2="23" y2="23" stroke="#A04A0A" strokeWidth="1" />
        </svg>
      )}
    </button>
  );
}
