import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { galleryData } from "../data/galleryData";

// --- Graffiti Canvas Component (single rainbow, immediate static spray; hold-to-draw on touch) ---
type Pt = { x: number; y: number; t: number };
interface GraffitiCanvasProps {
  className?: string;
  brushSize: number;
}
export interface GraffitiCanvasRef {
  clear: () => void;
}

const GraffitiCanvas = forwardRef<GraffitiCanvasRef, GraffitiCanvasProps>(
  ({ className, brushSize }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // store strokes so we can clear later
    const strokesRef = useRef<{ points: Pt[]; size: number }[]>([]);
    const currentStroke = useRef<Pt[]>([]);
    const drawing = useRef(false);
    const strokeStart = useRef(0);
    const lastTime = useRef(0);
    const drawInterval = 12; // ms throttle

    // Hold-to-draw (touch) helpers
    const holdTimerRef = useRef<number | null>(null);
    const initialPtRef = useRef<{ x: number; y: number } | null>(null);
    const HOLD_DELAY = 180; // ms required to switch into drawing on touch
    const MOVE_CANCEL_PX = 8; // movement threshold to cancel hold (let it scroll)

    useImperativeHandle(
      ref,
      () => ({
        clear() {
          strokesRef.current.length = 0;
          currentStroke.current = [];
          const c = canvasRef.current;
          if (!c) return;
          const ctx = c.getContext("2d");
          if (!ctx) return;
          ctx.clearRect(0, 0, c.width, c.height);
        },
      }),
      []
    );

    const getPos = (evt: PointerEvent) => {
      const c = canvasRef.current;
      if (!c) return null;
      const rect = c.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    // Draw a spray cloud for a single point immediately (static)
    const drawSprayPoint = (
      ctx: CanvasRenderingContext2D,
      pt: Pt,
      size: number,
      jitter = 0
    ) => {
      const hue = (pt.t * 0.06 + (pt.x + pt.y) * 0.02 + jitter) % 360;
      const particleCount = Math.max(10, Math.floor(size / 2));
      for (let i = 0; i < particleCount; i++) {
        const offsetX = (Math.random() - 0.5) * size;
        const offsetY = (Math.random() - 0.5) * size;
        const radius = Math.random() * (size / 10) + size / 25;
        ctx.globalAlpha = Math.random() * 0.45 + 0.12;
        ctx.fillStyle = `hsl(${hue} 100% 60%)`;
        ctx.beginPath();
        ctx.arc(pt.x + offsetX, pt.y + offsetY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // draw an entire stroke immediately (no RAF); used on pointermove/up to render static pixels
    const drawStrokeNow = (pts: Pt[], size: number) => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      // For natural variation apply a per-stroke jitter seed
      const jitter = Math.random() * 40;
      for (const p of pts) drawSprayPoint(ctx, p, size, jitter);
    };

    // Cancel any pending hold-to-draw timer
    const cancelHold = () => {
      if (holdTimerRef.current != null) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      initialPtRef.current = null;
    };

    // Start drawing (used after hold time for touch, or immediately for mouse/pen)
    const startDrawingImmediate = (e: PointerEvent) => {
      (e.target as Element).setPointerCapture?.(e.pointerId);
      drawing.current = true;
      strokeStart.current = performance.now();
      const p = getPos(e);
      if (p) currentStroke.current = [{ ...p, t: 0 }];
      e.preventDefault();
    };

    const onPointerDown = useCallback((e: PointerEvent) => {
      // Distinguish pointer types
      const pType = (e as any).pointerType || "touch";

      // Mouse/pen: start drawing immediately
      if (pType === "mouse" || pType === "pen") {
        cancelHold();
        startDrawingImmediate(e);
        return;
      }

      // For touch: start a hold timer and track initial pos; allow browser to scroll until hold completes
      cancelHold();
      const p = getPos(e);
      initialPtRef.current = p;
      holdTimerRef.current = window.setTimeout(() => {
        holdTimerRef.current = null;
        // Only start drawing if pointer hasn't moved away (scroll canceled)
        startDrawingImmediate(e);
      }, HOLD_DELAY);
      // do NOT preventDefault here so the page can scroll if user moves quickly
    }, []);

    const onPointerMove = useCallback(
      (e: PointerEvent) => {
        const pType = (e as any).pointerType || "touch";

        // If touch and not yet drawing, check movement to cancel hold (allow scrolling)
        if (pType === "touch" && !drawing.current) {
          const init = initialPtRef.current;
          if (!init) return;
          const pos = getPos(e);
          if (!pos) return;
          const dx = pos.x - init.x;
          const dy = pos.y - init.y;
          if (Math.hypot(dx, dy) > MOVE_CANCEL_PX) {
            // user intends to scroll/drag — cancel drawing
            cancelHold();
            return;
          }
          // otherwise, still waiting for hold; do nothing (allow scroll)
          return;
        }

        // If drawing (mouse/pen or touch after hold) process as before
        if (!drawing.current) return;
        const now = performance.now();
        if (now - lastTime.current < drawInterval) return;
        lastTime.current = now;
        const p0 = getPos(e);
        if (!p0) return;
        const t = Math.max(0, performance.now() - strokeStart.current);
        const pt: Pt = { ...p0, t };
        currentStroke.current.push(pt);
        // draw only the newest point immediately so the output is static (no animation)
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        // prevent scrolling while actively drawing
        e.preventDefault();
        drawSprayPoint(ctx, pt, brushSize, 0);
      },
      [brushSize]
    );

    const onPointerUp = useCallback(
      (e?: PointerEvent) => {
        cancelHold();
        if (!drawing.current) return;
        drawing.current = false;
        if (currentStroke.current.length > 0) {
          strokesRef.current.push({
            points: [...currentStroke.current],
            size: brushSize,
          });
          // ensure the whole stroke is drawn (covers any missed samples)
          drawStrokeNow(currentStroke.current, brushSize);
        }
        currentStroke.current = [];
        try {
          if (e)
            (e.target as Element).releasePointerCapture?.((e as any).pointerId);
        } catch {}
      },
      [brushSize]
    );

    // high-DPR sizing (canvas covers hero area – top-left origin)
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let mounted = true;
      const resize = () => {
        if (!mounted) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      };
      resize();
      const ro =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(resize)
          : null;
      if (ro) ro.observe(canvas.parentElement ?? canvas);
      window.addEventListener("resize", resize);
      return () => {
        mounted = false;
        if (ro) ro.disconnect();
        window.removeEventListener("resize", resize);
      };
    }, []);

    // pointer wiring
    useEffect(() => {
      const c = canvasRef.current;
      if (!c) return;
      // allow vertical page panning by default; drawing will preventDefault when active
      c.style.touchAction = "pan-y";
      c.addEventListener("pointerdown", onPointerDown);
      c.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      return () => {
        cancelHold();
        c.removeEventListener("pointerdown", onPointerDown);
        c.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      };
    }, [onPointerDown, onPointerMove, onPointerUp]);

    // ensure the canvas element is top-left anchored and covers the hero
    return (
      <canvas
        ref={canvasRef}
        className={`${className ?? ""} absolute left-0 top-0 w-full h-full`}
      />
    );
  }
);

// --- Home component uses gallery images as backgrounds and auto-reset ---
export default function Home() {
  // flatten gallery images
  const backgroundImages = useMemo(
    () => galleryData.flatMap((g) => g.images),
    []
  );

  const [currentBg, setCurrentBg] = useState(0);

  // responsive default brush size (single size, no controls)
  const defaultSize = useMemo(() => {
    const base = Math.min(window.innerWidth || 800, window.innerHeight || 600);
    return Math.max(12, Math.min(60, Math.round(base / 30)));
  }, []);
  const [spraySize] = useState(defaultSize);
  const canvasRef = useRef<GraffitiCanvasRef | null>(null);

  // cycle backgrounds every 6s (visual) but reset canvas every 30s
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBg((s) => (s + 1) % Math.max(1, backgroundImages.length));
    }, 6000);
    return () => clearInterval(bgTimer);
  }, [backgroundImages.length]);

  // auto-clear drawing every 30s
  useEffect(() => {
    const clearTimer = setInterval(() => {
      canvasRef.current?.clear();
    }, 30000);
    return () => clearInterval(clearTimer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen w-full max-w-full overflow-hidden"
    >
      {backgroundImages.map((imgUrl, index) => (
        <div
          key={imgUrl + index}
          className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${imgUrl}')`,
            opacity: index === currentBg ? 1 : 0,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="absolute inset-0 z-10 bg-black/70" aria-hidden="true" />

      {/* Tiny Clear button: top-right corner of the hero (click to clear canvas) */}
      <button
        onClick={() => canvasRef.current?.clear()}
        title="Clear spray"
        aria-label="Clear spray"
        className="absolute top-3 right-3 z-[990] p-2 rounded-full bg-black/50 hover:bg-black/70 text-white shadow-sm backdrop-blur-sm transition pointer-events-auto"
      >
        {/* simple trash icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 6h18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 11v6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11v6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <GraffitiCanvas
        ref={canvasRef}
        className="absolute inset-0 z-20"
        brushSize={spraySize}
      />

      <div className="relative z-30 flex flex-col items-center justify-center w-full min-h-screen text-center px-4 sm:px-6 py-20 max-w-6xl mx-auto pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-artout mb-3 sm:mb-4 transition-all duration-500 max-w-full drop-shadow-lg">
          ArtOut
        </h1>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl text-white/90 font-semibold font-sunda mb-3 sm:mb-4 drop-shadow-md">
          Graffiti & Street Art Around the World
        </p>
        <p className="mt-2 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-white/80 font-akadylan mb-6 sm:mb-8 text-center drop-shadow">
          Discover, capture, and share the world's most vibrant street art—live
          and on location.
        </p>
        <a
          href="#features"
          className="inline-block bg-pink-600 text-white font-sunda font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300 text-sm sm:text-base md:text-lg mt-2 pointer-events-auto"
        >
          Explore Features
        </a>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 z-30 bottom-8 sm:bottom-12 md:bottom-16 hidden sm:block hide-on-short pointer-events-none">
        <span className="text-white text-xl sm:text-2xl md:text-3xl animate-bounce drop-shadow-lg">
          ↓
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent pointer-events-none" />
    </section>
  );
}
