"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  depth: number;
  hue: number;
};

type Asteroid = {
  angle: number;
  orbit: number;
  size: number;
  depth: number;
  speed: number;
  wobble: number;
  shade: number;
};

const TAU = Math.PI * 2;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0 };
    const motion = { time: 0 };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let reducedMotion = mediaQuery.matches;
    let stars: Star[] = [];
    let asteroids: Asteroid[] = [];

    const makeScene = () => {
      const random = seededRandom(19890721);
      const starCount = Math.min(320, Math.max(110, Math.round((width * height) / 6500)));
      const asteroidCount = Math.min(34, Math.max(16, Math.round(width / 55)));

      stars = Array.from({ length: starCount }, () => ({
        x: random(),
        y: random(),
        radius: 0.35 + random() * 1.45,
        alpha: 0.18 + random() * 0.75,
        depth: 0.25 + random() * 0.75,
        hue: random() > 0.76 ? 205 + random() * 45 : 270 + random() * 45,
      }));

      asteroids = Array.from({ length: asteroidCount }, (_, index) => ({
        angle: random() * TAU,
        orbit: 0.18 + random() * 0.55,
        size: 1.8 + Math.pow(random(), 2) * 8,
        depth: 0.35 + random() * 0.85,
        speed: (0.035 + random() * 0.08) * (index % 3 === 0 ? -1 : 1),
        wobble: random() * TAU,
        shade: 42 + random() * 34,
      }));
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeScene();
      draw();
    };

    const draw = () => {
      const t = reducedMotion ? 4.5 : motion.time;
      const cx = width * (0.53 + pointer.x * 0.025);
      const cy = height * (0.42 + pointer.y * 0.02);
      const scale = Math.min(width, height);

      const background = context.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.82);
      background.addColorStop(0, "#160d35");
      background.addColorStop(0.35, "#090c24");
      background.addColorStop(0.72, "#040713");
      background.addColorStop(1, "#02030a");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "screen";
      const nebula = context.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.64);
      nebula.addColorStop(0, "rgba(106, 65, 255, .18)");
      nebula.addColorStop(0.42, "rgba(30, 99, 220, .09)");
      nebula.addColorStop(0.75, "rgba(178, 45, 184, .035)");
      nebula.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = nebula;
      context.fillRect(0, 0, width, height);

      stars.forEach((star, index) => {
        const drift = t * (2.4 + star.depth * 4);
        const x = ((star.x * width + drift + pointer.x * 14 * star.depth) % (width + 12)) - 6;
        const y = star.y * height + pointer.y * 9 * star.depth;
        const twinkle = reducedMotion ? 1 : 0.66 + Math.sin(t * 1.7 + index * 2.13) * 0.34;
        context.beginPath();
        context.fillStyle = `hsla(${star.hue}, 90%, 88%, ${star.alpha * twinkle})`;
        context.arc(x, y, star.radius, 0, TAU);
        context.fill();
      });
      context.restore();

      asteroids
        .slice()
        .sort((a, b) => a.depth - b.depth)
        .forEach((asteroid) => {
          const angle = asteroid.angle + t * asteroid.speed;
          const radius = scale * asteroid.orbit;
          const x = cx + Math.cos(angle) * radius * 1.5 + pointer.x * 18 * asteroid.depth;
          const y = cy + Math.sin(angle) * radius * 0.56 + Math.sin(t * 0.35 + asteroid.wobble) * 7;
          const size = asteroid.size * asteroid.depth;

          context.save();
          context.translate(x, y);
          context.rotate(angle * 0.65 + asteroid.wobble);
          context.beginPath();
          for (let point = 0; point < 8; point += 1) {
            const pointAngle = (point / 8) * TAU;
            const roughness = 0.72 + Math.sin(point * 5.17 + asteroid.wobble) * 0.18;
            const px = Math.cos(pointAngle) * size * roughness;
            const py = Math.sin(pointAngle) * size * roughness * 0.78;
            if (point === 0) context.moveTo(px, py);
            else context.lineTo(px, py);
          }
          context.closePath();
          context.shadowColor = "rgba(105, 92, 255, .35)";
          context.shadowBlur = size * 1.8;
          const rock = context.createLinearGradient(-size, -size, size, size);
          rock.addColorStop(0, `hsl(246, 13%, ${asteroid.shade + 13}%)`);
          rock.addColorStop(0.42, `hsl(250, 15%, ${asteroid.shade}%)`);
          rock.addColorStop(1, `hsl(245, 18%, ${Math.max(11, asteroid.shade - 24)}%)`);
          context.fillStyle = rock;
          context.fill();
          context.restore();
        });
    };

    const renderTick = () => {
      if (!reducedMotion) draw();
    };

    const onPointerMove = (event: PointerEvent) => {
      gsap.to(pointer, {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
        duration: 1.3,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      animation.paused(reducedMotion);
      if (reducedMotion) draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const animation = gsap.to(motion, {
      time: 1000,
      duration: 1000,
      ease: "none",
      repeat: -1,
      paused: reducedMotion,
    });
    gsap.ticker.add(renderTick);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    mediaQuery.addEventListener("change", onMotionChange);
    resize();

    return () => {
      animation.kill();
      gsap.killTweensOf(pointer);
      gsap.ticker.remove(renderTick);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
