"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Calendar, Check } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { event } from "@/content/event";

type Status = "idle" | "submitting" | "sent" | "error";

const fieldClass =
  "text-[17px] text-brand p-[13px_15px] rounded-[10px] bg-cream outline-none " +
  "border border-[rgba(39,53,130,0.18)] transition-colors " +
  "focus:border-magenta focus:bg-white";

const labelClass =
  "flex flex-col gap-[7px] text-[15px] font-semibold tracking-[0.04em] text-brand";

/** Section Contact — coordonnées + formulaire (avec écran de confirmation). */
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="px-[clamp(20px,5vw,64px)] py-[clamp(64px,8vw,112px)]"
    >
      <div
        className="mx-auto flex max-w-[1100px] flex-wrap overflow-hidden rounded-[24px] bg-white"
        style={{
          border: "1px solid rgba(39,53,130,0.08)",
          boxShadow: "0 30px 70px -40px rgba(39,53,130,0.5)",
        }}
      >
        {/* Panneau gauche */}
        <div
          className="min-w-[280px] flex-1 p-[clamp(36px,4vw,52px)] text-white"
          style={{ background: "linear-gradient(160deg, #273582, #1B2160)" }}
        >
          <Eyebrow color="var(--color-turquoise-light)" size={14.5}>
            Contact
          </Eyebrow>
          <h2 className="mb-[18px] mt-3 text-[clamp(28px,3.2vw,34px)] font-semibold leading-[1.25]">
            Une question sur le Forum ?
          </h2>
          <p className="mb-8 text-[18px] leading-[1.63] text-lavender">
            Notre équipe vous répond sur l&apos;événement, les inscriptions ou le
            partenariat. Écrivez-nous, nous revenons vers vous rapidement.
          </p>

          <ul className="flex flex-col gap-4">
            <ContactRow icon={Mail}>
              <a
                href={`mailto:${event.email}`}
                className="hover:underline underline-offset-2"
              >
                {event.email}
              </a>
            </ContactRow>
            <ContactRow icon={MapPin}>{event.venueFull}</ContactRow>
            <ContactRow icon={Calendar}>{event.dateLabel}</ContactRow>
          </ul>
        </div>

        {/* Panneau droit : formulaire ou confirmation */}
        <div className="min-w-[300px] flex-[1.2] p-[clamp(36px,4vw,52px)]">
          {status === "sent" ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <span
                className="mb-5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-full"
                style={{ background: "rgba(0,163,191,0.12)" }}
              >
                <Check size={30} color="#00a3bf" strokeWidth={2} aria-hidden="true" />
              </span>
              <h3 className="text-[26px] font-medium text-brand">
                Message envoyé, merci !
              </h3>
              <p className="mt-2 text-[18px] leading-[1.6] text-body">
                Nous avons bien reçu votre demande et reviendrons vers vous au
                plus vite.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]" noValidate>
              {/* Honeypot anti-spam (masqué des humains) */}
              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label>
                  Ne pas remplir
                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className={`${labelClass} min-w-[160px] flex-1`}>
                  Nom &amp; prénom
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Votre nom"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </label>
                <label className={`${labelClass} min-w-[160px] flex-1`}>
                  E-mail
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="vous@exemple.fr"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className={labelClass}>
                <span>
                  Structure / organisation{" "}
                  <span className="font-normal text-muted">(facultatif)</span>
                </span>
                <input
                  type="text"
                  name="organisation"
                  placeholder="Cabinet, institution, entreprise…"
                  autoComplete="organization"
                  className={fieldClass}
                />
              </label>

              <label className={labelClass}>
                Votre message
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Votre question ou votre demande…"
                  className={`${fieldClass} resize-y`}
                />
              </label>

              {status === "error" && (
                <p role="alert" className="text-[15px] text-magenta">
                  Une erreur est survenue. Merci de réessayer ou de nous écrire à{" "}
                  <a href={`mailto:${event.email}`} className="underline">
                    {event.email}
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 self-start rounded-full bg-magenta px-[30px] py-[15px]
                           text-[18px] font-semibold text-white shadow-[0_10px_26px_rgba(193,42,135,0.3)]
                           transition-[transform,box-shadow] duration-200
                           hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(193,42,135,0.42)]
                           disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Envoi en cours…" : "Envoyer mon message →"}
              </button>

              <p className="text-[14.5px] leading-[1.5] text-muted">
                En envoyant ce formulaire, vous acceptez d&apos;être recontacté au
                sujet de votre demande.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-[14px]">
      <span
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <Icon size={22} color="#9fe3ec" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="text-[18px] font-medium text-white">{children}</span>
    </li>
  );
}
