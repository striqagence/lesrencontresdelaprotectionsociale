import Image from "next/image";
import { event, cta } from "@/content/event";
import CtaButton from "@/components/ui/CtaButton";

/** Bandeau d'appel à l'action pleine largeur (dégradé de marque). */
export default function CtaBanner() {
  return (
    <section className="px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,48px)]">
      <div
        className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[24px]
                   px-[clamp(24px,5vw,56px)] py-[clamp(44px,6vw,72px)] text-center"
        style={{
          background:
            "linear-gradient(110deg, #C02A87 0%, #8E2F86 50%, #273582 100%)",
          boxShadow: "0 30px 70px -36px rgba(39,53,130,0.6)",
        }}
      >
        {/* Décor */}
        <span
          aria-hidden="true"
          className="animate-floaty-slow pointer-events-none absolute -right-16 -top-16 h-[240px] w-[240px] rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <span
          aria-hidden="true"
          className="animate-floaty-fast pointer-events-none absolute -bottom-16 -left-16 h-[260px] w-[260px] rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Logo en haut à gauche */}
        <div
          className="absolute left-[clamp(20px,3vw,32px)] top-[clamp(20px,3vw,30px)] hidden rounded-[14px] bg-white px-5 py-3 md:block"
          style={{ boxShadow: "0 8px 22px -10px rgba(0,0,0,0.35)" }}
        >
          <Image
            src="/brand/logo-rencontres.png"
            alt=""
            width={721}
            height={662}
            aria-hidden="true"
            style={{ height: 84, width: "auto" }}
          />
        </div>

        {/* Contenu */}
        <div className="relative">
          <h2 className="text-[clamp(30px,4.2vw,48px)] font-semibold leading-[1.15] text-white">
            Prêts à rejoindre
            <br />
            le Forum de la Protection Sociale ?
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-[clamp(15px,1.3vw,17px)] leading-[1.6] text-white/85">
            Réservez votre place pour le{" "}
            <strong className="font-bold text-white">1ᵉʳ octobre 2026</strong> et
            rejoignez les acteurs qui font avancer les entreprises du territoire.
          </p>
          <div className="mt-[clamp(28px,3.5vw,38px)] flex flex-wrap items-center justify-center gap-[14px]">
            <CtaButton href={event.links.tickets} variant="white" external>
              {cta.reserveArrow}
            </CtaButton>
            <CtaButton href="#programme" variant="outline">
              {cta.programme}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
