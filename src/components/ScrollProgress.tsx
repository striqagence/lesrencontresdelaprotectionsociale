"use client";

import { useEffect, useRef } from "react";

/**
 * Fine barre de progression en haut de page, qui se remplit selon le scroll.
 * Utilise `scaleX` (transform GPU) + rAF pour rester fluide.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (el) {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const ratio = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
        el.style.transform = `scaleX(${ratio})`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        ref={ref}
        className="scroll-progress h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, #00A3BF 0%, #735092 50%, #C02A87 100%)",
        }}
      />
    </div>
  );
}
