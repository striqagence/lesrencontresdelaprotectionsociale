import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Diamond from "@/components/ui/Diamond";
import CtaButton from "@/components/ui/CtaButton";
import { event, cta } from "@/content/event";
import { program } from "@/content/program";

/** Section Programme — timeline verticale des 14 créneaux. */
export default function Programme() {
  return (
    <section
      id="programme"
      className="bg-white px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
      style={{
        borderTop: "1px solid rgba(39,53,130,0.08)",
        borderBottom: "1px solid rgba(39,53,130,0.08)",
      }}
    >
      <div className="mx-auto max-w-[980px]">
        {/* En-tête */}
        <div className="mb-14 text-center">
          <Eyebrow color="var(--color-turquoise)">Programme de la journée</Eyebrow>
          <h2 className="mt-3 text-[clamp(30px,3.8vw,40px)] font-semibold leading-[1.25] text-brand">
            Une journée rythmée par les rencontres
          </h2>
          <p className="mt-3 text-[19px] font-light italic text-muted-2">
            Programme prévisionnel, susceptible d&apos;évoluer.
          </p>
        </div>

        {/* Pastille de date */}
        <div className="mb-11 flex justify-center">
          <div
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3"
            style={{
              border: "1px solid rgba(39,53,130,0.12)",
              boxShadow: "0 10px 30px -22px rgba(39,53,130,0.5)",
            }}
          >
            <Diamond size={10} color="#c02a87" />
            <span className="text-[16px] font-semibold tracking-[0.04em] text-brand">
              {event.scheduleLabel}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <ol className="mx-auto max-w-[760px]">
          {program.map((slot, i) => {
            const isLast = i === program.length - 1;
            return (
              <Reveal
                key={`${slot.start}-${i}`}
                as="li"
                y={24}
                delay={Math.min(i, 6) * 70}
                className="relative flex items-stretch gap-[clamp(10px,2vw,20px)]"
                style={{ marginBottom: isLast ? 0 : 26 }}
              >
                {/* Colonne horaire */}
                <div className="w-[clamp(64px,9vw,92px)] shrink-0 pt-[2px] text-right">
                  <div className="text-[clamp(19px,2vw,23px)] font-bold leading-[1.1] text-magenta">
                    {slot.start}
                  </div>
                  {slot.range && (
                    <div className="mt-[3px] text-[12px] tracking-[0.02em] text-muted">
                      {slot.range}
                    </div>
                  )}
                </div>

                {/* Rail */}
                <div className="relative w-7 shrink-0">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="tl-line absolute left-[13px] top-[18px] w-[2px]"
                      style={{
                        bottom: -26,
                        background: "linear-gradient(180deg, #00A3BF, #735092)",
                      }}
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="tl-dot absolute left-1/2 top-[7px] z-[1] h-[14px] w-[14px] rounded-[2px] bg-white"
                    style={{ border: "3px solid #c02a87" }}
                  />
                </div>

                {/* Carte contenu */}
                <div
                  className="prog-card flex-1 cursor-pointer rounded-[14px] bg-white p-[16px_22px]"
                  style={{
                    border: "1px solid rgba(39,53,130,0.10)",
                    boxShadow: "0 12px 30px -26px rgba(39,53,130,0.55)",
                  }}
                >
                  {slot.speaker && (
                    <div className="mb-[7px] flex items-center gap-[10px]">
                      <Diamond size={7} color="#00a3bf" />
                      <span className="text-[14px] font-semibold uppercase tracking-[0.12em] text-turquoise">
                        {slot.speaker}
                      </span>
                    </div>
                  )}
                  <h3 className="text-[20px] font-semibold leading-[1.25] text-brand">
                    {slot.title}
                  </h3>
                  {slot.detail && (
                    <p className="mt-[5px] text-[17px] font-normal leading-[1.55] text-body">
                      {slot.detail}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <CtaButton
            href={event.links.tickets}
            variant="magenta"
            external
            className="!py-4 !text-[17px]"
          >
            Je réserve ma place →
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
