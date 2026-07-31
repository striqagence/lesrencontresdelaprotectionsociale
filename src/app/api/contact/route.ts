import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Réception du formulaire de contact → envoi d'un e-mail (HTML + texte) via
 * Resend, avec un template aux couleurs de la charte.
 *
 * Variables d'environnement :
 *  - RESEND_API_KEY (ou RESEND) : clé API Resend (requis en prod)
 *  - CONTACT_TO   (optionnel)   : destinataire (défaut ci-dessous)
 *  - CONTACT_FROM (optionnel)   : expéditeur, sur un domaine vérifié Resend
 *
 * Si la clé est absente (dev), la route ne casse pas : elle valide, trace la
 * demande et répond OK.
 */

const TO = process.env.CONTACT_TO ?? "contact@alsaceprotectionsociale.fr";
const FROM =
  process.env.CONTACT_FROM ??
  "Forum de la Protection Sociale <noreply@rencontres-ps.fr>";

/** Échappe les caractères HTML pour éviter toute injection dans l'e-mail. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactData = {
  name: string;
  email: string;
  organisation: string;
  message: string;
  dateLabel: string;
};

/** Template HTML de l'e-mail (table-based, compatible clients mail). */
function buildHtml({ name, email, organisation, message, dateLabel }: ContactData): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOrg = organisation ? escapeHtml(organisation) : "";
  // Retours à la ligne préservés + coupure des mots/URL très longs assurée
  // par les styles word-break/overflow-wrap sur la cellule.
  const safeMsg = escapeHtml(message).replace(/\r?\n/g, "<br>");

  const orgRow = safeOrg
    ? `<tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(39,53,130,0.08);font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8A8298;font-weight:600;vertical-align:top;">Structure</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(39,53,130,0.08);font-size:16px;color:#574F6E;vertical-align:top;word-break:break-word;overflow-wrap:break-word;">${safeOrg}</td>
      </tr>`
    : "";

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>Nouveau message</title>
<style>
  @media (max-width:620px){
    .container{ width:100% !important; }
    .px{ padding-left:22px !important; padding-right:22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;">
    <tr>
      <td align="center" style="padding:28px 14px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border:1px solid rgba(39,53,130,0.10);border-radius:16px;overflow:hidden;font-family:'Roboto Condensed',Arial,Helvetica,sans-serif;">
          <!-- En-tête -->
          <tr>
            <td class="px" style="background-color:#273582;background-image:linear-gradient(120deg,#C02A87 0%,#8E2F86 50%,#273582 100%);padding:26px 32px;">
              <p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9FE3EC;font-weight:600;">Formulaire de contact</p>
              <h1 style="margin:0;font-size:24px;line-height:1.25;color:#ffffff;font-weight:600;">Nouveau message reçu</h1>
            </td>
          </tr>
          <!-- Intro -->
          <tr>
            <td class="px" style="padding:26px 32px 6px;">
              <p style="margin:0;font-size:16px;line-height:1.6;color:#574F6E;">Un visiteur a envoyé un message via le formulaire du site <strong style="color:#273582;">rencontres-ps.fr</strong>.</p>
            </td>
          </tr>
          <!-- Coordonnées -->
          <tr>
            <td class="px" style="padding:14px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(39,53,130,0.08);font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8A8298;font-weight:600;width:120px;vertical-align:top;">Nom</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(39,53,130,0.08);font-size:16px;color:#273582;font-weight:600;vertical-align:top;word-break:break-word;overflow-wrap:break-word;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(39,53,130,0.08);font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8A8298;font-weight:600;vertical-align:top;">E-mail</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(39,53,130,0.08);font-size:16px;vertical-align:top;word-break:break-word;overflow-wrap:break-word;"><a href="mailto:${safeEmail}" style="color:#C02A87;text-decoration:none;font-weight:600;">${safeEmail}</a></td>
                </tr>
                ${orgRow}
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td class="px" style="padding:24px 32px 8px;">
              <p style="margin:0 0 10px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8A8298;font-weight:600;">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#FAF8F4;border-left:4px solid #C02A87;border-radius:8px;padding:18px 20px;font-size:16px;line-height:1.65;color:#2A2540;word-break:break-word;overflow-wrap:break-word;">${safeMsg}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Bouton répondre -->
          <tr>
            <td class="px" style="padding:22px 32px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:999px;background:#C02A87;box-shadow:0 8px 20px rgba(193,42,135,0.3);">
                    <a href="mailto:${safeEmail}" style="display:inline-block;padding:13px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;">Répondre à ${safeName} &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Pied -->
          <tr>
            <td class="px" style="background:#F4F2EE;padding:18px 32px;border-top:1px solid rgba(39,53,130,0.08);">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#9A93A8;">Message reçu le ${escapeHtml(dateLabel)} · e-mail automatique du site <a href="https://www.rencontres-ps.fr" style="color:#735092;text-decoration:none;">rencontres-ps.fr</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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

  // Accepte les deux nommages (RESEND_API_KEY conventionnel, ou RESEND).
  const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND;

  // Pas de clé (dev) : on trace et on répond OK sans envoyer.
  if (!apiKey) {
    console.warn(
      "[contact] clé Resend absente — e-mail non envoyé. Demande :",
      { name, email, organisation },
    );
    return NextResponse.json({ ok: true });
  }

  const dateLabel = new Date().toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  const textBody =
    `Nouveau message depuis le site du Forum de la Protection Sociale.\n\n` +
    `Nom : ${name}\n` +
    `E-mail : ${email}\n` +
    (organisation ? `Structure : ${organisation}\n` : "") +
    `\nMessage :\n${message}\n\n` +
    `Reçu le ${dateLabel}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Nouveau message de ${name} · Forum de la Protection Sociale`,
      text: textBody,
      html: buildHtml({ name, email, organisation, message, dateLabel }),
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
