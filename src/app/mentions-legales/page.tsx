import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Diamond from "@/components/ui/Diamond";
import { event } from "@/content/event";
import type { AccentKey } from "@/lib/accents";
import { accentHex } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site du Forum de la Protection Sociale (conformité LCEN).",
  robots: { index: false, follow: true },
};

/** Champ à compléter avant mise en ligne (signalé en italique gris). */
function Todo({ children }: { children: React.ReactNode }) {
  return <span className="italic text-muted">{children}</span>;
}

function Block({
  accent,
  title,
  children,
}: {
  accent: AccentKey;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 flex items-center gap-3 text-[clamp(22px,2.6vw,28px)] font-semibold text-brand">
        <Diamond size={12} color={accentHex(accent)} />
        {title}
      </h2>
      <div className="space-y-3 text-[17px] leading-[1.7] text-body">{children}</div>
    </section>
  );
}

/** Ordre d'accent des losanges, en alternance. */
const cycle: AccentKey[] = ["turquoise", "violet", "magenta"];
const at = (i: number) => cycle[i % cycle.length];

export default function MentionsLegales() {
  return (
    <>
      {/* Header simplifié */}
      <header
        className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-white px-[clamp(20px,5vw,56px)] py-[10px]"
        style={{
          boxShadow: "0 2px 18px -6px rgba(39,53,130,0.18)",
          borderBottom: "1px solid rgba(39,53,130,0.06)",
        }}
      >
        <Link href="/" aria-label={`${event.name} — accueil`}>
          <Image
            src="/brand/logo-rencontres.png"
            alt={event.name}
            width={721}
            height={662}
            priority
            style={{ height: 78, width: "auto" }}
          />
        </Link>
        <Link
          href="/"
          className="border-b-2 border-transparent pb-[3px] text-[14px] font-semibold uppercase tracking-[0.06em]
                     text-brand transition-colors hover:border-magenta hover:text-magenta"
        >
          ← Retour au site
        </Link>
      </header>

      {/* Hero */}
      <section
        className="px-[clamp(20px,5vw,64px)] py-[clamp(48px,7vw,88px)]"
        style={{
          background:
            "linear-gradient(135deg, #C02A87 0%, #8E2F86 50%, #273582 100%)",
        }}
      >
        <div className="mx-auto max-w-[900px]">
          <p className="text-[16px] font-semibold uppercase tracking-[0.2em] text-turquoise-light">
            Forum de la Protection Sociale
          </p>
          <h1 className="mt-3 text-[clamp(34px,5vw,56px)] font-semibold text-white">
            Mentions légales
          </h1>
          <p className="mt-4 max-w-[70ch] text-[18px] leading-[1.6] text-white/85">
            Informations légales relatives à l&apos;éditeur et à l&apos;hébergeur
            de ce site, conformément aux articles 6-III et 19 de la loi n°2004-575
            du 21 juin 2004 pour la confiance dans l&apos;économie numérique
            (LCEN).
          </p>
        </div>
      </section>

      {/* Corps */}
      <main className="mx-auto max-w-[900px] px-[clamp(20px,5vw,64px)] py-[clamp(48px,6vw,80px)]">
        <div className="flex flex-col gap-[clamp(32px,4vw,48px)]">
          <Block accent={at(0)} title="Éditeur du site">
            <p>
              Le site <strong className="text-brand">{event.domain}</strong> est
              édité par <strong className="text-brand">Alsace Protection
              Sociale</strong>.
            </p>
            <p>
              Siège&nbsp;: 6 rue du Printemps, 67150 Erstein.
              <br />
              SIRET&nbsp;: 529 306 805 00027.
            </p>
            <p>
              Directeur de la publication&nbsp;:{" "}
              <Todo>[nom à compléter]</Todo>.
            </p>
            <p>
              Contact&nbsp;:{" "}
              <a
                href={`mailto:${event.email}`}
                className="font-semibold text-magenta hover:underline"
              >
                {event.email}
              </a>
            </p>
          </Block>

          <Block accent={at(1)} title="Conception & réalisation">
            <p>
              Conception et développement du site&nbsp;:{" "}
              <a
                href={event.links.agency}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-magenta hover:underline"
              >
                StriQ
              </a>
              .
            </p>
          </Block>

          <Block accent={at(2)} title="Hébergement">
            <p>
              Le site est hébergé par <strong className="text-brand">Vercel
              Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis —{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-magenta hover:underline"
              >
                vercel.com
              </a>
              .
            </p>
          </Block>

          <Block accent={at(3)} title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus (textes, visuels, logos, charte
              graphique) présents sur ce site est protégé par le droit de la
              propriété intellectuelle. Toute reproduction ou représentation,
              totale ou partielle, sans autorisation préalable est interdite.
            </p>
          </Block>

          <Block accent={at(4)} title="Données personnelles (RGPD)">
            <p>
              Les données transmises via le formulaire de contact sont utilisées
              uniquement pour répondre à votre demande et ne sont ni cédées ni
              revendues. Conformément au RGPD, vous disposez d&apos;un droit
              d&apos;accès, de rectification et de suppression de vos données, en
              écrivant à{" "}
              <a
                href={`mailto:${event.email}`}
                className="font-semibold text-magenta hover:underline"
              >
                {event.email}
              </a>
              .
            </p>
          </Block>

          <Block accent={at(5)} title="Cookies">
            <p>
              Ce site limite l&apos;usage des cookies au strict nécessaire à son
              bon fonctionnement. Aucun cookie de suivi publicitaire n&apos;est
              déposé sans votre consentement.
            </p>
          </Block>

          <Block accent={at(6)} title="Responsabilité">
            <p>
              L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des
              informations diffusées, notamment le programme, présenté à titre
              prévisionnel et susceptible d&apos;évoluer. Sa responsabilité ne
              saurait être engagée en cas d&apos;erreur, d&apos;omission ou
              d&apos;indisponibilité temporaire du site.
            </p>
          </Block>
        </div>

        <div className="mt-[clamp(40px,5vw,56px)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-magenta px-8 py-4 text-[17px]
                       font-semibold text-white shadow-[0_10px_26px_rgba(193,42,135,0.3)]
                       transition-[transform,box-shadow] duration-200
                       hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(193,42,135,0.42)]"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </>
  );
}
