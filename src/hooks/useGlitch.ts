import { useEffect, useRef } from 'react';
import { TextScramble } from '../utils/textScramble';

export function useGlitch(texts: string[], interval: number = 3000) {
  const elRef = useRef<HTMLDivElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);

  useEffect(() => {
    if (!elRef.current) return;
    const fx = new TextScramble(elRef.current);
    scramblerRef.current = fx;

    let counter = 0;
    const next = () => {
      fx.setText(texts[counter]).then(() => {
        setTimeout(next, interval);
      });
      counter = (counter + 1) % texts.length;
    };
    next();

    return () => {
      cancelAnimationFrame(0);
    };
  }, []);

  return elRef;
}
