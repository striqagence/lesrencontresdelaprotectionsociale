import Eyebrow from "@/components/ui/Eyebrow";
import { event } from "@/content/event";

/** Section « Retour en images sur la journée » — vidéo de la 1ʳᵉ édition. */
export default function Retour() {
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Retour en images — Les Rencontres de la Protection Sociale 2026",
    description:
      "Retour en images sur la 1ʳᵉ édition des Rencontres de la Protection Sociale, le 1ᵉʳ octobre 2026 à la Villa Quai Sturm, Strasbourg.",
    thumbnailUrl: [`https://${event.domain}${event.recap.poster}`],
    uploadDate: "2026-10-19",
    duration: event.recap.durationISO,
    contentUrl: event.recap.videoUrl,
  };

  return (
    <section
      id="retour"
      className="bg-cream px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <div className="mx-auto max-w-[980px] text-center">
        <Eyebrow color="var(--color-magenta)">
          1ʳᵉ édition · 1ᵉʳ octobre 2026
        </Eyebrow>
        <h2 className="mt-3 text-[clamp(30px,3.8vw,40px)] font-semibold leading-[1.25] text-brand">
          Retour en images sur la journée
        </h2>
        <p className="mx-auto mt-5 max-w-[62ch] text-[21px] leading-[1.6] text-body">
          Revivez les temps forts des Rencontres de la Protection Sociale —
          échanges, interviews et moments clés de cette première édition à la
          Villa Quai Sturm.
        </p>

        <div
          className="mt-10 overflow-hidden rounded-[20px] bg-black"
          style={{
            border: "1px solid rgba(39,53,130,0.08)",
            boxShadow: "0 30px 70px -36px rgba(39,53,130,0.6)",
          }}
        >
          <video
            controls
            preload="metadata"
            playsInline
            poster={event.recap.poster}
            className="block aspect-video w-full"
          >
            <source src={event.recap.videoUrl} type="video/mp4" />
            Votre navigateur ne permet pas de lire cette vidéo.
          </video>
        </div>
      </div>
    </section>
  );
}
