import Image from "next/image";
import { event, cta } from "@/content/event";
import CtaButton from "@/components/ui/CtaButton";
import Diamond from "@/components/ui/Diamond";

/** Hero — fond dégradé, badge, titre sur 3 lignes, bannière officielle, CTA. */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden
                 px-[clamp(20px,5vw,64px)] pb-[clamp(40px,5vw,72px)] pt-[clamp(56px,8vw,104px)]"
      style={{
        background:
          "linear-gradient(135deg, #C02A87 0%, #8E2F86 50%, #273582 100%)",
      }}
    >
      {/* Décor : cercles flous flottants */}
      <span
        aria-hidden="true"
        className="animate-floaty-slow pointer-events-none absolute -left-24 -top-16 h-[300px] w-[300px]
                   rounded-full blur-[8px]"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <span
        aria-hidden="true"
        className="animate-floaty-fast pointer-events-none absolute -bottom-20 -right-20 h-[320px] w-[320px]
                   rounded-full blur-[8px]"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      <div className="relative mx-auto flex max-w-[1180px] flex-col items-center text-center">
        {/* Badge de titre */}
        <div
          className="mb-[26px] inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-[14px]"
          style={{
            background: "#273582",
            boxShadow: "0 8px 22px -8px rgba(0,0,0,0.4)",
          }}
        >
          <Diamond size={10} color="#00a3bf" />
          <span className="text-[clamp(15px,1.9vw,21px)] font-bold tracking-[0.14em] text-white">
            LES RENCONTRES DE LA PROTECTION SOCIALE · 1ʳᵉ ÉDITION · 1ᵉʳ OCTOBRE
            2026 · STRASBOURG
          </span>
        </div>

        {/* Titre principal — 3 lignes forcées */}
        <h1 className="text-[clamp(40px,7vw,72px)] font-semibold leading-[1.08] tracking-[-0.01em] text-white">
          Le rendez-vous alsacien
          <br />
          de la protection sociale
          <br />
          et de la retraite
        </h1>

        {/* Accroche */}
        <p className="mt-[22px] max-w-[60ch] text-[clamp(17px,1.45vw,20px)] font-semibold leading-[1.55] text-white/[0.92]">
          Une journée pour rencontrer les bons interlocuteurs et faire avancer
          vos sujets de protection sociale, de retraite et de prévoyance.
        </p>

        {/* Bannière officielle */}
        <div
          className="mt-[clamp(34px,4vw,48px)] w-full overflow-hidden rounded-[18px] border border-white/15"
          style={{ boxShadow: "0 30px 70px -28px rgba(0,0,0,0.45)" }}
        >
          <Image
            src="/images/banniere-rencontres.png"
            alt="Forum de la Protection Sociale — 1ᵉʳ octobre 2026, Villa Quai Sturm, Strasbourg"
            width={1496}
            height={565}
            priority
            sizes="(max-width: 1240px) 100vw, 1180px"
            className="block h-auto w-full"
          />
        </div>

        {/* Boutons */}
        <div className="mt-[clamp(34px,4vw,44px)] flex flex-wrap items-center justify-center gap-[14px]">
          <CtaButton href={event.links.tickets} variant="white" external>
            {cta.reserveArrow}
          </CtaButton>
          <CtaButton href="#programme" variant="outline">
            {cta.programme}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
