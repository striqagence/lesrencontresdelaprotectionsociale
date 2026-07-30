/**
 * Losange — motif graphique signature de la marque (carré à 45°).
 * Décliné en plusieurs tailles selon le contexte.
 */
export default function Diamond({
  size = 10,
  color = "#00a3bf",
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        background: color,
        transform: "rotate(45deg)",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
