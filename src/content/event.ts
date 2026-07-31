/**
 * Configuration de l'événement — SOURCE DE VÉRITÉ.
 *
 * ⚠️ Payload : ce fichier deviendra un « global » (singleton) éditable.
 * Les composants lisent uniquement cet objet, donc la migration ne touchera
 * pas au rendu.
 *
 * ⚠️ Points ouverts signalés dans le handoff (à trancher avec le client) :
 *  - Nommage « Forum » vs « Les Rencontres » : les visuels portent la nouvelle
 *    identité mais les textes disent encore « Forum ». On conserve « Forum »
 *    dans les textes pour l'instant, comme demandé.
 *  - URLs `tickets` (Weezevent) et `linkedin` : provisoires, à remplacer.
 */
export const event = {
  name: "Forum de la Protection Sociale",
  editionLabel: "1ʳᵉ édition",

  // Date & horaires
  dateLabel: "Jeudi 1ᵉʳ octobre 2026",
  /** ISO avec fuseau — cible du compte à rebours (ouverture 8h30, +02:00 CEST). */
  dateISO: "2026-10-01T08:30:00+02:00",
  hoursLabel: "8h30 – 18h",
  welcomeLabel: "Accueil à partir de 8h00",
  scheduleLabel: "Jeudi 1ᵉʳ octobre 2026 · 8h30 – 18h",

  // Lieu
  venue: "Villa Quai Sturm",
  city: "67000 Strasbourg",
  venueFull: "Villa Quai Sturm, 67000 Strasbourg",

  // Coordonnées & domaine
  email: "contact@alsaceprotectionsociale.fr",
  domain: "www.rencontres-ps.fr",

  // Liens externes / intégrations
  links: {
    tickets: "https://my.weezevent.com/le-forum-de-la-protection-sociale",
    /** ⚠️ URL provisoire — remplacer par la page LinkedIn de l'événement. */
    linkedin: "https://www.linkedin.com",
    parking: "https://www.parcus.com/parkings/opera-broglie/#tarifs",
    agency: "https://www.striq.fr",
  },
} as const;

/** Libellés des CTA réutilisés partout. */
export const cta = {
  reserve: "Réserver ma place",
  reserveArrow: "Réserver ma place →",
  register: "S'inscrire",
  programme: "Découvrir le programme",
} as const;

/** Liens de navigation (header + footer). */
export const navLinks = [
  { label: "Le Forum", href: "#pourquoi" },
  { label: "Pour qui", href: "#publics" },
  { label: "Programme", href: "#programme" },
  { label: "Infos pratiques", href: "#infos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
