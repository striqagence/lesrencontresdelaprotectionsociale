"use client";

import { useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import { faq } from "@/content/faq";

/** Section FAQ — accordéon, un seul panneau ouvert à la fois. */
export default function Faq() {
  const [open, setOpen] = useState(-1);

  return (
    <section
      id="faq"
      className="bg-white px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
      style={{ borderTop: "1px solid rgba(39,53,130,0.08)" }}
    >
      <div className="mx-auto max-w-[840px]">
        {/* En-tête */}
        <div className="mb-12 text-center">
          <Eyebrow color="var(--color-turquoise)" size={14.5}>
            Questions fréquentes
          </Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.4vw,34px)] font-semibold text-brand">
            Vous vous demandez…
          </h2>
        </div>

        {/* Accordéon */}
        <div className="flex flex-col gap-[14px]">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[14px] bg-cream"
                style={{ border: "1px solid rgba(39,53,130,0.12)" }}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-[18px] p-[20px_24px] text-left"
                  >
                    <span className="text-[18px] font-semibold text-brand">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[24px] leading-none text-magenta transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="p-[0_24px_22px] text-[18px] leading-[1.63] text-body"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
