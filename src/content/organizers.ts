/**
 * Organisateurs de l'événement — affichés dans le footer sous « Organisé par ».
 *
 * ⚠️ Payload : deviendra une collection éditable (logo + nom + lien éventuel).
 * Dimensions renseignées pour next/image (ratio d'origine des fichiers).
 */
export type Organizer = {
  /** Nom complet — sert de texte alternatif. */
  name: string;
  /** Chemin du logo dans public/. */
  logo: string;
  width: number;
  height: number;
};

export const organizers: Organizer[] = [
  {
    name: "Alsace Protection Sociale",
    logo: "/brand/alsace-protection-sociale.webp",
    width: 1360,
    height: 513,
  },
  {
    name: "CAAPS — Conseil Audit et Assurances en Protection Sociale",
    logo: "/brand/organizers/caaps.png",
    width: 1076,
    height: 266,
  },
  {
    name: "Courtage Roy — Expert en protection sociale",
    logo: "/brand/organizers/courtage-roy.png",
    width: 185,
    height: 121,
  },
  {
    name: "Roy Conseil Expertise",
    logo: "/brand/organizers/roy-conseil.png",
    width: 640,
    height: 171,
  },
];
