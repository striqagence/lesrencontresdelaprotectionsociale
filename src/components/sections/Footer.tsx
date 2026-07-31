import Image from "next/image";
import Link from "next/link";
import { event, cta, navLinks } from "@/content/event";
import { organizers } from "@/content/organizers";

/** Pied de page. */
export default function Footer() {
  return (
    <footer
      className="px-[clamp(20px,5vw,64px)] pb-10 pt-[clamp(56px,7vw,88px)] text-white"
      style={{ background: "linear-gradient(160deg, #273582, #1B2160)" }}
    >
      <div className="mx-auto max-w-[1180px]">
        {/* Rangée haute */}
        <div className="flex flex-wrap items-start justify-between gap-12">
          {/* Colonne marque */}
          <div className="max-w-[480px]">
            {/* Logo de l'événement */}
            <div className="inline-flex rounded-[14px] bg-white px-5 py-4">
              <Image
                src="/brand/logo-rencontres.png"
                alt={event.name}
                width={721}
                height={662}
                style={{ height: 84, width: "auto" }}
              />
            </div>

            {/* Organisateurs */}
            <div className="mt-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-turquoise-light">
                Organisé par
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {organizers.map((org) => (
                  <div
                    key={org.logo}
                    className="flex items-center rounded-[12px] bg-white px-3 py-2"
                  >
                    <Image
                      src={org.logo}
                      alt={org.name}
                      width={org.width}
                      height={org.height}
                      style={{ height: 34, width: "auto" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[18px] leading-[1.63] text-lavender">
              Le rendez-vous annuel des acteurs de la protection sociale, de la
              retraite et de la prévoyance, en Alsace.
            </p>
          </div>

          {/* Colonnes de liens */}
          <div className="flex flex-wrap gap-[clamp(36px,5vw,72px)]">
            <nav aria-label="L'événement">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-turquoise-light">
                L&apos;événement
              </p>
              <ul className="flex flex-col gap-3">
                {navLinks
                  .filter((l) => l.href !== "#publics")
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[17px] text-lavender-2 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            <div>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-turquoise-light">
                Contact
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${event.email}`}
                    className="text-[17px] text-lavender-2 hover:text-white"
                  >
                    {event.email}
                  </a>
                </li>
                <li>
                  <span className="text-[17px] font-semibold text-turquoise-light">
                    {event.domain}
                  </span>
                </li>
              </ul>
              <a
                href={event.links.tickets}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[22px] inline-flex items-center rounded-full bg-magenta px-6 py-[13px]
                           text-[15px] font-semibold text-white shadow-[0_8px_22px_rgba(193,42,135,0.4)]
                           transition-transform duration-200 hover:-translate-y-0.5"
              >
                {cta.reserveArrow}
              </a>
            </div>
          </div>
        </div>

        {/* Barre basse */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.14] pt-6 text-[15px] text-muted-3">
          <p>
            © 2026 Forum de la Protection Sociale · Strasbourg ·{" "}
            <Link
              href="/mentions-legales"
              className="font-semibold text-turquoise-light hover:underline"
            >
              Mentions légales
            </Link>
          </p>
          <p>
            Billetterie sécurisée via Weezevent · Site propulsé par{" "}
            <a
              href={event.links.agency}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-turquoise-light hover:underline"
            >
              StriQ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
