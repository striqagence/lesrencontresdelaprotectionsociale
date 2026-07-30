import { NextResponse } from "next/server";

/**
 * Réception du formulaire de contact.
 *
 * ⚠️ À COMPLÉTER AVANT MISE EN LIGNE :
 * pour l'instant, cette route valide les données et applique un honeypot
 * anti-spam, mais N'ENVOIE PAS encore d'e-mail. Brancher un fournisseur
 * (Resend / SendGrid / Postmark) là où c'est indiqué ci-dessous, avec la clé
 * API en variable d'environnement.
 */
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

  // TODO(envoi) : envoyer l'e-mail via le fournisseur choisi, ex. :
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Site <site@rencontres-ps.fr>",
  //     to: "contact@alsaceprotectionsociale.fr",
  //     replyTo: email,
  //     subject: `Nouveau message de ${name}`,
  //     text: `${message}\n\n— ${name} (${email})${organisation ? ` · ${organisation}` : ""}`,
  //   });
  //
  // En attendant, on trace la demande côté serveur.
  console.info("[contact] nouvelle demande", { name, email, organisation });

  return NextResponse.json({ ok: true });
}
