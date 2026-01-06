import React, { useRef, useEffect } from 'react';

interface SpidermanBackgroundProps {
  enabled: boolean;
}

const SpidermanBackground: React.FC<SpidermanBackgroundProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize scroll tracker
    lastScrollY.current = window.scrollY;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // --- Configuration ---
    const CONFIG = {
      GRAVITY: 0.4,       // Snappier gravity
      FRICTION: 0.99,
      WALL_JUMP_X: 18,
      WALL_JUMP_Y: 15,
      WALL_STICK_TIME: 120,
      WALL_COOLDOWN: 40,
      MAX_SWING_TIME: 180, 
      // Stronger colors because we rely on container opacity
      COLOR_LIGHT: { red: '#ef4444', blue: '#3b82f6', web: 'rgba(0,0,0,0.3)' },
      COLOR_DARK: { red: '#f87171', blue: '#60a5fa', web: 'rgba(255,255,255,0.2)' }
    };

    // --- State Management ---
    type SpiderState = 'FALLING' | 'SWINGING' | 'WALL_STUCK';

    const spider = {
      pos: { x: width / 2, y: height / 3 },
      vel: { x: 10, y: 0 },
      state: 'FALLING' as SpiderState,
      anchor: { x: 0, y: 0 },
      webLength: 0,
      timers: {
        stick: 0,
        cooldown: 0,
        swingDuration: 0 
      },
      facingRight: true
    };

    const dist = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
      return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    };

    const animate = () => {
      // 1. Setup & Clear
      const isDark = document.documentElement.classList.contains('dark');
      const colors = isDark ? CONFIG.COLOR_DARK : CONFIG.COLOR_LIGHT;
      ctx.clearRect(0, 0, width, height);

      // 2. Scroll Interaction
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (Math.abs(scrollDelta) > 0) {
        spider.pos.y -= scrollDelta;
      }

      // 3. Decrement Cooldowns
      if (spider.timers.cooldown > 0) spider.timers.cooldown--;

      // 4. State Logic
      switch (spider.state) {
        case 'WALL_STUCK':
          handleWallStuck();
          break;
        case 'SWINGING':
          handleSwinging();
          break;
        case 'FALLING':
          handleFalling();
          break;
      }

      // 5. Global Boundary Checks
      if (spider.pos.y > height + 200) {
        spider.pos.y = height + 200;
        spider.vel.y = -35; 
        spider.vel.x = (Math.random() - 0.5) * 40;
        spider.state = 'FALLING';
      }

      // 6. Draw
      drawSpider(ctx, colors);

      requestAnimationFrame(animate);
    };

    // --- Physics Handlers ---

    const handleWallStuck = () => {
      spider.vel.x = 0;
      spider.vel.y = 0;
      spider.timers.stick--;

      // If scrolled way off screen, detach
      if (spider.pos.y < -50 || spider.pos.y > window.innerHeight + 50) {
         spider.state = 'FALLING';
         spider.timers.stick = 0;
      }

      if (spider.timers.stick <= 0) {
        spider.state = 'FALLING';
        spider.timers.cooldown = CONFIG.WALL_COOLDOWN;

        if (spider.pos.x < width / 2) {
          spider.vel.x = CONFIG.WALL_JUMP_X + Math.random() * 5;
          spider.vel.y = -CONFIG.WALL_JUMP_Y - Math.random() * 5;
        } else {
          spider.vel.x = -CONFIG.WALL_JUMP_X - Math.random() * 5;
          spider.vel.y = -CONFIG.WALL_JUMP_Y - Math.random() * 5;
        }
      }
    };

    const handleFalling = () => {
      spider.vel.y += CONFIG.GRAVITY;
      spider.vel.x *= CONFIG.FRICTION;
      spider.vel.y *= CONFIG.FRICTION;

      spider.pos.x += spider.vel.x;
      spider.pos.y += spider.vel.y;

      if (spider.timers.cooldown <= 0) {
        const wallPadding = 20;
        if (spider.pos.x <= wallPadding) {
          spider.pos.x = wallPadding;
          stickToWall(true);
          return;
        }
        if (spider.pos.x >= width - wallPadding) {
          spider.pos.x = width - wallPadding;
          stickToWall(false);
          return;
        }
      }

      const isVisible = spider.pos.y > -100 && spider.pos.y < height;
      const isTooHigh = spider.pos.y < height * 0.15; 
      const allowedToShoot = spider.pos.x > 100 && spider.pos.x < width - 100; 
      
      if (isVisible && !isTooHigh && allowedToShoot && spider.vel.y > 0 && Math.random() < 0.05) {
        const rangeY = 600;
        let lookAheadX = spider.vel.x * 20;
        
        if (Math.abs(spider.vel.x) < 4) {
          const randomDir = Math.random() > 0.5 ? 1 : -1;
          lookAheadX = randomDir * (180 + Math.random() * 100); 
          spider.vel.x += randomDir * 4; 
        }

        const targetX = spider.pos.x + lookAheadX; 
        const targetY = Math.max(0, spider.pos.y - rangeY);
        
        spider.anchor = { x: targetX, y: targetY };
        spider.webLength = dist(spider.pos, spider.anchor);
        spider.state = 'SWINGING';
        spider.timers.swingDuration = 0; 
      }
    };

    const handleSwinging = () => {
      spider.timers.swingDuration++;
      spider.vel.y += CONFIG.GRAVITY;
      
      spider.pos.x += spider.vel.x;
      spider.pos.y += spider.vel.y;

      const dx = spider.pos.x - spider.anchor.x;
      const dy = spider.pos.y - spider.anchor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > spider.webLength) {
         const nx = dx / distance;
         const ny = dy / distance;

         spider.pos.x = spider.anchor.x + nx * spider.webLength;
         spider.pos.y = spider.anchor.y + ny * spider.webLength;

         const vDotN = spider.vel.x * nx + spider.vel.y * ny;
         if (vDotN > 0) {
            spider.vel.x -= nx * vDotN;
            spider.vel.y -= ny * vDotN;
         }
      }

      spider.vel.x *= 0.998;
      spider.vel.y *= 0.998;

      if (Math.abs(spider.vel.x) < 3.5 && spider.timers.swingDuration > 20) {
         spider.state = 'FALLING';
         return;
      }

      if (spider.timers.swingDuration > CONFIG.MAX_SWING_TIME) {
        spider.state = 'FALLING';
        return;
      }

      if (spider.pos.y < 20) {
        spider.state = 'FALLING';
        spider.vel.y = 5; 
        return;
      }

      const swingFinished = spider.pos.y < spider.anchor.y + spider.webLength * 0.9 && spider.vel.y < 0;
      const nearWall = spider.pos.x < 100 || spider.pos.x > width - 100;

      if (swingFinished || (nearWall && spider.timers.cooldown <= 0)) {
        if (Math.random() < 0.2) { 
           spider.state = 'FALLING';
        }
      }
    };

    const stickToWall = (isLeft: boolean) => {
      spider.state = 'WALL_STUCK';
      spider.timers.stick = CONFIG.WALL_STICK_TIME + Math.random() * 60;
      spider.facingRight = isLeft; 
    };

    const drawSpider = (ctx: CanvasRenderingContext2D, colors: any) => {
      if (spider.state === 'SWINGING') {
        ctx.beginPath();
        ctx.moveTo(spider.anchor.x, spider.anchor.y);
        ctx.lineTo(spider.pos.x, spider.pos.y);
        ctx.strokeStyle = colors.web;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = colors.web;
        ctx.beginPath();
        ctx.arc(spider.anchor.x, spider.anchor.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(spider.pos.x, spider.pos.y);

      let rotation = 0;
      if (spider.state === 'WALL_STUCK') {
        rotation = spider.pos.x < width / 2 ? Math.PI / 2 : -Math.PI / 2;
      } else if (spider.state === 'SWINGING') {
         const dx = spider.anchor.x - spider.pos.x;
         const dy = spider.anchor.y - spider.pos.y;
         rotation = Math.atan2(dy, dx) + Math.PI / 2;
      } else {
        rotation = Math.atan2(spider.vel.y, spider.vel.x * 0.5) * 0.5;
      }
      ctx.rotate(rotation);

      const s = 1.4; 
      ctx.scale(s, s);

      // --- Character Art ---
      ctx.strokeStyle = colors.blue;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      if (spider.state === 'WALL_STUCK') {
        ctx.moveTo(-4, 2); ctx.lineTo(-10, 8); ctx.lineTo(-12, 0); 
        ctx.moveTo(4, 2); ctx.lineTo(10, 8); ctx.lineTo(12, 0);   
        ctx.stroke();
        
        ctx.beginPath();
        ctx.strokeStyle = colors.red;
        ctx.moveTo(-5, -4); ctx.lineTo(-10, -10); ctx.lineTo(-14, -4); 
        ctx.moveTo(5, -4); ctx.lineTo(10, -10); ctx.lineTo(14, -4);   
        ctx.stroke();
      } 
      else if (spider.state === 'SWINGING') {
         ctx.moveTo(-3, 6); ctx.lineTo(-6, 12); ctx.lineTo(0, 14);
         ctx.moveTo(3, 6); ctx.lineTo(6, 12); ctx.lineTo(0, 14);
         ctx.stroke();

         ctx.beginPath();
         ctx.strokeStyle = colors.red;
         ctx.moveTo(4, -4); ctx.lineTo(6, -12); ctx.lineTo(0, -20); 
         ctx.moveTo(-4, -4); ctx.lineTo(-8, 0); ctx.lineTo(-10, 5); 
         ctx.stroke();
      }
      else {
        ctx.moveTo(-3, 6); ctx.lineTo(-8, 10); ctx.lineTo(-6, 16);
        ctx.moveTo(3, 6); ctx.lineTo(8, 10); ctx.lineTo(6, 16);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = colors.red;
        ctx.moveTo(-4, -4); ctx.lineTo(-10, -8); ctx.lineTo(-14, -2);
        ctx.moveTo(4, -4); ctx.lineTo(10, -8); ctx.lineTo(14, -2);
        ctx.stroke();
      }

      ctx.fillStyle = colors.blue;
      ctx.fillRect(-5, -6, 10, 14);
      ctx.fillStyle = colors.red;
      ctx.fillRect(-3, -6, 6, 14);

      ctx.fillStyle = colors.red;
      ctx.beginPath();
      ctx.arc(0, -9, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.ellipse(-2.5, -9, 2, 3.5, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(2.5, -9, 2, 3.5, 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-20 mix-blend-normal transition-opacity duration-1000 ease-in-out ${enabled ? 'opacity-40' : 'opacity-0'}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default SpidermanBackground;


