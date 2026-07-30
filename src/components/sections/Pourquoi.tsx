import Image from "next/image";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { ICONS } from "@/lib/icons";
import { accentHex, accentRgba } from "@/lib/accents";
import { pillars, reasons } from "@/content/sections";

/** Section « Pourquoi participer » — piliers, 4 raisons et photo. */
export default function Pourquoi() {
  return (
    <section
      id="pourquoi"
      className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        {/* En-tête */}
        <div className="mx-auto mb-14 max-w-[62ch] text-center">
          <Eyebrow color="var(--color-magenta)">Pourquoi participer</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,3.8vw,40px)] font-semibold leading-[1.25] text-brand">
            Un lieu de rencontres, d&apos;échanges et d&apos;opportunités
          </h2>
          <p className="mt-5 text-[21px] leading-[1.6] text-body">
            Réunir, le temps d&apos;une journée, l&apos;ensemble des{" "}
            <strong className="font-bold text-brand">
              acteurs qui accompagnent les entreprises sur la protection sociale
              et la retraite
            </strong>{" "}
            pour favoriser les rapprochements, les échanges techniques et la
            création de valeur.
          </p>
        </div>

        {/* 3 cartes piliers */}
        <div className="flex flex-wrap gap-6">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[pillar.icon];
            const hex = accentHex(pillar.accent);
            return (
              <Reveal
                key={pillar.num}
                y={34}
                scale={0.97}
                delay={Math.min(i, 6) * 130}
                className="lift-card min-w-[280px] flex-1 rounded-[20px] p-[36px_32px]"
                style={
                  {
                    background: `linear-gradient(160deg, ${accentRgba(pillar.accent, 0.13)} 0%, ${accentRgba(pillar.accent, 0.03)} 38%, #fff 75%)`,
                    border: `1px solid ${accentRgba(pillar.accent, 0.22)}`,
                    "--card-shadow": `0 18px 40px -28px ${accentRgba(pillar.accent, 0.4)}`,
                    "--card-shadow-hover": `0 28px 54px -26px ${accentRgba(pillar.accent, 0.55)}`,
                  } as React.CSSProperties
                }
              >
                <div className="mb-[22px] flex items-center justify-between">
                  <span
                    className="text-[48px] font-light leading-none"
                    style={{ color: hex }}
                  >
                    {pillar.num}
                  </span>
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-[14px]"
                    style={{
                      background: hex,
                      boxShadow: `0 8px 20px -6px ${accentRgba(pillar.accent, 0.55)}`,
                    }}
                  >
                    <Icon size={30} color="#fff" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mb-[10px] text-[21px] font-semibold uppercase leading-[1.4] tracking-[0.04em] text-brand">
                  {pillar.title}
                </h3>
                <p className="text-[18px] leading-[1.63] text-body">{pillar.text}</p>
              </Reveal>
            );
          })}
        </div>

        {/* Bloc « 4 raisons » */}
        <div className="mt-[72px] flex flex-wrap items-center gap-10">
          {/* Colonne gauche */}
          <div className="min-w-[320px] flex-[1.05]">
            <Eyebrow color="var(--color-violet)">
              Le Forum, c&apos;est avant tout…
            </Eyebrow>
            <h3 className="mb-[30px] mt-3 text-[clamp(28px,3vw,36px)] font-semibold leading-[1.3] text-brand">
              4 raisons d&apos;être au rendez-vous
            </h3>

            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              {reasons.map((reason, i) => {
                const Icon = ICONS[reason.icon];
                return (
                  <Reveal
                    key={reason.title}
                    y={26}
                    delay={Math.min(i, 6) * 90}
                    className="lift-card rounded-[18px] bg-white p-[30px]"
                    style={
                      {
                        border: "1px solid rgba(39,53,130,0.08)",
                        "--lift": "-4px",
                        "--card-shadow": "0 14px 34px -28px rgba(39,53,130,0.45)",
                        "--card-shadow-hover": `0 20px 42px -26px ${accentRgba(reason.accent, 0.5)}`,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className="mb-[18px] inline-flex h-14 w-14 items-center justify-center rounded-[14px]"
                      style={{ background: accentRgba(reason.accent, 0.1) }}
                    >
                      <Icon
                        size={28}
                        color={accentHex(reason.accent)}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                    <h4 className="mb-[7px] text-[22px] font-semibold text-brand">
                      {reason.title}
                    </h4>
                    <p className="text-[18px] leading-[1.55] text-body">
                      {reason.desc}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Colonne droite : photo */}
          <div className="min-w-[300px] flex-1 self-stretch">
            <div
              className="relative h-full min-h-[420px] w-full overflow-hidden rounded-[20px]"
              style={{
                boxShadow: "0 22px 50px -30px rgba(39,53,130,0.55)",
                border: "1px solid rgba(39,53,130,0.08)",
              }}
            >
              <Image
                src="/images/seminaire-villa-sturm.jpg"
                alt="Séminaire dans la salle de réception de la Villa Quai Sturm"
                fill
                sizes="(max-width: 640px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
