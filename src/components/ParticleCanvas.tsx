import React, {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  delay: number;
  arrived: boolean;
}

interface ParticleCanvasProps {
  className?: string;
}

const COLORS = [
  '#FF9F1C',
  '#FFDF00',
  '#FFF37A',
  '#A04A0A',
  '#FF9F1C',
  '#FFDF00',
  '#FF9F1C',
];

const ParticleCanvas = forwardRef<HTMLCanvasElement, ParticleCanvasProps>(
  ({ className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);
    const isInitializedRef = useRef(false);
    const progressRef = useRef(0);

    useImperativeHandle(ref, () => canvasRef.current!);

    // Generate abstract portrait silhouette shape points
    const generatePortraitPoints = useCallback(
      (width: number, height: number): { x: number; y: number }[] => {
        const points: { x: number; y: number }[] = [];
        const cx = width * 0.5;
        const cy = height * 0.44;

        // Head circle
        const headR = Math.min(width, height) * 0.14;
        for (let angle = 0; angle < Math.PI * 2; angle += 0.04) {
          const r = headR * (0.9 + Math.random() * 0.1);
          points.push({
            x: cx + Math.cos(angle) * r,
            y: cy - headR * 0.3 + Math.sin(angle) * r,
          });
        }

        // Face features - eyes
        [-0.35, 0.35].forEach((side) => {
          for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            points.push({
              x: cx + side * headR + Math.cos(angle) * headR * 0.18,
              y: cy - headR * 0.1 + Math.sin(angle) * headR * 0.09,
            });
          }
        });

        // Nose bridge
        for (let i = 0; i < 15; i++) {
          points.push({
            x: cx + (Math.random() - 0.5) * headR * 0.12,
            y: cy + headR * 0.05 + (i / 15) * headR * 0.28,
          });
        }

        // Mouth
        for (let i = 0; i < 30; i++) {
          const t = (i / 30) * Math.PI;
          points.push({
            x: cx + Math.cos(t - Math.PI * 0.5) * headR * 0.32,
            y: cy + headR * 0.42 + Math.sin(t) * headR * 0.06,
          });
        }

        // Shoulders & neck
        const shoulderW = headR * 2.2;
        const neckY = cy + headR * 0.62;
        for (let i = 0; i < 60; i++) {
          const t = i / 60;
          points.push({
            x: cx + (t - 0.5) * shoulderW * 2,
            y: neckY + headR * 0.9 + Math.sin(t * Math.PI) * headR * 0.3,
          });
        }

        // Neck
        for (let i = 0; i < 20; i++) {
          points.push({
            x: cx + (Math.random() - 0.5) * headR * 0.35,
            y: neckY + (Math.random() * headR * 0.5),
          });
        }

        // Add scattered ambiance
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = headR * (0.5 + Math.random() * 1.8);
          points.push({
            x: cx + Math.cos(angle) * r,
            y: cy + Math.sin(angle) * r,
          });
        }

        return points;
      },
      []
    );

    const initParticles = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { width, height } = canvas;
      const targetPoints = generatePortraitPoints(width, height);
      const numParticles = Math.min(targetPoints.length, 900);

      particlesRef.current = targetPoints
        .slice(0, numParticles)
        .map((pt, i) => {
          const startX = Math.random() * width;
          const startY = Math.random() * height;
          return {
            x: startX,
            y: startY,
            baseX: pt.x,
            baseY: pt.y,
            vx: 0,
            vy: 0,
            size: 0.8 + Math.random() * 1.8,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: 0,
            delay: i * 1.2,
            arrived: false,
          };
        });

      progressRef.current = 0;
    }, [generatePortraitPoints]);

    const animate = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = canvas;
      const { x: mx, y: my } = mouseRef.current;
      const REPEL_DIST = 100;
      const REPEL_FORCE = 6;
      const RETURN_SPEED = 0.08;
      const FRICTION = 0.85;

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, 0,
        width * 0.5, height * 0.4, width * 0.7
      );
      bgGrad.addColorStop(0, 'rgba(18, 10, 5, 0.0)');
      bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      progressRef.current += 0.4;

      particlesRef.current.forEach((p) => {
        // Delayed spawn
        const localProgress = progressRef.current - p.delay;
        if (localProgress < 0) return;

        // Fade in alpha
        if (!p.arrived) {
          p.alpha = Math.min(1, p.alpha + 0.025);
        }

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_DIST) {
          const force = (REPEL_DIST - dist) / REPEL_DIST;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * REPEL_FORCE;
          p.vy += Math.sin(angle) * force * REPEL_FORCE;
          p.arrived = false;
        }

        // Spring return to base
        const toBaseX = p.baseX - p.x;
        const toBaseY = p.baseY - p.y;
        p.vx += toBaseX * RETURN_SPEED;
        p.vy += toBaseY * RETURN_SPEED;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        if (
          Math.abs(toBaseX) < 0.5 &&
          Math.abs(toBaseY) < 0.5 &&
          Math.abs(p.vx) < 0.1 &&
          Math.abs(p.vy) < 0.1
        ) {
          p.arrived = true;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha * (0.7 + Math.random() * 0.3);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connecting lines between nearby particles
      const particles = particlesRef.current;
      for (let i = 0; i < Math.min(particles.length, 200); i += 3) {
        const p1 = particles[i];
        if (p1.alpha < 0.5) continue;
        for (let j = i + 3; j < Math.min(i + 30, particles.length); j += 3) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 40) {
            ctx.save();
            ctx.globalAlpha = ((40 - dist) / 40) * 0.15 * p1.alpha;
            ctx.strokeStyle = '#FF9F1C';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        if (isInitializedRef.current) initParticles();
      };

      resize();
      initParticles();
      isInitializedRef.current = true;
      animate();

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      };

      const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cancelAnimationFrame(animFrameRef.current);
        resizeObserver.disconnect();
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [initParticles, animate]);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
);

ParticleCanvas.displayName = 'ParticleCanvas';
export default ParticleCanvas;
