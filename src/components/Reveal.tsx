"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Balise de rendu (div par défaut). */
  as?: ElementType;
  className?: string;
  /** Décalage vertical de départ (px). */
  y?: number;
  /** Échelle de départ (ex. 0.97 pour les cartes piliers). */
  scale?: number;
  /** Délai d'apparition en ms (utilisé pour le stagger). */
  delay?: number;
  style?: React.CSSProperties;
};

/**
 * Révèle son contenu à l'entrée dans le viewport (IntersectionObserver,
 * `threshold: 0.12`, `unobserve` après déclenchement). Respecte
 * `prefers-reduced-motion` (le CSS force l'état final).
 */
export default function Reveal({
  children,
  as,
  className = "",
  y = 24,
  scale = 1,
  delay = 0,
  style,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si l'utilisateur préfère moins d'animations, on affiche directement.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-revealed={revealed}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-scale": scale,
          "--reveal-delay": `${delay}ms`,
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
