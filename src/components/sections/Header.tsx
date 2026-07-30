"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { event, cta, navLinks } from "@/content/event";
import LinkedInIcon from "@/components/ui/LinkedInIcon";

/**
 * Header sticky avec réduction (« shrink ») au scroll.
 * Détection via IntersectionObserver sur un sentinel de 80px en haut du
 * document (n'affecte pas le flux). État compact : logo et paddings réduits.
 */
export default function Header() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel de 80px ancré au haut du document (hors flux) */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1,
          height: 80,
          pointerEvents: "none",
        }}
      />

      <header
        className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-6 bg-white
                   px-[clamp(20px,5vw,56px)] max-[860px]:justify-center"
        style={{
          paddingTop: compact ? 3 : 10,
          paddingBottom: compact ? 3 : 10,
          boxShadow: compact
            ? "0 6px 24px -8px rgba(39,53,130,0.28)"
            : "0 2px 18px -6px rgba(39,53,130,0.18)",
          borderBottom: "1px solid rgba(39,53,130,0.06)",
          transition: "padding .25s ease, box-shadow .25s ease",
        }}
      >
        {/* Logo */}
        <Link href="#top" aria-label={`${event.name} — accueil`} className="shrink-0">
          <Image
            src="/brand/logo-rencontres.png"
            alt={event.name}
            width={721}
            height={662}
            priority
            style={{
              height: compact ? 56 : 96,
              width: "auto",
              transition: "height .25s ease",
            }}
            className="max-[860px]:!h-[78px] max-[600px]:!h-[62px]"
          />
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Navigation principale"
          className="flex flex-wrap items-center gap-6 max-[860px]:w-full max-[860px]:justify-center
                     max-[860px]:gap-3 max-[440px]:gap-[9px]"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b-2 border-transparent pb-[3px] text-[15px] font-semibold uppercase
                         tracking-[0.09em] text-brand transition-[color,border-color] duration-150
                         hover:border-magenta hover:text-magenta
                         max-[600px]:text-[16px] max-[440px]:text-[15px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions : CTA inscription + LinkedIn */}
        <div className="flex items-center gap-3">
          <a
            href={event.links.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-magenta px-6 py-3 text-[15px] font-bold
                       uppercase tracking-[0.06em] leading-none text-white
                       shadow-[0_6px_18px_rgba(193,42,135,0.28)]
                       transition-[transform,box-shadow] duration-200
                       hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(193,42,135,0.38)]"
          >
            {cta.register}
          </a>

          <a
            href={event.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de l'événement"
            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-brand
                       text-white transition-[transform,background-color] duration-200
                       hover:-translate-y-px hover:bg-turquoise"
          >
            <LinkedInIcon size={19} />
          </a>
        </div>
      </header>
    </>
  );
}
