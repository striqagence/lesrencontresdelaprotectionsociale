import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "magenta" | "white" | "outline";

const VARIANTS: Record<Variant, string> = {
  // CTA principal magenta (programme, footer, contact, hero mobile…)
  magenta:
    "bg-magenta text-white shadow-[0_10px_26px_rgba(193,42,135,0.3)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(193,42,135,0.42)]",
  // Bouton blanc plein (hero / bandeau CTA, sur fond dégradé)
  white:
    "bg-white text-magenta shadow-[0_12px_30px_-10px_rgba(0,0,0,0.3)] " +
    "hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-12px_rgba(0,0,0,0.4)]",
  // Bouton contour clair (hero / bandeau CTA, secondaire)
  outline:
    "border-[1.5px] border-white/55 text-white bg-transparent " +
    "hover:bg-white/12 hover:border-white",
};

type CtaButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  /** Lien externe (nouvel onglet + rel noopener). */
  external?: boolean;
  className?: string;
};

/**
 * Bouton d'appel à l'action réutilisable. Rendu en `<Link>` (ancres internes
 * et navigation) ou `<a>` externe.
 */
export default function CtaButton({
  children,
  href,
  variant = "magenta",
  external = false,
  className = "",
}: CtaButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full " +
    "px-8 py-[17px] text-[17px] font-semibold leading-none " +
    "transition-[transform,box-shadow,background-color,border-color] duration-200 " +
    "cursor-pointer whitespace-nowrap";
  const classes = `${base} ${VARIANTS[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
