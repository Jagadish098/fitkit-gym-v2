import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isTouchDevice ? 15 : 25;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    initParticles();

    // Animation loop with frame skipping for performance
    let frameCount = 0;
    const animate = () => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      frameCount++;
      // Render every 2nd frame on mobile for performance
      const skipFrames = isTouchDevice ? 2 : 1;
      
      if (frameCount % skipFrames === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 26, 26, ${particle.opacity})`;
          ctx.fill();

          // Draw connections (limited for performance)
          if (i % 3 === 0) {
            particlesRef.current.slice(i + 1, i + 4).forEach((other) => {
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(255, 26, 26, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
              }
            });
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Visibility handling
    const handleVisibilityChange = () => {
      isActiveRef.current = document.visibilityState === 'visible';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
