"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type StitchRun = {
  row: number;
  y: number;
  x1: number;
  x2: number;
  refCol: number;
  jitter: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
};

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function shadeHex(hex: string, amount: number) {
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.replace(/(.)/g, "$1$1") : clean, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function toRgba(rgb: string, alpha: number) {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface StitchIconProps {
  /** Raw SVG markup, used only as an alpha mask — its own fill/stroke color
   *  is discarded once rasterized to the sampling grid. Provide this or svgSrc. */
  svgMarkup?: string;
  /** URL to fetch SVG markup from at mount (for large illustration files —
   *  keeps the bundle from carrying big inline strings). */
  svgSrc?: string;
  /** URL to a raster image (jpg/png) to use as the silhouette instead of an
   *  SVG — sampled by darkness against a white backdrop rather than alpha,
   *  since photos/scans have no transparency channel. */
  imgSrc?: string;
  /** Thread color as a hex string, e.g. "#c94a3a". */
  threadColor: string;
  size?: number;
  cols?: number;
  seed?: number;
  className?: string;
}

/** Renders an SVG shape as a small embroidered patch: the shape is
 *  rasterized to a fine alpha grid, each row's occupied columns collapse
 *  into contiguous horizontal runs, and every run fills with a dense strip
 *  of parallel diagonal satin-stitch threads tracing the silhouette. The
 *  whole grid wave-stitches itself in on mount, idly breathes at a barely
 *  visible scale (via a seeded CSS animation so a row of them never syncs
 *  up), and the strips nearest the pointer bulge outward with a soft
 *  highlight, like a droplet resting on the fabric, then relax on pointer
 *  leave. Ported from the physics-icon "stitch" treatment, without the
 *  theme-observer/anime.js machinery this project doesn't have. */
export default function StitchIcon({
  svgMarkup,
  svgSrc,
  imgSrc,
  threadColor,
  size = 220,
  cols = 44,
  seed = 1,
  className = "",
}: StitchIconProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runsRef = useRef<StitchRun[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    let cancelled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rows = cols;
    // Fixed internal resolution for the physics/sampling math; displayed at
    // 100% of the wrapper via CSS so it scales cleanly across breakpoints
    // (downscaling a raster canvas reads fine — it's upscaling that blurs).
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const glintColor = shadeHex(threadColor, 140);

    const sample = document.createElement("canvas");
    sample.width = cols;
    sample.height = rows;
    const sctx = sample.getContext("2d", { willReadFrequently: true });
    const img = new Image();
    let objectUrl: string | null = null;

    const cellW = size / cols;
    const cellH = size / rows;
    const stitchGap = size / 30;
    const legDur = 130;
    const stagger = 340 / cols;
    const rippleRadius = stitchGap * 3.2;
    const rippleStrength = stitchGap * 0.5;

    function drawRun(c: CanvasRenderingContext2D, run: StitchRun, progress: number) {
      const p = Math.min(1, Math.max(0, progress));
      if (p <= 0) return;
      const y = run.y + run.dy;
      const width = run.x2 - run.x1;
      const steps = Math.max(1, Math.round(width / stitchGap));
      const half = stitchGap * 0.62 * Math.min(1, 0.5 + p * 0.5);
      const color = shadeHex(threadColor, run.jitter);
      c.save();
      c.globalAlpha = Math.min(1, p * 1.4);
      c.strokeStyle = color;
      c.lineCap = "round";
      c.lineWidth = cellH * 0.9;
      for (let i = 0; i < steps; i++) {
        const cx = run.x1 + run.dx + (i + 0.5) * (width / steps);
        const tilt = half * 0.32;
        c.beginPath();
        c.moveTo(cx - half, y - tilt);
        c.lineTo(cx + half, y + tilt);
        c.stroke();
      }
      c.globalAlpha *= 0.4;
      c.lineWidth = cellH * 0.32;
      for (let i = 0; i < steps; i++) {
        const cx = run.x1 + run.dx + (i + 0.5) * (width / steps);
        const tilt = half * 0.32;
        c.beginPath();
        c.moveTo(cx - half * 0.7, y + tilt * 1.4);
        c.lineTo(cx + half * 0.7, y - tilt * 0.6);
        c.stroke();
      }
      c.restore();
    }

    function drawDroplet(c: CanvasRenderingContext2D, px: number, py: number) {
      const r = rippleRadius * 0.9;
      const gradient = c.createRadialGradient(px, py, 0, px, py, r);
      gradient.addColorStop(0, toRgba(glintColor, 0.85));
      gradient.addColorStop(0.35, toRgba(glintColor, 0.45));
      gradient.addColorStop(1, toRgba(glintColor, 0));
      c.save();
      c.fillStyle = gradient;
      c.beginPath();
      c.arc(px, py, r, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    function tick(t: number) {
      if (cancelled || !ctx) return;
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;

      const pointer = !reduceMotion ? pointerRef.current : null;
      let stillRevealing = false;
      let stillSettling = false;

      ctx.clearRect(0, 0, size, size);
      for (const run of runsRef.current) {
        const revealAt = run.refCol * stagger;
        const progress = (elapsed - revealAt) / legDur;
        if (progress < 1) stillRevealing = true;

        let tx = 0;
        let ty = 0;
        if (pointer) {
          const midx = (run.x1 + run.x2) / 2;
          const nearX = Math.min(run.x2, Math.max(run.x1, pointer.x));
          const ddx = midx - pointer.x;
          const ddy = run.y - pointer.y;
          const dist = Math.hypot(nearX - pointer.x, ddy);
          if (dist < rippleRadius) {
            const falloff = 1 - dist / rippleRadius;
            const eased = falloff * falloff;
            const ny = ddy !== 0 ? ddy / Math.abs(ddy) : 1;
            tx = Math.sign(ddx || 1) * rippleStrength * eased * 0.3;
            ty = ny * rippleStrength * eased;
          }
        }
        run.vx += (tx - run.dx) * 0.22;
        run.vy += (ty - run.dy) * 0.22;
        run.vx *= 0.72;
        run.vy *= 0.72;
        run.dx += run.vx;
        run.dy += run.vy;
        if (Math.abs(run.dx) > 0.02 || Math.abs(run.dy) > 0.02 || Math.abs(run.vx) > 0.02 || Math.abs(run.vy) > 0.02) {
          stillSettling = true;
        }

        drawRun(ctx, run, progress);
      }
      if (pointer && !stillRevealing) drawDroplet(ctx, pointer.x, pointer.y);

      if (stillRevealing || stillSettling || pointer) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function kick() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    function loadMarkup(markup: string, isSvg: boolean) {
      if (cancelled || !sctx) return;
      const type = isSvg ? "image/svg+xml" : undefined;
      objectUrl = type
        ? URL.createObjectURL(new Blob([markup], { type }))
        : markup;
      img.src = objectUrl;
    }

    img.onload = () => {
      if (cancelled || !sctx) return;
      // Fit-contain into the square sample grid (never stretch a wide car or
      // a tall stack into a distorted square), on a white backdrop so both
      // transparent SVG regions and opaque photo backgrounds read as "not
      // occupied" the same way.
      const iw = img.naturalWidth || cols;
      const ih = img.naturalHeight || rows;
      const scale = Math.min(cols / iw, rows / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cols - dw) / 2;
      const dy = (rows - dh) / 2;
      sctx.fillStyle = "#fff";
      sctx.fillRect(0, 0, cols, rows);
      sctx.drawImage(img, dx, dy, dw, dh);
      const data = sctx.getImageData(0, 0, cols, rows).data;
      if (objectUrl && objectUrl.startsWith("blob:")) URL.revokeObjectURL(objectUrl);

      const jitterRand = seededRandom(seed);
      const runs: StitchRun[] = [];
      for (let r = 0; r < rows; r++) {
        let runStart = -1;
        for (let c = 0; c <= cols; c++) {
          let occupied = false;
          if (c < cols) {
            const i = (r * cols + c) * 4;
            const luminance = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            occupied = luminance < 150 && data[i + 3] > 40;
          }
          if (occupied && runStart === -1) runStart = c;
          if (!occupied && runStart !== -1) {
            const jitter = Math.round((jitterRand() - 0.5) * 40);
            runs.push({
              row: r,
              y: r * cellH + cellH / 2,
              x1: runStart * cellW,
              x2: c * cellW,
              refCol: (runStart + c) / 2,
              jitter,
              dx: 0,
              dy: 0,
              vx: 0,
              vy: 0,
            });
            runStart = -1;
          }
        }
      }
      runsRef.current = runs;
      startRef.current = null;
      kick();
    };

    if (svgMarkup) {
      loadMarkup(svgMarkup, true);
    } else if (svgSrc) {
      fetch(svgSrc)
        .then((r) => r.text())
        .then((text) => {
          if (!cancelled) loadMarkup(text, true);
        })
        .catch(() => {});
    } else if (imgSrc) {
      loadMarkup(imgSrc, false);
    }

    const toLocal = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      return { x: ((clientX - rect.left) / rect.width) * size, y: ((clientY - rect.top) / rect.height) * size };
    };
    const onMove = (e: PointerEvent) => {
      pointerRef.current = toLocal(e.clientX, e.clientY);
      kick();
    };
    const onLeave = () => {
      pointerRef.current = null;
      kick();
    };
    if (!reduceMotion) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerdown", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      wrap.addEventListener("pointerup", onLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (objectUrl && objectUrl.startsWith("blob:")) URL.revokeObjectURL(objectUrl);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointerup", onLeave);
    };
  }, [svgMarkup, svgSrc, imgSrc, threadColor, size, cols, seed]);

  const rand = seededRandom(seed + 500);
  const style = {
    animationDuration: `${2600 + rand() * 1200}ms`,
    animationDelay: `${rand() * 600}ms`,
  } as CSSProperties;

  return (
    <div ref={wrapRef} className={`rj-stitch-wrap ${className}`} style={style}>
      <canvas ref={canvasRef} />
    </div>
  );
}
