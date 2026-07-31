"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { event, cta, navLinks } from "@/content/event";
import LinkedInIcon from "@/components/ui/LinkedInIcon";

/**
 * Header sticky avec réduction (« shrink ») au scroll et menu burger sous
 * 1024px. La détection du shrink se fait via IntersectionObserver sur un
 * sentinel de 80px en haut du document (n'affecte pas le flux).
 */
export default function Header() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  // Shrink au scroll
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

  // Menu mobile : fermeture au clavier (Échap) et si on repasse en desktop
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

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
        className="sticky top-0 z-50 flex items-center justify-between gap-6 bg-white
                   px-[clamp(20px,5vw,56px)]"
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
            className="max-[1024px]:!h-[72px] max-[600px]:!h-[58px]"
          />
        </Link>

        {/* Navigation — desktop (≥1024px) */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative pb-[3px] text-[15px] font-semibold uppercase tracking-[0.09em]
                         text-brand transition-colors duration-150 hover:text-magenta
                         after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full
                         after:origin-left after:scale-x-0 after:bg-magenta
                         after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions — desktop (≥1024px) */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={event.links.tickets}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-shine inline-flex items-center rounded-full bg-magenta px-6 py-3 text-[15px]
                       font-bold uppercase tracking-[0.06em] leading-none text-white
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

        {/* Bouton burger — mobile (<1024px) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-brand
                     transition-colors hover:bg-cream lg:hidden"
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>

        {/* Panneau du menu mobile */}
        {open && (
          <div
            id="mobile-menu"
            className="menu-in absolute left-0 right-0 top-full bg-white lg:hidden"
            style={{
              borderTop: "1px solid rgba(39,53,130,0.08)",
              boxShadow: "0 18px 40px -16px rgba(39,53,130,0.25)",
            }}
          >
            <nav
              aria-label="Navigation principale"
              className="flex flex-col px-[clamp(20px,5vw,56px)]"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="border-b border-[rgba(39,53,130,0.07)] py-4 text-[16px] font-semibold
                             uppercase tracking-[0.08em] text-brand transition-colors hover:text-magenta"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 px-[clamp(20px,5vw,56px)] pb-5 pt-4">
              <a
                href={event.links.tickets}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-magenta px-6 py-3
                           text-[15px] font-bold uppercase tracking-[0.06em] leading-none text-white
                           shadow-[0_6px_18px_rgba(193,42,135,0.28)]"
              >
                {cta.register}
              </a>
              <a
                href={event.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de l'événement"
                className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[10px]
                           bg-brand text-white"
              >
                <LinkedInIcon size={19} />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
