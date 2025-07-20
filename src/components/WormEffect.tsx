import React, { useEffect, useRef, useState } from "react";

interface WormEffectProps {
  className?: string;
  colors?: string[];
  particleCount?: number;
  speed?: number;
}

const useTheme = () => {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return { isDark };
};

const WormEffect: React.FC<WormEffectProps> = ({
  className = "",
  colors,
  particleCount = 15,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const wormsRef = useRef<any[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const particlesRef = useRef<any[]>([]);
  const { isDark } = useTheme();

  const getThemeColors = () => {
    if (colors) return colors;
    
    return isDark 
      ? ["#00f5ff", "#ff0080", "#00ff80", "#ff8000", "#8000ff"]
      : ["#0066cc", "#cc0066", "#00cc66", "#cc6600", "#6600cc"];
  };

  const themeColors = getThemeColors();

  class DeathParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    life: number;
    maxLife: number;
    alpha: number;

    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const particleSpeed = 2 + Math.random() * 3;
      this.vx = Math.cos(angle) * particleSpeed;
      this.vy = Math.sin(angle) * particleSpeed;
      this.color = color;
      this.size = 2 + Math.random() * 2;
      this.life = 0;
      this.maxLife = 30 + Math.random() * 20;
      this.alpha = 1;
    }

    update() {
      this.life++;
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.alpha = 1 - this.life / this.maxLife;
      this.size *= 0.99;
      return this.life < this.maxLife;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.alpha * (isDark ? 1 : 0.8); 
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = isDark ? 10 : 5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class Worm {
    x: number;
    y: number;
    segments: { x: number; y: number }[];
    angle: number;
    speed: number;
    color: string;
    isDead: boolean;

    constructor(canvasWidth: number, canvasHeight: number) {
      const side = Math.random() < 0.5 ? "left" : "right";
      if (side === "left") {
        this.x = -50;
        this.angle = (Math.random() - 0.5) * Math.PI;
      } else {
        this.x = canvasWidth + 50;
        this.angle = Math.PI + (Math.random() - 0.5) * Math.PI;
      }

      this.y = Math.random() * canvasHeight;
      this.segments = Array(12)
        .fill(null)
        .map(() => ({ x: this.x, y: this.y }));
      this.speed = speed * (0.8 + Math.random() * 0.4);
      this.color = themeColors[Math.floor(Math.random() * themeColors.length)];
      this.isDead = false;
    }

    checkMouseCollision(mouseX: number, mouseY: number): boolean {
      if (this.isDead) return false;

      const collisionRadius = 40;

      for (let segment of this.segments) {
        const dx = segment.x - mouseX;
        const dy = segment.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < collisionRadius) {
          return true;
        }
      }
      return false;
    }

    kill() {
      if (this.isDead) return;
      this.isDead = true;

      this.segments.forEach((segment, index) => {
        if (index % 2 === 0) {
          for (let i = 0; i < 4; i++) {
            particlesRef.current.push(
              new DeathParticle(segment.x, segment.y, this.color)
            );
          }
        }
      });
    }

    update() {
      if (this.isDead) return;

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.angle += (Math.random() - 0.5) * 0.08;

      this.segments[0] = { x: this.x, y: this.y };

      for (let i = 1; i < this.segments.length; i++) {
        const prev = this.segments[i - 1];
        const current = this.segments[i];

        const dx = prev.x - current.x;
        const dy = prev.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 8) {
          const moveX = (dx / distance) * 6;
          const moveY = (dy / distance) * 6;

          this.segments[i] = {
            x: current.x + moveX,
            y: current.y + moveY,
          };
        }
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      if (this.isDead) return;

      const baseOpacity = isDark ? 1 : 0.8;
      const shadowBlur = isDark ? 25 : 15;
      const glowOpacity = isDark ? 0.5 : 0.3;

      this.segments.forEach((segment, index) => {
        const segmentOpacity = (1 - index / this.segments.length) * baseOpacity;
        const size = Math.max(1, 4 - index * 0.2);

        if (segmentOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = segmentOpacity * glowOpacity;
          ctx.shadowColor = this.color;
          ctx.shadowBlur = shadowBlur;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(segment.x, segment.y, size + 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = segmentOpacity;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(segment.x, segment.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (this.segments.length > 1) {
        ctx.save();
        ctx.globalAlpha = 0.7 * baseOpacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = this.color;
        ctx.shadowBlur = isDark ? 5 : 3;

        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    isOffScreen(canvasWidth: number, canvasHeight: number): boolean {
      if (this.isDead) return true;

      const margin = 100;
      return (
        this.x < -margin ||
        this.x > canvasWidth + margin ||
        this.y < -margin ||
        this.y > canvasHeight + margin
      );
    }
  }

  const createWorm = (canvasWidth: number, canvasHeight: number) => {
    return new Worm(canvasWidth, canvasHeight);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    wormsRef.current.forEach((worm) => {
      if (worm.checkMouseCollision(mouseRef.current.x, mouseRef.current.y)) {
        worm.kill();
      }
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wormsRef.current = wormsRef.current.filter(
      (worm) => !worm.isOffScreen(canvas.width, canvas.height)
    );

    while (wormsRef.current.length < particleCount && Math.random() < 0.1) {
      wormsRef.current.push(createWorm(canvas.width, canvas.height));
    }

    wormsRef.current.forEach((worm) => {
      worm.update();
      worm.draw(ctx);
    });

    particlesRef.current = particlesRef.current.filter((particle) => {
      const shouldKeep = particle.update();
      if (shouldKeep) {
        particle.draw(ctx);
      }
      return shouldKeep;
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className={`absolute inset-0 z-0 w-full h-screen ${className}`}
      style={{
        mixBlendMode: isDark ? "screen" : "normal",
        maskImage: "linear-gradient(to top, transparent 0%, white 30%)",
        opacity: isDark ? 1 : 0.9,
      }}
    />
  );
};

export default WormEffect;