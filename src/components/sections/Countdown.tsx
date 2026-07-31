"use client";

import { useEffect, useState } from "react";
import { event } from "@/content/event";

type TimeLeft = { days: string; hours: string; mins: string; secs: string };

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function computeTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    days: pad(Math.floor(totalSec / 86400)),
    hours: pad(Math.floor((totalSec % 86400) / 3600)),
    mins: pad(Math.floor((totalSec % 3600) / 60)),
    secs: pad(totalSec % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "mins", label: "Minutes" },
  { key: "secs", label: "Secondes" },
];

/** Compte à rebours live vers l'ouverture de la 1ʳᵉ édition. */
export default function Countdown() {
  const target = new Date(event.dateISO).getTime();
  // Valeur initiale nulle côté serveur/hydratation pour éviter tout mismatch,
  // puis on démarre le décompte au montage.
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(computeTimeLeft(target));
    const id = setInterval(() => setTime(computeTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section
      className="px-[clamp(20px,5vw,64px)] py-[clamp(44px,5vw,64px)]"
      style={{
        background:
          "linear-gradient(120deg, #273582 0%, #4A3C86 60%, #6E3C84 100%)",
      }}
    >
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-10">
        {/* Bloc gauche */}
        <div>
          <p className="text-[14.5px] font-semibold tracking-[0.2em] text-turquoise-light">
            J – 1ᵉʳ OCTOBRE 2026
          </p>
          <h2 className="mt-2 max-w-[16ch] text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1.2] text-white">
            La première édition ouvre dans
          </h2>
        </div>

        {/* Bloc droite : 4 cartes */}
        <div className="flex gap-[clamp(10px,1.4vw,20px)]" aria-live="polite">
          {UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="min-w-[84px] rounded-[14px] border border-white/[0.14] px-[clamp(14px,1.6vw,26px)] py-[18px] text-center"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="overflow-hidden text-[clamp(36px,4vw,54px)] font-light leading-none tabular-nums"
                style={{ color: key === "secs" ? "#c02a87" : "#ffffff" }}
              >
                <span key={time ? time[key] : "--"} className="cd-tick">
                  {time ? time[key] : "--"}
                </span>
              </div>
              <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-lavender">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
