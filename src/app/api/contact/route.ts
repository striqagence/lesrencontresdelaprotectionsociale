import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Réception du formulaire de contact → envoi d'e-mail via Resend.
 *
 * Variables d'environnement :
 *  - RESEND_API_KEY   (requis en prod) : clé API Resend
 *  - CONTACT_TO       (optionnel)      : destinataire (défaut ci-dessous)
 *  - CONTACT_FROM     (optionnel)      : expéditeur, sur un domaine vérifié
 *                                        chez Resend (défaut ci-dessous)
 *
 * Si RESEND_API_KEY est absent (ex. environnement de dev sans clé), la route
 * ne casse pas : elle valide, trace la demande et répond OK.
 */

const TO = process.env.CONTACT_TO ?? "contact@alsaceprotectionsociale.fr";
const FROM =
  process.env.CONTACT_FROM ??
  "Forum de la Protection Sociale <noreply@rencontres-ps.fr>";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const organisation = String(body.organisation ?? "").trim();
  const honeypot = String(body.company_website ?? "").trim();

  // Honeypot : un bot remplit le champ caché → on fait semblant d'accepter.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  // Validation minimale côté serveur.
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Pas de clé (dev) : on trace et on répond OK sans envoyer.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY absent — e-mail non envoyé. Demande :",
      { name, email, organisation },
    );
    return NextResponse.json({ ok: true });
  }

  const textBody =
    `Nouveau message depuis le site du Forum de la Protection Sociale.\n\n` +
    `Nom : ${name}\n` +
    `E-mail : ${email}\n` +
    (organisation ? `Structure : ${organisation}\n` : "") +
    `\nMessage :\n${message}\n`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Contact site — ${name}`,
      text: textBody,
    });

    if (error) {
      console.error("[contact] échec d'envoi Resend :", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] exception Resend :", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
