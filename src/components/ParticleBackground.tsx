import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      'rgba(0, 242, 254, 0.4)',  // Cyber Cyan
      'rgba(168, 85, 247, 0.4)',  // Purple Neon
      'rgba(236, 72, 153, 0.3)',  // Pink Glow
      'rgba(34, 197, 94, 0.3)',   // Matrix Green
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const count = 45; // Subtle but gorgeous count

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random(),
        pulseSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid line matrix in the background very subtly
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Particles
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary checks
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.pulse += p.pulseSpeed;
        const currentOpacity = (Math.sin(p.pulse) + 1) / 2; // oscillates 0 to 1

        ctx.shadowBlur = p.size * 6;
        ctx.shadowColor = p.color;

        ctx.fillStyle = p.color.replace('0.4', (0.2 + currentOpacity * 0.4).toFixed(2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + currentOpacity * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0; // reset shadow
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
