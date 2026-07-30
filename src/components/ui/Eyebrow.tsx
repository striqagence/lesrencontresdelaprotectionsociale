import type { ReactNode } from "react";

/**
 * Sur-titre (« eyebrow ») : petit intitulé en capitales, très espacé,
 * placé au-dessus des titres de section.
 */
export default function Eyebrow({
  children,
  color = "var(--color-magenta)",
  size = 16,
  className = "",
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <p
      className={className}
      style={{
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </p>
  );
}
