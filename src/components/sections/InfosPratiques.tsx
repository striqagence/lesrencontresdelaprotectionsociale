import Image from "next/image";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Diamond from "@/components/ui/Diamond";
import { Calendar, MapPin } from "lucide-react";
import { accentHex, accentRgba, type AccentKey } from "@/lib/accents";
import { event } from "@/content/event";

function InfoCard({
  accent,
  icon: Icon,
  label,
  title,
  children,
}: {
  accent: AccentKey;
  icon: typeof Calendar;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="lift-card flex items-start gap-5 rounded-[18px] bg-white p-[28px_30px]"
      style={
        {
          border: "1px solid rgba(39,53,130,0.08)",
          "--lift": "-4px",
          "--card-shadow": "0 18px 40px -30px rgba(39,53,130,0.4)",
          "--card-shadow-hover": "0 24px 48px -28px rgba(39,53,130,0.5)",
        } as React.CSSProperties
      }
    >
      <span
        className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px]"
        style={{ background: accentRgba(accent, 0.1) }}
      >
        <Icon size={28} color={accentHex(accent)} strokeWidth={1.7} aria-hidden="true" />
      </span>
      <div>
        <p
          className="mb-2 text-[12px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: accentHex(accent) }}
        >
          {label}
        </p>
        <p className="mb-[10px] text-[21px] font-medium leading-[1.4] text-brand">
          {title}
        </p>
        <ul className="flex flex-col gap-[6px]">{children}</ul>
      </div>
    </div>
  );
}

function Detail({
  accent,
  children,
}: {
  accent: AccentKey;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-[10px] text-[17.5px] leading-[1.5] text-body">
      <Diamond
        size={6}
        color={accentHex(accent)}
        style={{ marginTop: "0.5em" }}
      />
      <span>{children}</span>
    </li>
  );
}

/** Section Infos pratiques — date/horaires, lieu/accès et photo du lieu. */
export default function InfosPratiques() {
  return (
    <section
      id="infos"
      className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* En-tête */}
        <div className="mb-12">
          <Eyebrow color="var(--color-magenta)" size={14.5}>
            Infos pratiques
          </Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.4vw,34px)] font-semibold leading-[1.31] text-brand">
            Tout ce qu&apos;il faut savoir
          </h2>
        </div>

        <div className="flex flex-wrap items-stretch gap-6">
          {/* Colonne gauche : 2 cartes */}
          <div className="flex min-w-[280px] flex-1 flex-col gap-6">
            <Reveal y={26}>
              <InfoCard
                accent="turquoise"
                icon={Calendar}
                label="Date & horaires"
                title={event.dateLabel}
              >
                <Detail accent="turquoise">De 8h30 à 18h00</Detail>
                <Detail accent="turquoise">Accueil à partir de 8h00</Detail>
              </InfoCard>
            </Reveal>

            <Reveal y={26} delay={90}>
              <InfoCard
                accent="violet"
                icon={MapPin}
                label="Lieu & accès"
                title={event.venue}
              >
                <Detail accent="violet">{event.city}</Detail>
                <Detail accent="violet">Stationnement à proximité</Detail>
                <Detail accent="violet">
                  Parking Broglie —{" "}
                  <strong className="font-semibold text-brand">
                    à réserver à l&apos;avance
                  </strong>{" "}
                  ·{" "}
                  <a
                    href={event.links.parking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-magenta underline-offset-2 hover:underline"
                  >
                    réserver ma place
                  </a>
                </Detail>
              </InfoCard>
            </Reveal>
          </div>

          {/* Colonne droite : photo */}
          <div className="min-w-[300px] flex-[1.3]">
            <div
              className="relative h-full min-h-[340px] w-full overflow-hidden rounded-[18px]"
              style={{
                boxShadow: "0 18px 40px -30px rgba(39,53,130,0.5)",
                border: "1px solid rgba(39,53,130,0.08)",
              }}
            >
              <Image
                src="/images/villa-quai-sturm.jpeg"
                alt="La Villa Quai Sturm à Strasbourg"
                fill
                sizes="(max-width: 640px) 100vw, 55vw"
                className="object-cover"
              />
              <span
                className="absolute bottom-4 left-4 rounded-full px-4 py-[9px] text-[14px] font-semibold text-white"
                style={{
                  background: "rgba(39,53,130,0.92)",
                  backdropFilter: "blur(4px)",
                }}
              >
                Villa Quai Sturm, Strasbourg
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
