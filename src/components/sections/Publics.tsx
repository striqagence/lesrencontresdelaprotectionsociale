import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { ICONS } from "@/lib/icons";
import { accentHex, accentRgba, type AccentKey } from "@/lib/accents";
import { audiences } from "@/content/sections";

/** Couleur de texte des tags selon l'accent. */
const TAG_TEXT: Record<Extract<AccentKey, "turquoise" | "violet">, string> = {
  turquoise: "#0e7a8c",
  violet: "#5a3d73",
};

/** Section « À qui s'adresse le Forum » — 2 publics cibles. */
export default function Publics() {
  return (
    <section
      id="publics"
      className="bg-white px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
      style={{
        borderTop: "1px solid rgba(39,53,130,0.08)",
        borderBottom: "1px solid rgba(39,53,130,0.08)",
      }}
    >
      <div className="mx-auto max-w-[1180px]">
        {/* En-tête */}
        <div className="mb-14 text-center">
          <Eyebrow color="var(--color-violet)">
            À qui s&apos;adresse le Forum ?
          </Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,4.2vw,46px)] font-semibold leading-[1.15] text-brand">
            Un rendez-vous pensé pour tout
            <br />
            l&apos;écosystème de la protection sociale
          </h2>
          <p className="mx-auto mt-5 max-w-[62ch] text-[21px] leading-[1.6] text-body">
            Si vous accompagnez les entreprises sur la protection sociale ou la
            retraite, ce Forum est fait pour vous.
          </p>
        </div>

        {/* 2 cartes */}
        <div className="flex flex-wrap gap-6">
          {audiences.map((audience, i) => {
            const Icon = ICONS[audience.icon];
            const hex = accentHex(audience.accent);
            return (
              <Reveal
                key={audience.title}
                y={26}
                delay={Math.min(i, 6) * 90}
                className="min-w-[280px] flex-1 rounded-[20px] p-[34px_30px]"
                style={{
                  background: accentRgba(audience.accent, 0.05),
                  border: `1px solid ${accentRgba(audience.accent, 0.18)}`,
                }}
              >
                <span
                  className="mb-5 inline-flex h-[50px] w-[50px] items-center justify-center rounded-[14px]"
                  style={{ background: accentRgba(audience.accent, 0.12) }}
                >
                  <Icon size={26} color={hex} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="mb-4 text-[21px] font-semibold uppercase tracking-[0.02em] text-brand">
                  {audience.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {audience.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-[13px] py-[7px] text-[16px] font-medium"
                      style={{
                        color: TAG_TEXT[audience.accent],
                        background: accentRgba(audience.accent, 0.1),
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
