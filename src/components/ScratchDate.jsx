import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { t } from "../i18n/translations";
import { fireCardConfetti, fireGrandConfetti } from "../utils/confetti";

const BRUSH_RADIUS = 32;
const REVEAL_THRESHOLD = 0.42;
const PROGRESS_CHECK_INTERVAL = 8;

function setupCanvas(canvas, wrapper, hint) {
  const rect = wrapper.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = rect.width;
  const h = rect.height;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "#c98884");
  gradient.addColorStop(0.45, "#ba7a76");
  gradient.addColorStop(1, "#a86864");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "700 0.62rem Tenor Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(hint.toUpperCase(), w / 2, h / 2);

  return { ctx, w, h };
}

function scratchDot(ctx, x, y) {
  ctx.globalCompositeOperation = "destination-out";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, BRUSH_RADIUS);
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(0.55, "rgba(0,0,0,0.85)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

function getScratchRatio(canvas) {
  const ctx = canvas.getContext("2d");
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let transparent = 0;
  const step = 4 * 8;
  for (let i = 3; i < data.length; i += step) {
    if (data[i] < 32) transparent++;
  }
  return transparent / (data.length / step);
}

function ScratchCard({ label, value, hint, delay, visible, onRevealed }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const ctxRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const lastPoint = useRef(null);
  const strokeCount = useRef(0);
  const drawing = useRef(false);
  const revealedRef = useRef(false);

  const [scratched, setScratched] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper || !visible) return;

    const setup = () => {
      const { ctx, w, h } = setupCanvas(canvas, wrapper, hint);
      ctxRef.current = ctx;
      sizeRef.current = { w, h };
      lastPoint.current = null;
      strokeCount.current = 0;
      revealedRef.current = false;
      setScratched(false);
      setIsScratching(false);
    };

    setup();
    window.addEventListener("resize", setup);
    return () => window.removeEventListener("resize", setup);
  }, [visible, hint]);

  const checkReveal = useCallback(() => {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = getScratchRatio(canvas);
    if (ratio >= REVEAL_THRESHOLD) {
      revealedRef.current = true;
      setScratched(true);
      setIsScratching(false);
      fireCardConfetti(wrapperRef.current);
      onRevealed?.();
    }
  }, [onRevealed]);

  const applyScratch = useCallback(
    (x, y) => {
      const ctx = ctxRef.current;
      if (!ctx || revealedRef.current) return;

      const last = lastPoint.current;
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const steps = Math.max(1, Math.ceil(dist / 3));
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          scratchDot(ctx, last.x + (x - last.x) * t, last.y + (y - last.y) * t);
        }
      } else {
        scratchDot(ctx, x, y);
      }

      lastPoint.current = { x, y };
      strokeCount.current += 1;

      if (strokeCount.current % PROGRESS_CHECK_INTERVAL === 0) {
        checkReveal();
      }
    },
    [checkReveal],
  );

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e) => {
    if (revealedRef.current) return;
    e.preventDefault();
    canvasRef.current?.setPointerCapture(e.pointerId);
    drawing.current = true;
    setIsScratching(true);
    lastPoint.current = null;
    const { x, y } = getPos(e);
    applyScratch(x, y);
  };

  const handlePointerMove = (e) => {
    if (!drawing.current || revealedRef.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    applyScratch(x, y);
  };

  const endStroke = (e) => {
    if (!drawing.current) return;
    drawing.current = false;
    setIsScratching(false);
    lastPoint.current = null;
    if (canvasRef.current && e.pointerId !== undefined) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
    checkReveal();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--sage-dark)]">
        {label}
      </span>
      <div
        ref={wrapperRef}
        className={[
          "scratch-card-wrapper",
          visible && !scratched && !isScratching ? "animate-float-card" : "",
          scratched ? "scratch-card-revealed" : "",
          isScratching ? "scratch-card-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ animationDelay: `${delay}s` }}
      >
        <div className={`scratch-value ${scratched ? "scratch-value-revealed" : ""}`}>
          {value}
        </div>
        {!scratched && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endStroke}
            onPointerCancel={endStroke}
            onPointerLeave={endStroke}
          />
        )}
      </div>
      <span
        className={`font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-opacity duration-300 ${
          scratched ? "opacity-0" : "text-[var(--text-light)]"
        }`}
      >
        ↑ {hint}
      </span>
    </div>
  );
}

export default function ScratchDate({ language }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const revealedCount = useRef(0);
  const grandFired = useRef(false);
  const isMr = language === "mr";

  const handleRevealed = useCallback(() => {
    revealedCount.current += 1;
    if (revealedCount.current >= 3 && !grandFired.current) {
      grandFired.current = true;
      setTimeout(fireGrandConfetti, 280);
    }
  }, []);

  useEffect(() => {
    revealedCount.current = 0;
    grandFired.current = false;
  }, [language]);

  const cards = [
    { label: t(language, "month"), value: isMr ? "जुलै" : "JULY", delay: 0 },
    { label: t(language, "day"), value: isMr ? "४" : "04", delay: 0.3 },
    { label: t(language, "year"), value: isMr ? "२०२६" : "2026", delay: 0.6 },
  ];

  return (
    <section
      ref={ref}
      id="countdown-section"
      className="snap-page snap-page--scratch"
      style={{ background: "var(--cream)" }}
    >
      <span className={`sec-label reveal-item reveal-d1 ${inView ? "visible" : ""}`}>
        {t(language, "theDate")}
      </span>
      <h2
        className={`sec-heading reveal-item reveal-d2 ${inView ? "visible" : ""} ${
          language === "mr" ? "sec-heading-mr" : "shimmer"
        }`}
      >
        {t(language, "saveTheDate")}
      </h2>
      <p
        className={`scratch-desc italic text-[var(--text-mid)] reveal-item reveal-d3 ${inView ? "visible" : ""}`}
      >
        {t(language, "scratchDesc")}
      </p>

      <div
        className={`scratch-grid reveal-item reveal-d4 ${inView ? "visible" : ""}`}
      >
        {cards.map((card) => (
          <ScratchCard
            key={card.label}
            label={card.label}
            value={card.value}
            hint={t(language, "scratch")}
            delay={card.delay}
            visible={inView}
            onRevealed={handleRevealed}
          />
        ))}
      </div>
    </section>
  );
}
