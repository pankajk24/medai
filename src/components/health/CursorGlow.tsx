import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest("a, button, [role='button'], input, textarea, select, label");
      setHovering(interactive);
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html, body, a, button { cursor: none !important; }
        }
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px; border-radius: 9999px;
          background: var(--primary);
          pointer-events: none; z-index: 9999;
          mix-blend-mode: normal;
          transition: width .2s ease, height .2s ease, background .2s ease;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 38px; height: 38px; border-radius: 9999px;
          border: 1.5px solid color-mix(in oklab, var(--primary) 70%, transparent);
          background: radial-gradient(circle, color-mix(in oklab, var(--primary-glow) 18%, transparent) 0%, transparent 70%);
          box-shadow: 0 0 30px color-mix(in oklab, var(--primary-glow) 40%, transparent);
          pointer-events: none; z-index: 9998;
          transition: width .25s ease, height .25s ease, border-color .25s ease, background .25s ease;
        }
        .cursor-ring.is-hover {
          width: 64px; height: 64px;
          border-color: color-mix(in oklab, var(--accent) 80%, transparent);
          background: radial-gradient(circle, color-mix(in oklab, var(--accent) 20%, transparent) 0%, transparent 70%);
        }
        .cursor-dot.is-hover { background: var(--accent); width: 6px; height: 6px; }
      `}</style>
      <div ref={ringRef} className={`cursor-ring${hovering ? " is-hover" : ""}`} />
      <div ref={dotRef} className={`cursor-dot${hovering ? " is-hover" : ""}`} />
    </>
  );
}
